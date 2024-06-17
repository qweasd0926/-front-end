import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { CART_ADD, TOGGLE_LIKE, TOGGLE_LIKE2 } from '@/configs/config-r'
// page
import DefaultLayout from '@/components/common/default-layout'
import LoginPage from '@/components/member/login-modal'
// style-----
import style from './cart.module.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import toast, { Toaster } from 'react-hot-toast'
// react bootstrap
// react icons-----
import { FaTrashCan, FaCartPlus } from 'react-icons/fa6'
import { TbCheckbox } from 'react-icons/tb'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useCart } from '@/hooks/use-cart'
import { useLike } from '@/hooks/use-like'
import { useAuth } from '@/context/auth-context'
import { useLoader } from '@/hooks/use-loader'

export default function Like() {
  const { loader } = useLoader()
  const [isShow, setIsShow] = useState(true)
  const [ischecked, setIsChecked] = useState([])

  const handleChecked = (prodId) => {
    if (!ischecked.includes(prodId)) {
      setIsChecked([...ischecked, prodId])
    } else {
      setIsChecked(ischecked.filter((pid) => pid != prodId))
    }
  }

  // Router-----
  const router = useRouter()

  // cart
  const { addItem } = useCart()
  const notify = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已加入購物車'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/cart')
          }}
        >
          連至 購物車
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const notifyParts = () => {
    const msgBox = (
      <div>
        <p>
          <strong>{'選定商品已加入購物車'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/cart')
          }}
        >
          連至 購物車
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const notifyAll = () => {
    const msgBox = (
      <div>
        <p>
          <strong>{'商品已全數加入購物車'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/cart')
          }}
        >
          連至 購物車
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  // 單一加入購物車
  const cartClick = async (productData) => {
    const r = await fetch(`${CART_ADD}/${productData.product_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    const result = await r.json()
    console.log(result)
    if (result.success) {
      notify(productData.p_name)
      removeProdById(productData.product_id)
      fetch(`${TOGGLE_LIKE}/${productData.product_id}`, {
        method: 'DELETE',
      })
        .then((r) => r.json())
        .then((result) => {
          console.log(result)
          router.push(location.search)
        })
        .catch((error) => {
          console.error('Error deleting item:', error)
        })
    }
  }

  // 選定加入購物車
  const cartSelectClick = async () => {
    for (const prodId of ischecked) {
      const selectedProd = prods.likeProd.find(
        (prod) => prod.product_id == prodId
      )
      if (selectedProd) {
        const prodData = {
          member_id: auth.userData.id,
          product_id: selectedProd.product_id,
          p_photos: selectedProd.p_photos,
          p_name: selectedProd.p_name,
          p_price: selectedProd.p_price,
          p_qty: 1,
          total_price: selectedProd.p_price,
          available_cp: selectedProd.available_cp,
        }
        try {
          const r = await fetch(`${CART_ADD}/${prodData.product_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(prodData),
          })
          const result = await r.json()
          console.log(result)
          if (result.success) {
            removeProdById(prodData.product_id)
            const rep = await fetch(`${TOGGLE_LIKE}/${prodData.product_id}`, {
              method: 'DELETE',
            })
            const res = await rep.json()
            console.log(res)
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }
    notifyParts()
    router.push('/shop/like')
  }

  // 全部加入購物車
  const cartSelectAll = async () => {
    try {
      for (const selectedProd of prods.likeProd) {
        const prodData = {
          member_id: auth.userData.id,
          product_id: selectedProd.product_id,
          p_photos: selectedProd.p_photos,
          p_name: selectedProd.p_name,
          p_price: selectedProd.p_price,
          p_qty: 1,
          total_price: selectedProd.p_price,
          available_cp: selectedProd.available_cp,
        }
        const r = await fetch(`${CART_ADD}/${prodData.product_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prodData),
        })
        const result = await r.json()
        console.log(result)
        if (result.success) {
          removeProdById(prodData.product_id)
          const rep = await fetch(`${TOGGLE_LIKE}/${prodData.product_id}`, {
            method: 'DELETE',
          })
          const res = await rep.json()
          console.log(res)
        }
      }
      notifyAll()
      router.push('/shop/like')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Like
  const { prods, removeProdById } = useLike()

  //單一刪除
  const deleteItem = (productName, pid) => {
    const notifyAndRemove = () => {
      MySwal.fire({
        title: '請確定是否移除此項收藏商品？',
        text: '請選擇下方功能鍵，確認是否移除',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#8e2626',
        cancelButtonText: '取消',
        confirmButtonText: '是的，請移除！',
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            title: '您的通知：',
            text: productName + ' 已從收藏清單中被移除',
            icon: 'success',
          })
          removeProdById(pid)
          fetch(`${TOGGLE_LIKE}/${pid}`, {
            method: 'DELETE',
          })
            .then((r) => r.json())
            .then((result) => {
              console.log(result)
              router.push(location.search)
            })
            .catch((error) => {
              console.error('Error deleting item:', error)
            })
        }
      })
    }
    notifyAndRemove()
  }

  // 選定刪除
  const deleteSelectedItems = () => {
    MySwal.fire({
      title: '請確定是否移除所選收藏商品？',
      text: '請選擇下方功能鍵，確認是否移除',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#8e2626',
      cancelButtonText: '取消',
      confirmButtonText: '是的，請移除！',
    }).then((result) => {
      if (result.isConfirmed) {
        ischecked.forEach((prodId) => {
          removeProdById(prodId)
          fetch(`${TOGGLE_LIKE}/${prodId}`, {
            method: 'DELETE',
          })
            .then((r) => r.json())
            .then((result) => {
              console.log(result)
            })
            .catch((error) => {
              console.error('Error deleting item:', error)
            })
        })
        MySwal.fire({
          title: '您的通知：',
          text: '選定商品已從收藏清單中被移除！',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/shop/like')
          }
        })
      }
    })
  }

  //全部刪除
  const deleteAll = () => {
    MySwal.fire({
      title: '請確定是否移除所有收藏商品？',
      text: '請選擇下方功能鍵，確認是否移除',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#8e2626',
      cancelButtonText: '取消',
      confirmButtonText: '是的，請移除！',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${TOGGLE_LIKE2}`, {
          method: 'DELETE',
        })
          .then((r) => r.json())
          .then((result) => {
            console.log(result)
          })
          .catch((error) => {
            console.error('Error deleting item:', error)
          })
        MySwal.fire({
          title: '您的通知：',
          text: '所有商品已從收藏清單中被移除！',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/shop/like')
          }
        })
      }
    })
  }

  // member
  const { checkAuth, auth } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  // ---Modal---
  // 關閉登入視窗
  const handleLoginClose = () => {
    if (!isLoading) {
      setShowLogin(false)
    }
  }
  // 點擊登入按鈕
  const handleLoginClick = () => {
    if (!auth.isAuth) {
      // 如果用戶未登入，則顯示登入表單
      setShowLogin(true)
    }
  }
  // 登入表單提交
  const handleLoginSubmit = async () => {
    // 開始檢查認證狀態
    setIsLoading(true)
    await checkAuth()
    // 結束檢查認證狀態
    setIsLoading(false)
    if (auth.isAuth) {
      // 如果已經登入，則關閉模態框
      setShowLogin(false)
    }
  }

  // 如果已經登入，則關閉模態框
  useEffect(() => {
    if (auth.isAuth) {
      setShowLogin(false)
      checkAuth()
    }
  }, [auth.isAuth])

  // Loading bar-----
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (isLoading) {
      setProgress(60)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(100)
      }, 300)
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsShow(false)
      }, 800)
    }
  })

  const display = (
    <>
      {auth.isAuth ? (
        <>
          <DefaultLayout>
            <Head>
              <title>收藏商品 | DEAL-2ND HAND SHOP</title>
            </Head>
            {/* Breadcrumb Start */}
            <div className={`container-fluid ${style.breadcrumbArea}`}>
              <div className="row px-xl-5">
                <div className="col-12">
                  <nav className="breadcrumb">
                    <Link
                      className="breadcrumb-item text-dark"
                      href="/"
                      style={{ textDecoration: 'none' }}
                    >
                      <span style={{ fontSize: '20px' }}>首頁</span>
                    </Link>
                    <Link
                      className="breadcrumb-item text-dark"
                      href="/shop"
                      style={{ textDecoration: 'none', fontSize: '20px' }}
                    >
                      <span>探索商品</span>
                    </Link>
                    <span
                      className="breadcrumb-item active"
                      style={{ fontSize: '20px' }}
                    >
                      收藏商品
                    </span>
                  </nav>
                </div>
              </div>
            </div>
            {/* Breadcrumb End */}
            {/* Like Start */}
            <div className="container-fluid mt-3 px-5">
              <div className="row px-xl-5 mt-2 mb-3">
                <div className="col-12 d-flex justify-content-between">
                  <div className="d-flex ms-2">
                    <button
                      className={`btn me-2 ${style.btnHover}`}
                      style={{ backgroundColor: '#0a5d1b', color: 'white' }}
                      onClick={cartSelectClick}
                    >
                      <strong>選定加入購物車</strong>
                    </button>
                    <button
                      className={`btn ${style.btnHover}`}
                      style={{ backgroundColor: '#387690', color: 'white' }}
                      onClick={cartSelectAll}
                    >
                      <strong>全部加入購物車</strong>
                    </button>
                  </div>
                  <div className="d-flex me-2">
                    <button
                      className={`btn me-2 ${style.btnHover}`}
                      style={{ backgroundColor: '#ba4014', color: 'white' }}
                      onClick={deleteSelectedItems}
                    >
                      <strong>選定刪除</strong>
                    </button>
                    <button
                      className={`btn ${style.btnHover}`}
                      style={{ backgroundColor: '#5a1b1b', color: 'white' }}
                      onClick={deleteAll}
                    >
                      <strong>清空收藏</strong>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row px-xl-5">
                <div className="col-lg-12 table-responsive mb-5">
                  <table className="table table-light table-borderless table-hover">
                    <thead className="text-center table-dark">
                      <tr className="fw-5" style={{ fontSize: '20px' }}>
                        <th>
                          <TbCheckbox />
                        </th>
                        <th>加入購物車</th>
                        <th>商品</th>
                        <th>商品名稱</th>
                        <th>價格</th>
                        <th>可獲得小碳點</th>
                        <th>移除</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle text-center">
                      {prods.likeProd.length !== 0 ? (
                        prods.likeProd.map((v, i) => (
                          <tr key={v.product_id}>
                            <td>
                              <input
                                type="checkbox"
                                onChange={() => {
                                  handleChecked(v.product_id)
                                }}
                              />
                            </td>
                            <td>
                              <button
                                style={{ border: 'none' }}
                                className="btn btn-sm"
                                onClick={() => {
                                  addItem(v)
                                  const productData = {
                                    member_id: auth.userData.id,
                                    product_id: v.product_id,
                                    p_photos: v.p_photos,
                                    p_name: v.p_name,
                                    p_price: v.p_price,
                                    p_qty: 1,
                                    total_price: v.p_price,
                                    available_cp: v.available_cp,
                                  }
                                  console.log(productData)
                                  cartClick(productData)
                                }}
                              >
                                <FaCartPlus
                                  className={`mb-1 ${style.trashBtn}`}
                                  style={{
                                    fontSize: '25px',
                                    color: '#8e2626',
                                  }}
                                />
                              </button>
                            </td>
                            <td>
                              <Link href={`/shop/${v.product_id}`}>
                                <img
                                  src={
                                    v.p_photos?.includes(',')
                                      ? `/${v.p_photos.split(',')[0]}`
                                      : `/${v.p_photos}`
                                  }
                                  alt=""
                                  width={150}
                                  height={150}
                                  style={{ objectFit: 'cover' }}
                                />
                              </Link>
                            </td>
                            <td
                              className="align-middle text-wrap"
                              style={{ fontSize: '20px', width: '500px' }}
                            >
                              <Link
                                href={`/shop/${v.product_id}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                              >
                                {v.p_name}
                              </Link>
                            </td>
                            <td
                              className="align-middle"
                              style={{ fontSize: '20px' }}
                            >
                              ${v.p_price?.toLocaleString()}
                            </td>
                            <td style={{ fontSize: '20px' }}>
                              {v.available_cp}
                            </td>
                            <td className="align-middle">
                              <button
                                style={{ border: 'none' }}
                                className="btn btn-sm"
                                onClick={() =>
                                  deleteItem(v.p_name, v.product_id)
                                }
                              >
                                <FaTrashCan
                                  className={`mb-1 ${style.trashBtn}`}
                                  style={{
                                    fontSize: '20px',
                                    color: '#8e2626',
                                  }}
                                />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-5">
                            <h2 style={{ color: '#8e2626' }}>
                              <strong>目前沒有收藏商品...</strong>
                            </h2>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Toaster />
            {/* Like End */}
          </DefaultLayout>
        </>
      ) : (
        <>
          <DefaultLayout>
            <Head>
              <title>收藏商品 | DEAL-2ND HAND SHOP</title>
            </Head>
            <div className="row mt-5">
              <div className="col-12 text-center">
                <Link
                  href="#login"
                  style={{ textDecoration: 'none' }}
                  onClick={handleLoginClick}
                >
                  <h2 style={{ color: '#8e2626' }}>
                    <strong>
                      請先登入<small>(點擊我登入)</small>
                    </strong>
                  </h2>
                </Link>
                <img src="/logo9.png" alt="" />
              </div>
            </div>
          </DefaultLayout>
          {/* Login Modal start */}
          <LoginPage
            show={showLogin}
            onHide={handleLoginClose}
            onSubmit={handleLoginSubmit}
          />
          {/* Login Modal end */}
        </>
      )}
    </>
  )

  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {isShow ? loader() : ''}
          {display}
        </>
      )}
    </>
  )
}

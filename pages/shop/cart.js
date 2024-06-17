import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  CART_ITEM_DELETE,
  CART_ITEM_DELETE2,
  CART_ITEM_UPDATE_PUT,
} from '@/configs/config-r'
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
import { FaMinus, FaPlus, FaTrashCan, FaAnglesUp } from 'react-icons/fa6'
import { TbCheckbox } from 'react-icons/tb'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/context/auth-context'
import { useLoader } from '@/hooks/use-loader'

export default function Cart() {
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
  const {
    items,
    incrementItemById,
    decrementItemById,
    removeItemById,
    totalPrice,
    totalCP,
  } = useCart()

  // 單一刪除
  const deleteItem = (productName, pid) => {
    const notifyAndRemove = () => {
      MySwal.fire({
        title: '請確定是否刪除此項商品？',
        text: '請選擇下方功能鍵，確認是否刪除',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#8e2626',
        cancelButtonText: '取消',
        confirmButtonText: '是的，請刪除！',
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            title: '您的通知：',
            text: productName + ' 已從購物車中被刪除',
            icon: 'success',
          })
          removeItemById(pid)
          fetch(`${CART_ITEM_DELETE}/${pid}`, {
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
      title: '請確定是否移除所選購物車商品？',
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
          removeItemById(prodId)
          fetch(`${CART_ITEM_DELETE}/${prodId}`, {
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
          text: '選定商品已從購物車清單中被移除！',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/shop/cart')
          }
        })
      }
    })
  }

  // 全部刪除
  const deleteAll = () => {
    MySwal.fire({
      title: '請確定是否移除所有購物車商品？',
      text: '請選擇下方功能鍵，確認是否移除',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#8e2626',
      cancelButtonText: '取消',
      confirmButtonText: '是的，請移除！',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${CART_ITEM_DELETE2}`, {
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
          text: '所有商品已從購物車清單中被移除！',
          icon: 'success',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/shop/cart')
          }
        })
      }
    })
  }

  const prodPlus = (productName) => {
    const msgBox = (
      <div>
        <span>
          <strong>{productName + ' 數量 + 1'}</strong>
        </span>
      </div>
    )
    toast.success(msgBox)
  }

  const prodMinus = (productName) => {
    const msgBox2 = (
      <div>
        <span>
          <strong>{productName + ' 數量 - 1'}</strong>
        </span>
      </div>
    )
    toast.success(msgBox2)
  }

  const updateItem = async (newData) => {
    const r = await fetch(`${CART_ITEM_UPDATE_PUT}/${newData.product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
    console.log(newData)
    const result = await r.json()
    console.log(result)
    if (result.success) {
      console.log('資料修改成功')
    } else {
      console.log('資料沒有修改')
    }
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
      <Head>
        <title>購物車 | DEAL-2ND HAND SHOP</title>
      </Head>
      {auth.isAuth ? (
        <>
          <DefaultLayout>
            <div className="container-fluid">
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
                        購物車
                      </span>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Breadcrumb End */}
              {/* Cart Start */}
              <div className="container-fluid mt-3">
                <div className="row px-xl-5 mt-2 mb-3">
                  <div className="col-12 d-flex justify-content-start">
                    <div className="d-flex ms-2">
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
                        <strong>清空購物車</strong>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row px-xl-5">
                  <div className="col-lg-8 table-responsive mb-5">
                    <table className="table table-light table-borderless table-hover">
                      <thead className="text-center table-dark">
                        <tr
                          className="fw-5 text-nowrap"
                          style={{ fontSize: '20px' }}
                        >
                          <th>
                            <TbCheckbox />
                          </th>
                          <th>商品</th>
                          <th>商品名稱</th>
                          <th>價格</th>
                          <th>數量</th>
                          <th>金額</th>
                          <th className="text-wrap">可獲得小碳點</th>
                          <th>移除</th>
                        </tr>
                      </thead>
                      <tbody className="align-middle text-center">
                        {items.cartProd.length !== 0 ? (
                          items.cartProd.map((v, i) => (
                            <tr key={v.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  onChange={() => {
                                    handleChecked(v.id)
                                  }}
                                />
                              </td>
                              <td>
                                <Link href={`/shop/${v.id}`}>
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
                                className="align-middle text-wrap text-truncate"
                                style={{
                                  fontSize: '20px',
                                  maxWidth: '120px',
                                }}
                              >
                                <Link
                                  href={`/shop/${v.id}`}
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
                              <td className="align-middle">
                                <div
                                  className="input-group quantity mx-auto"
                                  style={{ width: '100px' }}
                                >
                                  <div className="input-group-btn">
                                    <button
                                      className={`btn btn-sm btn-minus ${style.btnHover}`}
                                      style={{
                                        backgroundColor: '#8e2626',
                                        color: 'white',
                                      }}
                                      onClick={() => {
                                        const nextQty = v.p_qty - 1
                                        if (nextQty === 0) {
                                          deleteItem(v.p_name, v.id)
                                        } else {
                                          decrementItemById(v.id)
                                          prodMinus(v.p_name)
                                          const newData = {
                                            member_id: auth.userData.id,
                                            product_id: v.id,
                                            p_qty: v.p_qty - 1,
                                            p_price: v.p_price,
                                            total_price:
                                              (v.p_qty - 1) * v.p_price,
                                          }
                                          console.log(newData)
                                          updateItem(newData)
                                        }
                                      }}
                                    >
                                      <FaMinus className="mb-1" />
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm border-0 text-center"
                                    value={v.p_qty}
                                    readOnly
                                  />
                                  <div className="input-group-btn">
                                    <button
                                      className={`btn btn-sm btn-plus ${style.btnHover}`}
                                      style={{
                                        backgroundColor: '#8e2626',
                                        color: 'white',
                                      }}
                                      onClick={() => {
                                        incrementItemById(v.id)
                                        prodPlus(v.p_name)
                                        const newData = {
                                          member_id: auth.userData.id,
                                          product_id: v.id,
                                          p_qty: v.p_qty + 1,
                                          p_price: v.p_price,
                                          total_price:
                                            (v.p_qty + 1) * v.p_price,
                                        }
                                        console.log(newData)
                                        updateItem(newData)
                                      }}
                                    >
                                      <FaPlus className="mb-1" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td
                                className="align-middle"
                                style={{ fontSize: '20px' }}
                              >
                                ${(v.p_qty * v.p_price).toLocaleString()}
                              </td>
                              <td style={{ fontSize: '20px' }}>
                                {v.available_cp}
                              </td>
                              <td className="align-middle">
                                <button
                                  className="btn btn-sm"
                                  onClick={() => {
                                    deleteItem(v.p_name, v.id)
                                  }}
                                  style={{ border: 'none' }}
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
                            <td colSpan="8" className="text-center py-5">
                              <h2 style={{ color: '#8e2626' }}>
                                <strong>目前沒有商品...</strong>
                              </h2>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex mb-3 justify-content-center">
                      <h3 className="mb-2" style={{ color: '#8e2626' }}>
                        <strong>– 購物車詳情 –</strong>
                      </h3>
                    </div>
                    <div className="bg-light p-30 mb-5">
                      <div className="border-bottom px-4 pt-4 pb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <h5 className="font-weight-medium">運費</h5>
                          <h5 className="font-weight-medium">$60</h5>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <h5 className="font-weight-medium">總金額</h5>
                          <h5 className="font-weight-medium">
                            ${totalPrice.toLocaleString()}
                          </h5>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <h5 className="font-weight-medium">總小碳點</h5>
                          <h5 className="font-weight-medium">{totalCP}</h5>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="d-flex justify-content-between mt-2 mb-3">
                          <h5>
                            <strong>總付款金額</strong>
                          </h5>
                          <h5>
                            <strong>
                              ${(totalPrice + 60).toLocaleString()}
                            </strong>
                          </h5>
                        </div>
                        <div className="d-flex justify-content-center">
                          <Link
                            href="/buyer/checkout"
                            style={{ textDecoration: 'none' }}
                          >
                            <button
                              className={`btn btn-block font-weight-bold d-flex ${style.checkBtn}`}
                              style={{
                                backgroundColor: '#e96d3f',
                                color: 'white',
                              }}
                            >
                              <strong style={{ fontSize: '20px' }}>
                                去結帳
                              </strong>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Toaster />
              {/* Cart End */}
              {/* Back to Top */}
              <Link href="#top" className="btn">
                <FaAnglesUp
                  className={style.backToTop}
                  style={{ fontSize: '40px' }}
                />
              </Link>
            </div>
          </DefaultLayout>
        </>
      ) : (
        <>
          <DefaultLayout>
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

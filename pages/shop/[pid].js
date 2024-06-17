import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import {
  PROD_LIST,
  CART_ADD,
  TOGGLE_LIKE,
  BARTER_ADD,
} from '@/configs/config-r'
// page
import DefaultLayout from '@/components/common/default-layout'
import LoginPage from '@/components/member/login-modal'
// style-----
import style from './detail.module.css'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const BarterSwal = withReactContent(Swal)
// react bootstrap
import Carousel from 'react-bootstrap/Carousel'
import Modal from 'react-bootstrap/Modal'
// react icons-----
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { IoSearch } from 'react-icons/io5'
import { FaHeartCirclePlus } from 'react-icons/fa6'
import { ImHammer2 } from 'react-icons/im'
import { TbArrowsExchange2 } from 'react-icons/tb'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useCart } from '@/hooks/use-cart'
import { useLike } from '@/hooks/use-like'
import { useAuth } from '@/context/auth-context'
import { useLoader } from '@/hooks/use-loader'

export default function Detail() {
  const { loader } = useLoader()
  const [isShow, setIsShow] = useState(true)
  // Router-----
  const router = useRouter()
  const [show, setShow] = useState(false)

  // Products-----
  const [data, setData] = useState({
    success: false,
    rows: [],
    rowsRandom: [],
    searchSub: '',
    barterProds: [],
  })

  useEffect(() => {
    const member_id = auth.userData.id
    fetch(`${PROD_LIST}${location.search}?member_id=${member_id}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [router.query, router.isReady])

  const [product, setProduct] = useState({
    data: {
      id: 0,
      product_photos: '',
      product_name: '',
      seller_id: 0,
      sellerName: '',
      product_price: 0,
      product_qty: 0,
      m: '',
      s: '',
      product_status: 0,
      created_at: '',
      status: 0,
      product_intro: '',
    },
  })

  useEffect(() => {
    fetchProductData()
  }, [router.query.pid])

  const fetchProductData = () => {
    const { pid } = router.query
    if (pid) {
      fetch(`${PROD_LIST}/${pid}`)
        .then((r) => r.json())
        .then((dataObj) => {
          setProduct(dataObj)
          console.log(dataObj)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }

  const productPhotos = product.data.product_photos

  // cart
  const { addItem } = useCart()
  const notify = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已成功加入購物車'}</strong>
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

  const notifyNoAdd = (productName) => {
    const msgBox2 = (
      <div>
        <span>
          <strong>{productName + ' 已下架，不可加入購物車'}</strong>
        </span>
      </div>
    )
    toast.error(msgBox2)
  }

  const notifyNeedAuth = () => {
    const msgBox3 = (
      <div>
        <p>
          <strong>{'請先登入才可以使用此功能！'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={handleLoginClick}
        >
          點我登入
        </button>
      </div>
    )
    toast(msgBox3)
  }

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
    }
  }

  // Like
  const { addProd, removeProdById } = useLike()
  const notify2 = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已加入收藏'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/like')
          }}
        >
          連至 收藏清單
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const notify3 = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已從收藏清單移除'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/like')
          }}
        >
          連至 收藏清單
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const [isClicked, setIsClicked] = useState([])

  const likeClick = async (productData2) => {
    const member_id = auth.userData.id
    const r = await fetch(
      `${TOGGLE_LIKE}/${productData2.product_id}?member_id=${member_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData2),
      }
    )
    const result = await r.json()
    console.log(result)
    if (result.success) {
      if (!isClicked.includes(productData2.product_id)) {
        setIsClicked([...isClicked, productData2.product_id])
        notify2(productData2.p_name)
        addProd(productData2)
      } else {
        setIsClicked(isClicked.filter((pid) => pid != productData2.product_id))
        notify3(productData2.p_name)
        removeProdById(productData2.product_id)
      }
    }
  }

  // member
  const { checkAuth, auth } = useAuth()

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

  const [showLogin, setShowLogin] = useState(false)

  // barter
  const [isbarterItemA, setIsBarterItemA] = useState(false)
  const [isbarterItemB, setIsBarterItemB] = useState(false)
  const [itemFormData, setItemFormData] = useState({
    p1_id: 0,
    p2_id: 0,
    photos1: '',
    photos2: '',
    m1_id: 0,
    m2_id: 0,
    cp1: 0,
    cp2: 0,
  })

  const notifyBarter = () => {
    Swal.fire({
      title: '請選擇欲交換商品',
      icon: 'warning',
      confirmButtonText: '確定',
    })
  }

  const notifyBarterDone = () => {
    BarterSwal.fire({
      title: '您已成功送出申請',
      text: '請待對方回覆您的申請',
      icon: 'success',
      confirmButtonText: '關閉',
      confirmButtonColor: '#3085d6',
    })
  }

  const handleSelectItemA = (product) => {
    setIsBarterItemA((prev) => !prev)
    setItemFormData((prevData) => ({
      ...prevData,
      p1_id: product.id,
      photo1: product.product_photos,
      m1_id: product.seller_id,
      cp1: product.mc ? product.mc : product.sc,
    }))
  }

  const handleSelectItemB = (product) => {
    setIsBarterItemB((prev) => !prev)
    setItemFormData((prevData) => ({
      ...prevData,
      p2_id: product.id,
      photo2: product.product_photos,
      m2_id: product.seller_id,
      cp2: product.mc ? product.mc : product.sc,
    }))
  }

  const barterSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted!')

    if (isbarterItemA && isbarterItemB) {
      try {
        const r = await fetch(`${BARTER_ADD}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemFormData),
        })
        const result = await r.json()
        console.log(result)
        if (result.success) {
          notifyBarterDone()
          setShow(false)
          setIsBarterItemA(false)
          setIsBarterItemB(false)
        }
      } catch (e) {
        console.error('Error submitting barter:', e)
      }
    } else {
      notifyBarter()
    }
  }

  // Loading bar-----
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (isLoading) {
      setProgress(60)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(100)
      }, 50)
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
      <DefaultLayout pageName="productSearch">
        <Head>
          <title>商品詳細內容 | DEAL-2ND HAND SHOP</title>
        </Head>
        {/* Breadcrumb Start */}
        <div className={`container-fluid ${style.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb mb-30" style={{ fontSize: '20px' }}>
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                  href="/"
                >
                  <span>首頁</span>
                </Link>
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                  href="/shop"
                >
                  <span>探索商品</span>
                </Link>
                <span className="breadcrumb-item active">商品詳細內容</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}

        {/* Shop Detail Start */}
        <div className="container-fluid pb-5 mt-4">
          <div className="row px-xl-5">
            <div className="col-lg-5 mb-30">
              <Carousel fade style={{ height: '600px' }}>
                {productPhotos.includes(',') ? (
                  productPhotos.split(',').map((fileName, index) => {
                    return (
                      <Carousel.Item
                        key={index}
                        style={{ borderRadius: '5px' }}
                      >
                        <img
                          src={`/${fileName}`}
                          alt=""
                          width={600}
                          height={595}
                          style={{
                            width: '100%',
                            objectFit: 'cover',
                            opacity: '0.9',
                            borderRadius: '5px',
                          }}
                        />
                      </Carousel.Item>
                    )
                  })
                ) : (
                  <Carousel.Item style={{ borderRadius: '5px' }}>
                    <img
                      src={`/${productPhotos}`}
                      alt=""
                      width={600}
                      height={595}
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                        opacity: '0.9',
                        borderRadius: '5px',
                      }}
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </div>
            <div className="col-lg-7 h-auto">
              <div
                className="h-100 bg-light py-4 px-4"
                style={{ borderRadius: '5px' }}
              >
                <h2 style={{ fontWeight: '900' }}>
                  <strong style={{ color: '#8e2626' }}>
                    {product.data.product_name}
                  </strong>
                </h2>
                <div className="row">
                  <div className="col-lg-12">
                    <Link
                      href={`/member/store/${product.data.seller_id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <p className="mb-4 mt-3" style={{ fontSize: '20px' }}>
                        <strong style={{ color: '#8e2626' }}>
                          賣家：
                          <span style={{ color: 'black' }}>
                            {product.data.sellerName}{' '}
                            <small>(點我看介紹)</small>
                          </span>
                        </strong>
                      </p>
                    </Link>
                  </div>
                  <div className="col-lg-6">
                    <p className="mb-4" style={{ fontSize: '20px' }}>
                      <strong style={{ color: '#8e2626' }}>
                        商品價格：
                        <span style={{ color: 'black' }}>
                          ${product.data.product_price.toLocaleString()}
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: '20px',
                      }}
                    >
                      <strong style={{ color: '#8e2626' }}>
                        商品數量：
                        <span style={{ color: 'black' }}>
                          {product.data.product_qty}
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p className="mb-4" style={{ fontSize: '20px' }}>
                      <strong style={{ color: '#8e2626' }}>
                        商品主分類：
                        <span style={{ color: 'black' }}>{product.data.m}</span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: '20px',
                      }}
                    >
                      <strong style={{ color: '#8e2626' }}>
                        商品子分類：
                        <span style={{ color: 'black' }}>{product.data.s}</span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p className="mb-4" style={{ fontSize: '20px' }}>
                      <strong style={{ color: '#8e2626' }}>
                        商品狀態：
                        <span style={{ color: 'black' }}>
                          {product.data.product_status == '1' ? '二手' : '全新'}
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p className="mb-4" style={{ fontSize: '20px' }}>
                      <strong style={{ color: '#8e2626' }}>
                        商品上架時間：
                        <span style={{ color: 'black' }}>
                          {product.data.created_at}
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: '20px',
                      }}
                    >
                      <strong style={{ color: '#8e2626' }}>
                        上下架狀態：
                        <span style={{ color: 'black' }}>
                          {product.data.status == '1' ? '上架中' : '已下架'}
                        </span>
                      </strong>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: '20px',
                      }}
                    >
                      <strong style={{ color: '#8e2626' }}>
                        商品更新時間：
                        <span style={{ color: 'black' }}>
                          {product.data.created_at}
                        </span>
                      </strong>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row mb-4 pt-3 mt-4">
                  <div className="col-lg-12 d-flex">
                    <button
                      className={`btn px-3 ${style.btnHover}`}
                      style={{ backgroundColor: '#e96d3f', border: 'none' }}
                      onClick={() => {
                        if (auth.isAuth && product.data.status == '1') {
                          addItem(product.data)
                          const productData = {
                            member_id: auth.userData.id,
                            product_id: product.data.id,
                            p_photos: product.data.product_photos,
                            p_name: product.data.product_name,
                            p_price: product.data.product_price,
                            p_qty: 1,
                            total_price: product.data.product_price,
                            available_cp: product.data.mc
                              ? product.data.mc
                              : product.data.sc,
                          }
                          console.log(productData)
                          cartClick(productData)
                        } else if (!auth.isAuth && product.data.status == '1') {
                          notifyNeedAuth()
                        } else {
                          notifyNoAdd(product.data.product_name)
                        }
                      }}
                    >
                      <BsFillCartFill
                        className="pb-1"
                        style={{ color: 'white', fontSize: '20px' }}
                      />{' '}
                      <span style={{ color: 'white' }}>加入購物車</span>
                    </button>
                    <button
                      className={`btn px-3 ms-4 ${style.btnHover}`}
                      style={{ backgroundColor: '#d76767', border: 'none' }}
                      onClick={() => {
                        if (auth.isAuth) {
                          const productData2 = {
                            member_id: auth.userData.id,
                            product_id: product.data.id,
                            p_photos: product.data.product_photos,
                            p_name: product.data.product_name,
                            p_price: product.data.product_price,
                            p_qty: 1,
                            total_price: product.data.product_price,
                            available_cp: product.data.mc
                              ? product.data.mc
                              : product.data.sc,
                          }
                          likeClick(productData2)
                        } else {
                          notifyNeedAuth()
                        }
                      }}
                    >
                      <FaHeartCirclePlus
                        className="me-1 pb-1"
                        style={{ color: 'white', fontSize: '20px' }}
                      />
                      <span style={{ color: 'white' }}>加入收藏</span>
                    </button>
                  </div>
                </div>
                <div className="row d-flex">
                  <div className="col-lg-12">
                    <button
                      className={`btn px-3 ${style.btnHover}`}
                      style={{
                        backgroundColor: '#195a98',
                        color: 'white',
                        border: 'none',
                      }}
                    >
                      <ImHammer2 style={{ fontSize: '20px' }} /> 議價
                    </button>
                    <button
                      className={`btn px-3 ms-4 ${style.btnHover}`}
                      style={{
                        backgroundColor: '#0f5808',
                        color: 'white',
                        border: 'none',
                      }}
                      onClick={() => {
                        if (auth.isAuth) {
                          setShow(true)
                        } else {
                          notifyNeedAuth()
                        }
                      }}
                    >
                      <TbArrowsExchange2 style={{ fontSize: '20px' }} />{' '}
                      以物易物
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row px-xl-5 mt-5">
            <div className="col">
              <div className="bg-light p-30">
                <div className="nav nav-tabs mb-4">
                  <Link
                    className="nav-item nav-link text-dark active"
                    data-toggle="tab"
                    href="#tab-pane-1"
                  >
                    <strong style={{ fontSize: '20px' }}>商品描述</strong>
                  </Link>
                </div>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab-pane-1">
                    <p className="px-4 pb-4" style={{ fontSize: '18px' }}>
                      {product.data.product_intro}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Shop Detail End */}
        <hr className="mx-5" />
        {/* Products Start */}
        <div className="container-fluid py-5 px-5">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="pr-3" style={{ color: '#8e2626' }}>
              <strong>您可能也有興趣...</strong>
            </span>
          </h2>
          <div className="row px-xl-5">
            {data.rowsRandom.slice(0, 4).map((v, i) => {
              return (
                <div key={i} className="col-lg-3 col-md-6 col-sm-12 pb-1">
                  <div
                    className={`product-item bg-light mb-5 mx-auto ${style.productItem}`}
                    style={{ marginBottom: '60px' }}
                  >
                    <div className="overflow-hidden ">
                      <div
                        className="position-relative"
                        style={{ overflow: 'hidden', height: '266px' }}
                      >
                        <img
                          className={`img-fluid w-100 ${style.imgAct}`}
                          src={
                            v.product_photos.includes(',')
                              ? `/${v.product_photos.split(',')[0]}`
                              : `/${v.product_photos}`
                          }
                          alt=""
                          width={266}
                          height={266}
                          style={{ height: '266px', objectFit: 'cover' }}
                        />
                        <div className={style.productAction}>
                          <button
                            className="btn"
                            onClick={() => {
                              if (auth.isAuth && v.status == '1') {
                                addItem(v)
                                const productData = {
                                  member_id: auth.userData.id,
                                  product_id: v.id,
                                  p_photos: v.product_photos,
                                  p_name: v.product_name,
                                  p_price: v.product_price,
                                  p_qty: 1,
                                  total_price: v.product_price,
                                  available_cp: v.mc ? v.mc : v.sc,
                                }
                                console.log(productData)
                                cartClick(productData)
                              } else if (!auth.isAuth && v.status == '1') {
                                notifyNeedAuth()
                              } else {
                                notifyNoAdd(v.product_name)
                              }
                            }}
                          >
                            <BsFillCartFill className={style.iconAInner} />
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              if (auth.isAuth) {
                                const productData2 = {
                                  member_id: auth.userData.id,
                                  product_id: v.id,
                                  p_photos: v.product_photos,
                                  p_name: v.product_name,
                                  p_price: v.product_price,
                                  p_qty: 1,
                                  total_price: v.product_price,
                                  available_cp: v.mc ? v.mc : v.sc,
                                }
                                likeClick(productData2)
                              } else {
                                notifyNeedAuth()
                              }
                            }}
                          >
                            <AiOutlineHeart
                              className={style.iconBInner}
                              style={{
                                color: isClicked.includes(v.id)
                                  ? '#e96d3f'
                                  : '',
                                backgroundColor: isClicked.includes(v.id)
                                  ? '#8e2626'
                                  : '',
                              }}
                            />
                          </button>
                          <Link href={`/shop?searchSub=${v.s}`} className="btn">
                            <IoSearch className={style.iconCInner} />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/shop/${v.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <div
                        className="text-center py-3 px-2"
                        style={{ height: '160px' }}
                      >
                        <div
                          className="text-wrap text-truncate"
                          style={{ height: '70%' }}
                          href=""
                        >
                          <h5>
                            <strong className="">{v.product_name}</strong>
                          </h5>
                        </div>
                        <div className="d-flex justify-content-center ">
                          <div
                            className=""
                            style={{
                              fontSize: '18px',
                              color:
                                v.product_status == '1' ? 'green' : '#e96d3f',
                            }}
                          >
                            <strong>
                              {v.product_status == '1' ? '二手' : '全新'}
                            </strong>
                          </div>
                          &nbsp;
                          <div className="" style={{ fontSize: '18px' }}>
                            <strong>${v.product_price.toLocaleString()}</strong>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Toaster />
        {/* Products End */}
        {/* Barter Modal start */}
        <Modal
          size="xl"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <form onSubmit={barterSubmit}>
            <Modal.Header closeButton>
              <Modal.Title
                id="example-custom-modal-styling-title"
                className="px-3"
                style={{ color: '#8e2626' }}
              >
                <strong style={{ fontSize: '30px' }}>提出以物易物申請</strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <h5 className="ms-3">
                    <strong>{product.data.sellerName}的商品</strong>
                  </h5>
                  <div
                    className={`border border-2 border-secondary rounded overflow-auto ${style.barterRight}`}
                  >
                    <div className="row mt-3 px-2">
                      <div className="col-lg-4 col-sm-12 mb-3">
                        <div
                          className={`d-flex flex-column border border-1 border-secondary mx-auto ${style.prod}`}
                        >
                          <div className="d-flex justify-content-center">
                            <img
                              className={style.prodPic}
                              src={
                                product.data.product_photos?.includes(',')
                                  ? `/${
                                      product.data.product_photos.split(',')[0]
                                    }`
                                  : `/${product.data.product_photos}`
                              }
                              alt={product.data.product_name}
                              width={150}
                              height={120}
                              title={product.data.product_name}
                            />
                          </div>
                          <div className="d-flex justify-content-center px-2">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="bartItmeA"
                                id="flexCheckDefault"
                                checked={isbarterItemA}
                                onChange={() => {
                                  handleSelectItemA(product.data)
                                }}
                              />
                            </div>
                            <div className="text-truncate">
                              {product.data.product_name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="text">
                    <h5 className="ms-3">
                      <strong>您的商品集</strong>
                    </h5>
                  </div>
                  <div
                    className={`border border-2 border-secondary rounded overflow-auto ${style.barterRight}`}
                  >
                    <div className="row mt-3 px-2">
                      {data.barterProds.map((v3, i3) => (
                        <>
                          <div key={v3.id} className="col-lg-4 col-sm-12 mb-3">
                            <div
                              className={`d-flex flex-column border border-1 border-secondary mx-auto ${style.prod}`}
                            >
                              <div className="barterProdPic d-flex justify-content-center">
                                <img
                                  className={style.prodPic}
                                  src={
                                    v3.product_photos.includes(',')
                                      ? `/${v3.product_photos.split(',')[0]}`
                                      : `/${v3.product_photos}`
                                  }
                                  alt={v3.product_name}
                                  width={150}
                                  height={120}
                                  title={v3.product_name}
                                />
                              </div>
                              <div className="d-flex justify-content-center px-2 pt-1">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="bartItemB"
                                    type="checkbox"
                                    id="flexCheckDefault"
                                    checked={
                                      isbarterItemB &&
                                      itemFormData.p2_id == v3.id
                                    }
                                    onChange={(e) => {
                                      const isChecked = e.target.checked
                                      if (isChecked) {
                                        handleSelectItemB(v3)
                                      }
                                    }}
                                  />
                                </div>
                                <div className="text-truncate">
                                  {v3.product_name}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="submit" className={`btn ${style.barterBtn}`}>
                送出申請
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        {/* Barter Modal end */}
      </DefaultLayout>
      {/* Login Modal start */}
      <LoginPage
        show={showLogin}
        onHide={handleLoginClose}
        onSubmit={handleLoginSubmit}
      />
      {/* Login Modal end */}
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

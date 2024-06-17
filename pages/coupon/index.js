import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { PROD_LIST, COUPON_RECEIVED_ADD } from '@/configs/config-r'
// pages-----
import DefaultLayout from '@/components/common/default-layout'
import LoginPage from '@/components/member/login-modal'
// style-----
import style from './coupon.module.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// react bootstrap
// react icons-----
import { ImPointDown } from 'react-icons/im'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useAuth } from '@/context/auth-context'
import { CouponAni } from '@/hooks/use-loader/components'
import { useLoader } from '@/hooks/use-loader'

export default function Coupon() {
  const { loader } = useLoader()
  const [isShow, setIsShow] = useState(true)

  // Router-----
  const router = useRouter()

  //member
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

  // coupon
  const photos = ['cHalf.png', 'cHalf.png', 'cAll.png', 'cAll.png']

  const [data, setData] = useState({
    coupon: [],
    coupon_r: [],
  })

  useEffect(() => {
    const member_id = auth.userData.id
    fetch(`${PROD_LIST}${location.search}?member_id=${member_id}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
      .catch((e) => {
        console.error('Error fetching data:', e)
      })
  }, [router.query.member_id, auth.isAuth, auth.userData])

  const notifySuccess = (coupon_name) => {
    MySwal.fire({
      title: `您已領取${coupon_name}`,
      icon: 'success',
      confirmButtonText: '關閉',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload()
      }
    })
  }

  const receivedClick = async (formData) => {
    const r = await fetch(`${COUPON_RECEIVED_ADD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const result = await r.json()
    console.log(result)
    if (result.success) {
      notifySuccess(formData.c_name)
    } else {
      console.log('error')
    }
  }

  // counpon Animation
  const [move, setMove] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setMove(false)
    }, 9000)
  })

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
      <DefaultLayout pageName="coupon">
        <Head>
          <title>優惠券專區 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className="container-fluid mt-4">
          {/*  Breadcrumb Start */}
          <div className={`container-fluid ${style.breadcrumbArea}`}>
            <div className="row px-xl-5">
              <div className="col-12">
                <nav className="breadcrumb mb-30">
                  <Link
                    className="breadcrumb-item"
                    style={{ textDecoration: 'none' }}
                    href="/"
                  >
                    <span>首頁</span>
                  </Link>
                  <span className="breadcrumb-item active">優惠券專區</span>
                </nav>
              </div>
            </div>
          </div>
          {/* Breadcrumb End */}
          {/* Banner start */}
          <div className="row d-flex justify-content-center">
            <div
              className={`col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mt-2 d-none d-sm-none d-md-block ${style.banner}`}
              style={{ height: '500px', width: '100%' }}
            ></div>
          </div>
          {/* Banner end */}
        </div>
        {/* Coupon Start */}
        <div className="container-fluid mb-5">
          <div className="row px-xl-5 bg-light">
            <div className="col-lg-12 px-lg-5">
              <div
                className="contact-form p-3 text-center d-flex align-items-center justify-content-center"
                style={{ color: '#8e2626' }}
              >
                {move ? (
                  <CouponAni style={{ width: '100px', height: '100px' }} />
                ) : (
                  <img src="/couponImg.png" alt="" />
                )}
                <div className="">
                  <h4>
                    <strong>想省運費嗎？登入會員後領取！</strong>
                  </h4>
                  <h4>
                    <strong>人人都有份！</strong>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {auth.isAuth ? (
            <>
              <div className="row px-lg-5 pt-5">
                {data.coupon.map((v, i) => {
                  const isReceived = data.coupon_r.some(
                    (v3) => v3.coupon_id === v.id
                  )
                  return (
                    <div
                      key={i}
                      className="col-lg-6 col-md-12 mb-lg-5 d-flex jusitify-content-center flex-column"
                    >
                      <div className="text-center">
                        <h4>
                          <strong>
                            {v.coupon_name}
                            <ImPointDown
                              className="ms-1"
                              style={{ fontSize: '20px' }}
                            />
                          </strong>
                        </h4>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        {photos.map((v2, i2) => {
                          if (i2 == i)
                            return (
                              <img
                                key={i2}
                                className={`me-2 ${style.photo}`}
                                src={`/${v2}`}
                                $
                                alt=""
                                style={{ width: '75%' }}
                              />
                            )
                        })}
                        <div className="">
                          {isReceived ? (
                            <button
                              key={v.id}
                              className={`btn ${style.pickedBtn}`}
                              style={{ cursor: 'not-allowed' }}
                            >
                              已領取
                            </button>
                          ) : (
                            <button
                              key={v.id}
                              className={`btn ${style.pickBtn}`}
                              onClick={() => {
                                const formData = {
                                  m_id: auth.userData.id,
                                  coupon_id: v.id,
                                  c_name: v.coupon_name,
                                }
                                receivedClick(formData)
                              }}
                            >
                              <strong>領取</strong>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        {/* Coupon End */}
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

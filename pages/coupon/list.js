import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { PROD_LIST } from '@/configs/config-r'
// pages-----
import DefaultLayout from '@/components/common/default-layout'
import LoginPage from '@/components/member/login-modal'
// style-----
import style from './coupon.module.css'
// react bootstrap
// react icons-----
import { FaHandPointRight } from 'react-icons/fa'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useAuth } from '@/context/auth-context'
import { useLoader } from '@/hooks/use-loader'

export default function CouponList() {
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

  const [data, setData] = useState({
    coupon_list: [],
  })

  useEffect(() => {
    const member_id = auth.userData.id ? auth.userData.id : null
    fetch(`${PROD_LIST}${location.search}?member_id=${member_id}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
      .catch((e) => {
        console.error('Error fetching data:', e)
      })
  }, [router.query.member_id, auth.isAuth, auth.userData])

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
      <DefaultLayout pageName="coupon-list">
        <Head>
          <title>優惠券紀錄 | DEAL-2ND HAND SHOP</title>
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
                  <span className="breadcrumb-item active">優惠券紀錄</span>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Coupon Start */}
        {auth.isAuth ? (
          <>
            <div className="container-fluid mb-5">
              <div className="row px-lg-5">
                <div className="col-lg-8 mx-auto">
                  <table class="table">
                    <thead className="table-info">
                      <tr className="text-center">
                        <th>編號</th>
                        <th>優惠券名稱</th>
                        <th>使用期限區間</th>
                        <th>領取時間</th>
                        <th>使用時間</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.coupon_list.map((v, i) => {
                        return (
                          <>
                            <tr key={i} className="text-center">
                              <th>{i + 1}</th>
                              <td>
                                <strong>{v.coupon_name}</strong>
                              </td>
                              <td>
                                <strong>
                                  {v.start_date} → {v.end_date}
                                </strong>
                              </td>
                              <td>
                                <strong>{v.created_at}</strong>
                              </td>
                              <td>
                                <strong>
                                  {v.used_at ? v.used_at : '尚未使用'}
                                </strong>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row px-lg-5 mt-4">
                <div className="col-12 text-center">
                  <h4 style={{ color: '#8e2626' }}>
                    <strong>查找更多優惠券？</strong>
                  </h4>
                  <div className="">
                    <span style={{ paddingLeft: '25px' }}>
                      <strong>快到優惠券專區查看！</strong>&nbsp;
                      <FaHandPointRight style={{ color: '#8e2626' }} />
                      &nbsp;
                      <Link href="/coupon">
                        <button
                          type="button"
                          className={`btn ${style.pickBtn}`}
                          href=""
                        >
                          <strong>點擊前往</strong>
                        </button>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="container-fluid mb-5">
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
            </div>
          </>
        )}
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

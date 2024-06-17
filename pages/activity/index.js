import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
// page-----
import DefaultLayout from '@/components/common/default-layout'
// style-----
import style from './activity.module.css'
// react bootstrap
// react icons-----
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useLoader } from '@/hooks/use-loader'

export default function Activity() {
  const { loader } = useLoader()
  const [isShow, setIsShow] = useState(true)

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
      <DefaultLayout pageName="activity">
        <Head>
          <title>近期活動 | DEAL-2ND HAND SHOP</title>
        </Head>
        {/* Breadcrumb Start */}
        <div className={`container-fluid ${style.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb">
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                  href="/"
                >
                  <span>首頁</span>
                </Link>
                <span className="breadcrumb-item active">近期活動</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Activity start */}
        <div className="container-fluid px-lg-5 mb-5">
          <div className="row px-lg-5">
            <div className="col-lg-12 px-lg-5 d-flex flex-column  justify-content-center text-center">
              <h2 style={{ color: '#8e2626' }}>
                <strong>DEAL近期活動</strong>
              </h2>
              <h5 className="mt-3">
                <strong>誠摯邀請您一同參與企業親子二手市集活動！</strong>
              </h5>
              <h5 className="mt-3 lh-lg">
                <strong>
                  歡迎廠商與攤販熱烈登記報名，請於5月7日前提出申請，並提供企業與個人商品相關訊息，完成申請將寄出信件通知，請務必留意信箱來信！
                  若於6月30日前尚未收到來信，歡迎致電於DEAL詢問，感謝您的加入！
                  歡迎家長帶上長輩與兒童一同參與同樂，預計活動舉辦日為8月15日13:00-17:00，現場除了為地球敬一份心力的淨灘活動外，還有二手市集可以盡情挖寶！
                  請攜帶環保杯與餐具，現場將提供飲料與點心可享用。
                </strong>
              </h5>
            </div>
            <div className="col-lg-12 px-lg-5 text-center mt-4">
              <img
                src="/beach.png"
                alt=""
                width={600}
                height={300}
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>
        {/* Activity end */}
      </DefaultLayout>
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

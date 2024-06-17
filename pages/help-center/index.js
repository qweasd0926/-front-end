import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
// page
import DefaultLayout from '@/components/common/default-layout'
// style-----
import style from './helpCenter.module.css'
// react bootstrap
// react icons-----
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------

export default function HelpCenter() {
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

  const display = (
    <DefaultLayout pageName="helpCenter">
      <Head>
        <title>幫助中心 | DEAL-2ND HAND SHOP</title>
      </Head>

      {/* Banner start */}
      <div className={style.banner}>
        <div
          className={`text-center d-flex align-items-center justify-content-center ${style.area1}`}
        >
          <h1 className="" style={{ color: 'white', fontSize: '50px' }}>
            <strong>DEAL HELP CENTER</strong>
          </h1>
        </div>
      </div>
      {/* Banner end */}
      {/*  Breadcrumb Start */}
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
              <span className="breadcrumb-item active">幫助中心</span>
            </nav>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Help Center start */}
      <div
        className="container-fluid mt-4 px-lg-4"
        style={{ marginBottom: '150px' }}
      >
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link className="text-decoration-none" href="/help-center/deal">
              <div
                className={`card border-seconary border-4 ${style.card}`}
                style={{ marginBottom: '80px' }}
              >
                <img
                  src="/deal3.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>認識DEAL</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link className="text-decoration-none" href="/help-center/esg">
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/esg.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>認識ESG</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link
              className="text-decoration-none"
              href="/help-center/ad-partner"
            >
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/parner.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>成為廣告夥伴</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link
              className="text-decoration-none"
              href="/help-center/using-rule"
            >
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/use.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>使用條款</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link
              className="text-decoration-none"
              href="/help-center/privacy-rule"
            >
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/privacy.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>隱私條款</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link
              className="text-decoration-none"
              href="/help-center/language-setting"
            >
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/language.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>語言設定</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link className="text-decoration-none" href="/help-center/faqs">
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/password.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>常見問題</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 col-xs-12 px-lg-4">
            <Link
              className="text-decoration-none"
              href="/help-center/join-deal"
            >
              <div className={`card border-seconary border-4 ${style.card}`}>
                <img
                  src="/join.png"
                  className="card-img-top"
                  alt=""
                  width={300}
                  height={350}
                />
                <div className="card-body mx-auto border-top">
                  <h5 className="card-title" style={{ color: '#8e2626' }}>
                    <strong>加入DEAL</strong>
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Help Center end */}
    </DefaultLayout>
  )

  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? <Loader /> : display}
    </>
  )
}

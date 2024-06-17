import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
// page-----
import DefaultLayout from '@/components/common/default-layout'
// style-----
import style from './helpCenter.module.css'
// react bootstrap
// react icons-----
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------

export default function ESG() {
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
    <>
      <DefaultLayout pageName="esgInfor">
        <Head>
          <title>認識ESG | DEAL-2ND HAND SHOP</title>
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
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none', fontSize: '20px' }}
                  href="/help-center"
                >
                  <span>幫助中心</span>
                </Link>
                <span className="breadcrumb-item active">認識ESG</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* ESG content start */}
        <div className="container-fluid px-lg-5 mb-5 mt-3">
          <div className="row px-lg-5">
            <div className="col-lg-12 px-lg-5 d-flex flex-column  justify-content-center">
              <h2 style={{ color: '#8e2626' }}>
                <strong>DEAL小學堂：認識ESG</strong>
              </h2>
              <h5 className="mt-3 lh-lg">
                <strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ESG：企業永續經營的新趨勢
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;隨著社會對環境和社會責任的重視日益增長，ESG（Environmental,
                  Social,
                  Governance）成為了企業界熱門的話題。ESG是一個由環境、社會和公司治理三個方面組成的框架，用於評估企業的永續經營表現。在這個框架中，環境層面關注企業的環境保護措施和資源利用效率；社會層面則關注企業對員工、消費者和供應商的關係；公司治理層面則關注企業的治理結構和管理實踐。
                  <br />
                  <br />
                  ．環境（Environmental）：
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在ESG框架中，環境方面的指標涵蓋了企業的環境保護措施、能源和資源利用效率、碳排放管理以及環境風險管理等。企業在環境方面的表現不僅關乎自身的永續發展，也影響著整個社會和地球的生態環境。越來越多的企業意識到，有效的環境管理不僅可以降低成本，還可以增強品牌形象，吸引投資者和消費者的青睞。
                  <br />
                  ．社會（Social）：
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在社會層面，ESG關注企業對員工、消費者和社區的影響。這包括員工福利、多元化和包容性政策、供應鏈管理以及企業與當地社區的互動。企業在社會方面的表現直接影響著其聲譽和可持續性。建立良好的社會關係，不僅有助於企業的長期發展，也是構建穩健的商業環境的重要一環。
                  <br />
                  ．公司治理（Governance）：
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;公司治理是企業管理和運營的核心。ESG框架關注企業的治理結構、透明度和責任，以及董事會和高層管理層的有效性。優秀的公司治理有助於減少風險、提高透明度，確保公司長期的穩定和健康發展。
                  在當今企業界，越來越多的公司意識到ESG的重要性。這種意識的增強源於公眾對企業社會責任的期待和對可持續發展的迫切需求。許多機構和投資者已經將ESG納入其投資決策的考量因素之一，認為ESG表現優異的企業更具吸引力和長期投資價值。
                  <br />
                  <br />
                  ．ESG評分機構：
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;隨著ESG概念的普及，市場上出現了多家ESG評分機構，它們提供不同的ESG指標和評估方法，幫助投資者和企業評估和比較企業的ESG表現。常見的ESG評分機構包括：
                  <br />
                  1.&nbsp;MSCI ESG指標：
                  由摩根士丹利資本國際公司（MSCI）提供，主要評估企業的ESG表現和風險。
                  <br />
                  2.&nbsp;Sustainalytics ESG指標：
                  由晨星集團（Morningstar）提供，重點關注企業的可持續性和社會責任。
                  <br />
                  3.&nbsp;S&P Global ESG指標： 由標準普爾道瓊指數公司（S&P Dow
                  Jones Indices）提供，評估企業的ESG表現和風險。
                  <br />
                  4.&nbsp;FTSE ESG指標： 由富時羅素公司（FTSE
                  Russell）提供，用於評估企業的可持續性和環境社會治理表現。
                  <br />
                  5.&nbsp;ISS ESG指標：
                  由公司機構股東服務集團提供，專注於企業治理和社會責任的評估。
                  <br />
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;這些ESG評分機構為投資者和企業提供了有價值的信息和工具，幫助他們更好地理解和應對ESG挑戰，推動企業實現更高水平的永續發展。
                  總之，ESG不僅是企業社會責任的新範式，也是可持續發展的重要推動力。通過實踐ESG原則，企業不僅可以獲得長期競爭優勢，還可以為社會和環境帶來積極的影響，共同打造一個更加公平、更加和諧、更加可持續的未來。
                </strong>
              </h5>
            </div>
            <div className="col-lg-12 px-lg-5 text-center mt-4">
              <img
                src="/esg.png"
                alt=""
                width={300}
                height={300}
                style={{
                  objectFit: 'cover',
                  opacity: '0.8',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        </div>
        {/* ESG content end */}
      </DefaultLayout>
    </>
  )

  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? <Loader /> : display}
    </>
  )
}

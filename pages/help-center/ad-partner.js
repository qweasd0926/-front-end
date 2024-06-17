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

export default function AdPartner() {
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
      <DefaultLayout pageName="adPartner">
        <Head>
          <title>成為廣告夥伴 | DEAL-2ND HAND SHOP</title>
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
                <span className="breadcrumb-item active">成為廣告夥伴</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Ad-partner content start */}
        <div className="container-fluid px-lg-5 mb-5 mt-3">
          <div className="row px-lg-5">
            <div className="col-lg-12 px-lg-5 d-flex flex-column  justify-content-center">
              <h2 style={{ color: '#8e2626' }}>
                <strong>成為DEAL的合作夥伴：開啟共享美好的可能</strong>
              </h2>
              <h5 className="mt-3 lh-lg">
                <strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;隨著時代的變遷和價值觀的轉變，人們對於消費和生活方式的需求也在逐漸轉變。DEAL
                  2ND HAND
                  SHOP作為一個致力於推動可持續生活方式和循環經濟的平台，不僅提供了二手買賣的服務，更希望透過與廣告合作夥伴的合作，為用戶帶來更多元化的體驗和價值。以下是我們的廣告合作夥伴，讓我們一同探索共享美好的可能！
                  <br />
                  <hr />
                  <br />
                  ．廣告合作夥伴1號：全方面綜合運動健康中心
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;健康和運動是現代人生活中不可或缺的一部分。我們很高興與全方面綜合運動健康中心合作，他們提供多樣化的健身設施和專業的健身指導，幫助人們保持良好的身材和健康狀態。透過這次合作，DEAL用戶將享受到獨家優惠和健康建議，讓健康生活更加輕鬆和愉快。
                  <br />
                  <br />
                  ．廣告合作夥伴2號：線上桌遊預約平台
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;玩遊戲是人們休閒娛樂的好方法，但現實生活中常常受到時間和空間的限制。我們與線上桌遊預約平台合作，讓玩家們可以在家中輕鬆預約喜愛的桌遊，無需排隊等候。這種便利的服務不僅節省了時間，還讓遊戲愛好者能夠更順暢地享受遊戲樂趣。
                  <br />
                  <br />
                  ．廣告合作夥伴3號：給浪浪一個溫暖的家
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;動物的陪伴能夠給人們帶來無限的溫暖和快樂。我們與給浪浪一個溫暖的家合作，倡導領養代替購買的理念，鼓勵大家給予流浪動物一個溫暖的家。透過這次合作，我們希望能夠提高動物保護意識，讓更多可愛的小生命找到屬於自己的幸福。
                  <br />
                  <br />
                  ．廣告合作夥伴4號：DEAL 2ND HAND SHOP
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最後，如果您還不熟悉DEAL
                  2ND HAND
                  SHOP，那麼現在是時候來試試我們的功能了！我們提供多元化的二手買賣平台，讓您可以輕鬆尋找到心儀的物品或將自己的物品找到下一位主人。透過這次合作，我們期待能夠為更多用戶帶來便利和價值，一同打造可持續且美好的生活。
                  <br />
                  <br />
                  <hr />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;成為DEAL的廣告合作夥伴，不僅是一次商業合作，更是開啟共享美好的可能性。我們相信通過彼此的合作和互惠，能夠為用戶帶來更多元化、更豐富的消費體驗，同時推動可持續生活理念的傳播和實踐。如果您有興趣成為我們的廣告合作夥伴，請隨時與我們聯繫，讓我們一起共創美好的未來！
                </strong>
              </h5>
            </div>
            <div className="col-lg-12 px-lg-5 text-center mt-4">
              <div className="row d-flex px-lg-5">
                <div className="col-lg-6 col-md-6 col-xs-12 d-flex align-items-center justify-content-center pb-2">
                  <Link href="/help-center/ad-partner">
                    <img
                      className={`${style.adbox}`}
                      src="/n1.png"
                      alt=""
                      width={350}
                      height={350}
                      style={{ borderRadius: '30px' }}
                    />
                  </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center col-lg-6 col-md-6 col-xs-12 pb-2">
                  <Link href="/help-center/ad-partner">
                    <img
                      className={`${style.adbox}`}
                      src="/n2.png"
                      alt=""
                      width={350}
                      height={350}
                      style={{ borderRadius: '30px' }}
                    />
                  </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center col-lg-6 col-md-6 col-xs-12 mt-lg-3 pb-2">
                  <Link href="/help-center/ad-partner">
                    <img
                      className={style.adbox}
                      src="/n3.png"
                      alt=""
                      width={350}
                      height={350}
                      style={{ borderRadius: '30px' }}
                    />
                  </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center col-lg-6 col-md-6 col-xs-12 mt-lg-3 pb-2">
                  <Link href="/help-center/ad-partner">
                    <img
                      className={`${style.adbox}`}
                      src="/n4.png"
                      alt=""
                      width={350}
                      height={350}
                      style={{ borderRadius: '30px' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Ad-partner end */}
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

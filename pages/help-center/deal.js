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

export default function Deal() {
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

  const display = (
    <>
      <DefaultLayout pageName="dealInfor">
        <Head>
          <title>認識DEAL | DEAL-2ND HAND SHOP</title>
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
                <span className="breadcrumb-item active">認識DEAL</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* DEAL content start */}
        <div className="container-fluid px-lg-5 mb-5">
          <div className="row px-lg-5">
            <div className="col-lg-12 px-lg-5 d-flex flex-column justify-content-center">
              <h2 className="mt-3" style={{ color: '#8e2626' }}>
                <strong>DEAL緣起：締造可持續時尚的循環共生</strong>
              </h2>
              <h5 className="mt-3 lh-lg">
                <strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我們是一群來自不同領域，卻有著相同理念的夥伴！
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在這個快時尚席捲全球的時代，消費行為已經不再僅僅是選購商品那麼簡單。科技的進步帶來了無限的選擇，但同時也衍生出環境與社會的議題。塑膠垃圾、過度消耗資源、碳足跡的增加，都是我們極需面對和解決的挑戰。
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEAL 2ND HAND
                  SHOP的創立，源於我們對於可持續時尚和共享經濟的理念。我們希望透過這個平台，讓物品找到下一位主人，延續它們的生命，也延續它們的故事。不再是一次性的使用和丟棄，而是將每一件商品的價值最大化，讓它們在社會中循環再用。
                  除了傳統的二手交易，我們還提供以物易物和議價的功能。這些靈活的交易方式，不僅是為了讓物品更容易流通，更是一種資源的有效利用。當一件商品不再適合現在的擁有者時，它可以在平台上找到需要它的新主人，同時也可以透過交換，讓不同的物品找到合適的歸屬。
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;「Let's make a
                  DEAL」，一起找尋寶物的過程，我們約定：一起愛護這個地球！，這不僅是一句口號，更是我們的承諾和行動。我們相信，每一次交易都是一次對地球的愛護。在每一個DEAL的背後，都是我們對於綠色生活方式的支持和堅持。
                  這個平台的運作，不僅僅是商業行為，更是一種社會責任和價值觀的體現。我們希望能夠激勵更多的人加入到這個可持續時尚的循環共生中來。透過每一次的交易，每一次的共享，我們都在為地球的綠色未來努力。在這個平台上，每一位使用者都是共享經濟的參與者和推動者。每一件商品的流通，都是一種環保行動的延續。我們期待，DEAL
                  2ND HAND
                  SHOP不僅僅是一個交易的場所，更是一個讓人們意識到可持續生活重要性的社群。
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;透過創新的商業模式和持續的努力，我們將一步步實現對可持續時尚的願景。讓每一個人都能參與到這個循環共生的過程中來，讓我們的地球因為這些小小的改變而變得更加美好。讓我們一起，用行動來護衛我們的家園！
                </strong>
              </h5>
            </div>
            <div className="col-lg-12 px-lg-5 text-center mt-4">
              <img
                src="/logo9.png"
                alt=""
                width={300}
                height={300}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
        {/* DEAL content end */}
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

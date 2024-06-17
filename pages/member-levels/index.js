import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
// pages-----
import DefaultLayout from '@/components/common/default-layout'
// style-----
import style from './memberLevels.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Keyboard, Pagination } from 'swiper/modules'
import 'swiper/css/effect-coverflow'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// react bootstrap
// react icons-----
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useLoader } from '@/hooks/use-loader'

export default function MemberLevels() {
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
      <DefaultLayout pageName="memberLevels">
        <Head>
          <title>會員等級 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
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
                      <span className="breadcrumb-item active">會員等級</span>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Breadcrumb End */}
              {/* MemberLevels Start */}
              {/* Level 0 */}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                keyboard={{
                  enabled: true,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[Keyboard, EffectCoverflow, Pagination]}
                className="mb-5"
                style={{ height: '550px' }}
              >
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/l0.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '180px', color: '#8e2626' }}
                    >
                      <strong>
                        歡迎您進入DEAL，剛成為會員的您即是LEVEL 0<br />
                        一旦開始第一筆消費
                        <br />
                        獲得小碳點後就會成為LEVEL 1的會員！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/02.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '220px', color: '#8e2626' }}
                    >
                      <strong>
                        LEVEL 0的會員們，您是DEAL等待任務中的一群夥伴
                        <br />
                        開始您在DEAL的探索吧！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/03.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
              </Swiper>
              <br />
              <br />
              <hr />
              <br />
              <br />
              {/* Level 1 */}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                keyboard={{
                  enabled: true,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[Keyboard, EffectCoverflow, Pagination]}
                className="mb-5"
                style={{ height: '550px' }}
              >
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/l1.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level2.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '180px', color: '#8e2626' }}
                    >
                      <strong>
                        DEAL的LEVEL 1會員：初學探險家，您的小碳點回饋為點數 *
                        0.01
                        <br />
                        剛進入減碳之旅很迷惘嗎？
                        <br />
                        別擔心您已經為環保做出一些貢獻！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level22.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '180px', color: '#8e2626' }}
                    >
                      <strong>
                        一步一步累積
                        <br />
                        當您的小碳點點數累積超過600點時
                        <br />
                        您將提升等級進入下一階段！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
              </Swiper>
              <br />
              <br />
              <hr />
              <br />
              <br />
              {/* Level 2 */}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                keyboard={{
                  enabled: true,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[Keyboard, EffectCoverflow, Pagination]}
                className="mb-5"
                style={{ height: '550px' }}
              >
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/l2.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '200px', color: '#8e2626' }}
                    >
                      <strong>
                        DEAL的LEVEL 2會員：樹木保衛家，您的小碳點回饋為點數 *
                        0.05
                        <br />
                        不簡單！
                        <br />
                        您的貢獻已造福許多生物！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level21.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '200px', color: '#8e2626' }}
                    >
                      <strong>
                        一步一步累積
                        <br />
                        當您的小碳點點數累積超過6,000點時
                        <br />
                        您將提升等級進入下一階段！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level23.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
              </Swiper>
              <br />
              <br />
              <hr />
              <br />
              <br />
              {/* Level 3 */}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                keyboard={{
                  enabled: true,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[Keyboard, EffectCoverflow, Pagination]}
                className="mb-5"
                style={{ height: '550px' }}
              >
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/l3.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level31.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '180px', color: '#8e2626' }}
                    >
                      <strong>
                        DEAL的LEVEL 3會員：森林保安官，您的小碳點回饋為點數 *
                        0.08
                        <br />
                        真的太厲害了！
                        <br />
                        您的貢獻已拯救森林的存在！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level32.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '180px', color: '#8e2626' }}
                    >
                      <strong>
                        一步一步累積
                        <br />
                        當您的小碳點點數累積超過60,000點時
                        <br />
                        您將提升等級進入下一階段！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
              </Swiper>
              <br />
              <br />
              <hr />
              <br />
              <br />
              {/* Level 4 */}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                keyboard={{
                  enabled: true,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[Keyboard, EffectCoverflow, Pagination]}
                className="mb-5"
                style={{ height: '550px' }}
              >
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/l4.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '160px', color: '#8e2626' }}
                    >
                      <strong>
                        DEAL的LEVEL 4會員：亞馬遜守護者，您的小碳點回饋為點數 *
                        0.1
                        <br />
                        不可思議！
                        <br />
                        您的貢獻已經媲美亞馬遜森林對碳的調節！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level51.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '160px', color: '#8e2626' }}
                    >
                      <strong>
                        一步一步累積
                        <br />
                        當您的小碳點點數累積超過600,000點時
                        <br />
                        您將提升等級進入下一階段！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level52.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
              </Swiper>
              <br />
              <br />
              <hr />
              <br />
              <br />
              {/* Level 5 */}
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                keyboard={{
                  enabled: true,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[Keyboard, EffectCoverflow, Pagination]}
                className="mb-5"
                style={{ height: '550px' }}
              >
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/l5.png"
                    style={{
                      objectFit: 'cover',
                      width: '50%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level41.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '200px', color: '#8e2626' }}
                    >
                      <strong>
                        DEAL的LEVEL 5會員：世界拯救者，您的小碳點回饋為點數 *
                        0.3
                        <br />
                        您已成為DEAL最高等級會員！
                        <br />
                        您的貢獻，無與倫比！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="mx-auto"
                    src="/level42.png"
                    style={{
                      objectFit: 'cover',
                      width: '40%',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <div style={{ height: '100%' }} className={style.bgword}>
                    <h2
                      className="text-center align-middle lh-lg"
                      style={{ paddingTop: '220px', color: '#8e2626' }}
                    >
                      <strong>
                        謝謝您加入DEAL！
                        <br />
                        謝謝您的貢獻！
                      </strong>
                    </h2>
                  </div>
                </SwiperSlide>
              </Swiper>
              <br />
              <br />
              {/* MemberLevels End */}
            </div>
          </div>
        </div>
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

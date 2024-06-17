import React, { useEffect, useState } from 'react'
import Link from 'next/link'
// page-----
import RegisterModal from '@/components/member/register-modal'
// style-----
import style from './footer.module.css'
// react bootstrap
// react icons-----
import {
  FaUserFriends,
  FaRegHandPointDown,
  FaFacebookSquare,
  FaInstagramSquare,
  FaAngleRight,
  FaUserEdit,
} from 'react-icons/fa'
import {
  FaSquareXTwitter,
  FaLinkedin,
  FaHandPointRight,
  FaAnglesUp,
} from 'react-icons/fa6'
import { IoCloseCircle } from 'react-icons/io5'
// hook------

export default function Footer() {
  // 會員的資料跟登入狀態
  const [showRegister, setShowRegister] = useState(false)
  // 點擊註冊按鈕
  const handleRegisterClick = () => setShowRegister(true)
  // 關閉註冊視窗
  const handleRegisterClose = () => setShowRegister(false)

  // ---BackToTop---
  const [isBtnVisible, setIsBtnVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY >= 300) {
        setIsBtnVisible(true)
      } else {
        setIsBtnVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Ad closeBtn
  const [isClose, setIsClose] = useState(false)

  useEffect(() => {
    const storedIsClose = localStorage.getItem('isClose')
    if (storedIsClose) {
      setIsClose(true)
    }
  }, [])

  const handleCloseBtn = () => {
    if (!isClose) {
      setIsClose(true)
      localStorage.setItem('isClose', 'true')
    }
  }

  return (
    <>
      {/* Back to Top */}
      {isBtnVisible ? (
        <>
          <button className="btn" onClick={scrollToTop}>
            <FaAnglesUp
              className={style.backToTop}
              style={{ fontSize: '40px' }}
            />
          </button>
        </>
      ) : (
        <></>
      )}
      {/* Footer Start */}
      <div className={`container-fluid px-5 pt-5 ${style.footerArea}`}>
        <div className="row pt-2">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 ">
            <h5 className="text-uppercase mb-4 text-center">
              <strong>
                <FaUserFriends className={`mb-2 ${style.footerContent}`} />
                &nbsp;
                <span className={style.footerContent}>廣告合作夥伴</span>
              </strong>
            </h5>
            <div className="row d-flex">
              <div className="col-lg-6 col-md-6 col-xs-12 d-flex align-items-center justify-content-center pb-2">
                <Link href="/help-center/ad-partner">
                  <img
                    className={`${style.adbox}`}
                    src="/n1.png"
                    alt=""
                    width={155}
                    height={155}
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
                    width={155}
                    height={155}
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
                    width={155}
                    height={155}
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
                    width={155}
                    height={155}
                    style={{ borderRadius: '30px' }}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-xs-12 mb-5 text-center">
                <h5 className="text-uppercase mb-4">
                  <strong>
                    <FaRegHandPointDown
                      className={`mb-2 ${style.footerContent}`}
                    />
                    &nbsp;
                    <span className={style.footerContent}>探索DEAL</span>
                  </strong>
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link
                    className="mb-3"
                    href="/shop"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      探索商品
                    </span>
                  </Link>
                  <Link
                    className="mb-3"
                    href="/shop/random-search"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      隨機探索
                    </span>
                  </Link>
                  <Link
                    className="mb-3"
                    href="#"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      優惠券專區
                    </span>
                  </Link>
                  <Link
                    className="mb-3"
                    href="#"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      小碳點等級
                    </span>
                  </Link>
                  <Link
                    className="text-secondary mb-3"
                    href="/help-center/join-deal"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      加入DEAL
                    </span>
                  </Link>
                  <Link
                    className="text-secondary"
                    href="/help-center/ad-partner"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      廣告合作
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-xs-12 mb-5 text-center">
                <h5 className="text-uppercase mb-4">
                  <strong>
                    <FaRegHandPointDown
                      className={`mb-2 ${style.footerContent}`}
                    />
                    &nbsp;
                    <span className={style.footerContent}>了解DEAL</span>
                  </strong>
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <Link
                    className="mb-3 ps-2"
                    href="/help-center/deal"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      認識DEAL
                    </span>
                  </Link>
                  <Link
                    className="mb-3 ps-2"
                    href="/help-center/esg"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      認識ESG
                    </span>
                  </Link>
                  <Link
                    className="mb-3 ps-2"
                    href="/help-center/privacy-rule"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      隱私條款
                    </span>
                  </Link>
                  <Link
                    className="mb-3 ps-2"
                    href="/help-center/using-rule"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      使用條款
                    </span>
                  </Link>
                  <Link
                    className="mb-3 ps-2"
                    href="/help-center"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      幫助中心
                    </span>
                  </Link>
                  <Link
                    className="text-secondary ps-2"
                    href="/contact-us"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className={style.selectOptions}>
                      <FaAngleRight
                        className="me-2"
                        style={{ fontSize: '15px' }}
                      />
                      聯絡我們
                    </span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 mb-5 text-center">
                <h5 className="text-uppercase mb-4">
                  <strong>
                    <FaUserEdit className={`mb-2 ${style.footerContent}`} />
                    &nbsp;
                    <span className={style.footerContent}>成為DEAL會員</span>
                  </strong>
                </h5>
                <span className={style.option}>
                  還沒成為DEAL會員嗎？快來註冊吧！
                </span>
                <div className="mt-2">
                  <FaHandPointRight
                    className={style.point}
                    style={{
                      color: 'white',
                      fontSize: '25px',
                      marginRight: '20px',
                    }}
                  />
                  <button
                    className={`btn rounded ${style.registerBtn}`}
                    style={{
                      backgroundColor: '#e96d3f',
                      border: 'none',
                      height: '43px',
                      color: 'white',
                    }}
                    onClick={handleRegisterClick}
                    href="#register"
                  >
                    <span style={{ fontSize: '18px' }}>
                      <strong>註冊</strong>
                    </span>
                  </button>
                </div>
                <h6 className="text-uppercase mt-5 mb-3">
                  <span
                    style={{
                      color: 'white',
                      fontSize: '20px',
                      paddingLeft: '4px',
                    }}
                  >
                    Follow Us
                  </span>
                </h6>
                <div className="d-flex justify-content-center ps-2">
                  <Link className="me-2" href="#">
                    <FaSquareXTwitter
                      className={style.socialIcons}
                      style={{ color: 'black', backgroundColor: 'white' }}
                    />
                  </Link>
                  <Link className="me-2" href="#">
                    <FaFacebookSquare
                      className={style.socialIcons}
                      style={{ backgroundColor: 'white' }}
                    />
                  </Link>
                  <Link className="me-2" href="#">
                    <FaLinkedin
                      className={style.socialIcons}
                      style={{ color: '#1163cd', backgroundColor: 'white' }}
                    />
                  </Link>
                  <Link className="" href="#">
                    <FaInstagramSquare
                      className={style.socialIcons}
                      style={{
                        backgroundColor: 'white',
                        color: 'purple',
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row border-top pt-3 d-flex justify-centent-between"
          style={{ borderColor: 'rgba(256, 256, 256, .1)' }}
        >
          <div className="col-lg-2 col-md-12 col-sm-12 pb-2 text-center">
            <img
              className="rounded-circle"
              src="/logo9.png"
              alt=""
              width={200}
              height={200}
              style={{
                width: '60px',
                height: '60px',
                boxShadow: '0 0 10px white',
              }}
            />
            <div className="pt-1" style={{ fontSize: '14px', color: 'white' }}>
              &nbsp;&copy; 2024 DEAL
            </div>
          </div>
          <div
            className="col-lg-8 d-flex align-items-center text-center d-none d-sm-block pt-4"
            style={{ padding: '0 4% 0 4%' }}
          >
            <Link
              style={{
                fontSize: '16px',
                color: 'white',
                marginRight: '5%',
              }}
              className={style.list}
              href="/help-center"
            >
              <strong>幫助中心</strong>
            </Link>
            <Link
              style={{ fontSize: '16px', color: 'white', marginRight: '5%' }}
              className={style.list}
              href="/contact-us"
            >
              <strong>聯絡我們</strong>
            </Link>
            <Link
              style={{ fontSize: '16px', color: 'white', marginRight: '5%' }}
              className={style.list}
              href="/help-center/esg"
            >
              <strong>永續發展</strong>
            </Link>
            <Link
              style={{ fontSize: '16px', color: 'white', marginRight: '5%' }}
              className={style.list}
              href="/help-center/join-deal"
            >
              <strong>公司職缺</strong>
            </Link>
            <Link
              style={{ fontSize: '16px', color: 'white', marginRight: '5%' }}
              className={style.list}
              href="/help-center/using-rule"
            >
              <strong>使用條款</strong>
            </Link>
            <Link
              style={{ fontSize: '16px', color: 'white', marginRight: '5%' }}
              className={style.list}
              href="/help-center/privacy-rule"
            >
              <strong>隱私政策</strong>
            </Link>
          </div>
          <div
            className="col-lg-2 d-none d-sm-none d-md-none d-lg-block d-flex"
            style={{ paddingRight: '5%' }}
          >
            <div className="pt-4" style={{ width: '100%' }}>
              <select
                className="form-select form-select-sm shadow-xl form-control"
                aria-label=".form-select-sm example"
              >
                <option value="cn">繁體中文</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="jp">Japanese</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* RegisterModal start */}
      <RegisterModal show={showRegister} onHide={handleRegisterClose} />
      {/* RegisterModal end */}
      {/* ad start */}
      <div className={style.adArea} style={{ display: isClose ? 'none' : '' }}>
        <Link href="/help-center/join-deal">
          <img
            className="rounded-circle shadow-lg"
            src="/ad.png"
            alt=""
            width={200}
            height={200}
            style={{ border: '3px solid #8e2626' }}
          />
          <span
            className="badge rounded-pill px-3 py-1"
            style={{ fontSize: '20px' }}
          >
            加入我們
          </span>
        </Link>
        <button
          type="button"
          className="btn translate-middle"
          data-bs-dismiss="card"
          style={{ border: 'none' }}
        >
          <IoCloseCircle
            style={{
              fontSize: '30px',
              color: '#e96d3f',
              backgroundColor: 'white',
              borderRadius: '50%',
            }}
            onClick={handleCloseBtn}
          />
        </button>
      </div>
      {/* ad end */}
    </>
  )
}

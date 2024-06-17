import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { PROD_LIST } from '@/configs/config-r'
import { useRouter } from 'next/router'
// page -----
import LoginPage from '@/components/member/login-modal'
import RegisterModal from '@/components/member/register-modal'
import LogoutButton from '@/components/member/logout-button'
// style-----
import style from './navbar.module.css'
// react bootstrap
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { Navbar, Nav } from 'react-bootstrap'
// react icons-----
import { TbMessage, TbArrowsExchange } from 'react-icons/tb'
import {
  FaUser,
  FaClipboardList,
  FaShoppingCart,
  FaHeart,
  FaHandPointRight,
  FaHouseUser,
} from 'react-icons/fa'
import { IoLogIn, IoLanguage } from 'react-icons/io5'
import { GiArchiveRegister } from 'react-icons/gi'
import { FaCircleUser, FaTreeCity, FaBars } from 'react-icons/fa6'
import { RiCoupon3Fill } from 'react-icons/ri'
// hook------
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/hooks/use-cart'
import { useLike } from '@/hooks/use-like'

export default function CustomNavbar({ pageName = '' }) {
  const { totalItems } = useCart()
  const { totalProds } = useLike()

  // 會員的資料跟登入狀態
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
  // 關閉註冊視窗
  const handleRegisterClose = () => setShowRegister(false)
  // 點擊註冊按鈕
  const handleRegisterClick = () => setShowRegister(true)

  // 如果已經登入，則關閉模態框
  useEffect(() => {
    if (auth.isAuth) {
      setShowLogin(false)
      checkAuth()
    }
  }, [auth.isAuth])

  // ---Hover status---
  const [isMessageHovered, setIsMessageHovered] = useState(false)
  const [isUserHovered, setIsUserHovered] = useState(false)
  const [isLanHovered, setIsLanHovered] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleMouseEnter = (type) => {
    if (type === 'message') setIsMessageHovered(true)
    if (type === 'user') setIsUserHovered(true)
    if (type === 'language') setIsLanHovered(true)
  }
  const handleMouseLeave = (type) => {
    if (type === 'message') setIsMessageHovered(false)
    if (type === 'user') setIsUserHovered(false)
    if (type === 'language') setIsLanHovered(false)
  }

  // Product & Category
  const [data, setData] = useState({
    success: false,
    keyword: '',
    searchMain: '',
    cate: [],
  })

  useEffect(() => {
    fetch(`${PROD_LIST}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
        console.log(dataObj)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  // Router-----
  const router = useRouter()

  // top search input
  const onSearch = (e) => {
    e.preventDefault()
    let keyword = e.currentTarget.keyword?.value
    keyword = keyword.trim()
    if (keyword) {
      router.push(`/shop?keyword=${keyword}`)
    } else {
      router.push(`/shop?`)
    }
  }

  return (
    <>
      {/* Topbar Start*/}
      <div className="container-fluid">
        <div
          className="row py-1 px-xl-5 d-flex justify-content-between align-items-center pt-1"
          style={{ backgroundColor: '#f6f4f4' }}
        >
          <div className="col-lg-6 col-md-12 text-center text-lg-start">
            <div className="d-inline-flex align-items-center h-100">
              <Link className={style.textBody} href="/help-center">
                <strong>幫助中心</strong>
              </Link>
              <Link className={style.textBody} href="/help-center/deal">
                <strong>認識DEAL</strong>
              </Link>
              <Link className={style.textBody} href="/help-center/privacy-rule">
                <strong>隱私條款</strong>
              </Link>
              <Link className={style.textBody} href="/help-center/using-rule">
                <strong>使用條款</strong>
              </Link>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 text-center text-lg-end">
            <div className="d-inline-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  onMouseEnter={() => handleMouseEnter('message')}
                  onMouseLeave={() => handleMouseLeave('message')}
                  style={{
                    backgroundColor: isMessageHovered ? '#d6d4d4' : '#F5F5F5',
                    border: 'none',
                    color: '#8e2626',
                  }}
                >
                  <TbMessage
                    className={style.fs20}
                    style={{ color: '#8e2626' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <div className="textBox d-flex align-items-center justify-content-center border-bottom border-2">
                      <strong>尚待開發中</strong>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className={style.ml5}>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  onMouseEnter={() => handleMouseEnter('user')}
                  onMouseLeave={() => handleMouseLeave('user')}
                  style={{
                    backgroundColor: isUserHovered ? '#d6d4d4' : '#F5F5F5',
                    border: 'none',
                    color: '#8e2626',
                  }}
                >
                  <FaUser style={{ color: '#8e2626' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {auth.isAuth ? (
                    <>
                      <Dropdown.Item
                        href="/member/profile"
                        style={{ fontSize: '20px' }}
                      >
                        <FaCircleUser
                          className={style.mr2}
                          style={{ color: '#3939f4' }}
                        />
                        &nbsp;
                        <strong>會員中心</strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/member-levels"
                        style={{ fontSize: '20px' }}
                      >
                        <FaTreeCity
                          className={(style.fs20, style.mr2)}
                          style={{ color: '#0d8209' }}
                        />
                        &nbsp;<strong>會員等級</strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/Maket/index-maket"
                        style={{ fontSize: '20px' }}
                      >
                        <FaHouseUser
                          className={(style.fs20, style.mr2)}
                          style={{ color: '#5a7be8' }}
                        />
                        &nbsp;<strong>我的賣場</strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/buyer/order-list"
                        style={{ fontSize: '20px' }}
                      >
                        <FaClipboardList
                          className={(style.fs20, style.mr2)}
                          style={{ color: '#5a0982' }}
                        />
                        &nbsp;<strong>我的訂單</strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/member/barter"
                        style={{ fontSize: '20px' }}
                      >
                        <TbArrowsExchange
                          className={(style.fs20, style.mr2)}
                          style={{ color: '#41ca73' }}
                        />
                        &nbsp;<strong>我的以物易物</strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/coupon/list"
                        style={{ fontSize: '20px' }}
                      >
                        <RiCoupon3Fill
                          className={(style.fs20, style.mr2)}
                          style={{ color: '#ce690b' }}
                        />
                        &nbsp;<strong>優惠券紀錄</strong>
                      </Dropdown.Item>
                      <Dropdown.Item style={{ fontSize: '20px' }}>
                        <strong>
                          <LogoutButton />
                        </strong>
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item
                        href="#login"
                        style={{ fontSize: '20px' }}
                        onClick={handleLoginClick}
                      >
                        <IoLogIn
                          className={style.mr2}
                          style={{ fontSize: '25px' }}
                        />
                        &nbsp;
                        <strong>
                          {auth.isAuth ? auth.userData.nickname : '登入'}
                        </strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#register"
                        style={{ fontSize: '20px' }}
                        onClick={handleRegisterClick}
                      >
                        <GiArchiveRegister
                          className={style.mr2}
                          style={{
                            color: '#2f4f4f',
                          }}
                        />
                        &nbsp;<strong> 註冊</strong>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="/member-levels"
                        style={{ fontSize: '20px' }}
                      >
                        <FaTreeCity
                          className={(style.fs20, style.mr2)}
                          style={{ color: '#0d8209' }}
                        />
                        &nbsp;<strong>會員等級</strong>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className={style.ml5}>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  onMouseEnter={() => handleMouseEnter('language')}
                  onMouseLeave={() => handleMouseLeave('language')}
                  style={{
                    backgroundColor: isLanHovered ? '#d6d4d4' : '#F5F5F5',
                    border: 'none',
                    color: '#8e2626',
                  }}
                >
                  <IoLanguage style={{ color: '#8e2626' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" style={{ fontSize: '20px' }}>
                    &nbsp;<strong>．中文</strong>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" style={{ fontSize: '20px' }}>
                    &nbsp;<strong>．English</strong>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3" style={{ fontSize: '20px' }}>
                    &nbsp;<strong>．Français</strong>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-4" style={{ fontSize: '20px' }}>
                    &nbsp;<strong>．日本語</strong>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="row align-items-center px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link href="/" className="text-decoration-none">
              <img
                className={`${style.logo}`}
                src="/logo9.png"
                alt=""
                width={150}
                height={150}
              />
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form role="search" onSubmit={onSearch}>
              <InputGroup className="ms-2 mb-3 shadow-lg">
                <Form.Control
                  placeholder="挖掘寶物吧！"
                  type="search"
                  aria-label="search"
                  aria-describedby="basic-addon2"
                  className="form-control"
                  name="keyword"
                  defaultValue={router.query.keyword}
                />
                <Button
                  type="submit"
                  id="button-addon2"
                  style={{ backgroundColor: '#e96d3f', border: '#e96d3f' }}
                  className={style.inputSearch}
                >
                  搜尋
                </Button>
              </InputGroup>
            </form>
          </div>
          <div className="col-lg-4 col-6 d-flex justify-content-end">
            {pageName === 'randomSearch' ? (
              <>
                <div className="">
                  <h5>
                    <strong>已經有想要的商品？</strong>
                  </h5>
                  <span>
                    <strong>前往這裡</strong>&nbsp;
                    <FaHandPointRight style={{ color: '#8e2626' }} />
                    &nbsp;
                    <Link href="/shop">
                      <button
                        type="button"
                        className={style.searchBtn}
                        href=""
                        style={{ backgroundColor: '#e96d3f', color: 'white' }}
                      >
                        探索商品
                      </button>
                    </Link>
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <h5 className="ms-1" style={{ paddingLeft: '15px' }}>
                    <strong>不知道從哪裡開始？</strong>
                  </h5>
                  <span style={{ paddingLeft: '25px' }}>
                    <strong>試試這個</strong>&nbsp;
                    <FaHandPointRight style={{ color: '#8e2626' }} />
                    &nbsp;
                    <Link href="/shop/random-search">
                      <button
                        type="button"
                        className={style.searchBtn}
                        href=""
                        style={{ backgroundColor: '#e96d3f', color: 'white' }}
                      >
                        隨機探索
                      </button>
                    </Link>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Topbar End*/}

      {/* Navbar Start */}
      <div
        className="container-fluid mb-30"
        style={{ backgroundColor: '#8e2626' }}
      >
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                style={{
                  width: 'calc(100% - 20px)',
                  zIndex: '999',
                  height: '65px',
                  padding: '0 30px',
                  backgroundColor: '#e96d3f',
                  border: 'none',
                }}
              >
                <strong>
                  <FaBars className="mb-1" />
                  &nbsp;<span style={{ fontSize: '19px' }}>商品分類</span>
                </strong>
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  width: 'calc(100% - 20px)',
                  height: '500px',
                  overflow: 'auto',
                }}
              >
                {data.cate.map((v, i) => {
                  if (v.parent_id == 0) {
                    return (
                      <Dropdown.Item
                        key={i}
                        href={`/shop?searchMain=${v.category_name}`}
                        className={`mb-2 ${style.itemClick}`}
                        defaultValue={v.category_name}
                      >
                        <strong>．{v.category_name}</strong>
                      </Dropdown.Item>
                    )
                  }
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-9">
            <Navbar
              expand="lg"
              className="navbar navbar-expand-lg navbar-dark py-3 py-lg-0 px-0"
            >
              <Navbar.Brand
                href="/"
                className="text-decoration-none d-block d-lg-none"
              >
                <img
                  className="logo rounded-circle"
                  src="/logo-sm.png"
                  alt=""
                  width={70}
                  height={70}
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarCollapse" />
              <Navbar.Collapse id="navbarCollapse">
                <div className="d-flex justify-content-between w-100">
                  <Nav
                    className="navbar-nav mr-auto py-0"
                    style={{ marginTop: '10px' }}
                  >
                    <Nav.Link
                      href="/"
                      className={`nav-item nav-link me-3 ${
                        pageName === 'home' ? 'active' : ''
                      }`}
                    >
                      <strong>
                        <span style={{ fontSize: '19px' }}>首頁</span>
                      </strong>
                    </Nav.Link>
                    <Nav.Link
                      href="/shop"
                      className={`nav-item nav-link me-3 ${
                        pageName === 'productSearch' ? 'active' : ''
                      }`}
                    >
                      <strong>
                        <span style={{ fontSize: '19px' }}>探索商品</span>
                      </strong>
                    </Nav.Link>
                    <Nav.Link
                      href="/shop/random-search"
                      className={`nav-item nav-link me-3 ${
                        pageName === 'randomSearch' ? 'active' : ''
                      }`}
                    >
                      <strong>
                        <span style={{ fontSize: '19px' }}>隨機探索</span>
                      </strong>
                    </Nav.Link>
                    <Nav.Link
                      href="/contact-us"
                      className={`nav-item nav-link me-3 ${
                        pageName === 'contactUs' ? 'active' : ''
                      }`}
                    >
                      <strong>
                        <span style={{ fontSize: '19px' }}>聯絡我們</span>
                      </strong>
                    </Nav.Link>
                    <Nav.Link
                      href="/coupon"
                      className={`nav-item nav-link ${
                        pageName === 'coupon' ? 'active' : ''
                      }`}
                    >
                      <strong>
                        <span style={{ fontSize: '19px' }}>優惠券專區</span>
                      </strong>
                    </Nav.Link>
                  </Nav>
                  {auth.isAuth ? (
                    <>
                      <Nav className="navbar-nav ml-auto py-0 d-none d-lg-block">
                        <div className="d-flex">
                          <Nav.Link href="/shop/like" className="btn px-0">
                            <FaHeart
                              className="me-1"
                              style={{ color: 'white', fontSize: '20px' }}
                            />
                            <span className="badge text-light border border-light rounded-circle mt-3">
                              {totalProds}
                            </span>
                          </Nav.Link>
                          <Nav.Link
                            href={`/shop/cart`}
                            className="btn px-0 ml-3 ms-3"
                          >
                            <FaShoppingCart
                              className="me-1"
                              style={{ color: 'white', fontSize: '20px' }}
                            />
                            <span className="badge text-light border border-light rounded-circle mt-3">
                              {totalItems}
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav>
                    </>
                  ) : (
                    <>
                      <Nav className="navbar-nav ml-auto py-0 d-none d-lg-block">
                        <div className="d-flex">
                          <Nav.Link href="/shop/like" className="btn px-0">
                            <FaHeart
                              className="me-1"
                              style={{ color: 'white', fontSize: '20px' }}
                            />
                            <span className="badge text-light border border-light rounded-circle mt-3">
                              0
                            </span>
                          </Nav.Link>
                          <Nav.Link
                            href={`/shop/cart`}
                            className="btn px-0 ml-3 ms-3"
                          >
                            <FaShoppingCart
                              className="me-1"
                              style={{ color: 'white', fontSize: '20px' }}
                            />
                            <span className="badge text-light border border-light rounded-circle mt-3">
                              0
                            </span>
                          </Nav.Link>
                        </div>
                      </Nav>
                    </>
                  )}
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
      {/* Navbar End */}
      {/* Login Modal start */}
      <LoginPage
        show={showLogin}
        onHide={handleLoginClose}
        onSubmit={handleLoginSubmit}
      />
      {/* Login Modal end */}
      {/* RegisterModal start */}
      <RegisterModal show={showRegister} onHide={handleRegisterClose} />
      {/* RegisterModal end */}
    </>
  )
}

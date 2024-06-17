import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from '@/styles/navbar.module.css'
import IndexMaket from './index-maket'

export default function Navbar({ pageName = '' }) {
  return (
    <>
      {/* topbar start */}
      <div className="container-fluid topBar">
        <div className="row bg-secondary py-1 px-xl-5 border-bottom border-3 topBar-a">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <Link className="text-body mr-3" href="">
                <strong>認識DEAL</strong>
              </Link>
              <Link className="text-body mr-3" href="">
                <strong>幫助中心</strong>
              </Link>
              <Link className="text-body mr-3" href="">
                <strong>隱私條款</strong>
              </Link>
              <Link className="text-body mr-3" href="">
                <strong>使用條款</strong>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle rounded"
                  data-toggle="dropdown"
                >
                  <i className="fa-solid fa-comments"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right rounded">
                  <button className="dropdown-item" type="button">
                    <div className="textBox d-flex align-items-center justify-content-between border-bottom border-2">
                      <div className="boxLeft d-flex">
                        <div className="mt-3 position-relative">
                          <Image
                            className="border border-1 rounded-circle"
                            src="/public/imgs/logo-sm.png"
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="mx-2">
                          <div className="boxId pt-2">
                            <p>
                              <strong>kjljkrh</strong>
                            </p>
                          </div>
                          <div className="boxContent pt-0">
                            <p>請問這個商品還有嗎?</p>
                          </div>
                        </div>
                      </div>
                      <div className="boxRight pt-3 me-2">
                        <p>時間</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="btn-group ms-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle rounded"
                  data-toggle="dropdown"
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right rounded">
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#userModal"
                  >
                    <strong>
                      <i className="fa-solid fa-address-book fa-lg"></i> 登入
                    </strong>
                  </button>
                  <button className="dropdown-item" type="button">
                    <strong>
                      <i className="fa-solid fa-user-plus"></i> 註冊
                    </strong>
                  </button>
                </div>
              </div>
              <div className="btn-group ms-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle rounded"
                  data-toggle="dropdown"
                >
                  <i className="fa-solid fa-user"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right rounded">
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#userModal"
                  >
                    <strong>
                      <i className="fa-solid fa-address-card"></i>
                      會員中心
                    </strong>
                  </button>
                  <button className="dropdown-item" type="button">
                    <strong>
                      <i
                        className="fa-solid fa-rectangle-list"
                        style={{ color: '#2d69d2' }}
                      ></i>
                      訂購紀錄
                    </strong>
                  </button>
                  <button className="dropdown-item" type="button">
                    <strong>
                      <i
                        className="fa-solid fa-tree-city"
                        style={{ color: '#1d9315' }}
                      ></i>
                      小碳點紀錄
                    </strong>
                  </button>
                  <button className="dropdown-item" type="button">
                    <strong>
                      <i
                        className="fa-solid fa-ticket"
                        style={{ color: '#55c3b6' }}
                      ></i>
                      優惠券紀錄
                    </strong>
                  </button>
                  <button className="dropdown-item" type="button">
                    <strong>
                      <i className="fa-solid fa-right-from-bracket"></i>
                      登出
                    </strong>
                  </button>
                </div>
              </div>
              <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle rounded"
                  data-toggle="dropdown"
                >
                  <i
                    className="fa-solid fa-language fa-lg"
                    style={{ color: '#3f44ee' }}
                  ></i>
                </button>
                <div className="dropdown-menu dropdown-menu-right rounded">
                  <button className="dropdown-item" type="button">
                    <strong>．中文</strong>
                  </button>
                  <button className="dropdown-item" type="button">
                    <strong>．English</strong>
                  </button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <Link href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: '2px' }}
                >
                  0
                </span>
              </Link>
              <Link href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: '2px' }}
                >
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row align-items-center px-xl-4 d-none d-lg-flex bg-light topBar-b">
          <div className="col-lg-2">
            <Link href="" className="text-decoration-none">
              <Image
                className="logo9"
                src="/public/imgs/logo9.png"
                alt=""
                width={500}
                height={500}
              />
            </Link>
          </div>
          <div className="col-lg-7 text-left d-flex searchArea">
            <select
              className="form-select shadow-lg"
              aria-label="Default select example"
            >
              <option selected disabled>
                <p className="optionColor">想要就近省運費！</p>
              </option>
              <option value="1">台北市</option>
              <option value="2">新北市</option>
              <option value="3">桃園市</option>
              <option value="4">台中市</option>
              <option value="5">台南市</option>
              <option value="6">高雄市</option>
              <option value="7">基隆市</option>
              <option value="8">新竹市</option>
              <option value="9">新竹縣</option>
              <option value="10">苗栗縣</option>
              <option value="11">彰化縣</option>
              <option value="12">南投縣</option>
              <option value="13">雲林縣</option>
              <option value="14">嘉義市</option>
              <option value="15">嘉義縣</option>
              <option value="16">屏東縣</option>
              <option value="17">宜蘭縣</option>
              <option value="18">花蓮縣</option>
              <option value="19">台東縣</option>
              <option value="20">澎湖縣</option>
              <option value="21">金門縣</option>
              <option value="22">連江縣</option>
            </select>
            <form action="" className="mx-2 form-search shadow-lg">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="搜尋"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-2 col-6 adArea"></div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <div className="container-fluid bg-dark mb-30 navbarArea">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <button
              className="btn d-flex align-items-center justify-content-between bg-primary w-100 dropdown-toggle text-secondary"
              type="button"
              data-toggle="dropdown"
              aria-expanded="false"
              style={{ height: '65px', padding: '0 30px' }}
            >
              <h6 className="text-dark m-0 cate">
                <i className="fa fa-bars mr-2"></i>
                <strong>商品分類</strong>
              </h6>
            </button>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light dropdown-menu dropdown-menu-right"
              id="navbar-vertical"
              style={{ width: 'calc(100% - 30px)', zIndex: '999' }}
            >
              <div
                className="navbar-nav w-100 overflow-auto shadow-lg"
                style={{ height: '450px' }}
              >
                <Link href="" className="nav-item nav-link">
                  免費禮物
                </Link>
                <Link href="" className="nav-item nav-link">
                  電腦科技
                </Link>
                <Link href="" className="nav-item nav-link">
                  手機配件
                </Link>
                <Link href="" className="nav-item nav-link">
                  男裝服飾
                </Link>
                <Link href="" className="nav-item nav-link">
                  女裝服飾
                </Link>
                <Link href="" className="nav-item nav-link">
                  美妝保養
                </Link>
                <Link href="" className="nav-item nav-link">
                  名牌精品
                </Link>
                <Link href="" className="nav-item nav-link">
                  電玩遊戲
                </Link>
                <Link href="" className="nav-item nav-link">
                  耳機錄音
                </Link>
                <Link href="" className="nav-item nav-link">
                  相機拍攝
                </Link>
                <Link href="" className="nav-item nav-link">
                  家具家居
                </Link>
                <Link href="" className="nav-item nav-link">
                  電視電器
                </Link>
                <Link href="" className="nav-item nav-link">
                  嬰兒孩童
                </Link>
                <Link href="" className="nav-item nav-link">
                  健康營養品
                </Link>
                <Link href="" className="nav-item nav-link">
                  運動用品
                </Link>
                <Link href="" className="nav-item nav-link">
                  食物飲料
                </Link>
                <Link href="" className="nav-item nav-link">
                  寵物用品
                </Link>
                <Link href="" className="nav-item nav-link">
                  門票票券
                </Link>
                <Link href="" className="nav-item nav-link">
                  機車汽車
                </Link>
                <Link href="" className="nav-item nav-link">
                  其他
                </Link>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <Link href="" className="text-decoration-none d-block d-lg-none">
                <Image
                  className="logo8 rounded-circle"
                  src="/public/imgs/logo9.png"
                  alt=""
                  width={500}
                  height={500}
                />
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link href="index.html" className="nav-item nav-link active">
                    <strong>首頁</strong>
                  </Link>
                  <Link href="shop.html" className="nav-item nav-link">
                    <strong>探索商品</strong>
                  </Link>
                  <Link href="shop.html" className="nav-item nav-link">
                    <strong>隨機探索</strong>
                  </Link>
                  <Link href="shop.html" className="nav-item nav-link">
                    <strong>領取優惠券</strong>
                  </Link>
                  <Link href="contact.html" className="nav-item nav-link">
                    <strong>聯絡我們</strong>
                  </Link>
                  <Link href="detail.html" className="nav-item nav-link">
                    Shop Detail
                  </Link>
                  <div className="nav-item dropdown">
                    <Link
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages <i className="fa fa-angle-down mt-1"></i>
                    </Link>
                    <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                      <Link href="cart.html" className="dropdown-item">
                        Shopping Cart
                      </Link>
                      <Link href="checkout.html" className="dropdown-item">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link href="" className="btn px-0">
                    <i className="fas fa-heart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: '2px' }}
                    >
                      0
                    </span>
                  </Link>
                  <Link href="" className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary"></i>
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: '2px' }}
                    >
                      0
                    </span>
                  </Link>
                  <button
                    className="btn btn-sm dropdown-toggle px-0"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-caret-down text-secondary"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right overflow-auto shadow cart px-3">
                    <h4 className="mt-2">
                      <strong>購物車</strong>
                    </h4>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="pt-2">
                      <div className="d-flex flex-column">
                        <div className="prod1 d-flex">
                          <Link href="">
                            <Image
                              className="cart-img"
                              src="/public/imgs/gift.jpg"
                              alt=""
                              width={50}
                              height={50}
                            />
                          </Link>
                          <div className="txt ms-3">
                            <div className="title">
                              <Link className="text-decoration-none" href="">
                                皮革背心大衣
                              </Link>
                            </div>
                            <div className="price">NT$3980</div>
                            <div className="icon">
                              <i className="fa-regular fa-trash-can"></i>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between px-3 mt-2">
                          <div className="qty d-flex">
                            <div className="minus border border-1 border-dark ps-2">
                              -
                            </div>
                            <input
                              type="text"
                              className="number border-top border-end border-bottom border-1 border-dark"
                              id=""
                              name=""
                            />
                            <div className="plus border-top border-end border-bottom border-1 border-dark px-1">
                              +
                            </div>
                          </div>
                          <div className="totalprice">NT$3980</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="pt-2">
                      <div className="d-flex flex-column">
                        <div className="prod1 d-flex">
                          <Link href="">
                            <Image
                              className="cart-img"
                              src="/public/imgs/gift.jpg"
                              alt=""
                              width={50}
                              height={50}
                            />
                          </Link>
                          <div className="txt ms-3">
                            <div className="title">
                              <Link className="text-decoration-none" href="">
                                皮革背心大衣
                              </Link>
                            </div>
                            <div className="price">NT$3980</div>
                            <div className="icon">
                              <i className="fa-regular fa-trash-can"></i>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between px-3 mt-2">
                          <div className="qty d-flex">
                            <div className="minus border border-1 border-dark ps-2">
                              -
                            </div>
                            <input
                              type="text"
                              className="number border-top border-end border-bottom border-1 border-dark"
                              id=""
                              name=""
                            />
                            <div className="plus border-top border-end border-bottom border-1 border-dark px-1">
                              +
                            </div>
                          </div>
                          <div className="totalprice">NT$3980</div>
                        </div>
                      </div>
                    </li>
                    <li className="pt-4">
                      <div className="coupon d-flex justify-content-end">
                        {/* Button trigger modal */}
                        <button
                          type="button"
                          className="btn coupon-btn rounded"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="coupon-title d-flex justify-content-between mt-2">
                            <h5 className="coupon-title px-1">優惠券</h5>
                            <i className="fa-solid fa-angle-right ms-1 pt-1"></i>
                          </div>
                          <div className="content coupon-content">
                            <p>別忘了您的優惠券！</p>
                          </div>
                        </button>
                      </div>
                    </li>
                    <li>
                      <div className="price-count">
                        <div className="total">
                          <p>合計</p>
                        </div>
                        <div className="final-price">
                          <h4>NT$6660</h4>
                        </div>
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="py-2">
                      <div className="submit-buttom">
                        <button className="btn pay-btn-color" type="submit">
                          結帳囉！
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </>
  )
}

import React, { useState, useEffect } from 'react'
import {
  CHECK_OUT_ADD,
  PRODUCTS_API,
  PRODUCTS_API_SHOP,
} from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { BARGAIN } from '@/configs/configs-buyer'
import { useAuth } from '@/context/auth-context'
import Head from 'next/head'
import DefaultLayout from '@/components/common/default-layout'
import Styles from '@/styles/buyer.module.css'
import { FaNpm } from 'react-icons/fa'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import Footer from '@/components/common/footer/footer'
import Link from 'next/link'
import { FaPersonBreastfeeding, FaSeedling } from 'react-icons/fa6'
import style from '@/pages/shop/cart.module.css'
import { CART_ITEM_DELETE2 } from '@/configs/config-r'

export default function Checkout() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const router = useRouter()
  const { checkAuth, auth } = useAuth()

  // 取得商品資料表
  const [productData, setProductData] = useState({
    success: false,
  })
  useEffect(() => {
    fetch(`${PRODUCTS_API}`)
      .then((r) => r.json())
      .then((dataObj) => setProductData(dataObj))
  }, [router.query])

  console.log(productData)

  // -----------
  //--議價部分
  const [bargainData, setBargainData] = useState({
    product_id: '5',
    after_bargin_price: '',
    buyer_id: '1', // 初始化为空字符串
    p_qty: '',
    available_cp: '',
  })

  const SubmitBargain = async (e) => {
    e.preventDefault()

    const r = await fetch(BARGAIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bargainData),
    })

    const result = await r.json()
    console.log(result)
    if (result) {
      MySwal.fire({
        title: '提出議價成功',

        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/buyer/bargain-buyer-req')
        }
      })
    } else {
      alert('議價提出失敗')
    }
  }
  //----------

  const [formData, setFormData] = useState({
    name: '',
    class: '1',
    shipment_fee: '60',
    payment_way: '',
    total_price: [],
    total_amount: '0',
    address: '',
    discount_coupon: '0',
    product_id: [],
    product_price: [],
    seller_id: '', // 初始化为空字符串
    buyer_id: '1',
    item_qty: '',
    carbon_points_available: [],
    after_bargin_price: null,
  })

  //設一個狀態儲存totalPrice
  const [totalPrice, setTotalPrice] = useState([])
  const [totalPriceAdd, setTotalPriceAdd] = useState(0)
  // 使用 useEffect 在数据加载后设置 formData

  useEffect(() => {
    // 检查 productData 是否存在且包含 rows 属性
    if (productData && productData.rows) {
      // 从 productData 中提取数据并设置到 formData
      const newProductId = []
      const newProductPrice = []
      const newProductData = []

      let newSellerId = []
      let totalPrice = []
      let totalPriceAndShip = []
      let totalAmount = []

      let totalPriceAdd = 0
      let shipmentFee = []
      let discountCoupon = []
      let carbonPointsAvailable = []
      console.log(productData.rows)
      productData.rows.forEach((v) => {
        newProductId.push(v.product_id)
        newProductPrice.push(v.p_price)
        newSellerId.push(v.seller_id)
        // totalPrice = totalPrice + v.product_price
        totalPrice.push(v.total_price)
        totalPriceAndShip.push(v.total_price + 60)
        totalAmount.push(v.p_qty)

        shipmentFee.push(60)
        discountCoupon.push(0)
        carbonPointsAvailable.push(v.available_cp)
      })
      for (let i = 0; i < totalPrice.length; i++) {
        totalPriceAdd = totalPriceAdd + totalPrice[i]
      }
      setTotalPriceAdd(totalPriceAdd)
      // 更新 formData
      console.log(totalAmount)
      console.log(shipmentFee)
      setFormData({
        ...formData, // 保留 formData 中其他属性
        product_id: newProductId,
        product_price: newProductPrice,
        seller_id: newSellerId,
        total_price: totalPriceAndShip,
        total_amount: totalAmount,
        item_qty: totalAmount,
        shipment_fee: shipmentFee,
        discount_coupon: discountCoupon,
        carbon_points_available: carbonPointsAvailable,
      })
      // setBargainData({ ...bargainData, seller_id: newSellerId })

      setTotalPrice(totalPrice)
      console.log(totalPrice) // 输出新的 seller_id
    }
  }, [productData]) // 在 productData 更新时触发 useEffect
  // 使用 useEffect 在数据加载后设置 formData
  console.log(productData)

  useEffect(() => {
    if (auth.isAuth) {
      setFormData({ ...formData, buyer_id: auth.userData.id })
      setBargainData({ ...bargainData, buyer_id: auth.userData.id })
    }
  }, [auth])
  console.log({ auth })

  //取得購物車的資料

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const params = new URLSearchParams({ id: auth.userData.id })
        const response = await fetch(`${PRODUCTS_API_SHOP}?${params}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        const dataObj = await response.json()
        setProductData(dataObj)
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }

    fetchOrderData()
  }, [router.query, auth])
  //計算運費+商品的總價
  useEffect(() => {
    setFormData({
      ...formData,
      total_price: totalPrice.map((v, i) => {
        return +v + +formData.shipment_fee[i]
      }),
    })
  }, [formData.shipment_fee])
  console.log(totalPrice)
  console.log(formData.total_price)

  const formSubmit = async (e) => {
    e.preventDefault()

    const r = await fetch(CHECK_OUT_ADD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await r.json()
    console.log(result)
    if (result) {
      MySwal.fire({
        title: '是否送出訂單',
        text: '請確認是否要購買？',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${CART_ITEM_DELETE2}`, {
            method: 'DELETE',
          })
            .then((r) => r.json())
            .then((result) => {
              console.log(result)
            })
            .catch((error) => {
              console.error('Error deleting item:', error)
            })
          MySwal.fire({
            title: '訂單已送出',
            confirmButtonText: '確定',
          })
          router.push('/buyer/order-list')
        }
      })
    } else {
      alert('資料沒有新增')
    }
  }

  /*
  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
    console.log(formData)
  }
  */
  console.log(formData)

  return (
    <>
      <div className="container-fluid">
        {/* Checkout Start */}
        <Head>
          <title>一般訂單結帳 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className="row">
          <div className="col bg-light container-fluid d-flex justify-content-center">
            <h5 className="align-middle mt-2 py-2">
              <FaSeedling style={{ color: '#51c332' }} />
              <Link
                className="colorSlogan text-decoration-none"
                href="/activity"
                style={{ color: '#8e2626' }}
              >
                <strong style={{ fontSize: '24px' }}>
                  {' '}
                  \ 歡慶DEAL線上開通試營運 企業親子二手市集活動 /{' '}
                </strong>
              </Link>
              <FaPersonBreastfeeding style={{ color: '#2055b1' }} />
            </h5>
          </div>
        </div>
        {/* Breadcrumb Start */}
        <div className={`container-fluid ${style.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb">
                <Link
                  className="breadcrumb-item text-dark"
                  href="/"
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '20px' }}>首頁</span>
                </Link>
                <Link
                  className="breadcrumb-item text-dark"
                  href="/shop"
                  style={{ textDecoration: 'none', fontSize: '20px' }}
                >
                  <span>探索商品</span>
                </Link>
                <span
                  className="breadcrumb-item active"
                  style={{ fontSize: '20px' }}
                >
                  訂單結帳
                </span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        <div className={`${Styles.checkout} mb-5`}>
          <form name="form1" onSubmit={formSubmit}>
            <div className={`container-fluid px-lg-5`}>
              <div
                className={`d-flex justify-content-center align-items-center`}
              >
                <img
                  src="/please.png"
                  alt=""
                  style={{ width: '150px' }}
                  className="me-2 pb-2"
                />
                <h2 className="text-center pt-5" style={{ color: '#8e2626' }}>
                  <strong>確認訂單</strong>
                </h2>
              </div>
              <div className="row px-xl-5">
                <div className="col-lg-7">
                  <div
                    className={`p-4 m-4 ${Styles.bg}`}
                    style={{
                      border: '2px solid lightgray',
                      borderRadius: '10px',
                    }}
                  >
                    <h4
                      className="pt-4 mb-3 text-center"
                      style={{ color: '#e96d3f' }}
                    >
                      <strong>個人資料</strong>
                    </h4>
                    <div className="bg-light p-30 mb-5 p-4">
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label htmlFor="name" className="ms-2">
                            <strong>姓名</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="取件姓名"
                            name="name"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                name: e.target.value,
                              })
                            }
                            value={auth.userData.nickname}
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="class" className="ms-2">
                            <strong>類型</strong>
                          </label>
                          <div>
                            <select
                              className="custom-select form-control"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  class: e.target.value,
                                })
                              }
                              value={formData.class}
                            >
                              <option value="1">一般訂單</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6 form-group">
                          <label htmlFor="shipment" className="ms-2">
                            <strong>寄送方式</strong>
                          </label>
                          <div>
                            <select
                              className="custom-select form-control"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  shipment: e.target.value,
                                })
                              }
                              value={formData.shipment}
                            >
                              <option value="0">請選擇寄送方式</option>
                              <option value="超商店到店">超商店到店</option>
                              <option value="物流寄送">物流寄送</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 form-group">
                          <label htmlFor="address" className="ms-2">
                            <strong>地址</strong>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="請輸入地址"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                address: e.target.value,
                              })
                            }
                            value={formData.address}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6 form-group">
                          <label htmlFor="carbon_points_have" className="ms-2">
                            <strong>小碳點數量</strong>
                          </label>
                          {productData.ct &&
                            productData.ct.map((v, i) => {
                              return (
                                <>
                                  <input
                                    key={i}
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    max={parseInt(v.carbon_points_have)}
                                    placeholder="請選擇數量"
                                    name="carbon_points_have"
                                    onBlur={(e) =>
                                      setFormData({
                                        ...formData,
                                        total_price: formData.product_price.map(
                                          (val, ind) => {
                                            return ind == 0
                                              ? +val - +e.target.value * 0.01
                                              : val
                                          }
                                        ),
                                      })
                                    }
                                    // value={}
                                  />
                                  <p className="ms-2 mt-1">
                                    <strong>
                                      您目前擁有 {v.carbon_points_have * 0.01}點
                                      小碳點
                                    </strong>
                                  </p>
                                </>
                              )
                            })}
                        </div>
                      </div>
                      {/* <div className="col-md-12 form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="newaccount"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="newaccount"
                    >
                      Create an account
                    </label>
                  </div>
                </div> */}
                      {/* <div className="col-md-12">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="shipto"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="shipto"
                      data-toggle="collapse"
                      data-target="#shipping-address"
                    >
                      Ship to different address
                    </label>
                  </div>
                </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div
                    className={`p-4 m-4 ${Styles.bg}`}
                    style={{
                      border: '2px solid lightgray',
                      borderRadius: '10px',
                    }}
                  >
                    <h4
                      className="mb-3 text-center"
                      style={{ color: '#e96d3f' }}
                    >
                      <strong>商品資訊</strong>
                    </h4>
                    <div className="bg-light p-30 mb-5">
                      <div className="border-bottom">
                        <div className="d-flex justify-content-between">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col" className="text-nowrap">
                                  商品名稱{' '}
                                </th>
                                <th
                                  scope="col"
                                  className="text-nowrap text-center"
                                >
                                  優惠卷
                                </th>
                                <th
                                  scope="col"
                                  className="text-nowrap text-center"
                                >
                                  單價
                                </th>
                                <th
                                  scope="col"
                                  className="text-nowrap text-center"
                                >
                                  數量
                                </th>
                                <th
                                  scope="col"
                                  className="text-nowrap text-center"
                                >
                                  總價
                                </th>
                                <th
                                  scope="col"
                                  className="text-nowrap text-center"
                                >
                                  議價
                                </th>
                              </tr>{' '}
                            </thead>
                            <tbody>
                              {productData.rows &&
                                productData.rows.map((v, i) => {
                                  return (
                                    <tr key={v.id}>
                                      <td className="text-wrap">{v.p_name}</td>
                                      <td className="text-center">
                                        {' '}
                                        <div className="col-md-12 form-group">
                                          {/* <label htmlFor="discount_coupon">
                                          優惠卷
                                        </label> */}
                                          <div>
                                            <select
                                              className="custom-select form-control"
                                              onChange={(e) => {
                                                setFormData({
                                                  ...formData,
                                                  discount_coupon:
                                                    formData.discount_coupon.map(
                                                      (value, index) =>
                                                        index === i
                                                          ? e.target.value
                                                          : value
                                                    ),
                                                  shipment_fee:
                                                    formData.shipment_fee.map(
                                                      (value, index) =>
                                                        index === i
                                                          ? e.target.value ===
                                                            '1'
                                                            ? '30'
                                                            : e.target.value ===
                                                              '2'
                                                            ? '0'
                                                            : '60'
                                                          : value
                                                    ),
                                                })
                                                // setFormData({
                                                //   ...formData,
                                                //   total_price: totalPrice + formData.shipment_fee,
                                                // })
                                              }}
                                              value={
                                                formData.discount_coupon[i]
                                              }
                                            >
                                              {/* <option value="0">
                                              選擇優惠卷
                                            </option>
                                            <option value="1">運費半價</option>
                                            <option value="2">免運</option> */}
                                              {/* {productData.cp &&
                                              productData.cp.map((v, i) => {
                                                return (
                                                  <option
                                                    value={`${v.coupon_discount}`}
                                                    key={i}
                                                  >
                                                    {v.coupon_name}
                                                  </option>
                                                )
                                              })} */}
                                              <option value="0">
                                                選擇優惠卷
                                              </option>
                                              {productData.cp &&
                                                productData.cp.find(
                                                  (v) => v.coupon_discount == 30
                                                ) && (
                                                  <option value="1">
                                                    運費半價
                                                  </option>
                                                )}
                                              {productData.cp &&
                                                productData.cp.find(
                                                  (v) => v.coupon_discount == 60
                                                ) && (
                                                  <option value="2">
                                                    免運
                                                  </option>
                                                )}
                                            </select>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-center">
                                        ${v.p_price?.toLocaleString()}
                                      </td>
                                      <td className="text-center">{v.p_qty}</td>
                                      <td className="text-center">
                                        ${v.total_price?.toLocaleString()}
                                      </td>
                                      <td className="text-center">
                                        <Button
                                          variant="danger"
                                          onClick={() => {
                                            setBargainData({
                                              ...bargainData,
                                              product_id: v.product_id,
                                              seller_id: v.seller_id,
                                              p_qty: v.p_qty,
                                              available_cp: v.available_cp,
                                            })
                                            handleShow()
                                          }}
                                        >
                                          議價
                                        </Button>
                                      </td>
                                      {/* <input
                                value={v.p_price}
                                readonly
                                name={`${v.product_price}`}
                              />{' '} */}
                                    </tr>
                                  )
                                })}
                            </tbody>
                          </table>
                        </div>
                        {/* <div className="d-flex justify-content-between">
                        <p>Product Name 2</p>
                        <p>$150</p>
                      </div> */}
                        <div className="d-flex justify-content-between px-4">
                          <p>
                            <strong>運費</strong>
                          </p>
                          <p>{formData.shipment_fee[0]}</p>
                        </div>{' '}
                      </div>{' '}
                      <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2 px-4">
                          <h5>
                            <strong>總金額</strong>
                          </h5>
                          <h5>
                            $
                            {formData.total_price &&
                              formData.total_price
                                .reduce((acc, curr) => acc + curr, 0)
                                ?.toLocaleString()}
                          </h5>
                        </div>
                      </div>
                      {/* <div className="d-flex justify-content-between mt-2">
                      <p></p>
                      <Button variant="danger" onClick={handleShow}>
                        提出議價
                      </Button>
                    </div> */}
                    </div>
                    <div className="mb-5">
                      <h4
                        className="mb-3 text-center"
                        style={{ color: '#e96d3f' }}
                      >
                        <strong>結帳方式</strong>
                      </h4>
                      <div className="bg-light p-30 p-4">
                        <div className="col-md form-group">
                          <label htmlFor="payment_way" className="mb-1 ms-2">
                            <strong>付款方式</strong>
                          </label>
                          <select
                            style={{ width: '50%' }}
                            className="custom-select form-control"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                payment_way: e.target.value,
                              })
                            }
                            value={formData.payment_way}
                          >
                            <option value="0">請選擇付款方式</option>
                            <option value="1">Line Pay</option>
                            <option value="2">貨到付款</option>
                          </select>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <p></p>
                          <Button
                            type="submit"
                            variant="danger"
                            className={`${Styles.checkoutBtn}`}
                          >
                            送出訂單
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>想要議價</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form name="form2" onSubmit={SubmitBargain}>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  期望價格:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => {
                    setBargainData({
                      ...bargainData,
                      after_bargin_price: e.target.value,
                    })
                  }}
                  value={bargainData.after_bargin_price}
                />
              </div>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                  取消
                </Button>
                <Button
                  variant="warning"
                  type="submit"
                  className={`${Styles.checkoutBtn}`}
                >
                  提出議價
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        {/* Checkout End */}
      </div>
      <Footer />
    </>
  )
}

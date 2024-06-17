import React, { useState, useEffect } from 'react'
// import { CHECK_OUT_ADD, PRODUCTS_API, BARGAIN_CHECKOUT } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useAuth } from '@/context/auth-context'
// import Styles from '@/styles/buyer.module.css'
import DefaultLayout from '@/components/common/default-layout'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import axiosInstance from '@/services/axios-instance'

export default function CheckoutBargain() {
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  const [isLoading, setIsLoading] = useState(true)

  // 導向至LINE Pay付款頁面
  const goLinePay = () => {
    if (window.confirm('確認要導向至LINE Pay進行付款?')) {
      // 先連到node伺服器後，導向至LINE Pay付款頁面
      window.location.href = `http://localhost:3001/api/line-pay/reserve?orderId=${formData.id}`
    }
  }

  const [show, setShow] = useState(false)
  const { checkAuth, auth } = useAuth()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const router = useRouter()
  const { id } = router.query
  // 取得商品資料表
  const [productData, setProductData] = useState({
    success: false,
  })
  useEffect(() => {
    fetch(`${BARGAIN_CHECKOUT}/${id}`)
      .then((r) => r.json())
      .then((dataObj) => setProductData(dataObj))
  }, [id, router.query])

  console.log(productData)

  // -----------

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

      productData.rows.forEach((v) => {
        newProductId.push(v.id)
        newProductPrice.push(v.after_bargin_price)
        newSellerId.push(v.seller_id)
        // totalPrice = totalPrice + v.product_price
        totalPrice.push(v.after_bargin_price)
        totalPriceAndShip.push(v.after_bargin_price + 60)
        totalAmount.push(v.p_qty)

        shipmentFee.push(60)
        discountCoupon.push(0)
        carbonPointsAvailable.push(v.available_cp)
      })

      // 更新 formData
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
      setTotalPrice(totalPrice)
      console.log(newSellerId) // 输出新的 seller_id
    }
  }, [productData]) // 在 productData 更新时触发 useEffect
  useEffect(() => {
    if (auth.isAuth) {
      setFormData({ ...formData, buyer_id: auth.userData.id })
    }
  }, [auth])

  console.log({ auth })
  //計算運費+商品的總價
  useEffect(() => {
    setFormData({
      ...formData,
      total_price: totalPrice.map((v, i) => {
        return +v + +formData.shipment_fee[i]
      }),
    })
  }, [formData.shipment_fee])
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
      alert('資料新增成功')
      router.push('/address-book')
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

  // 確認交易，處理伺服器通知line pay已確認付款，為必要流程
  const handleConfirm = async (transactionId) => {
    const res = await axiosInstance.get(
      `/line-pay/confirm?transactionId=${transactionId}`
    )

    console.log(res.data)

    if (res.data.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    if (res.data.data) {
      setResult(res.data.data)
    }

    // 處理完畢，關閉載入狀態
    setIsLoading(false)
  }

  // confirm回來用的
  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query)
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false)
        // 不繼續處理
        return
      }

      // 向server發送確認交易api
      handleConfirm(transactionId)
    }

    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <>
      <DefaultLayout>
        <div className={`${Styles.checkout}`}>
          {/* Checkout Start */}
          <form name="form1" onSubmit={formSubmit}>
            <div className="container-fluid">
              <div className="row px-xl-5">
                <div className="col-lg-8">
                  <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">訂單資料</span>
                  </h5>
                  <div className="bg-light p-30 mb-5">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="name">姓名</label>
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
                          value={auth ? auth.userData.nickname : formData.name}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="class">類型</label>
                        <div>
                          <select
                            className="custom-select"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                class: e.target.value,
                              })
                            }
                            value={formData.class}
                          >
                            <option value="2">議價訂單</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="total_amount">數量</label>
                        <input
                          className="form-control"
                          type="number"
                          min="1"
                          placeholder="請選擇數量"
                          name="total_amount"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              total_amount: e.target.value,
                            })
                          }
                          value={formData.total_amount}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="shipment">寄送方式</label>
                        <div>
                          <select
                            className="custom-select"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                shipment: e.target.value,
                              })
                            }
                            value={formData.shipment}
                          >
                            <option value="0"></option>
                            <option value="超商店到店">超商店到店</option>
                            <option value="物流寄送">物流寄送</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6 form-group">
                        <label htmlFor="address">地址</label>
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
                <div className="col-lg-4">
                  <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">商品價格</span>
                  </h5>
                  <div className="bg-light p-30 mb-5">
                    <div className="border-bottom">
                      <h6 className="mb-3">購買商品</h6>{' '}
                      <div className="d-flex justify-content-between">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">First</th>
                              <th scope="col">Last</th>
                              <th scope="col">Handle</th>
                              <th scope="col">Handle</th>
                            </tr>{' '}
                          </thead>
                          <tbody>
                            {productData.rows &&
                              productData.rows.map((v, i) => {
                                return (
                                  <tr key={v.id}>
                                    <td>{v.product_name}</td>
                                    <td>
                                      {' '}
                                      <div className="col-md-6 form-group">
                                        <label htmlFor="discount_coupon">
                                          優惠卷
                                        </label>
                                        <div>
                                          <select
                                            className="custom-select"
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
                                                        ? e.target.value === '1'
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
                                            value={formData.discount_coupon[i]}
                                          >
                                            <option value="0">
                                              選擇優惠卷
                                            </option>
                                            <option value="1">運費半價</option>
                                            <option value="2">免運</option>
                                          </select>
                                        </div>
                                      </div>
                                    </td>
                                    <td>${v.product_price}</td>
                                    <td>{v.p_qty}</td>
                                    <td>${v.after_bargin_price}</td>

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
                      <div className="d-flex justify-content-between">
                        <p>運費</p>
                        <p>{formData.shipment_fee}</p>
                      </div>{' '}
                    </div>{' '}
                    <div className="pt-2">
                      <div className="d-flex justify-content-between mt-2">
                        <h5>Total</h5>
                        <h5>
                          {formData.total_price &&
                            formData.total_price.reduce(
                              (acc, curr) => acc + curr,
                              0
                            )}
                        </h5>
                      </div>
                    </div>
                  </div>

                  {/* <div className="d-flex justify-content-between mt-2">
                  <p></p>
                  <Button variant="primary" onClick={handleShow}>
                    提出議價
                  </Button>
                </div> */}
                </div>
                <div className="mb-5">
                  <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">結帳</span>
                  </h5>
                  <div className="bg-light p-30">
                    <div className="col-md form-group">
                      <label htmlFor="payment_way">付款方式</label>
                      <select
                        className="custom-select"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            payment_way: e.target.value,
                          })
                        }
                        value={formData.payment_way}
                      >
                        <option value="0">Line Pay</option>
                        <option value="1">信用卡</option>
                        <option value="2">貨到付款</option>
                      </select>
                    </div>
                    <img alt="" src="/LINEPay.png" width={35} height={25} />
                    <button
                      onClick={goLinePay}
                      // 限制有orderId產生後才能點按
                      disabled={!order.orderId}
                    >
                      前往付款
                    </button>
                    <div className="d-flex justify-content-between mt-2">
                      <p></p>
                      <Button className="danger" type="submit" variant="danger">
                        送出訂單
                      </Button>
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
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  期望價格:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              取消
            </Button>
            <Button variant="primary">提出議價</Button>
          </Modal.Footer>
        </Modal>
      </DefaultLayout>
      {/* Checkout End */}
    </>
  )
}

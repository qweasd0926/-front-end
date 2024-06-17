import React from 'react'
import Image from 'next/image'
// import Styles from '@/styles/orderList.module.css'
import Button from 'react-bootstrap/Button'
import { FaClipboardList } from 'react-icons/fa'
import { BUYER_ORDER } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import { useState, useEffect } from 'react'
import OrderListNav from '@/components/orderList/order-list-nav'
import DefaultLayout from '@/components/common/default-layout'
import Styles from '@/styles/buyer.module.css'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { LINE_PAY_ADD, LINE_PAY_CONFIRM } from '@/configs/config-r'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import Head from 'next/head'

export default function OrderList() {
  const router = useRouter()
  const uniqueIds = new Set()
  const { checkAuth, auth } = useAuth()
  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  })
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const params = new URLSearchParams({ id: auth.userData.id })
        const response = await fetch(`${BUYER_ORDER}?${params}`, {
          headers: { 'Content-Type': 'application/json' },
        })
        const dataObj = await response.json()
        setData(dataObj)
      } catch (error) {
        console.error('Error fetching order data:', error)
      }
    }

    fetchOrderData()
  }, [router.query, auth])

  // useEffect(() => {
  //   fetch(`${BUYER_ORDER}${location.search}`, {
  //     headers: { 'Content-Type': 'application/json' },
  //   })
  //     .then((r) => r.json())
  //     .then((dataObj) => {
  //       setData(dataObj)
  //     })
  // }, [router.query])

  // Line Pay
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })
  const [order, setOrder] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const createOrder = async (newData) => {
    try {
      const r = await fetch(`${LINE_PAY_ADD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })

      console.log('Response status:', r.status)

      const result = await r.json()
      console.log(result)

      if (result.status === 'success') {
        const orderId = result.data.order.orderId
        setOrder(orderId)
        goLinePay(orderId)
      } else {
        console.log('訂單建立失敗')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('訂單建立失敗，請重試')
    }
  }

  const goLinePay = (orderId) => {
    MySwal.fire({
      title: '即將前往Line Pay付款',
      text: '請確認是否要導向至LINE Pay進行付款？',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '前往付款',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `http://localhost:3001/line-pay/reserve?orderId=${orderId}`
      }
    })
  }

  const payClomplete = () => {
    MySwal.fire({
      title: '您已完成付款！',
      text: '將回到訂單列表頁面',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/buyer/order-list')
      }
    })
  }

  const payNotClomplete = () => {
    MySwal.fire({
      title: '您尚未完成付款！',
      text: '將回到訂單列表頁面',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '確定',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/buyer/order-list')
      }
    })
  }

  const handleConfirm = async (transactionId) => {
    const r = await fetch(`${LINE_PAY_CONFIRM}?transactionId=${transactionId}`)

    const result = await r.json()
    console.log(result)
    if (result.status === 'success') {
      payClomplete()
    } else {
      payNotClomplete()
    }

    if (result) {
      setResult(result)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query)
      const { transactionId, orderId } = router.query

      if (!transactionId || !orderId) {
        setIsLoading(false)
        return
      }
      handleConfirm(transactionId)
    }
  }, [router.isReady])

  return (
    <>
      <DefaultLayout pageName="od">
        <Head>
          <title>我的訂單 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className={`${Styles.orderList}`}>
          <OrderListNav pageName="od" />
          <div className="row mt-5 mx-5 mb-5">
            <div className="col-sm-8 cart-area">
              {!auth ? (
                alert('請先登入')
              ) : !data.rows ? (
                <div>...loading</div>
              ) : (
                <>
                  <h4 className="mb-3" style={{ color: '#8e2626' }}>
                    <strong>
                      <FaClipboardList className="mb-2" /> 我的所有購買訂單
                    </strong>
                  </h4>
                  {data.rows.map((v) => {
                    // 如果這個 id 已經存在於 Set 中，則跳過此項
                    if (uniqueIds.has(v.id)) {
                      return null // 不渲染這個項目
                    }

                    // 否則，將 id 添加到 Set 中，並渲染這個項目
                    uniqueIds.add(v.id)
                    return (
                      <>
                        <div
                          className={`card mb-4 border-bottom cart-card ${Styles.imgBox}`}
                          style={{
                            overflow: 'auto',
                          }}
                        >
                          <div className="row g-0">
                            <div
                              className={`col-md-3 rounded`}
                              style={{
                                overflow: 'auto',
                              }}
                            >
                              <Link href={`/shop/${v.p_id}`}>
                                <img
                                  src={`/${
                                    v.product_photos.match(/[^,]+\.jpg/)[0]
                                  }`}
                                  className="img-fluid"
                                  alt="..."
                                  style={{
                                    width: '100%',
                                    height: '330px',
                                    objectFit: 'cover',
                                  }}
                                />
                              </Link>
                            </div>
                            <div className="col-md-9 ps-3 d-flex align-items-center">
                              <div className="card-body">
                                <h5 className="card-title card-text d-flex justify-content-between align-items-center">
                                  <strong>
                                    訂單編號：
                                    {Math.floor(new Date(v.order_date))}
                                    {v.id}
                                  </strong>
                                </h5>
                                <Link
                                  href={`/shop/${v.p_id}`}
                                  style={{ textDecoration: 'none' }}
                                >
                                  <p className="card-text">
                                    <strong>
                                      <strong>{v.product_name}</strong>
                                    </strong>
                                  </p>
                                </Link>
                                <br />
                                <Link
                                  className={Styles.sellerLink}
                                  href={`/member/store/${v.seller_id}`}
                                  style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                  }}
                                >
                                  <p className="card-text pb-2">
                                    <strong>
                                      賣家：{v.seller_name} (點我進入賣家介紹)
                                    </strong>
                                  </p>
                                </Link>
                                <p className="card-text pb-2">
                                  <strong>
                                    <span>
                                      {v.class === 2 ? '議價訂單' : '一般訂單'}
                                    </span>
                                    /
                                    <span>
                                      {v.complete_status === 2
                                        ? '已完成'
                                        : '進行中'}
                                    </span>
                                    /
                                    <span>
                                      {v.shipment_status === 2
                                        ? '已寄出'
                                        : '未寄出'}
                                    </span>
                                  </strong>
                                </p>
                                <p className="card-text pb-2">
                                  <strong>
                                    $
                                    <span>
                                      {v.total_price?.toLocaleString()}
                                    </span>
                                  </strong>
                                </p>
                                {v.payment_status == 1 ? (
                                  <>
                                    <img alt="" src="/LINEPay.png" width={40} />
                                    <button
                                      className={`btn ${Styles.linepayBtn}`}
                                      style={{
                                        backgroundColor: '#2f9456',
                                        color: 'white',
                                      }}
                                      onClick={() => {
                                        let cp = v.cp !== null ? v.cp : 0
                                        let totalPrice =
                                          v.item_price * v.item_qty
                                        let disTotalPrice = totalPrice - cp
                                        let price =
                                          (totalPrice *
                                            (v.item_price / disTotalPrice)) /
                                          v.item_qty
                                        let newPrice = Math.floor(price) - 1
                                        const formData = {
                                          order_id: v.id,
                                          user_id: auth.userData.id,
                                          amount:
                                            v.item_qty * newPrice +
                                            1 * v.shipment_fee,
                                          products: [
                                            {
                                              id: 1,
                                              name: v.product_name,
                                              quantity: v.item_qty,
                                              price: newPrice,
                                            },
                                            {
                                              id: 2,
                                              name: '運費',
                                              quantity: 1,
                                              price: v.shipment_fee,
                                            },
                                          ],
                                        }
                                        createOrder(formData)
                                      }}
                                    >
                                      <strong>去付款</strong>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="btn"
                                      style={{
                                        backgroundColor: 'gray',
                                        color: 'white',
                                        cursor: 'not-allowed',
                                      }}
                                    >
                                      <strong>您已付款</strong>
                                    </button>
                                  </>
                                )}
                                <div
                                  className={`row g-3 align-items-center justify-content-end ${Styles.orderList}`}
                                >
                                  <div className="col-auto w-auto">
                                    <strong>
                                      {Math.floor(
                                        (new Date() - new Date(v.order_date)) /
                                          (1000 * 60 * 60 * 24)
                                      ) === 0
                                        ? '今天'
                                        : Math.floor(
                                            (new Date() -
                                              new Date(v.order_date)) /
                                              (1000 * 60 * 60 * 24)
                                          ) + '天前'}
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </>
              )}
              {/* <div className="card mb-3 border-0 cart-card">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src="/cart-1.jpeg"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                </div>
              </div> */}
              <hr />
            </div>
            <div className="col-sm-4 mt-5">
              <h4 className="mb-3">
                <strong>小碳點</strong>
              </h4>

              <p className="card-text d-flex justify-content-between align-items-center">
                目前點數{' '}
                <span>
                  {!data.rows
                    ? '0'
                    : data.rows[0]
                    ? data.rows[0].buyer_point
                    : '0'}
                </span>
              </p>
              <hr />
              {/* <p className="card-text d-flex justify-content-between align-items-center">
            預估運費與手續費 <span>$300.00</span>
          </p> */}
              <hr />
              {/* <p className="card-text d-flex justify-content-between align-items-center">
            總計 <span>$4,300.00</span>
          </p> */}
              <hr />
              {/* <button className="btn btn-primary w-100 mb-3">會員結帳</button> */}
              {/* <button className="btn btn-primary w-100 mb-3">訪客結帳</button> */}
            </div>
          </div>
        </div>
        <Toaster />
      </DefaultLayout>
    </>
  )
}

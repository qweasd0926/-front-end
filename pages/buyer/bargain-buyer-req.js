import React from 'react'
import Image from 'next/image'
import Table from 'react-bootstrap/Table'
import { MdDeleteForever } from 'react-icons/md'
import Button from 'react-bootstrap/Button'
import { FaAlignJustify } from 'react-icons/fa'
import { BARGAIN_BUYER } from '@/configs/configs-buyer'
import { BARGAIN_BUYER_DELETE } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import { useState, useEffect } from 'react'
import OrderListNav from '@/components/orderList/order-list-nav'
import { BUYER_ORDER_FIN } from '@/configs/configs-buyer'
import DefaultLayout from '@/components/common/default-layout'
import Styles from '@/styles/buyer.module.css'
import Link from 'next/link'
import Head from 'next/head'

export default function OrderList() {
  const router = useRouter()
  // const { auth, getAuthHeader } = useAuth()
  const { checkAuth, auth } = useAuth()
  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
  })
  //刪除選項
  const deleteItem = (id) => {
    if (confirm(`確定要刪除編號為 ${id} 的資料嗎?`)) {
      fetch(`${BARGAIN_BUYER_DELETE}/${id}`, {
        method: 'DELETE',
      })
        .then((r) => r.json())
        .then((result) => {
          console.log(result)
          //router.reload(); // 會刷頁面
          router.push(location.search)
        })
    }
  }

  //--議價資料
  const [bargainData, setBargainData] = useState([])

  useEffect(() => {
    fetch(`${BARGAIN_BUYER}?${auth.userData.id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((dataObj) => {
        console.log(dataObj) // 确保数据正确返回
        if (dataObj && dataObj.rows) {
          setBargainData(dataObj) // 设置状态
        }
      })
      .catch((error) => {
        console.error('Error fetching bargain data:', error)
      })
  }, [])

  console.log(bargainData) // 可以在这里打印状态

  // ----修改
  const [formData, setFormData] = useState({
    id: 0, // 資料的 primary key
    complete_status: '',
  })

  const onFinish = async (e) => {
    const newFormData = {
      ...formData,
      complete_status: 2,
      id: e,
    }
    setFormData(newFormData)

    const r = await fetch(`${BUYER_ORDER_FIN}/${e}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFormData),
    })

    const result = await r.json()

    console.log(result)
    if (result.success) {
      alert('資料修改成功')
      console.log(document.referrer)
      router.back()
    } else {
      alert('資料沒有修改')
    }
  }

  return (
    <>
      <DefaultLayout pageName="bargain-buyer">
        <Head>
          <title>我的議價邀請 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className={`px-lg-5 mb-5 ${Styles.orderList}`}>
          <OrderListNav pageName="bargain-buyer" />
          {!auth ? (
            alert('請先登入')
          ) : !bargainData.rows ? (
            <div>...loading</div>
          ) : (
            <>
              <Table striped bordered hover size="sm" className=" mt-4">
                <thead>
                  <tr className="table-dark text-nowrap text-center">
                    <th>id</th>
                    <th>商品</th>
                    <th>買家</th>
                    <th>期望價格</th>

                    <th>回覆答案</th>
                    <th>結帳</th>
                    <th>取消該筆議價</th>
                  </tr>
                </thead>
                <tbody>
                  {bargainData.rows.map((v, i) => (
                    <tr key={i}>
                      <td className="text-center align-middle">
                        <strong>{v.id}</strong>
                      </td>
                      <td
                        className="text-wrap text-truncate"
                        style={{ maxWidth: '150px' }}
                      >
                        {v.product_name}
                      </td>
                      <td className="text-center align-middle">{v.nickname}</td>
                      <td className="text-center align-middle">
                        {v.ans_num
                          ? v.ans_num == 1
                            ? '同意'
                            : '不同意'
                          : '尚未回應'}
                      </td>
                      <td className="text-center align-middle">
                        {v.after_bargin_price}
                      </td>
                      <td className="text-center align-middle">
                        {v.ans_num ? (
                          <>
                            <Button
                              href={`/buyer/checkout-bargain/${v.id}`}
                              className={`btn ${Styles.bargainBtn}`}
                              style={{ border: 'none' }}
                            >
                              <strong>結帳</strong>
                            </Button>
                          </>
                        ) : (
                          '等待賣家回復...'
                        )}
                      </td>
                      <td className="text-center align-middle">
                        {' '}
                        <Button
                          href="#"
                          onClick={(e) => {
                            e.preventDefault() // 不跳頁
                            deleteItem(v.id)
                          }}
                          className={`btn ${Styles.bargainNotBtn}`}
                        >
                          <strong>刪除</strong>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </div>
      </DefaultLayout>
    </>
  )
}

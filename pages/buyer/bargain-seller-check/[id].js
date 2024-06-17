import React from 'react'
import Styles from '@/styles/buyer.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BARGAIN_get } from '@/configs/configs-buyer'
// import { BARGAIN_RESPNSE } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/common/default-layout'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import Link from 'next/link'
import Head from 'next/head'
import style from '@/pages/shop/cart.module.css'

export default function GetBargain() {
  const router = useRouter()
  //Modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  //---
  const { id } = router.query
  const [data, setData] = useState(null)
  const [bargainData, setbargainData] = useState('')

  console.log(bargainData)

  const formSubmit = async (e) => {
    e.preventDefault()

    const r = await fetch(`http://localhost:3001/bargain/${id}/respond`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bargainData),
    })
    console.log(r)
    const result = await r.json()
    console.log(result)
    if (result) {
      MySwal.fire({
        title: '回覆完成',

        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/buyer/bargain-seller')
        }
      })
    } else {
      alert('回覆沒有成功')
    }
  }

  useEffect(() => {
    if (id) {
      fetch(`${BARGAIN_get}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error('Network response was not ok')
          }
          return r.json()
        })
        .then((dataObj) => {
          setData(dataObj)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
          // 可以在这里设置错误状态，以便显示错误信息给用户
        })
    }
  }, [id, router.query])
  console.log(data)
  return (
    <>
      <DefaultLayout>
        <Head>
          <title>議價申請列表 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className="container-fluid mb-5">
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
                    href="/buyer/order-list"
                    style={{ textDecoration: 'none', fontSize: '20px' }}
                  >
                    <span>訂單總覽</span>
                  </Link>
                  <span
                    className="breadcrumb-item active"
                    style={{ fontSize: '20px' }}
                  >
                    議價申請列表
                  </span>
                </nav>
              </div>
            </div>
          </div>
          {/* Breadcrumb End */}
          <div className="row px-lg-5" style={{ marginBottom: '300px' }}>
            <div className="col-12 px-lg-5">
              <table className={`table  ${Styles.bargain}`}>
                <thead>
                  <tr className="table-dark">
                    <th scope="col" className="text-center">
                      編號
                    </th>
                    <th scope="col" className="text-center">
                      買家
                    </th>
                    <th scope="col" className="text-center">
                      期望價格
                    </th>
                    <th scope="col">商品</th>
                    <th scope="col" className="text-center">
                      回覆
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.rows.map((v, i) => {
                      return (
                        <tr key={i} className="align-middle">
                          <td className="text-center"> {i + 1}</td>
                          <td className="text-center"> {v.nickname}</td>
                          <td className="text-center">
                            {' '}
                            ${v.after_bargin_price?.toLocaleString()}
                          </td>
                          <td>
                            <Link
                              href={`/shop/${v.product_id}`}
                              style={{ textDecoration: 'none', color: 'black' }}
                            >
                              {v.product_name}
                            </Link>
                          </td>
                          <td className="text-center">
                            {' '}
                            <button
                              className={`btn btn-block  font-weight-bold`}
                              type=""
                              onClick={(e) => {
                                e.preventDefault()
                                setbargainData({
                                  id: id,
                                  ans_num: '1',
                                  ans: '同意',
                                })
                                handleShow(e)
                              }}
                            >
                              同意
                            </button>
                            <button
                              className={`btn btn-block ${Styles.bargainNotBtn} font-weight-bold`}
                              type=""
                              onClick={(e) => {
                                e.preventDefault()
                                setbargainData({
                                  id: id,
                                  ans_num: '2',
                                  ans: '不同意',
                                })
                                handleShow(e)
                              }}
                            >
                              拒絕
                            </button>{' '}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>對於編號{bargainData.id}的議價要求</strong>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={formSubmit}>
            <Modal.Body>{bargainData.ans}</Modal.Body>
            <Modal.Footer>
              <button
                className={`btn btn-block  ${Styles.bargainBtn} font-weight-bold`}
                type="submit"
              >
                送出
              </button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className={` ${Styles.bargainNotBtn}`}
              >
                取消
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </DefaultLayout>
    </>
  )
}

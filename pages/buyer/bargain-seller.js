import React from 'react'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { BARGAIN_SELLER } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import DefaultLayout from '@/components/common/default-layout'
import Styles from '@/styles/buyer.module.css'
import { useAuth } from '@/context/auth-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Head from 'next/head'
import Style from '@/styles/unpaid.module.css'

export default function BargainSeller() {
  const router = useRouter()
  const { checkAuth, auth } = useAuth()
  //--議價資料
  const [bargainData, setBargainData] = useState([])

  useEffect(() => {
    fetch(`${BARGAIN_SELLER}`, {
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

  return (
    <>
      <DefaultLayout>
        <Head>
          <title>我的銷售 | DEAL-2ND HAND SHOP</title>
        </Head>
        {!auth ? (
          alert('請先登入')
        ) : !bargainData.rows ? (
          <div>...loading</div>
        ) : (
          <>
            <div className={`container-fluid mt-5`}>
              <div className="row px-xl-5">
                <div className="col-12">
                  <nav className="breadcrumb">
                    <Link
                      href="/Maket/index-maket"
                      className="breadcrumb-item"
                      style={{
                        textDecoration: 'none',
                        color: '#8e2626',
                        fontSize: '20px',
                      }}
                    >
                      <span>
                        <strong>首頁</strong>
                      </span>
                    </Link>
                    <span
                      className="breadcrumb-item active"
                      style={{
                        fontSize: '20px',
                      }}
                    >
                      <strong>我的議價申請</strong>
                    </span>
                  </nav>
                </div>
              </div>
            </div>
            <div className="d-flex px-lg-5 mb-5">
              <div className="row w-100 px-lg-5">
                <div className="col-2 d-flex justify-content-center">
                  <div
                    className={`mt-3 ${Style['accordion-container']}`}
                    id="accordionPanelsStayOpenExample"
                    style={{ width: '100%' }}
                  >
                    {/* 手风琴项 2 */}
                    <div className={Style['accordion-item']}>
                      <h2
                        className={Style['accordion-header']}
                        id="panelsStayOpen-headingTwo"
                      >
                        <span className={Style['icon-wrapper']}>
                          <FontAwesomeIcon
                            icon={faFileLines}
                            style={{ color: '#8e2626' }}
                          />
                        </span>
                        <span
                          className={Style['accordion-title']}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          <strong>訂單管理</strong>
                        </span>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className={Style['accordion-content']}>
                          <div className={Style['accordion-body']}>
                            <Link
                              href="/Maket/unpaid-maket"
                              style={{
                                textDecoration: 'none',
                                color: '#e96d3f',
                              }}
                            >
                              <div className="accordion-body mb-2">
                                <strong>我的銷售</strong>
                              </div>
                            </Link>
                            <Link
                              href="/buyer/bargain-seller"
                              style={{
                                textDecoration: 'none',
                                color: '#e96d3f',
                              }}
                            >
                              <div className="accordion-body">
                                <strong>我的議價申請</strong>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 手风琴项 3 */}
                    <div className={Style['accordion-item']}>
                      <h2
                        className={Style['accordion-header']}
                        id="panelsStayOpen-headingThree"
                      >
                        <span className={Style['icon-wrapper']}>
                          <FontAwesomeIcon
                            icon={faBagShopping}
                            style={{ color: '#8e2626' }}
                          />
                        </span>
                        <span
                          className={Style['accordion-title']}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          <strong>商品管理</strong>
                        </span>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                      >
                        <div className={Style['accordion-content']}>
                          <div className={Style['accordion-body']}>
                            <Link
                              href="/Maket/return"
                              style={{
                                textDecoration: 'none',
                                color: '#e96d3f',
                              }}
                            >
                              <div className="accordion-body mb-2">
                                <strong>我的商品</strong>
                              </div>
                            </Link>
                            <Link
                              href="/Maket/list-maket"
                              style={{
                                textDecoration: 'none',
                                color: '#e96d3f',
                              }}
                            >
                              <div className="accordion-body">
                                <strong>新增商品</strong>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-10 d-flex justify-content-center">
                  <Table
                    striped
                    bordered
                    hover
                    size="sm"
                    className={`${Styles.bargain}`}
                  >
                    <thead>
                      <tr className="table-dark text-center">
                        <th>編號</th>
                        <th>商品</th>
                        <th>買家</th>
                        <th>期望價格</th>
                        <th>功能區</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bargainData.rows.map((v, i) => (
                        <tr key={i} className="text-center align-middle">
                          <td>{v.id}</td>
                          <td className="text-wrap" style={{ width: '60%' }}>
                            <Link
                              href={`/shop/${v.product_id}`}
                              style={{ textDecoration: 'none', color: 'black' }}
                            >
                              {v.product_name}
                            </Link>
                          </td>
                          <td>
                            <Link
                              href={`/member/store/${v.buyer_id}`}
                              style={{ textDecoration: 'none', color: 'black' }}
                            >
                              {v.nickname}
                            </Link>
                          </td>
                          <td>{v.after_bargin_price}</td>
                          <td>
                            {!v.ans_num ? (
                              <Button
                                className={Styles.bargainBtn}
                                href={`/buyer/bargain-seller-check/${v.id}`}
                              >
                                回覆
                              </Button>
                            ) : v.ans_num == 1 ? (
                              '同意'
                            ) : (
                              '不同意'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}
      </DefaultLayout>
    </>
  )
}

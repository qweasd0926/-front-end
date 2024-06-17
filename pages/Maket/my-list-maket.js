import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Styles from '@/styles/my-list-maket.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultLayout from '@/components/common/default-layout'

export default function MyListMaket() {
  return (
    <>
      <DefaultLayout pageName="helpCenter">
        <Head>
          <title>我的商品 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className={`container-fluid ${Styles.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb">
                <Link
                  href="/Maket/list-maket"
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                >
                  <span>首頁</span>
                </Link>
                <Link
                  href="/Maket/unpaid-maket"
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                >
                  <span>我的銷售</span>
                </Link>
                <span className="breadcrumb-item active">我的商品</span>
              </nav>
            </div>
          </div>
        </div>
        <div className={Styles['body']}>
          <div style={{ fontSize: 20, lineHeight: '1.5' }}>
            <div className={Styles.containerHome}>
              <div className={Styles.containerPage}>
                <div className={Styles['Row']}>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>商品名稱</th>
                          <td>
                            <div className="input-group">
                              <button
                                className="btn btn-outline-secondary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ height: '38px' }}
                              >
                                商品名稱
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    主商品貨號
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    商品選項貨號
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    商品ID
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>商品數量</th>
                          <td>
                            <input
                              type="text"
                              placeholder="最小值"
                              className="form-control"
                              style={{ width: '240px', marginRight: '10px' }}
                            />
                            －
                            <input
                              type="text"
                              placeholder="最大值"
                              className="form-control"
                              style={{ width: '240px' }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>已售出</th>
                          <td>
                            <input
                              type="text"
                              placeholder="最小值"
                              className="form-control"
                              style={{ width: '240px', marginRight: '10px' }}
                            />
                            －
                            <input
                              type="text"
                              placeholder="最大值"
                              className="form-control"
                              style={{ width: '240px' }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

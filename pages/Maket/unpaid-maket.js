import React, { useEffect, useState } from 'react'
import Styles from '@/styles/unpaid.module.css'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//page
import DefaultLayout from '@/components/common/default-layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '@/context/auth-context'
import {
  faTruckFast,
  faFileLines,
  faBagShopping,
  faStore,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons'
import {
  PROD_LIST4,
  PROD_LIST7,
  PROD_LIST8,
  PROD_LIST9,
} from '@/configs/config-lee'
import dayjs from 'dayjs'
//123
export default function UnpaidMaket() {
  const router = useRouter()
  const { checkAuth, auth } = useAuth()

  const [data, setData] = useState({
    success: false,
    data: [],
    rows: [],
    totalPages: 0,
  })
  const [data2, setData2] = useState({
    success: false,
    data: [],
    rows: [],
    totalPages: 0,
  })
  const [data3, setData3] = useState({
    success: false,
    data: [],
    rows: [],
    totalPages: 0,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [complete, setComplete] = useState(0)
  const [searchdate, setSearchdate] = useState('')
  const [searchdate2, setSearchdate2] = useState('')
  const [searchOption, setSearchOption] = useState('') // 狀態用於保存用戶選擇的搜尋選項

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value) // 更新搜尋選項的狀態
  }
  const handleSearch = (e) => {
    e.preventDefault()
    const formattedDate = searchdate
    const formattedDate2 = searchdate2
    let searchField = ''

    let keyword = e.currentTarget.keyword?.value
    if (keyword) {
      router.push(
        `/Maket/unpaid-maket?keyword=${keyword}&order_date=${formattedDate}&order_date=${formattedDate2}`
      )
    } else {
      router.push(
        `/Maket/unpaid-maket?order_date=${formattedDate}&order_date=${formattedDate2}`
      )
    }
  }
  const fetchDate = (searchField, searchValue, order_date, order_date2) => {
    // 在這裡使用fetch函式或其他HTTP客戶端庫來向後端發送請求
    let url = `${PROD_LIST9}?field=${searchField}&value=${searchValue}`
    if (order_date && order_date2) {
      url += `&order_date=${order_date}&order_date=${order_date2}`
    }
    // if (minValue && maxValue) {
    //   url += `&minValue=${minValue}&maxValue=${maxValue}`
    // }
    fetch(url)
      .then((response) => {
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        // 在這裡處理從後端獲取的資料
        console.log(data)
      })
      .catch((error) => {
        // 在這裡處理錯誤
        console.error('There was a problem with the fetch operation:', error)
      })
  }
  // 這邊是抓取後端的程式碼
  useEffect(() => {
    fetch(`${PROD_LIST4}?page=${currentPage}`, {})
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
        setTotalPages(dataObj.totalPages)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setData({
          success: false,
          data: [],
          totalPages: 0,
        })
        setTotalPages(0)
      })
  }, [router.query])
  // 這邊是結尾

  useEffect(() => {
    fetch(`${PROD_LIST8}?page=${currentPage}`, {})
      .then((r) => r.json())
      .then((dataObj) => {
        setData3(dataObj)
        setTotalPages(dataObj.totalPages)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setData3({
          success: false,
          data: [],
          totalPages: 0,
        })
        setTotalPages(0)
      })
  }, [router.query])

  useEffect(() => {
    fetch(`${PROD_LIST7}?page=${currentPage}`, {})
      .then((r) => r.json())
      .then((dataObj) => {
        setData2(dataObj)
        setTotalPages(dataObj.totalPages)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setData({
          success: false,
          rows: [],
          totalPages: 0,
        })
        setTotalPages(0)
      })
  }, [router.query])
  console.log(complete)

  const handleNextPage = () => {
    const nextPage = Math.min(currentPage + 1, data.totalPages)
    setCurrentPage(nextPage)
    router.push(`/Maket/unpaid-maket?page=${nextPage}`)
  }

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1)
    setCurrentPage(prevPage)
    router.push(`/Maket/unpaid-maket?page=${prevPage}`)
  }

  useEffect(() => {
    if (router.query.page) {
      const page = parseInt(router.query.page, 10)
      if (isNaN(page) || page < 1) {
        router.push('/Maket/unpaid-maket?page=1')
      } else if (page > data.totalPages) {
        router.push(`/Maket/unpaid-maket?page=${data.totalPages}`)
      } else {
        setCurrentPage(page)
      }
    } else {
      setCurrentPage(1)
    }
  }, [router.query.page, data.totalPages])

  const fetchData = async () => {
    try {
      const response = await fetch(
        'SELECT COUNT(*) as total FROM orders as complete_status'
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      return null
    }
  }

  return (
    <DefaultLayout pageName="helpCenter">
      <Head>
        <title>我的銷售 | DEAL-2ND HAND SHOP</title>
      </Head>

      <div className={`container-fluid ${Styles.breadcrumbArea}`}>
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb">
              <Link
                href="/Maket/index-maket"
                className="breadcrumb-item"
                style={{ textDecoration: 'none' }}
              >
                <span>首頁</span>
              </Link>
              <span className="breadcrumb-item active">我的銷售</span>
            </nav>
          </div>
        </div>
      </div>
      <div className={`ps-5 ${Styles.container}`}>
        <div
          className={`mt-3 ${Styles['accordion-container']}`}
          id="accordionPanelsStayOpenExample"
        >
          {/* 手风琴项 2 */}
          <div className={Styles['accordion-item']}>
            <h2
              className={Styles['accordion-header']}
              id="panelsStayOpen-headingTwo"
            >
              <span className={Styles['icon-wrapper']}>
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{ color: '#8e2626' }}
                />
              </span>
              <span
                className={Styles['accordion-title']}
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
              <div className={Styles['accordion-content']}>
                <div className={Styles['accordion-body']}>
                  <Link
                    href="/Maket/unpaid-maket"
                    style={{ textDecoration: 'none', color: '#e96d3f' }}
                  >
                    <div className="accordion-body mb-2">
                      <strong>我的銷售</strong>
                    </div>
                  </Link>
                  <Link
                    href="/buyer/bargain-seller"
                    style={{ textDecoration: 'none', color: '#e96d3f' }}
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
          <div className={Styles['accordion-item']}>
            <h2
              className={Styles['accordion-header']}
              id="panelsStayOpen-headingThree"
            >
              <span className={Styles['icon-wrapper']}>
                <FontAwesomeIcon
                  icon={faBagShopping}
                  style={{ color: '#8e2626' }}
                />
              </span>
              <span
                className={Styles['accordion-title']}
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
              <div className={Styles['accordion-content']}>
                <div className={Styles['accordion-body']}>
                  <Link
                    href="/Maket/return"
                    style={{ textDecoration: 'none', color: '#e96d3f' }}
                  >
                    <div className="accordion-body mb-2">
                      <strong>我的商品</strong>
                    </div>
                  </Link>
                  <Link
                    href="/Maket/list-maket"
                    style={{ textDecoration: 'none', color: '#e96d3f' }}
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
        {/* 标签行 */}
        <div className={Styles.containerHome}>
          <div className={Styles.containerPage}>
            <form onSubmit={handleSearch}>
              <div className={Styles.Row} style={{ display: 'flex' }}>
                <div
                  className={Styles.Col}
                  role="button"
                  tabIndex={0}
                  onClick={() => setComplete(0)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setComplete(0) // 添加鍵盤事件處理程序，當按下Enter鍵時執行setComplete(1)
                    }
                  }}
                >
                  全部
                </div>
                <div
                  className={Styles.Col}
                  role="button"
                  tabIndex={0} // 添加tabIndex屬性，使該元素可聚焦
                  onClick={() => setComplete(1)} // 點擊事件處理程序保持不變
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setComplete(1) // 添加鍵盤事件處理程序，當按下Enter鍵時執行setComplete(1)
                    }
                  }}
                >
                  進行中
                </div>
                <div
                  className={Styles.Col}
                  role="button"
                  tabIndex={0} // 添加tabIndex屬性，使該元素可聚焦
                  onClick={() => setComplete(2)} // 點擊事件處理程序保持不變
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setComplete(2) // 添加鍵盤事件處理程序，當按下Enter鍵時執行setComplete(1)
                    }
                  }}
                >
                  已完成
                </div>
              </div>
              <div
                className={Styles.Row2}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div className={Styles.Th}>訂單成立日期</div>
                <div style={{ marginLeft: '10px' }}>
                  <input
                    type="date"
                    className="form-control"
                    name="order_data"
                    style={{ height: '38px' }}
                    value={
                      searchdate ? dayjs(searchdate).format('YYYY-MM-DD') : ''
                    }
                    onChange={(e) => setSearchdate(e.target.value)}
                  />
                </div>
                <div
                  className="text-center"
                  style={{
                    marginLeft: '10px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span>~</span>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  <input
                    type="date"
                    className="form-control"
                    name="order_data2"
                    style={{ height: '38px' }}
                    value={
                      searchdate2 ? dayjs(searchdate2).format('YYYY-MM-DD') : ''
                    }
                    onChange={(e) => setSearchdate2(e.target.value)}
                  />
                </div>
              </div>
              <div
                className={Styles.Row2}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div
                  className={Styles.Th}
                  style={{
                    marginRight: '0px',
                    borderRadius: '0',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                  }}
                >
                  <select
                    className="form-select"
                    style={{
                      height: '38px',
                      borderTopRightRadius: '0',
                      borderBottomRightRadius: '0',
                      outline: 'none', // 移除蓝色边框
                    }}
                  >
                    <option value="">訂單編號</option>
                    <option value="">商品名稱</option>
                    <option value="">商品狀態</option>
                    {/* 在这里添加更多选项 */}
                  </select>
                </div>
                <div
                  style={{
                    marginLeft: '0px',
                    borderRadius: '0',
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0',
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      height: '38px',
                      width: '800px',
                      borderTopLeftRadius: '0',
                      borderBottomLeftRadius: '0',
                      outline: 'none', // 移除蓝色边框
                    }}
                  />
                </div>
                <div className={Styles.buttonGroup}>
                  <button id="cancelButton" className={Styles.searchButton2}>
                    搜尋
                  </button>
                  <button id="saveButton" className={Styles.searchButton}>
                    重置
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className={Styles.containerPage}>
            <table className={Styles.table}>
              <thead>
                <tr className="text-nowrap fw-5">
                  <th>訂單分類</th>
                  <th>買家暱稱</th>
                  <th>總金額</th>
                  <th>總數量</th>
                  <th>運費</th>
                  <th>付款狀態</th>
                  <th>付款方式</th>
                  <th>運送狀態</th>
                  <th>折扣小碳點</th>
                  <th>折扣優惠卷</th>
                  <th>訂單建立時間</th>
                  <th>訂單完成狀態</th>
                  <th>訂單完成時間</th>
                </tr>
              </thead>
              <tbody>
                {complete == 0
                  ? data &&
                    data.data &&
                    data.data.map((v, i) => {
                      const order_date = dayjs(v.order_date).format(
                        'YYYY-MM-DD'
                      )
                      const edited_at = dayjs(v.edited_at).format('YYYY-MM-DD')

                      return (
                        <tr key={v.id}>
                          <td>
                            <strong>{v.class == '1' ? '一般' : '議價'}</strong>
                          </td>
                          <td>{v.nickname}</td>
                          <td>{v.total_price}</td>
                          <td>{v.total_amount}</td>
                          <td>{v.shipment_fee}</td>
                          <td>
                            <strong>
                              {v.payment_status == '1' ? '未付款' : '已付款'}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {v.payment_way == '1' ? '信用卡' : '貨到付款'}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              {v.shipment_status == '1' ? '未寄出' : '已寄出'}
                            </strong>
                          </td>
                          <td>{v.discount_cp}</td>
                          <td>{v.coupon_name}</td>
                          {/* 使用格式化後的日期時間 */}
                          <td>{order_date}</td>
                          <td>
                            <strong>
                              {v.complete_status == '1' ? '進行中' : '已完成'}
                            </strong>
                          </td>
                          <td>{v.complete_date}</td>
                        </tr>
                      )
                    })
                  : complete == 1
                  ? data2 &&
                    data2.data &&
                    data2.data.map((v, i) => {
                      const order_date = dayjs(v.order_date).format(
                        'YYYY-MM-DD'
                      )
                      const edited_at = dayjs(v.edited_at).format('YYYY-MM-DD')

                      return (
                        <tr key={v.id}>
                          <td>
                            <strong>{v.class == '1' ? '一般' : '議價'}</strong>
                          </td>
                          <td>{v.nickname}</td>
                          <td>{v.total_price}</td>
                          <td>{v.total_amount}</td>
                          <td>{v.shipment_fee}</td>
                          <td>
                            <strong>
                              {v.payment_status == '1' ? '未付款' : '已付款'}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {v.payment_way == '1' ? '信用卡' : '貨到付款'}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              {v.shipment_status == '1' ? '未寄出' : '已寄出'}
                            </strong>
                          </td>
                          <td>{v.discount_cp}</td>
                          <td>{v.coupon_name}</td>
                          {/* 使用格式化後的日期時間 */}
                          <td>{order_date}</td>
                          <td>
                            <strong>
                              {v.complete_status == '1' ? '進行中' : '已完成'}
                            </strong>
                          </td>
                          <td>{v.complete_date}</td>
                        </tr>
                      )
                    })
                  : data3 &&
                    data3.data &&
                    data3.data.map((v, i) => {
                      const order_date = dayjs(v.order_date).format(
                        'YYYY-MM-DD'
                      )
                      const edited_at = dayjs(v.edited_at).format('YYYY-MM-DD')

                      return (
                        <tr key={v.id}>
                          <td>
                            <strong>{v.class == '1' ? '一般' : '議價'}</strong>
                          </td>
                          <td>{v.nickname}</td>
                          <td>{v.total_price}</td>
                          <td>{v.total_amount}</td>
                          <td>{v.shipment_fee}</td>
                          <td>
                            <strong>
                              {v.payment_status == '1' ? '未付款' : '已付款'}
                            </strong>
                          </td>
                          <td>
                            <strong>
                              {v.payment_way == '1' ? '信用卡' : '貨到付款'}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              {v.shipment_status == '1' ? '未寄出' : '已寄出'}
                            </strong>
                          </td>
                          <td>{v.discount_cp}</td>
                          <td>{v.coupon_name}</td>
                          {/* 使用格式化後的日期時間 */}
                          <td>{order_date}</td>
                          <td>
                            <strong>
                              {v.complete_status == '1' ? '進行中' : '已完成'}
                            </strong>
                          </td>
                          <td>{v.complete_date}</td>
                        </tr>
                      )
                    })}
              </tbody>
            </table>
            <div className={Styles.pagination} style={{ margin: '20px' }}>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={Styles.searchButton2}
                style={{ marginRight: '20px' }}
              >
                上一頁
              </button>
              <span>第 {currentPage} 頁 / 共 1 頁</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === data.totalPages}
                className={Styles.searchButton}
                style={{ marginLeft: '20px' }}
              >
                下一頁
              </button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

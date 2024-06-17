import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/common/default-layout'
import Styles from '@/styles/return.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaRegEdit } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import {
  faFileLines,
  faBagShopping,
  faregular,
} from '@fortawesome/free-solid-svg-icons'
import { PROD_LIST3, PROD_LIST12 } from '@/configs/config-lee'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//123
export default function Return() {
  const MySwal = withReactContent(Swal)
  const [searchOption, setSearchOption] = useState('') // 狀態用於保存用戶選擇的搜尋選項
  const [searchValue, setSearchValue] = useState('') // 狀態用於保存用戶輸入的搜尋值
  const [searchField, setSearchField] = useState('')
  const [minValue, setMinValue] = useState('')
  const [maxValue, setMaxValue] = useState('')
  const [searchdate, setSearchdate] = useState('')
  const [searchdate2, setSearchdate2] = useState('')

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value) // 更新搜尋選項的狀態
  }
  const handleSearch = (e) => {
    e.preventDefault()
    const formattedDate = searchdate
    const formattedDate2 = searchdate2

    // 根據用戶選擇的搜尋選項，決定要搜尋的欄位
    let searchField = ''
    switch (searchOption) {
      case 'product_name':
        searchField = '商品名稱'
        break
      case 'product_status':
        searchField = '商品狀態'
        break
      default:
        searchField = ''
        break
    }
    let keyword = e.currentTarget.keyword?.value
    if (keyword) {
      router.push(
        `/Maket/return?keyword=${keyword}&created_at=${formattedDate}&created_at2=${formattedDate2}&minValue=${minValue}&maxValue=${maxValue}`
      )
    } else {
      router.push(
        `/Maket/return?created_at=${formattedDate}&created_at2=${formattedDate2}&minValue=${minValue}&maxValue=${maxValue}`
      )
    }
  }

  const handleReset = () => {
    setSearchdate('') // 將日期篩選值重設為預設值
    setSearchdate2('') // 將日期篩選值重設為預設值
    setMinValue('')
    setMaxValue('')
    setSearchValue('')

    // 這裡可以添加其他重設邏輯，如清空搜尋關鍵字等
  }
  const fetchData = (
    searchField,
    searchValue,
    created_at,
    created_at2,
    edit_at,
    minValue,
    maxValue
  ) => {
    // 在這裡使用fetch函式或其他HTTP客戶端庫來向後端發送請求
    let url = `${PROD_LIST3}?field=${searchField}&value=${searchValue}`
    if (created_at && edit_at) {
      url += `&created_at=${created_at}&created_at2=${created_at2}`
    }
    if (minValue && maxValue) {
      url += `&minValue=${minValue}&maxValue=${maxValue}`
    }
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
  // fetchData(searchField, searchValue)
  const router = useRouter()
  const [data, setData] = useState({
    success: false,
    rows: [],
    totalPages: 0,
    keyword: '',
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // 這邊是抓取後端的程式碼
  useEffect(() => {
    fetch(`${PROD_LIST3}${location.search}`, {})
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
  }, [router.query])

  // 刪除
  const deleteItemWithConfirmation = (id) => {
    MySwal.fire({
      text: `確定要刪除編號為 ${id} 的資料嗎?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定我要刪除',
      cancelButtonText: '取消!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id) // 確認刪除後，執行刪除操作
      }
    })
  }

  const handleDelete = (id) => {
    fetch(`${PROD_LIST3}/${id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then((result) => {
        console.log(result)
        router.push(location.search)
      })
  }

  const onSearch = (e) => {
    e.preventDefault()
    let keyword = e.currentTarget.keyword?.value
    keyword = keyword.trim() // 去掉頭尾空白
    if (keyword) {
      router.push(`?keyword=${keyword}`)
    } else {
      router.push(`?`)
    }
  }

  const handleNextPage = () => {
    const nextPage = Math.min(currentPage + 1, data.totalPages)
    setCurrentPage(nextPage)
    router.push(`/Maket/return?page=${nextPage}`)
  }

  const handlePrevPage = () => {
    const prevPage = Math.max(currentPage - 1, 1)
    setCurrentPage(prevPage)
    router.push(`/Maket/return?page=${prevPage}`)
  }

  useEffect(() => {
    if (router.query.page) {
      const page = parseInt(router.query.page, 10)
      if (isNaN(page) || page < 1) {
        router.push('/Maket/return?page=1')
      } else if (page > data.totalPages) {
        router.push(`/Maket/return?page=${data.totalPages}`)
      } else {
        setCurrentPage(page)
      }
    } else {
      setCurrentPage(1)
    }
  }, [router.query.page, data.totalPages])

  return (
    <DefaultLayout pageName="helpCenter">
      <Head>
        <title>我的商品 | DEAL-2ND HAND SHOP</title>
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
      <div className={`ps-5 ${Styles.container}`}>
        <div
          className={`mt-5 ${Styles['accordion-container']}`}
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
                    <div className="accordion-body text-center mb-2">
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
        <div className={Styles.containerHome}>
          <div className={Styles.containerPage}>
            <form onSubmit={handleSearch}>
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
                      outline: 'none',
                    }}
                    onChange={handleOptionChange}
                    value={searchOption}
                  >
                    <option value="">請選擇搜尋欄位</option>
                    <option value="product_name">商品名稱</option>
                    <option value="product_status">商品狀態</option>
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
                    placeholder="請輸入搜尋內容"
                    className="form-control"
                    name="keyword"
                    style={{
                      height: '38px',
                      width: '800px',
                      borderTopLeftRadius: '0',
                      borderBottomLeftRadius: '0',
                      outline: 'none',
                    }}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <table className={Styles.localClass}>
                <tbody>
                  <tr>
                    <th>商品數量</th>
                    <td
                      className={Styles['table-row']}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <input
                        type="text"
                        placeholder="最小值"
                        className="form-control"
                        name="product_qty"
                        style={{ width: '240px' }}
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value)}
                      />
                      ～
                      <input
                        type="text"
                        placeholder="最大值"
                        className="form-control"
                        name="product_qty"
                        style={{ width: '240px' }}
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>訂單日期</th>
                    <td
                      className={Styles['table-row']}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <input
                        type="date"
                        className="form-control"
                        style={{ width: '240px' }}
                        name="created_at"
                        value={
                          searchdate
                            ? dayjs(searchdate).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={(e) => setSearchdate(e.target.value)}
                      />
                      ～
                      <input
                        type="date"
                        className="form-control"
                        style={{ width: '240px' }}
                        name="created_at2"
                        value={
                          searchdate2
                            ? dayjs(searchdate2).format('YYYY-MM-DD')
                            : ''
                        }
                        onChange={(e) => setSearchdate2(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={Styles.buttonGroup}>
                <button
                  type="submit"
                  id="saveButton"
                  className={Styles.searchButton2}
                >
                  搜尋
                </button>
                <button
                  type="button"
                  id="resetButton"
                  className={Styles.searchButton}
                  onClick={handleReset}
                >
                  重設
                </button>
              </div>
            </form>
          </div>
          <div className={Styles.containerPage}>
            <div
              className={Styles.Row}
              style={{ display: 'flex', padding: '0px' }}
            >
              <div className={Styles.Col}>全部</div>
              <div className={Styles.Col}>架上商品</div>
              <div className={Styles.Col}>未上架</div>
            </div>
            <table className={Styles.table}>
              <thead>
                <tr>
                  <th>編輯</th>
                  <th>主分類</th>
                  <th>子分類</th>
                  <th>產品照片</th>
                  <th>產品名稱</th>
                  <th>產品價格</th>
                  <th>產品數量</th>
                  <th>商品狀態</th>
                  <th>產品介紹</th>
                  <th>上架時間</th>
                  <th>編輯時間</th>
                  <th>上下架狀態</th>
                  <th>刪除</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.rows &&
                  data.rows.map((v, i) => {
                    const created_at = dayjs(v.created_at).format('YYYY-MM-DD')
                    const edit_at = dayjs(v.edit_at).format('YYYY-MM-DD')

                    return (
                      <tr className="text-nowrap" key={v.id}>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: '#8e2626',
                            }}
                          >
                            <Link href={`/Maket/maket-edit/${v.id}`}>
                              <FaRegEdit
                                style={{
                                  color: '#8e2626',
                                }}
                              />
                            </Link>
                          </div>
                        </td>
                        <td>{v.m}</td>
                        <td>{v.s}</td>
                        <td>
                          <Image
                            src={
                              v.product_photos.includes(',')
                                ? `http://localhost:3001/avatar/${v.product_photos
                                    .split(',')[0]
                                    .trim()}`
                                : `http://localhost:3001/avatar/${v.product_photos.trim()}`
                            }
                            width={150}
                            height={150}
                            alt="Product Photo"
                          />
                        </td>
                        <td
                          className="text-wrap text-truncate"
                          style={{ width: '80px' }}
                        >
                          {v.product_name}
                        </td>
                        <td>{v.product_price}</td>
                        <td>{v.product_qty}</td>
                        <td
                          className=""
                          style={{
                            fontSize: '18px',
                            color:
                              v.product_status == '1' ? 'green' : '#e96d3f',
                          }}
                        >
                          <strong>
                            {v.product_status == '1' ? '二手' : '全新'}
                          </strong>
                        </td>
                        <td
                          className="text-wrap text-truncate"
                          style={{ width: '80px' }}
                        >
                          {v.product_intro}
                        </td>
                        <td>{created_at}</td>
                        <td>{edit_at}</td>
                        <td>{v.status}</td>
                        <td>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: '#8e2626',
                            }}
                          >
                            <span
                              onClick={() => {
                                deleteItemWithConfirmation(v.id)
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  handleDelete(v.id)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                            >
                              <FaTrashAlt />
                            </span>
                          </div>
                        </td>
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

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
import { PROD_LIST, CART_ADD, TOGGLE_LIKE } from '@/configs/config-r'
// page
import DefaultLayout from '@/components/common/default-layout'
import LoginPage from '@/components/member/login-modal'
// style-----
import style from './prodSearch.module.css'
import toast, { Toaster } from 'react-hot-toast'
// react bootstrap
// react icons-----
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { GoSortAsc, GoSortDesc, GoDash, GoTriangleDown } from 'react-icons/go'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useCart } from '@/hooks/use-cart'
import { useLike } from '@/hooks/use-like'
import { useAuth } from '@/context/auth-context'
import { useLoader } from '@/hooks/use-loader'

export default function Shop() {
  const { loader } = useLoader()
  const [isShow, setIsShow] = useState(true)

  // Router-----
  const router = useRouter()
  const qs = { ...router.query }

  // Products-----
  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
    cate: [],
    searchMain: '',
    searchSub: '',
    searchPriceA: '',
    searchPriceB: '',
    searchPriceC: '',
    searchPriceD: '',
    searchPriceE: '',
    searchPrice: '',
    priceStart: '',
    priceEnd: '',
    searchProdStatusA: '',
    searchProdStatusB: '',
    searchDateA: '',
    searchDateB: '',
    searchDateC: '',
    searchDateD: '',
    searchDateE: '',
    searchDateF: '',
    searchDate: '',
    searchDateStart: '',
    searchDateEnd: '',
    totalCount: 0,
    priceRangeA: 0,
    priceRangeB: 0,
    priceRangeC: 0,
    priceRangeD: 0,
    priceRangeE: 0,
    prodStatusA: 0,
    prodStatusB: 0,
    dateRangeA: 0,
    dateRangeB: 0,
    dateRangeC: 0,
    dateRangeD: 0,
    dateRangeE: 0,
    dateRangeF: 0,
    priceA: '',
    priceB: '',
    dateA: '',
    dateB: '',
  })

  useEffect(() => {
    fetch(`${PROD_LIST}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [router.query])

  // Pages
  const startPage = Math.max(1, data.page - 2)
  const endPage = Math.min(data.totalPages, startPage + 4)

  // sort
  const [sortPrice, setSortPrice] = useState(false)
  const [sortDate, setSortDate] = useState(false)

  const handleSortPrice = () => {
    const newSortPrice = !sortPrice
    setSortPrice(newSortPrice)
    setSortDate(false)
    const priceOrder = newSortPrice ? 'priceSortASC' : 'priceSortDESC'
    router.push(`/shop?priceOrder=${priceOrder}`)
  }

  const handleSortDate = () => {
    const newSortDate = !sortDate
    setSortDate(newSortDate)
    setSortPrice(false)
    const dateOrder = newSortDate ? 'dateSortASC' : 'dateSortDESC'
    router.push(`/shop?dateOrder=${dateOrder}`)
  }

  // category
  const [mainSelect, setMainSelect] = useState(null)
  const [subSelect, setSubSelect] = useState(null)
  // price
  const [selectPriceA, setSelectPriceA] = useState(null)
  const handleSelectPriceA = (e) => {
    setSelectPriceA(e.currentTarget.checked)
  }
  const [selectPriceB, setSelectPriceB] = useState(null)
  const handleSelectPriceB = (e) => {
    setSelectPriceB(e.currentTarget.checked)
  }
  const [selectPriceC, setSelectPriceC] = useState(null)
  const handleSelectPriceC = (e) => {
    setSelectPriceC(e.currentTarget.checked)
  }
  const [selectPriceD, setSelectPriceD] = useState(null)
  const handleSelectPriceD = (e) => {
    setSelectPriceD(e.currentTarget.checked)
  }
  const [selectPriceE, setSelectPriceE] = useState(null)
  const handleSelectPriceE = (e) => {
    setSelectPriceE(e.currentTarget.checked)
  }
  const [selectPrice, setSelectPrice] = useState(false)
  const handleSelectPrice = (e) => {
    setSelectPrice(e.currentTarget.checked)
  }
  const [selectPriceStart, setSelectPriceStart] = useState('')
  const handlePriceStartChange = (e) => {
    setSelectPriceStart(e.currentTarget.value)
  }
  const [selectPriceEnd, setSelectPriceEnd] = useState('')
  const handlePriceEndChange = (e) => {
    setSelectPriceEnd(e.currentTarget.value)
  }
  // status
  const [selectProdStatusA, setSelectProdStatusA] = useState(null)
  const handleSelectProdStatusA = (e) => {
    setSelectProdStatusA(e.currentTarget.checked)
  }
  const [selectProdStatusB, setSelectProdStatusB] = useState(null)
  const handleSelectProdStatusB = (e) => {
    setSelectProdStatusB(e.currentTarget.checked)
  }
  // date
  const [selectDateA, setSelectDateA] = useState(null)
  const handleSelectDateA = (e) => {
    setSelectDateA(e.currentTarget.checked)
  }
  const [selectDateB, setSelectDateB] = useState(null)
  const handleSelectDateB = (e) => {
    setSelectDateB(e.currentTarget.checked)
  }
  const [selectDateC, setSelectDateC] = useState(null)
  const handleSelectDateC = (e) => {
    setSelectDateC(e.currentTarget.checked)
  }
  const [selectDateD, setSelectDateD] = useState(null)
  const handleSelectDateD = (e) => {
    setSelectDateD(e.currentTarget.checked)
  }
  const [selectDateE, setSelectDateE] = useState(null)
  const handleSelectDateE = (e) => {
    setSelectDateE(e.currentTarget.checked)
  }
  const [selectDateF, setSelectDateF] = useState(null)
  const handleSelectDateF = (e) => {
    setSelectDateF(e.currentTarget.checked)
  }
  const [selectDate, setSelectDate] = useState(null)
  const handleSelectDate = (e) => {
    setSelectDate(e.currentTarget.checked)
  }
  const [selectDateStart, setSelectDateStart] = useState('')
  const handleDateStartChange = (e) => {
    setSelectDateStart(e.currentTarget.value)
  }
  const [selectDateEnd, setSelectDateEnd] = useState('')
  const handleDateEndChange = (e) => {
    setSelectDateEnd(e.currentTarget.value)
  }

  // shop search
  const onmultiSearch = (e) => {
    e.preventDefault()

    const queryParams = new URLSearchParams()

    // Category search
    let searchMain = ''
    if (e.target.searchMain?.value) {
      const findMain = data.cate.find((v) => v.id == e.target.searchMain.value)
      if (findMain) {
        searchMain = findMain.category_name
      }
    }
    let searchSub = ''
    if (subSelect) {
      const findSub = data.cate.find((category) =>
        category.nodes.some((node) => node.id == subSelect)
      )
      if (findSub) {
        const subCategory = findSub.nodes.find((node) => node.id == subSelect)
        if (subCategory) {
          searchSub = subCategory.category_name
        }
      }
    }

    // Price search
    let searchPriceA = null
    if (selectPriceA) {
      searchPriceA = 'searchPriceA'
    }
    let searchPriceB = null
    if (selectPriceB) {
      searchPriceB = 'searchPriceB'
    }
    let searchPriceC = null
    if (selectPriceC) {
      searchPriceC = 'searchPriceC'
    }
    let searchPriceD = null
    if (selectPriceD) {
      searchPriceD = 'searchPriceD'
    }
    let searchPriceE = null
    if (selectPriceE) {
      searchPriceE = 'searchPriceE'
    }
    let searchPrice = null
    let priceStart = null
    let priceEnd = null
    if (selectPrice) {
      searchPrice = 'searchPrice'
      if (selectPriceStart) {
        priceStart = selectPriceStart
      }
      if (selectPriceEnd) {
        priceEnd = selectPriceEnd
      }
    }

    // Product status search
    let searchProdStatusA = null
    if (selectProdStatusA) {
      searchProdStatusA = 'searchProdStatusA'
    }

    let searchProdStatusB = null
    if (selectProdStatusB) {
      searchProdStatusB = 'searchProdStatusB'
    }

    // Date search
    let searchDateA = null
    if (selectDateA) {
      searchDateA = 'searchDateA'
    }
    let searchDateB = null
    if (selectDateB) {
      searchDateB = 'searchDateB'
    }
    let searchDateC = null
    if (selectDateC) {
      searchDateC = 'searchDateC'
    }
    let searchDateD = null
    if (selectDateD) {
      searchDateD = 'searchDateD'
    }
    let searchDateE = null
    if (selectDateE) {
      searchDateE = 'searchDateE'
    }
    let searchDateF = null
    if (selectDateF) {
      searchDateF = 'searchDateF'
    }
    let searchDate = null
    let searchDateStart = ''
    let searchDateEnd = ''
    if (selectDate) {
      searchDate = 'searchDate'
      if (selectDateStart) {
        searchDateStart = selectDateStart
      }
      if (selectDateEnd) {
        searchDateEnd = selectDateEnd
      }
    }

    // Append to queryParams only if checked
    if (searchMain !== '') {
      queryParams.append('searchMain', searchMain)
    }
    if (searchSub !== '') {
      queryParams.append('searchSub', searchSub)
    }
    if (searchPriceA !== '' && searchPriceA !== null) {
      queryParams.append('searchPriceA', searchPriceA)
    }
    if (searchPriceB !== '' && searchPriceB !== null) {
      queryParams.append('searchPriceB', searchPriceB)
    }
    if (searchPriceC !== '' && searchPriceC !== null) {
      queryParams.append('searchPriceC', searchPriceC)
    }
    if (searchPriceD !== '' && searchPriceD !== null) {
      queryParams.append('searchPriceD', searchPriceD)
    }
    if (searchPriceE !== '' && searchPriceE !== null) {
      queryParams.append('searchPriceE', searchPriceE)
    }
    if (searchPrice == 'searchPrice') {
      if (priceStart) {
        queryParams.append('priceStart', selectPriceStart)
      }
      if (priceEnd) {
        queryParams.append('priceEnd', selectPriceEnd)
      }
    }
    if (searchProdStatusA !== '' && searchProdStatusA !== null) {
      queryParams.append('searchProdStatusA', searchProdStatusA)
    }
    if (searchProdStatusB !== '' && searchProdStatusB !== null) {
      queryParams.append('searchProdStatusB', searchProdStatusB)
    }
    if (searchDateA !== '' && searchDateA !== null) {
      queryParams.append('searchDateA', searchDateA)
    }
    if (searchDateB !== '' && searchDateB !== null) {
      queryParams.append('searchDateB', searchDateB)
    }
    if (searchDateC !== '' && searchDateC !== null) {
      queryParams.append('searchDateC', searchDateC)
    }
    if (searchDateD !== '' && searchDateD !== null) {
      queryParams.append('searchDateD', searchDateD)
    }
    if (searchDateE !== '' && searchDateE !== null) {
      queryParams.append('searchDateE', searchDateE)
    }
    if (searchDateF !== '' && searchDateF !== null) {
      queryParams.append('searchDateF', searchDateF)
    }
    if (searchDate == 'searchDate') {
      if (searchDateStart) {
        queryParams.append('searchDateStart', selectDateStart)
      }
      if (searchDateEnd) {
        queryParams.append('searchDateEnd', selectDateEnd)
      }
    }

    router.push(`/shop?${queryParams}`)
  }

  // cart
  const { addItem } = useCart()
  const notify = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已加入購物車'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/cart')
          }}
        >
          連至 購物車
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const notifyNoAdd = (productName) => {
    const msgBox2 = (
      <div>
        <span>
          <strong>{productName + ' 已下架，不可加入購物車'}</strong>
        </span>
      </div>
    )
    toast.error(msgBox2)
  }

  const notifyNeedAuth = () => {
    const msgBox3 = (
      <div>
        <p>
          <strong>{'請先登入才可以使用此功能！'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={handleLoginClick}
        >
          點我登入
        </button>
      </div>
    )
    toast(msgBox3)
  }

  const cartClick = async (productData) => {
    const r = await fetch(`${CART_ADD}/${productData.product_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    const result = await r.json()
    console.log(result)
    if (result.success) {
      notify(productData.p_name)
    }
  }

  // Like
  const { addProd, removeProdById } = useLike()
  const notify2 = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已加入收藏'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/like')
          }}
        >
          連至 收藏清單
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const notify3 = (productName) => {
    const msgBox = (
      <div>
        <p>
          <strong>{productName + ' 已從收藏清單移除'}</strong>
        </p>
        <button
          className={`btn mx-auto ${style.conneBtn}`}
          style={{ backgroundColor: '#e96d3f', color: 'white' }}
          onClick={() => {
            router.push('/shop/like')
          }}
        >
          連至 收藏清單
        </button>
      </div>
    )
    toast.success(msgBox)
  }

  const [isClicked, setIsClicked] = useState([])

  const likeClick = async (productData2) => {
    const member_id = auth.userData.id
    const r = await fetch(
      `${TOGGLE_LIKE}/${productData2.product_id}?member_id=${member_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData2),
      }
    )
    const result = await r.json()
    console.log(result)
    if (result.success) {
      if (!isClicked.includes(productData2.product_id)) {
        setIsClicked([...isClicked, productData2.product_id])
        notify2(productData2.p_name)
        addProd(productData2)
      } else {
        setIsClicked(isClicked.filter((pid) => pid != productData2.product_id))
        notify3(productData2.p_name)
        removeProdById(productData2.product_id)
      }
    }
  }

  // member
  const { checkAuth, auth } = useAuth()

  // ---Modal---
  // 關閉登入視窗
  const handleLoginClose = () => {
    if (!isLoading) {
      setShowLogin(false)
    }
  }
  // 點擊登入按鈕
  const handleLoginClick = () => {
    if (!auth.isAuth) {
      // 如果用戶未登入，則顯示登入表單
      setShowLogin(true)
    }
  }
  // 登入表單提交
  const handleLoginSubmit = async () => {
    // 開始檢查認證狀態
    setIsLoading(true)
    await checkAuth()
    // 結束檢查認證狀態
    setIsLoading(false)
    if (auth.isAuth) {
      // 如果已經登入，則關閉模態框
      setShowLogin(false)
    }
  }

  // 如果已經登入，則關閉模態框
  useEffect(() => {
    if (auth.isAuth) {
      setShowLogin(false)
      checkAuth()
    }
  }, [auth.isAuth])

  const [showLogin, setShowLogin] = useState(false)

  // Loading bar-----
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (isLoading) {
      setProgress(60)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(100)
      }, 300)
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsShow(false)
      }, 800)
    }
  })

  const display = (
    <>
      <DefaultLayout pageName="productSearch">
        <Head>
          <title>探索商品 | DEAL-2ND HAND SHOP</title>
        </Head>
        {/*  Breadcrumb Start */}
        <div className={`container-fluid ${style.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb mb-30">
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                  href="/"
                >
                  <span>首頁</span>
                </Link>
                <span className="breadcrumb-item active">探索商品</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}

        {/* Shop Start */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            {/* Shop Sidebar Start */}
            <div className="col-lg-3 col-md-4 mt-5">
              <form role="search" onSubmit={onmultiSearch}>
                {/* main-category start */}
                <div
                  className="d-flex justify-content-center"
                  style={{
                    backgroundColor: '#8e2626',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <h4 className="pt-2" style={{ color: 'white' }}>
                    <strong>
                      <GoTriangleDown />
                      商品分類篩選
                    </strong>
                  </h4>
                </div>
                <div className="mb-4 bg-light px-3 py-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="searchMain"
                    value={mainSelect}
                    onChange={(e) => setMainSelect(+e.currentTarget.value)}
                  >
                    <option selected disabled value="disable">
                      開始搜尋吧！
                    </option>
                    {data.cate.map((v) => {
                      if (v.parent_id == 0) {
                        return (
                          <option
                            key={v.id}
                            style={{ color: '#8e2626' }}
                            value={v.id}
                            name="searchMain"
                          >
                            {v.category_name}
                          </option>
                        )
                      }
                    })}
                  </select>
                </div>
                {/* main-category end */}
                {/* sub-category start */}
                <div
                  className="d-flex justify-content-center"
                  style={{
                    backgroundColor: '#8e2626',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <h4 className="pt-2" style={{ color: 'white' }}>
                    <strong>
                      <GoTriangleDown />
                      商品子分類篩選
                    </strong>
                  </h4>
                </div>
                <div className="mb-4 bg-light px-3 py-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setSubSelect(+e.currentTarget.value)}
                    value={subSelect}
                  >
                    <option selected disabled value="disable">
                      開始搜尋吧！
                    </option>
                    {data.cate.map((v) =>
                      v.nodes.map((node) => {
                        if (node.parent_id === mainSelect) {
                          return (
                            <option
                              key={node.id}
                              style={{ color: '#8e2626' }}
                              value={node.id}
                              name="searchSub"
                            >
                              {node.category_name}
                            </option>
                          )
                        }
                      })
                    )}
                  </select>
                </div>
                {/* sub-category end */}
                {/* Price Start */}
                <div
                  className="d-flex justify-content-center"
                  style={{
                    backgroundColor: '#8e2626',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <h4 className="pt-2" style={{ color: 'white' }}>
                    <strong>
                      <GoTriangleDown />
                      價格篩選
                    </strong>
                  </h4>
                </div>
                <div className="bg-light p-3 mb-4">
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="searchPrice"
                      id="all"
                    />
                    <label className="form-check-label mx-auto" htmlFor="all">
                      <strong style={{ fontSize: '16px' }}>全部商品</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.totalCount}
                    </span>
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchPriceA"
                      name="searchPrice"
                      checked={selectPriceA}
                      onChange={handleSelectPriceA}
                    />
                    <label
                      className="form-check-label mx-auto"
                      htmlFor="searchPriceA"
                    >
                      <strong style={{ fontSize: '16px' }}>$0 - $500</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.priceRangeA}
                    </span>
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchPriceB"
                      name="searchPrice"
                      checked={selectPriceB}
                      onChange={handleSelectPriceB}
                    />
                    <label
                      className="form-check-label mx-auto"
                      htmlFor="searchPriceB"
                    >
                      <strong style={{ fontSize: '16px' }}>$501 - $1000</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.priceRangeB}
                    </span>
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchPriceC"
                      name="searchPrice"
                      checked={selectPriceC}
                      onChange={handleSelectPriceC}
                    />
                    <label
                      className="form-check-label mx-auto"
                      htmlFor="searchPriceC"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        $1001 - $3000
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.priceRangeC}
                    </span>
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchPriceD"
                      name="searchPrice"
                      checked={selectPriceD}
                      onChange={handleSelectPriceD}
                    />
                    <label
                      className="form-check-label mx-auto"
                      htmlFor="searchPriceD"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        $3001 - $5000
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.priceRangeD}
                    </span>
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchPriceE"
                      name="searchPrice"
                      checked={selectPriceE}
                      onChange={handleSelectPriceE}
                    />
                    <label
                      className="form-check-label mx-auto"
                      htmlFor="searchPriceE"
                    >
                      <strong style={{ fontSize: '16px' }}>$5001↑</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.priceRangeE}
                    </span>
                  </div>
                  <div className="custom-control">
                    <div className="form-check d-flex align-items-center justify-content-center mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="searchPrice"
                        name="searchPrice"
                        checked={selectPrice}
                        onChange={handleSelectPrice}
                      />
                      <label
                        className="form-check-label mx-auto"
                        htmlFor="searchPrice"
                      >
                        <strong style={{ fontSize: '16px' }}>自訂區間</strong>
                      </label>
                      <div className="d-flex">
                        <GoDash />
                        <GoDash />
                        <GoDash />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mx-auto">
                      <input
                        type="number"
                        aria-label="lowest price"
                        className="form-control"
                        style={{ width: '48%' }}
                        placeholder="價格下限"
                        name="priceStart"
                        value={selectPriceStart}
                        onChange={handlePriceStartChange}
                      />
                      <span>
                        <strong>-</strong>
                      </span>
                      <input
                        type="number"
                        aria-label="highest price"
                        className="form-control"
                        style={{ width: '48%' }}
                        placeholder="價格上限"
                        name="priceEnd"
                        value={selectPriceEnd}
                        onChange={handlePriceEndChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Price End */}
                {/* new & old Start */}
                <div
                  className="d-flex justify-content-center"
                  style={{
                    backgroundColor: '#8e2626',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <h4 className="pt-2" style={{ color: 'white' }}>
                    <strong>
                      <GoTriangleDown />
                      商品狀態篩選
                    </strong>
                  </h4>
                </div>
                <div className="bg-light p-3 mb-4">
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="searchProdStatus"
                      id="all"
                    />
                    <label className="form-check-label mx-auto" htmlFor="all">
                      <strong style={{ fontSize: '16px' }}>全部商品</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.totalCount}
                    </span>
                  </div>
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchProdStatusA"
                      name="searchProdStatus"
                      value={selectProdStatusA}
                      onChange={handleSelectProdStatusA}
                    />
                    <label
                      className="custom-control-label mx-auto"
                      htmlFor="searchProdStatusA"
                    >
                      <strong style={{ fontSize: '16px' }}>二手商品</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.prodStatusA}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchProdStatusB"
                      name="searchProdStatus"
                      value={selectProdStatusB}
                      onChange={handleSelectProdStatusB}
                    />
                    <label
                      className="custom-control-label mx-auto"
                      htmlFor="searchProdStatusB"
                    >
                      <strong style={{ fontSize: '16px' }}>全新商品</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.prodStatusB}
                    </span>
                  </div>
                </div>
                {/* new & old  End */}
                {/* created_at Start */}
                <div
                  className="d-flex justify-content-center"
                  style={{
                    backgroundColor: '#8e2626',
                    borderRadius: '5px 5px 0 0',
                  }}
                >
                  <h4 className="pt-2" style={{ color: 'white' }}>
                    <strong>
                      <GoTriangleDown />
                      上架時間篩選
                    </strong>
                  </h4>
                </div>
                <div className="bg-light p-3 mb-30">
                  <div className="form-check d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="searchDate"
                      id="date-all"
                    />
                    <label className="custom-control-label" htmlFor="date-all">
                      <strong style={{ fontSize: '16px' }}>全部商品</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeA}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchDateA"
                      name="searchDate"
                      value={selectDateA}
                      onChange={handleSelectDateA}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="searchDateA"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        2010年 - 2012年
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeA}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchDateB"
                      name="searchDate"
                      value={selectDateB}
                      onChange={handleSelectDateB}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="searchDateB"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        2013年 - 2015年
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeB}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchDateC"
                      name="searchDate"
                      value={selectDateC}
                      onChange={handleSelectDateC}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="searchDateC"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        2016年 - 2018年
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeC}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchDateD"
                      name="searchDate"
                      value={selectDateD}
                      onChange={handleSelectDateD}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="searchDateD"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        2019年 - 2021年
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeD}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchDateE"
                      name="searchDate"
                      value={selectDateE}
                      onChange={handleSelectDateE}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="searchDateE"
                    >
                      <strong style={{ fontSize: '16px' }}>
                        2022年 - 2023年
                      </strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeE}
                    </span>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="searchDateF"
                      name="searchDate"
                      value={selectDateF}
                      onChange={handleSelectDateF}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="searchDateF"
                    >
                      <strong style={{ fontSize: '16px' }}>2024年</strong>
                    </label>
                    <span
                      className="badge border font-weight-normal"
                      style={{ color: 'gray', fontSize: '14px' }}
                    >
                      {data.dateRangeF}
                    </span>
                  </div>
                  <div className="custom-control">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="searchDate"
                        name="searchDate"
                        value={selectDate}
                        onChange={handleSelectDate}
                      />
                      <label
                        className="form-check-label mx-auto"
                        htmlFor="searchPrice"
                      >
                        <strong style={{ fontSize: '16px' }}>自訂區間</strong>
                      </label>
                      <div className="d-flex">
                        <GoDash />
                        <GoDash />
                        <GoDash />
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <input
                        type="date"
                        className="form-control"
                        style={{ width: '50%' }}
                        name="searchDateStart"
                        value={selectDateStart}
                        onChange={handleDateStartChange}
                      />
                      <div className="">
                        <strong> - </strong>
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        style={{ width: '50%' }}
                        name="searchDateEnd"
                        value={selectDateEnd}
                        onChange={handleDateEndChange}
                      />
                    </div>
                  </div>
                </div>
                {/* created_at End */}
                <div className="text-center">
                  <button
                    className={`btn mt-3 ${style.searchBtn}`}
                    type="submit"
                    style={{
                      backgroundColor: '#e96d3f',
                      color: 'white',
                    }}
                  >
                    <strong>開始搜尋</strong>
                  </button>
                </div>
              </form>
            </div>
            {/* Shop Sidebar End */}

            {/* Shop Product Start*/}
            <div className="col-lg-9 col-md-8">
              {/* sorting start */}
              <div className="row px-lg-4">
                <div className="col-12 mt-4 text-lg-end text-center">
                  <button
                    className="btn me-lg-3 me-md-3"
                    style={{ backgroundColor: '#e68b6a', border: 'none' }}
                    name="price"
                    onClick={handleSortPrice}
                  >
                    <strong>
                      價格排序 {!sortPrice ? `(由高到低)` : `(由低到高)`}{' '}
                      {!sortPrice ? <GoSortDesc /> : <GoSortAsc />}
                    </strong>
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: '#e29f19', border: 'none' }}
                    name="date"
                    onClick={handleSortDate}
                  >
                    <strong>
                      上架日期排序 {!sortDate ? `(由遠到近)` : `(由近到遠)`}{' '}
                      {!sortDate ? <GoSortDesc /> : <GoSortAsc />}
                    </strong>
                  </button>
                </div>
              </div>
              {/* sorting end */}
              <div className="row pb-3 mt-4">
                {data.rows.map((v, i) => {
                  return (
                    <div
                      key={v.id}
                      className="col-lg-4 col-md-12 col-sm-12 pb-1"
                    >
                      <div
                        className={`product-item bg-light mb-5 mx-auto ${style.productItem}`}
                        style={{ marginBottom: '60px' }}
                      >
                        <div className="overflow-hidden ">
                          <div
                            className="position-relative"
                            style={{ overflow: 'hidden', height: '266px' }}
                          >
                            <img
                              className={`img-fluid w-100 ${style.imgAct}`}
                              src={
                                v.product_photos.includes(',')
                                  ? `/${v.product_photos.split(',')[0]}`
                                  : `/${v.product_photos}`
                              }
                              alt=""
                              width={266}
                              height={266}
                              style={{ height: '266px', objectFit: 'cover' }}
                            />
                            <div className={style.productAction}>
                              <button
                                className="btn"
                                onClick={() => {
                                  if (auth.isAuth && v.status == '1') {
                                    addItem(v)
                                    const productData = {
                                      member_id: auth.userData.id,
                                      product_id: v.id,
                                      p_photos: v.product_photos,
                                      p_name: v.product_name,
                                      p_price: v.product_price,
                                      p_qty: 1,
                                      total_price: v.product_price,
                                      available_cp: v.mc ? v.mc : v.sc,
                                    }
                                    console.log(productData)
                                    cartClick(productData)
                                  } else if (!auth.isAuth && v.status == '1') {
                                    notifyNeedAuth()
                                  } else {
                                    notifyNoAdd(v.product_name)
                                  }
                                }}
                              >
                                <BsFillCartFill className={style.iconAInner} />
                              </button>
                              <button
                                className="btn"
                                onClick={() => {
                                  if (auth.isAuth) {
                                    const productData2 = {
                                      member_id: auth.userData.id,
                                      product_id: v.id,
                                      p_photos: v.product_photos,
                                      p_name: v.product_name,
                                      p_price: v.product_price,
                                      p_qty: 1,
                                      total_price: v.product_price,
                                      available_cp: v.mc ? v.mc : v.sc,
                                    }
                                    likeClick(productData2)
                                  } else {
                                    notifyNeedAuth()
                                  }
                                }}
                              >
                                <AiOutlineHeart
                                  className={style.iconBInner}
                                  style={{
                                    color: isClicked.includes(v.id)
                                      ? '#e96d3f'
                                      : '',
                                    backgroundColor: isClicked.includes(v.id)
                                      ? '#8e2626'
                                      : '',
                                  }}
                                />
                              </button>
                              <Link
                                href={`/shop?searchSub=${v.s}`}
                                className="btn"
                              >
                                <IoSearch className={style.iconCInner} />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <Link
                          href={`/shop/${v.id}`}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <div
                            className="text-center py-3 px-2"
                            style={{ height: '160px' }}
                          >
                            <div
                              className="text-wrap text-truncate"
                              style={{ height: '70%' }}
                              href=""
                            >
                              <h5>
                                <strong className="">{v.product_name}</strong>
                              </h5>
                            </div>
                            <div className="d-flex justify-content-center ">
                              <div
                                className=""
                                style={{
                                  fontSize: '18px',
                                  color:
                                    v.product_status == '1'
                                      ? 'green'
                                      : '#e96d3f',
                                }}
                              >
                                <strong>
                                  {v.product_status == '1' ? '二手' : '全新'}
                                </strong>
                              </div>
                              &nbsp;
                              <div className="" style={{ fontSize: '18px' }}>
                                <strong>
                                  ${v.product_price.toLocaleString()}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="row mb-5">
                <div className="col-lg-12">
                  <nav>
                    <ul className="pagination pagination justify-content-center">
                      <li className="page-item">
                        <Link className="page-link" href={`?page=1`}>
                          <FaAngleDoubleLeft style={{ color: '#e96d3f' }} />
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href={`?page=${Math.max(data.page - 1, 1)}`}
                        >
                          <FaAngleLeft style={{ color: '#e96d3f' }} />
                        </Link>
                      </li>
                      {Array.from(
                        { length: endPage - startPage + 1 },
                        (v, i) => {
                          const p = startPage + i
                          const active = p === data.page ? 'active' : ''
                          const usp = new URLSearchParams({ ...qs, page: p })
                          return (
                            <li className={`page-item ${active}`} key={p}>
                              <Link
                                className="page-link"
                                style={{
                                  color: active ? 'white' : '#e96d3f',
                                  backgroundColor: active ? '#e96d3f' : 'white',
                                  border: active ? '1px solid #e96d3f' : '',
                                }}
                                href={`?${usp}`}
                              >
                                {p}
                              </Link>
                            </li>
                          )
                        }
                      )}
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href={`?page=${Math.min(
                            data.page + 1,
                            data.totalPages
                          )}`}
                        >
                          <FaAngleRight style={{ color: '#e96d3f' }} />
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link"
                          href={`?page=${data.totalPages}`}
                        >
                          <FaAngleDoubleRight style={{ color: '#e96d3f' }} />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* Shop Product End */}
            <Toaster />
          </div>
        </div>
        {/* Shop End */}
      </DefaultLayout>
      {/* Login Modal start */}
      <LoginPage
        show={showLogin}
        onHide={handleLoginClose}
        onSubmit={handleLoginSubmit}
      />
      {/* Login Modal end */}
    </>
  )

  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {isShow ? loader() : ''}
          {display}
        </>
      )}
    </>
  )
}

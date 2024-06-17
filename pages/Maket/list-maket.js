import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/use-cart'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Styles from '@/styles/list-maket.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultLayout from '@/components/common/default-layout'
import { PROD_LIST5 } from '@/configs/config-lee'
import { PROD_LIST6 } from '@/configs/config-lee'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function ListMaket() {
  const [avatarFile, setAvatarFile] = useState(null)
  const [fullname2, setFullname2] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [PreviewUrl, setPreviewUrl] = useState(null)
  console.log(avatarFile)

  const postInForm = (e) => {
    // 注意使用onSubmit要加這行取消表單預設送出行為(不然會造成表單送出後頁面跳轉)
    e.preventDefault()

    const fd = new FormData(e.target)
    fd.append('seller_id', 2)
    fd.append('category_id', fd.get('searchSub'))

    if (selectedFile) {
      fd.append('avatar', selectedFile)
    } else {
      console.error('No avatar file selected.')
      // 在這裡處理沒有選擇檔案的情況，例如顯示錯誤提示或執行其他操作
      return // 停止執行函數
    }
    //123
    fetch('http://localhost:3001/list-post/add', {
      method: 'POST',
      body: fd,
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data)
      })

    // axios.post('http://localhost:3005/api/users/upload', fd).then((r) => {
    //   console.log(r.data)
    // })
  }

  // const postOutForm = () => {
  //   const fd = new FormData()
  //   console.log(selectedFile)
  //   if (selectedFile) {
  //     fd.append('avatar', selectedFile)
  //   } else {
  //     console.error('No avatar file selected.')
  //     // 在這裡處理沒有選擇檔案的情況，例如顯示錯誤提示或執行其他操作
  //     return // 停止執行函數
  //   }
  //   fd.append('fullname', fullname2)

  //   fetch('http://localhost:3001/list-post/add', {
  //     method: 'POST',
  //     body: fd,
  //   })
  //     .then((r) => r.json())
  //     .then((data) => {
  //       console.log(data)
  //     })
  // }
  // Router-----
  const router = useRouter()
  const [formData, setFormData] = useState({
    seller_id: '',
    category_id: '',
    product_photos: '',
    product_name: '',
    product_price: '',
    product_qty: '',
    product_status: '',
    product_intro: '',
    status: '',
  })
  const [errorMsg, setErrorMsg] = useState({
    seller_id: '',
    category_id: '',
    product_photos: '',
    product_name: '',
    product_price: '',
    product_qty: '',
    product_status: '',
    product_intro: '',
    status: '',
  })
  // 整個表單有沒有通過檢查
  const [isPass, setIsPass] = useState(false)

  const validateName = (product_name) => {
    return product_name.toString().length >= 2
  }
  const validatePrice = (product_price) => {
    return product_price.toString().length >= 1 // 粗略的判斷方式
  }

  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  const nameBlur = () => {
    if (formData.product_name.trim() === '') {
      setErrorMsg({ ...errorMsg, product_name: '請輸入名稱' })
      return false
    } else if (!validateName(formData.product_name)) {
      setErrorMsg({ ...errorMsg, product_name: '請輸入兩個字以上的名稱' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, product_name: '' })
      return true
    }
  }

  const priceBlur = () => {
    if (!validatePrice(formData.product_price)) {
      setErrorMsg({ ...errorMsg, product_price: '請輸入正確的金額' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, product_price: '' }) // 清除錯誤訊息
      return true
    }
  }

  const qtyBlur = () => {
    if (!validatePrice(formData.product_qty)) {
      setErrorMsg({ ...errorMsg, product_qty: '請輸入正確的數量' })
      return false
    } else {
      setErrorMsg({ ...errorMsg, product_qty: '' }) // 清除錯誤訊息
      return true
    }
  }
  const assureBtn = () => {
    MySwal.fire({
      title: '確定是否新增？',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定!',
      cancelButtonText: '取消!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/Maket/return')
        Swal.fire({
          title: '商品',
          text: '已新增成功',
          icon: 'success',
        })
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 阻止表單的默認提交行為
    const isNameValid = nameBlur()
    const isPriceValid = priceBlur()
    const isQtyValid = qtyBlur()
    if (isNameValid && isPriceValid && isQtyValid) {
      // 資料驗證通過，可以提交表單
      try {
        const r = await fetch(PROD_LIST6, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const result = await r.json()

        console.log(result)
        if (result.success) {
          alert('資料新增成功')
          router.push('/products')
        } else {
          alert('資料沒有新增')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      alert('必填欄位請填入符合格式的值')
    }
  }
  function uploadFile() {
    const fileInput = document.getElementById('fileInput')
    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append('file', file)

    fetch('public', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Upload success:', data)
      })
      .catch((error) => {
        console.error('Upload error:', error)
      })
  }
  // Products-----
  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPages: 0,
    rows: [],
    cate: [],
    searchMain: '',
    searchSub: '',
  })
  useEffect(() => {
    fetch(`${PROD_LIST5}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => {
        setData(dataObj)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [router.query])

  // category
  const [mainSelect, setMainSelect] = useState(null)
  const [subSelect, setSubSelect] = useState(null)

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

    // Append to queryParams only if checked
    if (searchMain !== '') {
      queryParams.append('searchMain', searchMain)
    }
    if (searchSub !== '') {
      queryParams.append('searchSub', searchSub)
    }

    router.push(`/list-maket?${queryParams}`)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      setSelectedFile(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // 將圖片的 URL 更新到 formData 中的 product_photos 欄位
      setFormData({
        ...formData,
        product_photos: objectUrl,
      })
    } else {
      setSelectedFile(file)
      setPreviewUrl('')
      setFormData({
        ...formData,
        product_photos: '',
      })
    }
    // 這裡可以添加上傳圖片的相關代碼
    console.log('Selected file:', file)
  }
  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which
    const keyValue = String.fromCharCode(keyCode)

    // 允許輸入的字符：數字、退格、刪除、左箭頭、右箭頭
    const allowedCharacters = /[0-9\b\t\x7F]/

    if (!allowedCharacters.test(keyValue)) {
      e.preventDefault()
    }
  }

  // const [selectedOption, setSelectedOption] = useState(null)
  // const [showMessage, setShowMessage] = useState(false)
  // const handleOptionChange = (option) => {
  //   setSelectedOption(option)
  //   setShowMessage(option === 'no') // 当选择“否”时显示消息
  // }
  // // 其他
  // const [shippingDays, setShippingDays] = useState(3) // 初始值為 3 天

  // const increaseShippingDays = () => {
  //   if (shippingDays < 30) {
  //     setShippingDays((prev) => prev + 1)
  //   }
  // }

  // const decreaseShippingDays = () => {
  //   if (shippingDays > 3) {
  //     setShippingDays((prev) => prev - 1)
  //   }
  // }

  const styles = {
    body: {
      fontFamily: 'Microsoft JhengHei, Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f5f5f5',
    },
  }

  return (
    <>
      <DefaultLayout pageName="helpCenter">
        <Head>
          <title>新增商品 | DEAL-2ND HAND SHOP</title>
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
                <span className="breadcrumb-item active">新增商品</span>
              </nav>
            </div>
          </div>
        </div>
        <form onSubmit={postInForm}>
          <div styles={styles.body}>
            <div styles={{ fontSize: 20, lineHeight: '1.5' }}>
              <div className={Styles.containerHome}>
                <div className={Styles.containerPage}>
                  <h2>
                    <strong>商品資訊</strong>
                  </h2>
                  <table className={Styles.localClass}>
                    <tbody>
                      <tr>
                        <th>項目</th>
                        <th>說明</th>
                      </tr>

                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>商品圖片
                        </td>
                        <td>
                          <div>
                            {/* 點擊圖片觸發上傳 */}
                            <div
                              htmlFor="upload"
                              className="rounded float-start"
                              role="presentation"
                              onClick={() => {
                                document.getElementById('upload').click()
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  border: '1px dashed #808080',
                                  padding: '10px',
                                  borderRadius: '5px',
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faImage}
                                  style={{
                                    color: '#f4841a',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    marginBottom: '5px',
                                  }}
                                />
                                <span
                                  style={{ color: '#f4841a', fontSize: '12px' }}
                                >
                                  新增圖片
                                </span>
                              </div>
                              <img
                                src={PreviewUrl}
                                style={{
                                  width: '200px',
                                  height: '200px',
                                  objectFit: 'cover',
                                }}
                              />
                            </div>
                            <input
                              type="file"
                              id="upload"
                              className="upload-input"
                              accept="image/*"
                              onChange={handleFileChange}
                              value="" // 將值設置為空字符串
                              style={{ display: 'none' }}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>商品名稱
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="請輸入"
                            className="form-control"
                            name="product_name"
                            onBlur={nameBlur}
                            value={formData.product_name}
                            onChange={fieldChanged}
                            style={{ width: '350px' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>商品分類篩選
                        </td>
                        <td>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="searchMain"
                            value={mainSelect}
                            onChange={(e) =>
                              setMainSelect(+e.currentTarget.value)
                            }
                          >
                            <option selected disabled value="disable">
                              請選擇
                            </option>
                            {data &&
                              data.cate.map((v, i) => {
                                return (
                                  <option
                                    key={v.id}
                                    style={{ color: '#8e2626' }}
                                    value={v.id}
                                  >
                                    {v.category_name}
                                  </option>
                                )
                              })}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>
                          商品子分類篩選
                        </td>
                        <td>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="searchSub"
                            onChange={(e) => {
                              setSubSelect(+e.currentTarget.value)
                              setFormData({
                                ...formData,
                                category_id: e.target.value,
                              })
                            }}
                            value={subSelect}
                          >
                            <option selected disabled value="disable">
                              請選擇
                            </option>
                            {data.cate.map((v) =>
                              v.nodes.map((node) => {
                                if (node.parent_id === mainSelect) {
                                  return (
                                    <option
                                      key={node.id}
                                      style={{ color: '#8e2626' }}
                                      value={node.id}
                                    >
                                      {node.category_name}
                                    </option>
                                  )
                                }
                              })
                            )}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>商品描述
                        </td>
                        <td>
                          <textarea
                            placeholder="0/3000"
                            rows={4}
                            cols={50}
                            name="product_intro"
                            defaultValue={''}
                            value={formData.product_intro}
                            onChange={fieldChanged}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 銷售資訊 */}
                <div className={Styles.containerPage}>
                  <h2>
                    <strong>銷售資訊</strong>
                  </h2>
                  <table className={Styles.localClass}>
                    <tbody>
                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>價格
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="請輸入"
                            className="form-control"
                            name="product_price"
                            onBlur={priceBlur}
                            onChange={fieldChanged}
                            value={formData.product_price}
                            style={{ width: '500px' }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className={Styles.required}>*</span>商品數量
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="0"
                            className="form-control"
                            name="product_qty"
                            onBlur={qtyBlur}
                            onChange={fieldChanged}
                            value={formData.product_qty}
                            style={{ width: '500px' }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={Styles.categoryGroup}></div>

                {/* 運費 */}
                {/* <div className={Styles.containerPage}>
                  <h2>運費</h2>
                  <table className={Styles.shippingTable}>
                    <tbody>
                      <tr>
                        <td style={{ paddingBottom: '30px' }}>重量</td>
                        <td style={{ paddingBottom: '30px' }}>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <div
                              style={{
                                marginLeft: '20px',
                                position: 'relative',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                              }}
                            >
                              <input
                                type="text"
                                placeholder="請輸入"
                                style={{
                                  width: 'calc(100% - 20px)',
                                  padding: '5px',
                                  border: 'none',
                                  borderRadius: '5px',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  right: '5px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: '#ccc',
                                }}
                              >
                                ｜kg
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: '10px' }}>包裹尺寸大小</td>
                        <td>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <div
                              style={{
                                marginLeft: '20px',
                                position: 'relative',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                              }}
                            >
                              <input
                                type="text"
                                placeholder="寬"
                                style={{
                                  width: 'calc(100% - 20px)',
                                  padding: '5px',
                                  border: 'none',
                                  borderRadius: '5px',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  right: '5px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: '#ccc',
                                }}
                              >
                                ｜cm
                              </div>
                            </div>
                            <div
                              style={{
                                marginLeft: '20px',
                                color: '#ccc',
                                lineHeight: '1',
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <div
                              style={{
                                marginLeft: '20px',
                                position: 'relative',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                              }}
                            >
                              <input
                                type="text"
                                placeholder="長"
                                style={{
                                  width: 'calc(100% - 20px)',
                                  padding: '5px',
                                  border: 'none',
                                  borderRadius: '5px',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  right: '5px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: '#ccc',
                                }}
                              >
                                ｜cm
                              </div>
                            </div>
                            <div
                              style={{
                                marginLeft: '20px',
                                color: '#ccc',
                                lineHeight: '1',
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <div
                              style={{
                                marginLeft: '20px',
                                position: 'relative',
                                width: '100%',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                              }}
                            >
                              <input
                                type="text"
                                placeholder="高"
                                style={{
                                  width: 'calc(100% - 20px)',
                                  padding: '5px',
                                  border: 'none',
                                  borderRadius: '5px',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  right: '5px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  color: '#ccc',
                                }}
                              >
                                ｜cm
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingTop: '40px' }}>買家支付運費</td>
                        <td style={{ paddingTop: '40px' }}>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <button
                              style={{
                                marginLeft: '20px',
                                padding: '10px 20px',
                                backgroundColor: 'white',
                                color: '#ff6600',
                                border: '1px solid #ff6600',
                                borderRadius: '5px',
                                cursor: 'pointer',
                              }}
                            >
                              新增物流方式
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}

                {/* 其他 */}
                <div className={Styles.containerPage}>
                  <h2>
                    <strong>其他</strong>
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '30px',
                    }}
                  >
                    {/* <div style={{ marginRight: '10px' }}>較長備貨</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label
                        style={{
                          marginRight: '20px',
                          marginBottom: 0,
                          position: 'relative',
                          display: 'inline-block',
                        }}
                      >
                        <input
                          type="radio"
                          value="no"
                          checked={selectedOption === 'no'}
                          onChange={() => handleOptionChange('no')}
                          style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            cursor: 'pointer',
                          }}
                        />
                        <div
                          style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: '2px solid #ccc',
                            backgroundColor:
                              selectedOption === 'no' ? 'orange' : 'white',
                          }}
                        />
                        <span style={{ marginLeft: '8px' }}>否</span>
                      </label>
                    </div>
                    {selectedOption === 'no' && (
                      <div style={{ marginLeft: '10px' }}>
                        <span
                          style={{
                            color: '#888',
                            fontSize: '16px',
                          }}
                        >
                          我會在 2 個工作日之內出貨
                          (不包含週六、週日、國定假日、補班日之假日與第三方物流休息日)
                        </span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label
                        style={{
                          marginBottom: 0,
                          position: 'relative',
                          display: 'inline-block',
                        }}
                      >
                        <input
                          type="radio"
                          value="yes"
                          checked={selectedOption === 'yes'}
                          onChange={() => handleOptionChange('yes')}
                          style={{
                            position: 'absolute',
                            opacity: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            cursor: 'pointer',
                          }}
                        />
                        <div
                          style={{
                            display: 'inline-block',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: '2px solid #ccc',
                            backgroundColor:
                              selectedOption === 'yes' ? 'orange' : 'white',
                          }}
                        />
                        <span style={{ marginLeft: '8px' }}>是</span>
                      </label>
                    </div>
                    {selectedOption === 'yes' && (
                      <div style={{ marginLeft: '10px' }}>
                        <span
                          style={{
                            color: '#888',
                            fontSize: '16px',
                          }}
                        >
                          我需要{' '}
                          <span style={{ fontWeight: 'bold' }}>
                            {shippingDays} 個
                            <button onClick={decreaseShippingDays}>-</button>
                            <button onClick={increaseShippingDays}>+</button>
                          </span>{' '}
                          出貨天數(您可以設定 3 至 30天)
                        </span>
                      </div>
                    )}
                  </div> */}
                  </div>
                  <div
                    style={{
                      marginTop: '20px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    商品保存狀況
                    <div
                      style={{
                        marginLeft: '20px',
                        position: 'relative',
                        width: '30%', // 調整容器的寬度為80%
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                      }}
                    >
                      <select
                        style={{
                          width: '100%',
                          padding: '5px',
                          border: 'none',
                          borderRadius: '5px',
                        }}
                        name="product_status" // 確保 name 屬性為 product_status
                        onChange={fieldChanged} // 將 fieldChanged 函式綁定到 onChange 事件
                        value={formData.product_status}
                      >
                        <option
                          placeholder="請輸入"
                          disabled
                          selected
                          hidden
                        ></option>
                        <option value="2">全新</option>
                        <option value="1">二手</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* 取消與儲存按鈕放在同一個容器內 */}
                <div className={Styles.buttonGroup}>
                  <button id="cancelButton" className={Styles.searchButton2}>
                    取消
                  </button>
                  <button
                    // onClick={postOutForm}
                    type="submit"
                    id="saveButton"
                    className={Styles.searchButton}
                    onClick={() => {
                      assureBtn()
                    }}
                  >
                    儲存並上架
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DefaultLayout>
    </>
  )
}

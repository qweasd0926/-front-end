import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '@/styles/lee-form.module.scss'
import validator from 'validator'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { JWT_REGISTER_POST } from '@/components/config'
import router from 'next/router'

export default function RegisterPage() {
  // 跳出對話框
  const MySwal = withReactContent(Swal)

  // 狀態為物件，屬性對應到表單的欄位
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    mobile: '',
    birthday: '',
    address: '',
    agree: false, // 勾選盒的checked屬性用的
  })

  // 記錄錯誤的物件
  const initError = {
    email: '',
    password: '',
    name: '',
    nickname: '',
    mobile: '',
    birthday: '',
    address: '',
    agree: '',
  }

  // 紀錄錯誤訊息用的狀態
  const [error, setError] = useState(initError)

  // 多欄位公用的事件處理函式
  // 多欄位公用的事件處理函式
  const handleFieldChange = (e) => {
    const targetValue =
      e.target.name === 'agree' ? e.target.checked : e.target.value
    setUser({ ...user, [e.target.name]: targetValue })
  }

  // 集中檢查的程式碼到這個函式中
  const checkError = () => {
    // 信號代表有沒有錯誤
    let hasError = false
    // 記錄錯誤的物件
    const newError = { ...initError }

    if (!user.name) {
      newError.name = '姓名為必填'
    }

    if (!user.email) {
      newError.email = 'Email為必填'
    }

    if (!user.password) {
      newError.password = '密碼為必填'
    }

    if (!user.agree) {
      newError.agree = '需要確認會員註冊條款'
    }

    // 以下為額外檢查
    // Email格式檢查
    if (!validator.isEmail(user.email)) {
      // 指定預設值語法，如果已經有上個錯誤訊息的話，不會再加入這個訊息
      // 同欄位多個檢查時才會使用
      newError.email ||= 'Email格式錯誤'
    }

    if (user.password.length < 6) {
      // 指定預設值語法，如果已經有上個錯誤訊息的話，不會再加入這個訊息
      // 同欄位多個檢查時才會使用
      newError.password ||= '密碼至少要6個字元'
    }

    if (user.password.length > 10) {
      newError.password ||= '密碼至多為10個字元'
    }

    // 迴圈檢查
    for (const property in newError) {
      if (newError[property]) {
        hasError = true
      }
    }

    return { hasError, newError }
  }

  // 表單送出的事件處理函式
  const handleSubmit = async (e) => {
    e.preventDefault()

    const { hasError, newError } = checkError()

    if (hasError) {
      setError(newError)
      return
    }

    setError(initError)

    const response = await fetch(JWT_REGISTER_POST, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // 將 user 物件轉換為 JSON 格式的字串
    })
    const data = await response.json()

    // 這裡作成功或失敗的判斷or跳轉…等等
    if (data.status === 'success') {
      MySwal.fire({
        title: '恭喜',
        text: '你已經成功註冊為會員，為您跳轉到登入頁面',
        icon: 'success',
      })

      // 跳轉到登入頁 用next的router
      router.push('/member/login')
    } else {
      MySwal.fire({
        title: '錯誤!',
        text: '註冊失敗',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
  }

  return (
    <>
      <Head>
        <title>會員註冊</title>
      </Head>
      <div className="container d-flex justify-content-center">
        <div className={`${styles.registerForm} p-3`}>
          <form name="form1" onSubmit={handleSubmit}>
            <div className="mb-3">
              <h3 className="text-center">會員註冊</h3>
            </div>
            <div className="mb-4">
              <label className="form-label ms-2" htmlFor="email">
                Email
              </label>
              <input
                className="form-control rounded"
                type="text"
                name="email"
                id="email"
                placeholder="輸入信箱"
                value={user.email}
                onChange={handleFieldChange}
              />
              <div className="error">{error.email}</div>
            </div>
            <div className="mb-4">
              <label className="form-label ms-2" htmlFor="password">
                密碼
              </label>
              <input
                className="form-control rounded"
                type="password"
                name="password"
                id="password"
                placeholder="輸入密碼"
                value={user.password}
                onChange={handleFieldChange}
              />
              <div className="error">{error.password}</div>
            </div>
            <div className="mb-4">
              <label className="form-label ms-2" htmlFor="name">
                姓名
              </label>
              <input
                className="form-control rounded"
                type="text"
                name="name"
                id="name"
                placeholder="輸入姓名"
                value={user.name}
                onChange={handleFieldChange}
              />
              <div className="error">{error.name}</div>
            </div>
            <div className="mb-4">
              <label className="form-label ms-2" htmlFor="nickname">
                暱稱
              </label>
              <input
                className="form-control rounded"
                type="text"
                name="nickname"
                id="nickname"
                placeholder="輸入暱稱"
                value={user.nickname}
                onChange={handleFieldChange}
              />
              <div className="error">{error.nickname}</div>
            </div>
            <div className="mb-4">
              <label className="form-label ms-2" htmlFor="mobile">
                手機號碼
              </label>
              <input
                className="form-control rounded"
                type="text"
                name="mobile"
                id="mobile"
                placeholder="輸入手機號碼"
                value={user.mobile}
                onChange={handleFieldChange}
              />
              <div className="error">{error.mobile}</div>
            </div>
            <div className="mb-4">
              <label className="form-label ms-2" htmlFor="birthday">
                生日
              </label>
              <input
                className="form-control rounded"
                type="date"
                name="birthday"
                id="birthday"
                value={user.birthday}
                onChange={handleFieldChange}
              />
              <div className="error">{error.birthday}</div>
            </div>
            <div className="mb-1">
              <label className="form-label ms-2" htmlFor="address">
                地址
              </label>
              <input
                className="form-control rounded"
                type="text"
                name="address"
                id="address"
                placeholder="輸入地址"
                value={user.address}
                onChange={handleFieldChange}
              />
              <div className="error">{error.address}</div>
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                name="agree"
                checked={user.agree}
                onChange={handleFieldChange}
              />{' '}
              我同意會員註冊條款
              <div className="error">{error.agree}</div>
            </div>
            <button type="submit" className="btn">
              <strong>註冊</strong>
            </button>
            <button
              type="button"
              className="btn ms-2"
              onClick={() => {
                setUser({
                  name: '陳桂林',
                  email: '12345678@gmail.com',
                  nickname: '桂林仔',
                  password: '123456',
                  mobile: '0912345678',
                  birthday: '1992-01-01',
                  address: '台北市大安區',
                  agree: true,
                })
                setError(initError)
              }}
            >
              一鍵輸入
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .error {
          color: red;
          height: 10px;
          position: relative;
          margin-left: 5px;
          margin-top: 6px;
          font-weight: 500;
        }
      `}</style>
    </>
  )
}

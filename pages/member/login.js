import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import styles from '@/styles/lee-form.module.scss'
import Link from 'next/link'
import GoogleLoginRedirect from '@/components/member/google-login-redirect'

export default function LoginPage() {
  const router = useRouter()
  const { auth, login, checkAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasChecked, setHasChecked] = useState(false)

  // 記錄錯誤訊息用的狀態
  const [error, setError] = useState({
    email: '',
    password: '',
  })
  // 註冊表單有另外一種更新表單狀態的寫法

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!hasChecked) {
        const isAuth = await checkAuth()
        if (isAuth) {
          // setTimeout(() => {
          //   router.push('/member/profile')
          // }, 1000)
        }
        setHasChecked(true)
      }
    }

    checkLoginStatus()
  }, [router, hasChecked])

  // 練習怎麼撈出登入的會員資料
  useEffect(() => {
    if (auth.userData) {
      console.log(
        auth.userData.id,
        auth.userData.email,
        auth.userData.nickname,
        auth.userData.google_uid
      )
    }
  }, [auth])

  // 表單送出的事件處理函式
  const onSubmit = async (e) => {
    // 取消表單送出的預設行為，要改用fetch/ajax來送出表單資料
    e.preventDefault()
    // e.target指的是表單元素

    // 這裡可以作自訂的表單檢查 --- START ---
    // 信號代表有沒有錯誤
    let hasError = false
    // 記錄錯誤的物件
    const newError = {
      email: '',
      password: '',
    }

    // if(user.email)指的是"有填寫"的情況，所以反之為"沒填寫"的情況
    if (!email) {
      newError.email = 'Email為必填'
      hasError = true
    }

    if (!password) {
      newError.password = '密碼為必填'
      hasError = true
    }

    if (password.length < 6) {
      // 指定預設值語法，如果已經有上個錯誤訊息的話，不會再加入這個訊息
      // 同欄位多個檢查時才會使用
      newError.password ||= '密碼至少要6個字元'
      hasError = true
    }

    if (password.length > 10) {
      newError.password ||= '密碼至多為10個字元'
      hasError = true
    }

    if (hasError) {
      setError(newError)
      return
      // 流程控制，有錯誤訊息則先跳出處理函式不繼續送到伺服器
    }
    // 這裡可以作自訂的表單檢查 --- END ---

    // 這裡之後送到伺服器(資料庫)中

    const result = await login(email, password)
    if (result) {
      alert('登入成功')
      // router.push('/member/profile')
    } else {
      alert('登入失敗')
    }
  }

  return (
    <>
      <Head>
        <title>歡迎登入</title>
      </Head>
      <div className="container d-flex justify-content-center">
        <div className={`p-3 round ${styles.myloginform}`}>
          {/* 用form標籤就不會用onClick */}
          <form name="form1" onSubmit={onSubmit}>
            <div className="mb-4">
              <h2 className="text-center">歡迎登入</h2>
            </div>
            <div className="mb-3">
              <div className="user-account">
                <label className="form-label ms-2" htmlFor="email">
                  <strong>email:{''}</strong>
                </label>
                <input
                  className="form-control rounded"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="輸入信箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.error}>{error.email}</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="user-password">
                <label className="form-label ms-2" htmlFor="password">
                  <strong>密碼:{''}</strong>
                </label>
                <input
                  className="form-control rounded"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.error}>{error.password}</div>
                <Link
                  href="/member/forgetpassword"
                  className="text-decoration-none"
                >
                  <p className="ms-2 mt-4">
                    <strong>忘記密碼？</strong>
                  </p>
                </Link>
              </div>
            </div>
            <div className="register mt-2 ms-1">
              <p>
                不是會員？
                <Link href="/member/signup" className="text-decoration-none">
                  <strong>
                    來去註冊
                    <i className="fa-brands fa-golang" />
                  </strong>
                </Link>
              </p>
            </div>
            <hr />
            <div className="login-with-line">
              <button type="submit" className="btn">
                <strong>登入</strong>
              </button>
            </div>
          </form>
          <div className="mt-3">
            <strong>你也可以</strong>
          </div>
          <hr />
          <GoogleLoginRedirect />
        </div>
      </div>
      {/*       <style jsx>
        {`
          .error {
            font-size: 12px;
            color: red;
          }
        `}
      </style> */}
    </>
  )
}

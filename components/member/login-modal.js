import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import style from '@/styles/lee-form.module.scss'
import GoogleLoginRedirect from '@/components/member/google-login-redirect'
import { Modal, Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function LoginPage({ show, onHide }) {
  const router = useRouter()
  const { auth, login, checkAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasChecked, setHasChecked] = useState(false)
  // 跳出對話框
  const MySwal = withReactContent(Swal)

  // 記錄錯誤訊息用的狀態
  const [error, setError] = useState({
    email: '',
    password: '',
  })

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
      MySwal.fire({
        title: '成功',
        text: '登入成功',
        icon: 'success',
      })
      // router.push('/member/profile')
    } else {
      MySwal.fire({
        title: '錯誤',
        text: '登入失敗',
        icon: 'error',
      })
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} className={`${style.myLoginModal}`}>
        {/* 使用從 props 中取得的 show 和 onHide */}
        <Modal.Header closeButton className={`${style.btnclose}`}>
          <h3>
            <strong>歡迎登入</strong>
          </h3>
        </Modal.Header>
        <Modal.Body className={`${style.body}`}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className={`${style.attr}`}>Email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className={`${style.error}`}>{error.email}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={`${style.attr}`}>密碼:</Form.Label>
              <Form.Control
                type="password"
                placeholder="輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className={`${style.error}`}>
                {error.password}
              </Form.Text>
            </Form.Group>
            <button type="submit" className={`btn ${style.loginbtn}`}>
              <strong>登入</strong>
            </button>
            <Link
              href="/member/forgetpassword"
              className="text-decoration-none"
            >
              <p className="ms-1 mt-4">
                <strong>忘記密碼？</strong>
              </p>
            </Link>
          </Form>
          <div className="mt-3 mb-3">或者你也可以使用</div>
          <GoogleLoginRedirect />
        </Modal.Body>
      </Modal>
    </>
  )
}

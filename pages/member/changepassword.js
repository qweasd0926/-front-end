import { useState, useEffect } from 'react'
import styles from '@/styles/lee-form.module.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import { JWT_UPDATE_PASSWORD_PUT } from '@/components/config'
import DefaultLayout from '@/components/common/default-layout'
import Head from 'next/head'

export default function ChangePasswordPage() {
  const MySwal = withReactContent(Swal)
  const { auth, checkAuth, logout } = useAuth()
  const router = useRouter()

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const initError = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  const [error, setError] = useState(initError)

  const handleFieldChange = (e) => {
    const value = e.target.value != null ? e.target.value : ''
    setPasswords({ ...passwords, [e.target.name]: value })
  }

  const checkError = () => {
    let hasError = false
    const newError = { ...initError }

    if (!passwords.oldPassword) {
      newError.oldPassword = '舊密碼為必填'
      hasError = true
    }

    if (!passwords.newPassword) {
      newError.newPassword = '新密碼為必填'
      hasError = true
    }

    if (!passwords.confirmPassword) {
      newError.confirmPassword = '確認新密碼為必填'
      hasError = true
    } else {
      if (passwords.newPassword !== passwords.confirmPassword) {
        newError.confirmPassword = '新密碼和確認密碼不匹配'
        hasError = true
      }
    }

    if (hasError) {
      setError(newError)
      return true
    }

    setError(initError)
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (checkError()) {
      return
    }

    // 確認用戶的認證狀態
    await checkAuth()

    // 從 auth 物件中獲取用戶的 ID
    const userId = auth.userData.id

    // 將用戶的 ID 和 "/password" 添加到請求的 URL 中
    const response = await fetch(
      `${JWT_UPDATE_PASSWORD_PUT}/${userId}/password`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: passwords.oldPassword,
          new: passwords.newPassword,
        }),
        credentials: 'include', // 將 cookies 包含在請求中
      }
    )

    const data = await response.json()

    if (data.status === 'success') {
      // 用戶登出
      logout()
      MySwal.fire({
        title: '成功',
        text: '你的密碼已經成功更新，請重新登入',
        icon: 'success',
      })

      router.push('/')
    } else {
      setError({ oldPassword: data.message })
      MySwal.fire({
        title: '失敗',
        text: '更改密碼失敗',
        icon: 'error',
      })
    }
  }

  return (
    <>
      <Head>
        <title>更改密碼 | DEAL-2ND HAND SHOP</title>
      </Head>
      <DefaultLayout>
        <div className="container d-flex justify-content-center mt-5 mb-3">
          <div className={`p-3 round ${styles.myloginform}`}>
            <form name="form1" onSubmit={handleSubmit}>
              <div className="mb-4">
                <h2 className="text-center">
                  <strong>更改密碼</strong>
                </h2>
              </div>
              <div className="mb-3">
                <label className="form-label ms-2" htmlFor="oldPassword">
                  <strong>舊密碼:</strong>
                </label>
                <input
                  className="form-control rounded"
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="輸入舊密碼"
                  value={passwords.oldPassword}
                  onChange={handleFieldChange}
                />
                <div className={styles.error}>{error.oldPassword}</div>
              </div>
              <div className="mb-3">
                <label className="form-label ms-2" htmlFor="newPassword">
                  <strong>新密碼:</strong>
                </label>
                <input
                  className="form-control rounded"
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="輸入新密碼"
                  value={passwords.newPassword}
                  onChange={handleFieldChange}
                />
                <div className={styles.error}>{error.newPassword}</div>
              </div>
              <div className="mb-3">
                <label className="form-label ms-2" htmlFor="confirmPassword">
                  <strong>確認新密碼:</strong>
                </label>
                <input
                  className="form-control rounded"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="再次輸入新密碼"
                  value={passwords.confirmPassword}
                  onChange={handleFieldChange}
                />
                <div className={styles.error}>{error.confirmPassword}</div>
              </div>
              <div className="login-with-line">
                <button type="submit" className="btn">
                  <strong>更改密碼</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>{' '}
    </>
  )
}

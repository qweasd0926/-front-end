import { useState, useEffect } from 'react'
import styles from '@/styles/lee-form.module.scss'
import { PASSWORD_OTP_POST } from '@/components/config'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/common/default-layout'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
import Head from 'next/head'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (isLoading) {
      setProgress(60)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(100)
      }, 100)
    }
  }, [isLoading])

  const onSubmit = (e) => {
    e.preventDefault()
    toast.success('密碼重設請求已發送到您的電子郵件，請查收')

    // 在這裡處理密碼重設的請求
    const postOtp = async () => {
      const res = await fetch(PASSWORD_OTP_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      router.push('/member/resetpassword') // 跳轉到重設密碼頁面
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        // 如果接收到資料，則跳轉到重設密碼頁面
      }
    }

    postOtp() // 呼叫 postOtp 函數

    // 例如，你可以發送一個請求到你的後端API，並將email作為參數
    console.log(`Password reset request for ${email} has been sent.`)
  }

  const display = (
    <>
      <Toaster />
      <Head>
        <title>忘記密碼 | DEAL-2ND HAND SHOP</title>
      </Head>
      <DefaultLayout pageName="home">
        <div className="container d-flex justify-content-center mt-5 mb-3">
          <div className={`p-3 round ${styles.myloginform}`}>
            <form name="form1" onSubmit={onSubmit}>
              <div className="mb-4">
                <h2 className="text-center">
                  <strong>忘記密碼</strong>
                </h2>
              </div>
              <div className="mb-3">
                <label className="form-label ms-2" htmlFor="email">
                  <strong>電子郵件地址:</strong>
                </label>
                <input
                  className="form-control rounded"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="輸入你的電子郵件地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className={styles.error}></div>{' '}
                {/* 如果有錯誤訊息，可以在這裡顯示 */}
              </div>
              <div className="login-with-line">
                <button type="submit" className="btn">
                  <strong>提交</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? <Loader /> : display}
    </>
  )
}

import React from 'react'
import useFirebase from '@/hooks/use-firebase'
import { useRef, useEffect, useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { GOOGLE_LOGIN_POST } from '@/components/config'
import toast, { Toaster } from 'react-hot-toast'
import GoogleLogo from '@/components/icons/google-logo'
import style from '@/styles/lee-form.module.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function GoogleLoginRedirect() {
  const { auth, checkAuth, parseJwt, setAuth, initUserData } = useAuth()
  const MySwal = withReactContent(Swal)

  const { loginGoogleRedirect, initApp, loginGoogle } = useFirebase()
  const isMounted = useRef(true)

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    // Store the unsubscribe function
    const unsubscribe = initApp(callbackGoogleLoginRedirect)

    return () => {
      isMounted.current = false

      // Call the unsubscribe function when the component unmounts
      unsubscribe()
    }
  }, [])

  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return

    // 向伺服器進行登入動作
    const response = await fetch(GOOGLE_LOGIN_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(providerData),
      credentials: 'include',
    })

    const res = await response.json()
    console.log(res.data)

    if (res.status === 'success') {
      // 從JWT存取令牌中解析出會員資料
      // 注意JWT存取令牌中只有id, username, google_uid, line_uid在登入時可以得到
      const jwtUser = parseJwt(res.data.accessToken)
      console.log(jwtUser)

      const response = await fetch(
        `http://localhost:3003/api/users/${jwtUser.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      )
      const res1 = await response.json()
      console.log(res1)
      if (res1.status === 'success') {
        // 只需要initUserData中的定義屬性值，詳見use-auth勾子
        const dbUser = res1.data.user
        const userData = { ...initUserData }

        for (const key in userData) {
          if (Object.hasOwn(dbUser, key)) {
            userData[key] = dbUser[key] || ''
          }
        }

        // 設定到全域狀態中
        if (isMounted.current) {
          setAuth({
            isAuth: true,
            userData,
          })
        }
        MySwal.fire({
          title: '成功',
          text: '登入成功',
          icon: 'success',
        })
      } else {
        MySwal.fire({
          title: '錯誤',
          text: '登入後無法獲得會員資料',
          icon: 'error',
        })
        // 這裡可以讓會員登出，因為這也算登入失敗，有可能會造成資料不統一
      }
    } else {
      MySwal.fire({
        title: '錯誤',
        text: '登入失敗',
        icon: 'error',
      })
    }
  }

  // 處理檢查登入狀態
  const handleCheckAuth = async () => {
    const res = await checkAuth()

    console.log(res)

    if (res) {
      toast.success('已登入會員')
    } else {
      toast.error(`非會員身份`)
    }
  }

  /*
  // 處理登出
  const handleLogout = async () => {
    // firebase logout(注意，這並不會登出google帳號，是登出firebase的帳號)
    logoutFirebase()

    const res = await logout()
    console.log(res)

    // 成功登出後，回復初始會員狀態
    if (res) {
      toast.success('已成功登出')

      setAuth({
        isAuth: false,
        userData: initUserData,
      })
    } else {
      toast.error(`登出失敗`)
    }
  }
  */

  return (
    <>
      <button
        onClick={() => loginGoogle()}
        className={`${style.googleLoginButton} mb-3`}
      >
        <GoogleLogo /> Google登入
      </button>
      <br />
      {/* <button onClick={handleCheckAuth}>向伺服器檢查登入狀態</button>
      <p>會員狀態:{auth.isAuth ? '已登入' : '未登入'}</p>
      <Toaster /> */}
    </>
  )
}

import React from 'react'
import { useAuth } from '@/context/auth-context'
import useFirebase from '@/hooks/use-firebase'
import toast from 'react-hot-toast'
import style from '@/styles/lee-form.module.scss'
import { RiLogoutBoxRFill } from 'react-icons/ri'

export default function LogoutButton() {
  const { logout, setAuth, initUserData } = useAuth()
  const { logoutFirebase } = useFirebase()

  const handleLogout = async (e) => {
    e.preventDefault() // 防止頁面跳轉

    // firebase logout
    logoutFirebase()

    const res = await logout()

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

  return (
    <button
      onClick={handleLogout}
      style={{
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: '0',
        display: 'flex', // 使用 flex 佈局
        width: '100%', // 寬度 100%
        justifyContent: 'flex-start', // 將內容靠左對齊
        alignItems: 'center', // 將內容垂直置中對齊
      }}
    >
      <RiLogoutBoxRFill className={(style.fs20, style.mr2)} />
      <span
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        &nbsp;<strong>登出</strong>
      </span>
    </button>
  )
}

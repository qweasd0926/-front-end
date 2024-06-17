import { createContext, useContext, useEffect, useState } from 'react'
// import jwt from 'jsonwebtoken'
import { JWT_LOGIN_POST } from '@/components/config'
import { CHECK_AUTH_ROUTE } from '@/components/config'
import { JWT_LOGOUT_POST } from '@/components/config'
import { useRouter } from 'next/router'

// 1. 建立一個 Context
const AuthContext = createContext(null)

export const initUserData = {
  // 代表會員的資料
  id: 0,
  email: '',
  nickname: '',
  google_uid: '',
}

// const authStorageKey = 'lee-auth'

// 2. 建立一個 Context Provider元件
// 提供給全站最上層元件(_app.js)使用，集中這個context要用的狀態在裡面管理
export function AuthContextProvider({ children }) {
  // 路由器
  const router = useRouter()

  // 會員的初始狀態
  const initAuth = {
    isAuth: false, // 代表沒有登入
    userData: initUserData,
  }

  // 共享狀態
  const [auth, setAuth] = useState(initAuth)

  const checkAuth = async () => {
    const response = await fetch(CHECK_AUTH_ROUTE, {
      method: 'GET',
      credentials: 'include',
    })
    if (response && response.ok) {
      const result = await response.json()
      if (result && result.status === 'success') {
        const user = result.data && result.data.user
        if (user) {
          setAuth({
            isAuth: true,
            userData: {
              id: user.id,
              email: user.email,
              nickname: user.nickname,
              google_uid: user.google_uid,
            },
          })
          return true
        }
      }
    }
  }

  const login = async (email, password) => {
    const response = await fetch(JWT_LOGIN_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // 需要添加這行以便在跨域請求中發送cookies
    })

    if (!response.ok) return false

    const result = await response.json()

    if (result.status !== 'success') return false

    /* 不需要解析 token，因為 token 會在每次請求時自動帶入
    這是localStorage的方式

    const decoded = jwt.decode(result.data.accessToken)

    const authData = {
      id: decoded.id,
      email: decoded.email,
      nickname: decoded.nickname,
      token: result.data.accessToken,
    }
    // 把 authData 存到 localStorage
    localStorage.setItem(authStorageKey, JSON.stringify(authData))

    setAuth(authData)
    */
    // 登入成功後，更新 auth 狀態
    await checkAuth()

    return true
  }

  const logout = async () => {
    // 登出時，移除 localStorage 的 authData
    // 不需要從localStorage中刪除access token
    // localStorage.removeItem(authStorageKey)

    const response = await fetch(JWT_LOGOUT_POST, {
      method: 'POST',
      credentials: 'include', // 需要添加這行以便在跨域請求中發送cookies
    })

    if (response.ok) {
      const data = await response.json()
      if (data.status === 'success') {
        setAuth({})
        return true
      }
    }

    return false
  }

  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }
  /* 這是localStorage的方式
  // 每次重新整理頁面時，檢查 localStorage 有沒有 authData
  useEffect(() => {
    const str = localStorage.getItem(authStorageKey)
    if (str) {
      try {
        const localState = JSON.parse(str)
        setAuth(localState)
      } catch (ex) {
        console.log(ex)
      }
    }
  }, [])
  */

  // 每次重新整理頁面時，檢查用戶是否已經登入
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkAuth()
    }
  }, [router.isReady, auth.isAuth])

  return (
    // 使用value屬性傳遞狀態
    <AuthContext.Provider
      value={{ auth, login, logout, checkAuth, parseJwt, setAuth }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
// 另一種寫法
// export const useAuth = () => useContext(AuthContext)

export default AuthContext

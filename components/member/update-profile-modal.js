import React from 'react'
import Head from 'next/head'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import styles from '@/styles/lee-form.module.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { CHECK_AUTH_ROUTE } from '@/components/config'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import { JWT_UPDATE_USER_POST } from '@/components/config'

export default function UpdateProfileModal({
  isOpen,
  onRequestClose,
  userData,
  onUpdated,
}) {
  const MySwal = withReactContent(Swal)
  const { auth, checkAuth } = useAuth()
  const router = useRouter()

  const [user, setUser] = useState({
    name: '',
    mobile: '',
    address: '',
  })

  const initError = {
    name: '',
    mobile: '',
    address: '',
  }

  const [error, setError] = useState(initError)

  const handleFieldChange = (e) => {
    const value = e.target.value != null ? e.target.value : ''
    setUser({ ...user, [e.target.name]: value })
  }

  const fetchUserData = async () => {
    const response = await fetch(CHECK_AUTH_ROUTE, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await response.json()

    if (data.status === 'success') {
      const { name = '', mobile = '', address = '' } = data.data.user
      setUser({ name, mobile: mobile, address })
    }
  }

  const checkError = () => {
    let hasError = false
    const newError = { ...initError }

    if (!user.name) {
      newError.name = '姓名為必填'
      hasError = true
    }

    if (!user.mobile) {
      newError.mobile = '手機號碼為必填'
      hasError = true
    } else {
      if (user.mobile.length !== 10) {
        newError.mobile = '手機號碼必須為 10 位數'
        hasError = true
      }
    }

    if (!user.address) {
      newError.address = '地址為必填'
      hasError = true
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

    // 將用戶的 ID 和 "/profile" 添加到請求的 URL 中
    const response = await fetch(`${JWT_UPDATE_USER_POST}/${userId}/profile`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include', // 將 cookies 包含在請求中
    })

    const data = await response.json()

    console.log(data)

    if (data.status === 'success') {
      MySwal.fire({
        title: '成功',
        text: '你已經成功更新會員資料',
        icon: 'success',
      })
      onRequestClose() // 關閉模態框
      onUpdated() // 呼叫 onUpdated 函數

      router.push('/member/profile')
    } else {
      MySwal.fire({
        title: '錯誤!',
        text: '更新失敗',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          width: '450px',
          height: '460px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          padding: '0px',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#FFFFFF', // 設置淺灰色的背景
          border: '2px solid #8e2626',
        },
      }}
    >
      <Head>
        <title>修改資料</title>
      </Head>
      <div className={`${styles.updateModal} p-3`}>
        <form name="form1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3 className="text-center">修改資料</h3>
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
              value={user.name}
              onChange={handleFieldChange}
            />
            <div className="error">{error.name}</div>
          </div>
          <div className="mb-4">
            <label className="form-label ms-2" htmlFor="mobile">
              手機號碼
            </label>
            <div className="input-group">
              <input
                className="form-control rounded"
                type="text"
                name="mobile"
                id="mobile"
                value={user.mobile}
                onChange={handleFieldChange}
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="error">{error.mobile}</div>
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
              value={user.address}
              onChange={handleFieldChange}
            />
            <div className="error">{error.address}</div>
          </div>
          <button type="submit" className="btn mt-3">
            <strong>確認修改</strong>
          </button>
        </form>
      </div>

      <style jsx>{`
        .error {
          color: red;
          height: 10px;
          position: relative,
          margin-left: 5px,
          margin-top: 6px,
          font-weight: 500,
        }
      `}</style>
    </Modal>
  )
}

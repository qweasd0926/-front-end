import React from 'react'
import Modal from 'react-modal'
import styles from '@/styles/lee-form.module.scss'
import { useState, useEffect } from 'react'
import { JWT_UPDATE_USER_POST } from '@/components/config'
import MySwal from 'sweetalert2'

export default function GoogleFillModal({
  isOpen,
  onRequestClose,
  userData,
  onSubmitted,
}) {
  const [user, setUser] = useState(userData) // 使用 useState 來管理 userData 的狀態
  const [isSubmitted, setIsSubmitted] = useState(false) // 新的狀態變數來追蹤表單是否已經被提交

  const handleFieldChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  //
  const handleSubmit = async (e) => {
    e.preventDefault()
    // 在這裡處理提交表單的邏輯

    // 檢查所有的欄位是否都已經填寫
    if (!user.nickname || !user.mobile || !user.birthday || !user.address) {
      alert('請填寫所有的欄位')
      return
    }

    // 在這裡處理提交表單的邏輯
    const userId = userData.id

    // 將用戶的 ID 和 "/profile" 添加到請求的 URL 中
    const response = await fetch(`${JWT_UPDATE_USER_POST}/${userId}/profile`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        nickname: user.nickname,
        mobile: user.mobile,
        birthday: user.birthday,
        address: user.address,
      }), // 合併 userData 和 user
      credentials: 'include', // 將 cookies 包含在請求中
    })

    const data = await response.json()

    console.log(data)

    if (data.status === 'success') {
      MySwal.fire({
        title: '成功',
        text: '你已經成功更新會員資料',
        icon: 'success',
      }).then(() => {
        window.location.reload()
      })
    } else {
      MySwal.fire({
        title: '錯誤!',
        text: '更新失敗',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }

    setIsSubmitted(true) // 當表單被提交時，設置 isSubmitted 為 true
  }

  useEffect(() => {
    if (isSubmitted) {
      onSubmitted() // 當表單被提交時，調用 onSubmitted 函數
    }
  }, [isSubmitted, onSubmitted])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          width: '490px',
          height: '540px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#F0F0F0', // 設置淺灰色的背景
        },
      }}
    >
      <div className={`${styles.googleFillModal} p-3`}>
        <form name="form1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3 className="text-center">完成會員資料</h3>
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
          </div>
          <button type="submit" className="btn mt-3">
            <strong>送出</strong>
          </button>
        </form>
      </div>
    </Modal>
  )
}

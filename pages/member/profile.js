import React from 'react'
import Image from 'next/image'
import styles from '@/styles/lee-form.module.scss'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { CHECK_AUTH_ROUTE } from '@/components/config'
import { UPLOAD_AVATAR_ONE_POST } from '@/components/config'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/router'
import GoogleFillModal from '@/components/member/google-fill-modal'
import DefaultLayout from '@/components/common/default-layout'
import UpdateProfileModal from '@/components/member/update-profile-modal'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Head from 'next/head'

export default function Profile() {
  const { checkAuth } = useAuth()
  const router = useRouter()
  const [isLoading, setISLoading] = useState(true)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false) // new state variable for controlling the modal
  const MySwal = withReactContent(Swal)

  // 如果使用者沒有登入，將他們重定向到登入頁面
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isAuth = await checkAuth()
      if (!isAuth) {
        // 如果使用者沒有登入，將他們重定向到首頁
        router.push('/')
        MySwal.fire({
          icon: 'error',
          title: '請先登入，為您跳轉到首頁',
          showConfirmButton: false,
        })
      }
      setISLoading(false)
    }
    checkLoginStatus()
  }, [router])

  // 使用 useState 建立 user 和 file 的狀態
  const [user, setUser] = useState({
    name: '',
    nickname: '',
    email: '',
    mobile: '',
    birthday: '',
    photo: 'default.png',
    address: '',
    carbon_points_got: 0,
    carbon_points_have: 0,
    level_name: 'level_0',
    level_desc: '等待任務中',
  })
  const [file, setFile] = useState(null)

  // 使用 useRef 建立一個參照到 input 元件的 ref
  const inputRef = useRef(null)

  // 創建一個新的狀態變數來控制模態框是否打開
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 定義一個異步函數來從後端獲取使用者資料
  const fetchUserData = async () => {
    const response = await fetch(CHECK_AUTH_ROUTE, {
      method: 'GET',
      credentials: 'include',
    })
    const result = await response.json()

    if (result.status === 'success') {
      result.data.user.birthday = new Date(result.data.user.birthday)
        .toISOString()
        .split('T')[0]

      // 更新 user 和 file 的狀態
      setUser(result.data.user)
      setFile(result.data.user.photo)

      // 如果使用者的手機號碼未填寫或者不是 10 位數，則打開模態框
      if (!result.data.user.mobile || result.data.user.mobile.length !== 10) {
        setIsModalOpen(true)
      }
    }
  }

  // 使用 useEffect 在組件掛載時獲取使用者資料
  useEffect(() => {
    fetchUserData()
  }, [])

  // 定義一個函數來模擬點擊 input 元件
  const handleClick = () => {
    inputRef.current.click()
  }
  // 定義一個函數來處理檔案變更事件
  const handleFileChange = (e) => {
    handleUpload(e.target.files[0])
  }

  // 定義一個異步函數來處理檔案上傳
  const handleUpload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch(UPLOAD_AVATAR_ONE_POST, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const result = await response.json()

      // 如果上傳成功，則重新獲取使用者資料
      if (result.status) {
        fetchUserData()
        toast.success('成功更新大頭貼照')
      }
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  if (isLoading) {
    return <div>正在努力加載資訊中...</div>
  }

  // 更改密碼按鈕點擊事件
  const changepassword = () => {
    router.push('/member/changepassword')
  }

  // 我的賣場介紹按鈕點擊事件
  const handleClickStore = () => {
    const storeId = user.id
    router.push(`/member/store/${storeId}`)
  }

  // 我的訂單按鈕點擊事件
  const handleMyOrder = () => {
    router.push('/buyer/order-list')
  }

  const handleMyBarter = () => {
    router.push('/member/barter')
  }

  const handleMyShop = () => {
    router.push('/Maket/index-maket')
  }

  return (
    <>
      <Head>
        <title>會員中心 | DEAL-2ND HAND SHOP</title>
      </Head>
      <DefaultLayout>
        <section className={`${styles.profilesStyle}`}>
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className={`card mb-4 ${styles.card}`}>
                  <div className="card-body text-center">
                    <Image
                      src={
                        file
                          ? `http://localhost:3003/avatar/${file}?timestamp=${new Date().getTime()}`
                          : '/default.png'
                      }
                      alt="avatar"
                      width={175}
                      height={185}
                      className="rounded-circle mt-2 secondary"
                    />
                    <h5 className="my-4">{user.nickname}</h5>
                    <input
                      type="file"
                      ref={inputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }} // 隱藏 input 元件
                    />
                    <button
                      type="button"
                      className={`mb-3 ${styles.photobtn}`}
                      onClick={handleClick}
                    >
                      上傳大頭貼照
                    </button>
                    <button
                      type="button"
                      className={`mb-3 ms-3 ${styles.photobtn}`}
                      onClick={handleClickStore}
                    >
                      我的賣場介紹
                    </button>
                  </div>
                </div>
                <div
                  className={`card mb-lg-0r text-center mb-4 ${styles.card}`}
                >
                  <div className="card-body p-0 text-center">
                    <ul className="list-group list-group-flush rounded-3">
                      {/* <Link href="/member/update-profile"> */}
                      <li className={`list-group-item ${styles.listGroupItem}`}>
                        <button
                          onClick={() => setIsUpdateModalOpen(true)}
                          className={`${styles.libtn}`}
                        >
                          修改個人檔案
                        </button>
                      </li>
                      {/* </Link> */}
                      <UpdateProfileModal
                        isOpen={isUpdateModalOpen}
                        onRequestClose={() => setIsUpdateModalOpen(false)}
                        userData={user}
                        onUpdated={fetchUserData} // 將 fetchUserData 函數傳遞給 onUpdated prop
                      />
                      <li className={`list-group-item ${styles.listGroupItem}`}>
                        <button
                          onClick={changepassword}
                          className={`${styles.libtn}`}
                        >
                          更改密碼
                        </button>
                      </li>
                      <li className={`list-group-item ${styles.listGroupItem}`}>
                        <button
                          onClick={handleMyShop}
                          className={`${styles.libtn}`}
                        >
                          我的賣場
                        </button>
                      </li>
                      <li className={`list-group-item ${styles.listGroupItem}`}>
                        <button
                          onClick={handleMyOrder}
                          className={`${styles.libtn}`}
                        >
                          我的訂單
                        </button>
                      </li>
                      <li className={`list-group-item ${styles.listGroupItem}`}>
                        <button
                          onClick={handleMyBarter}
                          className={`${styles.libtn}`}
                        >
                          我的以物易物
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className={`card ${styles.card}`}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <p className={`${styles.title}`}>我的個人檔案</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">真實姓名</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">暱稱</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.nickname}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">手機</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.mobile}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">生日</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.birthday}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">地址</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.address}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">累積小碳點</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {user.carbon_points_got}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">持有小碳點</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {user.carbon_points_have}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">會員等級</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.level_name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">等級描述</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{user.level_desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <GoogleFillModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          userData={user}
          onSubmitted={() => {
            setIsModalOpen(false)
          }}
        />
      </DefaultLayout>
      <Toaster />
    </>
  )
}

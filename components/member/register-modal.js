import { Modal, Form } from 'react-bootstrap'
import { useState } from 'react'
import validator from 'validator'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { JWT_REGISTER_POST } from '@/components/config'
import router from 'next/router'
import style from '@/styles/lee-form.module.scss'

export default function RegisterModal({ show, onHide }) {
  // 跳出對話框
  const MySwal = withReactContent(Swal)

  // 狀態為物件，屬性對應到表單的欄位
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    mobile: '',
    birthday: '',
    address: '',
    agree: false, // 勾選盒的checked屬性用的
  })

  // 記錄錯誤的物件
  const initError = {
    email: '',
    password: '',
    name: '',
    nickname: '',
    mobile: '',
    birthday: '',
    address: '',
    agree: '',
  }

  // 紀錄錯誤訊息用的狀態
  const [error, setError] = useState(initError)

  // 多欄位公用的事件處理函式
  const handleFieldChange = (e) => {
    const targetValue =
      e.target.name === 'agree' ? e.target.checked : e.target.value
    setUser({ ...user, [e.target.name]: targetValue })
  }

  // 集中檢查的程式碼到這個函式中
  const checkError = () => {
    // 信號代表有沒有錯誤
    let hasError = false
    // 記錄錯誤的物件
    const newError = { ...initError }

    if (!user.name) {
      newError.name = '姓名為必填'
    }

    if (!user.email) {
      newError.email = 'Email為必填'
    }

    if (!user.password) {
      newError.password = '密碼為必填'
    }

    if (!user.agree) {
      newError.agree = '需要確認會員註冊條款'
    }

    // 以下為額外檢查
    // Email格式檢查
    if (!validator.isEmail(user.email)) {
      // 指定預設值語法，如果已經有上個錯誤訊息的話，不會再加入這個訊息
      // 同欄位多個檢查時才會使用
      newError.email ||= 'Email格式錯誤'
    }

    if (user.password.length < 6) {
      // 指定預設值語法，如果已經有上個錯誤訊息的話，不會再加入這個訊息
      // 同欄位多個檢查時才會使用
      newError.password ||= '密碼至少要6個字元'
    }

    if (user.password.length > 10) {
      newError.password ||= '密碼至多為10個字元'
    }

    // 迴圈檢查
    for (const property in newError) {
      if (newError[property]) {
        hasError = true
      }
    }

    return { hasError, newError }
  }

  // 表單送出的事件處理函式
  const handleSubmit = async (e) => {
    e.preventDefault()

    const { hasError, newError } = checkError()

    if (hasError) {
      setError(newError)
      return
    }

    setError(initError)

    const response = await fetch(JWT_REGISTER_POST, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), // 將 user 物件轉換為 JSON 格式的字串
    })
    const data = await response.json()

    // 這裡作成功或失敗的判斷or跳轉…等等
    if (data.status === 'success') {
      MySwal.fire({
        title: '成功',
        text: '你已經成功註冊為會員，現在可以登入了',
        icon: 'success',
      }).then(() => {
        onHide() // 關閉模態框
      })
      router.push('/')
    } else {
      MySwal.fire({
        title: '錯誤!',
        text: '註冊失敗',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} className={`${style.registerModal}`}>
        <Modal.Header closeButton className={`${style.btnclose}`}>
          <h3>
            <strong>會員註冊</strong>
          </h3>
        </Modal.Header>
        <Modal.Body className={`${style.body}`}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入信箱"
                value={user.email}
                onChange={handleFieldChange}
                name="email"
              />
              <Form.Text className={`${style.error}`}>{error.email}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>密碼:</Form.Label>
              <Form.Control
                type="password"
                placeholder="輸入密碼"
                value={user.password}
                onChange={handleFieldChange}
                name="password"
              />
              <Form.Text className={`${style.error}`}>
                {error.password}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>姓名:</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入姓名"
                value={user.name}
                onChange={handleFieldChange}
                name="name"
              />
              <Form.Text className={`${style.error}`}>{error.name}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>暱稱:</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入暱稱"
                value={user.nickname}
                onChange={handleFieldChange}
                name="nickname"
              />
              <Form.Text className={`${style.error}`}>
                {error.nickname}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>手機號碼:</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入手機號碼"
                value={user.mobile}
                onChange={handleFieldChange}
                name="mobile"
              />
              <Form.Text className={`${style.error}`}>{error.mobile}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>生日:</Form.Label>
              <Form.Control
                type="date"
                value={user.birthday}
                onChange={handleFieldChange}
                name="birthday"
              />
              <Form.Text className={`${style.error}`}>
                {error.birthday}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>地址:</Form.Label>
              <Form.Control
                type="text"
                placeholder="輸入地址"
                value={user.address}
                onChange={handleFieldChange}
                name="address"
              />
              <Form.Text className={`${style.error}`}>
                {error.address}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="我同意會員註冊條款"
                checked={user.agree}
                onChange={handleFieldChange}
                name="agree"
              />
              <Form.Text className={`${style.error}`}>{error.agree}</Form.Text>
            </Form.Group>

            <button type="submit" className={`btn ${style.resbtn}`}>
              <strong>註冊</strong>
            </button>
            <button
              type="button"
              className={`btn ms-3 ${style.resbtn}`}
              onClick={() => {
                setUser({
                  name: '陳桂林',
                  email: '12345678@gmail.com',
                  nickname: 'gray123',
                  password: '123456',
                  mobile: '0912345678',
                  birthday: '1992-01-01',
                  address: '台北市大安區',
                  agree: true,
                })
                setError(initError)
              }}
            >
              一鍵輸入
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

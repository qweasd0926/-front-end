import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LogoutButton from '@/components/member/logout-button'
import LoginPage from '@/components/member/login-modal' // 引入 LoginPage 組件
import { useState, useEffect, use } from 'react'
import { useAuth } from '@/context/auth-context'
import Spinner from 'react-bootstrap/Spinner'
import RegisterModal from './register-modal'

function BasicExample() {
  const [showLogin, setShowLogin] = useState(false) // 新增狀態變數來控制 LoginPage 的顯示和隱藏
  const [isLoading, setIsLoading] = useState(false) // 新增一個狀態來追蹤是否正在檢查認證狀態
  const { checkAuth, auth } = useAuth()

  // 關閉登入視窗
  const handleLoginClose = () => {
    if (!isLoading) {
      setShowLogin(false)
    }
  }

  // 點擊登入按鈕
  const handleLoginClick = () => {
    if (!auth.isAuth) {
      // 如果用戶未登入，則顯示登入表單
      setShowLogin(true)
    }
  }

  // 登入表單提交
  const handleLoginSubmit = async () => {
    setIsLoading(true) // 開始檢查認證狀態
    await checkAuth()
    setIsLoading(false) // 結束檢查認證狀態
    if (auth.isAuth) {
      setShowLogin(false) // 如果已經登入，則關閉模態框
    }
  }

  useEffect(() => {
    if (auth.isAuth) {
      setShowLogin(false) // 如果已經登入，則關閉模態框
      checkAuth()
    }
  }, [auth.isAuth]) // 監聽 auth.isAuth 的變化

  const [showRegister, setShowRegister] = useState(false) // 新增狀態變數來控制 RegisterModal 的顯示和隱藏

  // 關閉註冊視窗
  const handleRegisterClose = () => setShowRegister(false)

  // 點擊註冊按鈕
  const handleRegisterClick = () => setShowRegister(true)

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LogoutButton>登出</LogoutButton>
            <Nav.Link href="#login" onClick={handleLoginClick}>
              {auth.isAuth ? auth.userData.nickname : '登入'}
            </Nav.Link>
            <Nav.Link href="#register" onClick={handleRegisterClick}>
              註冊
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {isLoading && <Spinner animation="border" />}{' '}
        {/* 如果正在檢查認證狀態，則顯示加載指示器 */}
      </Container>
      <LoginPage
        show={showLogin}
        onHide={handleLoginClose}
        onSubmit={handleLoginSubmit}
      />
      <RegisterModal show={showRegister} onHide={handleRegisterClose} />
    </Navbar>
  )
}

export default BasicExample

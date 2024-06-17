import React, { useState } from 'react'
import { useRouter } from 'next/router'

const ChatHome = ({ socket }) => {
  const router = useRouter()
  const [userName, setUserName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('userName', userName)
    socket.emit('newUser', { userName, socketID: socket.id })

    router.push('/member/chat')
  }
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">登入聊天</h2>
      <label htmlFor="username">使用者名稱</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta">登入</button>
    </form>
  )
}

export default ChatHome

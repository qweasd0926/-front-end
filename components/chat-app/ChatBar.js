import React, { useState, useEffect } from 'react'
import style from '@/styles/lee-form.module.scss'
import { useSocket } from '@/context/socket-context'

const ChatBar = () => {
  const { socket } = useSocket()
  const [users, setUsers] = useState([])
  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data))
  }, [socket, users])

  return (
    <div className={`${style.chat__sidebar}`}>
      <h2>聊天室</h2>

      <div>
        <h4 className={`${style.chat__header}`}>線上用戶</h4>
        <div className={`${style.chat__users}`}>
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatBar

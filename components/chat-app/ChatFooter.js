import React, { useState } from 'react'
import style from '@/styles/lee-form.module.scss'
import { useSocket } from '@/context/socket-context'
import { CREATE_MESSAGE_POST } from '@/components/config'

const ChatFooter = ({ userName, chatData, setChatData }) => {
  const { socket, connectionState } = useSocket()
  const [message, setMessage] = useState('')

  const handleTyping = () => socket.emit('typing', `${userName} 正在输入`) // 使用userName來判斷

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (message.trim() && userName) {
      const connectionState = JSON.parse(
        localStorage.getItem('connectionState')
      )
      const newMessage = {
        text: message,
        name: userName, // 使用userName來判斷
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        connectionState,
      }
      socket.emit('message', newMessage)

      // const newChatData = {
      //   id: `${socket.id}${Math.random()}`,
      //   room_id: connectionState.roomId,
      //   sender_id: connectionState.userId,
      //   content: message,
      //   created_at: new Date(),
      // }
      // // 將新的訊息添加到 chatData.rawMessages 中
      // setChatData((prevChatData) => ({
      //   ...prevChatData,
      //   rawMessages: [...prevChatData.rawMessages, newChatData],
      // }))

      // 發api存入資料庫
      const response = await fetch(CREATE_MESSAGE_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
        credentials: 'include',
      })
      const result = await response.json()
      console.log(result)
    }
    setMessage('')
  }
  return (
    <div className={`${style.chat__footer}`}>
      <form className={`${style.form}`} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="寫訊息..."
          className={`${style.message}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className={`${style.sendBtn}`}>發送</button>
      </form>
    </div>
  )
}

export default ChatFooter

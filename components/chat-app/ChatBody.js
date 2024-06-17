import React from 'react'
import style from '@/styles/lee-form.module.scss'
import { useEffect } from 'react'
import { useSocket } from '@/context/socket-context'
import { useRouter } from 'next/router'

const ChatBody = ({ chatData, lastMessageRef, typingStatus }) => {
  const { socket } = useSocket()
  const router = useRouter()

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [socket])

  const handleLeaveChat = async () => {
    const connectionState = JSON.parse(localStorage.getItem('connectionState'))
    const otherUserId = connectionState?.otherUserId

    console.log(otherUserId) // 這裡將輸出 otherUserId

    socket.disconnect()
    await router.push(`/member/store/${otherUserId}`)
    localStorage.removeItem('connectionState')
  }

  return (
    <>
      <header className={`${style.chat__mainHeader}`}>
        <h5 style={{ color: 'white' }}>開始聊天</h5>
        <button className={`${style.leaveChat__btn}`} onClick={handleLeaveChat}>
          離開聊天
        </button>
      </header>

      <div className={`${style.message__container}`}>
        {chatData.rawMessages.map((message) =>
          message.sender_id === chatData.connectionState.userId ? (
            <div className={`${style.message__chats}`} key={message.id}>
              <p className={`${style.sender__name}`}>你</p>
              <div className={`${style.message__sender}`}>
                <p>{message.content}</p>
              </div>
            </div>
          ) : (
            <div className={`${style.message__chats}`} key={message.id}>
              <p>{chatData.connectionState.otherUserNickname}</p>
              <div className={`${style.message__recipient}`}>
                <p>{message.content}</p>
              </div>
            </div>
          )
        )}

        <div className={`${style.message__status}`}>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody

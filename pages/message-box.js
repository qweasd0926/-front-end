import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from '@/styles/lee-form.module.scss'

// ...

export default function Profile() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    Modal.setAppElement('#__next') // 使用 Next.js 的根元素作為應用元素
  }, [])

  return (
    <div className="col-lg-4">
      <div className={`card mb-4 ${styles.card}`}>
        <div className="card-body text-center">
          <Image src="/imgs/ESG.png" alt="Profile" width={50} height={30} />{' '}
          {/* 請確保這個路徑是正確的 */}
          <button onClick={() => setModalIsOpen(true)}>打開聊天訊息</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              content: {
                width: '700px', // 設定模態視窗內容的寬度
                height: '700px', // 設定模態視窗內容的高度
              },
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // 設定模態視窗背景的顏色
              },
            }}
          >
            <ChatMessage />
            <button onClick={() => setModalIsOpen(false)}>關閉聊天訊息</button>
          </Modal>
        </div>
      </div>
    </div>
  )
}

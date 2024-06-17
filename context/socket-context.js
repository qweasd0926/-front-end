// 引入需要的 React hooks 和 socket.io 客戶端
import { createContext, useContext, useEffect, useState } from 'react'
import socketIO from 'socket.io-client'

// 創建一個新的 context，這將允許我們在應用程式的任何地方使用 socket 和 connectionState
const SocketContext = createContext(null)

// 創建一個提供者組件，這將允許我們在應用程式的任何地方提供 socket 和 connectionState
export function SocketProvider({ children }) {
  // 使用 useState hook 創建一個 socket 的狀態
  const [socket, setSocket] = useState(null)
  // 使用 useState hook 創建一個 connectionState 的狀態，這將儲存用戶的連接狀態
  const [connectionState, setConnectionState] = useState({
    userId: null,
    otherUserId: null,
    roomId: null,
  })

  // 使用 useEffect hook 在組件掛載時創建一個新的 socket.io 連接，並在組件卸載時斷開連接
  useEffect(() => {
    // 創建一個新的 socket.io 連接
    const newSocket = socketIO.connect('http://localhost:3003')

    // 當連接被建立的時候，打印出 socket 的 id
    newSocket.on('connect', () => {
      console.log('New socket ID:', newSocket.id)
    })

    // 將 connectionState 賦值給新的 socket.io 連接
    newSocket.connectionState = connectionState
    // 將新的 socket.io 連接設定為 socket 的狀態
    setSocket(newSocket)

    // 在組件卸載時，斷開 socket.io 連接
    return () => {
      newSocket.disconnect()
    }
  }, [connectionState]) // 當 connectionState 變更時，重新創建 socket.io 連接

  // 返回一個 SocketContext.Provider 組件，這將允許我們在應用程式的任何地方提供 socket 和 connectionState
  return (
    <SocketContext.Provider
      value={{ socket, connectionState, setConnectionState }}
    >
      {children}
    </SocketContext.Provider>
  )
}

// 創建一個自定義 hook 來使用 socket.io 連接，這將允許我們在應用程式的任何地方使用 socket 和 connectionState
export function useSocket() {
  return useContext(SocketContext)
}

export default SocketContext

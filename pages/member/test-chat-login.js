import ChatHome from '@/components/chat-app/ChatHome'
import socketIO from 'socket.io-client'
const socket = socketIO.connect('http://localhost:3003')

export default function HomePage() {
  return <ChatHome socket={socket} />
}

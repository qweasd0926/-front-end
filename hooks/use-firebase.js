import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from 'firebase/auth'
import { useEffect } from 'react'

import { firebaseConfig } from './firebase-config'

// 重定向專用，用於在同頁面(firebase的登入頁會與回調頁同一頁)監聽登入情況
// getRedirectResult回調頁時用(註:重定向後，回調回來時才會呼叫)
// onAuthStateChanged監聽auth物件變化 <---(用這個就足夠，它會在頁面一啟動偵測目前登入情況)
const initApp = (callback) => {
  const auth = getAuth()

  // Result from Redirect auth flow.
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        console.log(token)
        console.log(user)
      }
    })
    .catch((error) => {
      console.error(error)
    })

  // Listening for auth state changes.
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user)
      // callback the user data
      callback(user.providerData[0])
    }
  })

  // Return the unsubscribe function
  return unsubscribe
}

/* 
原本長這樣 因為加了回傳unsubscribe所以改成上面那樣，
loginGoogleRedirect將用戶重定向到 Google 的登入頁面，
這個過程中，你的應用程式實際上已經被重新載入了，
所以你不需要手動取消 Firebase 的認證狀態變化的監聽器，
因為當頁面重新載入時，所有的 JavaScript 狀態（包括監聽器）都會被清除。

const initApp = (callback) => {
  const auth = getAuth()

  // Result from Redirect auth flow.
  getRedirectResult(auth)
    .then((result) => {
      if (result) {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        // The signed-in user info.
        const user = result.user
        console.log(token)
        console.log(user)
      }
    })
    .catch((error) => {
      console.error(error)
    })

  // Listening for auth state changes.
    onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user', user)
      // callback the user data
      callback(user.providerData[0])
    }
  })
}
*/

// TODO: 目前不需要從firebase登出，firebase登出並不會登出google
const logoutFirebase = () => {
  const auth = getAuth()

  signOut(auth)
    .then(function () {
      // Sign-out successful.
      console.log('Sign-out successful.')
      // window.location.assign('https://accounts.google.com/logout')
    })
    .catch(function (error) {
      // An error happened.
      console.log(error)
    })
}

const loginGoogle = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user
      console.log(user)

      // user後端寫入資料庫等等的操作
      callback(user.providerData[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

const loginGoogleRedirect = async (callback) => {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()

  // redirect to google auth
  signInWithRedirect(auth, provider)
}

// TODO: fb有許多前置設定需求，有需要使用請連絡Eddy
const loginFBRedirect = () => {
  const provider = new FacebookAuthProvider()
  const auth = getAuth()

  signInWithRedirect(auth, provider)
}

export default function useFirebase() {
  useEffect(() => {
    // 初始化
    initializeApp(firebaseConfig)
  }, [])

  return {
    loginFBRedirect,
    initApp,
    loginGoogleRedirect,
    loginGoogle,
    logoutFirebase,
  }
}

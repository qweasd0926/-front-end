export const API_SERVER = 'http://localhost:3003'

// *** JWT ***
export const JWT_LOGIN_POST = `${API_SERVER}/api/auth/login` // 登入, POST

// 註冊, POST
export const JWT_REGISTER_POST = `${API_SERVER}/api/auth/register`

// 驗證的POST
export const CHECK_AUTH_ROUTE = `${API_SERVER}/api/auth/check`

// 登出, POST
export const JWT_LOGOUT_POST = `${API_SERVER}/api/auth/logout`

// 更新使用者資料, POST
export const JWT_UPDATE_USER_POST = `${API_SERVER}/api/users`

// 上傳大頭貼, POST
export const UPLOAD_AVATAR_ONE_POST = `${API_SERVER}/api/users/upload-avatar-one`

// 更新密碼, PUT
export const JWT_UPDATE_PASSWORD_PUT = `${API_SERVER}/api/users`

// 忘記密碼,otp   POST
export const PASSWORD_OTP_POST = `${API_SERVER}/api/reset-password/otp`

// 重設密碼, POST
export const PASSWORD_RESET_POST = `${API_SERVER}/api/reset-password/reset`

// google登入, POST
export const GOOGLE_LOGIN_POST = `${API_SERVER}/api/google-login`

// google cilent id
export const GOOGLE_CLIENT_ID =
  '551378095808-5p8n98gos67borcmq2t3itt46ul5dkoe.apps.googleusercontent.com'

// 取得單筆資料, GET
export const GET_ONE_USER = `${API_SERVER}/api/users/`

// 聊天室傳訊息按鈕建立房間關聯 POST
export const CREATE_ROOM_POST = `${API_SERVER}/api/chat/rooms`

// 把聊天紀錄寫進資料庫
export const CREATE_MESSAGE_POST = `${API_SERVER}/api/chat/postmessage`

// 獲取聊天紀錄
export const GET_CHAT_HISTORY = `${API_SERVER}/api/chat/getmessages`

// 獲得賣場產品資料
export const GET_STORE_PRODUCTS = `${API_SERVER}/api/users/products`

// 取得該賣場的追蹤狀態
export const GET_STORE_LIKE = `${API_SERVER}/api/users/getStoreLike`

// 新增或更新賣場的追蹤狀態
export const POST_STORE_LIKE = `${API_SERVER}/api/users/postStoreLike`

// 取得追蹤的賣場列表
export const GET_STORE_LIKE_LIST = `${API_SERVER}/api/users/getStoreLikeList`

export const PORT = 6005
export const DEV = true

// express 的位置
export const apiBaseUrl = 'http://localhost:3005/api'
export const avatarBaseUrl = 'http://localhost:3005/avatar'

export const API_SERVER = 'http://localhost:3001'

//CHECK_OUT
export const CHECK_OUT = `${API_SERVER}/checkout/api`
export const CHECK_OUT_ADD = `${API_SERVER}/checkout/add`
//取得products資料表
export const PRODUCTS_API = `${API_SERVER}/checkout/product-api`
export const PRODUCTS_GET_API = `${API_SERVER}/checkout/product-api2`
export const PRODUCTS_API_SHOP = `${API_SERVER}/checkout/product-api-shop`
//取得buyer-orders
export const BUYER_ORDER = `${API_SERVER}/buyer-order/api`
export const BUYER_ORDER_FIN = `${API_SERVER}/buyer-order/edit`
//取得evaluation
export const EVALUATION_GET = `${API_SERVER}/evaluation/get`
export const EVALUATION = `${API_SERVER}/evaluation/edit`
//取得bargain 議價
export const BARGAIN = `${API_SERVER}/bargain`
export const BARGAIN_get = `${API_SERVER}/bargain/get`
// export const BARGAIN_RESPNSE = `${API_SERVER}/bargain/:id/respond`
export const BARGAIN_SELLER = `${API_SERVER}/bargain/seller`
export const BARGAIN_BUYER = `${API_SERVER}/bargain/buyer`
export const BARGAIN_BUYER_DELETE = `${API_SERVER}/bargain/buyer`
export const BARGAIN_CHECKOUT = `${API_SERVER}/bargain/checkout`

//以物易物evaluation
export const EVALUATION_BARTER = `${API_SERVER}/evaluation/get-barter`
export const EVALUATION_BARTER_EDIT = `${API_SERVER}/evaluation/barter`

// *** JWT ***
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt` // 登入, POST

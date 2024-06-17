export const API_SERVER = 'http://localhost:3001'

export const PROD_LIST3 = `${API_SERVER}/backstage/api`

export const PROD_LIST4 = `${API_SERVER}/unpaid-maket`

export const PROD_LIST5 = `${API_SERVER}/list-maket/api`

export const PROD_LIST6 = `${API_SERVER}/list-post/add`

export const PROD_LIST7 = `${API_SERVER}/unpaid-maket/ordersA`

export const PROD_LIST8 = `${API_SERVER}/unpaid-maket/ordersB`

export const PROD_LIST9 = `${API_SERVER}/unpaid-maket/ordersDate`

export const PROD_LIST10 = `${API_SERVER}/list-maket-edit/api`

export const PROD_LIST11 = `${API_SERVER}/list-maket-edit/edit`

export const PROD_LIST12 = `${API_SERVER}/list-maket-edit/api/:pid`

export const PROD_ADD_POST = `${API_SERVER}/products/add` // POST

// PROD_ITEM_DELETE: `${PROD_ITEM_DELETE}/17`
export const PROD_ITEM_DELETE = `${API_SERVER}/products` // DELETE

// 取得通訊錄單筆資料 主鍵為 sid,  `${PROD_ITEM}/${sid}`
export const PROD_ITEM = `${API_SERVER}/products` // GET

// 修改通訊錄單筆資料 主鍵為 sid,  `${PROD_ITEM_UPDATE_PUT}/${sid}`
export const PROD_ITEM_UPDATE_PUT = `${API_SERVER}/products/edit` // PUT

// 加入或移除 喜愛清單 "/like-toggle-jwt/:pid"
export const JWT_TOGGLE_LIKE = `${API_SERVER}/like-toggle-jwt` // GET

//
export const BACKSTAGE_MANAGER = `${API_SERVER}/backstage-manager`

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { LINE_PAY_ADD, LINE_PAY_CONFIRM } from '@/configs/config-r'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Order() {
  const router = useRouter()
  const { auth } = useAuth()
  // confirm回來用的，在記錄確認之後，line-pay回傳訊息與代碼，例如
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  // 建立訂單用，格式參考主控台由伺服器回傳
  const [order, setOrder] = useState({})
  // 載入狀態(控制是否顯示載入中的訊息，和伺服器回傳時間點未完成不同步的呈現問題)
  const [isLoading, setIsLoading] = useState(true)

  const [price1, setPrice1] = useState(100)
  const [quantity1, setQuantity1] = useState(1)

  const [price2, setPrice2] = useState(100)
  const [quantity2, setQuantity2] = useState(2)

  // 建立訂單，送至server建立訂單，packages與order id由server產生
  const createOrder = async (newData) => {
    // 送至server建立訂單，packages與order id由server產生
    // products將會組合在packages屬性之下
    try {
      const r = await fetch(`${LINE_PAY_ADD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      })

      console.log('Response status:', r.status)

      const result = await r.json()
      console.log(result) //訂單物件格式(line-pay專用)

      if (result.status === 'success') {
        const orderId = result.data.order.orderId
        setOrder(orderId)
        toast.success('已成功建立訂單')
        goLinePay(orderId)
      } else {
        console.log('訂單建立失敗')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      toast.error('訂單建立失敗，請重試')
    }
  }

  // 導向至LINE Pay付款頁面
  const goLinePay = (orderId) => {
    MySwal.fire({
      title: '即將前往Line Pay付款',
      text: '請確認是否要導向至LINE Pay進行付款？',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '前往付款',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        // 先連到node伺服器後，導向至LINE Pay付款頁面
        window.location.href = `http://localhost:3001/line-pay/reserve?orderId=${orderId}`
      }
    })
  }

  // 確認交易，處理伺服器通知line pay已確認付款，為必要流程
  const handleConfirm = async (transactionId) => {
    const r = await fetch(
      `${LINE_PAY_CONFIRM}?transactionId=${transactionId}`
      //,
      // {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(transactionId),
      // }
    )

    const result = await r.json()
    console.log(result)
    if (result.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    if (result) {
      setResult(result)
    }
    // 處理完畢，關閉載入狀態
    setIsLoading(false)
  }

  // confirm回來用的
  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query)
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false)
        // 不繼續處理
        return
      }
      // 向server發送確認交易api
      handleConfirm(transactionId)
    }

    // eslint-disable-next-line
  }, [router.isReady])

  const orderDisplay = (
    <>
      <h2>購買商品清單</h2>
      <div>
        id=1/名稱=測試商品1
        <br />
        數量:
        <input
          type="number"
          name="quantity1"
          value={quantity1 === 0 ? '' : quantity1}
          onChange={(e) => {
            setQuantity1(Number(e.target.value))
          }}
        />
        單價:
        <input
          type="number"
          name="price1"
          value={price1 === 0 ? '' : price1}
          onChange={(e) => {
            setPrice1(Number(e.target.value))
          }}
        />
        <br />
        小計: {quantity1 * price1}
      </div>
      <hr />
      <div>
        id=2/名稱=測試商品2
        <br />
        數量:
        <input
          type="number"
          name="quantity2"
          value={quantity2 === 0 ? '' : quantity2}
          onChange={(e) => {
            setQuantity2(Number(e.target.value))
          }}
        />
        單價:
        <input
          type="number"
          name="price2"
          value={price2 === 0 ? '' : price2}
          onChange={(e) => {
            setPrice2(Number(e.target.value))
          }}
        />
        <br />
        小計: {quantity2 * price2}
      </div>
      <br />
      總價: {quantity1 * price1 + quantity2 * price2}
      <br />
      <button
        onClick={() => {
          const formData = {
            user_id: auth.userData.id,
            amount: quantity1 * price1 + quantity2 * price2,
            products: [
              {
                id: 1,
                name: '測試商品1',
                quantity: quantity1,
                price: price1,
              },
              {
                id: 2,
                name: '測試商品2',
                quantity: quantity2,
                price: price2,
              },
            ],
          }
          createOrder(formData)
        }}
      >
        產生訂單
      </button>
      <br />
      {/* 圖檔都在public資料夾 */}
      <img alt="" src="/LINEPay.png" width={35} height={25} />
      <button
        onClick={goLinePay}
        // 限制有orderId產生後才能點按
        disabled={!order.orderId}
      >
        前往付款
      </button>
      <hr />
      <h5>訂單明細記錄</h5>
      <p>訂單JSON結構，packages id與order id由伺服器產生。</p>
      <p>{JSON.stringify(order)}</p>
    </>
  )

  const confirmOrder = (
    <>
      <h2>最後付款確認結果(returnCode=0000 代表成功): </h2>
      <p>{JSON.stringify(result)}</p>
      <p>
        <button
          onClick={() => {
            window.location.href = '/test/line-pay/order'
          }}
        >
          重新測試
        </button>
      </p>
    </>
  )

  if (isLoading) {
    return (
      <>
        <p>與伺服器連線同步中...</p>
      </>
    )
  }

  return (
    <>
      <h1>Line Pay測試</h1>
      <p>
        會員登入狀態(需登入才能進行交易): {auth.isAuth ? '已登入' : '未登入'}
      </p>
      <p>
        <Link href="/test/user">連至會員登入頁面</Link>
      </p>
      {result.returnCode ? confirmOrder : orderDisplay}
      {/* 土司訊息視窗用 */}
      <Toaster />
    </>
  )
}

// https://github.com/Gamote/lottie-react
import Lottie from 'lottie-react'
import cartAnimation from '@/assets/loader-cart.json'
import couponAnimation from '@/assets/coupon.json'
import shopAnimation from '@/assets/shop.json'
import marketAnimation from '@/assets/market.json'

// 展示用載入元件
export function DefaultLoader({ show = false }) {
  return (
    <div className={`semi-loader ${show ? '' : 'semi-loader--hide'}`}></div>
  )
}

// 展示用載入文字元件
export function LoaderText({ text = 'loading', show = false }) {
  return (
    <div className={`loading-text-bg ${show ? '' : 'loading-text--hide'}`}>
      <div className={`loading-text ${show ? '' : 'loading-text--hide'}`}>
        {text}...
      </div>
    </div>
  )
}

// lottie-react
export function CartLoader({ show = false }) {
  return (
    <div
      className={`nike-loader-bg ${show ? '' : 'nike-loader--hide'}`}
      style={{
        width: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(173, 181, 184, 0.5)',
        zIndex: '9999',
      }}
    >
      <Lottie
        style={{
          paddingTop: '150px',
          width: '50%',
          margin: 'auto',
        }}
        className={`nike-loader ${show ? '' : 'nike-loader--hide'}`}
        animationData={cartAnimation}
      />
    </div>
  )
}

export function CouponAni({ show = false }) {
  return (
    <div className={`nike-loader-bg ${show ? '' : 'nike-loader--hide'}`}>
      <Lottie
        className={`nike-loader ${show ? '' : 'nike-loader--hide'}`}
        animationData={couponAnimation}
      />
    </div>
  )
}

export function ShopAni({ show = false }) {
  return (
    <div className={`nike-loader-bg ${show ? '' : 'nike-loader--hide'}`}>
      <Lottie
        className={`nike-loader ${show ? '' : 'nike-loader--hide'}`}
        animationData={shopAnimation}
      />
    </div>
  )
}

export function MarketAni({ show = false }) {
  return (
    <div className={`nike-loader-bg ${show ? '' : 'nike-loader--hide'}`}>
      <Lottie
        style={{
          height: '500px',
        }}
        className={`nike-loader ${show ? '' : 'nike-loader--hide'}`}
        animationData={marketAnimation}
      />
    </div>
  )
}

export function NoLoader({ show = false }) {
  return <></>
}

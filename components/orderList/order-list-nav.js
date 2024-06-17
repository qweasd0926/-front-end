import Styles from '@/styles/orderList.module.css'
import Link from 'next/link'
import React from 'react'

export default function OrderListNav({ pageName = '' }) {
  const myStyle = { backgroundColor: '#FB966E' }

  return (
    <>
      <nav className={`px-lg-4 mt-4 ${Styles.navbarOrder}`}>
        {/* <label>
  <FaAlignJustify />
</label>
<input type="checkbox" name="check" id="checkBtn" /> */}
        <ul style={{ borderRadius: '10px' }}>
          <li>
            <Link
              href="/buyer/order-list"
              style={pageName === 'od' ? myStyle : {}}
            >
              <span style={{ color: 'black' }}>
                <strong>全部訂單</strong>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/order-list-unsend"
              style={pageName === 'od-unsend' ? myStyle : {}}
            >
              <span style={{ color: 'black' }}>
                <strong>待出貨</strong>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/order-list-unfinished"
              style={pageName === 'od-unfi' ? myStyle : {}}
            >
              <span style={{ color: 'black' }}>
                <strong>待收貨</strong>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/order-list-finished"
              style={pageName === 'od-fi' ? myStyle : {}}
            >
              <span style={{ color: 'black' }}>
                <strong>已完成</strong>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/buyer/bargain-buyer-req"
              style={pageName === 'bargain-buyer' ? myStyle : {}}
            >
              <span style={{ color: 'black' }}>
                <strong>我的議價邀請</strong>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

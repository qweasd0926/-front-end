import React from 'react'
import style from './loader.module.css'
// import Image from 'next/image'

export default function Loader() {
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ marginTop: '300px' }}
      >
        <div className="">
          <img src="/logo9.png" alt="" width={200} height={200} />
          <span
            className="mt-4"
            style={{ fontSize: '50px', fontWeight: '900' }}
          >
            就快要抵達，再等一下下！
          </span>
        </div>
        <div className={style['lds-ring']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

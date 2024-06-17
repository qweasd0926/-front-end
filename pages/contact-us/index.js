import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { SEND_EMAIL } from '@/configs/config-r'
// import Image from 'next/image'
// pages-----
import DefaultLayout from '@/components/common/default-layout'
// style-----
import style from './contactUs.module.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
// react bootstrap
// react icons-----
import { FaRegFaceSmileWink } from 'react-icons/fa6'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------
import { useLoader } from '@/hooks/use-loader'

export default function ContactUs() {
  const { loader } = useLoader()
  const [isShow, setIsShow] = useState(true)

  // send mail
  const notifySuccess = () => {
    MySwal.fire({
      title: `您的訊息已送出`,
      text: '請稍待3-5個工作天，我們會盡快回覆您',
      icon: 'success',
      confirmButtonText: '關閉',
      confirmButtonColor: '#3085d6',
    })
  }

  const notifyFail = () => {
    MySwal.fire({
      title: `您的訊息未順利送出`,
      text: '請稍待再嘗試，謝謝！',
      icon: 'info',
      confirmButtonText: '關閉',
      confirmButtonColor: '#3085d6',
    })
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleName = (e) => {
    setName(e.currentTarget.value)
  }
  const handleEmail = (e) => {
    setEmail(e.currentTarget.value)
  }
  const handleSubject = (e) => {
    setSubject(e.currentTarget.value)
  }
  const handleMessage = (e) => {
    setMessage(e.currentTarget.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    }

    try {
      const r = await fetch(`${SEND_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (r.status === 200) {
        notifySuccess()
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        notifyFail()
      }
    } catch (e) {
      console.error('Error', e)
    }
  }

  // Loading bar-----
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (isLoading) {
      setProgress(60)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(100)
      }, 50)
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsShow(false)
      }, 800)
    }
  })

  const display = (
    <>
      <DefaultLayout pageName="contactUs">
        <Head>
          <title>聯絡我們 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              {/*  Breadcrumb Start */}
              <div className={`container-fluid ${style.breadcrumbArea}`}>
                <div className="row px-xl-5">
                  <div className="col-12">
                    <nav className="breadcrumb mb-30">
                      <Link
                        className="breadcrumb-item"
                        style={{ textDecoration: 'none' }}
                        href="/"
                      >
                        <span>首頁</span>
                      </Link>
                      <span className="breadcrumb-item active">聯絡我們</span>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Breadcrumb End */}
              {/* Contact Start */}
              <div className="container-fluid mt-3 px-5">
                <div className="d-flex justify-content-center">
                  <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4 text-center">
                    <span className="pr-3" style={{ color: '#8e2626' }}>
                      <strong>
                        聯絡我們：留下您的訊息
                        <FaRegFaceSmileWink className="ms-2 mb-2" />
                      </strong>
                    </span>
                  </h2>
                </div>
                <div className="row px-xl-5 mt-4">
                  <div className="col-lg-7 col-md-12 mb-5 mx-auto px-lg-5">
                    <div
                      className={`contact-form bg-light p-5 ${style.bgHover}`}
                      style={{ borderRadius: '10px' }}
                    >
                      <div id="success"></div>
                      <form onSubmit={handleSubmit}>
                        <div className="control-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            placeholder="您的姓名"
                            required="required"
                            onChange={handleName}
                          />
                          <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group mb-4">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={email}
                            placeholder="您的信箱"
                            required="required"
                            onChange={handleEmail}
                          />
                          <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group mb-4">
                          <input
                            type="text"
                            className="form-control"
                            name="subject"
                            value={subject}
                            placeholder="訊息主旨"
                            required="required"
                            onChange={handleSubject}
                          />
                          <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group mb-4">
                          <textarea
                            className="form-control"
                            rows="8"
                            name="message"
                            value={message}
                            placeholder="您的訊息"
                            required="required"
                            onChange={handleMessage}
                          ></textarea>
                          <p className="help-block text-danger"></p>
                        </div>
                        <div className="d-flex justify-content-center">
                          <button
                            className={`btn py-2 px-3 ${style.sendBtn}`}
                            type="submit"
                            id="sendMessageButton"
                            style={{
                              backgroundColor: '#e96d3f',
                              color: 'white',
                            }}
                            onClick={() => {}}
                          >
                            <span style={{ fontSize: '18px' }}>
                              <strong>送出訊息</strong>
                            </span>
                          </button>
                          <button
                            type="button"
                            className={`btn py-2 px-3 ms-3 ${style.sendBtn}`}
                            style={{
                              backgroundColor: '#3168e9',
                              color: 'white',
                            }}
                            onClick={() => {
                              setName('陳大東先生')
                              setEmail('moritairohadesu@gmail.com')
                              setSubject('您好，欲了解貴司廣告合作模式')
                              setMessage(
                                '您好，我是娛樂公司的行銷部主任，近期注意到貴司在線上網路的啟用，欲了解貴司的廣告合作模式，煩請撥空聯繫。謝謝！'
                              )
                            }}
                          >
                            <span style={{ fontSize: '18px' }}>
                              <strong>一鍵輸入</strong>
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12 mb-3 mt-3 text-center px-lg-5">
                    <img src="/logo9.png" alt="" width={500} height={500} />
                  </div>
                </div>
              </div>
              {/* Contact End */}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )

  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {isShow ? loader() : ''}
          {display}
        </>
      )}
    </>
  )
}

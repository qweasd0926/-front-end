import React from 'react'
import Styles from '@/styles/evalute.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EVALUATION } from '@/configs/configs-buyer'
import { EVALUATION_GET } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/common/default-layout'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import style from '@/pages/shop/cart.module.css'
import Head from 'next/head'
import Link from 'next/link'

export default function Evaluation() {
  const router = useRouter()

  const { eid } = router.query
  console.log(eid)
  //--------評分星星
  // 點按時的評分，一開始是0分代表沒有評分
  const [rating, setRating] = useState(0)
  const [product, setProduct] = useState()

  // 滑鼠游標懸停(hover)評分，，一開始是0分代表沒有
  const [hoverRating, setHoverRating] = useState(0)

  //---------
  const [formData, setFormData] = useState({
    id: '', // 資料的 primary key
    comments: '',
    rating: '',
  })

  useEffect(() => {
    if (eid) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: eid,
      }))
    }
  }, [product])

  const handleRatingClick = (score) => {
    // 更新 rating 状态为按钮点击的评分
    setRating(score)

    // 更新 formData 中的 rating 属性为按钮点击的评分
    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: score.toString(), // 将评分转换为字符串并更新到 formData 中
    }))
  }
  console.log(formData)
  const onSubmit = async (e) => {
    e.preventDefault() // 表單不要以傳統方式送出

    // setFormData((prevFormData) => ({
    //   ...prevFormData,
    //   rating: rating,
    // }))
    console.log(formData)
    const r = await fetch(`${EVALUATION}/${eid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await r.json()

    console.log(result)
    if (result.success) {
      MySwal.fire({
        title: '是否確定送出評價',

        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
          console.log(document.referrer)
        }
      })
    } else {
      alert('訂單評論失敗')
    }
  }

  useEffect(() => {
    // if (!eid) return // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${EVALUATION_GET}/${eid}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((dataObj) => {
        setProduct(dataObj)
      })
  }, [eid, router])

  console.log(product)

  return (
    <>
      {/* Contact Start */}
      <DefaultLayout>
        <Head>
          <title>商品評價 | DEAL-2ND HAND SHOP</title>
        </Head>
        {/* Breadcrumb Start */}
        <div className={`container-fluid ${style.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb">
                <Link
                  className="breadcrumb-item text-dark"
                  href="/"
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '20px' }}>首頁</span>
                </Link>
                <Link
                  className="breadcrumb-item text-dark"
                  href="/buyer/order-list"
                  style={{ textDecoration: 'none', fontSize: '20px' }}
                >
                  <span>訂單總覽</span>
                </Link>
                <span
                  className="breadcrumb-item active"
                  style={{ fontSize: '20px' }}
                >
                  商品評價
                </span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        <div className={`container-fluid ${Styles.evalution}`}>
          <h3 className="mb-3 text-center" style={{ color: '#8e2626' }}>
            <strong>評價訂單：編號{eid}</strong>
          </h3>
          <div className="row px-xl-5">
            <div
              className="col-12 mb-5 d-flex justify-content-center"
              style={{ padding: '0 200px' }}
            >
              <div
                className="contact-form bg-light p-30"
                style={{ width: '100%' }}
              >
                <div id="success" />
                {!product
                  ? '無訂單需評價'
                  : product.rows &&
                    product.rows.map((val, i) => {
                      return val.evaluation_date == null ? (
                        <form
                          name="sentMessage"
                          id="contactForm"
                          noValidate="novalidate"
                          onSubmit={onSubmit}
                          key={i}
                        >
                          <div className="control-group">
                            <div className="row product-line align-items-center">
                              <div className="col-6 text-center pt-3">
                                <Image
                                  src={`/${
                                    val.product_photos.match(/[^,]+\.jpg/)[0]
                                  }`}
                                  className="img-fluid sec1-img"
                                  alt=""
                                  width={200}
                                  height={150}
                                />
                              </div>
                              {/* <div className="col-3">$690</div> */}
                              <div className="col-6">
                                <h4>
                                  <strong>
                                    商品名稱：
                                    <Link
                                      href={`/shop/${val.pid}`}
                                      style={{ textDecoration: 'none' }}
                                    >
                                      {val.product_name}
                                    </Link>
                                  </strong>
                                </h4>
                                <br />
                                <br />
                                <br />
                                <h4 className="">
                                  <strong>
                                    賣家暱稱：
                                    <Link
                                      href={`/member/store/${val.sid}`}
                                      style={{ textDecoration: 'none' }}
                                    >
                                      {val.nickname}
                                    </Link>
                                  </strong>
                                </h4>
                              </div>
                            </div>
                            <div className="mt-5 row d-flex justify-content-center mb-5">
                              <div className="row">
                                <div className="col-12 text-center">
                                  <div className="d-flex justify-content-center">
                                    {/* 
          這裡使用簡易建立5個陣列1...N的語法，可以參考:
          https://github.com/orgs/mfee-react/discussions/50 
        */}
                                    {Array(5)
                                      .fill(1)
                                      .map((v, i) => {
                                        // 每個星星按鈕的分數，相當於索引值+1
                                        const score = i + 1

                                        return (
                                          <button
                                            key={i}
                                            className={Styles['star-btn']}
                                            onMouseEnter={() => {
                                              // 滑鼠游標移入時設定分數
                                              setHoverRating(score)
                                            }}
                                            // onMouseLeave={() => {
                                            //   // 滑鼠游標移出時設定分數
                                            //   setHoverRating(0)
                                            // }}
                                            onClick={(e) => {
                                              e.preventDefault()
                                              handleRatingClick(score)
                                              // setFormData((prevFormData) => ({
                                              //   ...prevFormData,
                                              //   id: val.id,
                                              // }))
                                            }}
                                          >
                                            <span
                                              // 判斷星星是否要點亮。
                                              // 如果這個星星的分數(score)小於等於目前的評分(rating)，或小於目前的滑鼠游標懸停(hover)評分，則套用亮起樣式
                                              className={
                                                score <= rating ||
                                                score <= hoverRating
                                                  ? Styles['on']
                                                  : Styles['off']
                                              }
                                              style={{ fontSize: '30px' }}
                                            >
                                              &#9733;
                                            </span>
                                          </button>
                                        )
                                      })}
                                    <input value={rating} hidden />
                                    <span
                                      className="ps-2 mt-2"
                                      style={{ fontSize: '25px' }}
                                    >
                                      <strong>目前評了 {rating} 分</strong>
                                    </span>
                                  </div>
                                  <br />
                                  <hr style={{ margin: '0 500px' }} />
                                  <br />
                                  <div
                                    className="mb-3 text-center mx-auto"
                                    style={{ width: '70%' }}
                                  >
                                    <label className="mb-2" htmlFor="comments">
                                      <strong style={{ fontSize: '25px' }}>
                                        評論
                                      </strong>
                                    </label>
                                    <textarea
                                      className="form-control"
                                      name="comments"
                                      id="comments"
                                      cols="30"
                                      rows="3"
                                      value={formData.comments}
                                      onChange={(e) => {
                                        const newFormData = {
                                          ...formData,
                                          comments: e.target.value,
                                        }
                                        setFormData(newFormData)
                                      }}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row p-4">
                              <div className="col-12 d-flex justify-content-center">
                                <button
                                  className={`btn me-4 btn-outline-danger ${Styles.btn}`}
                                  type="submit"
                                  id="sendMessageButton"
                                  // onClick={() => {
                                  //   // 在這裡更新 sentData 狀態
                                  //   setSentData([
                                  //     ...sentData,
                                  //     [formData.id, formData.rating, formData.comments],
                                  //   ])
                                  // }}
                                >
                                  <strong>送出評論</strong>
                                </button>
                                <button
                                  className={`btn py-2 px-4 ${Styles.btn}`}
                                  type="button"
                                  id="sendMessageButton"
                                >
                                  <strong>回上一頁</strong>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      ) : (
                        <div className="pt-3" style={{ marginBottom: '200px' }}>
                          <div className="row">
                            <div className="col-12 text-center">
                              <h4>
                                <strong>您的訂單已評價！</strong>
                              </h4>
                            </div>
                          </div>
                        </div>
                      )
                    })}
              </div>
            </div>
            {/* <div className="col-lg-5 mb-5">
            <div className="bg-light p-30 mb-30">
              <div id="map" style={{ width: '80%', height: 300 }} />
            </div>
            <div className="bg-light p-30 mb-3">
              <p className="mb-2">
                <i className="fa fa-map-marker-alt text-primary mr-3" />
                123 Street, New York, USA
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope text-primary mr-3" />
                info@example.com
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt text-primary mr-3" />
                +012 345 67890
              </p>
            </div>
          </div> */}
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

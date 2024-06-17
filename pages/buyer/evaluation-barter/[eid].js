import React from 'react'
import Styles from '@/styles/evalute.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { EVALUATION_BARTER } from '@/configs/configs-buyer'
import { EVALUATION_BARTER_EDIT } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import DefaultLayout from '@/components/common/default-layout'

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
    const r = await fetch(`${EVALUATION_BARTER_EDIT}/${eid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await r.json()

    console.log(result)
    if (result.success) {
      alert('資料修改成功')
      window.location.reload()
      console.log(document.referrer)
    } else {
      alert('資料沒有修改')
    }
  }

  useEffect(() => {
    // if (!eid) return // 如果沒有 sid 的值, 就不用發 AJAX
    fetch(`${EVALUATION_BARTER}/${eid}`, {
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
        <div className={`container-fluid ${Styles.evalution}`}>
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">評價訂單{eid}</span>
          </h2>
          <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
              <div className="contact-form bg-light p-30">
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
                              <div className="col-6">
                                <Image
                                  src={`/${val.product_photos}`}
                                  className="img-fluid sec1-img"
                                  alt=""
                                  width={30}
                                  height={30}
                                />
                                <span>{val.product_name}</span>
                              </div>
                              {/* <div className="col-3">$690</div> */}
                              <div className="col-3">{val.seller_name}</div>
                            </div>
                            <div>
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
                                      >
                                        &#9733;
                                      </span>
                                    </button>
                                  )
                                })}
                            </div>
                            <input value={rating} hidden />
                            目前評了 {rating} 分
                            <div>
                              <div className="mb-3">
                                <label htmlFor="comments">評論</label>
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
                              <button
                                className={`btn btn-outline-danger py-2 px-4 ${Styles.btn}`}
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
                                送出評論
                              </button>
                              <button
                                className={`btn  py-2 px-4 ${Styles.btn}`}
                                type="button"
                                id="sendMessageButton"
                              >
                                回上一頁
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        '訂單已評價'
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

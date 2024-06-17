import React from 'react'
import styles from '@/styles/evalute.module.css'
import Image from 'next/image'
import DefaultLayout from '@/components/common/default-layout'

export default function Evalute() {
  return (
    <>
      <DefaultLayout>
        {/* Contact Start */}
        <div className="container-fluid">
          <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">評價訂單</span>
          </h2>
          <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
              <div className="contact-form bg-light p-30">
                <div id="success" />
                <form
                  name="sentMessage"
                  id="contactForm"
                  noValidate="novalidate"
                >
                  <div className="control-group">
                    <div className="row product-line align-items-center">
                      <div className="col-6">
                        <Image
                          src="/computer2.jpg"
                          className="img-fluid sec1-img"
                          width={30}
                          height={30}
                        />
                        <span>TOP protein 低熱量 乳清蛋白 1公斤</span>
                      </div>
                      <div className="col-3">$690</div>
                      <div className="col-3">某某商城</div>
                    </div>
                    <div className="control-group">
                      <div className="mb-3">
                        <div className={styles.rating} id="rating">
                          <input
                            type="radio"
                            name="star5"
                            id="star5"
                            defaultValue={5}
                            onclick=""
                          />
                          <label htmlFor="star5">★</label>
                        </div>
                        <div className={styles.rating} id="rating">
                          <input
                            type="radio"
                            name="star4"
                            id="star4"
                            defaultValue={4}
                            onclick=""
                          />
                          <label htmlFor="star4">★</label>
                        </div>
                        <div className={styles.rating} id="rating">
                          <input
                            type="radio"
                            name="star3"
                            id="star3"
                            defaultValue={3}
                            onclick=""
                          />
                          <label htmlFor="star3">★</label>
                        </div>
                        <div className={styles.rating} id="rating">
                          <input
                            type="radio"
                            name="star2"
                            id="star2"
                            defaultValue={2}
                            onclick=""
                          />
                          <label htmlFor="star2">★</label>
                        </div>
                        <div className={styles.rating} id="rating">
                          <input
                            type="radio"
                            name="star1"
                            id="star1"
                            defaultValue={1}
                            onclick=""
                          />
                          <label htmlFor="star1">★</label>
                        </div>
                      </div>
                      <p className="help-block text-danger" />
                    </div>
                    <div className="control-group">
                      <textarea
                        className="form-control"
                        rows={8}
                        id="message"
                        placeholder="Message"
                        required="required"
                        data-validation-required-message="Please enter your message"
                        defaultValue={''}
                      />
                      <p className="help-block text-danger" />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary py-2 px-4"
                        type="submit"
                        id="sendMessageButton"
                      >
                        送出評論
                      </button>
                      <button
                        className="btn btn-primary py-2 px-4"
                        type="submit"
                        id="sendMessageButton"
                      >
                        回上一頁
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 mb-5">
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
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

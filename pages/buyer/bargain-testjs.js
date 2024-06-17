import React, { useState, useEffect } from 'react'
import { CHECK_OUT_ADD, PRODUCTS_API } from '@/configs/configs-buyer'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { BARGAIN } from '@/configs/configs-buyer'
import { after } from 'lodash'

export default function Checkout() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const router = useRouter()

  // 取得商品資料表
  const [productData, setProductData] = useState({
    success: false,
  })
  useEffect(() => {
    fetch(`${PRODUCTS_API}`)
      .then((r) => r.json())
      .then((dataObj) => setProductData(dataObj))
  }, [router.query])

  console.log(productData)
  console.log(productData.rows)

  // -----------

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    shipment: '',
    payment_way: '',
    total_price: '0',
    total_amount: '0',
    address: '',
    discount_coupon: '',
    product_id: [],
    product_price: [],
    seller_id: '', // 初始化为空字符串
    item_qty: '',
    after_bargin_price: '',
  })

  //---議價資料
  const [bargainData, setBargainData] = useState({
    product_id: '5',
    after_bargin_price: '',
    buyer_id: '5', // 初始化为空字符串
    seller_id: '',
  })
  //---

  // 使用 useEffect 在数据加载后设置 formData
  useEffect(() => {
    // 检查 productData 是否存在且包含 rows 属性
    if (productData && productData.rows) {
      // 从 productData 中提取数据并设置到 formData
      const newProductId = []
      const newProductPrice = []
      let newSellerId = ''

      productData.rows.forEach((v) => {
        newProductId.push(v.id)
        newProductPrice.push(v.product_price)
        newSellerId = v.seller_id
      })

      // 更新 formData
      setFormData({
        ...formData, // 保留 formData 中其他属性
        product_id: newProductId,
        product_price: newProductPrice,
        seller_id: newSellerId,
      })
      setBargainData({ ...bargainData, seller_id: newSellerId })

      console.log(newSellerId) // 输出新的 seller_id
      console.log(bargainData)
    }
  }, []) // 在 productData 更新时触发 useEffect

  const SubmitBargain = async (e) => {
    e.preventDefault()

    const r = await fetch(BARGAIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bargainData),
    })

    const result = await r.json()
    console.log(result)
    if (result) {
      alert('資料新增成功')
      router.push('/checkout')
    } else {
      alert('資料沒有新增')
    }
  }

  /*
  const fieldChanged = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
    console.log(formData)
  }
  */
  console.log(bargainData)
  return (
    <>
      {/* Checkout Start */}

      <div className="border-bottom">
        <h6 className="mb-3">Products</h6>
        {productData.rows &&
          productData.rows.map((v) => {
            return (
              <div className="d-flex justify-content-between" key={v.id}>
                <p>{v.product_name}</p>
                <input
                  value={v.product_price}
                  readonly
                  name={`${v.product_price}`}
                />{' '}
              </div>
            )
          })}
      </div>

      <div className="d-flex justify-content-between mt-2">
        <p></p>
        <Button variant="primary" onClick={handleShow}>
          提出議價
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form name="form2" onSubmit={SubmitBargain}>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                期望價格:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setBargainData({
                    ...bargainData,
                    after_bargin_price: e.target.value,
                  })
                }}
                value={bargainData.after_bargin_price}
              />
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                取消
              </Button>
              <Button variant="primary" type="submit">
                提出議價
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      {/* Checkout End */}
    </>
  )
}

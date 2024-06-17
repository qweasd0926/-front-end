import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
//page
import DefaultLayout from '@/components/common/default-layout'
// import Chart from 'chart.js/auto'
import 'bootstrap/dist/css/bootstrap.min.css'
import Styles from '@/styles/index-maket.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { BACKSTAGE_MANAGER } from '@/configs/config-lee'
import { ShopAni, MarketAni } from '@/hooks/use-loader/components'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Keyboard, Pagination } from 'swiper/modules'
import 'swiper/css/effect-coverflow'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import style from '@/pages/member-levels/memberLevels.module.css'

import axios from 'axios'
// function MyChart() {
//   const [chartData, setChartData] = useState({
//     labels: ['06:00', '12:00', '18:00', '24:00'],
//     datasets: [
//       {
//         label: '',
//         data: [0, 0, 0, 0],
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   })

// useEffect(() => {
//   const ctx = document.getElementById('lineChart').getContext('2d')
//   const chart = new Chart(ctx, {
//     type: 'line',
//     data: chartData,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//       plugins: {
//         legend: {
//           display: false,
//         },
//       },
//     },
//   })
//   return () => chart.destroy()
// }, [])

//   return (
//     <div>
//       <canvas id="lineChart"></canvas>
//     </div>
//   )
//  } <-- 將這個 } 移動到下面

function IndexMaket() {
  const [todoCounts, setTodoCounts] = useState({
    pendingOrders: 0,
    completedOrders: 0,
    unlistedProducts: 0,
    listedProducts: 0,
  })
  console.log('456')
  console.log(todoCounts)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKSTAGE_MANAGER}`)
        const data = response.data
        console.log(response.data)
        setTodoCounts({
          pendingOrders: data.list.order_no[0].C || 0,
          completedOrders: data.list.order_yes[0].D || 0,
          unlistedProducts: data.list.prodduct_no[0].B || 0,
          listedProducts: data.list.product_yes[0].A || 0,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  //123
  return (
    <>
      <DefaultLayout pageName="helpCenter">
        <Head>
          <title>賣場中心 | DEAL-2ND HAND SHOP</title>
        </Head>
        <div
          className="d-flex justify-content-center"
          style={{
            borderRadius: '10px',
            // border: '10px solid #e6e8e9',
            margin: '0 80px',
            marginTop: '30px',
            backgroundColor: '#f1e4af',
            position: 'relative',
          }}
        >
          <div
            className=""
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'white',
              top: '50px',
              left: '100px',
            }}
          ></div>
          <div
            className=""
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'white',
              bottom: '50px',
              left: '180px',
            }}
          ></div>
          <div
            className=""
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'white',
              top: '10px',
              left: '350px',
            }}
          ></div>
          <div
            className=""
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'white',
              top: '100px',
              right: '100px',
            }}
          ></div>
          <div
            className=""
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'white',
              bottom: '40px',
              right: '200px',
            }}
          ></div>
          <div
            className=""
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'white',
              top: '-10px',
              right: '350px',
            }}
          ></div>
          <img
            src="/market.png"
            alt=""
            style={{ width: '250px', height: '350px' }}
            className="mt-5 me-5"
          />
          <MarketAni />
        </div>

        <div className={`ps-5 d-flex ${Styles.container}`}>
          <div
            className={`mt-3 ms-5 ${Styles['accordion-container']}`}
            id="accordionPanelsStayOpenExample"
          >
            {/* 手风琴项 2 */}
            <div className={Styles['accordion-item']}>
              <ShopAni style={{ width: '100px', height: '100px' }} />
              <h2
                className={`mt-4 ${Styles['accordion-header']}`}
                id="panelsStayOpen-headingTwo"
              >
                <span className={Styles['icon-wrapper']}>
                  <FontAwesomeIcon
                    icon={faFileLines}
                    style={{ color: '#8e2626' }}
                  />
                </span>
                <span
                  className={Styles['accordion-title']}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  <strong>訂單管理</strong>
                </span>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                <div className={Styles['accordion-content']}>
                  <div className={Styles['accordion-body']}>
                    <Link
                      href="/Maket/unpaid-maket"
                      style={{ textDecoration: 'none', color: '#e96d3f' }}
                    >
                      <div className="accordion-body mb-2">
                        <strong>我的銷售</strong>
                      </div>
                    </Link>
                    <Link
                      href="/buyer/bargain-seller"
                      style={{ textDecoration: 'none', color: '#e96d3f' }}
                    >
                      <div className="accordion-body">
                        <strong>我的議價申請</strong>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* 手风琴项 3 */}
            <div className={Styles['accordion-item']}>
              <h2
                className={Styles['accordion-header']}
                id="panelsStayOpen-headingThree"
              >
                <span className={Styles['icon-wrapper']}>
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ color: '#8e2626' }}
                  />
                </span>
                <span
                  className={Styles['accordion-title']}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseThree"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseThree"
                >
                  <strong>商品管理</strong>
                </span>
              </h2>
              <div
                id="panelsStayOpen-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="panelsStayOpen-headingThree"
              >
                <div className={Styles['accordion-content']}>
                  <div className={Styles['accordion-body']}>
                    <Link
                      href="/Maket/return"
                      style={{ textDecoration: 'none', color: '#e96d3f' }}
                    >
                      <div className="accordion-body mb-2">
                        <strong>我的商品</strong>
                      </div>
                    </Link>
                    <Link
                      href="/Maket/list-maket"
                      style={{ textDecoration: 'none', color: '#e96d3f' }}
                    >
                      <div className="accordion-body">
                        <strong>新增商品</strong>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-5 container`}>
            <div className={Styles['rightContent']} id="rightContent" />
            {/* 代辦事項 */}
            <div className={`${Styles['enlarge-container']}`} id="productList">
              <div
                className="container p-5"
                style={{ border: '2px solid gray', borderRadius: '10px' }}
              >
                <h2 className={`text-center mb-4 ${Styles['todo-title']}`}>
                  待辦事項清單
                </h2>
                <div className={Styles['todo-list']}>
                  <div className={Styles['item']}>
                    <span className={Styles['count']}>
                      {todoCounts.pendingOrders}
                    </span>
                    <span className={Styles['label']}>
                      <strong>待付款訂單</strong>
                    </span>
                  </div>
                  <div className={Styles['item']}>
                    <span className={Styles['count']}>
                      {todoCounts.completedOrders}
                    </span>
                    <span className={Styles['label']}>
                      <strong>已完成訂單</strong>
                    </span>
                  </div>
                  <div className={Styles['item']}>
                    <span className={Styles['count']}>
                      {todoCounts.unlistedProducts}
                    </span>
                    <span className={Styles['label']}>
                      <strong>未上架商品</strong>
                    </span>
                  </div>
                  <div className={Styles['item']}>
                    <span className={Styles['count']}>
                      {todoCounts.listedProducts}
                    </span>
                    <span className={Styles['label']}>
                      <strong>已上架商品</strong>
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className={Styles['todo-container']}>
                <h2 className={Styles['todo-title']}>賓客數據中心</h2>
                <p className={Styles['item-label']}>顯示最新至 GMT+8 22:00</p>
                <div className={Styles['data-container']}>
                  <div className={Styles['chart-container']}>
                    <canvas id="lineChart" />
                  </div>
                  <div className={Styles['data-grid']}>
                    <div className={Styles['data-item']}>
                      <h3>不重複訪客</h3>
                      <p className={Styles['value']}>0</p>
                      <p className={Styles['percentage']}>約佔天比 0.00%</p>
                    </div>
                    <div className={Styles['data-item']}>
                      <h3>頁面瀏覽數</h3>
                      <p className={Styles['value']}>0</p>
                      <p className={Styles['percentage']}>約佔天比 0.00%</p>
                    </div>
                    <div className={Styles['data-item']}>
                      <h3>訂單</h3>
                      <p className={Styles['value']}>0</p>
                      <p className={Styles['percentage']}>約佔天比 0.00%</p>
                    </div>
                    <div className={Styles['data-item']}>
                      <h3>下單轉換率</h3>
                      <p className={Styles['value']}>0.00%</p>
                      <p className={Styles['percentage']}>約佔天比 0.00%</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Help Center start */}
        <div
          className="container-fluid mt-4"
          style={{ padding: '0 110px', marginBottom: '150px' }}
        ></div>
        {/* Help Center end */}
      </DefaultLayout>
    </>
  )
}
export default IndexMaket
// export { MyChart }

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
// import Image from 'next/image'
// page-----
import DefaultLayout from '@/components/common/default-layout'
// style-----
import style from './helpCenter.module.css'
// react bootstrap
// react icons-----
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook------

export default function JoinDeal() {
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

  const display = (
    <>
      <DefaultLayout pageName="joinDeal">
        <Head>
          <title>加入DEAL | DEAL-2ND HAND SHOP</title>
        </Head>
        {/* Banner start */}
        <div className={style.banner}>
          <div
            className={`text-center d-flex align-items-center justify-content-center ${style.area1}`}
          >
            <h1 className="" style={{ color: 'white', fontSize: '50px' }}>
              <strong>DEAL HELP CENTER</strong>
            </h1>
          </div>
        </div>
        {/* Banner end */}
        {/* Breadcrumb Start */}
        <div className={`container-fluid ${style.breadcrumbArea}`}>
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb">
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none' }}
                  href="/"
                >
                  <span>首頁</span>
                </Link>
                <Link
                  className="breadcrumb-item"
                  style={{ textDecoration: 'none', fontSize: '20px' }}
                  href="/help-center"
                >
                  <span>幫助中心</span>
                </Link>
                <span className="breadcrumb-item active">加入DEAL</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Join-DEAL content start */}
        <div className="container-fluid px-lg-5 mb-5">
          <div className="row px-lg-5">
            <div className="col-lg-12 px-lg-5 d-flex flex-column  justify-content-center">
              <h2 style={{ color: '#8e2626' }} className="text-center">
                <strong>DEAL徵的就是你！</strong>
              </h2>
              <h5 className="mt-3 text-center">
                <strong>
                  近期剛上線的DEAL誠徵各職缺，請參考以下職缺內容，歡迎二度就業人員應徵，我們需要對工作具有熱情的您！
                </strong>
              </h5>
              <table class="table table-hover table-bordered mt-4">
                <thead>
                  <tr className="text-center">
                    <th className="text-nowrap">項目</th>
                    <th className="text-nowrap">職缺名稱</th>
                    <th>業務內容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="text-center align-middle">1</th>
                    <td className="text-center align-middle">
                      <strong>線上客服</strong>
                    </td>
                    <td>
                      無需陌生開發和出差外派，可接受無經驗有學習熱忱者，有客服經驗者佳。
                      試用期為通過專業測試一個月後，
                      第二個月開始每月可達到平均薪資(含全勤+業績獎金)，
                      每年會依照表現調薪且公司會提供完整的入職教育訓練。{' '}
                      【工作內容】 1.處理用戶來信，官方LINE訊息回覆處理。{' '}
                      2.需具備基本文書軟體（word、excel）及電腦操作知識 。{' '}
                      3.具備良好的溝通應變能力，解決客訴問題以及提供產品售後服務和客戶疑問。
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center align-middle">2</th>
                    <td className="text-center align-middle">
                      <strong>人資專員</strong>
                    </td>
                    <td>
                      1.人員招募(人力銀行.夾報.及面試)
                      2.勞健保投保及申報/人員出勤管理 3.人員教育訓練及人員排班表
                      4.新資計算及申報(勞健保/獎金申報/會計需要資料提供)
                      5.細心負責任, 具良好態度/抗壓性。
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center align-middle">3</th>
                    <td className="text-center align-middle">
                      <strong>儲備幹部</strong>
                    </td>
                    <td>
                      1.學習客服人員管理、培訓、輔導，以確保高品質服務
                      2.學習股權投資與各類財商知識 3.招募活動之客戶聯繫與維護
                      4.活動現場協助、事務、專案規劃 5.活動主持、活動督導
                      6.定期檢討客服部門的效能及問題，並提出建議及改善方案
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">4</th>
                    <td className="text-center">
                      <strong>倉儲人員</strong>
                    </td>
                    <td>
                      {' '}
                      1.從事物品、貨物、常溫食品等各類物品的搬運、打包與裝卸工作。
                      2.貨物品質管理。
                      3.進貨、出貨、退貨、庫存管理不同部門相關倉庫作業{' '}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-center">5</th>
                    <td className="text-center">
                      <strong>行銷專員</strong>
                    </td>
                    <td>
                      1.官網、通路；社群維護管理，後台分析洞察。
                      2.規劃行銷專案與執行，藝人;KOL合作、異業結盟，短影音;自媒體素材企劃執行。
                      3.與公司設計團隊配合。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-12 px-lg-5 text-center mt-4">
              <img
                src="/ad.png"
                alt=""
                width={300}
                height={300}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
              <img
                src="/join.png"
                alt=""
                width={300}
                height={300}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          </div>
        </div>
        {/* Join-DEAL end */}
      </DefaultLayout>
    </>
  )

  return (
    <>
      <LoadingBar progress={progress} />
      {isLoading ? <Loader /> : display}
    </>
  )
}

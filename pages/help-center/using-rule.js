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

export default function UsingRule() {
  // Loading bar-----
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (isLoading) {
      setProgress(60)
      setTimeout(() => {
        setIsLoading(false)
        setProgress(100)
      }, 300)
    }
  }, [isLoading])

  const display = (
    <>
      <DefaultLayout pageName="usingRule">
        <Head>
          <title>使用條款 | DEAL-2ND HAND SHOP</title>
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
                <span className="breadcrumb-item active">使用條款</span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        <div
          className="container border mt-4 bg-light mb-4"
          style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)' }}
        >
          <p
            className="text-center fs-2 mt-3"
            style={{ color: '#8e2626', fontWeight: '600' }}
          >
            使用條款
          </p>
          <p>
            為了保障您的權益，請您務必詳讀本條款。當您註冊會員或實際使用本網站時，即表示您已閱讀、瞭解並同意接受本約定。如果您經過考慮後不同意本條款的內容，請您不要進行註冊程序，如已註冊時，請您通知網站停止使用本服務。
          </p>
          <p>
            若您未滿二十歲，或為法令規定未具備完全行為能力之人，請您由家長（或監護人）陪同閱讀本條款，在您的家長（或監護人）詳讀、瞭解並同意後，您才能使用或繼續使用本服務。當您使用或繼續使用本服務時，即推定您的家長（或監護人）已詳讀、瞭解並同意接受本服務條款的所有內容及其後修改變更。
          </p>
          <div className="col">
            <p className="fs-5">
              <strong> 一、服務說明</strong>
            </p>
            <p>
              本網站提供線上訂購商品及送貨到府服務。本服務之配送地區，目前提供服務的範圍僅限於台灣(包含澎湖、綠島、蘭嶼、金門、馬祖等離島)。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>二、責任限制</strong>
            </p>
            <p>
              如依法令或契約本公司負就本服務條款相關事項負賠償或違約責任時，您同意本公司所負賠償責任，以您當次所支付予本公司之費用，作為本公司賠償責任之上限。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>三、優惠通知</strong>
            </p>
            <p>
              本網站將以註冊登錄或其他方式事前取得您的同意後，傳送服務性或商業性資料，包括但不限於優惠權益、電子郵件、EDM、手機簡訊等提供您參考，除了在前述資料或電子郵件上註明是由本網站發送外，也會在該資料或電子郵件上提供您能隨時停止接收這些資料或電子郵件的方法、說明或功能連結。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>四、交易注意事項</strong>
            </p>
            <p>
              1.
              除本網站頁面另有約定者外，本網站所販售之商品定價皆不含運費。但符合本網站頁面所載之特定條件時，本公司將優惠免收運費。
            </p>
            <p>
              2.
              依照消費者保護法規定，網站購物的消費者均享有到貨後7天（含例假日）猶豫期內免費退貨之權益。非因商品瑕疵或商品質量問題，需自行將商品寄回本公司指定地點，退回商品必須是全新狀態且完整包裝，請保持商品、附件、包裝、廠商紙箱及所有隨附文件資料的完整，以寄送時的包裝再原封備妥，若有相關贈品請一併退回，若紙箱已遺失，請於商品外再包裝，勿直接讓商品原廠外盒粘貼宅配單或書寫文字，原廠外盒損毀或是商品缺件，將無法受理退貨或視損毀程度折扣退款金額。
            </p>
            <p>
              3.於本網站訂購商品時，請務必確認符合所需才下單購買。而您使用本服務時，若經本公司判斷有多次任意退換貨、無故取消訂單，或是任何本公司認定不恰當等情形，造成本公司經營、作業上的困擾或損失，將視情況拒絕交易，暫時或永久終止對您提供本服務。若單價超出市場期價格，訂單需經本公司確認方可同意出貨。您所訂購的所有商品，其品質、保固、維修及售後服務等事項，可與本網站客服人員聯絡，本網站將協助您解決相關問題。
            </p>
            4.
            本網站的詳細使用條款，請您仔細閱讀購物說明，您加入本網站成為會員、在本網站發生購物行為，將視同您清楚了解並同意本条款与细则，及購物說明里的全部內容。
            <p>
              若您對本公司所提供之服務有任何問題，請來信客服信箱與我們聯絡{'{'}
              這裡填寫信箱{'}'}，如若有消費者糾紛，以高雄市為主要協調單位。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>五、系統安全</strong>
            </p>
            <p>
              本網站與您交易所使用之電腦系統確保具有符合一般可合理期待之安全性。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>六、系統中斷或故障</strong>
            </p>
            <p>
              本網站倘若出現中斷或故障等現象，或許將造成您使用上的不便、資料喪失、錯誤、遭人篡改或其他經濟上損失等情形，本網站將全力維護您的交易安全，並且提醒您亦能於使用本網站時，採取更多的防護措施，增益交易之安全性。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>七、帳號密碼被冒用之處理</strong>
            </p>
            <p>
              本網站將於知悉您的帳號密碼遭冒用時，將立即停止該帳號所生交易之處理及後續利用。
            </p>
          </div>
          <div className="col">
            <p className="fs-5">
              <strong>八、修改本使用條款的權利</strong>
            </p>
            <p>
              因應社會環境及法令規定的變遷與科技的進步，本網站為保護會員隱私，有權配合當時法令、環境等隨時修改公告並儘速公告週知，不另外個別通知使用者。所有您參與或使用本公司相關活動或服務，與本公司間所生的權利義務關係，均以當時最後修訂的網路服務條款內容為依據。如果您在本條款修改公告後仍繼續使用本服務，視為您同意修改後的條款。
            </p>
          </div>
        </div>
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

import Head from 'next/head'
import { useState, useEffect } from 'react'
// parts of pages
import DefaultLayout from '@/components/common/default-layout'
import CarouselS1 from '@/components/home/carousel/carousel'
import Category from '@/components/home/category/category'
import ProdA from '@/components/home/product/prod-a'
import Offer from '@/components/home/offer/offer'
import ProdB from '@/components/home/product/prod-b'
import Ad from '@/components/home/ad/ad'
// loading bar & loading icon
import Loader from '@/components/common/loading/loader'
import LoadingBar from 'react-top-loading-bar'
// hook
import { useLoader } from '@/hooks/use-loader'

export default function Home() {
  const { loader } = useLoader()
  const [show, setShow] = useState(true)
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
        setShow(false)
      }, 1500)
    }
  })

  const display = (
    <>
      <DefaultLayout pageName="home">
        <Head>
          <title>首頁 | DEAL-2ND HAND SHOP</title>
        </Head>
        <CarouselS1 />
        <Category />
        <ProdA />
        <Ad />
        <ProdB />
        <Offer />
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
          {show ? loader() : ''}
          {display}
        </>
      )}
    </>
  )
}

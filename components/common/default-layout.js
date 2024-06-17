import Navbar from './navbar/navbar'
import Footer from './footer/footer'

export default function DefaultLayout({ children, pageName = '' }) {
  return (
    <>
      <Navbar pageName={pageName} />
      <main className="">{children}</main>
      <Footer />
    </>
  )
}

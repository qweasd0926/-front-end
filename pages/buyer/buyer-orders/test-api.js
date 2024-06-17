import { useEffect, useState } from 'react'
import { BUYER_ORDERS } from '@/configs/configs-buyer'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Test() {
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPage: 0,
  })

  useEffect(() => {
    fetch(`${BUYER_ORDERS}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => setData(dataObj))
  }, [router.query])

  console.log(router)

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" href="#">
              Previous
            </Link>
          </li>
          {Array(11)
            .fill(1)
            .map((v, i) => {
              return (
                <li className="page-item" key={i}>
                  <Link className="page-link" href={`?page=${i + 1}`}>
                    {i + 1}
                  </Link>
                </li>
              )
            })}

          <li className="page-item">
            <Link className="page-link" href="#">
              Next
            </Link>
          </li>
        </ul>
      </nav>
      {JSON.stringify(data)}
    </>
  )
}

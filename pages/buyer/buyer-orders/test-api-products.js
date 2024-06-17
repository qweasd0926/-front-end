import { useEffect, useState } from 'react'
import { PRODUCTS_API } from '@/configs/configs-buyer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Table from 'react-bootstrap/Table'

export default function TestProduct() {
  const router = useRouter()

  const [data, setData] = useState({
    success: false,
    page: 0,
    totalPage: 0,
    rows: [],
  })

  useEffect(() => {
    fetch(`${PRODUCTS_API}${location.search}`)
      .then((r) => r.json())
      .then((dataObj) => setData(dataObj))
  }, [router.query])

  console.log(router)
  console.log(data)

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
      {/* {JSON.stringify(data, null, 4)} */}
      <div>
        {' '}
        {data.rows.filter((v) => v.id == 2394).map((v) => v.product_name)}
      </div>
      <Table striped bordered hover size="sm">
        <tbody>
          {data.rows.map((v, i) => {
            return (
              <tr key={i}>
                <td>{v.id}</td>
                <td>{v.seller_id}</td>
                <td>{v.product_name}</td>
                <td>{v.product_price}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

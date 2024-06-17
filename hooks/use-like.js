import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PROD_LIST } from '@/configs/config-r'
import { useAuth } from '@/context/auth-context'

const LikeContext = createContext(null)

export function LikeProvider({ children }) {
  //Router
  const router = useRouter()

  // Member
  const { checkAuth, auth } = useAuth()

  // Like products
  const [prods, setProds] = useState({ likeProd: [] })

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const member_id = auth.userData.id
        const r = await fetch(
          `${PROD_LIST}${location.search}?member_id=${member_id}`
        )
        if (r.ok) {
          const dataObj = await r.json()
          setProds(dataObj)
          console.log(dataObj)
        } else {
          console.error('Fail to fetch')
        }
      } catch (e) {
        console.error('Error', e)
      }
    }
    fetchLikeData()
  }, [router.query, router.isReady, auth])

  // increment of qty
  const increment2 = (prods, id) => {
    return prods.map((v, i) => {
      if (v.id === id) return { ...v, product_qty: v.product_qty + 1 }
      else return v
    })
  }

  // decrement of qty
  const decrement2 = (prods, id) => {
    return prods.map((v, i) => {
      if (v.id === id) return { ...v, product_qty: v.product_qty - 1 }
      else return v
    })
  }

  // delete from cart
  const remove2 = (prods, id) => {
    return prods.filter((v, i) => {
      return v.id !== id
    })
  }

  // add into cart
  const add2 = (likeProd, prod) => {
    const foundIndex2 = likeProd.findIndex((v) => v.id === prod.id)
    if (foundIndex2 > -1) {
      const updatedProds = likeProd.map((v) => {
        if (v.id === prod.id) {
          return { ...v, product_qty: v.product_qty + 1 }
        }
        return v
      })
      return updatedProds
    } else {
      const newProd = { ...prod, product_qty: 1 }
      return [...likeProd, newProd]
    }
  }

  // function of add prod into cart
  const addProd = (prod) => {
    setProds((prevProds) => {
      const updatedLikeProd = add2(prevProds.likeProd, prod)
      return { ...prevProds, likeProd: updatedLikeProd }
    })
  }

  // function of qty increment
  const incrementProdById = (id) => {
    const updatedLikeProd = increment2(prods.likeProd, id)
    setProds({ ...prods, likeProd: updatedLikeProd })
  }

  const decrementProdById = (id) => {
    const updatedLikeProd = decrement2(prods.likeProd, id)
    setProds({ ...prods, likeProd: updatedLikeProd })
  }

  // function of prod removment
  const removeProdById = (id) => {
    const updatedLikeProd = remove2(prods.likeProd, id)
    setProds({ ...prods, likeProd: updatedLikeProd })
  }

  const totalProds = prods.likeProd
    ? prods.likeProd.reduce((acc, v) => acc + v.p_qty, 0)
    : 0

  return (
    <LikeContext.Provider
      value={{
        prods,
        incrementProdById,
        decrementProdById,
        removeProdById,
        addProd,
        totalProds,
      }}
    >
      {children}
    </LikeContext.Provider>
  )
}

export const useLike = () => useContext(LikeContext)

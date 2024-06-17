import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { PROD_LIST } from '@/configs/config-r'
import { useAuth } from '@/context/auth-context'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  //Router
  const router = useRouter()

  // Member
  const { checkAuth, auth } = useAuth()

  // cart products
  const [items, setItems] = useState({ cartProd: [] })

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const member_id = auth.userData.id
        const r = await fetch(
          `${PROD_LIST}${location.search}?member_id=${member_id}`
        )
        if (r.ok) {
          const dataObj = await r.json()
          setItems(dataObj)
          console.log(dataObj)
        } else {
          console.error('Fail to fetch')
        }
      } catch (e) {
        console.error('Error', e)
      }
    }
    fetchCartData()
  }, [router.query, router.isReady, auth])

  // increment of qty
  const increment = (items, id) => {
    return items.map((v, i) => {
      if (v.id === id) return { ...v, p_qty: v.p_qty + 1 }
      else return v
    })
  }

  // decrement of qty
  const decrement = (items, id) => {
    return items.map((v, i) => {
      if (v.id === id) return { ...v, p_qty: v.p_qty - 1 }
      else return v
    })
  }

  // delete from cart
  const remove = (items, id) => {
    return items.filter((v, i) => {
      return v.id !== id
    })
  }

  // add into cart
  const add = (cartProd, item) => {
    const foundIndex = cartProd.findIndex(
      (v) => v.product_id === item.product_id
    )
    if (foundIndex > -1) {
      const updatedItems = cartProd.map((v) => {
        if (v.product_id === item.product_id) {
          return { ...v, p_qty: v.p_qty + 1 }
        }
        return v
      })
      return updatedItems
    } else {
      const newItem = { ...item, p_qty: 1 }
      return [...cartProd, newItem]
    }
  }

  // function of add prod into cart
  const addItem = (item) => {
    setItems((prevItems) => {
      const updatedCartProd = add(prevItems.cartProd, item)
      return { ...prevItems, cartProd: updatedCartProd }
    })
  }

  // function of qty increment
  const incrementItemById = (id) => {
    const updatedCartProd = increment(items.cartProd, id)
    setItems({ ...items, cartProd: updatedCartProd })
  }

  const decrementItemById = (id) => {
    const updatedCartProd = decrement(items.cartProd, id)
    setItems({ ...items, cartProd: updatedCartProd })
  }

  // function of prod removment
  const removeItemById = (id) => {
    const updatedCartProd = remove(items.cartProd, id)
    setItems({ ...items, cartProd: updatedCartProd })
  }

  const calcTotalItems = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items.cartProd[i].p_qty
    }
    return total
  }

  // 計算總金額
  const calcTotalPrice = () => {
    let total = 0
    for (let i = 0; i < items.cartProd.length; i++) {
      total += items.cartProd[i].p_qty * items.cartProd[i].p_price
    }
    return total
  }

  const calcTotalCP = () => {
    let total = 0
    for (let i = 0; i < items.cartProd.length; i++) {
      total += items.cartProd[i].p_qty * items.cartProd[i].price
    }
    return total
  }

  const totalItems = items.cartProd
    ? items.cartProd.reduce((acc, v) => acc + v.p_qty, 0)
    : 0
  const totalPrice = items.cartProd
    ? items.cartProd.reduce((acc, v) => acc + v.p_qty * v.p_price, 0)
    : 0
  const totalCP = items.cartProd
    ? items.cartProd.reduce((acc, v) => acc + v.available_cp, 0)
    : 0

  return (
    <CartContext.Provider
      value={{
        items,
        incrementItemById,
        decrementItemById,
        removeItemById,
        addItem,
        totalItems,
        totalPrice,
        totalCP,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

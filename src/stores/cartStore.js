import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cartStore', () => {
  const carts = ref([])
  const total = ref(0)
  const paymentPrice = ref(0)
  const couponName = ref("")
  const usedBunnyCoins = ref(0)
  const merchantNo = ref("")
  const img1 = ref("")
  const img2 = ref("")
  const img3 = ref("")
  const img4 = ref("")
 
  return {
    carts,
    total,
    paymentPrice,
    couponName,
    usedBunnyCoins,
    merchantNo,
    img1,
    img2,
    img3,
    img4
  }
})

  // 模擬取得購物車數據
  // const getCart = () => {
  //   // 檢查 localStorage 是否有保存的購物車數據
  //   const savedCart = JSON.parse(localStorage.getItem('cart')) || []
  //   carts.value = savedCart

  //   // 模擬計算總數和總金額
  //   total.value = savedCart.reduce((sum, item) => sum + item.qty, 0)
  //   finalTotal.value = savedCart.reduce((sum, item) => sum + item.qty * item.price, 0)
  // }

  // // 模擬添加商品到購物車
  // const addToCart = (id, qty = 1) => {
  //   const existingProduct = carts.value.find(item => item.product_id === id)
  //   if (existingProduct) {
  //     existingProduct.qty += qty
  //   } else {
  //     // 模擬商品數據
  //     const product = {
  //       product_id: id,
  //       qty,
  //       price: 100 // 假設每個商品價格是 100
  //     }
  //     carts.value.push(product)
  //   }

  //   // 保存更新後的購物車數據到 localStorage
  //   localStorage.setItem('cart', JSON.stringify(carts.value))

  //   SwalHandle.showSuccessMsg('加入購物車成功')
  //   getCart()
  // }

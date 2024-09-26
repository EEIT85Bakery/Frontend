<template>
    <div>
      <h1>購物車</h1>
      <div v-if="carts.length === 0">購物車內沒有商品。</div>
      <ul v-else>
        <li v-for="(item, index) in carts" :key="index">
          商品 ID: {{ item.product_id }} | 數量: {{ item.qty }} | 單價: {{ item.price }} | 總價: {{ item.qty * item.price }}
        </li>
      </ul>
      <div>
        <p>總數量: {{ total }}</p>
        <p>總金額: {{ finalTotal }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cartStore'
  
  const cartStore = useCartStore()
  
  // 當組件加載時，獲取購物車數據
  cartStore.getCart()
  
  const carts = cartStore.carts
  const total = cartStore.total
  const finalTotal = cartStore.finalTotal
  </script>
  
<template>
    <div>
      <h1>商品列表</h1>
      <div v-for="product in products" :key="product.id">
        <h2>{{ product.name }}</h2>
        <p>價格: {{ product.price }}</p>
        <button @click="addToCart(product.id, 1)">加入購物車</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useCartStore } from '@/stores/cartStore'
  
  // 使用 cartStore
  const cartStore = useCartStore()
  
  // 假設的產品數據
  const products = [
    { id: 1, name: '商品 A', price: 100 },
    { id: 2, name: '商品 B', price: 150 },
    { id: 3, name: '商品 C', price: 200 }
  ]
  
  // 定義 addToCart 方法
  const addToCart = (productId, quantity) => {
    cartStore.addToCart(productId, quantity) // 調用 cartStore 的 addToCart 方法
  }
  </script>
  
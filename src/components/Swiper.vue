<script setup>
import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/swiper-bundle.css';
  
  // 定義你的圖片數組
  const images = ref([
    {
        imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
        name: '草莓起司蛋糕'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
        name: '草莓起司蛋糕'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
        name: '草莓起司蛋糕'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
        name: '草莓起司蛋糕'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
        name: '草莓起司蛋糕'
    }

  ])
</script>


<template>
    <swiper :slides-per-view="3" :space-between="10" pagination navigation>
      <swiper-slide v-for="(item, index) in images" :key="index">
        <RouterLink style="text-decoration: none;" to="/">
        <img :src="item.imageUrl" alt="Image" class="moreImg" />
        <div class="moreProductName">{{ item.name }}</div>
    </RouterLink>
      </swiper-slide>
    </swiper>
  </template>
  
  
  
<style>
  /* 可以根據需要添加樣式 */
  .swiper {
    width: 70%;
    height: auto; 
    
  }
  
  .moreImg {
    width: 100%;
    height: auto; 
    padding: 10% 5% 1% 5%;
  } 

  .moreProductName {
    text-align: center;
    color: rgba(50, 67, 95, 1);
    margin-bottom: 20%;
    font-weight: bold;
  } 

  .swiper-button-prev {
    display: none;
  }

  .swiper-button-next {
    display: none;
  }

</style>
  
<template>
  <div v-if="isLoading" class="loading-container">
    <transition name="fade" mode="out-in">
      <img :src="images[currentImage]" :key="currentImage" class="image-container" alt="loading image" />
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 定義數據
const images = [
  '/imgZip/loading/bunnyLoading1.png',
  '/imgZip/loading/bunnyLoading2.png',
  '/imgZip/loading/bunnyLoading3.png',
  '/imgZip/loading/bunnyLoading4.png',
  '/imgZip/loading/bunnyLoading5.png',
  '/imgZip/loading/bunnyLoading6.png',
  '/imgZip/loading/bunnyLoading7.png'
];
const currentImage = ref(0);
const isLoading = ref(true);
let interval = null;

// 開始輪播圖片
const startSlideshow = () => {
  showNextImage();
};

// 顯示下一張圖片
const showNextImage = () => {
  interval = setTimeout(() => {
    currentImage.value = (currentImage.value + 1) % images.length;
    showNextImage();
  }, 300);
};

// 停止輪播圖片
const stopSlideshow = () => {
  clearTimeout(interval);
  isLoading.value = false;
};

// 組件掛載時開始輪播
onMounted(() => {
  startSlideshow();
});

// 組件卸載前清除計時器，避免內存洩漏
onBeforeUnmount(() => {
  clearTimeout(interval);
});
</script>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.image-container {
  width: 150px;
  height: 150px;
  position: absolute; 
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} 
</style>

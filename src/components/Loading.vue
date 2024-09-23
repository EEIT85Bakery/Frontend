<template>
  <div v-if="isLoading" class="loading-container">
    <transition name="fade" mode="out-in">
      <img :src="images[currentImage]" :key="currentImage" class="image-container" alt="loading image" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/imgZip/loading/bunnyLoading1.png',
        '/imgZip/loading/bunnyLoading2.png',
        '/imgZip/loading/bunnyLoading3.png',
        '/imgZip/loading/bunnyLoading4.png',
        '/imgZip/loading/bunnyLoading5.png',
        '/imgZip/loading/bunnyLoading6.png',
        '/imgZip/loading/bunnyLoading7.png'
      ],
      currentImage: 0,
      isLoading: true,
      interval: null
    };
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      this.showNextImage();
    },
    showNextImage() {
      this.interval = setTimeout(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
        this.showNextImage(); 
      }, 300); 
    },
    stopSlideshow() {
      clearTimeout(this.interval);
      this.isLoading = false; // 停止加载动画
    }
  },
  beforeDestroy() {
    clearTimeout(this.interval); // 清除定时器，防止内存泄漏
  }
};
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

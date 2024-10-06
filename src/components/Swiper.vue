<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const images = ref([
  {
    imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
    name: '草莓起司蛋糕'
  },
  {
    imageUrl: '../../public/imgZip/Sample/apple pie.jpg',
    name: '肉桂蘋果派'
  },
  {
    imageUrl: '../../public/imgZip/Sample/cranberry scone.jpg',
    name: '蔓越莓司康'
  },
  {
    imageUrl: '../../public/imgZip/Sample/hand-made cookies.jpg',
    name: '招牌手工餅乾'
  }
])

const hoveredIndex = ref(null);
const likedIndexes = ref([]);

const toggleLike = (index) => {
  if (likedIndexes.value.includes(index)) {
    likedIndexes.value = likedIndexes.value.filter(i => i !== index);
  } else {
    likedIndexes.value.push(index);
  }
};

</script>


<template>
  <div style="position: relative;">
  <swiper 
    :slides-per-view="4" 
    :space-between="1" 
    pagination 
    :grab-cursor="false"  
    :allow-touch-move="false"
    ref="swiperRef">
    <swiper-slide v-for="(item, index) in images" :key="index">
      <div class="imgWrapper" @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null">
        <RouterLink style="text-decoration: none;" to="/">
          <img :src="item.imageUrl" alt="Image" class="moreImg" :class="{ 'hovered': hoveredIndex === index }" />
        </RouterLink>
        <button class="moreImgBtn" :class="{ 'visible': hoveredIndex === index }">
          加入購物車
        </button>
        <i class="bi bi-suit-heart heartIcon1"
            v-if="!likedIndexes.includes(index)"
            @click="toggleLike(index)"></i>
        <i class="bi bi-suit-heart-fill heartIcon2"
            v-else
            @click="toggleLike(index)"></i>
      </div>
      <RouterLink style="text-decoration: none;" to="/">
      <div class="moreProductName">{{ item.name }}</div>
      </RouterLink>
    </swiper-slide>
  </swiper>
</div>
</template>



<style>
.swiper {
  display: flex;
  width: 85%;
  height: auto;
  margin-bottom: 5%;
}

.imgWrapper {
  position: relative;
  display: inline-block;
}

.moreImg {
  width: 100%;
  height: auto;
  padding: 10% 5% 1% 5%;
  transition: opacity 0.3s ease;
}

.moreImg.hovered {
  opacity: 0.3;
}

.heartIcon1,
.heartIcon2 {
  position: absolute;
  top: 12%;
  left: 10%;
  font-size: x-large;
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  cursor: pointer;
}

.moreImgBtn {
  position: absolute;
  bottom: 8%;
  width: 80%;
  left: 10%;
  font-weight: bold;
  color: rgba(166, 127, 120, 1);
  background-color: white;
  border: rgba(166, 127, 120, 0.5) solid 1px;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 2%;
  z-index: 10;
  opacity: 0; /* 初始透明度為 0 */
  transition: opacity 0.3s ease; /* 添加過渡效果 */
  pointer-events: none; /* 避免在不可見時仍然可點擊 */
}

.moreImgBtn.visible {
  opacity: 1; /* 懸停時透明度變為 1 */
  pointer-events: auto; /* 使按鈕可以點擊 */
}

.moreImgBtn:hover {
  transform: scale(1.05);
}

.moreProductName {
  text-align: center;
  color: rgba(50, 67, 95, 1);
  font-weight: bold;
}




</style>
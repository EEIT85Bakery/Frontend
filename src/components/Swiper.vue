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
  },
  {
    imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
    name: '草莓起司蛋糕'
  }
])

// 用一個數組來追蹤每個圖片的懸停狀態
const hoveredIndex = ref(null);

// 用於追蹤每個圖片是否已經被點擊 "喜歡" 的狀態
const likedIndexes = ref([]);

// 切換心形圖示狀態的函數
const toggleLike = (index) => {
  if (likedIndexes.value.includes(index)) {
    // 如果已經是 "喜歡" 狀態，則從陣列中移除
    likedIndexes.value = likedIndexes.value.filter(i => i !== index);
  } else {
    // 否則，添加到 "喜歡" 狀態的陣列中
    likedIndexes.value.push(index);
  }
};

</script>


<template>
  <swiper :slides-per-view="3" :space-between="10" pagination navigation>
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
</template>



<style>
.swiper {
  width: 70%;
  height: auto;

}

.imgWrapper {
  position: relative;
  display: inline-block;
  /* background-color: lightblue; */
}

.moreImg {
  width: 100%;
  height: auto;
  padding: 10% 5% 1% 5%;
  cursor: grab;
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
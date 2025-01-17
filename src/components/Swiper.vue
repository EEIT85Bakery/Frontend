<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { ref, onMounted } from 'vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter()

const cartStore = useCartStore();

const emit = defineEmits(['getProduct']); // 定義事件

const otherProducts = ref({})

const toNewProduct = (item) => {
  cartStore.setProductId(item.id)
  router.push({ 
    name: '單一產品頁面', // 目標路由的名稱
    params: { id: item.id }  // 傳遞路由參數
  });
  
  emit('getProduct')
  getAllProducts()
}

const getAllProducts = () => {
  axiosInstanceForInsertHeader.get('/admin/products').then((res) => {
    // 先過濾掉購物車中的商品
    const filterProducts = res.data.filter(item => item.id != cartStore.productId);
    
    // 使用 Fisher-Yates 洗牌算法打亂陣列
    const shuffled = [...filterProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // 直接取前4個元素(或更少如果陣列長度小於4)
    otherProducts.value = shuffled.slice(0, Math.min(4, shuffled.length));
  }).catch(err => console.log(err)
  )
}

const addToWishList = (item) => {

  axiosInstanceForInsertHeader.post('/wishList/add', {
    productId: item.id
  }).then(() => {
    SwalHandle.showSuccessMsg("成功新增到我的收藏")
  }).catch((err) => {
        console.log(err);
        
        if(err.response.data == "該商品已經在收藏清單中") {
        SwalHandle.showErrorMsg("該商品已經在收藏清單中")
    }
    })

}


const addToCart = (item) => {
  
  axiosInstanceForInsertHeader.post('/cart', {
        productId: item.id,
        quantity: 1,
        price: item.price
  }).then(() => {
    SwalHandle.showSuccessMsg(`成功添加到購物車`)
  }).catch(err => console.log(err)
  )
}

const hoveredIndex = ref(null);
const likedIndexes = ref([]);

const toggleLike = (index) => {
  if (likedIndexes.value.includes(index)) {
    likedIndexes.value = likedIndexes.value.filter(i => i !== index);
  } else {
    likedIndexes.value.push(index);
  }
};

onMounted(() => {
  getAllProducts()
})

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
    <swiper-slide v-for="(item, index) in otherProducts" :key="index">
      <div class="imgWrapper" @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null">
        <div style="text-decoration: none;" >
          <img :src="`data:;base64,${item.img2}`" alt="Image" class="moreImg" :class="{ 'hovered': hoveredIndex === index }" @click="toNewProduct(item)"/>
        </div>
        <button type="button" class="moreImgBtn" :class="{ 'visible': hoveredIndex === index }" @click="addToCart(item)">
          加入購物車
        </button>
        <i class="bi bi-suit-heart-fill heartIcon1"
            v-if="!likedIndexes.includes(index)"
            @click="addToWishList(item)"></i>
        <!-- <i class="bi bi-suit-heart-fill heartIcon2"
            v-else
            @click="toggleLike(index)"></i> -->
      </div>
      <RouterLink style="text-decoration: none;" to="/">
      <div class="moreProductName">{{ item.productName }}</div>
      </RouterLink>
    </swiper-slide>
  </swiper>
</div>
</template>


<style>
.swiper {
  display: flex;
  width: 70%;
  height: auto;
  margin-bottom: 5%;
}

.imgWrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
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

.heartIcon1 {
  position: absolute;
  top: 12%;
  left: 10%;
  font-size: x-large;
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 10;
  cursor: pointer;
}

.heartIcon1:active {
  color: rgba(166, 127, 120, 1);
  transition: color 0.01s ease;
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
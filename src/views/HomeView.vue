<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from '@/components/Loading.vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { Carousel } from 'bootstrap';
import axios from 'axios';

const isLoading = ref(true);
const token = localStorage.getItem('jwt')


const route = useRoute();
//anniversaries//
const userEmail = ref("")
const getMemberInfo = () => {
  
  axios.get('/api/memberPage/info', {
    headers: {
    Authorization: `Bearer ${token}`
    }
  }).then(res => {
    userEmail.value = res.data.email;
    getAllAnniversaries()
  }).catch(err => console.log(err))
}

const convertToDate = (dateInput) => {
  if (!dateInput) return '';

  let date;
  if (Array.isArray(dateInput)) {
    // 如果是數組，假設格式為 [year, month, day]
    date = new Date(Date.UTC(dateInput[0], dateInput[1] - 1, dateInput[2]));
  } else if (typeof dateInput === 'string') {
    // 如果是字符串，直接解析
    const [year, month, day] = dateInput.split('-').map(Number);
    date = new Date(Date.UTC(year, month - 1, day));
  } else {
    // 其他情況，假設是 Date 對象或時間戳
    date = new Date(dateInput);
  }

  // 使用 toISOString() 並只取日期部分
  return date.toISOString().split('T')[0];
};

const anniversaries = ref([])
const getAllAnniversaries = () => {
  axiosInstanceForInsertHeader.get('/anniversaries/all').then(res => {
    anniversaries.value = res.data
    anniversaries.value.map(item => {
      
      if(item.mailSent == false) {

      axiosInstanceForInsertHeader.post('/anniversaries/check', {
id: item.id,
anniversaryName: item.anniversaryName,
anniversaryDate: item.anniversaryDate,
userEmail: userEmail.value
}).then((res) => {
  // if(res.data == "信件已寄出") {
  //   router.push('mail')
  // }
}).catch(err => console.log(err))
      }
      
  })
  
    
  }).catch(err => console.log(err))
}

//

const startLoading = () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 50);
};

watch(route, () => {
  isLoading.value = true;
  startLoading();
});

const imgArray = ref([
  { imageUrl: '../../public/imgZip/HomePageImg/Img1.png', categories: '餅乾'},
  { imageUrl: '../../public/imgZip/HomePageImg/Img2.png', categories: '餅乾' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img3.png', categories: '蛋糕' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img4.png', categories: '蛋糕' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img5.png', flavor: '禮盒' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img6.png', flavor: '禮盒' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img7.png', keyword: '' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img8.png', keyword: '' }
]);

// 照片跳轉商品葉
const router = useRouter()
const navigateToProduct = (params) => {
  router.push({
    path: '/products',
    query: params,
  });
};


const images = ref([]); // 用來儲存所有圖片 DOM

onMounted(() => {
  getMemberInfo()

  isLoading.value = true;
  startLoading();

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeIn'); // 添加 fadeIn class
      } else {
        entry.target.classList.remove('fadeIn'); // 離開可視範圍時移除 fadeIn class
      }
    });
  }, options);

  // 獲取所有圖片元素
  const imgElements = document.querySelectorAll('.ListImg, .ImgGalleryItems, .sayingText');
  imgElements.forEach(img => {
    observer.observe(img); // 為每個圖片元素添加觀察者
  });

  const carouselElement = document.getElementById('demo');
  if (carouselElement) {
    const carousel = new Carousel(carouselElement, {
      interval: 2000,
      ride: 'carousel'
    });
  }

});

</script>

<template id="">

  <Loading v-if="isLoading" />

  <!-- Carousel -->
  <div id="demo" class="carousel slide" data-bs-ride="carousel">

    <div class="carousel-inner">
      <RouterLink to="products">
        <div class="carousel-item active">
          <img src="../../public/imgZip/HomePageCarousel/carousel1.png" alt="perform1" class="d-block"
            style="width:100%">
        </div>
      </RouterLink>
      <RouterLink to="products">
        <div class="carousel-item">
          <img src="../../public/imgZip/HomePageCarousel/carousel2.png" alt="perform2" class="d-block"
            style="width:100%">
        </div>
      </RouterLink>
      <RouterLink to="products">
        <div class="carousel-item">
          <img src="../../public/imgZip/HomePageCarousel/carousel3.png" alt="perform3" class="d-block"
            style="width:100%">
        </div>
      </RouterLink>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <!-- 人氣排行榜 -->
  <div class="rankList">
    <div class="rankListTitle">人氣排行榜</div>
    <div class="line"></div>
  </div>

  <div class="rankListImg">
    <RouterLink :to="{ path: '/products', query: { flavor: '雲朵戚風蛋糕' } }" class="rankListItem">
      <img src="../../public/imgZip/HomePageImg/HomePageImgP1.png" class="ListImg" alt="HomePageImgP1" ref="images">
    </RouterLink>
    <RouterLink :to="{ path: '/products', query: { flavor: '蜜糖千層派' } }" class="rankListItem">
      <img src="../../public/imgZip/HomePageImg/HomePageImgP2.png" class="ListImg" alt="HomePageImgP2">
    </RouterLink>
    <RouterLink :to="{ path: '/products', query: { flavor: '禮盒' } }" class="rankListItem">
      <img src="../../public/imgZip/HomePageImg/HomePageImgP3.png" class="ListImg" alt="HomePageImg3">
    </RouterLink>
  </div>



  <!-- 標語大圖 -->
  <RouterLink to="products" >
    <div class="pic">
      <img class="HomePagePic" src="../../public/imgZip/HomePageImg/HomePageImgBig.png" alt="" ref="images">
    </div>
  </RouterLink>
  <div class="rankList">
    <div class="rankListTitle">選擇多樣化</div>
    <div class="line"></div>
  </div>

  <!-- 選擇多樣化 -->
  <div class="imgGallery" >
    <div v-for="(item, index) in imgArray" :key="index" class="imgItem" @click="navigateToProduct(({ 
         keyword: item.keyword || '', 
         flavor: item.flavor || '', 
         category: item.categories || '' 
     }))">
      <img :src="item.imageUrl" alt="Image" class="ImgGalleryItems" ref="images" />
    </div>
  </div>

  <!-- 甜點師的話 -->
  <RouterLink class="sayingContainer" to="products">
    <div class="saying">
      <div class="sayingImgContainer">
        <img class="sayingImg" src="../../public/imgZip/HomePageImg/HomePageMadelein.png" alt="Madelein" />
      </div>
      <div class="sayingTextCotainer">
        <img class="sayingText" src="../../public/imgZip/HomePageImg/saying.png" alt="saying" ref="images" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
    /* 向下位移一點增加動態效果 */
  }

  to {
    opacity: 1;
    transform: translateY(0);
    /* 完全顯示時不位移 */
  }
}

.ImgGalleryItems,
.ListImg,
.sayingText {
  opacity: 0;
  /* 初始隱藏 */
  transform: translateY(20px);
  /* 初始位置稍微向下移動 */
  transition: opacity 1s ease, transform 1s ease;
  /* 過渡效果 */
  cursor: pointer;
}

.fadeIn {
  opacity: 1;
  /* 當添加動畫 class 時，圖片逐漸顯示 */
  transform: translateY(0);
  /* 回到初始位置 */
}








.carousel-item {
  height: 40vw;
}

.rankList {
  color: #32435F;
  margin-top: 5%;
  text-align: center;
}

.rankListTitle {
  font-size: 200%;
  font-weight: bold;
}

.line {
  height: 2px;
  background-color: rgba(50, 67, 95, 0.5);
  width: 50%;
  margin: 5px 0 20px 0;
  display: inline-block;
}

.rankListImg {
  display: flex;
  width: 100%;
  height: 25vw;
  justify-content: center;
  gap: 3%;
  object-fit: contain;
}

.rankListItem:hover {
  transform: scale(1.05);
  opacity: 0.7;
}

.ListImg {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.pic {
  color: white;
  width: 100%;
  height: 40vw;
  text-align: center;
  align-content: center;
  margin-top: 3vw;
  background-color: #A67F78;
  justify-content: center;
}

.pic-container {
  padding: 10px 100px;
}

.pics {
  color: white;
  text-align: center;
  align-content: center;
  background-color: #A67F78;
  margin: 10px;
  height: 20vw;
  background-image: url("../../public/imgZip/Sample/Isa_2.jpg");
  background-size: cover;
  background-position: center;
}

.HomePagePic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imgGallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2%;
  margin: 1% 5%;
}

.imgItem {
  display: flex;
  justify-content: center;
  flex: 1 1 calc(23%);
  box-sizing: border-box;
}

.ImgGalleryItems {
  width: 100%;
  height: auto;
  margin-bottom: 9%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.ImgGalleryItems:hover {
  transform: scale(1.05);
  opacity: 0.7;
}

.sayingContainer {
  display: flex;
  width: 100%;
  height: 25vw;
  margin-top: 3%;
  margin-bottom: 5%;
  justify-content: center;
  justify-items: center;
}

.saying {
  width: 90%;
  display: flex;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
}

.sayingImgContainer {
  flex: 0 0 40%;
}

.sayingImg {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px 0px 0px 10px;
}

.sayingTextCotainer {
  padding: 3%;
  flex: 0 0 60%;
}

.sayingText {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {

  .rankListTitle {
    font-size: 150%;
  }

  .line {
    width: 60%;
  }

  .pic {
    height: 50vw;
  }

}

@media (max-width: 576px) {

  .rankListTitle {
    font-size: 150%;
    margin-top: 10%;
  }

  .line {
    width: 70%;
  }

  .rankListImg {
    height: fit-content;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin-bottom: 10%;
  }

  .pic {
    height: 65vw;
    background-position: center;
    /* padding-left: 50%; */
  }

  .imgGallery {
    gap: 0;
  }

  .imgItem {
    flex: 1 1 calc(49%);
    padding: 1%;
  }

  .sayingContainer {
    flex-direction: column;
    height: fit-content;
    align-items: center;
  }

  .saying {
    flex-direction: column;
  }

  .sayingImg {
    border-radius: 10px 10px 0px 0px;
  }

  .sayingTextContainer {
    padding: 5%;
  }

  .sayingText {
    border-radius: 0px 0px 10px 10px;
    padding: 3%;
  }

}
</style>

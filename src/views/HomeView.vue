<script setup>
import { ref } from 'vue';

const imgArray = ref([
  { imageUrl: '../../public/imgZip/HomePageImg/Img1.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img2.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img3.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img4.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img5.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img6.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img7.png' },
  { imageUrl: '../../public/imgZip/HomePageImg/Img8.png' }
]);

</script>

<template>

  <!-- Carousel -->
  <div id="demo" class="carousel slide" data-bs-ride="carousel">

    <div class="carousel-indicators">
      <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
    </div>

    <div class="carousel-inner">
      <RouterLink to="products">
      <div class="carousel-item active">
        <img src="../../public/imgZip/HomePageCarousel/carousel1.png" alt="perform1" class="d-block" style="width:100%">
      </div>
    </RouterLink>
    <RouterLink to="products">
      <div class="carousel-item">
        <img src="../../public/imgZip/HomePageCarousel/carousel2.png" alt="perform2" class="d-block" style="width:100%">
      </div>
    </RouterLink>
    <RouterLink to="products">
      <div class="carousel-item">
        <img src="../../public/imgZip/HomePageCarousel/carousel3.png" alt="perform3" class="d-block" style="width:100%">
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
    <RouterLink to="products"  class="rankListItem">
    <img src="../../public/imgZip/HomePageImg/HomePageImgP1.png" class="ListImg" alt="HomePageImgP1">
    </RouterLink>
    <RouterLink to="products"  class="rankListItem">
     <img src="../../public/imgZip/HomePageImg/HomePageImgP2.png" class="ListImg" alt="HomePageImgP2"> 
    </RouterLink>
    <RouterLink to="products"  class="rankListItem">
     <img src="../../public/imgZip/HomePageImg/HomePageImgP3.png" class="ListImg" alt="HomePageImg3">
    </RouterLink>
   </div>
    
    

  <!-- 標語大圖 -->
  <RouterLink to="products">
  <div class="pic">
    <img class="HomePagePic" src="../../public/imgZip/HomePageImg/HomePageImgBig.png" alt="">
  </div>
</RouterLink>
  <div class="rankList">
    <div class="rankListTitle">選擇多樣化</div>
    <div class="line"></div>
  </div>

  <!-- 選擇多樣化 -->
  <RouterLink class="imgGallery" to="products">
    <div v-for="(item, index) in imgArray" :key="index" class="imgItem">
      <img :src="item.imageUrl" alt="Image" class="ImgGalleryItems" />
    </div>
  </RouterLink>

  <!-- 甜點師的話 -->
  <RouterLink class="sayingContainer">
    <div class="saying">
      <div class="sayingImgContainer">
        <img class="sayingImg" src="../../public/imgZip/HomePageImg/HomePageMadelein.png" alt="Madelein">
      </div>
      <div class="sayingTextCotainer">
        <img class="sayingText" src="../../public/imgZip/HomePageImg/saying.png" alt="">
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
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
    align-items: center ;
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

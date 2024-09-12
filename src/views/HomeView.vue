<script setup>

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
      <div class="carousel-item active">
        <img src="../../public/imgZip/Sample/Isa_1 (1).jpg" alt="perform1" class="d-block" style="width:100%">
      </div>
      <div class="carousel-item">
        <img src="../../public/imgZip/Sample/Isa_2.jpg" alt="perform2" class="d-block" style="width:100%">
      </div>
      <div class="carousel-item">
        <img src="../../public/imgZip/Sample/Isa_3.jpg" alt="perform3" class="d-block" style="width:100%">
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>

  <div class="rankList">
    <h3 class="rankListTitle">人氣排行榜</h3>
    <div class="line"></div>
  </div>

  <div class="popular">
    <div class="card" style="width:30%">
      <img class="card-img-top" src="../../public/imgZip/Sample/apple pie.jpg" alt="Card image" style="width:100%">
      <div class="card-body">
        <h4 class="card-title">yummy</h4>
      </div>
    </div>
    <div class="card" style="width:30%">
      <img class="card-img-top" src="../../public/imgZip/Sample/cheeseCake.jpg" alt="Card image" style="width:100%">
      <div class="card-body">
        <h4 class="card-title">yummy</h4>
      </div>
    </div>
    <div class="card" style="width:30%">
      <img class="card-img-top" src="../../public/imgZip/Sample/cranberry scone.jpg" alt="Card image" style="width:100%">
      <div class="card-body">
        <h4 class="card-title">yummy</h4>
      </div>
    </div>
  </div>

  <div class="pic">
    Bunny Sugar<br />
    甜蜜 | 美味 | 細膩
  </div>

  <div class="rankList">
    <h3 class="rankListTitle">選擇多樣化</h3>
    <div class="line"></div>
  </div>

  <div class="container-fluid pic-container w-100">
    <div class="row">
      <div class="col p-3 pics">Introduction</div>
      <div class="col p-3 pics">Introduction</div>
      <div class="col p-3 pics">Introduction</div>
      <div class="col p-3 pics">Introduction</div>
    </div>
    <div class="row">
      <div class="col p-3 pics">Introduction</div>
      <div class="col p-3 pics">Introduction</div>
      <div class="col p-3 pics">Introduction</div>
      <div class="col p-3 pics">Introduction</div>
    </div>
  </div>

  <div class="container-fluid text-container w-100">
  <div class="row">
    <div class="col-sm-8 texts">text</div>
    <div class="col-sm-4 texts text-img"></div>
  </div>
</div>



</template>

<style scoped>
.carousel-item {
  height: 35vw;
}

.rankList {
  color: #32435F;
  margin-top: 3vw;
  text-align: center;
}

.line {
  height: 2px;
  background-color: #32435F;
  width: 30%;
  margin: 5px 0;
  display: inline-block;
}

.popular {
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
  padding: 10px 100px;
  text-align: center;
}

.pic {
  color: white;
  width: 100%;
  height: 30vw;
  text-align: center;
  align-content: center;
  margin-top: 3vw;
  background-image: url("../../public/imgZip/Sample/cakes2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
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

.text-container {
  padding: 20px 30px;

}

.texts {
  color: #32435F;
  text-align: center;
  align-content: center;
  background-color: white;
  height: 20vw;
  
}

.text-img {
  background-image: url("../../public/imgZip/Sample/Isa_2.jpg");
  background-size: cover;
  background-position: center;
}

</style>

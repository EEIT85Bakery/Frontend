<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import Collapse from 'bootstrap/js/dist/collapse';

import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

let advertisement = ref({
    ad: "萬聖節活動開跑，凡購買極選可可系列之商品，皆可獲得購物折價券"
});


let isAdVisible = ref(true);


let closeAd = function () {
    isAdVisible.value = false;
}

</script>

<template>

    <nav class="NavBar w-100 sticky-top">

        <div v-if="isAdVisible" class="Ad">
            {{ advertisement.ad }}
            <i class="bi bi-x closeAd" @click="closeAd"></i>
        </div>

        <div class="container-fluid">
            <div class="body w-100 fixed-top">
                <RouterLink class="nav-item nav-link" to="/">
                    <img src="../../public/imgZip/Logo/logo.png" alt="Logo" class="logo">
                </RouterLink>
            </div>
            <div class="head w-100">
                <form class="d-flex" role="search">
                    <input class="form-control" type="search" placeholder="找商品">
                    <button class="btn" type="submit"><i class="bi bi-search"></i></button>
                </form>
                <!-- 會員圖標 -->
                <RouterLink class="navHead-item nav-link" to="/">
                    <i class="bi bi-person"></i>
                </RouterLink>
                <!-- 購物車圖標 -->
                <RouterLink class="navHead-item nav-link" to="/">
                    <i class="bi bi-bag"></i>
                </RouterLink>
            </div>
        </div>

        <div class="foot w-100">
                <RouterLink class="nav-item nav-link" to="/">關於我們</RouterLink>
                <RouterLink class="nav-item nav-link" to="/">最新消息</RouterLink>
                <RouterLink class="nav-item nav-link" to="products">商品列表</RouterLink>
                <RouterLink class="nav-item nav-link" to="/">門市資訊</RouterLink>
                <RouterLink class="nav-item nav-link" to="/">常見問題</RouterLink>
            </div>
    </nav>

</template>

<style scoped>
.Ad {
    color: white;
    background-color: rgba(143, 134, 129, 0.8); /* #8F8681(80%) */
    width: 100%;
    padding: 5px;
    top: 0;
    position: sticky;
    text-align: center;
}

.closeAd {
    position: fixed;
    right: 1.5%;
    cursor: pointer;
    z-index: 1000;
}

nav {
    top: 0;
    position: sticky;
    background-color: white;
}

.head {
    color: #32435F;
    display: flex;
    justify-content: flex-end;
    right: 5%;
    z-index: 1000;
}

.navHead-item {
    transform: scale(1.5);
    margin-left: 1%;
    padding: 10px;
}

.form-control {
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid black;
    background-color: transparent;
    height: fit-content;
}

.body {
    display: flex;
    justify-content: center;
    height: 8vw;
    margin-top: 0;
    background-color: transparent;
    padding-top: 55px;
    z-index: 1;
}

.logo {
    height: 8vw;
}

.foot {
    display: flex;            
    flex-wrap: wrap;         
    justify-content: center; 
    align-items: center;  
    color: #32435F;  
    /* font-weight: bold; */
    background-color: rgba(225, 220, 217, 0.3); /* #E1DCD9(30%) */
    padding: 10px; 
    margin-top: 90px;
}

.nav-item {
    padding: 0px 30px;
}

.nav-link {
    cursor: pointer;
}

</style>
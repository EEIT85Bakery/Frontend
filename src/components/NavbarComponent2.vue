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

        <!-- 廣告訊息 -->
        <div v-if="isAdVisible" class="Ad">
            {{ advertisement.ad }}
            <i class="bi bi-x closeAd" @click="closeAd"></i>
        </div>

        <!-- 導覽列 -->
        <div class="d-inline-flex w-100 flexContainer">
            <div class="flexItemLogo">
                <RouterLink class="nav-link" to="/">
                    <img src="../../public/img/Logo/logo.png" alt="Logo" class="logo">
                </RouterLink>
            </div>
            <div class="flexItem">
                <RouterLink class="nav-link" to="/">關於我們</RouterLink>
            </div>
            <div class="flexItem">
                <RouterLink class="nav-link" to="/">最新消息</RouterLink>
            </div>
            <div class="flexItem">
                <RouterLink class="nav-link" to="products">商品列表</RouterLink>
            </div>
            <div class="flexItem">
                <RouterLink class="nav-link" to="/">門市資訊</RouterLink>
            </div>
            <div class="flexItem">
                <RouterLink class="nav-link" to="/">常見問題</RouterLink>
            </div>
            <div class="flexItemFind">
                <form class="d-flex" role="search">
                    <input class="form-control flexInput" type="search" placeholder="找商品">
                    <button class="btn flexItemSearch" type="submit"><i class="bi bi-search"></i></button>
                </form>
            </div>
                
            <div class="flexItemIcon">
                <!-- 會員圖標 -->
                <RouterLink class="nav-link" to="login">
                    <i class="bi bi-person"></i>
                </RouterLink>
            </div>
            <div class="flexItemCart">
                <!-- 購物車圖標 -->
                <RouterLink class="nav-link" to="/">
                    <i class="bi bi-bag"></i>
                </RouterLink>
            </div>
                
            </div>


        <!-- <div class="NavBody w-100 fixed-top">
                <RouterLink class="nav-link" to="/">
                    <img src="../../public/img/Logo/logo.png" alt="Logo" class="logo">
                </RouterLink>
            </div> -->
        <!-- <div class="NavHead w-100">
            <form class="d-flex" role="search">
                <input class="form-control" type="search" placeholder="找商品">
                <button class="btn" type="submit"><i class="bi bi-search"></i></button>
            </form> -->
            <!-- 會員圖標 -->
            <!-- <RouterLink class="navHead-item nav-link" to="/">
                <i class="bi bi-person"></i>
            </RouterLink> -->
            <!-- 購物車圖標 -->
            <!-- <RouterLink class="navHead-item nav-link" to="/">
                <i class="bi bi-bag"></i>
            </RouterLink>
        </div> -->

        <!-- <div class="NavFoot w-100">
            <RouterLink class="nav-link" to="/">關於我們</RouterLink>
            <RouterLink class="nav-link" to="/">最新消息</RouterLink>
            <RouterLink class="nav-link" to="products">商品列表</RouterLink>
            <RouterLink class="nav-link" to="/">門市資訊</RouterLink>
            <RouterLink class="nav-link" to="/">常見問題</RouterLink>
        </div> -->
    </nav>

</template>

<style scoped>
.Ad {
    color: white;
    background-color: rgba(143, 134, 129, 0.8);
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

.logo {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.flexContainer {
    color: #32435F;
    /* font-weight: bold; */
    background-color: white;
    text-align: center;
    align-items: center;
    align-content: stretch;
    padding: 1%;
}

.flexItem {
    flex: 0 0 12%;
}

.flexItemLogo {
    object-fit: contain;
    flex: 0 0 15%;
}

.flexItemFind {
    flex: 0 0 10%;
}

.flexInput {
    flex: 0 0 100%;
}

.flexItemSearch {
    flex: 0 0 5%;
}

.flexItemIcon {
    flex: 0 0 10%;
}
.flexCart {
    flex: 0 0 10%;
}

/* nav {
    top: 0;
    position: sticky;
    background-color: white;
}

.NavHead {
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

.NavBody {
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

.NavFoot {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    color: #32435F;
    background-color: rgba(225, 220, 217, 0.3);
    padding: 10px;
    margin-top: 90px;
}

.{
    padding: 0px 30px;
}

.nav-link {
    cursor: pointer;
} */
</style>
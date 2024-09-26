<script setup>
// import { useCartStore } from '@/stores/cartStore';
// import { computed, onMounted } from 'vue';

// 使用 cartStore
// const cartStore = useCartStore();

// 計算購物車中的商品數量
// const carts = computed(() => cartStore.carts);

// 組件加載時，獲取購物車數據
// onMounted(() => {
//   cartStore.getCart();
// });

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

</script>


<template>





    <nav class="navbar navbar-expand-lg sticky-top">

        <div class="nabarAd">
            我是廣告我是廣告我是廣告我是廣告我是廣告我是廣告我是廣告我是廣告
        </div>

        <div class="navbarContainer container-fluid d-flex">


            <RouterLink class="navbarBrand" to="/">
                <img src="../../public/imgZip/Logo/logo.png" alt="navbarLogo" class="navbarLogo">
            </RouterLink>

            <button class="navbarToggler navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon icon-large"></span>
            </button>

            <div class="navbarSupportedContent collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto">
                    <div class="lineContainer">
                        <div class="line"></div>
                    </div>
                    <li class="navItem">
                        <RouterLink class="navLink" to="product">關於我們</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="customerInformation">最新消息</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="products">商品列表</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="cartTest">門市資訊</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="addTest">常見問題</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="wishList">我的收藏</RouterLink>
                    </li>
                </ul>
                <div class="lineContainer">
                    <div class="line"></div>
                </div>

                <div class="navbarIconContainer d-flex ms-auto">
                    <div class="navbarSearchContainer">
                        <form class="d-flex" role="search">
                            <!-- <input class="navbarSearchInput" type="search" placeholder="找商品"> -->
                            <button class="btn" type="submit">
                                <i class="navbarIcon navbarSearchIcon bi bi-search"></i>
                            </button>
                        </form>
                    </div>
                    <RouterLink to="login">
                        <i class="navbarIcon bi bi-person-fill"></i>
                    </RouterLink>
                    <RouterLink to="cart">
                        <i class="navbarIcon bi bi-cart4"></i>



                        <span class="cartCount"></span>
                    </RouterLink>
                </div>

            </div>

        </div>
    </nav>

    <RouterLink to="backProducts">
        <div class="mangerContainer">
            <i class="bi bi-gear-fill"></i>
        </div>
    </RouterLink>

    <RouterLink to="game">
        <div class="gameContainer">
            <i class="bi bi-controller"></i>
        </div>
    </RouterLink>

    <div>
        <div class="goTopContainer" @click="scrollToTop">
            <i class="bi bi-arrow-up-circle-fill goTopIcon"></i>
        </div>
    </div>


</template>


<style scoped>
.nabarAd {
    font-size: small;
    padding: 0.2%;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 0;
    /* z-index: 1500; */
    color: white;
    background-color: rgba(143, 134, 129, 0.8);
}


.navbarContainer {
    margin-top: -8px;
    padding: 2.5% 2% 1% 2%;
    align-items: stretch;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.navbarBrand {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 100%;
}

.navbarLogo {
    max-width: 100%;
    max-height: 100%;
    height: auto;
}

.navbarSupportedContent {
    color: #32435F;
    justify-content: space-evenly;
    padding-left: 1%;
}

.navItem {
    font-weight: bold;
    margin: auto 1.5rem;
}

.navLink {
    color: #32435F;
    text-decoration: none;
}

.navLink:focus {
    color: rgba(166, 127, 120, 1);
    text-decoration: underline;
}

.navLink:hover {
    color: rgba(166, 127, 120, 1);
    text-decoration: underline;
}

.dropdownMenuContainer {
    text-align: center;
    border: rgba(143, 134, 129, 0.1) solid 1px;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    padding: 15% 0;
}

.dropdownItem {
    color: rgba(50, 67, 95, 0.5);
    text-decoration: none;
}

.line {
    height: 0.5px;
    background-color: rgba(143, 134, 129, 0.5);
    width: 80%;
    margin: 10px 0;
}


.navbarIconContainer {
    width: 20%;
    justify-content: space-evenly;
    align-items: center;
}

.navbarIcon {
    color: rgba(50, 67, 95, 0.7);
    font-size: 1.7rem;
    cursor: pointer;
}

.navbarIcon:hover {
    opacity: 0.7;
}

.navbarSearchIcon {
    font-size: 1.3rem;
    -webkit-text-stroke: 0.5px;
}

.navbarToggler {
    color: #32435F;
    border: 0;
}

.gameContainer {
    position: fixed;
    bottom: 10%;
    right: 2%;
    color: rgba(255, 255, 255, 1);
    /* color: rgba(166, 127, 120, 1); */
    z-index: 2000;
    font-size: 3vw;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    /* background-color: rgba(255, 255, 255, 0.8); */
    border-radius: 50px;
    /* padding: 0 0.8%; */
}

.mangerContainer {
    position: fixed;
    bottom: 18%;
    right: 2%;
    color: rgba(255, 255, 255, 1);
    /* color: rgba(166, 127, 120, 1); */
    z-index: 2000;
    font-size: 3vw;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    /* background-color: rgba(255, 255, 255, 0.8); */
    border-radius: 50px;
    /* padding: 0 0.8%; */
}

.goTopContainer {
    position: fixed;
    bottom: 2%;
    right: 2%;
    color: rgba(255, 255, 255, 0.8);
    /* color: rgba(143, 134, 129, 0.5); */
    z-index: 2000;
    font-size: 3vw;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}

@media (max-width: 768px) {
    .navbarBrand {
        width: 30%;
        margin: 1%;
    }

    .navbarIconContainer {
        width: 40%;
        margin-right: 2%;
        justify-content: space-evenly;
        align-items: center;
    }

    .navItem {
        font-weight: bold;
        margin-top: 2%;
        margin-bottom: 2%;
    }

    .line {
        height: 0.5px;
        background-color: rgba(143, 134, 129, 0.5);
        width: 100%;
        margin: 10px 0;
    }

    .gameContainer,
    .goTopContainer {
        font-size: 5vw;
        right: 3%;
    }
}

@media (max-width: 576px) {

    .gameContainer,
    .goTopContainer {
        font-size: 7vw;
        right: 3%;
    }
}
</style>
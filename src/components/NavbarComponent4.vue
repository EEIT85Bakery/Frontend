<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false); // 用來控制菜單的狀態
const router = useRouter();
const keyword = ref('');

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value; // 切換狀態
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 抓取關鍵字並跳轉至商品頁
const handleSearch = () => {
    if (keyword.value) {
        console.log(`Navigating to products with keyword: ${keyword.value}`);
        router.push({ path: 'products', query: { keyword: keyword.value } });
    } else {
        console.log('Navigating to products without keyword');
        router.push({ path: 'products' });
    }

    keyword.value = '';
}


</script>


<template>

    <nav class="navbar navbar-expand-lg sticky-top w-100">


        <!-- <nav class="navbar navbar-expand-lg sticky-top"> -->
            <div class="navbarAd">
                    <div>
                        <i class="bi bi-megaphone me-2"></i>
                        <span>「您記不住的，Bunny Sugar幫你記住」，趕緊加入會員，前往會員中心
                            <RouterLink to="anniversary" style="color: white; font-weight: bold;">紀念日專區</RouterLink>
                            寫下屬於您的日子吧！
                        </span>
                    </div>
            </div>
        <!-- </nav> -->

        <div class="navbarContainer container-fluid d-flex">


            <RouterLink class="navbarBrand" to="/">
                <img src="../../public/imgZip/Logo/logo.png" alt="navbarLogo" class="navbarLogo">
            </RouterLink>

            <button class="navbarToggler navbar-toggler" type="button" @click="toggleMenu">
                <span class="navbar-toggler-icon icon-large"></span>
            </button>

            <div class="navbarSupportedContent collapse navbar-collapse" id="navbarSupportedContent"
                :class="{ show: isMenuOpen }">
                <ul class="navbar-nav ms-auto">
                    <div class="lineContainer">
                        <div class="line"></div>
                    </div>
                    <li class="navItem">
                        <RouterLink class="navLink" to="aboutUs" @click="toggleMenu">關於我們</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="theLastestNews" @click="toggleMenu">最新消息</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="products" @click="toggleMenu">商品列表</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="shopInformation" @click="toggleMenu">門市資訊</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="question" @click="toggleMenu">常見問題</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="wishList" @click="toggleMenu">我的收藏</RouterLink>
                    </li>
                </ul>
                <div class="lineContainer">
                    <div class="line"></div>
                </div>

                <div class="navbarIconContainer d-flex ms-auto">
                    <div class="navbarSearchContainer">
                        <form class="d-flex" role="search" @submit.prevent="handleSearch">
                            <input v-model="keyword" class="navbarSearchInput" type="search" placeholder="找商品">
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
.navbarAd {
    font-size: small;
    padding: 0.5%;
    text-align: center;
    width: 100%;
    position: fixed;
    top: 0;
    color: white;
    background-color: rgba(143, 134, 129, 0.9);
}

.navbarContainer {
    width: 100%;
    margin-top: -10px;
    padding: 3.5% 2% 1% 2%;
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
    text-align: center;
    font-size: medium;
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

.navbarToggler:focus {
    outline: none;
    /* 去除焦點輪廓 */
    box-shadow: none;
    /* 去除盒子陰影 */
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

.navbarSupportedContent {
    /* 默認隱藏 */
    display: none;
}

.navbarSupportedContent.show {
    display: block;
    /* 顯示選單 */
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

    .navbarContainer {
        margin-top: -3px;
    }

}

@media (max-width: 576px) {

    .gameContainer,
    .goTopContainer {
        font-size: 7vw;
        right: 3%;
    }

    .navbarContainer {
        margin-top: 2px;
    }

    .navbarAd {
        font-size: smaller;
    }
}
</style>
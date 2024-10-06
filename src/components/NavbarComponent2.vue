<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false); // 用來控制菜單的狀態
const router = useRouter();
const keyword = ref('');


onMounted(() => {
    const offcanvasElement = document.getElementById('offcanvasRight');

    const removeBackdrop = () => {
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    };

    offcanvasElement.addEventListener('hidden.bs.offcanvas', removeBackdrop);

    onUnmounted(() => {
        offcanvasElement.removeEventListener('hidden.bs.offcanvas', removeBackdrop);
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const handleMemberClick = () => {
  const userRole = localStorage.getItem('user');

  if (userRole === 'ADMIN') {
    // 如果是 ADMIN，跳轉到後台首頁
    router.push({ path: '/admin' });
  } else if (userRole === 'USER') {
    // 如果是 USER，跳轉到會員資訊頁面
    router.push({ path: '/customerInformation' });
  } else {
    // 如果沒有這個欄位，則跳轉回登入頁面
    router.push({ path: '/login' });
  }
};

// 切換菜單狀態
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value; // 切換狀態
};

// 根據關鍵字進行商品查詢並跳轉到商品頁面
const handleSearch = () => {
    if (keyword.value) {
        console.log(`Navigating to products with keyword: ${keyword.value}`);
        router.push({ 
            path: '/products', 
            query: { keyword: keyword.value, t: Date.now() } 
        });
    } else {
        console.log('Navigating to products without keyword');
        router.push({ 
            path: '/products',
            query: { t: Date.now() }
        });
    }

    keyword.value = '';
};

// 回到全商品頁面並清空篩選條件
const goToProducts = () => {
    keyword.value = ''; 
    router.push({
        path: '/products',
        query: { t: Date.now() }
    });
    toggleMenu();
};



</script>

<template>
    <div class="navBar">
        <div class="AdContainer">
            <span class="Ad">「您記不住的，Bunny Sugar幫你記住」，趕緊加入會員，</span><span>前往會員中心
                <RouterLink to="anniversary" style="color: white; font-weight: bold;">紀念日專區</RouterLink>
                寫下屬於您的日子吧！
            </span>
        </div>

        <div class="navBarContainer">
            <div class="logoContainer">
                <RouterLink to="/">
                    <img src="../../public/imgZip/Logo/logo.png" alt="logo" class="logo" />
                </RouterLink>
            </div>

            <!-- 大於768px -->
            <div class="navItemsContainer">
                <RouterLink class="navItem" to="AboutUs">
                    <div>關於我們</div>
                </RouterLink>
                <RouterLink class="navItem" to="theLastestNews">
                    <div>最新消息</div>
                </RouterLink>
                <RouterLink class="navItem" to="products" @click="goToProducts">
                    <div>商品列表</div>
                </RouterLink>
                <RouterLink class="navItem" to="shopInformation">
                    <div>門市資訊</div>
                </RouterLink>
                <RouterLink class="navItem" to="question">
                    <div>常見問題</div>
                </RouterLink>
                <RouterLink class="navItem" to="wishList">
                    <div>我的收藏</div>
                </RouterLink>
            </div>

            <div class="navIconsContainer">
                <form class="searchContainer" @submit.prevent="handleSearch">
                    <input v-model="keyword" type="search" class="searchInput" placeholder="找商品" />
                    <button type="submit" class="searchBtnContainer">
                        <i class="bi bi-search searchBtn"></i>
                    </button>
                </form>

                <RouterLink class="memberContainer" to="#" @click.prevent="handleMemberClick">
                    <i class="bi bi-person-fill memberBtn"></i>
                </RouterLink>

                <RouterLink class="cartContainer" to="cart">
                    <i class="bi bi-cart4 cartBtn"></i>
                </RouterLink>
            </div>

            <!-- 小於768PX -->
            <button class="offcanvasBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">
                <i class="bi bi-list"></i>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header offHeader">
                    <h5 class="offcanvas-title offTitle" id="offcanvasRightLabel">Menu</h5>
                    <button type="button" class="btn-close closeBtn" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">

                    <div class="navIconsContainerOff">
                        <form class="searchContainerOff" @submit.prevent="handleSearch">
                            <input v-model="keyword" type="search" class="searchInputOff" placeholder="找商品" />
                            <button type="submit" class="searchBtnContaineOff">
                                <i class="bi bi-search searchBtn"></i>
                            </button>
                        </form>

                        <div class="navItemsContainerOff">
                            <RouterLink class="navItemOff" to="AboutUs">
                                <div>關於我們</div>
                            </RouterLink>
                            <hr />
                            <RouterLink class="navItemOff" to="theLastestNews">
                                <div>最新消息</div>
                            </RouterLink>
                            <hr />
                            <RouterLink class="navItemOff" to="products" @click="goToProducts">
                                <div>商品列表</div>
                            </RouterLink>
                            <hr />
                            <RouterLink class="navItemOff" to="shopInformation">
                                <div>門市資訊</div>
                            </RouterLink>
                            <hr />
                            <RouterLink class="navItemOff" to="question">
                                <div>常見問題</div>
                            </RouterLink>
                            <hr />
                            <RouterLink class="navItemOff" to="wishList">
                                <div>我的收藏</div>
                            </RouterLink>
                            <hr />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>

    <RouterLink to="backProducts">
        <div class="mangerContainer">
            <i class="bi bi-gear-fill fixIcon"></i>
        </div>
    </RouterLink>

    <RouterLink to="game">
        <div class="gameContainer">
            <i class="bi bi-controller fixIcon"></i>
        </div>
    </RouterLink>

    <div>
        <div class="goTopContainer" @click="scrollToTop">
            <i class="bi bi-arrow-up-circle-fill goTopIcon fixIcon"></i>
        </div>
    </div>

</template>

<style scoped>
.offcanvasBtn {
    display: none;
}

@media (max-width: 768px) {

    .navBarContainer {
        padding: 0.5% 2%;
    }

    .Ad {
        font-size: xx-small;
        display: none;
    }

    .offHeader {
        padding: 3% 5%;
    }

    .offTitle {
        color: rgba(166, 127, 120, 1);
        font-weight: bolder;
    }

    .closeBtn {
        font-size: small;
        color: rgba(50, 67, 95, 0.3);
    }

    .offcanvasBtn {
        display: block;
        border: rgba(50, 67, 95, 0.2) solid 1px;
        font-size: medium;
        background-color: transparent;
        color: rgba(50, 67, 95, 1);
    }

    .navItem {
        display: none;
    }

    .searchInput {
        display: none;
    }

    .searchBtnContainer {
        display: none;
    }

    .memberBtn {
        font-size: x-large;
        margin-right: 50%;
    }

    .cartBtn {
        font-size: x-large;
        margin-right: 5%;
    }

    .searchContainerOff {
        display: flex;
        justify-content: end;
        margin-bottom: 10%;
    }

    .searchInputOff {
        border: 0;
        border-bottom: rgba(50, 67, 95, 0.7) solid 1px;
    }

    .searchInputOff::placeholder {
        color: rgba(50, 67, 95, 0.5);
        font-size: small;
    }

    .searchBtnContaineOff {
        color: rgba(50, 67, 95, 0.7);
        font-size: x-large;
        border: none;
        background-color: transparent;
    }

    .searchInputOff:focus {
        outline: none;
    }

    .navItemsContainerOff {
        text-align: center;
    }

    .navItemOff {
        color: rgba(50, 67, 95, 1);
        text-decoration: none;
        font-weight: bold;
    }

    .navItemOff:hover {
        color: rgba(166, 127, 120, 1);
        text-decoration: underline;
    }

    .fixIcon {
        font-size: x-large;
    }

}


.navBar {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.AdContainer {
    color: white;
    text-align: center;
    font-size: small;
    padding: 0.5%;
    background-color: rgba(143, 134, 129, 1);
}

.navBarContainer {
    display: flex;
    width: 100%;
    align-items: center;
}

.logoContainer {
    flex: 20%;
    display: flex;
    object-fit: contain;
    padding: 0.5% 1%;
}

.logo {
    width: 100%;
    height: 100%;
}

.navItemsContainer {
    flex: 60%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
    padding: 0% 2%;
    /* background-color: lightcoral; */
}

.navItem {
    color: rgba(50, 67, 95, 1);
    text-decoration: none;
}

.navItem:hover {
    text-decoration: underline;
    color: rgba(166, 127, 120, 1);
}

.navIconsContainer {
    flex: 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 2%;
}

.searchContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 60%;
}

.searchInput {
    width: 100%;
    border: none;
    background-color: transparent;
    border-bottom: rgba(50, 67, 95, 1) solid 1px;
}

.searchInput::placeholder {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
}

.searchInput:focus {
    outline: none;
}

.searchBtnContainer {
    color: rgba(50, 67, 95, 0.7);
    font-size: x-large;
    border: none;
    background-color: transparent;
}

.memberContainer,
.cartContainer {
    flex: 20%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    color: rgba(50, 67, 95, 0.7);
    font-size: xx-large;
}

.memberContainer:hover {
    opacity: 0.7;
}

.cartContainer:hover {
    opacity: 0.7;
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
</style>

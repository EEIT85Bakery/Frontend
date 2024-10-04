<script setup>


</script>

<template>
    <div class="navBar">
        <div class="AdContainer">
            <span>「您記不住的，Bunny Sugar幫你記住」，趕緊加入會員，前往會員中心
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
                <RouterLink class="navItem" to="products">
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
                <form class="searchContainer">
                    <input type="search" class="searchInput" placeholder="找商品" />
                    <button type="submit" class="searchBtnContainer">
                        <i class="bi bi-search searchBtn"></i>
                    </button>
                </form>

                <RouterLink class="memberContainer" to="login">
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
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">

                    <div class="navItemsContainer">
                        <RouterLink class="navItemOff" to="AboutUs">
                            <div>關於我們</div>
                        </RouterLink>
                        <RouterLink class="navItemOff" to="theLastestNews">
                            <div>最新消息</div>
                        </RouterLink>
                        <RouterLink class="navItemOff" to="products">
                            <div>商品列表</div>
                        </RouterLink>
                        <RouterLink class="navItemOff" to="shopInformation">
                            <div>門市資訊</div>
                        </RouterLink>
                        <RouterLink class="navItemOff" to="question">
                            <div>常見問題</div>
                        </RouterLink>
                        <RouterLink class="navItemOff" to="wishList">
                            <div>我的收藏</div>
                        </RouterLink>
                    </div>

                    <div class="navIconsContainer">
                        <form class="searchContainer">
                            <input type="search" class="searchInput" placeholder="找商品" />
                            <button type="submit" class="searchBtnContainer">
                                <i class="bi bi-search searchBtn"></i>
                            </button>
                        </form>

                        <RouterLink class="memberContainer" to="login">
                            <i class="bi bi-person-fill memberBtn"></i>
                        </RouterLink>

                        <RouterLink class="cartContainer" to="cart">
                            <i class="bi bi-cart4 cartBtn"></i>
                        </RouterLink>
                    </div>

                </div>
            </div>
        </div>





    </div>
</template>

<style scoped>
.offcanvasBtn {
    display: none;
}

@media (max-width: 768px) {
    .offcanvasBtn {
        display: block;
    }

    .navItem {
        display: none;
    }

}


.navBar {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color:  rgba(255, 255, 255, 0.9);
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
    flex: 25%;
    display: flex;
    object-fit: contain;
    padding: 0.5% 1%;
}

.logo {
    width: 100%;
    height: 100%;
}

.navItemsContainer {
    flex: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: bold;
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
    flex: 25%;
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
</style>

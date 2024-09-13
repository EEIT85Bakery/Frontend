<script setup>


</script>


<template>

    <nav class="navbar navbar-expand-lg sticky-top">
        <!-- <div class="" style="background: black;height: 50px;">1</div> -->

        <div class="navbarContainer container-fluid d-flex">
            <RouterLink class="navbarBrand" to="/">
                <img src="../../public/imgZip/Logo/logo.png" alt="navbarLogo" class="navbarLogo">
            </RouterLink>

            <!-- 漢堡選單 -->
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
                        <RouterLink class="navLink" to="/">關於我們</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="/">最新消息</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="products">商品列表</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="/">門市資訊</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="/">常見問題</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="/">我的收藏</RouterLink>
                    </li>
                </ul>
                <div class="lineContainer">
                    <div class="line"></div>
                </div>

                <div class="navbarIconContainer d-flex ms-auto">
                    <div class="nabarSearchContainer">
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
                    <div><i class="navbarIcon bi bi-cart4"></i></div>
                </div>

            </div>

        </div>
    </nav>


</template>


<style scoped>

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

/* test */
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

.navbarSearchIcon {
    font-size: 1.3rem;
    -webkit-text-stroke: 0.5px;
}

.navbarToggler {
    color: #32435F;
    border: 0;
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
}

@media (max-width: 576px) {}
</style>
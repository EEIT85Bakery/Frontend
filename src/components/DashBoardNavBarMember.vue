<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchInput = ref('');
const router = useRouter();

const searchMember = () => {
  if (searchInput.value) {
    // 使用 router.push 將電話號碼作為查詢參數傳遞
    router.push({ name: '會員管理頁面', query: { phone: searchInput.value } });
  } else {
    // 如果搜尋框為空，則移除查詢參數
    router.push({ name: '會員管理頁面' });
  }
};
</script>

<template>

    <nav class="navbar navbar-expand-lg sticky-top">

        <div class="navbarContainer container-fluid d-flex">


            <RouterLink class="navbarBrand" to="/">
                <!-- <img src="../../../public/imgZip/Logo/logo.png" alt="navbarLogo" class="navbarLogo"> -->
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
                        <RouterLink class="navLink" to="/">回到前台</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="backProducts">商品管理</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="order">訂單管理</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="AdminCoupons">折扣碼管理</RouterLink>
                    </li>
                    <li class="navItem">
                        <RouterLink class="navLink" to="AdminMembers">會員管理</RouterLink>
                    </li>
                </ul>
                <div class="lineContainer">
                    <div class="line"></div>
                </div>

                <div class="navbarIconContainer d-flex ms-auto">
                    <div class="nabarSearchContainer">
                        <form class="d-flex" role="search" @submit.prevent="searchMember">
                        <input v-model="searchInput" class="navbarSearchInput" placeholder="搜尋會員">
                        <button class="btn" type="submit">
                            <i class="navbarIcon navbarSearchIcon bi bi-search"></i>
                        </button>
                        </form>
                    </div>
      <RouterLink to="/">
        <i class="navbarIcon bi bi-box-arrow-right"></i>
      </RouterLink>
    </div>

            </div>

        </div>
    </nav>

</template>

<style>

.navbarSearchInput {
    font-size: small;
    border: 0;
    border-bottom: #32435F solid 1px;
    background-color: transparent;
    outline: none;
}

.navbarSearchInput::placeholder {
    color: rgba(50, 67, 95, 0.5);
}


.navbarContainer {
    margin-top: -8px;
    padding: 1% 2% 1% 2%;
    align-items: stretch;
    background-color: white;
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
    font-size: medium;
    color: #32435F;
    text-decoration: none;
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.navLink:focus {
    color: rgba(166, 127, 120, 1);
    text-decoration:underline;
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
    width: 30%;
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
    outline: none;
}

.btn {
    outline: none;
    border: 0;
}


.navbarToggler {
    color: #32435F;
    border: 0;
}
</style>
<script setup>
import { ref } from 'vue';

let advertisement = ref({
    ad: "萬聖節活動開跑，凡購買極選可可系列之商品，皆可獲得購物折價券"
});


let isAdVisible = ref(true);


let closeAd = function () {
    isAdVisible.value = false;
}


</script>

<template>



    <nav class="navbar navbar-expand-lg sticky-top">

        <!-- <div class="ooo w-100"> -->

            <div v-if="isAdVisible" class="navbarAd">
                <div class="navbarAdText">{{ advertisement.ad }}</div>
                <i class="bi bi-x navbarCloseAd" @click="closeAd"></i>
            </div>

            <div class="container-fluid w-100">
                <a class="navbar-brand" href="#">Bunny</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Dropdown
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        <!-- </div> -->
    </nav>

</template>

<style scoped>

.ooo {
    display: inline-flexbox;
}


.navbarAd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 0.5% 1%;
    background-color: rgba(143, 134, 129, 1);
    color: white;
    text-align: center;
    font-size: small;
}

.navbarAdText {
    margin: auto;
    padding-left: 5%;
}

.navbarCloseAd {
    width: 1.5%;
    object-fit: contain;
    cursor: pointer;
}
</style>
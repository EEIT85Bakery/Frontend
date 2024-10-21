<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import { Carousel } from 'bootstrap';

const isLoading = ref(true);

const route = useRoute();

const startLoading = () => {
    setTimeout(() => {
        isLoading.value = false;
    }, 400);
};

watch(route, () => {
    isLoading.value = true;
    startLoading();
});

onMounted(() => {
    isLoading.value = true;
    startLoading();

    const carouselElement = document.getElementById('demo');
    if (carouselElement) {
        const carousel = new Carousel(carouselElement, {
            interval: 3000,
            ride: 'carousel'
        });
    }

});

</script>

<template>

    <div class="imgContainer">
        <img src="../../public/imgZip/header/shopInfoheader.png" alt="header" class="headerImg">
    </div>

    <div class="wholeContainer">

        <Loading v-if="isLoading" />

        <div class="carouselContainer">
            <!-- Carousel -->
            <div id="demo" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../../public/imgZip/shop/cafeShop.webp" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="../../public/imgZip/shop/shop_1.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="../../public/imgZip/shop/shop_4.jpg" class="d-block w-100" alt="...">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>

        <!-- information -->
        <div class="informationContainer">
            <div class="infoTitle">實體門市</div>
            <div class="infoText">
                <span><i class="bi bi-telephone-fill me-2"></i></span>
                <span>04 - 2326 - 5860</span>
            </div>
            <div class="infoText">
                <span><i class="bi bi-geo-alt-fill me-2"></i></span>
                <span>408台中市南屯區公益路二段51號18樓</span>
            </div>

            <hr />

            <div class="infoText">
                <div class="openTimeTitle">
                    <span><i class="bi bi-calendar-fill me-2"></i></span>
                    <span>營業時間</span>
                </div>
                <div class="openTimeTW"><span>週ㄧ至週日</span></div>
                <div class="openTime"><span>Monday - Sunday</span><span>00:00 - 24:00</span></div>

                <hr />

                <div class="openTimeTitle">
                    <span><i class="bi bi-bag-fill me-2"></i></span>
                    <span>取貨時間</span>
                </div>
                <div class="openTimeTW"><span>週ㄧ至週日</span></div>
                <div class="openTime"><span>Monday - Sunday</span><span>24小時開放取貨</span></div>

                <hr />

                <div style="color: rgba(143, 134, 129, 1);">
                    <i class="bi bi-bell-fill me-2"></i>
                    <span>每月門市公休日請查看臉書粉絲團PO文</span>
                </div>
            </div>

        </div>

    </div>
</template>

<style scoped>

@media (max-width : 2000px) {
    .imgContainer {
        padding: 0 15%;
    }

    .wholeContainer {
        margin: 0 15%;
    }

}








.imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    object-fit: cover;
}

.headerImg {
    width: 100%;
    height: 100%;
}












.wholeContainer {
    display: flex;
    padding: 0% 5%;
}

.carouselContainer {
    flex: 50%;
    padding: 5%;
}

.informationContainer {
    flex: 50%;
    padding: 5%;
}

.infoTitle {
    font-size: xx-large;
    font-weight: bold;
    margin-bottom: 3%;
    color: rgba(166, 127, 120, 1);
}

.infoText {
    color: rgba(50, 67, 95, 1);
    margin-bottom: 2%;
}

.openTimeTitle {
    margin-bottom: 3%;
}

.openTimeTW {
    font-size: small;
    margin-bottom: 2%;
    color: rgba(143, 134, 129, 1);
}


.openTime {
    display: flex;
    font-size: larger;
    justify-content: space-between;
}
</style>
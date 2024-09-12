<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

const isLoading = ref(true);

const route = useRoute();

const startLoading = () => {
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
};

watch(route, () => {
    isLoading.value = true;
    startLoading();
});


onMounted(() => {

    isLoading.value = true;
    startLoading();

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn'); // 添加 fadeIn class
            } else {
                entry.target.classList.remove('fadeIn'); // 離開可視範圍時移除 fadeIn class
            }
        });
    }, options);

    // 獲取所有元素
    const imgElements = document.querySelectorAll('.BestText, .UniqueText, .NewText, .NutritiousText, .YummyText');
    imgElements.forEach(img => {
        observer.observe(img); // 為每個元素添加觀察者
    });
});

</script>

<template>

    <Loading v-if="isLoading" />

    <div class="headerContainer">
        <img src="../../public/imgZip/AboutUs/HeaderBg.png" alt="Bg" class="headerImg">
    </div>

    <div class="ImgContainer">
        <img src="../../public/imgZip/AboutUs/BeTheBestText.png" alt="text" class="BestText">
        <img src="../../public/imgZip/AboutUs/BeTheBestBg.png" alt="Bg" class="w-100 h-100 ">

    </div>

    <div class="ImgContainer">
        <img src="../../public/imgZip/AboutUs/UniqueText.png" alt="text" class="UniqueText">
        <img src="../../public/imgZip/AboutUs/UniqueBg.png" alt="Bg" class="w-100 h-100">
    </div>

    <div class="ImgContainer">
        <img src="../../public/imgZip/AboutUs/NewText.png" alt="text" class="NewText">
        <img src="../../public/imgZip/AboutUs/NewBg.png" alt="Bg" class="w-100 h-100">
    </div>

    <div class="ImgContainer">
        <img src="../../public/imgZip/AboutUs/NutritiousText.png" alt="text" class="NutritiousText">
        <img src="../../public/imgZip/AboutUs/NutritiousBg.png" alt="Bg" class="w-100 h-100">
    </div>

    <div class="ImgContainer">
        <img src="../../public/imgZip/AboutUs/YummyText.png" alt="text" class="YummyText">
        <img src="../../public/imgZip/AboutUs/YummyBg.png" alt="Bg" class="w-100 h-100">
    </div>




</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
        /* 向下位移一點增加動態效果 */
    }

    to {
        opacity: 1;
        transform: translateY(0);
        /* 完全顯示時不位移 */
    }
}

.BestText,
.UniqueText,
.NewText,
.NutritiousText,
.YummyText {
    opacity: 0;
    /* 初始隱藏 */
    transform: translateY(20px);
    /* 初始位置稍微向下移動 */
    transition: opacity 1s ease, transform 1s ease;
    /* 過渡效果 */
}

.fadeIn {
    opacity: 1;
    /* 當添加動畫 class 時，圖片逐漸顯示 */
    transform: translateY(0);
    /* 回到初始位置 */
}

@media (max-width: 2000px) {


    .headerContainer {
        display: flex;
        object-fit: contain;
        padding: 0 15%;
    }

    .headerImg {
        width: 100%;
        height: 100%;
    }

    .ImgContainer {
        position: relative;
        padding: 0 15%;
    }

    .BestText {
        position: absolute;
        right: 17%;
        bottom: 10%;
        align-items: center;
        width: 25%;
    }

    .UniqueText {
        position: absolute;
        left: 20%;
        bottom: 20%;
        width: 30%;
    }

    .NewText {
        position: absolute;
        width: 23%;
        right: 17%;
        bottom: 10%;
    }

    .NutritiousText {
        position: absolute;
        left: 35%;
        bottom: 30%;
        width: 30%;
    }

    .YummyText {
        position: absolute;
        width: 30%;
        left: 18%;
        bottom: 30%;
    }

}
</style>
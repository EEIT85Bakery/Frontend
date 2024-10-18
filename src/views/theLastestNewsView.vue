<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

const isLoading = ref(true);

const route = useRoute();

const startLoading = () => {
    setTimeout(() => {
        isLoading.value = false;
    }, 200);
};

watch(route, () => {
    isLoading.value = true;
    startLoading();
});

onMounted(() => {
    isLoading.value = true;
    startLoading();
});



const images = ref([]); // 用來儲存所有card DOM

onMounted(() => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // 當圖片進入可視區域的 10% 時觸發
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

    // 獲取所有圖片元素
    const imgElements = document.querySelectorAll('.card');
    imgElements.forEach(img => {
        observer.observe(img); // 為每個圖片元素添加觀察者
    });
});


const items = ref([
    {
        imageUrl: '../../public/imgZip/Sample/apple pie.jpg',
        title: '聖誕節預購開始囉！',
        content: '2024/12/01至2024/12/20期間，購買聖誕節蛋糕、禮盒，結帳輸入折扣瑪「MerryChristmas」，即享滿2000折100，再送聖誕節專屬裝飾',
        btn: '前往選購'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cake1.jpg',
        title: '萬聖節活動開跑囉~',
        content: '2024/11/01至2024/11/30以前，結帳輸入折扣碼「HappyHalloween」，全館商品滿1000折50，再送萬聖節神秘小禮物',
        btn: '前往選購'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg',
        title: 'Bunny Sugar兩週年啦~',
        content: '歡慶Bunny Sugar兩歲生日，2024/10/01至2024/10/31，結帳輸入折扣碼「HappyBirthday」，全館商品滿3000折200',
        btn: '前往選購'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cake2.jpg',
        title: '9月份優惠來囉！',
        content: '2024/09/01至2024/09/30以前，結帳輸入折扣碼「BunnySugar」，全館商品滿1000折50',
        btn: '前往選購'
    }
])



</script>

<template>

    <Loading v-if="isLoading" />

    <div class="imgContainer">
        <img src="../../public/imgZip/header/theLastestNews.png" alt="header" class="headerImg">
    </div>

    <div class="titleContainer">
        <div>消息專區</div>
        <hr />
    </div>

    <div class="cardContainer">

        <div class="card" v-for="(item, index) in items" :key="index" ref="images">
            <img :src="item.imageUrl" class="card-img-top cardImg" alt="cardImg">
            <div class="card-body" style="position: relative;">
                <div class="card-title cardTitle">{{ item.title }}</div>
                <div class="card-text cardText">{{ item.content }}</div>
                <div class="BtnContainer">
                    <button class="cardBtn">
                        <RouterLink to="productList" class="Btn">{{ item.btn }}</RouterLink>
                    </button>
                </div>
            </div>
        </div>
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

.card {
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





.imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    object-fit: cover;
}

.titleContainer {
    text-align: center;
    font-size: xx-large;
    padding: 3% 10% 0% 10%;
    color: rgba(50, 67, 95, 1);
    font-weight: bold;
}

.headerImg {
    width: 100%;
    height: 100%;
}

.cardContainer {
    display: flex;
    padding: 1% 8%;
    flex-wrap: wrap;
    justify-content: space-between;
}

.card {
    flex: 1 1 23%;
    max-width: 23%;
    margin: 1%;
    border-radius: 0;
    margin-bottom: 3%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.card:hover {
    transform: scale(1.01);
}

.cardImg {
    padding: 5% 5% 1% 5%;
}

.cardImg:hover {
    opacity: 0.7;
}

.cardTitle {
    display: flex;
    justify-content: center;
    font-size: x-large;
    font-weight: bold;
    margin-bottom: 5%;
    color: rgba(143, 134, 129, 1);
}

.cardText {
    /* font-size: small; */
    color: rgba(50, 67, 95, 1);
    margin-bottom: 25%;
    /* font-weight: bold; */
    padding: 0 5%;
}

.BtnContainer {
    text-align: center;
    position: absolute;
    bottom: 10%;
    right: 0.1%;
    width: 100%;
}

.cardBtn {
    width: 80%;
    padding: 2% ;
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 5px;
    background-color: white;
    /* margin-bottom: 3%; */
}

.Btn {
    color: rgba(166, 127, 120, 1);
    text-decoration: none;
    font-weight: bold;
    width: 100%;
}

.cardBtn:hover {
    transform: scale(1.01);
}
</style>
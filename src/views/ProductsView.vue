<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const products = ref({})
let field = ref("蛋糕專區");
let rank = ref("由新到舊");

let citems = [
    {
        title: '蛋糕專區',
        products: ['戚風蛋糕', '戚風蛋糕', '戚風蛋糕', '戚風蛋糕']
    },
    {
        title: '蛋糕專區',
        products: ['戚風蛋糕', '戚風蛋糕', '戚風蛋糕', '戚風蛋糕']
    },
    {
        title: '蛋糕專區',
        products: ['戚風蛋糕', '戚風蛋糕', '戚風蛋糕', '戚風蛋糕']
    }
];

onMounted(() => {
  axios.get('/products').then((res) => {
    
    
    products.value = res.data.data
    console.log(products.value);
    
  }).catch((err) => {
    console.log(err);
    
  })
})


</script>

<template>

<div class="PContainer">

    <div class="categoryText1">商品列表 >> {{ field }}</div>

    
    <div class="d-flex">
         <!-- 側邊分類欄 -->
        <div class="flexItemCategory w-100">
            <div class="d-flexbox">
                <div class="categoryItem" v-for="(item, index) in citems" :key="index">
                    <div class="categoryTitle">
                        <div>
                            <img src="../../public/imgZip/Logo/bunnyBlue.png" alt="bunnyBlue" class="categoryImg">
                        </div>
                        <div>{{ item.title }}</div>
                    </div>
                    <div class="categoryContent" v-for="(product, prodIndex) in item.products" :key="prodIndex">
                        {{ product }}
                    </div>
                </div>
            </div>
        </div>

        <!-- 商品列表 -->
        <div class="productsList d-flexbox w-100">
            <div class="productsPageTop"></div>
            <div class="categoryText2">商品排序 >> {{ rank }}</div>
            <div>
                <div class="ProductsContainer">
                    <div v-for="(item, index) in products" :key="'products' + index" class="products-item">
                        
                        <img :src="item.imageUrl" :alt="item.name" class="products-image" />
                       
                        <div class="products-name">{{ item.name }}</div>
                        <div class="products-price">{{ item.price }}</div>
                    </div>
                </div>
                <div class="switchPage">
                    I'm page switch
                </div>
            </div>
        </div>

    </div>
</div>    

</template>

<style scoped>

.PContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}

.categoryText1 {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
    margin: 5px 20px;
}

.categoryText2 {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
    margin-top: 20px;
    margin-right: 25px;
    text-align: end;
}

.categoryItem {
    flex: 1;
    margin-bottom: 20%;
}

.categoryTitle {
    display: flex;
    width: 100%;
    height: 2%;
    color: rgba(50, 67, 95, 1);
    font-size: 2.2vw;
    font-weight: bold;
    margin-bottom: 3%;
}

.categoryImg {
    object-fit: contain;
    width: 4vw;
    padding-right: 10px;
    padding-bottom: 10px;
}

.categoryContent {
    color: rgba(50, 67, 95, 0.5);
    font-size: 1.4vw;
    font-weight: bold;
    padding-left: 25%;
    padding-bottom: 3%;
    /* padding-left: 5%; */
}

.flexItemCategory {
    padding: 5% 5%;
    background-color: rgba(255, 255, 255, 0.7);
    flex: 1;
    flex-basis: 35%
}

.productsPageTop {
    height: 300px;
    color: white;
    font-size: 100px;
    text-align: center;
    align-content: center;
    background-image: url(../../public/imgZip/Sample/ProductListPageHeaderCake.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.ProductsContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding: 0px 30px;
}

.products-item {
    flex: 1 1 calc(33.333% - 20px); /* 每行三個產品，減去間距 */
    max-width: calc(33.333% - 20px); /* 限制最大寬度 */
    text-align: center;
}

.products-image {
    padding: 10% 3% 1% 3%;
    width: 100%;
}

.products-name {
   /* color: rgba(50, 67, 95, 1); */
   font-weight: bold;
   font-size: small;
}

.products-price {
    color: #A67F78;
    font-size: medium;
    /* font-weight: bold; */
    margin-bottom: 20px;
}

.switchPage {
    background-color: blueviolet;
    width: 100%;
    height: 4vw;
}


</style>
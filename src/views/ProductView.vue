<script setup>
import { ref } from 'vue';

const imgItems = ref([
    { imageUrl: '../../public/imgZip/Sample/apple pie.jpg' },
    { imageUrl: '../../public/imgZip/Sample/cake1.jpg' },
    { imageUrl: '../../public/imgZip/Sample/cake2.jpg' },
    { imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg' }
]);

const selectedImage = ref(imgItems.value[0]);

const productName = "草莓乳酪杯子蛋糕";
const productDescription = "訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢";
const productIngredients = "| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 | ";
const discountExp = "2024/11/30";
const price = "160";

const moreItems = ref([
    {
        imageUrl: '../../public/imgZip/Sample/apple pie.jpg',
        name: '商品一號'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cake1.jpg',
        name: '商品二號'
    },
    {
        imageUrl: '../../public/imgZip/Sample/cake2.jpg',
        name: '商品三號'
    },
    
]);



function selectImage(item) {
    selectedImage.value = item;
}

</script>

<template>

    <div class="productContainer">

        <div class="productImgContainer">

            <!-- 產品小圖 -->
            <div class="productImgItems">

                <div v-for="(item, index) in imgItems" :key="index" class="productImgItem" :class="'Item' + (index + 1)"
                    @click="selectImage(item)">
                    <img class="productImg" :src="item.imageUrl" alt="Product Image">
                </div>

                <!-- 下一張小圖按鈕 -->
                <div class="nextOne"><i class="bi bi-chevron-compact-down"></i></div>
            </div>

            <!-- 產品大圖 -->
            <div class="productImgItemDisplay">
                <div class="displayItem">
                    <img class="productImg" :src="selectedImage.imageUrl" alt="">
                </div>
                <div class="addWishList"><i class="bi bi-suit-heart heartIcon"></i>加入我的收藏</div>
            </div>
        </div>

        <!-- 產品文字描述 -->
        <div class="productTextContainer">

            <div class="productName">
                <span>{{ productName }}</span>
            </div>

            <div class="productDescription">
                <span>{{ productDescription }}</span>
            </div>

            <div class="productIngredients">
                <div>原料包含: </div>
                <span>{{ productIngredients }}</span>
            </div>

            <div class="CutLine"></div>

            <div class="productDiscount">
                <div>
                    <i class="bi bi-caret-right-fill"></i>
                    即日起至<b class="discountExp">{{ discountExp }}</b>，全館商品滿1000折50
                </div>
                <div>
                    <i class="bi bi-caret-right-fill"></i>
                    Bunny Sugar會員，滿額可依
                    <RouterLink class="memberLevel">會員分級</RouterLink> 享優惠折扣
                </div>
            </div>

            <div class="CutLine"></div>

            <div class="productPrice">
                <div>商品金額: <span class="price">{{ price }}</span> 元</div>
            </div>

            <div class="productQuantity">
                <div class="quantityText">數量： </div>
                <input type="number" min="0" class="quantityInput" placeholder="請選擇數量">
            </div>

            <div class="buttons">
                <div class="AddCartBtn">
                    <button class="btnCart">加入購物車</button>
                </div>
                <RouterLink class="buyBtn" to="cart">
                    <button class="btnBuy">直接購買</button>
                </RouterLink>
            </div>
        </div>
    </div>

    <div class="moreProductTitle">推薦商品</div>

    <div class="lineContainer">
        <div class="Line"></div>
    </div>

    <div class="moreProductsContainer">
        <div class="moreProducts">
            <div class="previousBtn">
                <i class="bi bi-chevron-double-left switchBtn"></i>
            </div>

            <RouterLink v-for="(item, index) in moreItems" :key="index" class="moreProduct">
                <img class="moreProductImg" :src="item.imageUrl" alt=".">
                <div class="moreProductName">{{ item.name }}</div>
            </RouterLink>

            <div class="nextBtn">
                <i class="bi bi-chevron-double-right switchBtn"></i>
            </div>
        </div>
    </div>

</template>

<style scoped>

.productContainer {
    display: flex;
    width: 100%;
    height: fit-content;
}

.productImgContainer {
    display: flex;
    flex: 0 0 53%;
    padding: 5% 2% 5% 8%;
}

.productImgItems {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
}

.productImgItem {
    flex: 1;
    display: flex;
    cursor: pointer;
}

.productImg {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.Item1 {
    margin: 3% 3% 0 3%;
}

.Item2 {
    margin: 3% 3% 0 3%;
}

.Item3 {
    margin: 3% 3% 0 3%;
}

.Item4 {
    margin: 3% 3% 7% 3%;
}

.nextOne {
    text-align: center;
    color: rgba(166, 127, 120, 1);
    cursor: pointer;
    /* background-color: rgba(255, 255, 255, 0.5); */
}

.heartIcon {
    margin-right: 5px;
}

.addWishList {
    text-align: center;
    font-weight: bold;
    color: rgba(166, 127, 120, 1);
    cursor: pointer;
}

.productImgItemDisplay {
    flex: 0 0 80%;
    display: flex;
    flex-direction: column;
    padding: 1% 1% 0 1%;
}

.displayItem {
    flex: 1;
    margin-bottom: 2%;
}

.productTextContainer {
    flex: 0 0 47%;
    display: flex;
    flex-direction: column;
    padding: 5% 8% 5% 2%;
    gap: 1vw;
}

.productName {
    flex: 1;
    font-size: 2.5vw;
    font-weight: bolder;
    color: #32435F;
}

.productDescription {
    flex: 1;
    color: rgba(50, 67, 95, 0.7);
}

.productIngredients {
    flex: 1;
    color: rgba(50, 67, 95, 0.7);
}

.productDiscount {
    flex: 1;
    align-content: center;
    color: rgba(50, 67, 95, 0.7);
}

.discountExp {
    color: rgba(166, 127, 120, 0.8);
    font-style: italic;
}

.memberLevel {
    color: rgba(166, 127, 120, 1);
}

.productPrice {
    flex: 1;
    align-content: end;
    text-align: end;
    color: #32435F;
    font-size: large;
    font-weight: bold;
}

.price {
    color: rgba(166, 127, 120, 1);
    font-size: 2vw;
    font-weight: bolder;
    font-style: italic;
    padding: 0 1% 0 5%;
}

.productQuantity {
    flex: 1;
    color: rgba(166, 127, 120, 0.8);
    font-weight: bold;
    align-content: center;
    display: flex;
    justify-content: center;
    justify-items: center;
}

.quantityText {
    flex-direction: column;
    align-content: center;
}

.quantityInput {
    flex: 1;
    width: 100%;
    height: fit-content;
    text-align: center;
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 3px;
    padding: 1%;
    align-self: center;
}

.quantityInput::placeholder {
    font-size: small;
    font-weight: bold;
    color: rgba(50, 67, 95, 0.3);
}

.buttons {
    flex: 1;
    display: flex;
}

.btnCart {
    width: 98%;
    color: rgba(166, 127, 120, 1);
    background-color: white;
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 5px;
    padding: 3%;
    font-weight: bold;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
}

.btnBuy {
    width: 98%;
    color: white;
    background-color: rgba(166, 127, 120, 1);
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 5px;
    padding: 3%;
    font-weight: bold;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.AddCartBtn {
    flex: 0 0 50%;
    text-align: center;
    align-content: center;
}

.buyBtn {
    flex: 0 0 50%;
    text-align: center;
    align-content: center;
}

.CutLine {
    background-color: rgba(143, 134, 129, 0.5);
    height: 1px;
}

.lineContainer {
    display: flex;
    width: 100%;
    justify-content: center;
}

.Line {
    background-color: rgba(143, 134, 129, 0.5);
    width: 80%;
    align-items: center;
    height: 1px;
}

.moreProductTitle {
    color: #8F8681;
    margin: 3% 0 1% 0;
    font-weight: bold;
    font-size: 2vw;
    text-align: center;
}

.moreProductsContainer {
    display: flex;
    width: 100%;
    height: fit-content;
    margin-top: 1%;
    padding: 0 10%;
}

.moreProducts {
    width: 100%;
    display: flex;
}

.nextBtn,
.previousBtn {
    flex: 0 0 5%;
    align-content: center;
    text-align: center;
    font-size: 1.7rem;
    color: rgba(143, 134, 129, 0.5);
}

.moreProduct {
    flex: 0 0 30%;
    height: fit-content;
    padding: 1% 2%;
    text-decoration: none;
    text-align: center;
    color: #32435F;
    font-weight: bold;
    margin-bottom: 5%;
}

.moreProductImg {
    object-fit: contain;
    width: 100%;
    height: 100%;
    margin-bottom: 1%;
}

@media (max-width: 768px) {
    .productContainer {
        flex-direction: column;
    }

    .productImgContainer {
        padding: 5%;
    }

    .productTextContainer {
        padding: 0 5%;
        gap: 4vw;
    }

    .productName {
        font-size: 6vw;
    }

    .price {
        font-size: 5vw;
    }

    .moreProductTitle {
        margin-top: 10%;
        font-size: 5vw;
    }


}

@media (max-width: 576px) {}
</style>
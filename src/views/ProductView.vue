<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

import Swiper from '@/components/Swiper.vue';
import MemberLevelModal from '@/components/MemberLevelModal.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';
import router from '@/router';
import { useCartStore } from '@/stores/cartStore';
import axios from 'axios';

const route = useRoute();
const product = ref({})
const isGetImage = ref(false)
const productAmount = ref(1)
const otherProductsLoaded = ref(false)
const isGetProduct = ref(false)
const cartStore = useCartStore()


const clearInput = () => {
    productAmount.value = ""
}

const getProduct = async () => {
    try {
        // 使用 await 獲取產品資料
        const res = await axios.get(`/api/products/${cartStore.productId}`);
        
        // 設置 product 為響應數據
        product.value = res.data;

        // 更新 imgItems 的圖片 URL
        imgItems.value[0].imageUrl = product.value.img1 || ''; // 加入默認值以防止 undefined
        imgItems.value[1].imageUrl = product.value.img2 || '';
        imgItems.value[2].imageUrl = product.value.img3 || '';
        imgItems.value[3].imageUrl = product.value.img4 || '';
        
        // 設置選中的圖片
        selectedImage.value = imgItems.value[0].imageUrl;

        // 更新狀態
        isGetImage.value = true; // 確保這裡的變數名稱一致
        otherProductsLoaded.value = true;
        isGetProduct.value = true
        isLoading.value = false
    } catch (err) {
        console.log(err); // 輸出錯誤到控制台
    }
}


const addToCart = (buy) => {
    if (isNaN(Number(productAmount.value)) || productAmount.value === "" || Number(productAmount.value) < 0) {
  SwalHandle.showErrorMsg("請填入數字");
  return
}
    if(productAmount.value <= product.value.stocks) {
    axios.post('api/cart', {
        productId: product.value.id,
        quantity: productAmount.value,
        price: product.value.price
    }).then(() => {
        SwalHandle.showSuccessMsg("成功新增到購物車")
        if(buy == "直接購買") {
            router.push('/cart')
        }
    }).catch((err) => {
        console.log(err);
        
    })
}else {
    SwalHandle.showErrorMsg(`超過庫存上限，剩餘庫存${product.value.stocks}`)
}
};

const isIconA = ref(true);

function toggleIcon() {
    isIconA.value = !isIconA.value; // 切換狀態
}


const modalRef = ref(null);

// 用來觸發 modal 的打開方法
function handleOpenModal() {
    if (modalRef.value) {
        modalRef.value.openModal(); // 調用 modal 的 openModal 方法
    }
}

const isLoading = ref(true);


// const startLoading = () => {
//     setTimeout(() => {
//         isLoading.value = false;
//     }, 600);
// };

watch(route, () => {
    isLoading.value = true;
});





const imgItems = ref([
    { imageUrl: '../../public/imgZip/Sample/apple pie.jpg' },
    { imageUrl: '../../public/imgZip/Sample/cake1.jpg' },
    { imageUrl: '../../public/imgZip/Sample/cake2.jpg' },
    { imageUrl: '../../public/imgZip/Sample/cheeseCake.jpg' }
]);

const selectedImage = ref(imgItems.value);


// const productName = "草莓乳酪杯子蛋糕";
// const productDescription = "訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢";
// const productIngredients = "| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 | ";
const discountExp = "2024/11/30";
// const price = "160";

// const moreItems = ref([
//     {
//         imageUrl: '../../public/imgZip/Sample/apple pie.jpg',
//         name: '商品一號'
//     },
//     {
//         imageUrl: '../../public/imgZip/Sample/cake1.jpg',
//         name: '商品二號'
//     },
//     {
//         imageUrl: '../../public/imgZip/Sample/cake2.jpg',
//         name: '商品三號'
//     },

// ]);

function selectImage(item) {
    selectedImage.value = item.imageUrl;
}

onMounted(() => {
    cartStore.productId = route.params.id
    getProduct()    
});

</script>

<template>

    <div class="productContainer">

        <div class="productImgContainer">

            <Loading v-if="isLoading" />

            <!-- 產品小圖 -->
            <div class="productImgItems">
                <div v-if="isGetImage">
                <div v-for="(item, index) in imgItems" :key="index" class="productImgItem"
                     @click="selectImage(item)">
                    <img class="productImg" :src="`data:;base64,${item.imageUrl}`" alt="Product Image">
                </div>
            </div>
                <!-- :class="'Item' + (index + 1)" -->

                <!-- 下一張小圖按鈕 -->
                <div class="nextOne"><i class="bi bi-chevron-compact-down"></i></div>
            </div>

            <!-- 產品大圖 -->
            <div class="productImgItemDisplay">
                <div class="displayItem">
                    <div v-if="isGetImage">  
                    <img  class="productImg" :src="`data:;base64,${selectedImage}`" alt="">
                    </div>
                </div>
                <div class="addWishList" @click="toggleIcon">
                    <i v-if="isIconA" class="bi bi-suit-heart heartIcon"></i>
                    <i v-else class="bi bi-suit-heart-fill heartIcon"></i>
                    加入我的收藏
                </div>
            </div>
        </div>

        <!-- 產品文字描述 -->
        <div class="productTextContainer">

            <div class="productName">
                <span>{{ product.productName }}</span>
            </div>

            <div class="productDescription">
                <span>{{ product.description }}</span>
            </div>

            <div class="productIngredients">
                <div>原料包含: </div>
                <span>{{ product.materialDescription }}</span>
            </div>

            <div class="CutLine"></div>

            <div class="productDiscount">
                <div class="d-flex">
                    <i class="bi bi-caret-right-fill me-2"></i>
                    <span>即日起至<b class="discountExp">{{ discountExp }}</b>，結帳輸入「<b>HappyHalloween</b>」，全館商品滿1000折50</span>
                </div>
                <div class="d-flex">
                    <i class="bi bi-caret-right-fill me-2"></i>
                    <span>Bunny Sugar會員，滿額可依
                        <span @click="handleOpenModal" class="memberLevel">會員分級</span> 享優惠折扣
                    </span>
                </div>
            </div>

            <div class="CutLine"></div>
            <div style="display: flex;">
            <div class="productPrice" style="display: flex;justify-content: start;">
                <div>商品庫存: <span class="">{{ product.stocks }}</span> 份</div>
            </div>

            <div class="productPrice">
                <div>商品金額: <span class="price">{{ product.price }}</span> 元</div>
            </div>
        </div>
            <div class="productQuantity">
                <div class="quantityText">數量： </div>
                <input type="number" min="1" class="quantityInput" placeholder="請選擇數量" v-model="productAmount" @focus="clearInput">
            </div>

            <div class="buttons">
                <div class="AddCartBtn">
                    <button class="btnCart" @click="addToCart">
                        加入購物車
                    </button>
                </div>
                <div class="buyBtn" >
                    <button class="btnBuy" @click="addToCart('直接購買')">直接購買</button>
                </div>
            </div>
        </div>
    </div>

    <div class="moreProductTitle">推薦商品</div>

    <div class="lineContainer">
        <div class="Line"></div>
    </div>

    <div v-if="isGetProduct">
    <Swiper @getProduct="getProduct"/>
</div>
    <MemberLevelModal ref="modalRef" />


</template>

<style scoped>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

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
    margin: 4%;
}

.productImgItem.selected {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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
    color: rgba(225, 220, 217, 0.3);
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
    text-decoration: underline;
    cursor: pointer;
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
    /* margin: 3% 0 0.5% 0; */
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
<script setup>
import { ref, computed, onMounted  } from 'vue';
import CartTopComponent3 from '@/components/CartTopComponent3.vue';
import MemberLevelModal from '@/components/MemberLevelModal.vue';
import { useRoute } from 'vue-router'; // 導入 useRoute
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader.js'; // 假設你有 axiosInstance

// 畫面使用之變數
const modalRef = ref(null);
const discountCode = 'HappyHalloween'
const productimg = { imageUrl: '../../public/imgZip/Sample/cake1.jpg' };
const productname = "雙重莓果饗宴蛋糕";
const productprice = ref(360);
const quantity = ref(1);
const memberdiscount = ref(60);
const bunnyquantity = ref(null);
const maxBunnyQuantity = ref(15);
const appliedBunnyQuantity = ref(0);
const memberlevel = ref("金兔");

const route = useRoute(); // 獲取當前路由
const orderDetail = ref(null); // 用來存儲訂單詳細資料
const isLoading = ref(false); // 加載狀態
const orderNumber = ref(route.query.orderNumber); // 從路由參數中獲取訂單號碼


// 用來觸發 modal 的打開方法
function handleOpenModal() {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}

const totalprice = computed(() => {
    return productprice.value * quantity.value;
});

const discount = computed(() => {
    const price = totalprice.value;
    if (price >= 1000) {
        // 每增加1000元折扣增加50元
        return Math.floor(price / 1000) * 50;
    } else {
        return 0;
    }
});

function applyBunnyCoin() {
    appliedBunnyQuantity.value = Math.min(bunnyquantity.value, maxBunnyQuantity.value);
}

const discountStyle = computed(() => {
    if (memberlevel.value !== '白兔') {
        return { textDecoration: 'line-through' };
    }
    return {};
});

const finaltotal = computed(() => {
    if (memberlevel.value !== '白兔') {
        return totalprice.value - memberdiscount.value - appliedBunnyQuantity.value
    } else {
        return totalprice.value - discount.value - appliedBunnyQuantity.value
    }
});

// 將 base64 字符串轉換為 DataURL
const convertToDataURL = (base64String) => {
  if (!base64String) return null;
  const isPNG = base64String.charAt(0) === 'i';
  const mimeType = isPNG ? 'image/png' : 'image/jpeg';
  return `data:${mimeType};base64,${base64String}`;
};

const processOrderDetailsImages = async (details) => {
  return details.map((item) => ({
    ...item,
    img1: convertToDataURL(item.img1),
    img2: convertToDataURL(item.img2),
    img3: convertToDataURL(item.img3),
    img4: convertToDataURL(item.img4),
  }));
};

const fetchOrderDetail = () => {
  isLoading.value = true; 
  
  axiosInstanceForInsertHeader.get('/orders/byOrderNumber', {
    params: { orderNumber: orderNumber.value }
  })
  .then(async (response) => {
    const data = response.data;
    // 轉換圖片 URL
    data.orderDetails = await processOrderDetailsImages(data.orderDetails);
    orderDetail.value = data;
    console.log('訂單詳細資料:', orderDetail.value);
    console.log('訂單詳細資料中的商品:', orderDetail.value.orderDetails);

  })
  .catch((error) => {
    console.error('Error fetching order details:', error);
  })
  .finally(() => {
    isLoading.value = false; // 不論成功或失敗都停止加載
  });
};

// 格式化日期函數
const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 5) {
    return null; // 如果日期為空或格式不正確，返回提示
  }
  // 檢查時間是否有秒，沒有補00
  const [year, month, day, hour, minute, second = '00'] = dateArray;
  // 格式化為 YYYY-MM-DD HH:mm:ss
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
                        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  return formattedDate;
};

// 當頁面掛載時請求訂單詳細資料
onMounted(() => {
  fetchOrderDetail(); // 頁面加載時調用
});

</script>

<template>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="orderDetail">
    <CartTopComponent3 />

    <!-- 購物車 -->

    <div class="cartContainer">
        <div class="cart">
            <div class="cartTop">購物車</div>
            <div class="content">
                <div class="titleContainer">
                    <div class="productTitle">商品資料</div>
                    <div class="priceTitle">單件價格</div>
                    <div class="quantityTitle">數量</div>
                    <div class="totalTitle">小計</div>
                    <!-- <div class="delTitle"></div> -->
                </div>
                <div class="cartLine"></div>
                <div class="itemContainer" v-for="(item, index) in orderDetail.orderDetails" :key="index">
                    <div class="items">
                        <div class="productImg">
                            <img :src="item.img1" alt="" class="itemImg">
                        </div>
                        <div class="productInfo">{{ item.productName }}</div>
                        <div class="priceInfo">{{ item.price }} 元</div>
                        <div class="quantityInfo">{{ item.quantity }}</div>
                        <div class="totalInfo">{{ item.price * item.quantity }} 元</div>
                        <div class="delInfo"></div>
                    </div>
                    <div class="cartLine"></div>
                </div>
                <div class="detailContainer">
                    <div class="total">
                        <span class="leftText">總計:</span>
                        <span>{{ orderDetail.total }} 元</span>
                    </div>
                    <div class="allDiscount" v-if="orderDetail.couponName">
                        <span class="leftText">折扣:<span style="font-size: small;"> (已使用折扣碼 {{ orderDetail.couponName }} )</span></span>
                        <span>{{ orderDetail.total - orderDetail.paidPrice  - orderDetail.usedBunnyCoins }} 元</span>
                    </div>
                    <div class="bunnyCoinDiscount">
                        <span class="leftText">Bunny Coin折扣:</span>
                        <span>{{ orderDetail.usedBunnyCoins }} 元</span>
                    </div>
                    <div class="cartLine"></div>
                    <div class="finalPrice">合計:
                        <span class="finalTotalPrice">{{ orderDetail.paidPrice }}</span> 元
                    </div>
                    <div class="cartLine"></div>
                    <div class="promotion">
                        <div class="productDiscount">
                            <div class="mb-1">
                                <i class="bi bi-caret-right-fill"></i>
                                單筆訂單滿500可以獲得1次遊戲機會，
                                此筆訂單可獲得 <b style="color: rgba(166, 127, 120, 1); font-style: italic;"> {{ Math.floor(orderDetail.paidPrice / 500) }} </b> 次遊戲機會，已匯入您的遊玩次數中，
                                記得前往賺取Bunny Coin呦~
                            </div>
                            <div>
                                <i class="bi bi-caret-right-fill"></i>
                                感謝您的購買，您的支持是我們最大的動力
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="customerAndPayInfoContainer">
            <div class="customerInfo">
                <div class="top">顧客資訊</div>
                <div class="InfoContainer bg-white" >

                    <div class="inputText"><span class="info">顧客姓名:</span><span>{{ orderDetail.userName }}</span></div>
                    <div class="inputText"><span class="info">電話號碼:</span><span>{{ orderDetail.userPhone }}</span></div>
                    <div class="inputText"><span class="info">電子信箱:</span><span>{{ orderDetail.userEmail }}</span></div>


                </div>

            </div>
            <div class="payInfo">
                <div class="top">付款資訊</div>
                <div class="InfoContainer bg-white">

                    <div class="inputText"><span class="info">付款方式:</span><span>{{ orderDetail.paymentMethod }}</span></div>

                    <div class="inputText"><span class="info">付款狀態:</span><span>{{ orderDetail.paymentStatus }}</span></div>

                </div>
                <div></div>
            </div>
        </div>
        <div class="pickupAndCreditInfo">
            <div class="pickupInfo">
                <div class="top">訂單資訊</div>
                <div class="InfoContainer bg-white">

                    <div class="inputText"><span class="info">訂單號碼:</span><span>{{ orderDetail.orderNumber }}</span></div>
                    <div class="inputText"><span class="info">訂單日期:</span><span>{{ formatDate(orderDetail.createTime) }}</span></div>
                    <div class="inputText"><span class="info">訂單狀態:</span><span>{{ orderDetail.pickupStatus }}</span></div>
                    <div class="inputText">
                        <span class="info">取貨日期:</span>
                        <span v-if="orderDetail.pickupTime">{{ formatDate(orderDetail.pickupTime) }}</span>
                        <span v-else>未取貨</span>
                    </div>

                </div>
            </div>

        </div>

    </div>

    <div class="btns">
        <RouterLink to="/" class="goToBuyBtn">
            <button class="btn2" @click="backToList">返回首頁</button>
        </RouterLink>
    </div>

    <MemberLevelModal ref="modalRef" />
</div>
</template>

<style scoped>


.container {
    width: 100%;
    display: flex;
}

.customerAndPayInfoContainer {
    flex: 0 0 50%;
    padding-right: 1%;
}

.pickupAndCreditInfo {
    flex: 0 0 50%;
    padding-left: 1%;
}

.InfoContainer {
    padding: 3% 10%;
    border-radius: 0 0 10px 10px;
    margin-bottom: 5%;
    /* margin: 1%; */
    border: rgba(166, 127, 120, 0.7) solid 1px;
}

.inputText {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2%;
    color: rgba(50, 67, 95, 1);
}

.info {
    font-weight: bold;
    color: rgba(166, 127, 120, 1);
}

.infoInput {
    width: 100%;
    padding: 1%;
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
    margin-bottom: 3%;
}



.priceBigText {
    text-align: center;
    padding: 1%;
    font-weight: bold;
    font-size: large;
    color: rgba(50, 67, 95, 1);
}

.content.collapsed {
    display: none;
}

.cartContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 2%;
}

.cart {
    width: 90%;
    height: 90%;
    border-radius: 10px;
    background-color: white;
    border: rgba(166, 127, 120, 0.7) solid 1px;
}

.cartTop {
    font-weight: bold;
    width: 100%;
    padding: 1.5%;
    text-align: center;
    font-size: larger;
    border-radius: 10px 10px 0 0;
    color: rgba(166, 127, 120, 1);
    background-color: white;
    border-bottom: rgba(166, 127, 120, 0.7) solid 1.5px;
}

.top {
    font-weight: bold;
    width: 100%;
    padding: 2%;
    text-align: center;
    font-size: larger;
    border-radius: 10px 10px 0 0;
    color: rgba(166, 127, 120, 1);
    background-color: white;
    border-top: rgba(166, 127, 120, 0.7) solid 0.5px;
    border-left: rgba(166, 127, 120, 0.7) solid 0.5px;
    border-right: rgba(166, 127, 120, 0.7) solid 0.5px;
    border-bottom: rgba(166, 127, 120, 0.7) solid 1px;

}

.titleContainer {
    display: flex;
    padding: 1.5% 2%;
    text-align: center;
    color: #8F8681;
    font-weight: bold;
}

.productTitle {
    flex: 0 0 35%;
}

.priceTitle {
    flex: 0 0 20%;
}

.quantityTitle {
    flex: 0 0 25%;
}

.totalTitle {
    flex: 0 0 20%;
}

.memberLevel {
    color: rgba(166, 127, 120, 1);
    text-decoration: underline;
    cursor: pointer;
}

.cartLine {
    width: 100%;
    height: 0.5px;
    background-color: rgba(166, 127, 120, 0.7);
}

.itemContainer {
    padding: 1.5% 0 0 0;
}

.items {
    display: flex;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 1.5%;
    text-align: center;
    align-items: center;
    color: rgba(50, 67, 95, 1);
}

.productImg {
    flex: 0 0 7%;
}

.itemImg {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.productInfo {
    flex: 0 0 28%;
    padding-left: 2%;
    text-align: start;
}

.priceInfo {
    flex: 0 0 20%;
}

.quantityInfo {
    flex: 0 0 25%;
}

.quantityInput {
    width: 50%;
    text-align: center;
    border: rgba(50, 67, 95, 0.5) solid 1px;
    border-radius: 3px;
}

.totalInfo {
    flex: 0 0 20%;
}

.promotion {
    padding: 1.5% 0;
    border-radius: 0 0 10px 10px;
}

.productDiscount {
    align-content: center;
    color: rgba(50, 67, 95, 0.8);
}


.orderDetailContainer {
    width: 100%;
    display: flex;
    justify-content: center;
}

.orderDetail {
    width: 90%;
}

.detailContainer {
    padding: 1.5% 2%;
    color: rgba(50, 67, 95, 1);
    border-radius: 0 0 10px 10px;
    /* border: rgba(166, 127, 120, 0.7) solid 1px; */
    background-color: white;
}

.leftText {
    color: rgba(143, 134, 129, 1);
}

.moreDetail {
    font-size: small;
    color: rgba(143, 134, 129, 1);
}

.total,
.allDiscount,
.ownDiscount,
.bunnyCoinDiscount,
.useBunnyCoin {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5%;
}

.bunnyCoinDiscount {
    margin-bottom: 1%;
}

.bunnyCoinInput {
    width: 30%;
    text-align: center;
    color: rgba(50, 67, 95, 1);
    margin-right: 1%;
    border: rgba(50, 67, 95, 0.5) solid 1px;
    border-radius: 3px;
}

.bunnyCoinInput::placeholder {
    font-size: small;
    color: rgba(50, 67, 95, 0.5);
}

.use {
    padding: 0 1%;
    color: white;
    background-color: rgba(143, 134, 129, 0.7);
    border-radius: 3px;
    border: transparent solid 2px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.finalPrice {
    margin-top: 2%;
    text-align: end;
    font-size: large;
}

.finalTotalPrice {
    margin: 0 1%;
    color: rgba(166, 127, 120, 1);
    font-size: 2vw;
    font-weight: bold;
    font-style: italic;
}

.btns {
    padding: 1.5% 2%;
    margin-bottom: 3%;
    text-align: center;
}

.goToBuyBtn {
    width: 50%;
    text-align: center;
}

.btn2 {
    width: 50%;
    padding: 0.5%;
    color: white;
    background-color: rgba(143, 134, 129, 1);
    border-radius: 10px;
    border: transparent solid 1px;
    font-weight: bold;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}


@media (max-width: 768px) {
    .promotion {
        font-size: small;
    }

    .bunnyCoinInput {
        width: 35%;
    }

    .finalTotalPrice {
        font-size: 3vw;
    }


}

@media (max-width: 576px) {
    .cartContainer {
        font-size: small;
    }

    .quantityInput {
        font-size: small;
    }

    .orderDetailContainer {
        font-size: small;
    }

    .bunnyCoinInput {
        width: 45%;
    }

    .bunnyCoinInput::placeholder {
        font-size: smaller;
    }

    .moreDetail {
        font-size: smaller;
    }

    .promotion {
        font-size: smaller;
    }

    .total,
    .allDiscount,
    .ownDiscount,
    .bunnyCoinDiscount,
    .useBunnyCoin {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1%;
    }

    .finalTotalPrice {
        font-size: 4vw;
    }

    .container {
        display: inline;
    }

    .customerAndPayInfoContainer,
    .pickupAndCreditInfo {
        padding: 0 5% 0 5%;
    }



}
</style>
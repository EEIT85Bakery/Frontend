<script setup>
import { ref, computed, onMounted } from 'vue';
import CartTopComponent1 from '@/components/CartTopComponent1.vue';
import MemberLevelModal from '@/components/MemberLevelModal.vue';

import axios from 'axios';

const cartItems = ref([]);

function fetchCartItems() {
  const token = localStorage.getItem('jwt');
  axios
      .get('http://localhost:8080/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        cartItems.value = response.data; // 假設後端回傳的 Page 格式有 content 屬性
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
}

// 使用 Vue 的生命週期鉤子，在組件掛載時呼叫 API
onMounted(() => {
  fetchCartItems();
});

import { SwalHandle } from '@/stores/sweetAlertStore';

const showSuccess = () => {
  SwalHandle.showSuccessMsg('套用成功！');
};

const showError = () => {
  SwalHandle.showErrorMsg('套用失敗');
};

const deleteItem = (item) => {
  SwalHandle.confirm(
    '確認移除',
    `您確定要把 ${item.productname} 從購物車中移除嗎？`,
    '移除成功！', // 自定義的成功消息
    () => {
      // 執行刪除操作，例如：
      items.value = items.value.filter(i => i !== item);
      SwalHandle.showSuccessMsg(`成功刪除 ${item.productname}`);
    }
  );
};

const modalRef = ref(null);

// 用來觸發 modal 的打開方法
function handleOpenModal() {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}


const items = ref([
    {
        imageUrl:'../../public/imgZip/Sample/cake1.jpg',
        productname:'雙重莓果饗宴蛋糕',
        productprice: 360,
        quantity: 1
    },
    {
        imageUrl:'../../public/imgZip/Sample/cake1.jpg',
        productname:'雙重莓果饗宴蛋糕',
        productprice: 360,
        quantity: 1
    },
    {
        imageUrl:'../../public/imgZip/Sample/cake1.jpg',
        productname:'雙重莓果饗宴蛋糕',
        productprice: 360,
        quantity: 1
    }
])

const totalprice = computed(() => {
    return items.value.reduce((total, item) => total + item.productprice * item.quantity, 0);
});

const discountExp = "2024/11/30";

// 折扣相關變數
const inputDiscountCode = ref(""); // 使用者輸入的折扣碼
const validDiscountCode = ref(false); // 折扣碼是否有效
const discountCode = "HappyHalloween"; // 正確的折扣碼
const isDiscountApplied = ref(false); // 用來控制是否應用樣式變化

const isDiscountCodeVisible = ref(false);

const discount = computed(() => {
    const price = totalprice.value;
    if (validDiscountCode.value && price >= 1000) {
        // 每增加1000元折扣增加50元
        return Math.floor(price / 1000) * 50;
    } else {
        return 0;
    }
});

// 折扣樣式的計算屬性
const discountStyle = computed(() => {
  // 只有當折扣碼有效且會員不是白兔時才應用劃線樣式
  if (isDiscountApplied.value && memberlevel.value !== '白兔') {
    return { textDecoration: 'line-through' };
  }
  return {};
});

function applyDiscountCode() {
    if (inputDiscountCode.value === discountCode) {
        validDiscountCode.value = true;
        isDiscountApplied.value = true;  // 設置樣式應用為 true
        isDiscountCodeVisible.value = true;
        showSuccess();
    } else {
        validDiscountCode.value = false;
        isDiscountApplied.value = false;
        showError();
    }
}

const memberdiscount = ref(60);

const bunnyquantity = ref(null);
const maxBunnyQuantity = ref(15);

const appliedBunnyQuantity = ref(0);

function applyBunnyCoin() {
    appliedBunnyQuantity.value = Math.min(bunnyquantity.value, maxBunnyQuantity.value);
    showSuccess();
}

const remainingBunnyQuantity = computed(() => {
    return maxBunnyQuantity.value - appliedBunnyQuantity.value;
});


const memberlevel = ref("白兔");

// const discountStyle = computed(() => {
//     if (memberlevel.value !== '白兔') {
//         return { textDecoration: 'line-through' };
//     }
//     return {};
// });



const finaltotal = computed(() => {
    if (memberlevel.value !== '白兔') {
        return totalprice.value - memberdiscount.value - appliedBunnyQuantity.value
    } else {
        return totalprice.value - discount.value - appliedBunnyQuantity.value
    }
})


</script>



<template>

    <CartTopComponent1 />

    <!-- 購物車 -->
    <div class="cartContainer">
        <div class="cart">
            <div class="top">購物車</div>
            <div class="titleContainer">
                <div class="productTitle">商品資料</div>
                <div class="priceTitle">單件價格</div>
                <div class="quantityTitle">數量</div>
                <div class="totalTitle">小計</div>
                <div class="delTitle"></div>
            </div>
            <div class="cartLine"></div>
            <div class="itemContainer" v-for="(item, index) in items" :key="index">
                <div class="items">
                    <div class="productImg">
                        <img :src="item.imageUrl" alt="" class="itemImg">
                    </div>
                    <div class="productInfo">{{ item.productname }}</div>
                    <div class="priceInfo">{{ item.productprice }} 元</div>
                    <div class="quantityInfo">
                        <input type="number" min="1" v-model.number="item.quantity" class="quantityInput" />
                    </div>
                    <div class="totalInfo">{{ item.productprice * item.quantity }} 元</div>
                    <div class="delInfo"><i @click="deleteItem(item)" class="bi bi-x-circle"></i></div>
                </div>
                <div class="cartLine"></div>
            </div>
            <div class="promotion">
                <div class="productDiscount">
                    <div class="mb-1">
                        <i class="bi bi-caret-right-fill"></i>
                        即日起至<b class="discountExp">{{ discountExp }}</b>
                        ，結帳輸入折扣碼「<b class="discountCode">HappyHalloween</b>」，即可享有全館商品滿1000折50之優惠 (滿2000折100，以此類推)
                    </div>
                    <div>
                        <i class="bi bi-caret-right-fill"></i>
                        Bunny Sugar會員，滿額可依
                        <span class="memberLevel" @click="handleOpenModal">會員分級</span> 享優惠折扣
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="orderDetailContainer">
        <div class="orderDetail">
            <div class="top">訂單資訊</div>
            <div class="detailContainer">
                <div class="total">
                    <span class="leftText">總計:</span>
                    <span>{{ totalprice }} 元</span>
                </div>
                <div class="allDiscount" :style="discountStyle">
                    <span class="leftText">折扣:<span style="font-size: small;" v-if="isDiscountCodeVisible"> (已使用折扣碼 {{ discountCode }} )</span></span>
                    <span>{{ discount }} 元</span>
                </div>
                <div class="ownDiscount" v-if="memberlevel != '白兔'">
                    <span class="leftText">{{ memberlevel }}會員專屬折扣:
                        <span>(會員折扣詳見<span @click="handleOpenModal" class="memberLevel">會員分級</span>)</span>
                    </span>
                    <span>{{ memberdiscount }} 元</span>
                </div>
                <div class="bunnyCoinDiscount">
                    <span class="leftText">Bunny Coin折扣:</span>
                    <span>{{ appliedBunnyQuantity }} 元</span>
                </div>
                <div class="useBunnyCoin">
                    <span class="leftText">使用折扣碼: </span>
                </div>
                <div class="bunnycoinNum">
                    <input type="text"  placeholder="請輸入欲使用的折扣碼"
                        class="bunnyCoinInput" v-model="inputDiscountCode">
                    <button class="use" @click="applyDiscountCode">套用</button>
                </div>
                <div class="useBunnyCoin">
                    <span class="leftText">使用Bunny Coin: </span>
                    <span>(可使用之Bunny Coin {{ remainingBunnyQuantity }} 枚)</span>
                </div>
                <div class="bunnycoinNum">
                    <input type="number" min="0" :max="maxBunnyQuantity" placeholder="請輸入欲使用的Bunny Coin數量"
                        class="bunnyCoinInput" v-model.number="bunnyquantity">
                    <button class="use" @click="applyBunnyCoin">套用</button>
                    <span class="moreDetail"> (1枚Bunny Coin可以折抵新台幣1元)</span>
                </div>
                <div class="cartLine"></div>
                <div class="finalPrice">合計:
                    <span class="finalTotalPrice">{{ finaltotal }}</span> 元
                </div>
            </div>
        </div>
    </div>

    <div class="btns">
        <RouterLink to="products" class="continueBuyBtn">
            <button class="btn1">繼續購物</button>
        </RouterLink>
        <RouterLink to="checkOut" class="goToBuyBtn">
            <button class="btn2">前往結帳</button>
        </RouterLink>
    </div>

    <MemberLevelModal ref="modalRef" />

</template>

<style scoped>
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

.top {
    width: 100%;
    padding: 1%;
    text-align: center;
    font-size: larger;
    border-radius: 10px 10px 0 0;
    color: white;
    background-color: rgba(166, 127, 120, 1);
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
    flex: 0 0 15%;
}

.quantityTitle {
    flex: 0 0 25%;
}

.totalTitle {
    flex: 0 0 15%;
}

.delTitle {
    flex: 0 0 10%;
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
    flex: 0 0 15%;
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
    flex: 0 0 15%;
}

.delInfo {
    flex: 0 0 10%;
    cursor: pointer;
}

.delInfo:hover {
    color: rgba(50, 67, 95, 0.3);
}

.promotion {
    padding: 1.5% 2%;
    border-radius: 0 0 10px 10px;
}

.productDiscount {
    align-content: center;
    color: rgba(50, 67, 95, 0.7);
}

.discountExp {
    color: rgba(166, 127, 120, 0.8);
    font-style: italic;
}

.discountCode {
    color: rgba(166, 127, 120, 0.8);
    font-weight: bold;
}

.memberLevel {
    color: rgba(166, 127, 120, 1);
    text-decoration: underline;
    cursor: pointer;
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
    border: rgba(166, 127, 120, 0.7) solid 1px;
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

.bunnycoinNum {
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
    margin-top: 3%;
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
    display: flex;
    margin-bottom: 3%;
}

.continueBuyBtn {
    flex: 0 0 50%;
    width: 90%;
    text-align: center;
}

.goToBuyBtn {
    flex: 0 0 50%;
    text-align: center;
}

.btn1 {
    width: 85%;
    padding: 1.5%;
    color: rgba(143, 134, 129, 1);
    background-color: white;
    border-radius: 10px;
    border: rgba(143, 134, 129, 0.3) solid 1px;
    font-weight: bold;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
}

.btn2 {
    width: 85%;
    padding: 1.5%;
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
}
</style>
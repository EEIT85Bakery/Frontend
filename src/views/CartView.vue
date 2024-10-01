<script setup>
import { ref, computed, watch } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import CartTopComponent1 from '@/components/CartTopComponent1.vue';
import MemberLevelModal from '@/components/MemberLevelModal.vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import axios from 'axios';
import { onMounted } from 'vue';
import axiosInstanceForInsertHeader from "@/axios/axiosInstanceForInsertHeader.js";

const cartStore = useCartStore()
const finalTotalFromPinia = computed(() => cartStore.finalTotal);

const nextLevel = ref("")
const levelUpPrice = ref(0)
const items = ref([])
const modalRef = ref(null);

const userId = ref({})
userId.value = 1

const discountExp = "2024/11/30";

// 折扣相關變數
const inputDiscountCode = ref(""); // 使用者輸入的折扣碼
const validDiscountCode = ref(false); // 折扣碼是否有效
const discountCode = "bunnySugar"; // 正確的折扣碼
const isDiscountApplied = ref(false); // 用來控制是否應用樣式變化

const isDiscountCodeVisible = ref(false);

const Generaldiscount = ref(0)
const memberdiscount = ref(0);

const bunnyquantity = ref(0);
const maxBunnyQuantity = ref(0);

const appliedBunnyQuantity = ref(0)

const memberlevel = ref({})
const accumulateSpent = ref(0)

// const test = () => {
//     axiosInstanceForInsertHeader
//       .get('/cart')
//       .then((res) => {
//         console.log(res);
        
//       })
//       .catch((error) => {
//         console.error('Error fetching cart items:', error);
//       });
// }

const getCart = () => {
    axiosInstanceForInsertHeader.get('/cart').then((res) => {
        console.log(res);
        console.log(123);
        
        items.value = res.data
        const data = res.data;
        maxBunnyQuantity.value = data[0].bunnyCoin
        memberlevel.value = data[0].userVip
        accumulateSpent.value = data[0].accumulateSpent

        if (accumulateSpent.value < 3000) {
        levelUpPrice.value = 3000 - accumulateSpent.value
        nextLevel.value = "金兔"
    } else if (accumulateSpent.value < 6000) {
        levelUpPrice.value = 6000 - accumulateSpent.value
        nextLevel.value = "白金兔"
    } else if (accumulateSpent.value < 9000) {
        levelUpPrice.value = 9000 - accumulateSpent.value
        nextLevel.value = "鑽石兔"
    }

    }).catch(() => {
        SwalHandle.showErrorMsg('取得購物車失敗')
    })
}

const deleteItem = (cartItem) => {
   
  SwalHandle.confirm(
    '確認移除',
    `您確定要把 ${cartItem.productName} 從購物車中移除嗎？`,
    '',
    () => {
      // 執行刪除操作，例如：
      axios.delete(`/api/cart/${userId.value}/${cartItem.id}`).then((res) => { 
      getCart()
    }).catch(() => {
        SwalHandle.showErrorMsg('刪除失敗，請聯繫網站管理員')
    })
    }
  );
};

// 用來觸發 modal 的打開方法
const handleOpenModal = () => {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}

const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
        // 檢查 item.quantity 是否為有效的數字
        if (typeof item.quantity !== 'number' || isNaN(item.quantity) || item.quantity < 1) {
            item.quantity = 1; // 設為 1
        }
        
        // 檢查 item.quantity 是否大於 item.stocks
        if (item.quantity > item.stocks) {
            item.quantity = item.stocks; 
        }
        
        return total + (item.price * item.quantity); 
    }, 0);
});

const calculateDiscount = () => {
    const price = totalPrice.value;
    if (validDiscountCode.value && price >= 1000 
    && memberlevel.value == "白兔") {
        let discount = Math.floor(price / 1000) * 50;
        Generaldiscount.value = discount;
    } else if(validDiscountCode.value && price >= 1000) {
        calculateMemberDiscount()
        Generaldiscount.value = 0
    }
};

const calculateMemberDiscount = () => {
    memberdiscount.value = Math.floor(totalPrice.value / 1000) * 50
if (memberlevel.value == "金兔") {
            memberdiscount.value *= 1.2
        }else if (memberlevel.value == "白金兔") {
            memberdiscount.value *= 1.6
        }else if (memberlevel.value == "鑽石兔") {
            memberdiscount.value *= 2
    }
}

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
        calculateDiscount()
        SwalHandle.showSuccessMsg("套用折扣碼成功");
    } else {
        validDiscountCode.value = false;
        isDiscountApplied.value = false;
        SwalHandle.showErrorMsg("無效的折扣碼");
    }
}

function applyBunnyCoin() {
    
    if(typeof(bunnyquantity.value) != 'number') {
        SwalHandle.showErrorMsg("請輸入數字");
         if (bunnyquantity.value <= 1) {
            bunnyquantity.value = 0
            appliedBunnyQuantity.value = 0
    }
        
    }else {
        if(bunnyquantity.value > maxBunnyQuantity.value) {
        bunnyquantity.value = maxBunnyQuantity.value
    }
    if (bunnyquantity.value <= 1) {
            bunnyquantity.value = 0
    }
        appliedBunnyQuantity.value = Math.min(bunnyquantity.value, maxBunnyQuantity.value);
        if(bunnyquantity.value > 0) {
        SwalHandle.showSuccessMsg('套用BunnyCoin成功！');
}
    }
}

const remainingBunnyQuantity = computed(() => {
    return maxBunnyQuantity.value - appliedBunnyQuantity.value;
});


// const finaltotal = computed(() => {
//     if (memberlevel.value !== '白兔') {
//         return totalPrice.value - memberdiscount.value - appliedBunnyQuantity.value
//     } else {
//         return totalPrice.value - Generaldiscount.value - appliedBunnyQuantity.value
//     }
// })



const add = (item) => {
    if(item.stocks == item.quantity) {
        SwalHandle.showErrorMsg("添加失敗，庫存已售鑿")
    }else{
    item.quantity += 1
    updateCart(item)
}
}

const minus = (item) => {
    if(item.quantity == 1) {
        SwalHandle.showErrorMsg("數量不得小於1")
    }else{
    item.quantity -= 1
    updateCart(item)

}
}

const updateCart = (item) => {
    if (item.quantity >= item.stocks) {
        item.quantity = item.stocks
    }

    if (item.quantity <= 1) {
        item.quantity = 1
    }
    axios.put(`/api/cart/${item.id}`, {
        quantity : item.quantity
    }).then(() => {
        getCart()
    }).catch(() => {
        SwalHandle.showErrorMsg("更新購物車失敗，請聯繫網站管理員")
    })
}

watch(
  [totalPrice, Generaldiscount, memberdiscount, appliedBunnyQuantity],
  () => {
    let newTotal;
    if (memberlevel.value !== '白兔') {
      newTotal = totalPrice.value - memberdiscount.value - appliedBunnyQuantity.value;
    } else {
      newTotal = totalPrice.value - Generaldiscount.value - appliedBunnyQuantity.value;
    }
    
    cartStore.setFinalTotal(newTotal);
  }
);

onMounted(() => {
    getCart()
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
                <div class="stocksTitle">庫存</div>
                <div class="totalTitle">小計</div>
                <div class="delTitle"></div>
            </div>
            <div class="cartLine"></div>
            <div class="itemContainer" v-for="(item, index) in items" :key="index + 'CartItem'">
                <div class="items">
                    <div class="productImg">
                        <img :src="item.imageUrl" alt="" class="itemImg">
                    </div>
                    <div class="productInfo">{{ item.productName }}</div>
                    <div class="priceInfo">{{ item.price }} 元</div>
                    
                    <div class="quantityInfo">
                        <button style="margin-right: 5px; background-color: rgba(166, 127, 120, 0.5);border: none; 
           padding: 5px 8px; 
           font-size: 16px; 
           color: white; 
           border-radius: 8px; 
           cursor: pointer; 
           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
           transition: all 0.3s ease;" @click="minus(item)" :disabled="item.quantity <= 1">-</button>
                        <input type="number" min="1" v-model.number="item.quantity" class="quantityInput" @blur="updateCart(item)"/>
                        <button style="margin-left: 5px; background-color: rgba(166, 127, 120, 0.5);border: none; 
           padding: 5px 8px; 
           font-size: 16px; 
           color: white; 
           border-radius: 8px; 
           cursor: pointer; 
           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
           transition: all 0.3s ease;" @click="add(item)" :disabled="item.quantity >= item.stocks">+</button>
                    </div>
                    <div class="stocksInfo">{{ item.stocks }}份</div>
                    <div class="totalInfo">{{ item.quantity > item.stocks ? item.price * item.stocks : item.price * item.quantity }} 元</div>
                    <div class="delInfo"><i @click="deleteItem(item)" class="bi bi-x-circle"></i></div>
                </div>
                <div class="cartLine"></div>
            </div>
            <div class="promotion">
                <div class="productDiscount">
                    <div class="mb-1">
                        <i class="bi bi-caret-right-fill"></i>
                        即日起至<b class="discountExp">{{ discountExp }}</b>
                        ，結帳輸入折扣碼「<b class="discountCode">bunnySugar</b>」，即可享有全館商品滿1000折50之優惠 (滿2000折100，以此類推)
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
                    <span>{{ totalPrice }} 元</span>
                </div>
                <div class="allDiscount" :style="discountStyle">
                    <span class="leftText">折扣:<span style="font-size: small;" v-if="isDiscountCodeVisible"> (已使用折扣碼 {{ discountCode }} )</span></span>
                    <span>{{ Generaldiscount }} 元</span>
                </div>
                <div class="ownDiscount" v-if="memberlevel != '白兔' && validDiscountCode">
                    <span class="leftText">{{ memberlevel }}會員專屬折扣:</span>
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
                        class="bunnyCoinInput no-arrows" v-model="bunnyquantity">
                    <button class="use" @click="applyBunnyCoin">套用</button>
                    <span class="moreDetail"> (1枚Bunny Coin可以折抵新台幣1元)</span>
                </div>
                <div class="cartLine"></div>
                <template v-if="memberlevel != '鑽石兔'" >
                <p class="finalPrice">本次再消費滿<span class="nextLevel">{{ levelUpPrice }}</span>元即可升級為<span class="nextLevel">{{ nextLevel }}</span>會員</p>
                <p class="nextLevel" style="text-align: end; font-style: italic;">(依折價後金額計算)</p>
                </template>
                <div class="finalPrice">合計:
                    <span class="finaltotalPrice">{{ finalTotalFromPinia }}</span> 元
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

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.nextLevel {
    color: rgba(166, 127, 120, 0.8);
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

.stocksTitle{
    flex: 0 0 5%
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

.stocksInfo {
    flex: 0 0 6%
}

.totalInfo {
    flex: 0 0 15%;
}

.delInfo {
    flex: 0 0 5%;
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

.finaltotalPrice {
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

    .finaltotalPrice {
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

    .finaltotalPrice {
        font-size: 4vw;
    }
}
</style>
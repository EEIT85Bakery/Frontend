<script setup>
import { ref, computed } from 'vue';
import CartTopComponent2 from '@/components/CartTopComponent2.vue';
import MemberLevelModal from '@/components/MemberLevelModal.vue';
import { useCartStore } from '@/stores/cartStore';
import { onMounted } from 'vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const modalRef = ref(null);
const cartStore = useCartStore();
const memberInfo = ref({})
const pickupTime = ref(new Date().toISOString().substring(0, 10))
const paymentMethod = ref("門市付款")

// 用來觸發 modal 的打開方法
function handleOpenModal() {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}

const getMemberInfo = () => {
    axiosInstanceForInsertHeader.get('/memberPage/getById').then((res) => { 
        memberInfo.value = res.data                
    })
}

const productimg = { imageUrl: '../../public/imgZip/Sample/cake1.jpg' };
const productname = "雙重莓果饗宴蛋糕";
const productprice = ref(360);

const quantity = ref(1);

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

const memberdiscount = ref(60);

const bunnyquantity = ref(null);
const maxBunnyQuantity = ref(15);

const appliedBunnyQuantity = ref(0);

const memberlevel = ref("金兔");

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
})

const isClicked = ref(true);

function toggleArrow() {
    isClicked.value = !isClicked.value;
}

const topStyle = computed(() => ({
    borderRadius: isClicked.value
        ? '10px 10px 0px 0px'
        : '10px 10px 0px 0px',
    borderBottomLeftRadius: isClicked.value ? '10px' : '0',
    borderBottomRightRadius: isClicked.value ? '10px' : '0'
}));

onMounted(() => {
    console.log(cartStore.paymentPrice);
    
    getMemberInfo()
    
})


</script>

<template>

    <CartTopComponent2 />
    <div class="priceBigText">合計:
        <span class="finalTotalPrice">{{ cartStore.paymentPrice }}</span> 元
    </div>

    <!-- 購物車 -->
    <div class="cartContainer">
        <div class="cart">
            <div class="top" :style="topStyle">購物車
                <i class="bi bi-caret-down-fill ms-2" v-if="!isClicked" @click="toggleArrow"></i>
                <i class="bi bi-caret-up-fill ms-2" v-if="isClicked" @click="toggleArrow"></i>
            </div>
            <div class="content" :class="{ 'collapsed': isClicked }">
                <div class="titleContainer">
                    <div class="productTitle">商品資料</div>
                    <div class="priceTitle">單件價格</div>
                    <div class="quantityTitle">數量</div>
                    <div class="totalTitle">小計</div>
                    <div class="delTitle"></div>
                </div>
                <div class="cartLine"></div>
                <div class="itemContainer">
                    <div class="items">
                        <div class="productImg">
                            <img :src="productimg.imageUrl" alt="" class="itemImg">
                        </div>
                        <div class="productInfo">{{ productname }}</div>
                        <div class="priceInfo">{{ productprice }} 元</div>
                        <div class="quantityInfo">1</div>
                        <div class="totalInfo">{{ totalprice }} 元</div>
                        <div class="delInfo"></div>
                    </div>
                    <div class="cartLine"></div>
                </div>
                <div class="detailContainer">
                    <div class="total">
                        <span class="leftText">總計:</span>
                        <span>{{ totalprice }} 元</span>
                    </div>
                    <div class="allDiscount" :style="discountStyle">
                        <span class="leftText">折扣:<span style="font-size: small;"> (已使用折扣碼 {{ cartStore.couponName }} )</span></span>
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
                    <div class="cartLine"></div>
                    <div class="finalPrice">合計:
                        <span class="finalTotalPrice">{{ finaltotal }}</span> 元
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="customerAndPayInfoContainer">
            <div class="customerInfo">
                <div class="top">顧客資訊</div>
                <div class="InfoContainer bg-white">
                    <form>
                        <div class="inputText">顧客姓名</div>
                        <input type="text" name="customerName" placeholder="直接帶入會員姓名" disabled class="infoInput" v-model="memberInfo.name">  
                        <div class="inputText">電子信箱</div>
                        <input type="email" name="mail" placeholder="直接帶入會員信箱" disabled class="infoInput" v-model="memberInfo.email">
                        <div class="inputText">電話號碼</div>
                        <input type="tel" name="mail" placeholder="直接帶入會員電話" disabled class="infoInput" v-model="memberInfo.phone">
                    </form>
                </div>

            </div>
        </div>
        <div class="pickupAndCreditInfo">
            <div class="pickupInfo">
                <div class="top">取貨資訊</div>
                <div class="InfoContainer bg-white">
                    <form>
                        <div class="inputText">取貨方式</div>
                        <input type="text" name="pickupWay" placeholder="門市取貨" disabled class="infoInput">
                        <div class="inputText">取貨日期</div>
                        <input type="date" name="pickupDate" placeholder="請選擇取貨日期" class="infoInput" v-model="pickupTime">
                    </form>
                </div>
            </div>
            <div class="payInfo">
                <div class="top">付款資訊</div>
                <div class="InfoContainer bg-white">
                    <form>
                        <div class="inputText">付款方式</div>
                        <select name="payment" class="payWay infoInput" v-model="paymentMethod">
                            <option value="門市付款">門市付款</option>
                            <option value="信用卡付款">信用卡付款</option>
                        </select>
                    </form>
                </div>
                <div></div>
            </div>

        </div>

    </div>

    <div class="btns">
        <RouterLink to="Cart" class="continueBuyBtn">
            <button class="btn1">上一步</button>
        </RouterLink>
        <RouterLink to="orderDetail" class="goToBuyBtn" v-if="paymentMethod == '門市付款'">
            <button class="btn2">提交訂單</button>
        </RouterLink>
        <RouterLink to="pay" class="goToBuyBtn" v-else>
            <button class="btn2">提交訂單</button>
        </RouterLink>
    </div>

    <MemberLevelModal ref="modalRef" />


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
    margin-bottom: 0.5%;
    font-weight: bold;
    color: rgba(143, 134, 129, 1);
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
}

.promotion {
    padding: 1.5% 2%;
    border-radius: 0 0 10px 10px;
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

    .container {
        display: inline;
    }

    .customerAndPayInfoContainer,
    .pickupAndCreditInfo {
        padding: 0 5% 0 5%;
    }

    
    
}
</style>
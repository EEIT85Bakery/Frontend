<script setup>
import { ref, computed } from 'vue';
import CartTopComponent1 from '@/components/CartTopComponent1.vue';

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

function applyBunnyCoin() {
    appliedBunnyQuantity.value = Math.min(bunnyquantity.value, maxBunnyQuantity.value);
}

const remainingBunnyQuantity = computed(() => {
    return maxBunnyQuantity.value - appliedBunnyQuantity.value;
});


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
                    <div class="delInfo"><i class="bi bi-x-circle"></i></div>
                </div>
                <div class="cartLine"></div>
            </div>
            <div class="promotion">
                <div class="productDiscount">
                    <div class="mb-1">
                        <i class="bi bi-caret-right-fill"></i>
                        即日起至<b class="discountExp">{{ discountExp }}</b>，全館商品滿1000折50
                    </div>
                    <div>
                        <i class="bi bi-caret-right-fill"></i>
                        Bunny Sugar會員，滿額可依
                        <RouterLink class="memberLevel">會員分級</RouterLink> 享優惠折扣
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
                    <span class="leftText">折扣:</span>
                    <span>{{ discount }} 元</span>
                </div>
                <div class="ownDiscount" v-if="memberlevel != '白兔'">
                    <span class="leftText">{{ memberlevel }}會員專屬折扣:
                        <span>(會員折扣詳見<RouterLink class="memberLevel">會員分級</RouterLink>)</span>
                    </span>
                    <span>{{ memberdiscount }} 元</span>
                </div>
                <div class="bunnyCoinDiscount">
                    <span class="leftText">Bunny Coin折扣:</span>
                    <span>{{ appliedBunnyQuantity }} 元</span>
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
        <RouterLink to="CheckOut" class="goToBuyBtn">
            <button class="btn2">前往結帳</button>
        </RouterLink>
    </div>

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

.memberLevel {
    color: rgba(166, 127, 120, 1);
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
<script setup>
import { ref, computed, watch } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import CartTopComponent1 from '@/components/CartTopComponent1.vue';
import MemberLevelModal from '@/components/MemberLevelModal.vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import { onMounted } from 'vue';
import axiosInstanceForInsertHeader from "@/axios/axiosInstanceForInsertHeader.js";
const cartStore = useCartStore()

const nextLevel = ref("")
const levelUpPrice = ref(0)
const items = ref([])
const modalRef = ref(null);

const discountExp = ref("2024,11/30")

// 折扣相關變數
const inputDiscountCode = ref(""); // 使用者輸入的折扣碼
const validDiscountCode = ref(false); // 折扣碼是否有效
const discountCode = ref("bunnySugar") // 正確的折扣碼
const isDiscountApplied = ref(false); // 用來控制是否應用樣式變化

const isDiscountCodeVisible = ref(false);

const Generaldiscount = ref(0)
const memberdiscount = ref(0);

const bunnyquantity = ref(0);
const maxBunnyQuantity = ref(0);

const appliedBunnyQuantity = ref(0)

const memberlevel = ref({})
const accumulateSpent = ref(0)
const isGetCart = ref(false)
const coupons = ref([])
const discountNumber = ref(50)
const costPerPrice = ref(2000)
const appliedCoupon = ref(null) 
const isCartStoreTotalBigger = ref(false)

const getCoupon = () => {
    axiosInstanceForInsertHeader.get('/admin/coupon').then(res => {
        coupons.value = res.data
    }).catch(err => {
            console.log(err)
        })
}

const convertToDate = (dateInput) => {
  if (!dateInput) return '';

  let date;
  if (Array.isArray(dateInput)) {
    // 如果是數組，假設格式為 [year, month, day]
    date = new Date(Date.UTC(dateInput[0], dateInput[1] - 1, dateInput[2]));
  } else if (typeof dateInput === 'string') {
    // 如果是字符串，直接解析
    const [year, month, day] = dateInput.split('-').map(Number);
    date = new Date(Date.UTC(year, month - 1, day));
  } else {
    // 其他情況，假設是 Date 對象或時間戳
    date = new Date(dateInput);
  }

  // 使用 toISOString() 並只取日期部分
  return date.toISOString().split('T')[0];
};

//點擊清空欄位
const clearInput = (e) => {
    e.target.value = ''
}

const countTotal = () => {
    cartStore.updateTotal(totalPrice)
}

const resetDiscount = () => {
    inputDiscountCode.value = "";
    validDiscountCode.value = false;
    isDiscountApplied.value = false;
    isDiscountCodeVisible.value = false;
    Generaldiscount.value = 0;
    memberdiscount.value = 0;
    cartStore.updateCouponName("")
};

const getCart = () => {
    axiosInstanceForInsertHeader.get('/cart').then((res) => {
        isGetCart.value = true
        items.value = res.data
             
        const data = res.data;
        if (items.value.length !== 0) {

            maxBunnyQuantity.value = data[0].bunnyCoin
            memberlevel.value = data[0].userVip
            accumulateSpent.value = data[0].accumulateSpent
        }

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
        isGetCart.value = true
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
            axiosInstanceForInsertHeader.delete(`/cart/${cartItem.id}`).then(() => {
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
    if (items.value.length !== 0) {
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
    }
});

const calculateDiscount = () => {
    const price = totalPrice.value;
    if (validDiscountCode.value && price >= costPerPrice.value) {
        if (memberlevel.value === "白兔") {
            let discount = Math.floor(price / costPerPrice.value) * discountNumber.value;
            Generaldiscount.value = discount;
            memberdiscount.value = 0; // 確保會員折扣為0
        } else {
            calculateMemberDiscount();
            Generaldiscount.value = 0; // 確保一般折扣為0
        }
    } else {
        // 重置所有折扣
        Generaldiscount.value = 0;
        memberdiscount.value = 0;
    }
};

const calculateMemberDiscount = () => {
    // 首先計算基礎折扣
    let baseDiscount = Math.floor(totalPrice.value / 1000) * discountNumber.value;
    
    // 根據會員等級應用倍數，並確保結果為整數
    let finalDiscount;
    if (memberlevel.value === "金兔") {
        finalDiscount = Math.floor(baseDiscount * 1.2);
    } else if (memberlevel.value === "白金兔") {
        finalDiscount = Math.floor(baseDiscount * 1.6);
    } else if (memberlevel.value === "鑽石兔") {
        finalDiscount = Math.floor(baseDiscount * 2);
    } else {
        finalDiscount = baseDiscount; // 對於白兔或其他等級
    }
    
    memberdiscount.value = finalDiscount;
};


// 折扣樣式的計算屬性
const discountStyle = computed(() => {
    // 只有當折扣碼有效且會員不是白兔時才應用劃線樣式
    if (isDiscountApplied.value && memberlevel.value !== '白兔' && isCartStoreTotalBigger.value == true) {
        return { textDecoration: 'line-through' };
    }
    return {};
});

const resetDiscountState = () => {
    validDiscountCode.value = false;
    isDiscountApplied.value = false;
    isDiscountCodeVisible.value = false;
    Generaldiscount.value = 0;
    memberdiscount.value = 0;
    discountNumber.value = 0;
    costPerPrice.value = 0;
    isCartStoreTotalBigger.value = false;
    cartStore.updateCouponName("");
}

function applyDiscountCode() {

    resetDiscountState();
        
        let isValid = false;

        for (let i = 0; i < coupons.value.length; i++) {

            const normalizedInput = inputDiscountCode.value.toLowerCase().trim();
            const normalizedCoupon = coupons.value[i].couponName.toLowerCase().trim();

            if (normalizedInput === normalizedCoupon) {
                isValid = true;
                appliedCoupon.value = coupons.value[i];
                break; // 找到匹配的優惠券，立即退出循環
            }
        }

        if (isValid && appliedCoupon.value) {


            validDiscountCode.value = true;
            isDiscountApplied.value = true;
            isDiscountCodeVisible.value = true;
            discountNumber.value = appliedCoupon.value.discountNumber; // 設置折扣數量
            costPerPrice.value = appliedCoupon.value.leastPriceForDiscount

    if (cartStore.total >= costPerPrice.value) {
            calculateDiscount();
            SwalHandle.showSuccessMsg("套用折扣碼成功");
            cartStore.updateCouponName(inputDiscountCode.value);
            isCartStoreTotalBigger.value = true
        }else {
        SwalHandle.showErrorMsg(`購買總額至少${costPerPrice.value}才可以使用哦！`)
    }  }
        else {
            validDiscountCode.value = false;
            isDiscountApplied.value = false;
            SwalHandle.showErrorMsg("無效的折扣碼");
        }
   
}


function applyBunnyCoin() {

    if (bunnyquantity.value < 1) {
            SwalHandle.showErrorMsg('請輸入0以上的數字')
            bunnyquantity.value = 0
            appliedBunnyQuantity.value = 0
        }

    if (typeof (bunnyquantity.value) != 'number') {
        SwalHandle.showErrorMsg("請輸入數字");
       

    } else {
        if (bunnyquantity.value > maxBunnyQuantity.value) {
            bunnyquantity.value = maxBunnyQuantity.value
        }
        if (bunnyquantity.value < 1) {
            bunnyquantity.value = 0
        }
        appliedBunnyQuantity.value = Math.min(bunnyquantity.value, maxBunnyQuantity.value);
        if (bunnyquantity.value > 0) {
            SwalHandle.showSuccessMsg('套用BunnyCoin成功！');
            cartStore.updatecoin(bunnyquantity.value)
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
    if (item.stocks == item.quantity) {
        SwalHandle.showErrorMsg("添加失敗，庫存已售鑿")
    } else {
        item.quantity += 1
        updateCart(item)
    }
}

const minus = (item) => {
    if (item.quantity == 1) {
        SwalHandle.confirm(
            '確認移除',
            `您確定要把 ${item.productName} 從購物車中移除嗎？`,
            '',
            () => {
                item.quantity = 1
                // 執行刪除操作，例如：
                axiosInstanceForInsertHeader.delete(`/cart/${item.id}`).then(() => {
                    getCart()
                }).catch(() => {
                    SwalHandle.showErrorMsg("更新購物車失敗，請聯繫網站管理員")
                })
            }
        );
    } else {
        item.quantity -= 1
        updateCart(item)

    }
}

const updateCart = (item) => {
    if (item.quantity >= item.stocks) {
        item.quantity = item.stocks
    }
    axiosInstanceForInsertHeader.put(`/cart/${item.id}`, {
        quantity: item.quantity
    }).then(() => {
        getCart()                
        cartStore.updateTotal(totalPrice.value)
        resetDiscount()
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
        cartStore.updatePaymentPrice(newTotal)
    }
);

watch(totalPrice, (newTotal) => {    
    cartStore.updateTotal(newTotal)
    calculateDiscount();
});

onMounted(() => {
    getCart()
    getCoupon()
})

</script>



<template>
    <div>
        <div v-if="items.length == 0 && isGetCart == true">
            <div class="nothingText">目前購物車中沒有商品呦</div>
            <div class="nothingContainer">
                <i class="bi bi-basket3 nothingInCart"></i>
                <!-- <i class="bi bi-cart-x nothingInCart"></i> -->
                <RouterLink to="/products" style="text-decoration: none;">
                    <div class="btnContainer">
                        <button class="nothingBtn">前往購物吧</button>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div v-else>
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
                                <img :src="`data:;base64,${item.img1}`" alt="" class="itemImg">
                            </div>
                            <div class="productInfo" style="padding-left: 65px;">{{ item.productName }}</div>
                            <div class="priceInfo">{{ item.price }} 元</div>

                            <div class="quantityInfo">
                                <button style="margin-right: 5px; background-color: rgba(166, 127, 120, 0.5);border: none; 
           padding: 5px 8px; 
           font-size: 16px; 
           color: white; 
           border-radius: 8px; 
           cursor: pointer; 
           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
           transition: all 0.3s ease;" @click="minus(item)" :disabled="item.quantity <= 0">-</button>
                                <input type="number" min="1" v-model.number="item.quantity" class="quantityInput"
                                    @blur="updateCart(item)" @click="clearInput" />
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
                            <div class="totalInfo">{{ item.quantity > item.stocks ? item.price * item.stocks :
                                item.price * item.quantity }} 元</div>
                            <div class="delInfo"><i @click="deleteItem(item)" class="bi bi-x-circle"></i></div>
                        </div>
                        <div class="cartLine"></div>
                    </div>
                    <div class="promotion">
                        <div class="productDiscount">
                            <div class="mb-1" v-for="(coupon, i) in coupons" :key="'coupon' + i">
                                <i class="bi bi-caret-right-fill"></i>
                                即日起至<b class="discountExp">{{ convertToDate(coupon.endDate) }}</b>
                                ，結帳輸入折扣碼「<b class="discountCode">{{ coupon.couponName }}</b>」，即可享有全館商品滿{{ coupon.leastPriceForDiscount }}折{{ coupon.discountNumber }}之優惠 (滿{{ coupon.leastPriceForDiscount * 2}}折{{ coupon.discountNumber * 2}}，以此類推)
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
                            <span>{{ cartStore.total }} 元</span>
                        </div>
                        <div class="allDiscount" :style="discountStyle">
                            <span class="leftText">折扣:<span style="font-size: small;" v-if="isDiscountCodeVisible && isCartStoreTotalBigger">
                                    (已使用折扣碼 {{ discountCode }} )</span></span>
                            <span>{{ Generaldiscount }} 元</span>
                        </div>
                        <div class="ownDiscount" v-if="memberlevel != '白兔' && validDiscountCode && isCartStoreTotalBigger">
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
                            <input type="text" placeholder="請輸入欲使用的折扣碼" class="bunnyCoinInput"
                                v-model="inputDiscountCode">
                            <button class="use" @click="applyDiscountCode">套用</button>
                        </div>
                        <div class="useBunnyCoin">
                            <span class="leftText">使用Bunny Coin: </span>
                            <span>(可使用Bunny Coin {{ remainingBunnyQuantity }} 枚)</span>
                        </div>
                        <div class="bunnycoinNum">
                            <input type="number" min="0" :max="maxBunnyQuantity" placeholder="請輸入欲使用的Bunny Coin數量"
                                class="bunnyCoinInput no-arrows" v-model="bunnyquantity">
                            <button class="use" @click="applyBunnyCoin">套用</button>
                            <span class="moreDetail"> (1枚Bunny Coin可以折抵新台幣1元)</span>
                        </div>
                        <div class="cartLine"></div>
                        <template v-if="memberlevel != '鑽石兔'">
                            <p class="finalPrice">本次再消費滿<span class="nextLevel">{{ levelUpPrice }}</span>元即可升級為<span
                                    class="nextLevel">{{ nextLevel }}</span>會員</p>
                            <p class="nextLevel" style="text-align: end; font-style: italic;">(依折價後金額計算)</p>
                        </template>
                        <div class="finalPrice">合計:
                            <span class="finaltotalPrice">{{ cartStore.paymentPrice }}</span> 元
                        </div>
                    </div>
                </div>
            </div>

            <div class="btns">
                <RouterLink to="products" class="continueBuyBtn">
                    <button class="btn1">繼續購物</button>
                </RouterLink>
                <RouterLink to="checkOut" class="goToBuyBtn">
                    <button class="btn2" @click="countTotal">前往結帳</button>
                </RouterLink>
            </div>

            <MemberLevelModal ref="modalRef" />
        </div>

       

    </div>


</template>

<style scoped>

.nothingText {
    text-align: center;
    padding: 5% 0 0 0;
    color: rgba(50, 67, 95, 0.8);
    font-weight: bold;
    font-size: larger;
}


.nothingContainer {
    display: flex;
    flex-direction: column;
    color: rgba(143, 134, 129, 1);
}

.nothingInCart {
    font-size: 10vw;
    text-align: center;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1% 0 5% 0;
}

.nothingBtn {
    padding: 1% 2%;
    border: rgba(143, 134, 129, 1) solid 1.5px;
    border-radius: 5px;
    /* background-color: white; */
    color: rgba(143, 134, 129, 1);
    font-weight: bold;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}









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

.stocksTitle {
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
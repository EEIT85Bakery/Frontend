<script setup>
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { ref, computed, onMounted } from 'vue';

const totalSpent = ref(123);

const data = ref({})
const gameTimes = ref(123);
const coinQuantity = ref(123);

const getCart = () => {
    axiosInstanceForInsertHeader.get('/memberPage/info').then(res => {
        data.value = res.data
        totalSpent.value = data.value.accumulateSpent
        coinQuantity.value = data.value.bunnyCoin
        gameTimes.value = data.value.gameTimes
    }).catch(err => console.log(err))
}

const membershipInfo = computed (() => {

    let memberLevel = '';
    let gap = null;
    let nextLevel = '';

    if (totalSpent.value < 3000) {
        memberLevel = '白兔會員'
        gap = 3000 - totalSpent.value
        nextLevel = '金兔會員'
    } else if (totalSpent.value >= 3000 && totalSpent.value <= 5999) {
        memberLevel = '金兔會員'
        gap = 6000 - totalSpent.value
        nextLevel = '白金兔會員'
    } else if (totalSpent.value >= 6000 && totalSpent.value <= 8999) {
        memberLevel = '白金兔會員'
        gap = 9000 - totalSpent.value
        nextLevel = '鑽石兔會員'
    } else {
        memberLevel = '鑽石兔會員'
        gap = null
        nextLevel = null
    }

    return { memberLevel, gap, nextLevel }
});


onMounted(() => {
    getCart()
})

</script>

<template>
    <div class="outsideContainer">
        <div class="infoContainer">
            <div class="menuContainer">
                <div class="menuOption">
                    <div class="customerInfo">
                        <RouterLink to="customerInformation" class="textColor">個人資訊</RouterLink>
                    </div>
                    <div class="orderInfo">
                        <RouterLink to="orderList" class="textColor">訂單</RouterLink>
                    </div>
                    <div class="wishList">
                        <RouterLink to="wishList" class="textColor">我的收藏</RouterLink>
                    </div>
                    <div class="levelAndCoin">
                        <RouterLink to="discount" class="textColor">優惠專區</RouterLink>
                    </div>
                    <!-- <div class="myDay">
                        <RouterLink to="anniversary" class="textColor">紀念日</RouterLink>
                    </div> -->
                </div>
                <div class="bottomOption">
                    <div class="line"></div>
                    <div class="logoutOption">
                        <RouterLink to="/" class="textColor">登出</RouterLink>
                    </div>
                </div>
            </div>
            <div class="cutLine"></div>
            <div class="contentContainer">
                <div class="contentTitleContainer">
                    <div class="title">優惠專區</div>
                    <div class="line"></div>
                </div>
                <div class="insideContentContainer">

                    <div class="myMemberContainer">

                        <div class="myTitle">Bunny Sugar 會員</div>
                        <div>
                            <div class="spaceBetween">
                                <span class="theme">您的會員等級:</span>
                                <span class="boldAndI">{{ membershipInfo.memberLevel }}</span>
                            </div>
                            <div class="spaceBetween">
                                <span class="theme">目前累積消費:</span>
                                <span><span class="boldAndI">{{ totalSpent }}</span> 元</span>
                            </div>

                            <hr />

                            <div class="text" v-if="membershipInfo.memberLevel != '鑽石兔會員'">
                                <i class="bi bi-caret-right-fill me-2"></i>
                                <span>全館再消費<span><b> {{ membershipInfo.gap }} 元</b></span>，即可升級成為<span><b>{{ membershipInfo.nextLevel }}</b></span></span>
                            </div>
                            <div class="text">
                                <i class="bi bi-caret-right-fill me-2"></i>
                                <span>會員專屬優惠詳見以下會員分級說明表</span>
                                <i class="bi bi-arrow-down-short"></i>
                            </div>


                        </div>

                    </div>

                    <div class="myGameContainer">

                        <div class="myTitle">Bunny Coin 購物金</div>
                        <div class="spaceBetween">
                            <span class="theme">剩餘遊戲次數:</span>
                            <span><span class="boldAndI">{{ gameTimes }}</span> 次</span>
                        </div>
                        <div class="spaceBetween">
                            <span class="theme">擁有的 Bunny Coin:</span>
                            <span><span class="boldAndI">{{ coinQuantity }}</span> 枚</span>
                        </div>

                        <hr />

                        <div class="text">
                            <i class="bi bi-caret-right-fill me-2"></i>
                            <span>單筆消費滿<b> 500 元</b>，可獲得 1 次遊戲機會</span>
                        </div>
                        <div class="text">
                            <i class="bi bi-caret-right-fill me-2"></i>
                            <span>玩遊戲可賺取 Bunny Coin，Bunny Coin 可用於折抵消費</span>
                        </div>
                        <div class="text">
                            <i class="bi bi-caret-right-fill me-2"></i>
                            <span>1 枚 Bunny Coin 可折抵新台幣 1 元</span>
                        </div>

                    </div>
                </div>

                <div class="tableTitle">會員分級說明表 <i class="bi bi-caret-down-fill"></i></div>

                <div class="tableContainer">
                    
                    <table>
                        <tr>
                            <th width="80"></th>
                            <th>白兔會員</th>
                            <th>金兔會員</th>
                            <th>白金兔會員</th>
                            <th>鑽石兔會員</th>
                        </tr>
                        <tr>
                            <td><b>資格</b></td>
                            <td>註冊會員即可成為白兔會員</td>
                            <td>一年內累積消費達 3000 元以上</td>
                            <td>一年內累積消費達 6000 元以上</td>
                            <td>一年內累積消費達 9000 元以上</td>
                        </tr>
                        <tr>
                            <td><b>福利</b></td>
                            <td>無</td>
                            <td>消費時可獲取全館折扣乘以 1.2 倍之專屬折扣</td>
                            <td>消費時可獲取全館折扣乘以 1.6 倍之專屬折扣</td>
                            <td>消費時可獲取全館折扣乘以 2 倍之專屬折扣</td>
                        </tr>
                    </table>
                    
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.myMemberContainer {
    flex: 50%;
    margin: 0% 2%;
}

.myGameContainer {
    flex: 50%;
    margin: 0% 2%;
}

.myTitle {
    color: rgba(143, 134, 129, 1);
    font-size: large;
    font-weight: bold;
    text-align: center;
    /* margin: 0 5%; */
    padding-bottom: 1.5%;
    border-bottom: rgba(166, 127, 120, 1) solid 1px;
}

.spaceBetween {
    display: flex;
    justify-content: space-between;
    margin: 2% 0;
    color: rgba(50, 67, 95, 1);
    font-weight: bold;
}

.theme {
    color: rgba(50, 67, 95, 1);
}

.boldAndI {
    font-weight: bold;
    font-style: italic;
    font-size: large;
    color: rgba(166, 127, 120, 1);
}

.text {
    font-size: small;
    color: rgba(50, 67, 95, 0.7);
    margin-bottom: 1%;
}

.tableContainer {
    margin: 1%;
    display: flex;
    justify-content: center
    
}

tr {
    text-align: center;
    
}

th {
    padding: 1%;
    border: white solid 2px;
    color: white;
    background-color: rgba(166, 127, 120, 1);
}

td {
    border: white solid 2px;
    padding: 1%;
    color: rgba(143, 134, 129, 1);
    font-size: small;
    background-color: rgba(166, 127, 120, 0.1);
}

.tableTitle {
    text-align: center;
    font-size: small;
    color: rgba(143, 134, 129, 1);
    margin-bottom: 0.5%;
    margin-top: 3%;
}

.outsideContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    padding: 3% 8%;
}

.infoContainer {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.menuContainer {
    flex: 0 0 15%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2%;
}

.contentContainer {
    display: flex;
    flex-direction: column;
    flex: 0 0 85%;
    width: 100%;
    padding: 1%;
    height: fit-content;
}

.menuOption {
    color: rgba(143, 134, 129, 1);
    margin-bottom: 10%;
}

.logoutOption {
    color: rgba(166, 127, 120, 1);
}

.customerInfo,
.orderInfo,
.wishList,
.logoutOption,
.levelAndCoin,
.myDay {
    padding: 20%;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: rgba(143, 134, 129, 1);
}

.textColor {
    text-decoration: none;
    color: rgba(143, 134, 129, 1);
}

.textColor:focus {
    color: rgba(50, 67, 95, 1);
    text-decoration: underline;
}

.line {
    width: 100%;
    height: 1px;
    background-color: rgba(166, 127, 120, 0.7);
}

.cutLine {
    flex: 0 0 1px;
    background-color: rgba(166, 127, 120, 0.3);
}

.contentTitleContainer {
    padding: 1.5%;
    text-align: center;
    font-weight: bold;
}

.title {
    padding-bottom: 1.5%;
    font-size: 1.8vw;
    color: rgba(166, 127, 120, 1);
}

.insideContentContainer {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1% 3%;
}
</style>
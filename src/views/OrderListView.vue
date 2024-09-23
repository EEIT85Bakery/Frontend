<script>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
    components: {
        PaginationComponent
    },
    setup() {
        const items = ref([
            {
                orderNumber: '2024010101',
                date: '2024-01-01',
                price: '3600元',
                orderStatus: '已付款'
            },
            {
                orderNumber: '2024010101',
                date: '2024-01-01',
                price: '3600元',
                orderStatus: '已付款'
            },
            {
                orderNumber: '2024010101',
                date: '2024-01-01',
                price: '3600元',
                orderStatus: '已付款'
            },
            {
                orderNumber: '2024010101',
                date: '2024-01-01',
                price: '3600元',
                orderStatus: '已付款'
            },
            {
                orderNumber: '2024010101',
                date: '2024-01-01',
                price: '3600元',
                orderStatus: '已付款'
            }
        ]);

        return {
            items
        };
    }
}

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
                    <div class="myDay">
                        <RouterLink to="anniversary" class="textColor">紀念日</RouterLink>
                    </div>
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
                    <div class="title">訂單</div>
                    <div class="line"></div>
                </div>
                <div class="insideContentContainer">

                    <table class="contentTable">
                        <thead>
                            <tr class="content">
                                <th>訂單號碼</th>
                                <th>訂單日期</th>
                                <th>合計</th>
                                <th>訂單狀態</th>
                                <th>訂單內容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in items" :key="index">
                                <td>{{ item.orderNumber }}</td>
                                <td>{{ item.date }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.orderStatus }}</td>
                                <td>
                                    <RouterLink><i class="bi bi-info-circle-fill" style="color: darkgray;"></i>
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PaginationComponent />
            </div>
        </div>
    </div>

</template>

<style scoped>
.contentTable {
    width: 100%;
    line-height: 3;
    text-align: center;
    color: rgba(50, 67, 95, 1);
}

.contentTable th {
    color: rgba(143, 134, 129, 1);
    border-bottom: rgba(166, 127, 120, 0.5) solid 1.5px;
}

.contentTable tr {
    border-bottom: rgba(166, 127, 120, 0.5) solid 1px;
}


.editBtn {
    color: white;
    background-color: rgba(166, 127, 120, 0.8);
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
    padding: 1% 3%;
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
    padding: 1.5% 1.5% 0.5% 1.5%;
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
}
</style>
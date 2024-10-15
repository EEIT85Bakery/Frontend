<script setup>
import { ref, onMounted } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const wishListItems = ref([]); // 保存從後端取得的收藏清單數據


const itemsPerPage = ref(3);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(0);

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchWishListItems(page);
};

const addToCart = (product) => {
    axiosInstanceForInsertHeader.post('/cart', {
        productId: product.productId,
        quantity: 1,
        price: product.price
    }).then(() => {
        SwalHandle.showSuccessMsg("成功新增到購物車")
    }).catch((err) => {
        console.log(err);
    })
}

const fetchWishListItems = (page) => {
    const params = {
    page: page - 1,
    size: itemsPerPage.value
  };
    axiosInstanceForInsertHeader
        .get('/wishList/items',{params})
        .then((response) => {
            const { content, totalElements, totalPages: backendTotalPages, size, number } = response.data;
      totalItems.value = totalElements;
      totalPages.value = backendTotalPages;
      currentPage.value = number + 1;
      itemsPerPage.value = size;
            wishListItems.value = content;
           console.log(wishListItems.value);    
           
        })
        .catch((error) => {
            console.error('Error fetching wish List items:', error);
        });
};

onMounted(() => {
    fetchWishListItems(1);
})

const deleteItem = (item) => {
    console.log(item.productId);
    
    SwalHandle.confirm(
        '確認刪除',
        `您確定要刪除 ${item.productName} 嗎？`,
        '',
        () => {
            // 執行刪除操作，例如：
            axiosInstanceForInsertHeader.delete(`/wishList/delete/${item.productId}`)
                .then(() => {
                    SwalHandle.showSuccessMsg(`已刪除${item.productName}`);
                    fetchWishListItems(currentPage.value);
                }).catch((err) => {
                    console.log(err);
                })
        }
    );
};







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
                    <div class="title">我的收藏</div>
                    <div class="line"></div>
                </div>
                <div class="insideContentContainer">

                    <table class="contentTable">
                        <thead>
                            <tr class="content">
                                <th>商品資訊</th>
                                <th>價格</th>
                                <th>購買狀態</th>
                                <th>刪除</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in wishListItems" :key="index">
                                <td class="imgTd">
                                    <img :src="`data:;base64,${item.img1}`" alt="img" class="img">
                                    <span>{{ item.productName }}</span>
                                </td>
                                <td>{{ item.price }} 元</td>
                                <td>
                                    <button class="btnRight" @click="addToCart(item)">加入購物車</button>
                                </td>
                                <td @click="deleteItem(item)"><i class="bi bi-x-circle"
                                        style="color: darkgray; cursor: pointer;"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <PaginationComponent :totalPages="totalPages" 
            :currentPage="currentPage" @pageChange="handlePageChange">
            </PaginationComponent>
            </div>
        </div>
    </div>

</template>

<style scoped>
.bi:hover {
    opacity: 0.7;
}

.btnRight {
    border: transparent solid 1px;
    border-radius: 5px;
    background-color: rgba(166, 127, 120, 1);
    color: white;
    /* font-weight: bold; */
    padding: 0% 10%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-left: 2%;
    font-size: small;
}


.imgTd {
    width: 30%;
    text-align: left;
    vertical-align: middle;
    padding: 1%;
}

.img {
    width: 30%;
    height: auto;
    object-fit: cover;
    vertical-align: middle;
    margin-right: 5%;
}

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
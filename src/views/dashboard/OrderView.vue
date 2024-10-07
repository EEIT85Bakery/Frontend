<script setup>
import { ref, onMounted, watch } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/OrderModal.vue';
import DashBoardNavBarOrder from '@/components/DashBoardNavBarOrder.vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { useRoute, useRouter } from 'vue-router';

const orderModalRef = ref(null);
const currentOrderNumber = ref(null);
const orders = ref([]);
const totalElements = ref(0);
const totalPages = ref(0);
const size = ref(10); // 每頁顯示10
const currentPage = ref(1);  // 當前頁碼
const route = useRoute();
const router = useRouter();


// 打開編輯 modal
// const openEditCouponModal = (item) => {
//   currentItem.value = item;
//   if (orderModalRef.value) {
//     orderModalRef.value.openModal();
//   }
// };

const deleteItem = (order) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除訂單 ${order.orderNumber} 嗎？`,
    '刪除成功！', 
    () => {
      // 執行刪除操作，例如：
      orders.value = orders.value.filter(i => i !== order);
      SwalHandle.showSuccessMsg(`成功刪除 ${orders.orderNumber}`);
    }
  );
};

// 從後端取得訂單資料，根據電話號碼和訂單編號來查詢
const fetchOrders = () => {
  const params = {
    page: currentPage.value,
    size: size.value,
  };
  // 如果有輸入電話號碼，則將其加入查詢參數
  if (route.query.search) {
    params.search = route.query.search;
  }
  axiosInstanceForInsertHeader
    .get('/admin/orders', { params })
    .then((response) => {
      const { content, totalElements: total, totalPages: pages } = response.data;
      orders.value = content; // 設定訂單資料
      totalElements.value = total; // 總資料數
      totalPages.value = pages; // 總頁數
      console.log('route.query:', route.query);
      console.log('params:', params);
    })
    .catch((error) => {
      SwalHandle.showErrorMsg('無法取得訂單資料', error.response?.data?.message || error.message);
    });
};

watch(() => route.query, (newQuery) => {
  currentPage.value = 1; // 重置頁碼
  // 檢查是否有 search 參數
  if (newQuery.search) {
    fetchOrders({ search: newQuery.search });
  } else {
    fetchOrders();
  }
}, { deep: true });

// 打開編輯訂單狀態modal
const openOrderModal = (order) => {
  currentOrderNumber.value = order.orderNumber;
  console.log('Opening modal for editing order:', order.orderNumber);
  if (orderModalRef.value) {
    orderModalRef.value.openModal();
  }
};

// 用於接收更新後的會定訂單資料
const handleOrderUpdated = (updatedOrder) => {
  const index = orders.value.findIndex(order => order.orderNumber === updatedOrder.orderNumber);
  if (index !== -1) {
    orders.value[index] = updatedOrder;
  }
};

// 頁數變更時觸發
const handlePageChange = (newPage) => {
    currentPage.value = newPage; // 更新頁碼
    fetchOrders(); // 重新取得資料
};

// 初始化時載入訂單資料
onMounted(() => {
  fetchOrders();
});


</script>

<template>

    <DashBoardNavBarOrder />

    <div class="pageContainer">

        <div class="contentContainer">
            <table class="contentTable">
                <thead>
                    <tr class="content">
                        <th>訂單編號</th>
                        <th>訂購人姓名</th>
                        <th>電話號碼</th>
                        <th>購買款項</th>
                        <th>總金額</th>
                        <th>付款狀態</th>
                        <th>訂單狀態</th>
                        <th>編輯</th>
                        <th>刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order, index) in orders" :key="index">
                        <td>{{ order.orderNumber }}</td>
                        <td>{{ order.userName }}</td>
                        <td>{{ order.userPhone }}</td>
                        <td class="listContainer">
                            <ul class="list">
                                <li class="listItem" v-for="(product, prodIndex) in order.orderDetails" :key="prodIndex">
                                    {{ product.productName }} 數量:{{ product.quantity }}
                                </li>
                            </ul>
                        </td>
                        <td>{{ order.paidPrice }}</td>
                        <td>{{ order.paymentStatus }}</td>
                        <td>{{ order.pickupStatus }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openOrderModal(order)"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteItem(item)"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent :totalPages="totalPages" :currentPage="currentPage" @pageChange="handlePageChange" />

        </div>

        <OrderModal ref="orderModalRef" :orderNumber="currentOrderNumber" @orderUpdated="handleOrderUpdated" />


    </div>

</template>

<style scoped>
.listContainer {
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
}

.list {
    list-style-type: none;
    padding: 0;
    margin-top: 3%;
}

.listItem {
    line-height: 2;
}


.addBtnContainer {
    padding: 0 1% 1.5% 1%;
    display: flex;
    justify-content: end;
}

.addBtn {
    font-size: small;
    padding: 1% 1.5%;
    border: 0;
    border-radius: 10px;
    color: white;
    background-color: rgba(166, 127, 120, 0.8);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.bi {
    cursor: pointer;
}


.pageContainer {
    width: 100%;
    /* height: 45vw; */
    padding: 2% 5%;
    /* background-color: lightpink; */

}

.contentContainer {
    width: 100%;
    height: 100%;
    padding: 1% 2%;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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
</style>
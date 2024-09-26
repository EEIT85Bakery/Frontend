<script setup>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import OrderModal from '@/components/OrderModal.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';

const orderModalRef = ref(null);
const currentItem = ref(null); 

// 打開新增 modal
const openOrderModal = () => {
  currentItem.value = null; // 清空當前選中的商品，表示新增
  if (orderModalRef.value) {
    orderModalRef.value.openModal();
  }
};

// 打開編輯 modal
// const openEditCouponModal = (item) => {
//   currentItem.value = item;
//   if (orderModalRef.value) {
//     orderModalRef.value.openModal();
//   }
// };

const deleteItem = (item) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除訂單 ${item.orderNumber} 嗎？`,
    '刪除成功！', 
    () => {
      // 執行刪除操作，例如：
      items.value = items.value.filter(i => i !== item);
      SwalHandle.showSuccessMsg(`成功刪除 ${item.orderNumber}`);
    }
  );
};


const items = ref([
    {
        orderNumber: '2024010101',
        userName: '吉伊卡哇',
        tel: '0912-345-678',
        productNames: [
            '經典紐約起司蛋糕 (數量: 1 顆)',
            '經典抹茶起司蛋糕 (數量: 2 顆)',
            '季節草莓起司蛋糕 (數量: 3 顆)'
        ],
        price: '3600元',
        isPaid: '已付款',
        orderStatus: '已確認'
    },
    {
        orderNumber: '2024010101',
        userName: '吉伊卡哇',
        tel: '0912-345-678',
        productNames: [
            '經典紐約起司蛋糕 (數量: 1 顆)',
            '經典抹茶起司蛋糕 (數量: 2 顆)',
            '季節草莓起司蛋糕 (數量: 3 顆)'
        ],
        price: '3600元',
        isPaid: '已付款',
        orderStatus: '已確認'
    },
    {
        orderNumber: '2024010101',
        userName: '吉伊卡哇',
        tel: '0912-345-678',
        productNames: [
            '經典紐約起司蛋糕 (數量: 1 顆)',
            '經典抹茶起司蛋糕 (數量: 2 顆)',
            '季節草莓起司蛋糕 (數量: 3 顆)'
        ],
        price: '3600元',
        isPaid: '已付款',
        orderStatus: '已確認'
    },
    {
        orderNumber: '2024010101',
        userName: '吉伊卡哇',
        tel: '0912-345-678',
        productNames: [
            '經典紐約起司蛋糕 (數量: 1 顆)',
            '經典抹茶起司蛋糕 (數量: 2 顆)',
            '季節草莓起司蛋糕 (數量: 3 顆)'
        ],
        price: '3600元',
        isPaid: '已付款',
        orderStatus: '已確認'
    }
]);


</script>

<template>

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
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.orderNumber }}</td>
                        <td>{{ item.userName }}</td>
                        <td>{{ item.tel }}</td>
                        <td class="listContainer">
                            <ul class="list">
                                <li class="listItem" v-for="(product, prodIndex) in item.productNames" :key="prodIndex">
                                    {{ product }}
                                </li>
                            </ul>
                        </td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.isPaid }}</td>
                        <td>{{ item.orderStatus }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openOrderModal(item)"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteItem(item)"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent />

        </div>

        <OrderModal ref="orderModalRef" :product="currentItem" />


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
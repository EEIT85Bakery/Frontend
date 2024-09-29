<script setup>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/CouponModal.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';

const couponModalRef = ref(null);
const currentItem = ref(null); 

// 打開新增 modal
const openCouponModal = () => {
  currentItem.value = null; // 清空當前選中的商品，表示新增
  if (couponModalRef.value) {
    couponModalRef.value.openModal();
  }
};

// 打開編輯 modal
const openEditCouponModal = (item) => {
  currentItem.value = item; // 設置選中的商品
  if (couponModalRef.value) {
    couponModalRef.value.openModal();
  }
};

// 調用子组件的 openModal 方法
// const openCouponModal = () => {
//   if (couponModalRef.value) {
//     couponModalRef.value.openModal();
//   } else {
//     console.error('CouponModal component is not correctly referenced.');
//   }
// };




// const showError = () => {
//   SwalHandle.showErrorMsg('這是一條錯誤消息！');
// };

// const showSuccess = () => {
//   SwalHandle.showSuccessMsg('操作成功！');
// };

// const confirmAction = () => {
//   SwalHandle.confirm('確認操作', '您確定要執行此操作嗎？', () => {
//     // 確認後執行的操作
//     console.log('操作已確認！');
//   });
// };

const deleteItem = (item) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除 ${item.name} 嗎？`,
    '刪除成功！', 
    () => {
      // 執行刪除操作，例如：
      items.value = items.value.filter(i => i !== item);
      SwalHandle.showSuccessMsg(`成功刪除 ${item.name}`);
    }
  );
};

const items = ref([
  {
    name: 'HappyHalloween',
    price: 1000 ,
    discount: 50 ,
    date: '2024-11-30',
    isEnable: '是',
  },
  {
    name: 'HappyMomDay',
    price: 1000,
    discount: 50 ,
    date: '2024-11-30',
    isEnable: '是',
  },
  {
    name: 'HappyDadDay',
    price: 1000 ,
    discount: 50 ,
    date: '2024-11-30',
    isEnable: '是',
  },
  {
    name: 'MerryChristmas',
    price: 1000 ,
    discount: 50 ,
    date: '2024-11-30',
    isEnable: '是',
  },
  {
    name: 'HappyNewYear',
    price: 1000 ,
    discount: 50,
    date: '2024-11-30',
    isEnable: '是',
  },
  {
    name: 'HappyNewEve',
    price: 1000,
    discount: 50,
    date: '2024-11-30',
    isEnable: '是',
  },
]);


</script>

<template>

    <div class="pageContainer">

        <div class="addBtnContainer">
        <button class="addBtn" @click="openCouponModal">
            <i class="bi bi-plus-square-dotted me-2"></i><span>建立新的折扣碼</span>
        </button>
    </div>

        <div class="contentContainer">
            <table class="contentTable">
                <thead>
                    <tr class="content">
                        <th>名稱</th>
                        <th>折扣滿額</th>
                        <th>折扣金額</th>
                        <th>到期日</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                        <th>刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }} 元</td>
                        <td>{{ item.discount }} 元</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.isEnable }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openEditCouponModal(item)"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteItem(item)"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent />

        </div>

       <!-- <CouponModal ref="couponModalRef" /> -->
       <CouponModal ref="couponModalRef" :product="currentItem" />

    </div>

</template>

<style scoped>

.addBtnContainer {
    padding:0 1% 1.5% 1%;
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
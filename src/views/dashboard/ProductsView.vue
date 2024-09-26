<script setup>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';

const productModalRef = ref(null);
const currentItem = ref(null); 

// 打開新增 modal
const openproductModal = () => {
  currentItem.value = null; // 清空當前選中的商品，表示新增
  if (productModalRef.value) {
    productModalRef.value.openModal();
  }
};

// 打開編輯 modal
const openEditproductModal = (item) => {
  currentItem.value = item; // 設置選中的商品
  if (productModalRef.value) {
    productModalRef.value.openModal();
  }
};

const deleteItem = (item) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除 ${item.name} 嗎？`,
    '刪除成功！', // 自定義的成功消息
    () => {
      // 執行刪除操作，例如：
      items.value = items.value.filter(i => i !== item);
      SwalHandle.showSuccessMsg(`成功刪除 ${item.name}`);
    }
  );
};

    
const items = ref([
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: 160,
        isEnable: '是',
        unit: '顆',
        description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
        ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: 160,
        isEnable: '是',
        unit: '顆',
        description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
        ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: 160,
        isEnable: '是',
        unit: '顆',
        description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
        ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: 160,
        isEnable: '是',
        unit: '顆',
        description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
        ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: 160,
        isEnable: '是',
        unit: '顆',
        description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
        ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: 160,
        isEnable: '是',
        unit: '顆',
        description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
        ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
    }
    
]);


</script>

<template>

    <div class="pageContainer">

        <div class="addBtnContainer">
        <button class="addBtn" @click="openproductModal">
            <i class="bi bi-plus-square-dotted me-2"></i><span>建立新的商品</span>
        </button>
    </div>


        <div class="contentContainer">
            <table class="contentTable">
                <thead>
                    <tr class="content">
                        <th>分類</th>
                        <th>商品名稱</th>
                        <th>售價</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                        <th>刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.category }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }} 元</td>
                        <td>{{ item.isEnable }}</td>
                        <td><i @click="openEditproductModal(item)" class="bi bi-pencil-square" style="color: darkgrey;"></i></td>
                        <td><i @click="deleteItem(item)" class="bi bi-trash3" style="color: darkred;"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent />

        </div>

        <ProductModal ref="productModalRef" :product="currentItem" />


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
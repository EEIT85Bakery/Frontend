<script setup>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';
import DashBoardNavBarProduct from '@/components/DashBoardNavBarProduct.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';
import { onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const productModalRef = ref(null);
const currentItem = ref(null); 
const items = ref({})
const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = ref(0)
// const cartStore = useCartStore()

const handlePageChange = (page) => {
    currentPage.value = page
      getProducts(page);
    };

const getProducts = (page) => {
    
    axiosInstanceForInsertHeader.get('/admin/products/page', {
        params: {page: page - 1, size: itemsPerPage.value}
    }).then((res) => {
        const { content, totalElements, totalPages: backendTotalPages, size, number } = res.data;
        totalItems.value = totalElements;
        totalPages.value = backendTotalPages;
        currentPage.value = number + 1;  // 後端頁碼從0開始，所以加1
        itemsPerPage.value = size;
        
        items.value = content      
        console.log(items.value);
        
        items.value.forEach(item => {
        // 使用一個輔助函數來處理圖片轉換
        item.img1 = convertToDataURL(item.img1)
        item.img2 = convertToDataURL(item.img2)
        item.img3 = convertToDataURL(item.img3)
        item.img4 = convertToDataURL(item.img4)
      })
    })
}

const convertToDataURL = (base64String) => {
  if (!base64String) return null // 如果沒有圖片數據，返回 null

  // 檢測圖片類型（這裡僅檢測了 JPEG 和 PNG，你可以根據需要擴展）
  const isPNG = base64String.charAt(0) === 'i' // iVBORw0KGgo... (PNG 的特徵)
  const mimeType = isPNG ? 'image/png' : 'image/jpeg'

  return `data:${mimeType};base64,${base64String}`
}

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
   SwalHandle.confirm('刪除商品',`確認要刪除${item.productName}這個產品?`,'',
    () =>  {
  axiosInstanceForInsertHeader.delete(`/admin/products/${item.id}`).then(() => {
    SwalHandle.showSuccessMsg(`已刪除${item.productName}`)
    getProducts(currentPage.value)
  }).catch((err) => {
    console.log(err);
    
  })
})
};

    
// const items = ref([
//     {
//         category: '蛋糕',
//         name: '紐約起司蛋糕',
//         price: 160,
//         isEnable: '是',
//         unit: '顆',
//         description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
//         ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
//     },
//     {
//         category: '蛋糕',
//         name: '紐約起司蛋糕',
//         price: 160,
//         isEnable: '是',
//         unit: '顆',
//         description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
//         ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
//     },
//     {
//         category: '蛋糕',
//         name: '紐約起司蛋糕',
//         price: 160,
//         isEnable: '是',
//         unit: '顆',
//         description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
//         ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
//     },
//     {
//         category: '蛋糕',
//         name: '紐約起司蛋糕',
//         price: 160,
//         isEnable: '是',
//         unit: '顆',
//         description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
//         ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
//     },
//     {
//         category: '蛋糕',
//         name: '紐約起司蛋糕',
//         price: 160,
//         isEnable: '是',
//         unit: '顆',
//         description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
//         ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
//     },
//     {
//         category: '蛋糕',
//         name: '紐約起司蛋糕',
//         price: 160,
//         isEnable: '是',
//         unit: '顆',
//         description: '訂購天數需要3~7個工作天（不含訂購當天）為保持風味最佳，請於隔日內享用完畢',
//         ingredient: '| 新鮮草莓 | 動物性鮮奶油 | 奶油乳酪 | 海綿蛋糕 |'
//     }
    
// ]);

onMounted(() => {
    getProducts(currentPage.value)
})


</script>

<template>

    <DashBoardNavBarProduct />

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
                        <td>{{ item.categoryName }}</td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.price }} 元</td>
                        <td>{{ item.enable ? "已啟用" : "未啟用" }}</td>
                        <td><i @click="openEditproductModal(item)" class="bi bi-pencil-square" style="color: darkgrey;"></i></td>
                        <td><i @click="deleteItem(item)" class="bi bi-trash3" style="color: darkred;"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent :totalPages="totalPages" :currentPage="currentPage" @pageChange="handlePageChange">
            </PaginationComponent>
        </div>
        
        <ProductModal ref="productModalRef" :product="currentItem" @getProducts="getProducts(currentPage)" :currentPage="currentPage"/>


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
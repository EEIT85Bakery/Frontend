<script setup>
import { ref, watch } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue';
import DashBoardNavBarProduct from '@/components/DashBoardNavBarProduct.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const router = useRouter();
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const totalPages = ref(0);
const items = ref([]);
const currentItem = ref(null);
const productModalRef = ref(null);
const searchInput = ref('');
const url = ref('/admin/products/search')

const clearCurrentItem = () => {
  currentItem.value = null
}

const handlePageChange = (page) => {
  currentPage.value = page;
  getProducts(page);
};

const getProducts = (page) => {
  const params = {
    page: page - 1,
    size: itemsPerPage.value
  };

  if (route.query.search) {
    params.search = route.query.search;
  }else if(route.query.search == undefined) {
    params.search = ''
  }
  axiosInstanceForInsertHeader.get(`${url.value}`, {params})
    .then((res) => {
      const { content, totalElements, totalPages: backendTotalPages, size, number } = res.data;
      totalItems.value = totalElements;
      totalPages.value = backendTotalPages;
      currentPage.value = number + 1;
      itemsPerPage.value = size;
      items.value = content.map(item => ({
        ...item,
        img1: convertToDataURL(item.img1),
        img2: convertToDataURL(item.img2),
        img3: convertToDataURL(item.img3),
        img4: convertToDataURL(item.img4)
      }));
    });
};

const convertToDataURL = (base64String) => {
  if (!base64String) return null;
  const isPNG = base64String.charAt(0) === 'i';
  const mimeType = isPNG ? 'image/png' : 'image/jpeg';
  return `data:${mimeType};base64,${base64String}`;
};

const openproductModal = () => {
  currentItem.value = null;
  if (productModalRef.value) {
    productModalRef.value.openModal();
  }
};

const openEditproductModal = (item) => {
  currentItem.value = item;
  if (productModalRef.value) {
    productModalRef.value.openModal();
  }
};

const deleteItem = (item) => {
  SwalHandle.confirm('刪除商品', `確認要刪除${item.productName}這個產品?`, '',
    () => {
      axiosInstanceForInsertHeader.delete(`/admin/products/${item.id}`).then(() => {
        SwalHandle.showSuccessMsg(`已刪除${item.productName}`);
        getProducts(currentPage.value);
      }).catch((err) => {
        console.log(err);
      });
    });
};


watch(() => route.query.search, () => {
  currentPage.value = 1;
  getProducts(1);
}, { immediate: true });
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

            <PaginationComponent :totalPages="totalPages" 
            :currentPage="currentPage" @pageChange="handlePageChange">
            </PaginationComponent>
        </div>
        
        <ProductModal ref="productModalRef" :product="currentItem" @getProducts="getProducts(currentPage)" :currentPage="currentPage" :clearCurrentItem="clearCurrentItem"/>


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
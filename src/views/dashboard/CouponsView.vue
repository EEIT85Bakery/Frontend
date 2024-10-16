<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/CouponModal.vue';
import DashBoardNavBarCoupon from '@/components/DashBoardNavBarCoupon.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import router from '@/router';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

const isLoading = ref(true)


const route = useRoute();
const couponModalRef = ref(null);
const currentItem = ref(null); 
const coupons = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = ref(5);
    const totalItems = ref(0)

    const today = new Date().toISOString().split('T')[0];
    const minDate = ref(today);
    // const isModalOpen = ref(false);
    const formData = reactive({
      name: '',
      price: '',
      discount: '',
      date: '',
      isEnable: false
    });
    const editingCoupon = ref(null);
    //轉換日期格式用
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

    const handlePageChange = (page) => {
      currentPage.value = page;
      getCoupons(page);
    };
    

    const getCoupons = (page) => {
  const params = {
    page: page - 1,
    size: itemsPerPage.value
  };
  
  // Add search parameter if it exists in route query
  if (route.query.search) {
    params.search = route.query.search;
  } else if (route.query.search === undefined) {
    params.search = '';
  }

  axiosInstanceForInsertHeader.get('/admin/coupon/search', { params })
    .then((res) => {
      const { content, totalElements, totalPages: backendTotalPages, size, number } = res.data;
      totalItems.value = totalElements;
      totalPages.value = backendTotalPages;
      currentPage.value = number + 1;
      itemsPerPage.value = size;
      coupons.value = content;
      isLoading.value = false
      
    })
    .catch(err => console.log(err));
};
 
watch(() => route.query.search, () => {
  currentPage.value = 1;
  getCoupons(1);
}, { immediate: true });

  

// 打開新增 modal
const openCouponModal = () => {
  currentItem.value = null; // 清空當前選中的商品，表示新增
  if (couponModalRef.value) {
    couponModalRef.value.openModal();
  }
};

// 打開編輯 modal
    const openEditCouponModal = (item) => {
     currentItem.value = item; // 設置選中的折扣碼
    if (couponModalRef.value) {
      couponModalRef.value.openModal();
    }
  };
  
  const deleteItem = (item) => {
   SwalHandle.confirm('刪除商品',`確認要刪除${item.couponName}這個產品?`,'',
    () =>  {
  axiosInstanceForInsertHeader.delete(`/admin/coupon/${item.id}`).then(() => {
    SwalHandle.showSuccessMsg(`已刪除${item.couponName}`)
    getCoupons(currentPage.value)
  }).catch((err) => {
    console.log(err);
  })
})
};


onMounted(() => {
});


</script>

<template>
  <Loading v-if="isLoading"></Loading>
  <DashBoardNavBarCoupon />

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
                    <tr v-for="(item, index) in coupons" :key="index">
                        <td>{{ item.couponName }}</td>
                        <td>{{ item.leastPriceForDiscount }} 元</td>
                        <td>{{ item.discountNumber }} 元</td>
                        <td>{{ convertToDate(item.endDate) }}</td>
                        <td>{{ item.enable ? "已啟用" : "未啟用" }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openEditCouponModal(item)"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteItem(item)"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent 
      :totalPages="totalPages" 
      :currentPage="currentPage" 
      @pageChange="handlePageChange"
      @getCoupons="getCoupons(currentPage)"
    />

        </div>

       <!-- <CouponModal ref="couponModalRef" /> -->

       <CouponModal ref="couponModalRef" :coupon="currentItem" @getCoupons="getCoupons(currentPage)" :currentPage="currentPage" />
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
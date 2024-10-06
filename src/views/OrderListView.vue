<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader.js';
import PaginationComponent from '@/components/PaginationComponent.vue';
import Loading from '@/components/Loading.vue';

// 用來儲存是否在加載中的狀態
const isLoading = ref(false);
const orders = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = ref(20); // 每頁顯示10筆資料
const router = useRouter();

// 當頁面被掛載時，自動請求資料
onMounted(() => {
  fetchOrders();
});

// 獲取訂單列表
const fetchOrders = () => {
  isLoading.value = true;
  let url = '/orders';
  let params = { page: currentPage.value - 1, size: pageSize.value };

  console.log('發送請求，參數:', params);

  axiosInstanceForInsertHeader.get(url, { params })
    .then(response => {
      console.log('API 響應:', response.data);
      console.log('獲取到的訂單資料:', response.data.content);
      console.log('總頁數:', response.data.totalPages);
      console.log('當前頁碼:', response.data.number + 1);
      console.log('每頁大小:', response.data.size);
      console.log('總元素數:', response.data.totalElements);

      orders.value = response.data.content;
      totalPages.value = response.data.totalPages;
      currentPage.value = response.data.number + 1; // 確保當前頁碼與後端一致

      isLoading.value = false;
    })
    .catch(err => {
      console.error('Error fetching orders:', err);
      isLoading.value = false;
    });
};


// 格式化日期函數
const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 6) {
    return '日期不可用'; // 如果日期為空或格式不正確，返回提示
  }

  // 提取年、月、日、時、分、秒
  const [year, month, day, hour, minute, second] = dateArray;

  // 格式化為 YYYY-MM-DD HH:mm:ss
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
                        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

  return formattedDate;
};

// 按下查看詳情按鈕
const startProcess = (orderNumber) => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    router.push({ 
      name: '訂單詳細頁面', 
      query: { orderNumber: orderNumber }
    });
  }, 1000); 
};


// 處理頁碼
const handlePageChange = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value && newPage !== currentPage.value) {
    currentPage.value = newPage;
    console.log('頁碼已更新，準備獲取新數據');
    fetchOrders();
  } else {
    console.log('新頁碼無效或與當前頁碼相同，不執行操作');
  }
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
              <tr v-for="(order, index) in orders" :key="index">
                <td>{{ order.orderNumber }}</td>
                <!-- 使用格式化函數來顯示訂單日期 -->
                <td>{{ formatDate(order.createTime) }}</td>
                <td>{{ order.paidPrice }} 元</td>
                <td>{{ order.pickupStatus }}</td>
                <td>
                  <div @click="startProcess(order.orderNumber)">
                    <i class="bi bi-info-circle-fill" style="color: darkgray;"></i>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 分頁元件，當頁數改變時觸發 changePage 函數 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChange" />
        <Loading v-if="isLoading" />
      </div>
    </div>
  </div>
</template>


<style scoped>

.bi:hover {
    opacity: 0.7;
    cursor: pointer;
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
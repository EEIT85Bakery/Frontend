<template>
  <DashBoardNavBar />

  <div class="container-fluid salesData">
    <!-- <div class="my-3 salesTitle">銷售數據表</div> -->

    <!-- <div class="row mb-4">
      <div class="col-md-6">
        開始日期
        <input type="date" v-model="startDate" class="form-control" />
      </div>
      <div class="col-md-6">
        結束日期
        <input type="date" v-model="endDate" class="form-control" />
      </div>
    </div>
    <div class="button-container">
      <button @click="fetchSalesData" class="btn btn-primary mb-4 searchButton">查詢</button>
    </div> -->

    <div class="searchContainer">
      <div class="searchInputContainer">
          <!-- <span class="hintText">
            請選擇欲查詢的時間區間
            <i class="bi bi-arrow-right-circle ms-1"></i>
          </span> -->
          <span class="me-2"><b>開始日期:</b></span>
          <input type="date" v-model="startDate" class="searchInput me-5">
          <span class="me-2"><b>結束日期:</b></span>
          <input type="date" v-model="endDate" class="searchInput me-3">
          <button @click="fetchSalesData" class="btn searchButton">查詢</button>
      </div>
    </div>


    <div class="row">
      <div class="col-md-6 mb-4">

        <div class="dataContainer revenueChart">
          <div class="salesTitle">各產品營收比重</div>
          <!-- 只有當 chartData 有數據時才傳遞給 PieChart -->
          <PieChart v-if="chartData && chartData.labels && chartData.labels.length" :chartData="chartData" />
          <p v-else>無銷售數據</p>
        </div>
      </div>

      <div class="col-md-6 mb-4">
        <div class="dataContainer salesDetails">
          <div class="salesTitle">商品銷售詳情</div>
          <div class="contentContainer">
            <div class="salesLimit mb-2">
              <lebal class="me-2">顯示筆數：</lebal>
              <select v-model="displayLimit" class="form_select w-auto">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">15</option>
                <option value="25">20</option>
              </select>
            </div>
            <table class="contentTable">
              <thead>
                <tr class="content">
                  <th>商品編號</th>
                  <th>商品名稱</th>
                  <th>售出數量</th>
                  <th>營收</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in filteredSalesData" :key="index">
                  <td>{{ item.productId }}</td>
                  <td>{{ item.productName }}</td>
                  <td class="dataInfo">{{ item.sumQuantity }}</td>
                  <td class="dataInfo">{{ safeToLocaleString(item.totalSales) }} 元</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="dataInfo">總營業額</td>
                  <td class="dataInfo">{{ safeToLocaleString(filteredTotalRevenue) }} 元</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import DashBoardNavBar from '@/components/DashBoardNavBar.vue';
import PieChart from '@/components/PieChart.vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const salesReportData = ref({ productSalesDto: [], totalRevenue: 0 });
const startDate = ref('');
const endDate = ref('');
const displayLimit = ref(10); 

const salesData = computed(() => salesReportData.value.productSalesDto);

const chartData = computed(() => {
  return {
    labels: filteredSalesData.value.map(item => item.productName),
    datasets: [{
      data: filteredSalesData.value.map(item => item.totalSales),
      backgroundColor: [
        '#FF7A94', '#5CB8F0', '#FFD76E', '#65CCCC', '#A37BFF',
        '#FFB055', '#FF4F74', '#2592DF', '#FFBE40', '#3BAEA6'
      ]
    }]
  };
});

const fetchSalesData = () => {
  let url = '/admin/sales';
  if (startDate.value && endDate.value) {
    url = `/admin/sales/dateRange?startDate=${startDate.value}&endDate=${endDate.value}`;
  }

  axiosInstanceForInsertHeader
    .get(url)
    .then((res) => {
      salesReportData.value = res.data;
    })
    .catch(() => {
      alert('取得銷售數據失敗');
    });
};

const safeToLocaleString = (value) => {
  return value ? value.toLocaleString() : '0';
};

const filteredSalesData = computed(() => {
  return salesData.value.slice(0, displayLimit.value); // 根據顯示限制顯示數據
});

const filteredTotalRevenue = computed(() => {
  return filteredSalesData.value.reduce((total, item) => total + item.totalSales, 0);
});

onMounted(() => {
  fetchSalesData();
});
</script>



<style scoped>
.salesData {
  color: rgba(50, 67, 95, 1);
}

.dataContainer {
  background-color: white;
  /* box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25); */
  padding: 5%;
  /* border-radius: 5px; */
  height: 100%;
}

.revenueChart h2,
.salesDetails h2 {
  color: rgba(143, 134, 129, 1);
  margin-bottom: 20px;
}

.contentContainer {
  width: 100%;
  background-color: white;
}

.salesTitle {
  /* display: flex; */
  width: 100%;
  /* height: 2%; */
  color: rgba(166, 127, 120, 1);
  /* font-size: 2.2vw; */
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 3%;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.salesLimit {
  display: flex; 
  justify-content: flex-end;
  color: rgba(166, 127, 120, 1);
  font-weight: bold;
};

.hintText {
  color: rgba(143, 134, 129, 0.8);
  font-weight: bold;
  margin-right: 10%;
  /* font-size: small; */
}

.searchInputContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% 0;
  padding: 1.5%;
  background-color: rgba(255, 255, 255, 0.8);
}

.searchInput {
  /* flex: 30%; */
  color: rgba(50, 67, 95, 1);
  /* margin-right: 3%; */
  padding: 0.5% 1%;
  border-radius: 5px;
  border: rgba(50, 67, 95, 0.3) solid 1px;
}


.searchButton {
  /* font-weight: bold; */
  color: white;
  background-color: rgba(166, 127, 120, 1);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

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

th,
td {
  padding: 8px 30px;
}

tr:first-child th:first-child {
  border-top-left-radius: 5px;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 5px;
}

tr:first-child th:last-child {
  border-top-right-radius: 5px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 5px;
}

/* 大於768px */
@media (min-width: 769px) {
  .row {
    display: flex;
  }

  .col-md-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
}

/* 小於768px */
@media (max-width: 768px) {
  .col-md-6 {
    width: 100%;
  }

  .revenueChart,
  .salesDetails {
    margin-bottom: 20px;
  }
}
</style>
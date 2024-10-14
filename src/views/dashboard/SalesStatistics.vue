<template>
  <DashBoardNavBarOrder />

  <div class="container-fluid salesData">
    <h1 class="my-3 salesTitle">銷售數據表</h1>

    <div class="row mb-4">
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
    </div>
    
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="dataContainer revenueChart">
          <h2 class="mt-4">各產品營收比重</h2>
          <!-- 只有當 chartData 有數據時才傳遞給 PieChart -->
          <PieChart v-if="chartData && chartData.labels && chartData.labels.length" :chartData="chartData" />
          <p v-else>無銷售數據</p>
        </div>
      </div>
      
      <div class="col-md-6 mb-4">
        <div class="dataContainer salesDetails">
          <h2 class="mt-4">商品銷售詳情</h2>
          <div class="contentContainer">
            <table class="contentTable">
              <thead>
                <tr class="content">
                  <th>商品編號</th>
                  <th>商品名稱</th>
                  <th>售出數量</th>
                  <th>營收(台幣: 元)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in salesData" :key="index">
                  <td>{{ item.productId }}</td>
                  <td>{{ item.productName }}</td>
                  <td class="dataInfo">{{ item.sumQuantity }}</td>
                  <td class="dataInfo">{{ safeToLocaleString(item.totalSales) }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="dataInfo">總營業額(台幣: 元)</td>
                  <td class="dataInfo">{{ safeToLocaleString(totalRevenue) }}</td>
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
import DashBoardNavBarOrder from '@/components/DashBoardNavBarOrder.vue';
import PieChart from '@/components/PieChart.vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const salesReportData = ref({ productSalesDto: [], totalRevenue: 0 });
const startDate = ref('');
const endDate = ref('');

const salesData = computed(() => salesReportData.value.productSalesDto);
const totalRevenue = computed(() => salesReportData.value.totalRevenue);

const chartData = computed(() => {
  return {
    labels: salesData.value.map(item => item.productName),
    datasets: [{
      data: salesData.value.map(item => item.totalSales),
      backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  border-radius: 5px;
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
    display: flex;
    width: 100%;
    height: 2%;
    color: rgb(74, 95, 128);
    font-size: 2.2vw;
    font-weight: bold;
    margin-bottom: 3%;
    cursor: pointer;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.searchButton {
  background-color: rgba(166, 127, 120, 0.5);
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
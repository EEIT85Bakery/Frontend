<template>
  <DashBoardNavBarOrder />

  <div class="container-fluid">
    <div class="row">
      <h1 class="my-3">銷售數據表</h1>
      
      <div class="col-md-6">
        <h2 class="mt-4">各產品營收比重</h2>
        <PieChart />
      </div>
      
      <div class="col-md-6">
        <h2 class="mt-4">商品銷售詳情</h2>
        <div class="contentContainer">
          <table class="contentTable">
            <thead>
              <tr class="content">
                <th>商品編號</th>
                <th>商品名稱</th>
                <th class="text-end">售出數量</th>
                <th class="text-end">營收</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in salesData" :key="index">
                <td>{{ item.productId }}</td>
                <td>{{ item.productName }}</td>
                <td class="text-end">{{ item.sumQuantity }}</td>
                <td class="text-end">{{ item.sumPrice }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總營業額</td>
                <td class="text-end">{{ totalRevenue }}</td>
              </tr>
            </tfoot>
          </table>
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

const salesData = ref([]);
const startTime = ref(null);
const endTime = ref(null);

const totalRevenue = computed(() => {
  return salesData.value.reduce((total, item) => total + item.sumPrice, 0);
});

const getSalesData = () => {
  const url = startTime.value && endTime.value
    ? `/admin/sales/timeRange?startTime=${startTime.value}&endTime=${endTime.value}`
    : '/admin/sales';

  axiosInstanceForInsertHeader
    .get(url)
    .then((res) => {
      salesData.value = res.data;
    })
    .catch(() => {
      alert('取得銷售數據失敗');
    });
};

onMounted(() => {
  getSalesData();
});
</script>

<style scoped>
.contentContainer {
  width: 100%;
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
</style>
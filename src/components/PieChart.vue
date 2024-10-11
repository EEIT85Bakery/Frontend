<template>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import Chart from 'chart.js/auto';
  import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
  
  const chartCanvas = ref(null);
  let chart = null;
  
  const salesData = ref([]);
  
  const fetchSalesData = async () => {
    try {
      const response = await axiosInstanceForInsertHeader.get('/admin/sales');
      salesData.value = response.data;
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
      alert('取得銷售數據失敗');
    }
  };
  
  const createChart = () => {
    if (chart) {
      chart.destroy();
    }
  
    const ctx = chartCanvas.value.getContext('2d');
  
    const labels = salesData.value.map(item => item.productName);
    const data = salesData.value.map(item => item.sumPrice);
  
    chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: '產品營收比重'
          }
        }
      }
    });
  };
  
  onMounted(async () => {
    await fetchSalesData();
    createChart();
  });
  
  watch(salesData, () => {
    createChart();
  });
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 400px;
    width: 100%;
  }
  </style>
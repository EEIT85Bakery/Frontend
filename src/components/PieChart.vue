<template>
  <div class="chart-container">
    <canvas v-if="chartData && chartData.labels && chartData.labels.length" ref="chartCanvas"></canvas>
    <p v-else class="no-data-text">無銷售數據</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
let chart = null;

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
});

// 當數據變化時更新圖表
const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext('2d');

  chart = new Chart(ctx, {
    type: 'pie',
    data: props.chartData,
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

onMounted(() => {
  if (props.chartData && props.chartData.labels && props.chartData.labels.length) {
    createChart();
  }
});

watch(() => props.chartData, (newValue) => {
  if (newValue && newValue.labels && newValue.labels.length) {
    createChart();
  }
}, { deep: true });
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}

.no-data-text {
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>

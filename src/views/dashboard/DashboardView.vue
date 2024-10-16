<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

const isLoading = ref(true);
const route = useRoute();

// 監聽路由變化
watch(
  () => route.path, // 監聽路由路徑變化
  () => {
    isLoading.value = true;
    startLoading();
  }
);

// 方法：模擬加載
const startLoading = () => {
  setTimeout(() => {
    isLoading.value = false;
  }, 50);
};

// 組件掛載時延遲取消加載
onMounted(() => {
  startLoading();
});
</script>

<template>

    <div class="BG">
        <div class="wrapper">
            <div>
                <!-- <Loading v-if="isLoading" /> -->
                <RouterView />
            </div>
        </div>
    </div>

</template>

<style scoped>
.BG {
    background-color: rgba(225, 220, 217, 0.3);
}

</style>
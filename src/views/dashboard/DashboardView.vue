<script>
import DashBoardNavBar from '@/components/DashBoardNavBar.vue';

import Loading from '@/components/Loading.vue';

export default {
  data() {
    return {
      isLoading: true
    };
  },
  components: {
    DashBoardNavBar,
    Loading
  },
  watch: {
    $route(to, from) {
      this.isLoading = true;
      this.startLoading();
    }
  },
  methods: {
    startLoading() {
      setTimeout(() => {
        this.isLoading = false;
      }, 2100); 
    }
  },
  mounted() {
    this.isLoading = false;
  }
};

</script>

<template>

    <div class="BG">
        <div class="wrapper">

            <DashBoardNavBar />
            <div>
                <Loading v-if="isLoading" />
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
<script setup>
import NavbarComponent from '@/components/NavbarComponent4.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="BG">
    <div class="wrapper">
      <NavbarComponent />
      <div>
        <RouterView />
      </div>
    </div>
    <div class="footerComponent"><FooterComponent /></div>
  </div>
  </template>

<style scoped>
  .BG {
    background-color: rgba(225, 220, 217, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
  }

</style>

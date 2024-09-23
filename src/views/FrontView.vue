<script setup>
import NavbarComponent4 from '@/components/NavbarComponent4.vue';
import FooterComponent from '@/components/FooterComponent.vue'

</script>

<template>
  <div class="BG">
    <div class="wrapper">
      <NavbarComponent4 />
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

</style>

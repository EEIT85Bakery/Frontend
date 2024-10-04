<script setup>
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent4 from '@/components/NavbarComponent4.vue';
import NavbarComponent2 from '@/components/NavbarComponent2.vue';


</script>

<template>
  <div class="BG">
    <div class="wrapper">
      <NavbarComponent2 />
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

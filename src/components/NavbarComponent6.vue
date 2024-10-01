<script setup>
import { ref } from 'vue';

const isActive = ref(false);

const toggleMenu = () => {
  isActive.value = !isActive.value;
};



</script>

<template>

<nav class="navbar">
    <div class="container">
      <a class="logo" href="#">
        <img src="../../public/imgZip/Logo/logo.png" alt="Logo" />
        品牌名稱
      </a>
      <ul :class="['nav-links', { active: isActive }]">
        <li><a href="#">標題 1</a></li>
        <li><a href="#">標題 2</a></li>
        <li><a href="#">標題 3</a></li>
        <li><a href="#">標題 4</a></li>
        <li><a href="#">標題 5</a></li>
        <li><a href="#">標題 6</a></li>
      </ul>
      <div class="icons">
        <a href="#"><i class="icon house"></i></a>
        <a href="#"><i class="icon heart"></i></a>
        <a href="#"><i class="icon person"></i></a>
      </div>
      <button class="toggle-button" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </nav>

</template>

<style scoped>

.navbar {
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.logo img {
  height: 30px;
  margin-right: 10px;
}

.nav-links {
  list-style: none;
  display: flex;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links a {
  text-decoration: none;
  color: #000;
}

.icons {
  display: flex;
}

.icons a {
  margin-left: 15px;
  text-decoration: none;
  color: #000;
}

.toggle-button {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.toggle-button .bar {
  height: 3px;
  width: 25px;
  background-color: #000;
  margin: 3px 0;
}

.icon {
  font-size: 20px; /* 調整圖標大小 */
}
.house::before {
  content: "🏠"; /* 使用 emoji 代替圖標 */
}
.heart::before {
  content: "❤️";
}
.person::before {
  content: "👤";
}

/* 響應式 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #f8f9fa;
    width: 200px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .nav-links.active {
    display: flex;
  }

  .toggle-button {
    display: flex;
  }
}


</style>
<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Loading from '@/components/Loading.vue';

const isLoading = ref(true);
const products = ref([]);
const categories = ref([]);
const categoryFlavors = ref({});
const field = ref("全部商品");
const rank = ref("由新到舊");

// 新增：當前選中的種類和風味
const selectedCategory = ref(null);
const selectedFlavor = ref(null);

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get('/api/products'),
      axios.get('/api/products/categories')
    ]);
    
    products.value = productsRes.data;
    categories.value = categoriesRes.data;
    
    await fetchAllFlavors();
  } catch (err) {
    console.error('Error fetching data:', err);
  } finally {
    isLoading.value = false;
  }
});

const fetchAllFlavors = async () => {
  try {
    const flavorPromises = categories.value.map(category => 
      axios.get('/api/products/categories/flavors', { params: { categoryName: category } })
    );
    const flavorResponses = await Promise.all(flavorPromises);
    
    flavorResponses.forEach((res, index) => {
      categoryFlavors.value[categories.value[index]] = res.data;
    });
  } catch (err) {
    console.error('Error fetching flavors:', err);
  }
};

const fetchProductsByCategory = async (category) => {
  try {
    isLoading.value = true;
    const response = await axios.get(`/api/products/category/${category}`);
    products.value = response.data;
    field.value = `${category}專區`;
    selectedCategory.value = category;
    selectedFlavor.value = null; // Reset flavor when category changes
  } catch (err) {
    console.error('Error fetching products by category:', err);
  } finally {
    isLoading.value = false;
  }
};

const fetchProductsByFlavor = async (flavor) => {
  try {
    if (!selectedCategory.value) return; // Ensure a category is selected

    isLoading.value = true;
    const response = await axios.get(`/api/products/flavor/${flavor}`, { params: { categoryName: selectedCategory.value } });
    products.value = response.data;
    field.value = `${flavor}風味`;
    selectedFlavor.value = flavor;
  } catch (err) {
    console.error('Error fetching products by flavor:', err);
  } finally {
    isLoading.value = false;
  }
};

watch(selectedCategory, (newCategory) => {
  if (newCategory) {
    fetchProductsByCategory(newCategory);
  }
});

watch(selectedFlavor, (newFlavor) => {
  if (newFlavor) {
    fetchProductsByFlavor(newFlavor);
  }
})
</script>

<template>
  <div class="PContainer">
    <div class="categoryText1">商品列表 >> {{ field }}</div>
    <Loading v-if="isLoading" />
    <div v-else class="d-flex">
      <!-- 側邊分類欄 -->
      <div class="flexItemCategory w-100">
        <div class="d-flexbox">
          <div v-for="category in categories" :key="category" class="categoryItem">
            <div class="categoryTitle" @click="fetchProductsByCategory(category)">
              <img src="../../public/imgZip/Logo/bunnyBlue.png" alt="bunnyBlue" class="categoryImg">
              <div>{{ category }}專區</div>
            </div>
            <div class="categoryContent">
              <div 
                v-for="flavor in categoryFlavors[category]" :key="flavor" @click="fetchProductsByFlavor(flavor)">
                {{ flavor }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="productsList d-flexbox w-100">
        <div class="productsPageTop"></div>
        <div class="categoryText2">商品排序 >> {{ rank }}</div>
        <div class="ProductsContainer">
          <div v-for="product in products" :key="product.id" class="products-item">
            <img :src="product.imageUrl" :alt="product.name" class="products-image" />
            <div class="products-name">{{ product.productName }}</div>
            <div class="products-name">{{ product.description }}</div>
            <div class="products-price">價格：{{ product.price }}元</div>
          </div>
        </div>
        <div class="switchPage">I'm page switch</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.PContainer {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}

.categoryText1 {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
    margin: 5px 20px;
}

.categoryText2 {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
    margin-top: 20px;
    margin-right: 25px;
    text-align: end;
}

.categoryItem {
    flex: 1;
    margin-bottom: 20%;
}

.categoryTitle {
    display: flex;
    width: 100%;
    height: 2%;
    color: rgba(50, 67, 95, 1);
    font-size: 2.2vw;
    font-weight: bold;
    margin-bottom: 3%;
}

.categoryImg {
    object-fit: contain;
    width: 4vw;
    padding-right: 10px;
    padding-bottom: 10px;
}

.categoryContent {
    color: rgba(50, 67, 95, 0.5);
    font-size: 1.4vw;
    font-weight: bold;
    padding-left: 25%;
    padding-bottom: 3%;
    /* padding-left: 5%; */
}

.flexItemCategory {
    padding: 5% 5%;
    background-color: rgba(255, 255, 255, 0.7);
    flex: 1;
    flex-basis: 35%
}

.productsPageTop {
    height: 300px;
    color: white;
    font-size: 100px;
    text-align: center;
    align-content: center;
    background-image: url(../../public/imgZip/Sample/ProductListPageHeaderCake.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.ProductsContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding: 0px 30px;
}

.products-item {
    flex: 1 1 calc(33.333% - 20px); /* 每行三個產品，減去間距 */
    max-width: calc(33.333% - 20px); /* 限制最大寬度 */
    text-align: center;
}

.products-image {
    padding: 10% 3% 1% 3%;
    width: 100%;
}

.products-name {
   /* color: rgba(50, 67, 95, 1); */
   font-weight: bold;
   font-size: small;
}

.products-price {
    color: #A67F78;
    font-size: medium;
    /* font-weight: bold; */
    margin-bottom: 20px;
}

.switchPage {
    background-color: blueviolet;
    width: 100%;
    height: 4vw;
}


</style>
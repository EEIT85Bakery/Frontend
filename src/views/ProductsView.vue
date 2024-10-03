<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Loading from '@/components/Loading.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const isLoading = ref(true);
const products = ref([]);
const categories = ref([]);
const categoryFlavors = ref({});
const field = ref("全部商品");
const rank = ref("由新到舊");
const selectedCategory = ref(null);
const selectedFlavor = ref(null);
const currentPage = ref(0);
const pageSize = ref(10); // 每頁顯示9個產品
const totalPages = ref(0);


onMounted(async () => {
  try {
    const [categoriesRes] = await Promise.all([
      axios.get('/api/products/categories')
    ]);
    
    categories.value = categoriesRes.data;
    
    await fetchAllFlavors();
    await fetchProducts(); // 使用新的fetchProducts函數
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

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    let url = '/api/products';
    let params = { page: currentPage.value - 1, size: pageSize.value }; //後端 API 可能使用從 0 開始的頁碼

    if (selectedCategory.value) {
      url = `/api/products/category/${selectedCategory.value}`;
    }

    if (selectedFlavor.value) {
      url = `/api/products/flavor/${selectedFlavor.value}`;
    }

    const response = await axios.get(url, { params });
    products.value = response.data.content;
    totalPages.value = response.data.totalPages;
    
    updateFieldValue();
  } catch (err) {
    console.error('Error fetching products:', err);
  } finally {
    isLoading.value = false;
  }
};

const updateFieldValue = () => {
  if (selectedFlavor.value) {
    field.value = `${selectedFlavor.value}風味`;
  } else if (selectedCategory.value) {
    field.value = `${selectedCategory.value}專區`;
  } else {
    field.value = "全部商品";
  }
};

const fetchProductsByCategory = async (category) => {
  selectedCategory.value = category;
  selectedFlavor.value = null;
  currentPage.value = 0; // 重置頁碼
  await fetchProducts();
};

const fetchProductsByFlavor = async (flavor) => {
  if (!selectedCategory.value) return;
  selectedFlavor.value = flavor;
  currentPage.value = 0; // 重置頁碼
  await fetchProducts();
};

const handlePageChange = async (newPage) => {
  currentPage.value = newPage;
  await fetchProducts();
};
watch([selectedCategory, selectedFlavor], () => {
  fetchProducts();
});
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
        <!-- 使用分頁組件 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @pageChange="handlePageChange"/>
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
    cursor: pointer;
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
    cursor: pointer;
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
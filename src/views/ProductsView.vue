<script setup>
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Loading from '@/components/Loading.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { useRouter, useRoute } from 'vue-router';

// 狀態變量
const isLoading = ref(true);
const products = ref([]);
const categories = ref([]);
const categoryFlavors = ref({});
const field = ref("全部商品");
const rank = ref("由新到舊");
const selectedCategory = ref(null);
const selectedFlavor = ref(null);
const currentPage = ref(1);
const pageSize = ref(9); 
const totalPages = ref(0);
const router = useRouter();
const route = useRoute();
const keyword = ref('');

// 組件加載時初始化數據
onMounted(() => {
  initializeData();
});

// 初始化數據抓取分類、風味和產品
const initializeData = () => {
  isLoading.value = true;
  fetchCategories()
    .then(() => fetchAllFlavors())
    .then(() => {
      // 使用路由中的 keyword 進行初始搜索
      keyword.value = route.query.keyword || '';
      return fetchProducts();
    })
    .then(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 5000); 
    })
    .catch(err => {
      console.error('Error initializing data:', err);
      isLoading.value = false;
    });
};

// 獲取所有產品分類名稱
const fetchCategories = async () => {
  const response = await axios.get('/api/products/categories');
categories.value = response.data;
};

// 獲取所有風味名稱
const fetchAllFlavors = async () => {
  const flavorPromises = categories.value.map(category =>
    axios.get('/api/products/categories/flavors', { params: { categoryName: category } })
  );
  const responses = await Promise.all(flavorPromises);
  responses.forEach((res, index) => {
    categoryFlavors.value[categories.value[index]] = res.data;
});
};

// 獲取產品列表
const fetchProducts = async () => {
  isLoading.value = true;
  let url = '/api/products'
  let params = { 
    page: currentPage.value - 1, 
    size: pageSize.value,
    sort: rank.value === "由新到舊" ? "createTime,desc" : "createTime,asc" // 商品新舊排序
  };

  // 如果 flavor、category 和 keyword 都為空，顯示全部商品
  if (selectedFlavor.value) {
    url = `/api/products/flavor/${selectedFlavor.value}`;
  } else if (selectedCategory.value) {
    url = `/api/products/category/${selectedCategory.value}`;
  } else if (keyword.value) {
    url = `/api/products/search`;
    params.keyword = keyword.value;
  } 

  console.log('Fetching products with URL:', url, 'and params:', params);

  try {
    const response = await axios.get(url, { params });
  if (response.data.content && response.data.content.length === 0) {
    console.log('No products found');
    field.value = keyword.value;
    products.value = [];
  } else {
    products.value = response.data.content;
    totalPages.value = response.data.totalPages;
    updateFieldValue();
  }
    isLoading.value = false;
  } catch (err) {
    console.error('Error fetching products:', err);
    isLoading.value = false;
  }
};

// 更新顯示的分類/風味
const updateFieldValue = () => {
  if (selectedFlavor.value) {
    field.value = selectedFlavor.value;
  } else if (selectedCategory.value) {
    field.value = `${selectedCategory.value}專區`;
  } else if (keyword.value) {
    field.value = keyword.value;
  } else {
    field.value = "全部商品";
  }
};

watch(() => route.query, (newQuery) => {
  console.log('Route query changed:', newQuery);
  // 優先處理風味查詢
  selectedFlavor.value = newQuery.flavor || null;
  // 如果沒有風味，再檢查是否有關鍵字
  keyword.value = selectedFlavor.value ? '' : newQuery.keyword || '';
  selectedCategory.value = newQuery.category || null;
  currentPage.value = 1;
  fetchProducts();
}, { immediate: true, deep: true });

// 監聽路由變化，重置篩選條件並重新加載產品
const fetchProductsByCategory = (category) => {
  selectedCategory.value = category;
  selectedFlavor.value = null;
  keyword.value = '';
  currentPage.value = 1;
  fetchProducts();
};

// 按風味獲取產品
const fetchProductsByFlavor = (flavor) => {
  selectedFlavor.value = flavor;
  selectedCategory.value = null;
  keyword.value = '';
  currentPage.value = 1;
  fetchProducts();
};

const toggleRank = () => {
  rank.value = rank.value === "由新到舊" ? "由舊到新" : "由新到舊";
  fetchProducts(); // 排序方式改變後重新加載產品
};


// 處理頁碼
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  fetchProducts();
};

</script>


<template>
  <div class="PContainer">
    <div class="categoryText1" @click="fetchProducts">商品列表 >> {{ field }} </div>
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
        <div class="categoryText2" @click="toggleRank">商品排序 >> {{ rank }}</div>
        <div class="ProductsContainer">
         
          <div v-for="product in products" :key="product.id" class="products-item"> 
            <RouterLink :to="{ name: '單一產品頁面', params: { id: product.id } }">
            <img :src="`data:${mimeType};base64,${product.img1}`" :alt="product.name" class="products-image" />
            <div class="products-name">{{ product.productName }}</div>
            <!-- <div class="products-name">{{ product.description }}</div> -->
            <div class="products-price">價格：{{ product.price }}元</div>
          </RouterLink>
          </div>
        </div>
        <!-- 使用分頁組件 -->
        <PaginationComponent :currentPage="currentPage" :totalPages="totalPages" @pageChange="handlePageChange"/>
      </div>
    </div>
  </div>
</template>


<style scoped>

.router-link {
  text-decoration: none; /* 去除下劃線 */
  color: inherit; /* 繼承父元素顏色 */
}

.router-link:hover {
  color: #f30a0a; /* 懸停時顏色改變 */
}

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
    cursor: pointer;
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
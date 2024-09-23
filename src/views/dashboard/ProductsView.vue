<script>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductModal from '@/components/ProductModal.vue'; // 確保路徑正確

export default {
  components: {
    ProductModal,
    PaginationComponent
  },
  setup() {
    const productModal = ref(null); // 用來引用子組件

    const openModal = () => {
      if (productModal.value) {
        productModal.value.openModal(); // 調用子組件的 openModal 方法
      }
    };

    
const items = ref([
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '是'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '是'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    },
    {
        category: '蛋糕',
        name: '紐約起司蛋糕',
        price: '160元',
        use: '否'
    }
]);

    return {
      productModal,
      openModal,
      items
    };
  }
}




</script>

<template>

    <div class="pageContainer">

        <div class="addBtnContainer">
        <button class="addBtn" @click="openModal">
            <i class="bi bi-plus-square-dotted me-2"></i><span>建立新的商品</span>
        </button>
    </div>


        <div class="contentContainer">
            <table class="contentTable">
                <thead>
                    <tr class="content">
                        <th>分類</th>
                        <th>商品名稱</th>
                        <th>售價</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                        <th>刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.category }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.use }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openModal"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent />

        </div>

        <ProductModal ref="productModal" />


    </div>

</template>

<style scoped>

.addBtnContainer {
    padding:0 1% 1.5% 1%;
    display: flex;
    justify-content: end;
}

.addBtn {
    font-size: small;
    padding: 1% 1.5%;
    border: 0;
    border-radius: 10px;
    color: white;
    background-color: rgba(166, 127, 120, 0.8);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.bi {
    cursor: pointer;
}


.pageContainer {
    width: 100%;
    /* height: 45vw; */
    padding: 2% 5%;
    /* background-color: lightpink; */

}

.contentContainer {
    width: 100%;
    height: 100%;
    padding: 1% 2%;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.contentTable {
    width: 100%;
    line-height: 3;
    text-align: center;
    color: rgba(50, 67, 95, 1);
}

.contentTable th {
    color: rgba(143, 134, 129, 1);
    border-bottom: rgba(166, 127, 120, 0.5) solid 1.5px;
}

.contentTable tr {
    border-bottom: rgba(166, 127, 120, 0.5) solid 1px;
}


.editBtn {
    color: white;
    background-color: rgba(166, 127, 120, 0.8);
}

</style>
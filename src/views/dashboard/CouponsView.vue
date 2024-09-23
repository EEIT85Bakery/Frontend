<script>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import CouponModal from '@/components/CouponModal.vue';

export default {
  components: {
    CouponModal,
    PaginationComponent
  },
  setup() {
    const CouponModal = ref(null); // 用來引用子組件

    const openModal = () => {
      if (CouponModal.value) {
        CouponModal.value.openModal(); // 調用子組件的 openModal 方法
      }
    };

    
const items = ref([
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    },
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    },
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    },
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    },
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    },
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    },
    {
        name: '萬聖節活動優惠',
        price: '1000 元',
        discount: '50 元',
        date: "2024-11-30",
        use: '是'
    }
    
]);

    return {
      CouponModal,
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
            <i class="bi bi-plus-square-dotted me-2"></i><span>建立新的優惠券</span>
        </button>
    </div>


        <div class="contentContainer">
            <table class="contentTable">
                <thead>
                    <tr class="content">
                        <th>名稱</th>
                        <th>折扣滿額</th>
                        <th>折扣金額</th>
                        <th>到期日</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                        <th>刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.discount }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.use }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openModal"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent />

        </div>

        <CouponModal ref="CouponModal" />


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
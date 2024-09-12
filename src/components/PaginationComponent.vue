<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('pageChange', page); // 發送頁數變更事件
      }
    },
  },
};
</script>

<template>
  <nav aria-label="Page navigation" class="navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage <= 1 }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage >= totalPages }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>



<style scoped>

    .navigation {
        display: flex;
        justify-content: center;
        justify-items: center;
        align-items: center;
    }

    .pagination {
        margin-top: 2%;
    }

    .page-link {
        color: rgba(166, 127, 120, 1);
    }

    .page-link:focus {
        box-shadow: none; 
        background-color: rgba(225, 220, 217, 0.5);
    }


    .page-item.active .page-link {
  color: #ffffff; /* 文字顏色 */
  background-color: rgba(166, 127, 120, 1); /* 背景顏色 */
  border-color: rgba(166, 127, 120, 1); /* 邊框顏色 */
}

/* 可選：懸停效果 */
.page-item.active .page-link:hover {
  color: #ffffff;
  background-color: rgba(146, 107, 100, 1); /* 稍微深一點的顏色 */
  border-color: rgba(146, 107, 100, 1);
}
</style>
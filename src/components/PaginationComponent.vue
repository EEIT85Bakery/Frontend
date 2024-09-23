<script setup>

</script>

<template>

<nav aria-label="Page navigation" class="navigation">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
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

</style>
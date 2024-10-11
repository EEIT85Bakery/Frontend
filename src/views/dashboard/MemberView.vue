<!-- MemberView.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader.js';
import PaginationComponent from '@/components/PaginationComponent.vue';
import MemberModal from '@/components/MemberModal.vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import DashBoardNavBarMember from '@/components/DashBoardNavBarMember.vue';

const memberModalRef = ref(null);
const currentItem = ref(null);
const members = ref([]); // 用來存放從後端取得的會員資料
const currentPage = ref(1); // 當前頁數，初始化為1
const pageSize = ref(10); // 每頁顯示多少筆
const totalPages = ref(0); // 總頁數
const route = useRoute(); // 使用 useRoute 來獲取當前路由資訊
const noResults = ref(false);  // 標記是否沒有搜尋結果


// 從後端抓取會員資料，根據電話號碼進行查詢
const fetchMembers = (page = 1, pageSize = 10, phone = '') => {
  const params = { page, pageSize };
  
  console.log(`Fetching members with params:`, params); // Debug

  let endpoint = '/admin/members';
  if (phone) {
    endpoint += `?userPhone=${phone}`; // 如果有電話號碼，則拼接到 URL
  }

  axiosInstanceForInsertHeader
    .get(endpoint, { params })
    .then((response) => {
      const data = response.data;
      console.log('Fetched members data:', data);
      members.value = data.content;
      totalPages.value = data.totalPages;
      currentPage.value = page; // 更新當前頁數
      noResults.value = members.value.length === 0;  // 檢查是否有搜尋結果
    })
    .catch((error) => {
      console.error('Error fetching members:', error);
      noResults.value = true;  // 發生錯誤時也視為無結果
    });
};

// 監聽路由查詢參數(電話號碼)變化
watch(
  () => route.query.phone,
  (newPhone) => {
    if (newPhone) {
      fetchMembers(1, pageSize.value, newPhone);
    } else {
      fetchMembers(currentPage.value, pageSize.value); // 沒有查詢電話時抓取所有資料
    }
  },
  { immediate: true }
);


// 格式化日期
const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length !== 3) {
    console.warn('Invalid date format:', dateArray);
    return '';
  }
  const [year, month, day] = dateArray;
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  return `${year}/${formattedMonth}/${formattedDay}`;
};

// 打開修改會員等級 modal
const openMemberModal = (member) => {
  currentItem.value = member; // 確保這裡是傳入了正確的會員數據
  console.log('Opening modal for editing member:', member);
  if (memberModalRef.value) {
    memberModalRef.value.openModal();
  }
};

const levels = [
  { value: 'level1', label: '白兔' },
  { value: 'level2', label: '金兔' },
  { value: 'level3', label: '白金兔' },
  { value: 'level4', label: '鑽石兔' }
];

const levelMap = levels.reduce((acc, level) => {
  acc[level.value] = level.label;
  return acc;
}, {});

// 用於接收更新後的會員資料
const handleMemberUpdated = (updatedMember) => {
  const index = members.value.findIndex(member => member.id === updatedMember.id);
  if (index !== -1) {
    members.value[index] = updatedMember;
  }
};

// 刪除會員
const deleteMember = (member) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除 ${member.name} 嗎？`,
    '刪除成功！',
    () => {
      axiosInstanceForInsertHeader
        .delete(`/admin/members/${member.id}`)
        .then(() => {
          SwalHandle.showSuccessMsg(`成功刪除 ${member.name}`);
          fetchMembers(currentPage.value, pageSize.value); // 刪除成功後重新抓取資料
        })
        .catch((error) => {
          console.error(`Error deleting member ${member.name}:`, error);
        });
    }
  );
};

// 頁數變更時觸發
const handlePageChange = (newPage) => {
  fetchMembers(newPage, pageSize.value, route.query.phone || '');
};

// 組件初始化時抓取資料
onMounted(() => {
  fetchMembers();
});
</script>

<template>
  <DashBoardNavBarMember />

  <div class="pageContainer">
    <div class="contentContainer">
      <div v-if="noResults" class="no-results">
        查無此人，請確認電話號碼是否正確。
      </div>
      <table class="contentTable">
        <thead>
          <tr class="content">
            <th>會員姓名</th>
            <th>性別</th>
            <th>電話號碼</th>
            <th>電子信箱</th>
            <th>生日</th>
            <th>會員等級</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in members" :key="index">
            <td>{{ member.name }}</td>
            <td>{{ member.gender }}</td>
            <td>{{ member.phone }}</td>
            <td>{{ member.email }}</td>
            <td>{{ formatDate(member.birthday) }}</td>
            <td>{{ levelMap[member.userVip] || member.userVip }}</td>
            <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openMemberModal(member)"></i></td>
            <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteMember(member)"></i></td>
          </tr>
        </tbody>
      </table>

      <!-- 確保將 pageChange 事件綁定至 handlePageChange -->
      <PaginationComponent :totalPages="totalPages" :currentPage="currentPage" @pageChange="handlePageChange" />
    </div>

    <MemberModal ref="memberModalRef" :member="currentItem" @memberUpdated="handleMemberUpdated" />
  </div>
</template>



<style scoped>
.listContainer {
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
}

.list {
    list-style-type: none;
    padding: 0;
    margin-top: 3%;
}

.listItem {
    line-height: 2;
}


.addBtnContainer {
    padding: 0 1% 1.5% 1%;
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
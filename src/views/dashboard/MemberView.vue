<script setup>
import { ref, onMounted } from 'vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader.js'; // 使用自定義的 axios 實例
import PaginationComponent from '@/components/PaginationComponent.vue';
import MemberModal from '@/components/MemberModal.vue';
import { SwalHandle } from '@/stores/sweetAlertStore';

const memberModalRef = ref(null);
const currentItem = ref(null);
const members = ref([]); // 用來存放從後端取得的會員資料
const currentPage = ref(0); // 當前頁數
const pageSize = ref(10); // 每頁顯示多少筆
const totalPages = ref(0); // 總頁數

// 打開新增 modal
const openMemberModal = () => {
  currentItem.value = null; // 清空當前選中的會員資料，表示新增
  if (memberModalRef.value) {
    memberModalRef.value.openModal();
  }
};

// 從後端抓取會員資料
const fetchMembers = (page = 1, size = 10) => {
  axiosInstanceForInsertHeader
    .get(`/admin/members`, {
      params: {
        page: page,
        size: size,
      },
    })
    .then((response) => {
      const data = response.data;
      members.value = data.content; // 將會員資料存入 members
      totalPages.value = data.totalPages; // 設定總頁數
      currentPage.value = page; // 設定當前頁數
    })
    .catch((error) => {
      console.error('Error fetching members:', error);
    });
};

// 刪除會員
const deleteMember = (member) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除 ${member.name} 嗎？`,
    '刪除成功！',
    () => {
      // 使用 member.id 來進行刪除操作
      axiosInstanceForInsertHeader
        .delete(`/admin/members/${member.id}`)
        .then(() => {
          SwalHandle.showSuccessMsg(`成功刪除 ${member.name}`);
          fetchMembers(currentPage.value, pageSize.value); // 刪除成功後重新抓取資料
        })
        .catch((error) => {
          console.error('Error deleting member:', error);
        });
    }
  );
};

// 當組件掛載時，抓取初始的會員資料
onMounted(() => {
  fetchMembers();
});

</script>

<template>
    <div class="pageContainer">
        <div class="contentContainer">
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
                        <td>{{ member.tel }}</td>
                        <td>{{ member.email }}</td>
                        <td>{{ member.birthday }}</td>
                        <td>{{ member.level }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openMemberModal(member)"></i></td>
                        <!-- 刪除按鈕傳遞完整的 member 對象 -->
                        <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteMember(member)"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent :totalPages="totalPages" :currentPage="currentPage" @pageChange="fetchMembers" />
        </div>

        <MemberModal ref="memberModalRef" :product="currentItem" />
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
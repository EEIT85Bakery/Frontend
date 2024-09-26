<script setup>
import { ref } from 'vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import MemberModal from '@/components/MemberModal.vue';

import { SwalHandle } from '@/stores/sweetAlertStore';

const memberModalRef = ref(null);
const currentItem = ref(null); 

// 打開新增 modal
const openMemberModal = () => {
  currentItem.value = null; // 清空當前選中的商品，表示新增
  if (memberModalRef.value) {
    memberModalRef.value.openModal();
  }
};

const deleteItem = (item) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除 ${item.name} 嗎？`,
    '刪除成功！', 
    () => {
      // 執行刪除操作，例如：
      items.value = items.value.filter(i => i !== item);
      SwalHandle.showSuccessMsg(`成功刪除 ${item.name}`);
    }
  );
};



const items = ref([
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },
    {
        name: '吉伊卡哇',
        gender: '女',
        tel: '0912-345-678',
        email: 'BunnySugar@service.com',
        birthday: '2024-01-01',
        level: '白兔會員'
    },

]);


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
                    <tr v-for="(item, index) in items" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.gender }}</td>
                        <td>{{ item.tel }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.birthday }}</td>
                        <td>{{ item.level }}</td>
                        <td><i class="bi bi-pencil-square" style="color: darkgrey;" @click="openMemberModal(item)"></i></td>
                        <td><i class="bi bi-trash3" style="color: darkred;" @click="deleteItem(item)"></i></td>
                    </tr>
                </tbody>
            </table>

            <PaginationComponent />

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
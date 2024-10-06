<script setup>
import { ref, watch, defineProps } from 'vue';
import useModal from '@/hooks/useModal';
import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

// 定義傳入的 props
const props = defineProps({
  member: {
    type: Object,
    default: null
  }
});

// 使用自訂的 useModal 鉤子
const { openModal, hideModal, modalRef } = useModal();

// 暴露 openModal 和 hideModal 方法，以便父組件可以控制
defineExpose({
  openModal,
  hideModal
});

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


// 表單資料，包含會員等級
const formData = ref({
  level: ''
});

// 會員等級選項
const levels = [
  { value: 'level1', label: '白兔會員' },
  { value: 'level2', label: '金兔會員' },
  { value: 'level3', label: '白金兔會員' },
  { value: 'level4', label: '鑽石兔會員' }
];


// 監聽 props.member 的變化，以抓取會員資料並初始化表單
watch(
  () => props.member,
  (newMember) => {
    if (newMember && newMember.id) {
      console.log('新會員資料:', newMember);
      openModal();
      formData.value.level = newMember.userVip;
    } else {
      formData.value.level = '';
    }
  },
  { immediate: true, deep: true }
);

// memberUpdated 事件
const emit = defineEmits(['memberUpdated']);

// 表單提交的函數，用於更新會員等級
const submitForm = async () => {
  if (!props.member || !props.member.id) {
    SwalHandle.showErrorMsg('會員資料無法讀取');
    return;
  }

  try {
    const updateData = {
      userVip: formData.value.level
    };

    const response = await axiosInstanceForInsertHeader.put(`/admin/members/${props.member.id}`, updateData);

    if (response.status === 200) {
      SwalHandle.showSuccessMsg('會員等級變更成功');
      hideModal();
      emit('memberUpdated', { ...props.member, userVip: formData.value.level });

      
      
    } else {
      SwalHandle.showErrorMsg('更新失敗');
    }
  } catch (error) {
    console.error('更新會員資料失敗', error);
    SwalHandle.showErrorMsg('更新會員資料失敗');
  }
};
</script>


<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
      <div class="modal-dialog modalContainer modal-md">
        <div class="modal-content">
          <div class="modal-header modalHeader">
            <h5 class="modal-title modalTitle" id="memberModalLabel">會員資訊</h5>
            <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close"></button>
          </div>
          <div class="modal-body modalBody">
            <div v-if="member">
              <div class="Container2">
                <div class="text"><span class="textName">會員姓名:</span><span>{{ member.name }}</span></div>
                <div class="text"><span class="textName">性別:</span><span>{{ member.gender }}</span></div>
                <div class="text"><span class="textName">電話號碼:</span><span>{{ member.phone }}</span></div>
                <div class="text"><span class="textName">電子信箱:</span><span>{{ member.email }}</span></div>
                <div class="text"><span class="textName">生日:</span><span>{{ formatDate(member.birthday) }}</span></div>                <div class="text content textName">
                  會員等級:
                  <select name="level" class="payment" v-model="formData.level">
                    <option v-for="option in levels" :key="option.value" :value="option.label">
                      {{ option.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div v-else>
              <p>載入中...</p>
            </div>
          </div>
          <div class="modal-footer modalFooter">
            <button type="button" class="btn1" @click="hideModal">取消</button>
            <button type="button" class="btn2" @click="submitForm">儲存變更</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>
/* header */
.modalHeader {
    color: white;
    font-size: large;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    /* text-align: center; */
    background-color: rgba(166, 127, 120, 0.8);
}

.closeBtn {
    color: rgba(225, 220, 217, 1);
    position: absolute;
    right: 2rem;
    opacity: 0.3;
}


.modalContainer {
    width: 100%;
    display: flex;
    justify-content: center;
}

.modal-content {
    width: 100%;
}

.modalBody {
    padding: 2%;
}

.Container1 {
    margin: 1%;
    padding: 1% 2%;
}

.text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2%;
    color: rgba(50, 67, 95, 1);
}

.content {
    margin: 3% 0;
}

.payment {
    color: rgba(50, 67, 95, 1);
    border: rgba(50, 67, 95, 0.5) solid 1px;
    border-radius: 5px;
    padding: 0.5% 1%;
}

.textName {
    font-weight: bold;
    color: rgba(143, 134, 129, 1);
}

.textNum {
    color: rgba(50, 67, 95, 0.8);
    text-decoration: none;
    font-style: normal;
    font-size: small;
    display: flex;
    justify-content: end;
}

.Container2 {
    margin-bottom: 10%;
}


/* button */

.modalFooter {
    padding: 2% 3%;
}

.btn1 {
    padding: 1% 2%;
    color: rgba(166, 127, 120, 1);
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 5px;
    background-color: white;
}

.btn2 {
    padding: 1% 2%;
    color: white;
    background-color: rgba(166, 127, 120, 1);
    border: transparent solid 1px;
    border-radius: 5px;
}
</style>
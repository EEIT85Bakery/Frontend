<script setup>
import { ref, watch, defineProps } from 'vue';
import useModal from '@/hooks/useModal';
import { SwalHandle } from '@/stores/sweetAlertStore';

const showSuccess = () => {
    SwalHandle.showSuccessMsg('變更成功！');
};

const { openModal, hideModal, modalRef } = useModal()

defineExpose({
    openModal,
    hideModal
});

const props = defineProps({
  product: {
    type: Object,
    default: null
  }
})

const isModalOpen = ref(false);

const formData = ref({
  level: ''
});

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      // 如果是編輯模式，將 product 的數據填入表單
      formData.value = { ...newProduct };
    } else {
      // 如果是新增模式，清空表單
      formData.value = {
        level: ''
      };
    }
  },
  { immediate: true }
);

// 表單提交
const submitForm = () => {
  if (props.product) {
    console.log('編輯商品', formData.value);
  } else {
    console.log('新增商品', formData.value);
  }
  // 這裡可以觸發保存或新增的操作
  showSuccess();
  hideModal();
  isModalOpen.value = false;
};



const userInfo = ref([
    {
        userName: "吉伊卡哇",
        gender: '女',
        tel: "0912-345-678",
        email: "BunnySugar@service.com",
        birthday: "2024-01-01",
        level1: "白兔會員",
        level2: "金兔會員",
        level3: "白金兔會員",
        level4: "鑽石兔會員",

    }
]);


</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modalContainer modal-md">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">會員資訊</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="Container1">



                        <div class="Container2" v-for="(info, index) in userInfo" :key=index>
                            <div class="text"><span class="textName">會員姓名:</span><span>{{ info.userName }}</span></div>
                            <div class="text"><span class="textName">性別:</span><span>{{ info.gender }}</span></div>
                            <div class="text"><span class="textName">電話號碼:</span><span>{{ info.tel }}</span></div>
                            <div class="text"><span class="textName">電子信箱:</span><span>{{ info.email }}</span></div>
                            <div class="text"><span class="textName">生日:</span><span>{{ info.birthday }}</span></div>
                            <div class="text content textName">會員等級:
                                <select name="pay" class="payment" v-model="formData.level">
                                    <option value="unPaid">{{ info.level1 }}</option>
                                    <option value="paid">{{ info.level2 }}</option>
                                    <option value="paid">{{ info.level3 }}</option>
                                    <option value="paid">{{ info.level4 }}</option>
                                </select>
                            </div>
                            <!-- <hr /> -->
                        </div>

                    </div>

                </div>
                <div class="modal-footer modalFooter">
                    <button type="button" class="btn1" @click="hideModal">取消</button>
                    <button type="submit" class="btn2" @click="submitForm">儲存變更</button>
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
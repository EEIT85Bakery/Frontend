<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';
import useModal from '@/hooks/useModal';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { SwalHandle } from '@/stores/sweetAlertStore';

const convertToDate = (arr) => {
  let date = new Date(arr[0], arr[1] - 1, arr[2]); // JavaScript中的月份是從0開始的
  return date.toISOString().split('T')[0];
}

const { openModal, hideModal, modalRef } = useModal()


const props = defineProps({
  coupon: {
    type: Object,
    default: null
  },
  currentPage: {
        type: Number,
        default: 1
    }
})

defineExpose({
  openModal,
  hideModal
});

const emit = defineEmits(['getCoupons'])
const getCoupons = () => {
  emit('getCoupons')
}

// 獲取今天的日期並格式化為 YYYY-MM-DD
const today = new Date().toISOString().split('T')[0]
const minDate = ref(today)


// const isModalOpen = ref(false)]

const addCoupon = () => {
  console.log(formData.value.name);
  
  axiosInstanceForInsertHeader.post('/admin/coupon', {
    couponName: formData.value.name,
      price: formData.value.price,
      discountNumber: formData.value.discountNumber,
      endDate: formData.value.endDate,
      enable: formData.value.isEnable
  }).then(() => {
    SwalHandle.showSuccessMsg("新增折扣碼成功")
    getCoupons(props.currentPage)
  }).catch(err => console.log(err)
  )
}

const editCoupon = () => {
  
  axiosInstanceForInsertHeader.put(`/admin/coupon/${formData.value.id}`,
    {
      couponName: formData.value.name,
      price: formData.value.price,
      discountNumber: formData.value.discountNumber,
      endDate: formData.value.endDate,
      enable: formData.value.isEnable
    }
  ).then(() => {
    SwalHandle.showSuccessMsg("更新折扣碼成功")
    getCoupons(props.currentPage)
  })
}

const formData = ref({
  name: '',
  price: '',
  discountNumber: '',
  endDate: '',
  isEnable: true
});

watch(
  () => props.coupon,
  (newCoupon) => {
    if (newCoupon) {
      // 如果是編輯模式，將 coupon 的數據填入表單
      formData.value = {
        id: newCoupon.id,
        name: newCoupon.couponName,
        price: newCoupon.price || 1000, // Assuming 1000 is the default value
        discountNumber: newCoupon.discountNumber,
        endDate: Array.isArray(newCoupon.endDate) ? convertToDate(newCoupon.endDate) : newCoupon.endDate,
        isEnable: newCoupon.enable
      };
    } else {
      // 如果是新增模式，清空表單
      formData.value = {
        name: '',
        price: '',
        discountNumber: '',
        endDate: '',
        isEnable: true
      };
    }
  },
  { immediate: true }
);

// 表單提交
const submitForm = () => {
  if (props.coupon) {
    editCoupon()
    console.log('編輯折扣碼', formData.value);
  } else {
    addCoupon()
    console.log('新增折扣碼', formData.value);
  }
  // 這裡可以觸發保存或新增的操作
  hideModal();
  // isModalOpen.value = false;
};

onMounted(() => {
  
})

</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modalContainer modal-md">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">{{ props.coupon ? '編輯折扣碼' : '新增折扣碼' }}</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="textContainer">
                        <div class="couponTitle">
                            <div class="inputText">折扣碼名稱</div>
                            <input type="text"  v-model="formData.name" name="couponName" class="inputContent" placeholder="請輸入優惠名稱" />
                           
                                <div class="inputText">折扣滿額</div>
                                <input type="number" min="0" v-model="formData.price" name="category" class="inputContent" placeholder="請輸入折扣滿額"/>
                                <div class="inputText">折扣金額</div>
                                <input type="number" min="0" v-model="formData.discountNumber" name="unit" class="inputContent" placeholder="請輸入折扣金額"/>
                            
                            <div class="inputText">到期日</div>
                            <input type="date"
                                 name="price" 
                                 class="inputContent" 
                                 placeholder="請輸入優惠到期日"
                                  
                                 :min="minDate"
                                 v-model="formData.endDate" />
                            <div class="inputText">商品是否啟用: 
                                <input type="radio" v-model="formData.isEnable" name="isUsed" value=true class="inputRadio ms-3 md-3"  /> 是
                                <input type="radio" v-model="formData.isEnable" name="isUsed" value=false class="inputRadio ms-3"  /> 否
                            </div>
                            
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
    justify-content: center;  /* 水平居中 */
    align-items: center;      /* 垂直居中 */
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

.textContainer {
    margin: 1%;
    padding: 1% 2%;
}

.inputText {
    margin-bottom: 1%;
    font-weight: bold;
    color: rgba(143, 134, 129, 1);
}

.inputContent {
    width: 100%;
    padding: 1%;
    margin-bottom: 5%;
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
    color: rgba(50, 67, 95, 1);
    text-align: center;
    resize: vertical;
}

.inputContent::placeholder {
    text-align: center;
    font-size: small;
    color: rgba(50, 67, 95, 0.5);
}

.inputRadio {
    accent-color: rgba(166, 127, 120, 0.3);
}


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
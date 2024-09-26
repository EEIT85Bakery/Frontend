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
    isPaid:'',
    orderStatus: ''
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
        isPaid:'',
        orderStatus: ''
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
        tel: "0912-345-678",
        email: "BunnySugar@service.com"
    }
]);

const orderInfo = ref([
    {
        num: "2024010101",
        date: "2024-01-01",
        payWay: "信用卡",
        unPaid: "未付款",
        paid: "已付款",
        confirm: "已確認",
        finish:"已完成",
        payTime: "2024-01-02",
        price: "3600 元"
    }
]);

const products = ref([
    {
        id: "1",
        productName: "經典紐約起司蛋糕",
        quantity: "1 顆",
        total: "360 元"
    },
    {
        id: "2",
        productName: "經典紐約起司蛋糕",
        quantity: "1 顆",
        total: "360 元"
    },
    {
        id: "3",
        productName: "經典紐約起司蛋糕",
        quantity: "1 顆",
        total: "360 元"
    },
    {
        id: "4",
        productName: "經典紐約起司蛋糕",
        quantity: "1 顆",
        total: "360 元"
    },
    {
        id: "5",
        productName: "經典紐約起司蛋糕",
        quantity: "1 顆",
        total: "360 元"
    }
]);


</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modalContainer modal-lg">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">訂單內容</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="Container1">

                        <div class="inputText">訂購人資料</div>

                        <div class="Container2" v-for="(info, index) in userInfo" :key=index>
                            <div class="text"><span class="textName">姓名:</span><span>{{ info.userName }}</span></div>
                            <div class="text"><span class="textName">電話號碼:</span><span>{{ info.tel }}</span></div>
                            <div class="text"><span class="textName">電子信箱:</span><span>{{ info.email }}</span></div>
                            <hr />
                        </div>



                        <div class="inputText">訂單資訊</div>

                        <div class="Container2" v-for="(detail, index) in orderInfo" :key=index>
                            <div class="text"><span class="textName">訂單編號:</span><span>{{ detail.num }}</span></div>
                            <div class="text"><span class="textName">下單日期:</span><span>{{ detail.date }}</span></div>
                            <div class="text"><span class="textName">付款方式:</span><span>{{ detail.payWay }}</span></div>
                            <div class="text content textName">付款狀態:
                                <select name="pay" class="payment" v-model="formData.isPaid">
                                    <option value="unPaid">{{ detail.unPaid }}</option>
                                    <option value="paid">{{ detail.paid }}</option>
                                </select>
                            </div>
                            <div class="text content textName">訂單狀態:
                                <select name="pay" class="payment" v-model="formData.orderStatus">
                                    <option value="unPaid">{{ detail.confirm }}</option>
                                    <option value="paid">{{ detail.finish }}</option>
                                </select>
                            </div>
                            <div class="text"><span class="textName">付款時間:</span><span>{{ detail.payTime }}</span></div>
                            <div class="text"><span class="textName">總金額:</span><span>{{ detail.price }}</span></div>
                            <hr />
                        </div>

                    </div>
                    <div class="textContainer">
                        <div class="productTitle">
                            <div class="inputText">選購商品</div>

                            <div class="Container2" v-for="(item, index) in products" :key=index>
                                <div class="textName text textNum"><i class="bi bi-check2-circle"> 品項{{ item.id }}</i>
                                </div>
                                <div class="text"><span class="textName">商品名稱:</span><span>{{ item.productName }}</span>
                                </div>
                                <div class="text"><span class="textName">數量:</span><span>{{ item.quantity }}</span>
                                </div>
                                <div class="text"><span class="textName">小計:</span><span>{{ item.total }}</span></div>
                                <hr />
                            </div>
                        </div>

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
.inputTwo {
    display: flex;
}

/* 以上是測試 */

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
    /* height: 50vw; */
    display: flex;
}

.Container1 {
    flex: 0 0 48%;
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

.textContainer {
    flex: 0 0 48%;
    margin: 1%;
    padding: 1% 2%;
}

.inputText {
    text-align: center;
    margin-bottom: 5%;
    font-weight: bold;
    font-size: larger;
    color: rgba(166, 127, 120, 1);
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

.img {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 3%;
}

.imgItem {
    flex: 48%;
    box-sizing: border-box;
    margin: 1%;
    /* display: flex; */
    object-fit: contain;
}

.productImg {
    width: 100%;
    height: fit-content;
}

.imgItemText {
    font-size: small;
    text-align: center;
    color: rgba(50, 67, 95, 0.5);
}

.file {
    background-color: white;
    font-size: small;
    color: rgba(50, 67, 95, 0.5);
}

::-webkit-file-upload-button {
    color: white;
    background-color: rgba(166, 127, 120, 0.8);
    border: 0;
    border-radius: 5px;
    font-size: small;
    padding: 1% 2%;
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
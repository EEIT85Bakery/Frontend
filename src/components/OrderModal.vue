<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import useModal from '@/hooks/useModal';
import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const { openModal, hideModal, modalRef } = useModal()

defineExpose({
  openModal,
  hideModal
});

const props = defineProps({
  orderNumber: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['orderUpdated']);

const orderDetail = ref(null);
const isLoading = ref(false);

const formData = ref({
  paymentStatus: '',
  pickupStatus: '',
});

const fetchOrderDetail = async () => {
  if (!props.orderNumber) return;
  
  isLoading.value = true;
  console.log(`Fetching details for order number: ${props.orderNumber}`); // 顯示訂單號碼

  try {
    const response = await axiosInstanceForInsertHeader.get(`/admin/orders/details/${props.orderNumber}`);
    console.log('Order details fetched:', response.data); // 確認返回的資料
    orderDetail.value = response.data;
    console.log('Order products details:', orderDetail.value.orderDetails);
    formData.value.paymentStatus = orderDetail.value.paymentStatus || 'unPaid';
    formData.value.pickupStatus = orderDetail.value.pickupStatus;
  } catch (error) {
    console.error('Error fetching order details:', error);
    SwalHandle.showErrorMsg('無法獲取訂單詳細資訊', error.response?.data?.message || error.message);
  } finally {
    isLoading.value = false;
  }
}

watch(() => props.orderNumber, fetchOrderDetail, { immediate: true });

const submitForm = async () => {
  try {
    await axiosInstanceForInsertHeader.put(`/admin/orders/${props.orderNumber}/updateStatus`, {
      paymentStatus: formData.value.paymentStatus,
      pickupStatus: formData.value.pickupStatus
    });
    emit('orderUpdated', { ...orderDetail.value, ...formData.value });
    SwalHandle.showSuccessMsg('訂單狀態更新成功');
    hideModal();
  } catch (error) {
    SwalHandle.showErrorMsg('更新失敗', error.response?.data?.message || error.message);
  }
};

// 格式化日期函數
const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 5) {
    return null; // 如果日期為空或格式不正確，返回提示
  }

  // 提取時間並檢查是否有秒
  const [year, month, day, hour, minute, second = '00'] = dateArray; // 如果沒有秒，默認為 '00'

  // 格式化為 YYYY-MM-DD HH:mm:ss
  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ` +
                        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

  return formattedDate;
};
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
                    <div v-if="isLoading">加載中...</div>
                    <div v-else-if="orderDetail">
                        <div class="Container1">

                            <div class="inputText">訂購人資料</div>

                            <div class="Container2" >
                                <div class="text"><span class="textName">姓名:</span><span>{{ orderDetail.userName }}</span></div>
                                <div class="text"><span class="textName">電話號碼:</span><span>{{ orderDetail.userPhone }}</span></div>
                                <div class="text"><span class="textName">電子信箱:</span><span>{{ orderDetail.userEmail }}</span></div>
                                <hr />
                            </div>



                            <div class="inputText">訂單資訊</div>
                            
                            <div class="Container2">
                                <div class="text"><span class="textName">訂單編號:</span><span>{{ orderDetail.orderNumber }}</span></div>
                                <div class="text"><span class="textName">下單日期:</span><span>{{ formatDate(orderDetail.createTime) }}</span></div>
                                <div class="text"><span class="textName">付款方式:</span><span>{{ orderDetail.paymentMethod }}</span></div>
                                <div class="text content textName">付款狀態:
                                    <select name="pay" class="payment" v-model="formData.paymentStatus">
                                        <option value="unPaid">未付款</option>
                                        <option value="paid">已付款</option>
                                    </select>
                                </div>
                                <div class="text content textName">訂單狀態:
                                    <select name="pay" class="payment" v-model="formData.pickupStatus">
                                        <option value="unPaid">已確認</option>
                                        <option value="paid">已取貨</option>
                                    </select>
                                </div>
                                <div class="text"><span class="textName">付款時間:</span><span>{{ formatDate(orderDetail.paymentDate) }}</span></div>
                                <div class="text"><span class="textName">總金額:</span><span>{{ orderDetail.paidPrice }} 元</span></div>
                                <div class="text"><span class="textName">使用折扣碼:</span><span>{{ orderDetail.couponName }}</span></div>
                                <div class="text"><span class="textName">折扣金額:</span><span>{{ orderDetail.total - orderDetail.paidPrice }} 元</span></div>
                                <div class="text"><span class="textName">使用BunnyCoin:</span><span>{{ orderDetail.usedBunnyCoins }} 枚</span></div>
                                <hr />
                            </div>

                        </div>
                        <div class="textContainer">
                            <div class="productTitle">
                                <div class="inputText">選購商品</div>

                                <div class="Container2" v-for="(product, index) in orderDetail.orderDetails" :key=index>
                                    <div class="textName text textNum"><i class="bi bi-check2-circle"> 品項 </i>
                                    </div>
                                    <div class="text"><span class="textName">商品名稱:</span><span>{{ product.productName }}</span>
                                    </div>
                                    <div class="text"><span class="textName">數量:</span><span>{{ product.quantity }}</span>
                                    </div>
                                    <div class="text"><span class="textName">小計:</span><span>{{ product.price * product.quantity }}</span></div>
                                    <hr />
                                </div>
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
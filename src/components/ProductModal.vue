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
    category: '',
    name: '',
    price: '',
    isEnable: '',
    unit: '',
    description: '',
    ingredient: ''
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
        category: '',
        name: '',
        price: '',
        isEnable: '',
        unit: '',
        description: '',
        ingredient: ''
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

</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modalContainer modal-lg">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">{{ product ? '編輯商品' : '新增商品' }}</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="imgContainer">

                        <div class="inputText">商品圖片</div>
                        <div class="img">
                            <div class="imgItem">
                                <img src="../../public/imgZip/Sample/apple pie.jpg" alt="" class="productImg">
                                <div class="imgItemText">圖片一</div>
                            </div>
                            <div class="imgItem">
                                <img src="../../public/imgZip/Sample/apple pie.jpg" alt="" class="productImg">
                                <div class="imgItemText">圖片二</div>
                            </div>
                            <div class="imgItem">
                                <img src="../../public/imgZip/Sample/apple pie.jpg" alt="" class="productImg">
                                <div class="imgItemText">圖片三</div>
                            </div>
                            <div class="imgItem">
                                <img src="../../public/imgZip/Sample/apple pie.jpg" alt="" class="productImg">
                                <div class="imgItemText">圖片四</div>
                            </div>
                        </div>
                        <div class="inputText">新增或變更圖片</div>
                        <input type="text" name="addr" class="inputContent" placeholder="請輸入圖片網址">
                        <input type="file" name="imgFile" class="inputContent file" id="fileInput">
                    </div>

                    <div class="textContainer">
                        <div class="productTitle">
                            <div class="inputText">商品名稱</div>
                            <input type="text" v-model="formData.name" name="name" class="inputContent" placeholder="請輸入商品名稱" />
                            <!-- <div class="inputTwo"> -->
                                <div class="inputText">商品分類</div>
                                <input type="text" v-model="formData.category" name="category" class="inputContent" placeholder="請輸入商品分類"/>
                                <div class="inputText">商品單位</div>
                                <input type="text" v-model="formData.unit" name="unit" class="inputContent" placeholder="請輸入商品單位"/>
                            <!-- </div> -->
                            <div class="inputText">商品價格</div>
                            <input type="number" v-model="formData.price" name="price" class="inputContent" placeholder="請輸入商品價格" min="0"/>
                            <div class="inputText">商品是否啟用: 
                                <input type="radio" v-model="formData.isEnable" name="isUsed" class="inputRadio ms-3 md-3"  /> 是
                                <input type="radio" v-model="formData.isEnable" name="isUsed" class="inputRadio ms-3"  /> 否
                            </div>
                            
                        </div>
                        <hr />
                        <div class="productDetail">
                            <div class="inputText">商品描述</div>
                            <textarea type="text" v-model="formData.description" name="productDetail" class="inputContent" placeholder="請輸入商品描述"></textarea>
                            <div class="inputText">商品成分</div>
                            <textarea type="text" v-model="formData.ingredient" name="composition" class="inputContent" placeholder="請輸入商品成分"></textarea>
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
    /* background-color: antiquewhite; */
}

.modal-content {
    width: 100%;
}

.modalBody {
    /* background-color: aqua; */
    padding: 2%;
    height: 50vw;
    display: flex;
}

.imgContainer {
    flex: 0 0 48%;
    margin: 1%;
    padding: 1% 2%;
} 

.textContainer {
    flex: 0 0 48%;
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
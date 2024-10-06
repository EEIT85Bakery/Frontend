<script setup>
import { ref, watch, defineProps } from 'vue';
import useModal from '@/hooks/useModal';
import { SwalHandle } from '@/stores/sweetAlertStore';

import { useCartStore } from '@/stores/cartStore';
import { onMounted } from 'vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const cartStore = useCartStore()

const editProduct = () => {
    
    formData.value.img1 = cartStore.img1
    formData.value.img2 = cartStore.img2
    formData.value.img3 = cartStore.img3
    formData.value.img4 = cartStore.img4
        
    axiosInstanceForInsertHeader.put(`/admin/products/${formData.value.id}`, {
        productName: formData.value.productName,
  stocks: formData.value.stocks,
  description: formData.value.description,
  price: formData.value.price,
  materialDescription: formData.value.materialDescription,
  categoryDescription: formData.value.categoryDescription,
  enable: formData.value.enable,
  categoryName: formData.value.categoryName,
  flavor: formData.value.flavor,
  img1: formData.value.img1,
  img2: cartStore.img2,
  img3: cartStore.img3,
  img4: cartStore.img4
    }).then((res) => {
        console.log(res);
            SwalHandle.showSuccessMsg("編輯產品成功")
            getProducts()
    }).catch(() => {
        SwalHandle.showErrorMsg("編輯產品失敗 請檢查必填參數")
    })
}

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

const emit = defineEmits(['getProducts'])
const getProducts = () => {
  emit('getProducts')
}

onMounted(() => {
       
})

const addPrdocut = () => {
    formData.value.img1 = cartStore.img1
    formData.value.img2 = cartStore.img2
    formData.value.img3 = cartStore.img3
    formData.value.img4 = cartStore.img4
        
    axiosInstanceForInsertHeader.post('/admin/products', {
        productName: formData.value.productName,
  stocks: formData.value.stocks,
  description: formData.value.description,
  price: formData.value.price,
  materialDescription: formData.value.materialDescription,
  categoryDescription: formData.value.categoryDescription,
  enable: formData.value.enable,
  categoryName: formData.value.categoryName,
  flavor: formData.value.flavor,
  img1: formData.value.img1,
  img2: cartStore.img2,
  img3: cartStore.img3,
  img4: cartStore.img4
    }).then((res) => {
        console.log(res);
            SwalHandle.showSuccessMsg("新增產品成功")
            getProducts()
    }).catch(() => {
        SwalHandle.showErrorMsg("新增產品失敗 請檢查必填參數")
    })
}

const isModalOpen = ref(false);
const selectedFile = ref(null);
const selectedFile2 = ref(null);
const selectedFile3 = ref(null);
const selectedFile4 = ref(null);

const formData = ref({
   productName:'',
   stocks: 0,
   description: '',
   price: 0,
   materialDescription: '',
   categoryDescription: '',
   enable: true,
   categoryName: '',
   flavor: '',
   img1: '',
   img2: '',
   img3: '',
   img4: ''
});

//把前端傳進來的圖片存進file
const handleFileChange = (event) => {
    console.log(event);
        const file = event.target.files[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            alert("圖片超過5MB");
            return;
          }
          selectedFile.value = file;
          
        } else {
          alert("Please select an image.");
        }
      };

      const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            alert("圖片超過5MB");
            return;
          }
          selectedFile2.value = file;
          console.log(selectedFile2.value);
          
        } else {
          alert("Please select an image.");
        }
      };

      const handleFileChange3 = (event) => {
        const file = event.target.files[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            alert("圖片超過5MB");
            return;
          }
          selectedFile3.value = file;
          console.log(selectedFile3.value);
          
        } else {
          alert("Please select an image.");
        }
      };

      const handleFileChange4 = (event) => {
        const file = event.target.files[0];
        if (file) {
          if (file.size > 5 * 1024 * 1024) {
            alert("圖片超過5MB");
            return;
          }
          selectedFile4.value = file;
          console.log(selectedFile4.value);
          
        } else {
          alert("Please select an image.");
        }
      };

      //file轉成base 64格式 上傳圖片
      const uploadImage = () => {
        if (selectedFile.value) {            
          const reader = new FileReader();
          console.log("debug1" + reader.result)
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];

            //印出
            cartStore.img1 = base64String
            
          };
          reader.readAsDataURL(selectedFile.value);
          
          //測試傳送圖片

          
        } else {
          alert("Please select an image.");
        }
      };
      const uploadImage2 = () => {
        if (selectedFile2.value) {
            
          const reader = new FileReader();
          console.log("debug2" + reader.result)
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];

            //印出
            cartStore.img2 = base64String
            
          };
          reader.readAsDataURL(selectedFile2.value);
          
          //測試傳送圖片
        //   cartStore.img2 = selectedFile2.value
          
        } else {
          alert("Please select an image.");
        }
      };

      const uploadImage3 = () => {
        if (selectedFile3.value) {
            
          const reader = new FileReader();
          console.log("debug2" + reader.result)
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];

            //印出
            cartStore.img3 = base64String
            
          };
          reader.readAsDataURL(selectedFile3.value);
          
          //測試傳送圖片
        //   cartStore.img2 = selectedFile2.value
          
        } else {
          alert("Please select an image.");
        }
      };

      const uploadImage4 = () => {
        if (selectedFile4.value) {
            
          const reader = new FileReader();
          console.log("debug4" + reader.result)
          reader.onload = () => {
            const base64String = reader.result.split(',')[1];

            //印出
            cartStore.img4 = base64String
            
          };
          reader.readAsDataURL(selectedFile4.value);
          
          //測試傳送圖片
        //   cartStore.img4 = selectedFile4.value
          
        } else {
          alert("Please select an image.");
        }
      };

watch(
    () => props.product,
    (newProduct) => {
        if (newProduct) {
            // 如果是編輯模式，將 product 的數據填入表單
            formData.value = { ...newProduct };
        } else {
            // 如果是新增模式，清空表單
            formData.value = {
                productName:'',
   stocks: 0,
   description: '',
   price: 0,
   materialDescription: '',
   categoryDescription: '',
   enable: true,
   categoryName: '',
   flavor: '',
   img1: '',
   img2: '',
   img3: '',
   img4: ''
            };
        }
    },
    { immediate: true }
);



// 表單提交
const submitForm = () => {
    if (!formData.value.description) {
        SwalHandle.showErrorMsg("請填寫商品描述")
        return;
    }
   

    
    if (props.product) {
        editProduct();
        console.log('編輯商品', formData.value);
    } else {
        addPrdocut()
        console.log('新增商品', formData.value);
    }
    // 這裡可以觸發保存或新增的操作
    hideModal();
    isModalOpen.value = false;
};

// defineExpose({
//     selectedFile
// })

</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modalContainer modal-lg">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">{{ props.product ? '編輯商品' : '新增商品' }}</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="imgContainer">

                        <div class="inputText">商品圖片</div>
                        <div class="img">
                            <div class="imgItem" v-if="props.product">
                                <img :src="props.product.img1" alt="" class="productImg">
                                <div class="imgItemText">圖片一</div>
                            </div>
                            <div class="imgItem" v-if="props.product">
                                <img :src="props.product.img2"  alt="" class="productImg">
                                <div class="imgItemText">圖片二</div>
                            </div>
                            <div class="imgItem" v-if="props.product">
                                <img :src="props.product.img3" alt="" class="productImg">
                                <div class="imgItemText">圖片三</div>
                            </div>
                            <div class="imgItem" v-if="props.product">
                                <img :src="props.product.img4" alt="" class="productImg">
                                <div class="imgItemText">圖片四</div>
                            </div>
                        </div>
                        <div class="inputText">新增或變更圖片</div>
                        <div class="imgItemUploadText">
                            <span style="flex: 20%;">圖片一：</span>
                            <input type="file" name="imgFile" class="inputContentFile file" id="fileInput" @change="handleFileChange"/>
                            <button class="uploadBtn" @click="uploadImage">上傳</button>
                        </div>
                        <div class="imgItemUploadText">
                            <span style="flex: 20%;">圖片二：</span>
                            <input type="file" name="imgFile" class="inputContentFile file" id="fileInput" @change="handleFileChange2"/>
                            <button class="uploadBtn" @click="uploadImage2">上傳</button>
                        </div>
                        <div class="imgItemUploadText">
                            <span style="flex: 20%;">圖片三：</span>
                            <input type="file" name="imgFile" class="inputContentFile file" id="fileInput" @change="handleFileChange3"/>
                            <button class="uploadBtn" @click="uploadImage3">上傳</button>
                        </div>
                        <div class="imgItemUploadText">
                            <span style="flex: 20%;">圖片四：</span>
                            <input type="file" name="imgFile" class="inputContentFile file" id="fileInput" @change="handleFileChange4"/>
                            <button class="uploadBtn" @click="uploadImage4">上傳</button>
                        </div>
                    </div>

                    <div class="textContainer">
                        <div class="productTitle">
                            <div class="inputText">商品名稱</div>
                            <input type="text" v-model="formData.productName" name="name" class="inputContent"
                                placeholder="請輸入商品名稱" />

                            <div class="inputText">商品分類</div>
                            <input type="text" v-model="formData.categoryName" name="category" class="inputContent"
                                placeholder="請輸入商品分類" />
                            <div class="inputText">商品庫存</div>
                            <input type="number" v-model="formData.stocks" name="unit" class="inputContent"
                                placeholder="請輸入商品庫存" />

                            <div class="inputText">商品價格</div>
                            <input type="number" v-model="formData.price" name="price" class="inputContent"
                                placeholder="請輸入商品價格" min="0" />
                            <div class="inputText">商品是否啟用:
                                <input type="radio" v-model="formData.enable" name="isUsed"
                                    class="inputRadio ms-3 md-3" value=true /> 是
                                <input type="radio" v-model="formData.enable" name="isUsed" value=false class="inputRadio ms-3" />
                                否
                            </div>

                        </div>
                        <hr />
                        <div class="productDetail">
                            <div class="inputText">商品描述</div>
                            <textarea type="text" v-model="formData.description" name="productDetail"
                                class="inputContent" placeholder="請輸入商品描述"></textarea>
                            <div class="inputText">商品成分</div>
                            <textarea type="text" v-model="formData.materialDescription" name="composition1" class="inputContent"
                                placeholder="請輸入商品成分"></textarea>
                                <div class="inputText">商品成份描述</div>
                            <textarea type="text" v-model="formData.categoryDescription" name="composition2" class="inputContent"
                                placeholder="請輸入商品成分"></textarea>
                                <div class="inputText">商品口味</div>
                            <textarea type="text" v-model="formData.flavor" name="composition3" class="inputContent"
                                placeholder="請輸入商品成分"></textarea>
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
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

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
    flex: 50%;
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

.uploadBtn {
    flex: 0 0 20%;
    color: white;
    background-color: rgba(143, 134, 129, 1);
    border: transparent solid 1px;
    border-radius: 5px;
    font-size: small;
    padding: 1%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
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

.imgItemUploadText {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    color: rgba(143, 134, 129, 0.8);
    margin-bottom: 5%;
}

.inputContentFile {
    flex: 55%;
    width: 100%;
    padding: 1%;
    margin-right: 2%;
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
    color: rgba(50, 67, 95, 1);
    text-align: center;
    resize: vertical;
    font-size: small;
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
<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref, watch } from 'vue'; 

const checkoutForm = ref({})
const sendCheckoutForm = ref({})
const merchantTradeNo = ref({})
const isSubmitted = ref(false)


const once = () => {

    if (!isSubmitted.value) {
        axios.post('/ecpayCheckout', {
            total: 85,


        }).then((res) => {
            checkoutForm.value = res.data;
            const parser = new DOMParser();
            const doc = parser.parseFromString(checkoutForm.value, 'text/html');
            const merchantTradeNoElement = doc.querySelector('input[name="MerchantTradeNo"]');
            if (merchantTradeNoElement) {
                merchantTradeNo.value = merchantTradeNoElement.value;
            }
            return axios.post(`/products`, { merchantTradeNo: merchantTradeNo.value });
        }).then(() => {
            sendCheckoutForm.value = checkoutForm.value;
            isSubmitted = true; // 設定已提交
        }).catch((err) => {
            console.log('Error:', err);
        });
    }
}

onMounted(() => {
    once();
});
   
 
 watch(sendCheckoutForm, (newForm) => {
    
    if (newForm) {
        // 使用 setTimeout 確保 DOM 更新後再提交
        setTimeout(() => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(newForm, 'text/html');
            const form = doc.getElementById('allPayAPIForm');
            if (form) {
                document.body.appendChild(form); // 將表單添加到文檔中
                form.submit(); // 自動提交表單
            }
        }, 0);
    }
});
</script>

<template>
 <p>讀取結帳資料</p>
    
  </template>
  

  
  <style scoped>
  .checkout-form {
    /* 根據需要自定義樣式 */
  }
  </style>
  
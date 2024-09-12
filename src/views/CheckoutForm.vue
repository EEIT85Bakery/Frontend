<script setup>
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import Loading from '@/components/Loading.vue';
import { useCartStore } from '@/stores/cartStore';
import { onMounted } from 'vue';
import { ref, watch } from 'vue'; 


const checkoutForm = ref({})
const sendCheckoutForm  = ref({})
const merchantTradeNo = ref({})
const isSubmitted = ref(false)
const cartStore = useCartStore()


const once = () => {

    if (!isSubmitted.value) {
        console.log(cartStore.paymentPrice);
        console.log(cartStore.merchantNo);
        
        axiosInstanceForInsertHeader.post('/ecpayCheckout', {            
            total: cartStore.paymentPrice,
            merchantNo: cartStore.merchantNo,
        }).then((res) => {
                        
            checkoutForm.value = res.data;
            const parser = new DOMParser();
            const doc = parser.parseFromString(checkoutForm.value, 'text/html');
            const merchantTradeNoElement = doc.querySelector('input[name="MerchantTradeNo"]');
            if (merchantTradeNoElement) {
                merchantTradeNo.value = merchantTradeNoElement.value;
            }
            // return axiosInstanceForInsertHeader.post(`/products`, { merchantTradeNo: merchantTradeNo.value });
        }).catch((err) => {
            console.log(err);
            
        })
        .then(() => {
            sendCheckoutForm.value = checkoutForm.value;
            isSubmitted.value = true; // 設定已提交
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
    <Loading/>
    
  </template>
  

  
  <style scoped>
  .checkout-form {
    /* 根據需要自定義樣式 */
  }
  </style>
  
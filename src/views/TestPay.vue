<script setup>
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import { onMounted, ref } from 'vue';
const userMerchantNos = ref([])
const okMerchantNos = ref([])

const getUserMerchantNo = () => {

    axiosInstanceForInsertHeader.get('/pay/getMerchantNos').then((res) => {
      userMerchantNos.value = res.data
      queryPayMentStatus()
      })
} 

const queryPayMentStatus = async () => {
  try {
    const promises = userMerchantNos.value.map(userMerchantNo => 
      axiosInstanceForInsertHeader.post('/queryOrder', {
        "merchantID": "2000132",
        "merchantTradeNo": userMerchantNo,
        "timeStamp": "", // Unix timestamp
        "checkMacValue": "",
        "platformID": ""
      })
    );

    const results = await Promise.all(promises);

    okMerchantNos.value = results
      .map(res => {
        const params = new URLSearchParams(res.data);
        return {
          tradeStatus: params.get('TradeStatus'),
          merchantTradeNo: params.get('MerchantTradeNo')
        };
      })
      .filter(result => result.tradeStatus == 1)
      .map(result => result.merchantTradeNo);

    for (const okMerchantNo of okMerchantNos.value) {
      try {
        const res = await axiosInstanceForInsertHeader.put('/pay/checkPaymentStatus', {
          merchantNo: okMerchantNo
        });
      } catch (err) {
        console.error('Error updating payment status:', err);
      }
    }
  } catch (error) {
    console.error('Error in queryPayMentStatus:', error);
  }
};

onMounted(() => {

})
</script>

<template>

<div class="">
    <button @click="getUserMerchantNo">測試取得</button>
</div>
</template>
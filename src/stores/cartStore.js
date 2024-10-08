import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    // 初始化 state
    carts: [],  // 假設你有購物車的商品列表
    total: 0,   // 初始化 total 
    paymentPrice: 0,
    couponName: "",
    usedBunnyCoins: 0,
    merchantNo: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    productId: 0,
    product: {},
    otherProducts: [],
  
   
  
  }),
  
  actions: {
    // 更新 total 的方法
    updateTotal(newTotal) {
      if (typeof newTotal === 'number') {
        this.total = newTotal;
      } else {
        console.error('updateTotal expects a number, but got:', newTotal);
      }
    },
    updateCouponName(newCouponName) {
      this.couponName = newCouponName
    },
    updatecoin(newCoin) {
      this.usedBunnyCoins = newCoin
    },
    updatePaymentPrice(newPaymentPrice) {
      this.paymentPrice = newPaymentPrice
    },
    
    // 其他 actions，可以添加其他操作
    updatePaymentPrice(newPrice) {
      this.paymentPrice = newPrice;
    },

    updateMerchantNo(newMerchantNo) {
      this.merchantNo = newMerchantNo;
    },
     // 設置當前的產品 ID
     setProductId(id){
      this.productId = id;
    },
  
    // 設置當前產品的數據
    setProduct(data){
      this.product = data;
    },  
    // 設置其他產品的數據
    setOtherProducts(data){
      this.otherProducts = data;
    }

    // 可以根據需求添加更多方法來更新其他 state
  }
});

<template>
  <div class="slot-machine">
    <h2>Slot Machine Game</h2>
    <div class="reels">
      <div v-for="(reel, index) in reels" :key="index" class="reel">
        {{ reel }}
      </div>
    </div>
    <p v-if="result" class="result">{{ result }}</p>
    <button @click="startGame()" :disabled="isSpinning">
      {{ isSpinning ? 'Spinning...' : 'Spin' }}
    </button>

    <!-- Toast component -->
    <div v-if="toast.show" class="toast" :class="toast.type">
    {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';

const reels = ref(['🐰', '🐰', '🐰']);
const isSpinning = ref(false);
const result = ref('');
const earnedCoins = ref(0);
const gameTimes = ref(0);

// Toast狀態
const toast = reactive({
  show: false,
  message: '',
  type: 'info'
});

// 跳出toast
const showToast = (message, type = 'info') => {
  toast.show = true;
  toast.message = message;
  toast.type = type;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

// 獲取隨機符號
const getRandomSymbol = () => {
  const symbols = ['🐰', '🍰', '🪙', '🌟'];
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// 設定轉盤結果及購物金
const setReelsAndResult = (symbol, coins) => {
  reels.value = [symbol, symbol, symbol];
  earnedCoins.value = coins;
};

// 根據隨機機率決定獲得獎勵
const determineResult = () => {
  const bigWin = Math.random() < 0.03;
  const mediumWin = Math.random() < 0.10;
  const smallWin = Math.random() < 0.15;

  if (bigWin) {
    setReelsAndResult('🐰', 100);
  } else if (mediumWin) {
    setReelsAndResult('🍰', 50);
  } else if (smallWin) {
    setReelsAndResult('🪙', 30);
  } else {
    setReelsAndResult('🌟', 10);
  }
};

const endGame = () => {
  axiosInstanceForInsertHeader
    .put('/game/end', { earnedCoins: earnedCoins.value })  // 傳送 earnedCoins 的值
    .then((response) => {
      showToast(`恭喜獲得 ${earnedCoins.value} 元購物金!`, 'success');  // 顯示購物金數值
      console.log("恭喜獲得" + earnedCoins.value + "元");
    })
    .catch((error) => {
      console.error('Error ending game:', error);
      showToast('Error ending the game. Please try again.', 'error');  // 顯示錯誤消息
    });

  isSpinning.value = false;
};

const startGame = () => {
  isSpinning.value = true;
  result.value = '';

  axiosInstanceForInsertHeader
    .get('/game/start')
    .then(response => {
      if (response.data === "User has enough game times!") {
        const spinInterval = setInterval(() => {
          reels.value = reels.value.map(() => getRandomSymbol());
        }, 100);

        setTimeout(() => {
          clearInterval(spinInterval);
          determineResult();
          isSpinning.value = false;
          endGame();  // 轉盤結束後發送結果
        }, 2000);
      } else {
        showToast("抽獎券不足，滿千就有一次抽獎機會唷!", 'error');
        isSpinning.value = false;
      }
    })
    .catch(error => {
      console.error('Error starting game:', error);
      showToast("Error starting game. Please try again.", 'error');
      isSpinning.value = false;
    });
};


// 組件初始化後執行
onMounted(() => {

});
</script>



<style scoped>
.slot-machine {
  text-align: center;
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #f0f0f0;
  border-radius: 15px;
  background-color: #f0f0f0;
}
.reels {
  display: flex;
  justify-content: space-around;
  font-size: 64px;
  margin: 30px 0;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
}
.reel {
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
}
.result {
  font-weight: bold;
  margin: 20px 0;
  min-height: 1.2em;
}
button {
  background-color: white;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  padding: 15px 30px;
  font-size: 18px;
}
/* Toast styles */
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  z-index: 1000;
  font-size: 18px;
}
.toast.info {
  background-color: rgba(52, 152, 219, 0.9);
}
.toast.success {
  background-color: rgba(46, 204, 113, 0.9);
}
.toast.error {
  background-color: rgba(231, 76, 60, 0.9);
}
</style>
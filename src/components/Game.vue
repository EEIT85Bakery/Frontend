<template>
  <div class="slot-machine">
    <h2>Slot Machine Game</h2>
    <div class="reels">
      <div v-for="(reel, index) in reels" :key="index" class="reel">
        {{ reel }}
      </div>
    </div>
    <p v-if="result" class="result">{{ result }}</p>
    <button @click="startGame" :disabled="isSpinning">
      {{ isSpinning ? 'Spinning...' : 'Spin' }}
    </button>
    
    <!-- Toast component -->
    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import axiosInstanceForInsertHeader from "@/axios/axiosInstanceForInsertHeader"; // 引入 axios 實例

const startGame = () => {
  isSpinning.value = true;
  result.value = '';
axiosInstanceForInsertHeader.post("/game/start/") // 使用修改後的 axios 實例
    .then(response => {
      if (response.data === "User has enough game times!") {
        // 後端返回剩餘遊玩次數
        gameTimes.value = response.data.gameTimes;

        // 啟動轉輪動畫
        const spinInterval = setInterval(() => {
          reels.value = reels.value.map(() => getRandomSymbol());
        }, 100);

        // 停止轉輪並顯示結果
        setTimeout(() => {
          clearInterval(spinInterval);
          determineResult();
          isSpinning.value = false;
        }, 2000);
      } else {
        // 當抽獎券不足時顯示錯誤訊息
        showToast("抽獎券不足，滿千就有一次抽獎機會唷!", 'error');
        isSpinning.value = false;
      }
    })
    .catch(error => {
      console.error('Error starting game:', error);
      // 顯示錯誤訊息或後端返回的錯誤
      result.value = error.response?.data || "Error starting game. Please try again.";
      showToast("Error starting game. Please try again.", 'error');
      isSpinning.value = false;
    });


const reels = ref(['🐰', '🐰', '🐰']);
const isSpinning = ref(false);
const result = ref('');
const earnedCoins = ref(0);
// const id = ref();
const gameTimes = ref(0);

// Toast state
const toast = reactive({
  show: true,
  message: '',
  type: 'info'
});

// Show toast function
const showToast = (message, type = 'info') => {
  toast.show = true;
  toast.message = message;
  toast.type = type;
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

const getRandomSymbol = () => {
  const symbols = ['🐰', '🍰', '🪙', '🌟'];
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const setReelsAndResult = (symbol, coins) => {
  reels.value = [symbol, symbol, symbol];
  // result.value = `Congratulations! You won ${coins} coins! 🎉`;
  console.log(`恭喜獲得 ${coins} 元購物金! `);
  earnedCoins.value = coins;
};

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
  
  axios.post(`http://localhost:8080/api/game/end/${id.value}`, { earnedCoins: earnedCoins.value })
  .then((response) => {
      gameTimes.value = response.data;
      // 在 toast 顯示剩餘次數
      showToast(`恭喜獲得 ${earnedCoins.value} 元購物金! 剩餘抽獎券: ${gameTimes.value}張`, 'success');
    });;

  isSpinning.value = false;
};

// const startGame = () => {
//   isSpinning.value = true;
//   result.value = '';

  // axios.post(`http://localhost:8080/api/game/start/${id.value}`)
  //   .then(response => {
  //     if (response.data === "User has enough game times!") {
  //       // 後端返回剩餘遊玩次數
  //       gameTimes.value = response.data.gameTimes;
  //       const spinInterval = setInterval(() => {
  //         reels.value = reels.value.map(() => getRandomSymbol());
  //       }, 100);
  //
  //       setTimeout(() => {
  //         clearInterval(spinInterval);
  //         determineResult();
  //         isSpinning.value = false;
  //       }, 2000);
  //     } else {
  //       // result.value = "You don't have enough game times! Buy some cakes!";
  //       showToast("抽獎券不足，滿千就有一次抽獎機會唷!", 'error');
  //       isSpinning.value = false;
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error starting game:', error);
  //     result.value = error.response?.data || "Error starting game. Please try again.";
  //     showToast("Error starting game. Please try again.", 'error');
  //     isSpinning.value = false;
  //   });
};
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
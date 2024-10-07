<template>
  <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
    <div class="modal-dialog modalContainer modal-md">
      <div class="modal-content">
        <div class="modal-header modalHeader">
          <div class="modal-title modalTitle" id="memberModalLabel">小遊戲</div>
          <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body modalBody">

          <div class="slot-machine">
            <div class="bigTitle">Bunny Coin抽獎趣</div>
            <div class="introduction">
              <i class="bi bi-hand-index me-2"></i>
              <span>按下「START」來獲取Bunny Coin吧！</span>
            </div>
            <div class="reels">
              <!-- <div v-for="(reel, index) in reels" :key="index" class="reel">
               {{ reel }}
             </div> -->
              <img v-for="(reel, index) in reels" :key="index" :src="reel" alt="Symbol" class="reel-image" />
            </div>
            <p v-if="result" class="result">{{ result }}</p>
            <!-- <hr> -->
            <button class="startBtn" @click="startGame()" :disabled="isSpinning">
              {{ isSpinning ? 'Spinning...' : 'START' }}
            </button>

            <hr /> 

            <!-- Toast component -->
            <div v-if="toast.show" class="toast" :class="toast.type">
              {{ toast.message }}
            </div>

            <div class="allPrice">全部獎項</div>

            <div class="imgContainer">
              <div class="imgEach">
                <img class="imgHint" src="../../public/imgZip/gameIcon/crown_bunny.png" alt="">
                <div class="me-2">$100</div>
              </div>
              <div class="imgEach">
                <img class="imgHint" src="../../public/imgZip/gameIcon/cake_bunny.png" alt="">
                <div class="me-1">$50</div>
              </div>
              <div class="imgEach">
                <img class="imgHint" src="../../public/imgZip/gameIcon/cookie_bunny.png" alt="">
                <div class="me-1">$30</div>
              </div>
              <div class="imgEach">
                <img class="imgHint" src="../../public/imgZip/gameIcon/tie_bunny.png" alt="">
                <div class="me-1">$10</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer modalFooter">
          <button type="button" class="btn1" @click="hideModal">關閉</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import useModal from '@/hooks/useModal';

const { openModal, hideModal, modalRef } = useModal();

defineExpose({
  openModal,
  hideModal
});

// const reels = ref(['🐰', '🐰', '🐰']);
const reels = ref(['../../public/imgZip/Logo/bunny.png', '../../public/imgZip/Logo/bunny.png', '../../public/imgZip/Logo/bunny.png']);

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
  // const symbols = ['🐰', '🍰', '🪙', '🌟'];

  const symbols = [
    '../../public/imgZip/gameIcon/crown_bunny.png',
    '../../public/imgZip/gameIcon/cake_bunny.png',
    '../../public/imgZip/gameIcon/cookie_bunny.png',
    '../../public/imgZip/gameIcon/tie_bunny.png'
  ];

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

  // if (bigWin) {
  //   setReelsAndResult('🐰', 100);
  // } else if (mediumWin) {
  //   setReelsAndResult('🍰', 50);
  // } else if (smallWin) {
  //   setReelsAndResult('🪙', 30);
  // } else {
  //   setReelsAndResult('🌟', 10);
  // }

  // 獎勵結果：
  if (bigWin) {
    setReelsAndResult('../../public/imgZip/gameIcon/crown_bunny.png', 100);
  } else if (mediumWin) {
    setReelsAndResult('../../public/imgZip/gameIcon/cake_bunny.png', 50);
  } else if (smallWin) {
    setReelsAndResult('../../public/imgZip/gameIcon/cookie_bunny.png', 30);
  } else {
    setReelsAndResult('../../public/imgZip/gameIcon/tie_bunny.png', 10);
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
.startBtn {
  width: 100%;
  padding: 3%;
  margin-bottom: 5%;
  border: 0;
  border-radius: 10px;
  background-color: rgba(166, 127, 120, 1);
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}


.allPrice {
  /* font-size: large; */
  font-weight: bold;
  color: rgba(50, 67, 95, 0.7);
  margin-bottom: 3%;
  /* font-size: small; */
}


.imgContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(50, 67, 95, 0.8);
  /* font-weight: bold; */
}

.imgEach {
  padding: 1% 3%;
  flex: 25%;
  height: auto;
  object-fit: contain;
  border: rgba(166, 127, 120, 0.5) solid 1px;
  border-radius: 5px;
  background-color: white;
  margin: 2%;
  font-size: small;
  font-weight: bold;
}

.imgHint {
  width: 100%;
  border-bottom: rgba(166, 127, 120, 0.5) solid 1px;
  padding-bottom: 10%;
  margin-bottom: 5%;
}

.bigTitle {
  font-size: x-large;
  margin-bottom: 3%;
  font-weight: bold;
  color: rgba(50, 67, 95, 1);
}


.introduction {
  font-size: smaller;
  margin-bottom: 2%;
  font-weight: bold;
  color: rgba(50, 67, 95, 0.7);
}


/* header */
.modalHeader {
  color: rgba(166, 127, 120, 0.8);
  font-size: large;
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgba(166, 127, 120, 0.8); */
}

.closeBtn {
  color: rgba(225, 220, 217, 1);
  background-color: transparent;
  position: absolute;
  right: 2rem;
  border: 0;
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
  padding: 5% 2%;
}

/* button */

.modalFooter {
  padding: 2% 3%;
  display: flex;
  justify-content: center;
}

.btn1 {
  padding: 1% 2%;
  color: rgba(166, 127, 120, 1);
  border: rgba(166, 127, 120, 0.3) solid 1px;
  border-radius: 5px;
  background-color: white;
}

.reel-image {
  width: 30%;
  height: 30%;
}


.slot-machine {
  text-align: center;
  /* font-family: Arial, sans-serif; */
  /* max-width: 400px; */
  max-width: 80%;
  margin: 0 auto;
  padding: 5% 8%;
  /* border: 2px solid #f0f0f0; */
  border-radius: 10px;
  /* background-color: rgba(166, 127, 120, 1); */
  background-color: rgba(225, 220, 217, 0.5);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.reels {
  display: flex;
  object-fit: contain;
  justify-content: space-between;
  /* font-size: 64px; */
  /* margin: 30px 0; */
  margin-bottom: 6%;
  background-color: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  /* padding: 20px; */
  padding: 5%;
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

/* button {
  background-color: white;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
  padding: 15px 30px;
  font-size: 18px;
} */




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
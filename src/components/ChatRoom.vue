<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
import Stomp from 'stompjs'; // 確保導入 Stomp

const router = useRouter();
const isVisible = ref(true); // 控制聊天室顯示/隱藏
const messages = ref([]);
const newMessage = ref("");
let socket = null;
let stompClient = null; // 確保 stompClient 為全局變數

const checkLogin = () => {
  const jwt = localStorage.getItem("jwt"); // 檢查是否有JWT
  if (!jwt) {
    isVisible.value = false; // 關閉聊天室
    Swal.fire({
      title: '未登入',
      text: '請先登入！',
      icon: 'warning',
      confirmButtonText: '確認',
      customClass: { confirmButton: 'myConfirmBtn' },
      timer: 2000, // 2 秒後自動關閉
      timerProgressBar: true // 顯示進度條
    }).then(() => {
      router.push({ name: '登入頁面' }); // 跳轉到登入頁面
    });
  }
};

const connectWebSocket = () => {
  const jwt = localStorage.getItem("jwt");
  socket = new WebSocket("ws://localhost:8080/ws/chat"); // 使用全局 socket 變數
  stompClient = Stomp.over(socket); // 正確設置 stompClient 為全局變數

  stompClient.connect({ Authorization: `Bearer ${jwt}` }, () => {
    console.log("WebSocket 連接成功");

    // 訂閱訊息
    stompClient.subscribe("/topic/messages", (message) => {
      const receivedMessage = JSON.parse(message.body); // 確保將接收到的訊息解析為 JSON
      console.log("接收到的訊息:", receivedMessage); // 在控制台打印訊息
      // 不添加到 messages 陣列中，因此不顯示在聊天室中
    });
  }, (error) => {
    console.error("WebSocket 錯誤:", error);
  });
};

const sendMessage = () => {
  const jwt = localStorage.getItem("jwt");
  if (newMessage.value.trim() !== "") {
    const messageToSend = {
      content: newMessage.value,
      senderId: jwt
    };
    stompClient.send("/app/send", {}, JSON.stringify(messageToSend)); // 使用 JSON.stringify 來將對象轉換為JSON字串
    newMessage.value = ""; // 清空輸入框
  }
};

const closeChat = () => {
  isVisible.value = false; // 隱藏聊天室
  // 如果需要，還可以添加其他邏輯，比如關閉 WebSocket
  if (socket) {
    socket.close(); // 關閉 WebSocket 連接
  }
};

onMounted(() => {
  checkLogin(); // 檢查用戶是否登入
  connectWebSocket(); // 建立 WebSocket 連接
});

onUnmounted(() => {
  if (socket) {
    socket.close(); // 關閉 WebSocket 連接
  }
});
</script>



<template>
  <transition name="fade-slide">
    <div v-if="isVisible" class="chat-room">
      <div class="chat-header">
        <h3>聊天室</h3>
        <button @click="closeChat" class="close-btn">&times;</button>
      </div>
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          {{ message }}
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="輸入訊息..."
        />
        <button @click="sendMessage" class="send-btn">送出</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* 添加過渡效果 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.chat-room {
  position: fixed;
  bottom: 10%;
  right: 6%;
  width: 320px;
  height: 400px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* 柔和的陰影 */
  border-radius: 10px;
  overflow: hidden;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

/* 聊天室標題區域美化 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12.5px;
  background-color: #ffaa0098;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.close-btn:hover {
  color: #ccc;
}

.chat-messages {
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column; /* 垂直排列訊息 */
  align-items: flex-start; /* 默認對齊到左側 */
}

/* 用戶訊息與機器人訊息的樣式 */
.message {
  margin: 5px 0;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  max-width: 75%; /* 限制最大寬度 */
}

/* 用戶訊息樣式 */
.user-message {
  background-color: #cce5ff; /* 用戶訊息背景顏色 */
  align-self: flex-end; /* 用戶訊息靠右 */
}

/* 機器人訊息樣式 */
.bot-message {
  background-color: #e9ecef; /* 機器人訊息背景顏色 */
  align-self: flex-start; /* 機器人訊息靠左 */
}

.chat-input {
  display: flex;
  padding: 10px 15px;
  background-color: #f1f1f1;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.chat-input input:focus {
  outline: none;
  border-color: #ffaa0098;
}

.send-btn {
  margin-left: 10px;
  padding: 10px 15px;
  background-color: #ffaa0098;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #ffaa0098;
}
</style>

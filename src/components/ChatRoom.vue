<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
import Stomp from 'stompjs';

const router = useRouter();
const isVisible = ref(true);
const messages = ref([]);
const newMessage = ref("");
let socket = null;
let stompClient = null;

const checkLogin = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    isVisible.value = false;
    Swal.fire({
      title: '未登入',
      text: '請先登入！',
      icon: 'warning',
      confirmButtonText: '確認',
      customClass: { confirmButton: 'myConfirmBtn' },
      timer: 2000,
      timerProgressBar: true
    }).then(() => {
      router.push({ name: '登入頁面' });
    });
  }
};

// 計算屬性，安全訪問 localStorage
const recipientId = computed(() => {
  return localStorage.getItem("account");
});

const connectWebSocket = () => {
  const jwt = localStorage.getItem("jwt");
  socket = new WebSocket("ws://localhost:8080/ws/chat");
  stompClient = Stomp.over(socket);

  stompClient.connect({ Authorization: `Bearer ${jwt}` }, () => {
    console.log("WebSocket 連接成功");

    // 訂閱用戶特定的消息主題
    stompClient.subscribe(`/user/${recipientId.value}/topic/messages`, (message) => {
      handleIncomingMessage(JSON.parse(message.body));
    });
  }, (error) => {
    console.error("WebSocket 錯誤:", error);
  });
};

// 處理接收到的訊息
const handleIncomingMessage = (msg) => {
  console.log("接收到的訊息:", msg); // 確認接收到的訊息

  let timestamp;

  // 解析 ISO 8601 格式的 timestamp
  if (typeof msg.timestamp === 'string') {
    const date = new Date(msg.timestamp);
    
    // 格式化為所需的字符串格式
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    timestamp = `${year}/${month}/${day}, ${hours}時 ${minutes}分`;
  } else {
    console.warn("無效的 timestamp 類型:", msg.timestamp);
    timestamp = '無效時間';
  }

  chatMessages.value.push({
    ...msg,
    timestamp // 使用格式化後的時間戳
  });
};


const sendMessage = () => {
  const jwt = localStorage.getItem("jwt");
  const account = localStorage.getItem("account");
  const recipient_id = "ADMIN";
  if (newMessage.value.trim() !== "") {
    const messageToSend = {
      content: newMessage.value,
      senderId: account,
      jwt: jwt,
      recipientId: recipient_id,
    };
    stompClient.send("/app/send", {}, JSON.stringify(messageToSend));
    newMessage.value = "";
  }
};

const closeChat = () => {
  isVisible.value = false;
  if (socket) {
    socket.close();
  }
};

onMounted(() => {
  checkLogin();
  connectWebSocket();
});

onUnmounted(() => {
  if (socket) {
    socket.close();
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
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.senderId === localStorage.getItem('account') ? 'user-message' : 'bot-message']">
          {{ message.content }}
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

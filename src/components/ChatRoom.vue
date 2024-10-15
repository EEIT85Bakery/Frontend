<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import Swal from "sweetalert2";
import { useRouter } from 'vue-router';
import Stomp from 'stompjs';
import axios from 'axios';

const router = useRouter();
const isVisible = ref(true);
const messages = ref([]);
const newMessage = ref("");
let socket = null;
let stompClient = null;
const messagesContainer = ref(null); // 引用容器

const checkLogin = () => {
  if (typeof localStorage !== 'undefined') {
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
  } else {
    console.error("localStorage 不可用");
  }
};

const accountId = computed(() => localStorage.getItem('account') || '');

const connectWebSocket = () => {
  const jwt = localStorage.getItem("jwt");
  socket = new WebSocket("ws://localhost:8080/ws/chat");
  stompClient = Stomp.over(socket);

  stompClient.connect({ Authorization: `Bearer ${jwt}` }, () => {
    console.log("WebSocket 連接成功");

    // 訂閱用戶特定的消息主題
    stompClient.subscribe(`/user/${accountId.value}/topic/messages`, (message) => {
      handleIncomingMessage(JSON.parse(message.body));
    });
    
    // 獲取歷史訊息
    fetchChatMessages();
  }, (error) => {
    console.error("WebSocket 錯誤:", error);
  });
};

const fetchChatMessages = async () => {
  try {
    const response = await axios.get(`/get/messages`, {
      params: { userId: accountId.value },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("獲取的消息:", response.data);
    messages.value = response.data.map(message => ({
      content: message.content,
      senderId: message.senderId,
      timestamp: formatTimestamp(message.timestamp)
    }));

    // 確保在加載歷史訊息後滾動到最底部
    scrollToBottom();

  } catch (error) {
    console.error("無法獲取聊天消息:", error);
  }
};

const scrollToBottom = () => {
  nextTick(() => { // 確保 DOM 更新完成後再滾動
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleIncomingMessage = (msg) => {
  console.log("接收到的訊息:", msg);

  messages.value.push({
    content: msg.content,
    senderId: msg.senderId,
    timestamp: formatTimestamp(msg.timestamp)
  });
  
  scrollToBottom(); // 滾動到最底部
};

const formatTimestamp = (timestamp) => {
  let date;

  if (Array.isArray(timestamp)) {
    date = new Date(...timestamp);
  } else {
    date = new Date(timestamp);
  }

  if (isNaN(date.getTime())) {
    console.error("無效的時間戳:", timestamp);
    return "未知時間";
  }

  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}, ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
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

    messages.value.push({
      content: newMessage.value,
      senderId: account,
      timestamp: formatTimestamp(new Date().toISOString())
    });

    newMessage.value = ""; // 清空輸入框
    scrollToBottom(); // 滾動到最底部
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
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.senderId === accountId ? 'user-message' : 'bot-message']">
          <span v-if="message.senderId === accountId">我：{{ message.content }} <span class="timestamp">{{ message.timestamp }}</span></span>
          <span v-else>客服：{{ message.content }} <span class="timestamp">{{ message.timestamp }}</span></span>
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
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #ff8800;
}

.timestamp {
  font-size: 12px;
  color: #888;
  margin-left: 5px;
}
</style>

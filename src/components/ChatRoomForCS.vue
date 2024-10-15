<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';

const props = defineProps({
  recipientId: String, // 這裡仍然接收 recipientId
});

const chatMessages = ref([]);
const newMessage = ref('');
let stompClient;
let socket;

// 格式化時間的通用方法
const formatTimestamp = (timestampArray) => {
  if (Array.isArray(timestampArray) && timestampArray.length === 6) {
    const [year, month, day, hours, minutes] = timestampArray;
    return `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}, ${String(hours).padStart(2, '0')}時 ${String(minutes).padStart(2, '0')}分`;
  } else {
    console.warn("無效的時間格式:", timestampArray); // 警告輸出
    return '無效時間'; // 返回無效時間的字串
  }
};

// 建立 WebSocket 連接
const connectWebSocket = () => {
  socket = new WebSocket("ws://localhost:8080/ws/chat");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("WebSocket 連接成功");

    // 訂閱當前用戶的訊息
    stompClient.subscribe(`/user/${props.recipientId}/topic/messages`, (message) => {
      handleIncomingMessage(JSON.parse(message.body));
    });

    // 初始化聊天訊息
    fetchChatMessages(props.recipientId);
  }, (error) => {
    console.error("WebSocket 錯誤:", error);
  });
};

// 獲取聊天歷史消息
const fetchChatMessages = async (userId) => {
  try {
    const response = await axios.get(`/get/messages`, {
      params: { userId },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("獲取的聊天消息:", response.data); // 調試輸出

    chatMessages.value = response.data.map(message => {
      const timestamp = formatTimestamp(message.timestamp);
      return {
        content: message.content,
        senderId: message.senderId,
        timestamp: timestamp
      };
    });

  } catch (error) {
    console.error("無法獲取聊天消息:", error);
  }
};

// 處理接收到的訊息
const handleIncomingMessage = async (msg) => {
  console.log("收到的消息:", msg); // 確保 msg 的結構正確

  // 檢查 msg.timestamp 是否為有效的 ISO 字串
  if (msg.timestamp && typeof msg.timestamp === 'string') {
    const date = new Date(msg.timestamp);
    
    // 檢查 date 是否有效
    if (!isNaN(date.getTime())) {
      const formattedTimestamp = formatTimestamp([
        date.getFullYear(),
        date.getMonth() + 1, // 月份從 0 開始
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ]);

      // 將接收到的消息推送到 chatMessages
      chatMessages.value.push({
        content: msg.content,
        senderId: msg.senderId,
        timestamp: formattedTimestamp // 使用格式化的時間
      });

      // 強制更新，確保 UI 反映最新消息
      await nextTick();
      console.log("推送到聊天消息:", chatMessages.value);
    } else {
      console.warn("無效的日期:", msg.timestamp); // 警告輸出
    }
  } else {
    console.warn("無效的消息格式:", msg); // 警告輸出，顯示無效的消息
  }
};


const sendMessage = () => {
  const jwt = localStorage.getItem("jwt");
  const account = "ADMIN"; 
  const recipientId = props.recipientId; // 從 props 獲取 recipientId
  
  if (newMessage.value.trim() !== "") {
    // 發送的訊息保持為 ISO 格式
    const isoTimestamp = new Date().toISOString(); // 保持為 ISO 格式

    const messageToSend = {
      content: newMessage.value,
      senderId: account,
      jwt: jwt,
      recipientId: recipientId,
      timestamp: isoTimestamp // 保持為 ISO 格式
    };

    // 先發送消息到後端
    stompClient.send("/app/send", {}, JSON.stringify(messageToSend));

    // 將格式化的訊息推送到聊天室
    newMessage.value = ""; // 清空輸入框
  }
};

// 監聽 recipientId 的變化
watch(() => props.recipientId, (newRecipientId) => {
  if (stompClient) {
    stompClient.disconnect();
  }
  connectWebSocket();
});

// 在組件掛載時建立 WebSocket 連接
connectWebSocket();

// 組件卸載時關閉 WebSocket 連接
onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect();
  }
});
</script>

<template>
  <div class="chat-container">
    <div class="messages">
      <div 
        v-for="msg in chatMessages" 
        :key="msg.timestamp" 
        :class="{'user-message': msg.senderId !== 'ADMIN', 'admin-message': msg.senderId === 'ADMIN'}"
      >
        <strong>{{ msg.senderId }}:</strong> {{ msg.content }}
        <span class="timestamp">{{ msg.timestamp }}</span>
      </div>
    </div>
    <input 
      v-model="newMessage" 
      @keyup.enter="sendMessage" 
      placeholder="輸入訊息..."
    />
  </div>
</template>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
}

.user-message {
  text-align: left;
  background-color: #e1ffc7; /* 用戶訊息背景顏色 */
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
}

.admin-message {
  text-align: right;
  background-color: #c7d3ff; /* 管理員訊息背景顏色 */
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
}

.timestamp {
  font-size: 0.8em;
  color: gray;
}
</style>

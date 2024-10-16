<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ChatRoomForCS from "@/components/ChatRoomForCS.vue";
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

const chatRooms = ref([]); // 用戶聊天室列表
const activeUserId = ref(null); // 當前選中的用戶 ID
const chatMessages = ref({}); // 存儲每個聊天室的訊息

let stompClient; // STOMP 客戶端
let socket; // WebSocket 變量

// 載入聊天室，並清除所有新消息標記
const loadChatRooms = () => {
  const storedChatRooms = JSON.parse(localStorage.getItem('chatRooms')) || [];
  
  // 清除所有聊天室的新消息標記
  storedChatRooms.forEach(room => {
    room.newMessage = false; // 清除新消息標記
  });

  chatRooms.value = storedChatRooms; // 將聊天室列表賦值
};

// 保存聊天室狀態到 localStorage
const saveChatRooms = () => {
  localStorage.setItem('chatRooms', JSON.stringify(chatRooms.value));
};

// 建立 WebSocket 連接
const connectWebSocketForAdmin = () => {
  socket = new WebSocket("ws://localhost:8080/ws/chat");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("WebSocket 連接成功 (管理員)");

    // 訂閱所有用戶的訊息
    stompClient.subscribe("/user/ADMIN/topic/messages", (message) => {
      handleIncomingMessage(JSON.parse(message.body));
    });
  }, (error) => {
    console.error("WebSocket 錯誤 (管理員):", error);
  });
};

// 處理接收到的訊息
const handleIncomingMessage = (msg) => {
  const senderId = msg.senderId;

  // 如果聊天室不存在則創建一個
  let chatRoom = chatRooms.value.find(room => room.userId === senderId);
  if (!chatRoom) {
    chatRoom = { userId: senderId, newMessage: true }; // 初始化聊天室並標記新消息
    chatRooms.value.push(chatRoom); // 新增到收件匣
  } else {
    chatRoom.newMessage = true; // 收到新訊息時標記新消息
  }

  // 將訊息加入到對應的用戶聊天室中
  if (!chatMessages.value[senderId]) {
    chatMessages.value[senderId] = []; // 初始化訊息列表
  }
  chatMessages.value[senderId].push(msg);

  // 保存聊天室狀態到 localStorage
  saveChatRooms();
};

// 請求該用戶的聊天記錄
const fetchChatMessages = async (userId) => {
  try {
    const response = await axios.get(`/api/get/messages`, {
      params: { userId },
    });
    chatMessages.value[userId] = response.data; // 儲存歷史訊息
  } catch (error) {
    console.error(`無法加載用戶 ${userId} 的聊天記錄:`, error);
  }
};

// 點擊用戶聊天室
const openChat = async (userId) => {
  // 只將當前選中的聊天室的新消息標記設為 false
  const chatRoom = chatRooms.value.find(room => room.userId === userId);
  if (chatRoom) {
    chatRoom.newMessage = false; // 只清除當前聊天室的新消息標記
  }

  activeUserId.value = userId; // 更新當前選中的用戶 ID

  // 如果沒有加載過該用戶的訊息，則從後端加載
  if (!chatMessages.value[userId]) {
    await fetchChatMessages(userId);
  }

  // 保存聊天室狀態到 localStorage
  saveChatRooms();
};

// 發送消息到用戶
const sendMessageToUser = (message) => {
  if (!activeUserId.value) return; // 確保有選中用戶
  const msg = {
    senderId: "ADMIN", // 假設管理員的 ID 是 ADMIN
    recipientId: activeUserId.value,
    content: message,
  };

  // 這裡需要將消息發送到後端或其他處理邏輯
  stompClient.send(`/user/${activeUserId.value}/topic/messages`, {}, JSON.stringify(msg));

  // 將發送的消息添加到聊天記錄中
  if (!chatMessages.value[activeUserId.value]) {
    chatMessages.value[activeUserId.value] = [];
  }
  chatMessages.value[activeUserId.value].push(msg);
};

// 關閉當前聊天室
const closeChat = () => {
  activeUserId.value = null; // 清除當前選中的用戶 ID
};

// 刪除指定用戶的聊天室
const removeChatRoom = (userId) => {
  chatRooms.value = chatRooms.value.filter(room => room.userId !== userId); // 刪除聊天室
  delete chatMessages.value[userId]; // 刪除消息記錄

  saveChatRooms(); // 更新 localStorage
};

// 組件掛載時載入聊天室及建立 WebSocket 連接
onMounted(() => {
  loadChatRooms(); // 加載聊天室
  connectWebSocketForAdmin();
});

// 組件卸載時關閉 WebSocket 連接
onBeforeUnmount(() => {
  if (stompClient) {
    stompClient.disconnect();
  }
});
</script>

<template>
  <div class="chat-manage-view">
    <div class="inbox">
      <h2 class="centered-title">
        <img class="imgSize" src="/public/imgZip/Logo/bunny.png" alt="用戶訊息圖標">用戶訊息
        <img class="imgSize flip-horizontal" src="/public/imgZip/Logo/bunny.png" alt="翻轉圖標">
      </h2>
      <ul>
        <li 
          v-for="room in chatRooms" 
          :key="room.userId" 
          @click="openChat(room.userId)"
          :class="{ active: activeUserId === room.userId }" 
        >
          {{ room.userId.length > 10 ? room.userId.slice(0, 10) + '...' : room.userId }}
          <span v-if="room.newMessage" class="new-message">New!</span> <!-- 新消息標記 -->
          <button @click.stop="removeChatRoom(room.userId)" class="remove-button">X</button> <!-- 刪除聊天室按鈕 -->
        </li>
      </ul>
    </div>
    
    <div class="chat-container">
      <transition name="fade" mode="out-in">
        <ChatRoomForCS 
          v-if="activeUserId" 
          :key="activeUserId" 
          :recipientId="activeUserId" 
          :messages="chatMessages[activeUserId]" 
          @send="sendMessageToUser"
          @close="closeChat" 
        />
      </transition>
    </div>
  </div>
</template>


<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.chat-manage-view {
  display: flex;
  width: 100%;
  height: 100vh;
  font-family: 'Microsoft JhengHei', sans-serif; /* 設定字型為微軟正黑體 */
}

.inbox {
  width: 400px;
  background-color: #E1DCD9; /* 使用 #E1DCD9 代替原背景色 */
  padding: 20px;
  border-right: 1px solid #8F8681; /* 使用 #8F8681 代替原邊框顏色 */
  border: 1px solid #A67F78; /* 使用 #A67F78 代替外框顏色 */
  border-radius: 8px; /* 邊角圓滑 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加陰影 */
}

.chat-container {
  flex-grow: 1; /* 確保這個區域可以增長填滿剩餘空間 */
  height: 100%; /* 添加高度以確保其填滿父容器 */
  padding: 20px;
  display: flex; /* 可選，根據需要調整顯示方式 */
  flex-direction: column; /* 可選，根據需要調整方向 */
  overflow-y: auto; /* 使內容可以滾動 */
}

.inbox h2 {
  color: #32435F; /* 使用 #32435F 代替標題顏色 */
  font-size: 40px; /* 增加字體大小 */
  font-weight: bold; /* 粗體 */
  margin-bottom: 20px; /* 標題底部間距 */
}

.inbox ul {
  list-style: none;
  padding: 0;
}

.inbox li {
  cursor: pointer;
  padding: 10px;
  height: 40px; /* 設定固定高度，根據需要調整 */
  position: relative; /* 相對定位以便於使用絕對定位的新消息標記 */
  display: flex; /* 使內容在水平方向上排列 */
  align-items: center; /* 垂直居中對齊 */
  border: 3px solid #8F8681; /* 使用 #8F8681 代替框線顏色 */
  border-radius: 5px; /* 邊角圓滑 */
  margin-bottom: 10px; /* 項目之間的間距 */
  transition: background-color 0.3s; /* 過渡效果 */
  font-family: 'Microsoft JhengHei', sans-serif; /* 設定字型為微軟正黑體 */
  font-weight: bold; /* 粗體 */
}

.inbox li:hover {
  background-color: #f1f1f1; /* 鼠標懸停時的背景色 */
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1); /* 初始和結束狀態 */
  }
  50% {
    transform: scale(1.2); /* 中間狀態，變大 */
  }
}

.new-message {
  color: #A67F78; /* 使用 #A67F78 代替新消息顏色 */
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  font-weight: bold;
  font-size: 1.4em;
  margin-left: 10px;
  font-style: italic; /* 新消息標記為斜體 */
  animation: pulse 1s infinite; /* 添加動畫效果 */
}

.active {
  background-color: #C19A6B; /* 使用 #C19A6B 代替當前選中聊天室的背景色 */
}

.remove-button {
  background-color: transparent; /* 按鈕背景色透明 */
  border: none; /* 不顯示邊框 */
  color: black; /* 使用你希望的顏色 */
  cursor: pointer; /* 鼠標懸停時顯示為可點擊 */
  margin-left: auto; /* 將按鈕推到最右邊 */
}

.remove-button:hover {
  color: #C19A6B; /* 鼠標懸停時改變顏色 */
}

.imgSize {
  margin-bottom: 10px;
  margin-right: 5px;
  height: 46px;
  width: 46px;
}

.flip-horizontal {
  transform: scaleX(-1); /* 水平翻轉 */
}

.centered-title {
  text-align: center; /* 使文本置中 */
}
</style>


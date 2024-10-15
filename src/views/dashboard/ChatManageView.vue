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
      <h2>收件匣</h2>
      <ul>
        <li 
          v-for="room in chatRooms" 
          :key="room.userId" 
          @click="openChat(room.userId)"
          :class="{ active: activeUserId === room.userId }" 
        >
          {{ room.userId }}
          <span v-if="room.newMessage" class="new-message">New!</span> <!-- 新消息標記 -->
        </li>
      </ul>
    </div>
    
    <div class="chat-container" v-if="activeUserId">
      <ChatRoomForCS 
        :recipientId="activeUserId" 
        :messages="chatMessages[activeUserId]" 
        @send="sendMessageToUser"
        @close="closeChat" 
      />
    </div>
  </div>
</template>

<style scoped>
.chat-manage-view {
  display: flex;
  width: 100%;
  height: 100vh;
}

.inbox {
  width: 30%;
  background-color: #f9f9f9;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.chat-container {
  flex-grow: 1;
  padding: 20px;
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
}

.new-message {
  color: cadetblue;
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  font-weight: bold;
  font-size: 1.4em;
  margin-left: 10px;
  font-style: italic; 
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

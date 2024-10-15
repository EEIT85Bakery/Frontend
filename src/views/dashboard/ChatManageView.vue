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
    chatRoom = { userId: senderId, highlighted: true }; // 初始化聊天室並高亮
    chatRooms.value.push(chatRoom); // 新增到收件匣
  } else {
    chatRoom.highlighted = true; // 收到新訊息時高亮
  }

  // 將訊息加入到對應的用戶聊天室中
  if (!chatMessages.value[senderId]) {
    chatMessages.value[senderId] = []; // 初始化訊息列表
  }
  chatMessages.value[senderId].push(msg);
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
  // 將當前選中的聊天室的高亮狀態設為 false
  chatRooms.value.forEach(room => {
    room.highlighted = room.userId === userId ? false : room.highlighted; // 點擊時取消高亮
  });

  activeUserId.value = userId; // 更新當前選中的用戶 ID

  // 如果沒有加載過該用戶的訊息，則從後端加載
  if (!chatMessages.value[userId]) {
    await fetchChatMessages(userId);
  }
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

// 組件掛載時建立 WebSocket 連接
onMounted(() => {
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
          :class="{ active: room.highlighted }" 
        >
          {{ room.userId }}
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
}

.inbox li.active {
  background-color: #d1e7dd; /* Active item highlight */
}
</style>

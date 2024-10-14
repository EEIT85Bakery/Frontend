<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  recipientId: Number,
});

const messages = ref([]);
const newMessage = ref('');

watch(() => props.recipientId, (newVal) => {
  // 當 recipientId 變化時，載入對應的消息
  loadMessages(newVal);
});

const loadMessages = (id) => {
  // 假設有個 API 用來獲取消息
  // 這裡可以放置 API 請求邏輯
  messages.value = [
    { id: 1, sender: '客服', content: '你好！有什麼可以幫助你的？' },
    // 載入其他消息
  ];
};

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      sender: '客服',
      content: newMessage.value,
    });
    newMessage.value = ''; // 清空輸入框
  }
};
</script>

<template>
    <div class="chat-room">
      <h2>與用戶 {{ recipientId }} 的對話</h2>
      <div class="messages">
        <!-- 顯示訊息區域 -->
        <div v-for="message in messages" :key="message.id">
          <strong>{{ message.sender }}:</strong> {{ message.content }}
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="輸入訊息..." />
      <button @click="sendMessage">發送</button>
    </div>
  </template>

  <style scoped>
  .chat-room {
    border: 1px solid #ddd;
    padding: 20px;
  }
  
  .messages {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  </style>
  
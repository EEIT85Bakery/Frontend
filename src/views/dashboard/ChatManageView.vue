<script setup>
import { ref } from "vue";
import ChatRoomForCS from "@/components/ChatRoomForCS.vue"; // 確保路徑正確
import router from '@/router';
import { useRoute } from 'vue-router';

const users = ref([
  { id: 1, name: "用戶 A" },
  { id: 2, name: "用戶 B" },
  { id: 3, name: "用戶 C" },
]);

const activeUserId = ref(null);

const openChat = (id) => {
  activeUserId.value = id;
};

const closeChat = () => {
  activeUserId.value = null;
};
</script>

<template>
    <div class="chat-manage-view">
      <div class="inbox">
        <h2>收件匣</h2>
        <ul>
          <li 
            v-for="user in users" 
            :key="user.id" 
            @click="openChat(user.id)"
            :class="{ active: activeUserId === user.id }"
          >
            {{ user.name }}
          </li>
        </ul>
      </div>
      <div class="chat-container" v-if="activeUserId">
        <ChatRoomForCS :recipientId="activeUserId" @close="closeChat" />
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
  
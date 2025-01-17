<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';  // 引入 useRoute
import router from "@/router/index.js";
import axios from 'axios';
import Swal from 'sweetalert2'; // 直接導入 SweetAlert2

const route = useRoute();
const email = ref(route.query.email || '');
const name = ref('');
const gender = ref('');
const birthday = ref('');
const account = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordMismatch = ref(false);

// 表單提交函數
const submitForm = async () => {
  // 清除錯誤消息
  let isValid = true; // 追蹤表單是否有效

  // 驗證每個字段是否填寫
  if (!name.value) {
    isValid = false;
    Swal.fire('錯誤!', '姓名為必填欄位', 'error');
  }
  if (!gender.value) {
    isValid = false;
    Swal.fire('錯誤!', '性別為必填欄位', 'error');
  }
  if (!birthday.value) {
    isValid = false;
    Swal.fire('錯誤!', '生日為必填欄位', 'error');
  }
  if (!account.value) {
    isValid = false;
    Swal.fire('錯誤!', '帳號為必填欄位', 'error');
  }
  if (!password.value) {
    isValid = false;
    Swal.fire('錯誤!', '密碼為必填欄位', 'error');
  }
  if (!confirmPassword.value) {
    isValid = false;
    Swal.fire('錯誤!', '請再次輸入密碼', 'error');
  } else if (password.value !== confirmPassword.value) {
    passwordMismatch.value = true;
    isValid = false;
    Swal.fire('錯誤!', '密碼不相同，請重新輸入', 'error');
  } else {
    passwordMismatch.value = false;
  }

  if (!isValid) {
    return; // 如果無效，停止提交
  }

  try {
    const response = await axios.post('http://localhost:8080/user/completeDetails', {
      email: email.value,
      account: account.value,
      password: password.value,
      name: name.value,
      gender: gender.value,
      birthday: birthday.value,
    });
    if (response.status === 200) {
      Swal.fire({
        title: '成功!',
        text: '會員資料完善成功！登入後開始購物吧！',
        icon: 'success',
        confirmButtonText: '確認',
        timer: 2000,
        customClass: {confirmButton: 'myConfirmBtn'},
      });
      router.push({ name: '登入頁面' });
    }
  } catch (error) {
    console.error('註冊失敗', error);
    Swal.fire({
      title: '錯誤!',
      text: '會員資料完善失敗，請重新輸入或洽詢客服',
      icon: 'error',
      confirmButtonText: '重新嘗試',
      customClass: {confirmButton: 'myConfirmBtn'},
      timer: 2000,
    });
  }
};
</script>

<template>
  <div class="registerformPage">
    <div class="registerformContainer">
      <div class="registerformLogo">
        <img src="../../public/imgZip/Logo/bunny2.png" alt="bunny" class="registerformBunny">
      </div>

      <div class="lineContainer">
        <div class="registerformLine"></div>
      </div>

      <h3 class="registerformTitle">會員資料</h3>

      <div class="registerformInputContainer">
        <form @submit.prevent="submitForm">
          <div class="registerformText">姓名</div>
          <input v-model="name" type="text" placeholder="請輸入您的姓名（必填）" class="registerformInput"/>
          <br/><br/>
          
          <div class="registerformText">性別</div>
          <select v-model="gender" class="registerformInput registerformSelect">
            <option value="" disabled selected>請選擇您的性別（必填）</option>
            <option value="male">男</option>
            <option value="female">女</option>
          </select>
          <br/><br/>
          
          <div class="registerformText">生日</div>
          <input v-model="birthday" type="date" class="registerformInput" placeholder="請輸入您的生日（必填）"/>
          <br/><br/>
          
          <div class="registerformText">電子信箱</div>
          <input v-model="email" :placeholder="email" class="registerformInput registerformInputFixed" disabled/>
          <br/><br/>
          
          <div class="registerformText">帳號</div>
          <input v-model="account" type="text" placeholder="請輸入您的帳號（必填）" class="registerformInput"/>
          <br/><br/>
          
          <div class="registerformText">密碼</div>
          <input v-model="password" type="password" placeholder="請輸入您的密碼（必填）" class="registerformInput"/>
          <br/><br/>
          
          <div class="registerformText">再次輸入密碼</div>
          <input v-model="confirmPassword" type="password" placeholder="請再次輸入您的密碼（必填）" class="registerformInput"/>
          <br/><br/>
          
          <div v-if="passwordMismatch" class="error-message">密碼不相同，請重新輸入。</div>
          <hr>
          <button class="registerformNextPageButton" type="submit">完成註冊</button>
        </form>
       
        
      </div>

    </div>
  </div>
</template>

<style>
.registerformPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.registerformContainer {
  color: #32435f;
  background-color: white;
  text-align: center;
  border-radius: 5%;
  width: 45%;
  height: 100%;
  margin-top: 2%;
  margin-bottom: 2%;
}

.registerformLogo {
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registerformBunny {
  width: 15%;
  height: 15%;
  object-fit: contain;
  border: #8f8681 solid 2px;
  border-radius: 50%;
  margin-left: 250px;
  margin-right: 250px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.lineContainer {
  display: flex;
  justify-content: center;
}

.registerformLine {
  height: 0.5px;
  background-color: #8f8681;
  width: 90%;
  margin: 10px 0;
}

.registerformTitle {
  font-weight: bold;
  margin: 10px;
  margin-bottom: 20px;
}

.registerformText {
  color: #a67f78;
  font-weight: bold;
  text-align: start;
}

.registerformInputContainer {
  padding-left: 15%;
  padding-right: 15%;
  margin-bottom: 10px;
}

.registerformInput {
  width: 100%;
  border: rgba(143, 134, 129, 0.5) solid 1px;
  border-radius: 5px;
  padding: 5px 10px;
}

.registerformInputFixed {
  background-color: rgba(50, 67, 95, 0.1);
}

.registerformInput::placeholder {
  color: rgba(50, 67, 95, 0.5);
  font-size: small;
}

.registerformInputFixed::placeholder {
  color: #32435f;
  font-size: medium;
}

.registerformSelect {
  appearance: none;
}

.registerformNextPageButton {
  color: white;
  background-color: #a67f78;
  border: #a67f78 solid 1px;
  border-radius: 10px;
  width: 100%;
  height: 5%;
  padding: 2%;
  margin-top: 5%;
  margin-bottom: 10%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.error-message {
  color: red;
}

@media (max-width: 768px) {
  .registerformContainer {
    width: 60%;
    margin-top: 3%;
    margin-bottom: 3%;
  }

  .registerformInputContainer {
    margin-bottom: 10px;
  }

  .registerformText,
  .forgetPasswd,
  .thirdregisterformText {
    font-size: small;
  }

  .registerformImg {
    width: 15%;
  }
}

@media (max-width: 576px) {
  .registerformContainer {
    width: 80%;
    margin-top: 5%;
    margin-bottom: 5%;
  }
}


@media (max-width: 2000px) {
  .registerformContainer {
    width: 30%;
  }
}
</style>

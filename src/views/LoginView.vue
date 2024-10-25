<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { auth, provider } from '../firebase.js'
import { signInWithPopup } from 'firebase/auth';

import SetPasswordModal from '@/components/SetPasswordModal.vue';

const modalRef = ref(null);

const account = ref('');
const password = ref('');
const router = useRouter();

// 用來觸發 modal 的打開方法
function handleOpenModal() {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}


const usersLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/user/login', {
      account: account.value,
      password: password.value
    });

    if (response.status === 200) {
      const token = response.data.token;
      const role = response.data.user;
      const account = response.data.account
      // 儲存 token 到 localStorage裡面
      localStorage.setItem('account', account);
      localStorage.setItem('jwt', token);
      localStorage.setItem('user', role);
      console.log('成功獲得 JWT token:', token);

      // 顯示 SweetAlert，持續 2 秒
      await Swal.fire({
        title: '成功!',
        text: '登入成功！',
        icon: 'success',
        confirmButtonText: '確認',
        customClass: {confirmButton: 'myConfirmBtn'},
        timer: 2000, // 2 秒後自動關閉
        timerProgressBar: true // 顯示進度條
      });

      router.push({ name: '首頁' });
    }
  } catch (error) {
    console.error('登入失敗', error);
    // 登入失敗的處理
    Swal.fire({
      title: '登入失敗',
      text: '請檢查帳號和密碼',
      icon: 'error',
      confirmButtonText: '重新嘗試',
      customClass: {confirmButton: 'myConfirmBtn'}
    });
  }
};

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User Info:', user);

    // 拿到 Firebase ID Token
    const token = await user.getIdToken();
    console.log('Firebase ID Token:', token);

    // 發送 ID Token 到後端進行驗證
    const response = await axios.post('http://localhost:8080/user/googleLogin', {
      googleToken: token
    });

    // 後端驗證成功後的回應
    console.log('後端驗證成功:', response.data);

    // 根據後端回傳的結果，處理前端邏輯
    if (response.data.status === 'success') { // 檢查狀態是否成功
      const jwt = response.data.token; // 確保從後端獲取 JWT
      const role = response.data.user;
      const account = response.data.account;
      localStorage.setItem('account', account);
      localStorage.setItem('jwt', jwt); // 儲存 JWT 到 localStorage
      localStorage.setItem('user', role);

      console.log('用戶登入成功，跳轉到首頁');

      // 顯示 SweetAlert，持續 2 秒
      await Swal.fire({
        title: '成功!',
        text: '登入成功！',
        icon: 'success',
        confirmButtonText: '確認',
        customClass: { confirmButton: 'myConfirmBtn' },
        timer: 2000, // 2 秒後自動關閉
        timerProgressBar: true // 顯示進度條
      });

      router.push({ name: '首頁' });

    } else {
      console.error('後端驗證失敗:', response.data.message);
      Swal.fire({
        title: '登入失敗',
        text: response.data.message,
        icon: 'error',
        confirmButtonText: '重新嘗試',
        customClass: { confirmButton: 'myConfirmBtn' }
      });
    }
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    // 處理登入失敗的情況
    Swal.fire({
      title: '登入失敗',
      text: '請檢查您的 Google 登入，或重試。',
      icon: 'error',
      confirmButtonText: '重新嘗試',
      customClass: { confirmButton: 'myConfirmBtn' }
    });
  }
};

</script>

<template>
  <div class="loginPage">
    <div class="loginContainer">
      <div class="loginLogo">
        <img src="../../public/imgZip/Logo/bunny2.png" alt="bunny" class="loginBunny">
      </div>

      <div class="lineContainer">
        <div class="loginLine"></div>
      </div>

      <h3 class="loginTitle">登入</h3>

      <div class="loginInputContainer">
        <form @submit.prevent="usersLogin">
          <div class="loginText">帳號</div>
          <input v-model="account" type="text" placeholder="請輸入帳號" class="loginInput" />
          <br /><br>
          <div class="loginText">密碼</div>
          <input v-model="password" type="password" placeholder="請輸入密碼" class="loginInput" />
          <div class="forgetPasswd"><div class="forgetPasswd" @click="handleOpenModal" >忘記密碼</div></div>
          <div class="h-100">
            <button class="loginButton" type="submit">開始購物吧！</button>
          </div>
        </form>
      </div>

      <div class="thirdLogin">
        <span class="thirdLoginText">或使用社群帳號登入</span>
        <div class="thirdLoginIcon">
<!--          <img class="loginImg" src="../../public/imgZip/Icon/FB.png" alt="Facebook" />-->
          <img class="loginImg" src="../../public/imgZip/Icon/GOOGLE.png" alt="Google" @click="loginWithGoogle" />
        </div>
      </div>

      <div class="lineContainer">
        <div class="loginLine"></div>
      </div>

      <h3 class="loginTitle">還不是會員？</h3>

      <div class="loginInputContainer">
        <div class="loginText">趕快加入我們吧~</div>
        <div>
          <RouterLink to="register"><button class="registerButton" type="button">註冊會員</button></RouterLink>
        </div>
      </div>
    </div>
  </div>

  <SetPasswordModal ref="modalRef" />

</template>

<style>
.loginPage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loginContainer {
  color: #32435f;
  background-color: white;
  text-align: center;
  border-radius: 5%;
  width: 45%;
  height: 100%;
  margin-top: 2%;
  margin-bottom: 2%;
}

.loginLogo {
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginBunny {
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

.loginLine {
  height: 0.5px;
  background-color: #8f8681;
  width: 90%;
  margin: 10px 0;
}

.loginTitle {
  font-weight: bold;
  margin: 10px;
  margin-bottom: 20px;
}

.loginText {
  color: #a67f78;
  font-weight: bold;
  text-align: start;
}

.loginInputContainer {
  padding-left: 15%;
  padding-right: 15%;
  margin-bottom: 10px;
}

.loginInput {
  width: 100%;
  border: rgba(143, 134, 129, 0.5) solid 1px;
  border-radius: 5px;
  padding: 5px 10px;
}

.loginInput::placeholder {
  color: rgba(50, 67, 95, 0.5);
  font-size: small;
}

.loginButton {
  color: white;
  background-color: #a67f78;
  border: 0;
  border-radius: 10px;
  width: 100%;
  padding: 2%;
  margin-top: 5px;
  height: 5%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.forgetPasswd {
  color: rgba(143, 134, 129, 0.7);
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  text-decoration: underline;
}

.forgetPasswd:hover {
  opacity: 0.7;
}

.thirdLoginIcon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.loginImg {
  height: 10%;
  width: 10%;
  object-fit: contain;
  padding: 10px 5px;
}

.registerButton {
  color: #a67f78;
  background-color: white;
  border: #a67f78 solid 1px;
  border-radius: 10px;
  width: 100%;
  height: 5%;
  padding: 2%;
  margin-top: 5px;
  margin-bottom: 10%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

@media (max-width: 768px) {
  .loginContainer {
    width: 60%;
    margin-top: 3%;
    margin-bottom: 3%;
  }

  .loginInputContainer {
    margin-bottom: 10px;
  }

  .loginText,
  .forgetPasswd,
  .thirdLoginText {
    font-size: small;
  }

  .loginImg {
    width: 15%;
  }

}

@media (max-width: 576px) {
  .loginContainer {
    width: 70%;
    margin-top: 4%;
    margin-bottom: 4%;
  }

  .loginInputContainer {
    margin-bottom: 10px;
  }

  .thirdLoginIcon {
    height: 20%;
  }
}


@media (max-width: 2000px) {
  .loginContainer {
    width: 30%;
  }


}


</style>

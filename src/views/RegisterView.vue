<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from "@/router/index.js";
import Swal from 'sweetalert2'; // 直接導入 SweetAlert2

const phone = ref('');
const email = ref('');
const verifyingToken = ref('');
const verificationSent = ref(false);

const sendVerificationCode = async () => {
  try {
    const response = await axios.post('http://localhost:8080/user/registerVerify', {
      email: email.value,
      phone: phone.value,
    });
    if (response.status === 200) {
      Swal.fire({ // 直接使用 Swal
        title: '成功!',
        text: '驗證信發送成功',
        icon: 'success',
        confirmButtonText: '確認',
        timer: 5000, // 5秒後自動關閉提示框
      });
      verificationSent.value = true;
    }
  } catch (error) {
    console.error('發送驗證碼失敗', error);
    Swal.fire({
      title: '錯誤!',
      text: '發送驗證信失敗',
      icon: 'error',
      confirmButtonText: '重新嘗試',
    });
  }
};

const verifyCode = async () => {
  try {
    const response = await axios.post('http://localhost:8080/user/verify', {
      email: email.value,
      verifyingToken: verifyingToken.value,
    });
    if (response.status === 200) {
      Swal.fire({ // 直接使用 Swal
        title: '成功!',
        text: '驗證成功',
        icon: 'success',
        confirmButtonText: '確認',
        timer: 2000,
      });
      console.log("跳轉到註冊表單頁面");
      router.push({
        name: '註冊表單頁面',
        query: {
          email: email.value,
        },
      });
    }
  } catch (error) {
    console.error('驗證碼驗證失敗', error);
    Swal.fire({
      title: '失敗!',
      text: '驗證碼驗證失敗',
      icon: 'error',
      confirmButtonText: '確認',
      timer: 2000,
    });
  }
};
</script>

<template>
  <div class="registerPage">
    <div class="registerContainer">
      <div class="registerLogo">
        <img src="../../public/imgZip/Logo/bunny2.png" alt="bunny" class="registerBunny">
      </div>

      <div class="lineContainer">
        <div class="registerLine"></div>
      </div>

      <h3 class="registerTitle">註冊</h3>

      <div class="registerInputContainer">
        <form @submit.prevent="sendVerificationCode">
          <div class="registerText">手機號碼</div>
          <input type="tel" v-model="phone" placeholder="請輸入手機號碼" class="registerInput" />
          <br /><br>
          <div class="registerText">電子信箱</div>
          <input type="email" v-model="email" placeholder="請輸入電子信箱" class="registerInput" />
          <div class="validContainer">
            <button class="validButton d-flex" type="submit">
              <div class="validSendText">發送驗證碼到信箱</div>
              <div class="validSendIcon"><i class="bi bi-send"></i></div>
            </button>
          </div>
          <div class="validArrived" v-if="verificationSent"><span class="validArrived">已發送驗證碼</span></div>
          <div class="registerText">驗證碼</div>
          <input type="text" v-model="verifyingToken" placeholder="請輸入驗證碼" class="registerInput" />
        </form>
      </div>

      <div class="lineContainer">
        <div class="registerLine"></div>
      </div>

      <div class="thirdregister">
        <span class="thirdregisterText">或使用社群帳號註冊</span>
        <div class="thridregisterIcon">
          <img class="registerImg" src="../../public/imgZip/Icon/FB.png" alt=".">
          <img class="registerImg" src="../../public/imgZip/Icon/GOOGLE.png" alt=".">
        </div>
      </div>

      <div class="registerInputContainer">
        <button class="registerNextPageButton" @click="verifyCode">下一步</button>
      </div>
    </div>
  </div>
</template>

<style>

.registerPage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.registerContainer {
    color: #32435f;
    background-color: white;
    text-align: center;
    border-radius: 5%;
    width: 45%;
    height: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
}

.registerLogo {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.registerBunny {
    width: 15%;
    height: 15%;
    object-fit: contain;
    border: #8f8681 solid 2px;
    border-radius: 50px;
    margin-left: 250px;
    margin-right: 250px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.lineContainer {
    display: flex;
    justify-content: center;
}

.registerLine {
    height: 0.5px;
    background-color: #8f8681;
    width: 90%;
    margin: 10px 0;
}

.registerTitle {
    font-weight: bold;
    margin: 10px;
    margin-bottom: 20px;
}

.registerText {
    color: #a67f78;
    font-weight: bold;
    text-align: start;
}

.registerInputContainer {
    padding-left: 15%;
    padding-right: 15%;
    margin-bottom: 10px;
}

.registerInput {
    width: 100%;
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
    padding: 5px 10px;
}

.registerInput::placeholder {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
}

.validButton {
    position: relative;
    color: white;
    background-color: #a67f78;
    justify-content: center;
    border: 0;
    border-radius: 10px;
    width: 100%;
    padding: 2% 5% 2% 2%;
    margin-top: 8%;
    height: 2%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.validArrived {
    color: rgba(143, 134, 129, 0.7);
    display: flex;
    justify-content: end;
    font-size: small;
    font-weight: bold;
    margin-right: 1%;
    margin-top: 1.5%;
    margin-bottom: 1%;

}

.validSendIcon {
   color: white;
   position: absolute;
   padding-left: 85%;
   text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}


.thridregisterIcon {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.registerImg {
    height: 10%;
    width: 10%;
    object-fit: contain;
    padding: 10px 5px;
}

.registerNextPageButton {
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

@media (max-width: 768px) {
    .registerContainer {
        width: 60%;
        margin-top: 3%;
        margin-bottom: 3%;
    }

    .registerInputContainer {
        margin-bottom: 10px;
    }

    .registerText,
    .forgetPasswd,
    .thirdregisterText {
        font-size: small;
    }

    .registerImg {
        width: 15%;
    }

    .validButton {
        padding: 2% 5% 2% 25%;
    }

}

@media (max-width: 576px) {
    .registerContainer {
        width: 70%;
        margin-top: 4%;
        margin-bottom: 4%;
    }

    .registerInputContainer {
        margin-bottom: 10px;
    }

    .thirdregisterIcon {
        height: 20%;
    }

    .validButton {
        /* font-size: small; */
        padding: 2% 5% 2% 18%;
    }

}

</style>
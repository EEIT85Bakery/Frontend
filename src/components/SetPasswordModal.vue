<script setup>
  import useModal from "@/hooks/useModal";
  import { SwalHandle } from "@/stores/sweetAlertStore";
  import { ref } from "vue";
  import Swal from "sweetalert2"; // 引入 SweetAlert2
  import { useRouter } from "vue-router";
  import axios from "axios"; // 新增 Axios 引入

  const inputMail = ref("");
  // const myMail = ref('b@');

  const isValidInputVisible = ref(false);
  const isVerificationComplete = ref(false); // 用來追蹤驗證狀態

  // 控制模態框的標題
  const modalTitle = ref("帳戶驗證"); // 初始為 "忘記密碼"

  const inputValid = ref(""); // 驗證碼

  const newPassword = ref("");
  const confirmPassword = ref("");

  const router = useRouter();

  const settingFinished = async () => {
    if (newPassword.value == confirmPassword.value) {
      // 顯示 SweetAlert，持續 2 秒
      await Swal.fire({
        title: "密碼修改成功",
        text: "請重新登入！",
        icon: "success",
        confirmButtonText: "確認",
        customClass: { confirmButton: "myConfirmBtn" },
        timer: 2000, // 2 秒後自動關閉
        timerProgressBar: true, // 顯示進度條
      });
      router.push({ name: "登入頁面" });
      hideModal();
    } else {
      Swal.fire({
        title: "密碼不一致",
        text: "請重新輸入",
        icon: "error",
        confirmButtonText: "重新嘗試",
        customClass: { confirmButton: "myConfirmBtn" },
      });
    }
  };

  const showError = () => {
    SwalHandle.showErrorMsg("驗證碼發送失敗");
  };

  const showSuccess = () => {
    SwalHandle.showSuccessMsg("驗證碼已發送");
  };

  const showValidError = () => {
    SwalHandle.showErrorMsg("驗證失敗");
  };

  const showValidSuccess = () => {
    SwalHandle.showSuccessMsg("驗證成功");
    modalTitle.value = "設定新的密碼";
    isValidInputVisible.value = false; // 隱藏驗證碼輸入框
    isVerificationComplete.value = true; // 設置為驗證成功
  };

  // 發送驗證信的請求
  const isMailExist = async () => {
    console.log(inputMail.value);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/sentResetPasswordEmail",
        {
          email: inputMail.value,
        }
      );

      if (response.status === 200 && response.data.status === "success") {
        // 判斷後端回傳狀態
        showSuccess();
        isValidInputVisible.value = true;
      } else {
        showError();
      }
    } catch (error) {
      console.error("發送重設密碼郵件失敗", error);
      showError();
    }
  };

  const isValidSuccess = async () => {
    try {
      const response = await axios.post("http://localhost:8080/user/verify", {
        email: inputMail.value,
        verifyingToken: inputValid.value,
      });

      // 改為檢查 `response.data.status`，確保驗證成功才進行跳轉或顯示成功訊息
      if (response.data.status === "success") {
        showValidSuccess();
      } else {
        // 如果驗證失敗，顯示失敗訊息
        Swal.fire({
          title: "失敗!",
          text: response.data.message || "驗證失敗或驗證碼不正確",
          icon: "error",
          confirmButtonText: "確認",
          customClass: { confirmButton: "myConfirmBtn" },
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("驗證碼驗證失敗", error);
      Swal.fire({
        title: "失敗!",
        text: error.response?.data?.message || "驗證碼驗證失敗",
        icon: "error",
        confirmButtonText: "確認",
        customClass: { confirmButton: "myConfirmBtn" },
        timer: 2000,
      });
    }
  };

  const resetPassword = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:8080/user/resetPassword",
        {
          email: inputMail.value,
          password: newPassword.value,
        }
      );
      Swal.fire({
        // 直接使用 Swal
        title: "成功!",
        text: "密碼更改成功！",
        icon: "success",
        confirmButtonText: "確認",
        customClass: { confirmButton: "myConfirmBtn" },
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "失敗!",
        text: "密碼更改失敗！",
        icon: "error",
        confirmButtonText: "確認",
        customClass: { confirmButton: "myConfirmBtn" },
        timer: 2000,
      });
    }
  };

  const { openModal, hideModal, modalRef } = useModal();

  defineExpose({
    openModal,
    hideModal,
  });
</script>

<template>
  <div
    ref="modalRef"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modalContainer modal-md">
      <div class="modal-content">
        <div class="modal-header modalHeader">
          <div class="modal-title modalTitle" id="exampleModalLabel">
            {{ modalTitle }}
          </div>
          <button
            type="button"
            class="btn-close closeBtn"
            @click="hideModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body modalBody">
          <div class="contentContainer">
            <div v-if="!isVerificationComplete">
              <div class="registerText">電子信箱</div>
              <input
                type="email"
                v-model="inputMail"
                placeholder="請輸入電子信箱"
                class="registerInput"
              />
            </div>

            <div v-if="isValidInputVisible && !isVerificationComplete">
              <div class="registerText" style="margin-top: 5%">驗證碼</div>
              <div>
                <input
                  type="text"
                  placeholder="請輸入驗證碼"
                  class="registerInput"
                  v-model="inputValid"
                />
              </div>
            </div>

            <div v-if="isVerificationComplete">
              <div class="registerText">新的密碼</div>
              <input
                type="password"
                v-model="newPassword"
                placeholder="請輸入新的密碼"
                class="registerInput"
              />

              <div class="registerText" style="margin-top: 5%">確認新密碼</div>
              <input
                type="password"
                v-model="confirmPassword"
                placeholder="請再次輸入新的密碼"
                class="registerInput"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer modalFooter">
          <button
            class="validButton d-flex"
            type="submit"
            @click="isMailExist"
            v-if="!isValidInputVisible && !isVerificationComplete"
          >
            <div class="validSendText">發送驗證碼</div>
            <div class="validSendIcon"><i class="bi bi-send"></i></div>
          </button>
          <button
            class="validButton d-flex"
            type="submit"
            @click="isValidSuccess"
            v-else-if="isValidInputVisible && !isVerificationComplete"
          >
            <!-- 更新這裡 -->
            <div class="validSendText">完成驗證</div>
          </button>
          <button
            class="validButton d-flex"
            type="submit"
            @click="settingFinished"
            v-else-if="isVerificationComplete"
          >
            <!-- 保留這行 -->
            <div class="validSendText" @click="resetPassword">完成設定</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .contentContainer {
    padding: 5%;
  }

  .registerText {
    color: #a67f78;
    font-weight: bold;
    text-align: start;
  }

  .registerInput {
    width: 100%;
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
    padding: 1% 2%;
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
    padding: 1.5% 3% 1.5% 2%;
    margin-top: 3%;
    margin-bottom: 3%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  .validSendIcon {
    color: white;
    position: absolute;
    padding-left: 85%;
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  .modalHeader {
    color: rgba(166, 127, 120, 1);
    font-size: large;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .closeBtn {
    color: rgba(225, 220, 217, 1);
    position: absolute;
    right: 2rem;
    opacity: 0.3;
  }

  .modalContainer {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .modal-content {
    width: 100%;
  }

  .modalBody {
    padding: 2%;
  }

  .modalFooter {
    padding: 2% 5%;
  }
</style>

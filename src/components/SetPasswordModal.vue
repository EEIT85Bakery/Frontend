<script setup>
import useModal from '@/hooks/useModal';
import { SwalHandle } from '@/stores/sweetAlertStore';
import { ref } from 'vue';
import Swal from 'sweetalert2'; // 引入 SweetAlert2
import { useRouter } from 'vue-router';

const inputMail = ref('');
const myMail = ref('b@');

const isValidInputVisible = ref(false);
const isVerificationComplete = ref(false); // 用來追蹤驗證狀態

// 控制模態框的標題
const modalTitle = ref('帳戶驗證'); // 初始為 "忘記密碼"

const inputValid = ref('');
const validCode = ref('2024');

const newPassword = ref('');
const confirmPassword = ref('');

const router = useRouter();

const settingFinished = async () => {
    if (newPassword.value == confirmPassword.value) {

        // 顯示 SweetAlert，持續 2 秒
        await Swal.fire({
            title: '密碼修改成功',
            text: '請重新登入！',
            icon: 'success',
            confirmButtonText: '確認',
            customClass: { confirmButton: 'myConfirmBtn' },
            timer: 2000, // 2 秒後自動關閉
            timerProgressBar: true // 顯示進度條
        });
        router.push({ name: '登入頁面' });
        hideModal();

    } else {
        Swal.fire({
            title: '密碼不一致',
            text: '請重新輸入',
            icon: 'error',
            confirmButtonText: '重新嘗試',
            customClass: { confirmButton: 'myConfirmBtn' }
        });
    }
}


const showError = () => {
    SwalHandle.showErrorMsg('驗證碼發送失敗');
};

const showSuccess = () => {
    SwalHandle.showSuccessMsg('驗證碼已發送');
};

const showValidError = () => {
    SwalHandle.showErrorMsg('驗證失敗');
};

const showValidSuccess = () => {
    SwalHandle.showSuccessMsg('驗證成功');
    modalTitle.value = '設定新的密碼';
    isValidInputVisible.value = false; // 隱藏驗證碼輸入框
    isVerificationComplete.value = true; // 設置為驗證成功
};

const isMailExist = () => {
    if (inputMail.value === myMail.value) {
        showSuccess();
        isValidInputVisible.value = true; // 顯示驗證碼輸入框
    } else {
        showError();
    }
}

const isValidSuccess = () => {
    if (inputValid.value === validCode.value) {
        showValidSuccess(); // 顯示驗證成功信息
    } else {
        showValidError();
    }
};

const { openModal, hideModal, modalRef } = useModal();

defineExpose({
    openModal,
    hideModal
});
</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modalContainer modal-md">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">{{ modalTitle }}</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close"></button>
                </div>
                <div class="modal-body modalBody">
                    <div class="contentContainer">

                        <div v-if="!isVerificationComplete">
                            <div class="registerText">電子信箱</div>
                            <input type="email" v-model="inputMail" placeholder="請輸入電子信箱" class="registerInput" />
                        </div>

                        <div v-if="isValidInputVisible && !isVerificationComplete">
                            <div class="registerText" style="margin-top: 5%;">驗證碼</div>
                            <div><input type="text" placeholder="請輸入驗證碼" class="registerInput" v-model="inputValid" />
                            </div>
                        </div>

                        <div v-if="isVerificationComplete">
                            <div class="registerText">新的密碼</div>
                            <input type="password" v-model="newPassword" placeholder="請輸入新的密碼" class="registerInput" />

                            <div class="registerText" style="margin-top: 5%;">確認新密碼</div>
                            <input type="password" v-model="confirmPassword" placeholder="請再次輸入新的密碼"
                                class="registerInput" />
                        </div>

                    </div>
                </div>
                <div class="modal-footer modalFooter">
                    <button class="validButton d-flex" type="submit" @click="isMailExist"
                        v-if="!isValidInputVisible && !isVerificationComplete">
                        <div class="validSendText">發送驗證碼</div>
                        <div class="validSendIcon"><i class="bi bi-send"></i></div>
                    </button>
                    <button class="validButton d-flex" type="submit" @click="isValidSuccess"
                        v-else-if="isValidInputVisible">
                        <div class="validSendText">完成驗證</div>
                    </button>
                    <button class="validButton d-flex" type="submit" @click="settingFinished"
                        v-if="isVerificationComplete">
                        <div class="validSendText">完成設定</div>
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

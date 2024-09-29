<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { SwalHandle } from '@/stores/sweetAlertStore';
import Loading from '@/components/Loading.vue';
import SetPasswordModal from '@/components/SetPasswordModal.vue';

const modalRef = ref(null);

const isLoading = ref(false);
const router = useRouter();

// 用來觸發 modal 的打開方法
function handleOpenModal() {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}

// 按下按鈕後的處理邏輯
const startProcess = () => {
    isLoading.value = true;

    // 處理過程
    setTimeout(() => {
        isLoading.value = false;
        // 處理完成後跳轉
        router.push('/');
    }, 2100); // 改成實際處理時間
};

const showSuccess = () => {
  SwalHandle.showSuccessMsg('變更成功！');
};

const showError = () => {
  SwalHandle.showErrorMsg('變更已取消');
};


const deleteItem = () => {
    SwalHandle.confirm(
        '確認刪除',
        `您確定要刪除帳號嗎？`,
        '刪除成功！',
        () => {
            SwalHandle.showSuccessMsg('成功刪除帳號')

            // 使用 setTimeout 模擬延遲
            setTimeout(() => {
                // 延遲 2 秒後啟動 Loading 並執行跳轉
                startProcess();
            }, 2000); // 等待 2 秒

        });
}



</script>

<template>
    <div class="outsideContainer">
        <div class="infoContainer">
            <div class="menuContainer">
                <div class="menuOption">
                    <div class="customerInfo">
                        <RouterLink to="customerInformation" class="textColor">個人資訊</RouterLink>
                    </div>
                    <div class="orderInfo">
                        <RouterLink to="orderList" class="textColor">訂單</RouterLink>
                    </div>
                    <div class="wishList">
                        <RouterLink to="wishList" class="textColor">我的收藏</RouterLink>
                    </div>
                    <div class="levelAndCoin">
                        <RouterLink to="discount" class="textColor">優惠專區</RouterLink>
                    </div>
                    <div class="myDay">
                        <RouterLink to="anniversary" class="textColor">紀念日</RouterLink>
                    </div>
                </div>
                <div class="bottomOption">
                    <div class="line"></div>
                    <div class="logoutOption">
                        <RouterLink to="/" class="textColor">登出</RouterLink>
                    </div>
                </div>
            </div>
            <div class="cutLine"></div>
            <div class="contentContainer">
                <div class="contentTitleContainer">
                    <div class="title">會員資訊</div>
                    <div class="line"></div>
                </div>
                <div class="insideContentContainer">
                    <div class="leftSide">
                        <div class="inputText">姓名</div>
                        <input type="text" class="inputContent" />
                        <div class="inputText">性別</div>
                        <select name="gender" class="inputContent">
                            <option value=""></option>
                            <option value="man">男</option>
                            <option value="woman">女</option>
                        </select>
                        <div class="inputText">生日</div>
                        <input type="date" class="inputContent">
                    </div>
                    <div class="rightSide">
                        <div class="inputText">手機號碼</div>
                        <input type="tel" class="inputContent" />
                        <div class="inputText">電子信箱</div>
                        <input type="email" disabled class="inputContent" placeholder="BunnySugar@service.com">

                        <div class="inputText">帳戶管理</div>
                        <div class="innerText" @click="handleOpenModal">
                            <u style="color: rgba(50, 67, 95, 1); cursor: pointer;">設定新的密碼</u>
                        </div>
                        <div class="innerText" @click="deleteItem">
                            <RouterLink style="color: rgba(50, 67, 95, 1);">刪除帳號</RouterLink>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="btns">
                    <button class="btnLeft" @click="showError">取消</button>
                    <button class="btnRight" @click="showSuccess">儲存變更</button>
                </div>
            </div>
        </div>
    </div>
    <Loading v-if="isLoading" />
    <SetPasswordModal ref="modalRef" />

</template>

<style scoped>
.outsideContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    justify-items: center;
    padding: 3% 8%;
}

.infoContainer {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.menuContainer {
    flex: 0 0 15%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2%;
}

.contentContainer {
    display: flex;
    flex-direction: column;
    flex: 0 0 85%;
    width: 100%;
    padding: 1%;
    height: fit-content;
}

.menuOption {
    color: rgba(143, 134, 129, 1);
    margin-bottom: 10%;
}

.logoutOption {
    color: rgba(166, 127, 120, 1);
}

.customerInfo,
.orderInfo,
.wishList,
.logoutOption,
.levelAndCoin,
.myDay {
    padding: 20%;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    color: rgba(143, 134, 129, 1);
}

.textColor {
    text-decoration: none;
    color: rgba(143, 134, 129, 1);
}

.textColor:focus {
    color: rgba(50, 67, 95, 1);
    text-decoration: underline;
}

.line {
    width: 100%;
    height: 1px;
    background-color: rgba(166, 127, 120, 0.7);
}

.cutLine {
    flex: 0 0 1px;
    background-color: rgba(166, 127, 120, 0.3);
}

.contentTitleContainer {
    padding: 1.5%;
    text-align: center;
    font-weight: bold;
}

.title {
    padding-bottom: 1.5%;
    font-size: 1.8vw;
    color: rgba(166, 127, 120, 1);
}

.insideContentContainer {
    display: flex;
    width: 100%;
    height: 100%;
    /* background-image: url(../../public/imgZip/Logo/bunnyWhite.png);
    background-repeat: no-repeat;
    background-position: left bottom;
    background-color: rgba(255, 255, 255, 0.9);
    background-size: 30%; */
}

.leftSide {
    flex: 0 0 49%;
    padding: 2% 5%;
}

.rightSide {
    flex: 0 0 49%;
    padding: 2% 5%;
}

.inputText {
    color: rgba(166, 127, 120, 1);
    font-weight: bold;
    margin-bottom: 1%;
}

.inputContent {
    width: 100%;
    padding: 1% 3%;
    margin-bottom: 5%;
    color: rgba(50, 67, 95, 1);
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
}

/* 
.addBtn {
    flex: 10%;
    margin-left: 1%;
    margin-bottom: 5%;
    color: white;
    background-color: rgba(166, 127, 120, 1);
    border: 0;
    border-radius: 10px;
    font-size: small;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
} */

.innerText {
    color: rgba(50, 67, 95, 1);
    text-align: center;
    margin-bottom: 5%;
}

.btns {
    margin: 0% 7% 2% 4%;
    text-align: right;
}

.btnLeft {
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 5px;
    background-color: white;
    color: rgba(166, 127, 120, 1);
    /* font-weight: bold; */
    padding: 1% 2%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
}

.btnRight {
    border: transparent solid 1px;
    border-radius: 5px;
    background-color: rgba(166, 127, 120, 1);
    color: white;
    /* font-weight: bold; */
    padding: 1% 2%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-left: 2%;
}
</style>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { SwalHandle } from '@/stores/sweetAlertStore';
import Loading from '@/components/Loading.vue';
import SetPasswordModal from '@/components/SetPasswordModal.vue';
import axiosInstanceForInsertHeader from "@/axios/axiosInstanceForInsertHeader.js";

const modalRef = ref(null);
const isLoading = ref(false);
const router = useRouter();

// 用來觸發 modal 的打開方法
function handleOpenModal() {
  if (modalRef.value) {
    modalRef.value.openModal(); // 調用 modal 的 openModal 方法
  }
}

// 會員資料
const memberData = ref({
  id: null, // 確保會員 ID 被初始化
  name: '',
  gender: '',
  birthday: '',
  phone: '',
  email: '' // 假設此為信箱，原始值不應修改
});

// 獲取會員資料
const fetchMemberData = () => {
  axiosInstanceForInsertHeader
    .get('/memberPage')
    .then((response) => {
      // 確保從後端返回的資料正確賦值到 memberData
      memberData.value = response.data;
      // 檢查是否有 ID，並確保 ID 被賦值
      if (!memberData.value.id) {
        console.error('會員 ID 未定義'); // 提示錯誤
        SwalHandle.showErrorMsg('獲取會員資料失敗，ID 未定義');
        return;
      }

      // 確保生日格式正確
      if (memberData.value.birthday) {
        memberData.value.birthday = formatDate(memberData.value.birthday); // 使用格式化函數
      }
    })
    .catch((error) => {
      console.error('Error fetching member data:', error);
      SwalHandle.showErrorMsg('獲取會員資料失敗，請重試');
    });
};

// 格式化日期為 YYYY-MM-DD
const formatDate = (dateString) => {
  const date = new Date(dateString);

  // 確保輸出為 yyyy-MM-dd 格式
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 確保月是兩位數
  const day = String(date.getDate()).padStart(2, '0'); // 確保日是兩位數
  return `${year}-${month}-${day}`;
};

// 更新會員資料
const updateMemberData = () => {
  isLoading.value = true;

  const updatedData = {
    name: memberData.value.name,
    gender: memberData.value.gender,
    birthday: memberData.value.birthday,
    phone: memberData.value.phone,
    // 信箱不包含在內，保持原始值
  };

  axiosInstanceForInsertHeader
    .put('/memberPage/update', updatedData) // 更新為正確的 API 路徑
    .then(() => {
      SwalHandle.showSuccessMsg('會員資料更新成功！');
    })
    .catch((error) => {
      console.error('Error updating member data:', error);
      SwalHandle.showErrorMsg('更新失敗，請重試。');
    })
    .finally(() => {
      isLoading.value = false;
    });
};

// 刪除會員
const deleteMember = () => {
  SwalHandle.confirm(
    '確認刪除',
    '您確定要刪除帳號嗎？',
    '刪除成功！',
    () => {
      isLoading.value = true;
      const userId = memberData.value.id; // 獲取會員 ID
      if (!userId) {
        console.error('會員 ID 未定義');
        SwalHandle.showErrorMsg('刪除失敗，會員 ID 不存在。');
        return;
      }

      axiosInstanceForInsertHeader
        .delete("/memberPage") // 使用正確的會員 ID 發送刪除請求
        .then(() => {
          SwalHandle.showSuccessMsg('成功刪除帳號');

          localStorage.removeItem('jwt');
          localStorage.removeItem('user');
          localStorage.removeItem('account');
          router.push('/'); // 刪除成功後回到首頁
        })
        .catch((error) => {
          console.error('Error deleting member:', error);
          SwalHandle.showErrorMsg('刪除失敗，請重試。');
        })
        .finally(() => {
          isLoading.value = false;
        });
    }
  );
};
const logout = () => {
  SwalHandle.confirm(
      '確認登出?',
      '您確定要登出嗎？',
      '登出成功！',
      () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('account');

        router.push({ name: '首頁' }).then(() => {
          SwalHandle.showSuccessMsg('您已成功登出，返回首頁。');
        }).catch((error) => {
          console.error('登出跳轉失敗:', error);
        });
      }
  );
};

// 組件初始化後獲取會員資料
onMounted(() => {
  fetchMemberData();
});
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
                      <RouterLink to="#" class="textColor" @click="logout">登出</RouterLink>
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
                        <input type="text" class="inputContent" v-model="memberData.name" />
                        <div class="inputText">性別</div>
                        <select v-model="memberData.gender" class="inputContent">
                            <option value=""></option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        <div class="inputText">生日</div>
                        <input type="date" class="inputContent" v-model="memberData.birthday">
                    </div>
                    <div class="rightSide">
                        <div class="inputText">手機號碼</div>
                        <input type="tel" class="inputContent" v-model="memberData.phone" />
                        <div class="inputText">電子信箱</div>
                        <input type="email" class="inputContent" v-model="memberData.email" disabled placeholder="BunnySugar@service.com">
                        <div class="inputText">帳戶管理</div>
                        <div class="innerText" @click="handleOpenModal">
                            <RouterLink style="color: rgba(50, 67, 95, 1);">設定新密碼</RouterLink>
                        </div>
                        <div class="innerText" @click="deleteMember">
                            <span @click="deleteMember" style="color: rgba(50, 67, 95, 1); cursor: pointer;">刪除帳號</span>                        </div>
                        </div>
                    </div>
                <hr />
                <div class="btns">
                    <button class="btnLeft" @click="showError">取消</button>
                    <button class="btnRight" @click="updateMemberData">儲存變更</button>
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
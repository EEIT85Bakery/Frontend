<script setup>
import { onMounted, ref } from 'vue';
import { SwalHandle } from '@/stores/sweetAlertStore';
import axiosInstanceForInsertHeader from '@/axios/axiosInstanceForInsertHeader';
import PaginationComponent from '@/components/PaginationComponent.vue';

const anniversaries = ref({})
const currentPage = ref(1);
    const totalPages = ref(1);
    const itemsPerPage = ref(3);
    const totalItems = ref(0)

    const handlePageChange = (page) => {
      currentPage.value = page;
      getAnniversaries(page);
    };

    const convertToDate = (arr) => {
  let date = new Date(arr[0], arr[1] - 1, arr[2]); // JavaScript中的月份是從0開始的
  return date.toISOString().split('T')[0];
}


const showSuccess = () => {
  SwalHandle.showSuccessMsg('新增成功！');
};

const getAnniversaries = (page) => {
    const params = {
    page: page - 1,
    size: itemsPerPage.value
  };
    axiosInstanceForInsertHeader.get('/anniversaries', {params}).then(res => {
        anniversaries.value = res.data.content
        console.log(anniversaries.value);
           
        const { content, totalElements, totalPages: backendTotalPages, size, number } = res.data;
        totalItems.value = totalElements;
      totalPages.value = backendTotalPages;
      currentPage.value = number + 1;
      itemsPerPage.value = size;
      anniversaries.value = content;
    }).catch(err => console.log(err))
}

const deleteItem = (item) => {
  SwalHandle.confirm(
    '確認刪除',
    `您確定要刪除 ${item.thing} 嗎？`,
    '刪除成功！', 
    () => {
      // 執行刪除操作，例如：
      items.value = items.value.filter(i => i !== item);
      SwalHandle.showSuccessMsg(`成功刪除 ${item.thing}`);
    }
  );
};

const items = ref([
    {
        thing: '結婚紀念日',
        date: '01 / 01'
    },
    {
        thing: '結婚紀念日',
        date: '01 / 01'
    },
    {
        thing: '結婚紀念日',
        date: '01 / 01'
    }
])

onMounted(() => {
    getAnniversaries(currentPage.value)
})

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
                    <div class="title">紀念日</div>
                    <div class="line"></div>
                </div>
                <div class="insideContentContainer">

                    <div class="introduction">
                        <!-- <div class="introText">處在忙綠的生活步調中，您是否經常忘了許多紀念日是需要被好好慶祝的呢？</div>
                        <div class="introText">不用擔心，<b>"您記不住的，BunnySugar幫您記住"</b></div> -->

                        <div class="introImgContainer">
                            <img class="troImg" src="../../public/imgZip/decoration/anniversaryText.png" alt="">
                        </div>
                    </div>
                    <hr />
                    <div class="hintText">
                        <i class="bi bi-caret-down-fill"></i>
                        以下輸入「重要事項」以及「日期」，我們會於紀念日到來的前*天寄提醒信件到您的電子信箱
                    </div>
                    <div class="inputArea">
                        <div class="area1">
                            <div class="inputText">重要事項</div>
                            <input type="text" class="inputContent" placeholder="請輸入重要事項" />
                            <div class="inputText">日期</div>
                            <input type="date" class="inputContent" />
                            <div>
                                <button type="submit" class="inputBtn" @click="showSuccess">新增</button>
                            </div>
                        </div>
                        <div class="inputLine"></div>
                        <div class="area2">

                            <div class="tableContainer">

                                <table>
                                    <tr>
                                        <th>重要事項</th>
                                        <th>日期</th>
                                        <th>刪除</th>
                                    </tr>
                                    <tr v-for="(item, index) in anniversaries" :key="index">
                                        <td>{{ item.anniversaryName }}</td>
                                        <td>{{ convertToDate(item.anniversaryDate) }}</td>
                                        <td @click="deleteItem(item)"><i class="bi bi-x-circle delBtn"></i></td>
                                    </tr>
                                </table>



                                
                            </div>







                            <!-- <div class="myContent">
                                <div class="myThing">
                                    <div>
                                        <i class="bi bi-bell-fill me-1"></i>
                                        <span>Vicky's Birthday </span>
                                        <span>12 / 25</span>
                                    </div>
                                    
                                    <i class="bi bi-x-circle delBtn"></i>
                                </div>
                            </div>
                            <div class="myContent">
                                <div class="myThing">
                                    <div>
                                        <i class="bi bi-bell-fill me-1"></i>
                                        <span>Vicky's Birthday </span>

                                        <span>12 / 25</span>
                                    </div>

                                    <i class="bi bi-x-circle delBtn"></i>
                                </div>
                            </div> -->

                        </div>
                    </div>









                </div>
                <PaginationComponent 
      :totalPages="totalPages" 
      :currentPage="currentPage" 
      @pageChange="handlePageChange"
      @getCoupons="getAnniversaries(currentPage)"
    />
            </div>
            
        </div>
        
    </div>

</template>

<style scoped>
.introduction {
    text-align: center;
    width: 100%;
    color: rgba(143, 134, 129, 1);
}

.introImgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
}

.troImg {
    width: 70%;
    height: 100%;
}

.hintText {
    font-size: small;
    font-weight: bold;
    text-align: center;
    color: rgba(50, 67, 95, 1);
}

.introText {
    margin-bottom: 1%;
}

.inputArea {
    display: flex;
    border: rgba(50, 67, 95, 0.3) solid 1px;
    /* border-radius: 5px; */
    padding: 1%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
    margin-top: 1%;
    margin-bottom: 5%;
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
    font-size: small;
    padding: 2%;

}

.inputBtn {
    width: 100%;
    padding: 1%;
    margin-top: 2%;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: rgba(166, 127, 120, 1);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.area1 {
    flex: 39%;
    margin: 1%;
}

.inputLine {
    flex: 0.1%;
    margin: 0 0;
    margin: 0 1%;
    background-color: rgba(166, 127, 120, 0.7);
}

.area2 {
    flex: 60%;
    margin: 1%;
    border-radius: 10px;
    display: flex;
    background-color: rgba(225, 220, 217, 0.2);
}

.myContent {
    padding: 2% 3%;
    flex: 50%;
}

.myThing {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(50, 67, 95, 1);
    background-color: white;
    /* font-weight: bold; */
    padding: 1% 5%;
    border: rgba(50, 67, 95, 0.2) solid 1px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.delBtn {
    /* font-size: small; */
    color: rgba(50, 67, 95, 0.7);
    cursor: pointer;
}

.delBtn:hover {
    opacity: 0.7;
}

.tableContainer {
    width: 100%;
    padding: 1% 3%;
}

table {
    width: 100%;
}

th, td {
    text-align: center;
    line-height: 2.5;
    padding: 0 2%;
    border-bottom: rgba(143, 134, 129, 1) solid 1px;
}

th {
    font-weight: bold;
    color: rgba(143, 134, 129, 1);
}

td {
    color: rgba(50, 67, 95, 1);
}









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
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 3%;
}
</style>
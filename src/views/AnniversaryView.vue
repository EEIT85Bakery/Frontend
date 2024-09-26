<script setup>


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
                        <div class="introText">處在忙綠的生活步調中，您是否經常忘了許多紀念日是需要被好好慶祝的呢？</div>
                        <div class="introText">不用擔心，<b>"您記不住的，BunnySugar幫您記住"</b></div>
                        <hr>
                    </div>
                    <div>
                        <i class="bi bi-caret-down-fill"></i>
                        以下輸入「重要事項」以及「日期」，我們會於紀念日到來的前*天寄提醒信件到您的電子信箱
                    </div>
                   
                    <div class="inputArea">
                        <div class="area1">
                            
                            
                        </div>
                        <div class="area2">
                            fjmlkdshv
                        </div>
                    </div>









                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>

.introduction {
    text-align: center;
    width: 100%;
    background-color: lightblue;
    color: rgba(143, 134, 129, 1);
}

.introText {
    margin-bottom: 1%;
    /* font-size: small; */
}

.inputArea {
    display: flex;
}

.area1 {
    flex: 30%;
    background-color: lightpink;
}

.area2 {
    flex: 40%;
    background-color: lightgoldenrodyellow;
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
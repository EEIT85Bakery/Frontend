<script setup>

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
                <form>
                    <div class="registerText">手機號碼</div>
                    <input type="tel" placeholder="請輸入手機號碼" class="registerInput" />
                    <br /><br>
                    <div class="registerText">電子信箱</div>
                    <input type="email" placeholder="請輸入電子信箱" class="registerInput" />
                    <div class="validContainer">
                        <!-- <RouterLink class="toFillInfo" to="/"> -->
                            <button class="validButton d-flex" type="submit">
                                <div class="validSendText">發送驗證碼到信箱</div>
                                <div class="validSendIcon"><i class="bi bi-send"></i></div>
                            </button>
                        <!-- </RouterLink> -->
                        
                    </div>
                    <div class="validArrived"><span class="validArrived">已發送驗證碼</span></div>
                    <div class="registerText">驗證碼</div>
                    <input type="text" placeholder="請輸入驗證碼" class="registerInput" />
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
                <RouterLink to="registerForm">
                    <button class="registerNextPageButton" type="submit">下一步</button>
                </RouterLink>
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
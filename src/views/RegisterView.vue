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
                    <div class="h-100">
                        <RouterLink to="/"><button class="validButton" type="submit">發送驗證碼到信箱</button></RouterLink>
                    </div>
                    <div class="validArrived"><span class="validArrived">已發送驗證碼</span></div>
                    <div class="registerText">驗證碼</div>
                    <input type="text" placeholder="請輸入驗證碼" class="registerInput" />
                </form>
            </div>

            <div class="lineContainer">
                <div class="registerLine"></div>
            </div>

            <div class="thirdLogin">
                <span>或使用社群帳號登入</span>
                <div class="thridLoginIcon">
                    <img class="loginImg" src="../../public/imgZip/Icon/FB.png" alt=".">
                    <img class="loginImg" src="../../public/imgZip/Icon/GOOGLE.png" alt=".">
                </div>
            </div>

            <div class="registerInputContainer">
                <div>
                    <button class="registerButton" type="submit">註冊會員</button>
                </div>
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
    width: 40%;
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
    padding-left: 100px;
    padding-right: 100px;
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
    color: white;
    background-color: #a67f78;
    border: 0;
    border-radius: 5px;
    width: 100%;
    padding: 5px 10px;
    margin-top: 8%;
    height: 3vw;
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
    margin-bottom: 10px;
}

.thridLoginIcon {
    width: 100%;
    height: 10%;
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
    border-radius: 5px;
    width: 100%;
    height: 3vw;
    padding: 5px 10px;
    margin-top: 5px;
    margin-bottom: 10%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
<script setup>

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
                <form>
                    <div class="loginText">電子信箱</div>
                    <input type="email" placeholder="請輸入電子信箱" class="loginInput" />
                    <br /><br>
                    <div class="loginText">密碼</div>
                    <input type="password" placeholder="請輸入密碼" class="loginInput" />
                    <div class="forgetPasswd"><a class="forgetPasswd" href="#">忘記密碼</a></div>
                    <div class="h-100">
                        <RouterLink to="/"><button class="loginButton" type="submit">開始購物吧！</button></RouterLink>
                    </div>
                </form>
            </div>





            <div class="thirdLogin">
                <span>或使用社群帳號登入</span>
                <div class="thridLoginIcon">
                    <img class="loginImg" src="../../public/imgZip/Icon/FB.png" alt=".">
                    <img class="loginImg" src="../../public/imgZip/Icon/GOOGLE.png" alt=".">
                </div>
            </div>

            <div class="lineContainer">
                <div class="loginLine"></div>
            </div>

            <h3 class="loginTitle">還不是會員？</h3>

            <div class="loginInputContainer">
                <div class="loginText">趕快加入我們吧~</div>
                <div>
                    <RouterLink to="register"><button class="registerButton" type="submit">註冊會員</button></RouterLink>
                </div>
            </div>
        </div>
    </div>


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
    width: 40%;
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
    padding-left: 100px;
    padding-right: 100px;
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
    border-radius: 5px;
    width: 100%;
    padding: 5px 10px;
    margin-top: 5px;
    height: 3vw;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.forgetPasswd {
    color: rgba(143, 134, 129, 0.7);
    font-weight: bold;
    margin-top: 10px;
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
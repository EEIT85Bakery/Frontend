<script setup>
// import { ref } from 'vue';
// import VueDatePicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css';

// const date = ref(null);

</script>

<template>

<!-- <VueDatePicker v-model="date" /> -->

    <div class="registerformPage">
        <div class="registerformContainer">
            <div class="registerformLogo">
                <img src="../../public/imgZip/Logo/bunny2.png" alt="bunny" class="registerformBunny">
            </div>

            <div class="lineContainer">
                <div class="registerformLine"></div>
            </div>

            <h3 class="registerformTitle">會員資料</h3>

            <div class="registerformInputContainer">
                <form>
                    <div class="registerformText">姓名</div>
                    <input type="text" placeholder="請輸入您的姓名" class="registerformInput" />
                    <br /><br>
                    <div class="registerformText">性別</div>
                    <select type="gender" placeholder="請選擇您的性別" class="registerformInput registerformSelect">
                        <option value="none"></option>
                        <option value="true">男</option>
                        <option value="flase">女</option>
                    </select>
                    <br /><br />
                    <div class="registerformText">生日</div>
                    <input type="text" class="registerformInput" ref="datepicker" />
                    <br /><br />
                    <div class="registerformText">手機號碼</div>
                    <input type="text" placeholder="0912-345-678" class="registerformInput registerformInputFixed " />
                    <br /><br />
                    <div class="registerformText">電子信箱</div>
                    <input type="text" placeholder="2024/01/01" class="registerformInput registerformInputFixed" />
                    <br /><br />
                </form>
            </div>

            <div class="lineContainer">
                <div class="registerformLine"></div>
            </div>

            <div class="registerformInputContainer">
                <RouterLink to="/">
                    <button class="registerformNextPageButton" type="submit">完成註冊</button>
                </RouterLink>
            </div>
        </div>
    </div>


</template>

<style>
.registerformPage {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.registerformContainer {
    color: #32435f;
    background-color: white;
    text-align: center;
    border-radius: 5%;
    width: 45%;
    height: 100%;
    margin-top: 2%;
    margin-bottom: 2%;
}

.registerformLogo {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.registerformBunny {
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

.registerformLine {
    height: 0.5px;
    background-color: #8f8681;
    width: 90%;
    margin: 10px 0;
}

.registerformTitle {
    font-weight: bold;
    margin: 10px;
    margin-bottom: 20px;
}

.registerformText {
    color: #a67f78;
    font-weight: bold;
    text-align: start;
}

.registerformInputContainer {
    padding-left: 15%;
    padding-right: 15%;
    margin-bottom: 10px;
}

.registerformInput {
    width: 100%;
    border: rgba(143, 134, 129, 0.5) solid 1px;
    border-radius: 5px;
    padding: 5px 10px;
}

.registerformInputFixed {
    background-color: rgba(50, 67, 95, 0.1);
}

.registerformInput::placeholder {
    color: rgba(50, 67, 95, 0.5);
    font-size: small;
}

.registerformInputFixed::placeholder {
    color: #32435f;
    font-size: medium;
}

.registerformSelect {
    appearance: none;
}

.registerformNextPageButton {
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
    .registerformContainer {
        width: 60%;
        margin-top: 3%;
        margin-bottom: 3%;
    }

    .registerformInputContainer {
        margin-bottom: 10px;
    }

    .registerformText,
    .forgetPasswd,
    .thirdregisterformText {
        font-size: small;
    }

    .registerformImg {
        width: 15%;
    }


}

@media (max-width: 576px) {
    .registerformContainer {
        width: 70%;
        margin-top: 4%;
        margin-bottom: 4%;
    }

    .registerformInputContainer {
        margin-bottom: 10px;
    }

    .thirdregisterformIcon {
        height: 20%;
    }


}
</style>
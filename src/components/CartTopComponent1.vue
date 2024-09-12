

<template>

    <!-- 流程圖 -->
    <div class="flowContainer">
        <div class="flow">
            <div class="stepIcon stepActive">
                <div class="num1">1</div>
            </div>
            <div class="flowText">購物車</div>
            <div class="flowLine"></div>
            <div class="stepIcon">
                <div class="num2">2</div>
            </div>
            <div class="flowText">填寫資料</div>
            <div class="flowLine"></div>
            <div class="stepIcon">
                <div class="num3">3</div>
            </div>
            <div class="flowText">訂單確認</div>
        </div>
    </div>

</template>

<style scoped>

.flowContainer {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5%;
}

.flow {
    width: 70%;
    height: 4vw;
    display: flex;
    align-items: center;
}

.stepIcon {
    flex: 0 0 5%;
    height: 80%;
    text-align: center;
    font-weight: bold;
    align-content: center;
    color: rgba(143, 134, 129, 0.8);
    border: rgba(143, 134, 129, 0.8) solid 1px;
    border-radius: 50px;
    background-color: white;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.stepActive {
    color: white;
    border: rgba(255, 255, 255, 0) solid 2px; 
    background-color: rgba(143, 134, 129, 1);
}

.flowText {
    flex: 15%;
    height: 100%;
    text-align: center;
    align-content: center;
    font-weight: bold;
    color: rgba(143, 134, 129, 0.8);
} 

.flowIcon {
    font-size: 4vw;
}

.flowLine {
    flex: 0 0 25%;
    height: 2px;
    background-color:  rgba(143, 134, 129, 0.5);
    margin-right: 2%;
}

@media (max-width: 768px) {
    
    .flow {
        width: 70%;
    }

    .flowLine {
        flex: 0 0 5%;
        height: 1px;
    }

    .stepIcon {
    text-align: center;
    font-size: small;
    width: 6%;
    margin: 3%;
}
}

@media (max-width: 576px) {
    .flow {
        height: fit-content;
        flex-direction: column;
        font-size: small;
    }

    .stepIcon {
    width: 7%;
    margin: 3%;
}

    .stepActive {
        width: 7.5%;
    }
}

@media (max-width: 2000px) {
    .stepIcon {
        font-size: larger;
    }

    .flowText {
        font-size: larger;
    }
}




</style>
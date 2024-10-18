<script setup>
import { onMounted, ref, watch } from 'vue';

</script>

<template>

    <div class="bottom-info">
        <div class="bottom-item">
            <div class="mb-2 mt-4">客服服務時間</div>
            <div class="mb-4">週一至週日 10:00-17:00</div>
            <div class="mb-2">客服專線</div>
            <div class="mb-4">04 - 2326 - 5860</div>
            <div class="mb-2">客服信箱</div>
            <div class="mb-1">service@bunnysugar.com</div>
        </div>
        <div class="d-flexbox bottom-item">
            <div class="bottomLogo" >
                <img src="../../public/imgZip/Logo/logo.png" alt="Bunny" class="bunny-bottom">
            </div>
            <div class="flex bottom-socialMedia">
                <i class="bi bi-facebook socialMedia"></i>
                <i class="bi bi-instagram socialMedia"></i>
                <i class="bi bi-line socialMedia"></i>
            </div>
        </div>
        <div class="bottom-item">
            <div class="mb-2 mt-4">營業時間</div>
            <div class="mb-4">週一至週日 00:00-24:00</div>
            <div class="mb-2">取貨時間</div>
            <div class="mb-4">24小時開放取貨</div>
            <div class="mb-2">門市地址</div>
            <div class="mb-1">408台中市南屯區公益路二段51號18樓</div>
        </div>
    </div>
    <div class="bottom-warn">
        © 2024 Bunny Sugar. All rights reserved.
    </div>

</template>

<style scoped>

.bottom-info {
    color: #8F8681;
    display: flex;
    height: max-content;
    width: 100%;
    position: relative;
    bottom: 0;
    padding: 30px;
    background-color: white;
    font-size: large;
}

.bottom-warn {
    color: white;
    width: 100%;
    position: relative;
    bottom: 0;
    text-align: center;
    font-size: small;
    padding: 5px;
    background-color: rgba(166, 127, 120, 0.5);
}

.bottom-item {
    display: flexbox;
    flex: 1;
    text-align: center;
}

.bunny-bottom {
    width: 80%;
    padding: 10px;
    padding-bottom: 8%;
}

.bottom-socialMedia {
    background-color: #fff;
    align-content: center;
    align-items: stretch;
}

.socialMedia {
    color: rgba(166, 127, 120, 0.7);
    font-size: 3vw;
    padding: 10px;
    cursor: pointer;
}

@media (max-width: 576px) {
    .bottom-info {
        flex-direction: column;
        font-size: smaller;
    }

    .bottom-socialMedia {
        margin: 5%;
    }

    .socialMedia {
        font-size: 7vw;
    }

    .bottomLogo {
        display: none;
    }

    .bottom-warn {
        font-size: smaller;
    }
}
</style>
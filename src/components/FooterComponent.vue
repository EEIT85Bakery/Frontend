<script setup>
import { onMounted, ref, watch } from 'vue';

</script>

<template>

    <div class="bottom-info">
        <div class="bottom-item">
            客服服務時間<br />
            週一至週日 10:00-17:00<br /><br />
            客服專線<br />
            04 - 2326 - 5860<br /><br />
            客服信箱<br />
            service@bunnysugar.com
        </div>
        <div class="d-flexbox bottom-item">
            <div>
                <img src="../../public/imgZip/Logo/logo.png" alt="Bunny" class="bunny-bottom">
            </div>
            <div class="flex bottom-socialMedia">
                <i class="bi bi-facebook socialMedia"></i>
                <i class="bi bi-instagram socialMedia"></i>
                <i class="bi bi-line socialMedia"></i>
            </div>


        </div>
        <div class="bottom-item">
            營業時間<br />
            週一至週日 11:30-19:30<br /><br />
            最後取貨時間<br />
            週一至週日 19:00<br /><br />
            門市地址<br />
            408台中市南屯區公益路二段51號18樓
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
    /* margin-top: 50px; */
    padding: 30px;
    background-color: white;
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
</style>
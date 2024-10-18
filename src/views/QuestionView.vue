<script setup>
import { ref, onMounted, watch } from 'vue';
import Collapse from 'bootstrap/js/dist/collapse';
import PrivateRightModal from '@/components/PrivateRightModal.vue';
import UserRightModal from '@/components/UserRightModal.vue';
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';

const isLoading = ref(true);

const route = useRoute();

const startLoading = () => {
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
};

watch(route, () => {
    isLoading.value = true;
    startLoading();
});

const privateRightModalRef = ref(null);
const userRightModalRef = ref(null);

// 打開新增 modal
const openPrivateRightModal = () => {
    privateRightModalRef.value.openModal();
};

const openUserRightModal = () => {
    userRightModalRef.value.openModal();
};

const currentContent = ref('content1');

const accordionItems = ref([
    {
        title: '產品的保存期限是多久？',
        content: '我們選用新鮮食材，不添加防腐劑，因此部分商品的賞味期限較短屬於正常現象。慶祝蛋糕和含有新鮮水果的甜點，建議當天或最晚隔天食用完畢。其他商品的保存期限請以包裝上的標籤為準。蛋糕隨貨附有保冷劑，請在拿取後二十分鐘內放入冰箱保存。'
    },
    {
        title: '商品出現問題該如何處理？',
        content: '如果商品有非人為因素的損壞、漏寄或品質問題，請務必當場錄影並保留商品完整性，然後立即聯繫客服並提供訂購資訊，我們將盡快為您處理後續問題。'
    },
    {
        title: '素食者是否可食用？',
        content: '商品皆為『蛋奶素』產品。部分商品含酒精，詳細說明請參閱各項商品頁內容介紹。'
    }
]);

const isExpanded = ref(Array(accordionItems.value.length).fill(false));
const collapseInstances = ref([]);

onMounted(() => {

    isLoading.value = true;
    startLoading();

    // 確保每個 collapse 元素都初始化
    const collapseElements = document.querySelectorAll('.accordion-collapse');
    collapseElements.forEach((collapseEl, index) => {
        const instance = new Collapse(collapseEl, { toggle: false });
        collapseInstances.value.push(instance);
    });
});

const toggleCollapse = (index) => {
    if (collapseInstances.value[index]) {
        collapseInstances.value[index].toggle();
        isExpanded.value[index] = !isExpanded.value[index]; // 切換開合狀態
    }
};

const additionalContentItems = {
    content2: [
        {
            title: '付款方式有哪些？',
            content: '我們接受信用卡、門市付款等付款方式。'
        },
        {
            title: '發票如何取得？',
            content: '所有訂單均會附上電子發票，請至您的訂單確認信中查詢。'
        }
    ],
    content3: [
        {
            title: '取貨方式有哪些？',
            content: '目前僅提供門市取貨'
        },
        {
            title: '取貨時間是？',
            content: '目前24小時開放取貨。'
        }
    ],
    content4: [
        {
            title: '隱私權政策',
            content: '我們重視您的隱私，詳細政策請參考'
        }
    ],
    content5: [
        {
            title: '使用者條款',
            content: '使用者條款詳見'
        }
    ]
};
</script>

<template>

    <Loading v-if="isLoading" />

    <div class="imgContainer">
        <img src="../../public/imgZip/header/QandA.png" alt="header" class="headerImg">
    </div>
    <div class="wholeContainer">
        <div class="optionContainer">
            <div class="option optionBtn" @click="currentContent = 'content1'">
                商品相關問題
                <i class="bi bi-arrow-right-circle arrowIcon"></i>
            </div>
            <div class="option optionBtn" @click="currentContent = 'content2'">
                付款相關問題
                <i class="bi bi-arrow-right-circle arrowIcon"></i>
            </div>
            <div class="option optionBtn" @click="currentContent = 'content3'">
                取貨相關問題
                <i class="bi bi-arrow-right-circle arrowIcon"></i>
            </div>
            <div class="option optionBtn" @click="currentContent = 'content4'">
                隱私權政策
                <i class="bi bi-arrow-right-circle arrowIcon"></i>
            </div>
            <div class="option optionBtn" @click="currentContent = 'content5'">
                使用者條款
                <i class="bi bi-arrow-right-circle arrowIcon"></i>
            </div>
        </div>

        <div class="contentContainer">
            <div v-if="currentContent === 'content1'" class="content">
                <div class="title">商品相關問題</div>
                <hr />
                <div class="accordion" id="productAccordion">
                    <div class="accordion-item" v-for="(item, index) in accordionItems" :key="index">
                        <h2 class="accordion-header" :id="'heading' + index">
                            <button class="accordion-button" :class="{ collapsed: !isExpanded[index] }" type="button"
                                @click="toggleCollapse(index)">
                                <i class="bi bi-question-circle-fill me-2"></i>
                                {{ item.title }}
                            </button>
                        </h2>
                        <div :id="'collapse' + index" class="accordion-collapse collapse"
                            :class="{ show: isExpanded[index] }" :aria-labelledby="'heading' + index">
                            <div class="accordion-body">
                                {{ item.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="currentContent === 'content2'" class="content">
                <div class="title">付款相關問題</div>
                <hr />
                <div class="accordion" id="paymentAccordion">
                    <div class="accordion-item" v-for="(item, index) in additionalContentItems.content2" :key="index">
                        <h2 class="accordion-header" :id="'headingPayment' + index">
                            <button class="accordion-button" :class="{ collapsed: !isExpanded[index] }" type="button"
                                @click="toggleCollapse(index)">
                                <i class="bi bi-question-circle-fill me-2"></i>
                                {{ item.title }}
                            </button>
                        </h2>
                        <div :id="'collapsePayment' + index" class="accordion-collapse collapse"
                            :class="{ show: isExpanded[index] }" :aria-labelledby="'headingPayment' + index">
                            <div class="accordion-body">
                                {{ item.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="currentContent === 'content3'" class="content">
                <div class="title">取貨相關問題</div>
                <hr />
                <div class="accordion" id="pickupAccordion">
                    <div class="accordion-item" v-for="(item, index) in additionalContentItems.content3" :key="index">
                        <h2 class="accordion-header" :id="'headingPickup' + index">
                            <button class="accordion-button" :class="{ collapsed: !isExpanded[index] }" type="button"
                                @click="toggleCollapse(index)">
                                <i class="bi bi-question-circle-fill me-2"></i>
                                {{ item.title }}
                            </button>
                        </h2>
                        <div :id="'collapsePickup' + index" class="accordion-collapse collapse"
                            :class="{ show: isExpanded[index] }" :aria-labelledby="'headingPickup' + index">
                            <div class="accordion-body">
                                {{ item.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="currentContent === 'content4'" class="content">
                <div class="title">隱私權政策</div>
                <hr />
                <div class="accordion" id="privacyAccordion">
                    <div class="accordion-item" v-for="(item, index) in additionalContentItems.content4" :key="index">
                        <h2 class="accordion-header" :id="'headingPrivacy' + index">
                            <button class="accordion-button" :class="{ collapsed: !isExpanded[index] }" type="button"
                                @click="toggleCollapse(index)">
                                <i class="bi bi-question-circle-fill me-2"></i>
                                {{ item.title }}
                            </button>
                        </h2>
                        <div :id="'collapsePrivacy' + index" class="accordion-collapse collapse"
                            :class="{ show: isExpanded[index] }" :aria-labelledby="'headingPrivacy' + index">
                            <div class="accordion-body">
                                {{ item.content }} <u style="cursor: pointer;" @click="openPrivateRightModal">Bunny
                                    Sugar 隱私權政策</u>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="currentContent === 'content5'" class="content">
                <div class="title">使用者條款</div>
                <hr />
                <div class="accordion" id="termsAccordion">
                    <div class="accordion-item" v-for="(item, index) in additionalContentItems.content5" :key="index">
                        <h2 class="accordion-header" :id="'headingTerms' + index">
                            <button class="accordion-button" :class="{ collapsed: !isExpanded[index] }" type="button"
                                @click="toggleCollapse(index)">
                                <i class="bi bi-question-circle-fill me-2"></i>
                                {{ item.title }}
                            </button>
                        </h2>
                        <div :id="'collapseTerms' + index" class="accordion-collapse collapse"
                            :class="{ show: isExpanded[index] }" :aria-labelledby="'headingTerms' + index">
                            <div class="accordion-body">
                                {{ item.content }}<u @click="openUserRightModal" style="cursor: pointer;">Bunny
                                    Sugar使用者條款</u>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <PrivateRightModal ref="privateRightModalRef" />
    <UserRightModal ref="userRightModalRef" />

</template>









<style scoped>
.accordion-button {
    color: rgba(50, 67, 95, 1);
    font-weight: bold;
}

.accordion-body {
    color: rgba(50, 67, 95, 0.9);
}

.accordion-button:focus,
.accordion-button:focus-visible {
    outline: none;
    border: 0;
    box-shadow: none;
    /* background-color: rgba(143, 134, 129, 0.1); */
}

.accordion-button.collapsed {
    color: rgba(50, 67, 95, 1);
}

.accordion-button:not(.collapsed) {
    background-color: rgba(50, 67, 95, 0.1);
    color: rgba(50, 67, 95, 1);
}

.imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    object-fit: cover;
}

.headerImg {
    width: 100%;
    height: 100%;
}

.wholeContainer {
    padding: 3%;
    display: flex;
}

.optionContainer {
    flex: 30%;
    flex-direction: column;
}

.contentContainer {
    flex: 70%;
    padding: 0% 5%;
}

.content {
    color: rgba(50, 67, 95, 1);
}

.option {
    text-align: center;
    padding: 3%;
    margin-bottom: 5%;
    cursor: pointer;
}

.option:hover {
    opacity: 0.7;
}

.optionBtn {
    width: 100%;
    padding: 3%;
    font-weight: bold;
    color: rgba(166, 127, 120, 1);
    background-color: white;
    border: rgba(166, 127, 120, 0.5) solid 1px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
    position: relative;
}

.arrowIcon {
    position: absolute;
    right: 5%;
    color: rgba(166, 127, 120, 0.5);
}

.title {
    text-align: center;
    font-size: x-large;
    font-weight: bold;
    color: rgba(143, 134, 129, 1);
}

.titleText {
    font-weight: bold;
    margin-bottom: 2%;
}
</style>

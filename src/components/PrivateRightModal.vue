<script setup>
import useModal from '@/hooks/useModal';

const { openModal, hideModal, modalRef } = useModal()

defineExpose({
    openModal,
    hideModal
});

</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modalContainer modal-lg">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">隱私權政策</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="privacy-policy">
                        <p style="text-align: center;"><strong>生效日期：</strong>2024年10月1日</p>

                        <p>感謝您選擇 <strong>Bunny
                                Sugar</strong>。您的隱私對我們來說非常重要。我們致力於保護您個人的資料並確保您的信息安全。以下是我們的隱私權政策，詳細說明我們如何收集、使用、保護及分享您的個人資料。
                        </p>

                        <hr />

                        <h5>1. 資料的收集</h5>
                        <p>我們可能會收集以下類型的個人資料：</p>
                        <ul>
                            <li><strong>聯絡資訊</strong>：包括您的姓名、電子郵件地址和電話號碼。</li>
                            <li><strong>支付資訊</strong>：如信用卡號碼和其他支付方式。</li>
                            <li><strong>訂單資訊</strong>：包括您所下的訂單內容及其詳細資訊。</li>
                            <li><strong>使用數據</strong>：我們可能會收集有關您如何使用我們網站的資訊，如訪問的頁面、訪問時間及其持續時間。</li>
                        </ul>

                        <hr />

                        <h5>2. 資料的使用</h5>
                        <p>我們可能會使用收集到的個人資料，具體包括但不限於：</p>
                        <ul>
                            <li>處理和管理您的訂單。</li>
                            <li>提供客戶支持和回應您的查詢。</li>
                            <li>發送促銷和營銷資訊（如您已同意的話）。</li>
                            <li>進行市場調查以改善我們的服務。</li>
                            <li>確保網站的安全性及其正常運行。</li>
                        </ul>

                        <hr />

                        <h5>3. 資料的保護</h5>
                        <p>我們採取適當的技術和組織措施，以防止您的個人資料遺失、盜竊、濫用或未經授權的訪問。所有敏感資料（如支付資訊）將加密並安全存儲。</p>

                        <hr />

                        <h5>4. 資料的分享</h5>
                        <p>我們不會在未經您的同意下將您的個人資料出售或出租給第三方。我們可能會在以下情況下分享您的資料：</p>
                        <ul>
                            <li>與第三方服務提供者合作，這些服務提供者協助我們提供服務（如支付處理和物流）。</li>
                            <li>符合法律要求或保護我們的權益。</li>
                        </ul>

                        <hr />

                        <h5>5. 您的權利</h5>
                        <p>根據適用法律，您可能擁有以下權利：</p>
                        <ul>
                            <li>查閱您的個人資料。</li>
                            <li>請求更正不正確或不完整的資料。</li>
                            <li>請求刪除您的個人資料。</li>
                            <li>撤回您對我們使用您個人資料的同意（如適用）。</li>
                        </ul>

                        <hr />

                        <h5>6. 隱私權政策的變更</h5>
                        <p>我們可能會不時更新本隱私權政策。當我們做出重大變更時，我們將在網站上發布通知。建議您定期查看本政策，以確保您了解我們如何保護您的資料。</p>

                        <hr />

                        <h5>7. 聯絡我們</h5>
                        <p>如您對本隱私權政策有任何疑問或要求，請聯繫我們：</p>
                        <ul>
                            <li><strong>電子信箱</strong>: <a href="mailto:service@bunnysugar.com" style="color: rgba(143, 134, 129, 1);">service@bunnysugar.com</a></li>
                            <li><strong>電話</strong>: 04 - 2326 - 5860</li>
                        </ul>

                        <p style="text-align: center;">感謝您對 <strong>Bunny Sugar</strong> 的信任！</p>
                    </div>

                </div>
                <div class="modal-footer modalFooter">
                    <button type="button" class="btn1" @click="hideModal">關閉</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

ul {
    list-style-type: disc;
    margin-left: 20px;
}

h5 {
    font-weight: bold;
}


/* header */
.modalHeader {
    color: white;
    font-size: large;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    /* text-align: center; */
    background-color: rgba(166, 127, 120, 0.8);
}

.closeBtn {
    color: rgba(225, 220, 217, 1);
    position: absolute;
    right: 2rem;
    opacity: 0.3;
}


.modalContainer {
    width: 100%;
    display: flex;
    justify-content: center;
}

.modal-content {
    width: 100%;
}

.modalBody {
    padding: 3% 5% 1% 5%;
    /* font-size: small; */
    color: rgba(50, 67, 95, 1);
}



/* button */

.modalFooter {
    padding: 2% 3%;
    display: flex;
    justify-content: center;
}

.btn1 {
    padding: 1% 2%;
    color: rgba(166, 127, 120, 1);
    border: rgba(166, 127, 120, 0.3) solid 1px;
    border-radius: 5px;
    background-color: white;
}
</style>
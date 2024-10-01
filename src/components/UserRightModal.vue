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
                    <div class="modal-title modalTitle" id="exampleModalLabel">使用者條款</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close">
                    </button>
                </div>
                <div class="modal-body modalBody">

                    <div class="terms-of-service">
                        <p style="text-align: center;"><strong>生效日期：</strong>2024年10月1日</p>

                        <p>感謝您選擇 <strong>Bunny Sugar</strong>！在使用我們的服務之前，請仔細閱讀以下使用者條款。這些條款適用於所有訪問我們網站或使用我們服務的用戶。</p>
                        <hr />
                        <h5>1. 同意條款</h5>
                        <p>通過訪問或使用我們的網站和服務，您同意遵守這些條款。如果您不同意這些條款，請勿使用我們的網站或服務。</p>
                        <hr />
                        <h5>2. 服務的描述</h5>
                        <p>Bunny Sugar 提供各種精緻的甜點及相關產品。所有產品均為手工製作，並以高品質的食材製作。</p>
                        <hr />
                        <h5>3. 註冊和帳戶安全</h5>
                        <p>為了使用我們的一些服務，您可能需要註冊帳戶。您同意：</p>
                        <ul>
                            <li>提供準確、完整和最新的資訊。</li>
                            <li>保持您的帳戶密碼的機密性。</li>
                            <li>對您的帳戶下的所有活動負責。</li>
                        </ul>
                        <hr />
                        <h5>4. 訂單和付款</h5>
                        <p>所有訂單必須通過我們的網站進行。您同意支付所有訂單的費用，包括運費和稅金。我們保留隨時拒絕或取消任何訂單的權利。</p>
                        <hr />
                        <h5>5. 退款政策</h5>
                        <p>對於商品的退換，請參考我們的退款政策。若商品有缺陷或錯誤，請在收到商品後 24 小時內聯繫我們。</p>
                        <hr />
                        <h5>6. 知識產權</h5>
                        <p>本網站的內容（包括文字、圖像、標誌等）均為 <strong>Bunny Sugar</strong>
                            的財產，受版權和其他知識產權法律的保護。未經授權，您不得以任何形式複製或使用這些內容。</p>
                            <hr />
                        <h5>7. 免責聲明</h5>
                        <p>我們不對因使用我們的網站或產品而導致的任何直接或間接損失負責。我們將竭誠提供高品質的服務，但不保證服務的無瑕疵或持續可用性。</p>
                        <hr />
                        <h5>8. 條款的修改</h5>
                        <p>我們保留隨時修改這些條款的權利。當我們對條款進行重大修改時，將在網站上發布通知。建議您定期查看這些條款以獲取最新資訊。</p>
                        <hr />
                        <h5>9. 聯絡我們</h5>
                        <p>如您對這些條款有任何疑問，請聯繫我們：</p>
                        <ul>
                            <li><strong>電子信箱</strong>: <a href="mailto:service@bunnysugar.com">service@bunnysugar.com</a></li>
                            <li><strong>電話</strong>: 04 - 2326 - 5860</li>
                        </ul>

                        <p style="text-align: center;">謝謝您選擇 <strong>Bunny Sugar</strong>！我們期待為您提供優質的甜點體驗。</p>
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
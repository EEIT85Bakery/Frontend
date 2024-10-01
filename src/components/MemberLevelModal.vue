<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modalContainer modal-lg">
            <div class="modal-content">
                <div class="modal-header modalHeader">
                    <div class="modal-title modalTitle" id="exampleModalLabel">會員分級說明表</div>
                    <button type="button" class="btn-close closeBtn" @click="hideModal" aria-label="Close"></button>
                </div>
                <div class="modal-body modalBody">
                    <div class="tableContainer">
                        <table>
                            <tr>
                                <th width="80"></th>
                                <th>白兔會員</th>
                                <th>金兔會員</th>
                                <th>白金兔會員</th>
                                <th>鑽石兔會員</th>
                            </tr>
                            <tr>
                                <td><b>資格</b></td>
                                <td>註冊會員即可成為白兔會員</td>
                                <td>一年內累積消費達 3000 元以上</td>
                                <td>一年內累積消費達 6000 元以上</td>
                                <td>一年內累積消費達 9000 元以上</td>
                            </tr>
                            <tr>
                                <td><b>福利</b></td>
                                <td>無</td>
                                <td>消費時可獲取全館折扣乘以 1.2 倍之專屬折扣</td>
                                <td>消費時可獲取全館折扣乘以 1.6 倍之專屬折扣</td>
                                <td>消費時可獲取全館折扣乘以 2 倍之專屬折扣</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="modal-footer modalFooter">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import useModal from '@/hooks/useModal';

const { openModal, hideModal, modalRef } = useModal();

defineExpose({
  openModal,
  hideModal
});
</script>

<style scoped>
.modal{
    /* margin-top: 25%; */
    top: 25%;
}

.modalHeader {
    color: white;
    font-size: large;
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: center;  /* 水平居中 */
    align-items: center;      /* 垂直居中 */
    /* text-align: center; */
    background-color: rgba(166, 127, 120, 0.8);
}

.closeBtn {
    color: rgba(225, 220, 217, 1);
    position: absolute;
    right: 2rem;
    opacity: 0.3;
}


.tableContainer {
    margin: 2%;
}

tr {
    text-align: center;
    
}

th {
    padding: 1%;
    border: white solid 2px;
    color: white;
    background-color: rgba(166, 127, 120, 1);
}

td {
    border: white solid 2px;
    padding: 1%;
    color: rgba(143, 134, 129, 1);
    font-size: small;
    background-color: rgba(166, 127, 120, 0.1);
}

</style>

import Swal from 'sweetalert2'

export const SwalHandle = {
  showErrorMsg: function (title) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    }).fire({
      icon: 'error',
      iconColor: 'rgba(50, 67, 95, 1)',
      title
    })
  },
  showSuccessMsg: function (title) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1200,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      }
    }).fire({
      icon: 'success',
      iconColor: 'rgba(166, 127, 120, 1)',
      title
    })
  },
  confirm: function (title, text, successMessage, callback) {
    Swal.fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      customClass: {
        confirmButton: 'myConfirmBtn',
        cancelButton: 'myCancelBtn',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        if (callback) {
          callback(); // 執行傳遞的回調
        }
        if (successMessage) {
          this.showSuccessMsg(successMessage); // 顯示自定義成功消息
        }
      }
    });
  }
}
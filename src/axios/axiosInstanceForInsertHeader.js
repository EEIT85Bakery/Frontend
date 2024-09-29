import axios from 'axios';
import Swal from 'sweetalert2'; // 引入 SweetAlert2
import router from '@/router'; // 假設你有設置 Vue Router

// 創建 axios 實例
const axiosInstanceForInsertHeader = axios.create({
    baseURL: 'http://localhost:8080/api', // 根據實際情況修改
    headers: {
        'Content-Type': 'application/json', // 設置 Content-Type
    },
});

// 添加請求攔截器
axiosInstanceForInsertHeader.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwt'); // 從 localStorage 獲取 JWT
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 設置 Authorization 標頭
        } else {
            // 如果沒有 JWT，顯示提示並導向登入頁面
            Swal.fire({
                title: '錯誤!',
                text: '您尚未登入，請先登入後再繼續操作。',
                icon: 'error',
                confirmButtonText: '確認',
                timer: 3000,
            }).then(() => {
                // 跳轉到登入頁面
                router.push({ name: '登入頁面' });
            });

            // 直接拋出錯誤，取消請求
            return Promise.reject(new Error('JWT 不存在，請先登入'));
        }
        return config; // 返回配置以繼續請求
    },
    error => {
        return Promise.reject(error); // 返回錯誤以便後續處理
    }
);

export default axiosInstanceForInsertHeader; // 將 axios 實例導出

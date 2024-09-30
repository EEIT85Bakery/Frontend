import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase 配置
const firebaseConfig = {
    apiKey: "AIzaSyCELgf6Hh-Pt7JNxVnXdR3xGOs5yReLWjc",
    authDomain: "single-patrol-190813.firebaseapp.com",
    projectId: "single-patrol-190813",
    storageBucket: "single-patrol-190813.appspot.com",
    messagingSenderId: "973531686099",
    appId: "1:973531686099:web:8cd8d84e7452bbdc446026",
    measurementId: "G-0KYED3G0RE"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google 登入提供者
const provider = new GoogleAuthProvider();

export { auth, provider };

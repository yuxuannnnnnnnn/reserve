import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// 檢查當前環境
const isProduction = window.location.hostname.includes('github.io') || window.location.hostname.includes('您的正式網域');

// 設定正式環境和測試環境的配置
const productionConfig = {
  apiKey: "AIzaSyCp8_-QPKaR6Q6ECK9np3OPqW6dO967wpk",
  authDomain: "reserve-a3e41.firebaseapp.com",
  databaseURL: "https://reserve-a3e41-default-rtdb.firebaseio.com",
  projectId: "reserve-a3e41",
  storageBucket: "reserve-a3e41.firebasestorage.app",
  messagingSenderId: "1:25864343238:web:7d31cb753ae557b49391c7",
  appId: "G-EX5CQE079X"
};

const developmentConfig = {
  apiKey: "AIzaSyAqoYkxNQb5zCmp2VtPNeSAfUXU_ZxJ_l8",
  authDomain: "https://reserve-demo-ae1eb-default-rtdb.firebaseio.com",
  databaseURL: "reserve-demo-ae1eb",
  projectId: "reserve-demo-ae1eb.firebasestorage.app",
  storageBucket: "3910946722",
  messagingSenderId: "1:3910946722:web:80a1bd5021434512ca6cfb",
  appId: "G-PC427R3YWP"
};

// 根據環境選擇配置
const firebaseConfig = isProduction ? productionConfig : developmentConfig;

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("Firebase 初始化於環境:", isProduction ? "正式環境" : "測試環境");

export { app, database, ref, set, get, child, update, onValue };
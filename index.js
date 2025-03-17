// 導入必要的 Firebase 函數
import { database, ref, set, get, child, update, onValue } from "./firebase.js";

document.addEventListener('DOMContentLoaded', function() {
    // 同步狀態顯示函數
    function showSyncStatus(status, message) {
        const syncStatus = document.getElementById('syncStatus');
        syncStatus.textContent = message;
        syncStatus.className = 'sync-status ' + status;
        syncStatus.style.display = 'block';
        
        // 3秒後隱藏提示（除非是同步中狀態）
        if (status !== 'syncing') {
            setTimeout(() => {
                syncStatus.style.opacity = '0';
                setTimeout(() => {
                    syncStatus.style.display = 'none';
                    syncStatus.style.opacity = '1';
                }, 300);
            }, 3000);
        }
    }
    
    const tables = [1, 2, 4, 5, 6, 7, 8, 10];
    let tableStatus = {};
    let reservedList = [];
    let waitingList = [];
    let reservationCounter = 1;
    let waitingCounter = 1;
    let selectedTitleReserved = "先生";
    let selectedTitleWaiting = "先生";
    let dataChanged = false; // 用於追踪數據是否有變化
    let isSyncing = false; // 避免同步衝突

    // Firebase 監聽器設置函數
    function setupFirebaseListeners() {
        // 監聽連接狀態
        const connectedRef = ref(database, '.info/connected');
        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                console.log('已連接到 Firebase');
                showSyncStatus('synced', '已連接到伺服器');
                
                // 如果有未同步的數據，立即同步
                if (dataChanged) {
                    syncToFirebase();
                }
            } else {
                console.log('未連接到 Firebase');
                showSyncStatus('sync-error', '伺服器連接斷開');
            }
        });
        
        // 設置監聽器的方法，包含重試邏輯
        function setupListener(path, callback, errorHandler) {
            let retryCount = 0;
            const MAX_RETRIES = 5;
            
            function attemptListen() {
                const dataRef = ref(database, path);
                onValue(dataRef, callback, (error) => {
                    console.error(`${path} 監聽錯誤:`, error);
                    if (errorHandler) errorHandler(error);
                    
                    // 如果錯誤是暫時性的，嘗試重新監聽
                    if (retryCount < MAX_RETRIES) {
                        retryCount++;
                        const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
                        console.log(`嘗試重新監聽 ${path}，${retryCount}/${MAX_RETRIES}，等待 ${delay}ms`);
                        
                        setTimeout(() => {
                            attemptListen();
                        }, delay);
                    } else {
                        showSyncStatus('sync-error', `監聽 ${path} 失敗，請重新整理頁面`);
                    }
                });
            }
            
            attemptListen();
        }
        
        // 使用改進的監聽器設置方法 - 桌位狀態
        setupListener('tableStatus', (snapshot) => {
            if (!isSyncing) {
                const data = snapshot.val();
                if (data) {
                    // 轉換 Firebase 數據格式（處理 timestamp）
                    tableStatus = {};
                    Object.keys(data).forEach(table => {
                        tableStatus[table] = convertFromFirebase(data[table]);
                    });
                    renderTables();
                    showSyncStatus('synced', '已同步桌位狀態');
                }
            }
        }, (error) => {
            showSyncStatus('sync-error', '同步錯誤：桌位狀態');
        });
        
        // 監聽訂位列表
        setupListener('reservedList', (snapshot) => {
            if (!isSyncing) {
                const data = snapshot.val();
                if (data) {
                    reservedList = [];
                    // 將 Firebase 物件轉換為數組
                    Object.values(data).forEach(item => {
                        reservedList.push(item);
                    });
                    // 更新計數器，找到最大的 ID 並加 1
                    if (reservedList.length > 0) {
                        reservationCounter = Math.max(...reservedList.map(item => item.id)) + 1;
                    }
                    renderReservedList();
                    showSyncStatus('synced', '已同步訂位清單');
                }
            }
        }, (error) => {
            showSyncStatus('sync-error', '同步錯誤：訂位清單');
        });
        
        // 監聽候位列表
        setupListener('waitingList', (snapshot) => {
            if (!isSyncing) {
                const data = snapshot.val();
                if (data) {
                    waitingList = [];
                    // 將 Firebase 物件轉換為數組
                    Object.values(data).forEach(item => {
                        waitingList.push(item);
                    });
                    // 更新計數器，找到最大的 ID 並加 1
                    if (waitingList.length > 0) {
                        waitingCounter = Math.max(...waitingList.map(item => item.id)) + 1;
                    }
                    renderWaitingList();
                    showSyncStatus('synced', '已同步候位清單');
                }
            }
        }, (error) => {
            showSyncStatus('sync-error', '同步錯誤：候位清單');
        });
        
        // 監聽計數器（用於確保 ID 不重複）
        setupListener('counters', (snapshot) => {
            if (!isSyncing) {
                const data = snapshot.val();
                if (data) {
                    if (data.reservation && data.reservation > reservationCounter) {
                        reservationCounter = data.reservation;
                    }
                    if (data.waiting && data.waiting > waitingCounter) {
                        waitingCounter = data.waiting;
                    }
                    showSyncStatus('synced', '已同步計數器');
                }
            }
        }, (error) => {
            showSyncStatus('sync-error', '同步錯誤：計數器');
        });
    }
    
    // 將對象轉換為Firebase可存儲的格式（處理Date對象）
    function convertToFirebase(obj) {
        if (!obj) return obj;
        
        const result = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] instanceof Date) {
                // 將Date轉換為timestamp
                result[key] = {
                    __isDate: true,
                    timestamp: obj[key].getTime()
                };
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = convertToFirebase(obj[key]);
            } else {
                result[key] = obj[key];
            }
        });
        return result;
    }
    
    // 將Firebase數據轉換回原始格式
    function convertFromFirebase(obj) {
        if (!obj) return obj;
        
        const result = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] && obj[key].__isDate && obj[key].timestamp) {
                // 將timestamp轉回Date對象
                result[key] = new Date(obj[key].timestamp);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = convertFromFirebase(obj[key]);
            } else {
                result[key] = obj[key];
            }
        });
        return result;
    }
    
    // 添加防抖變量
    let syncDebounceTimer = null;

    // 修改後的 markDataChanged 函數
    function markDataChanged() {
        dataChanged = true;
        
        // 清除之前的定時器
        if (syncDebounceTimer) {
            clearTimeout(syncDebounceTimer);
        }
        
        // 先進行本地備份
        backupToLocalStorage();
        
        // 設置新的定時器，延遲 500ms 同步數據
        syncDebounceTimer = setTimeout(() => {
            syncToFirebase();
        }, 500);
    }

    // 修改後的 syncToFirebase 函數
    function syncToFirebase() {
        if (isSyncing) return;
        
        isSyncing = true;
        showSyncStatus('syncing', '資料同步中...');
        
        try {
            // 轉換數據格式
            const fbTableStatus = {};
            Object.keys(tableStatus).forEach(table => {
                fbTableStatus[table] = convertToFirebase(tableStatus[table]);
            });
            
            // 創建一個批量更新物件
            const updates = {};
            updates['tableStatus'] = fbTableStatus;
            
            // 儲存訂位清單
            updates['reservedList'] = reservedList.reduce((acc, item, index) => {
                acc[index] = item;
                return acc;
            }, {});
            
            // 儲存候位清單
            updates['waitingList'] = waitingList.reduce((acc, item, index) => {
                acc[index] = item;
                return acc;
            }, {});
            
            // 儲存計數器
            updates['counters'] = {
                reservation: reservationCounter,
                waiting: waitingCounter
            };
            
            // 批量更新 Firebase
            update(ref(database), updates)
                .then(() => {
                    isSyncing = false;
                    dataChanged = false;
                    showSyncStatus('synced', '資料已同步');
                    console.log("同步成功，時間：", new Date().toLocaleTimeString());
                })
                .catch(error => {
                    console.error("Firebase同步錯誤:", error);
                    isSyncing = false;
                    showSyncStatus('sync-error', '同步失敗：' + error.message);
                    
                    // 在同步失敗後，過一段時間自動重試
                    setTimeout(() => {
                        if (dataChanged) {
                            console.log("嘗試重新同步...");
                            syncToFirebase();
                        }
                    }, 3000);
                });
        } catch (e) {
            console.error("同步數據處理錯誤:", e);
            isSyncing = false;
            showSyncStatus('sync-error', '處理數據錯誤：' + e.message);
        }
    }
    
    // 改進客戶端儲存機制，使用 localStorage 作為備份
    function backupToLocalStorage() {
        try {
            localStorage.setItem('tableStatus', JSON.stringify(tableStatus));
            localStorage.setItem('reservedList', JSON.stringify(reservedList));
            localStorage.setItem('waitingList', JSON.stringify(waitingList));
            localStorage.setItem('reservationCounter', reservationCounter);
            localStorage.setItem('waitingCounter', waitingCounter);
            localStorage.setItem('backupTime', new Date().toISOString());
            console.log('已備份到本地儲存');
        } catch (e) {
            console.error('備份到本地儲存失敗:', e);
        }
    }

    function restoreFromLocalStorage() {
        try {
            const backupTime = localStorage.getItem('backupTime');
            if (!backupTime) return false;
            
            // 確認備份不超過24小時
            const backupDate = new Date(backupTime);
            const now = new Date();
            const hoursDiff = (now - backupDate) / (1000 * 60 * 60);
            
            if (hoursDiff > 24) {
                console.log('本地備份過期');
                return false;
            }
            
            // 從 localStorage 恢復數據
            const localTableStatus = JSON.parse(localStorage.getItem('tableStatus') || '{}');
            const localReservedList = JSON.parse(localStorage.getItem('reservedList') || '[]');
            const localWaitingList = JSON.parse(localStorage.getItem('waitingList') || '[]');
            const localReservationCounter = parseInt(localStorage.getItem('reservationCounter') || '1');
            const localWaitingCounter = parseInt(localStorage.getItem('waitingCounter') || '1');
            
            // 應用數據
            tableStatus = localTableStatus;
            reservedList = localReservedList;
            waitingList = localWaitingList;
            reservationCounter = localReservationCounter;
            waitingCounter = localWaitingCounter;
            
            console.log('已從本地備份恢復數據');
            return true;
        } catch (e) {
            console.error('從本地備份恢復失敗:', e);
            return false;
        }
    }

    // Firebase 清除和重置預約資料函數 - 每日 24:00 執行
    function resetReservationData() {
        // 顯示同步狀態
        showSyncStatus('syncing', '正在清除預約資料...');
        
        try {
            // 設置初始桌位狀態 - 只清空而非重置為特定狀態
            const updatedTableStatus = {};
            
            // 更新現有桌位狀態，保留桌號但清空客戶資料
            Object.keys(tableStatus).forEach(table => {
                updatedTableStatus[table] = {
                    status: 'empty',
                    name: '',
                    phone: '',
                    people: 0,
                    time: null,
                    notes: ''
                };
            });
            
            // 創建一個批量更新物件
            const updates = {};
            // 更新桌位狀態為空
            updates['tableStatus'] = updatedTableStatus;
            // 清空訂位清單
            updates['reservedList'] = {};
            // 清空候位清單
            updates['waitingList'] = {};
            // 重置計數器
            updates['counters'] = {
                reservation: 1,
                waiting: 1
            };
            
            // 執行批量更新
            return update(ref(database), updates)
                .then(() => {
                    console.log("預約資料已重置，時間：", new Date().toLocaleTimeString());
                    showSyncStatus('synced', '預約資料已重置');
                    
                    // 重置本地資料
                    tableStatus = updatedTableStatus;
                    reservedList = [];
                    waitingList = [];
                    reservationCounter = 1;
                    waitingCounter = 1;
                    
                    // 更新畫面
                    renderTables();
                    renderReservedList();
                    renderWaitingList();
                    
                    // 記錄最後重置時間
                    localStorage.setItem('lastResetDate', new Date().toDateString());
                    
                    return true;
                })
                .catch(error => {
                    console.error("重置錯誤:", error);
                    showSyncStatus('sync-error', '重置失敗：' + error.message);
                    return false;
                });
        } catch (e) {
            console.error("重置數據處理錯誤:", e);
            showSyncStatus('sync-error', '處理數據錯誤：' + e.message);
            return false;
        }
    }

    // 設置每日 24:00 自動重置
    function setupDailyReset() {
        function scheduleNextReset() {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            
            const timeUntilMidnight = tomorrow - now;
            console.log(`下次預約重置將在 ${new Date(tomorrow).toLocaleString()} 執行，剩餘 ${Math.floor(timeUntilMidnight / 60000)} 分鐘`);
            
            // 設定計時器，在午夜執行重置
            setTimeout(() => {
                console.log("執行每日預約重置...");
                resetReservationData().then(() => {
                    // 重置完成後，安排下一次重置
                    scheduleNextReset();
                });
            }, timeUntilMidnight);
        }
        
        // 立即安排第一次重置
        scheduleNextReset();
        
        // 檢查是否需要執行今日重置
        const lastResetDate = localStorage.getItem('lastResetDate');
        const today = new Date().toDateString();
        
        if (lastResetDate !== today) {
            // 檢查現在是否已經過了午夜
            const now = new Date();
            const midnight = new Date(now);
            midnight.setHours(0, 0, 0, 0);
            
            if (now.getTime() - midnight.getTime() < 60 * 60 * 1000) {
                // 如果在午夜後的一小時內，且今天還沒有重置過，則執行重置
                console.log("頁面載入檢測到今日尚未重置預約，執行重置...");
                resetReservationData();
            }
        }
    }

    // 在頁面載入時設置自動重置
    window.addEventListener('load', function() {
        setupDailyReset();
        
        // 添加一個手動重置按鈕（可選）
        const manualResetBtn = document.getElementById('manualResetBtn');
        if (manualResetBtn) {
            manualResetBtn.addEventListener('click', function() {
                if (confirm('確定要清除所有預約資料嗎？此操作無法復原！')) {
                    resetReservationData();
                }
            });
        }
    });


        // Tab 切換功能
        window.openTab = function(tabName) {
            const tabContents = document.getElementsByClassName("tab-content");
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove("active");
            };

            const tabButtons = document.getElementsByClassName("tab-button");
            for (let i = 0; i < tabButtons.length; i++) {
                tabButtons[i].classList.remove("active");
            }

            document.getElementById(tabName).classList.add("active");
            
            // 找到相應的按鈕並激活它
            const buttons = document.getElementsByClassName("tab-button");
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].getAttribute("onclick").includes(tabName)) {
                    buttons[i].classList.add("active");
                }
            }
        }
        
        function renderTables() {
    const container = document.getElementById("tables");
    container.innerHTML = "";

    tables.forEach(table => {
        const status = tableStatus[table]?.status || "empty";
        const tableDiv = document.createElement("div");
        tableDiv.className = `table ${status}`;
        
        // 主要訂位ID
        if (tableStatus[table]?.reservationId) {
            const reservationId = document.createElement("div");
            reservationId.className = "reservation-id";
            reservationId.textContent = `訂${tableStatus[table].reservationId}`;
            tableDiv.appendChild(reservationId);
        }
        
        // 次要訂位ID
        if (tableStatus[table]?.secondaryReservationId) {
            const secondaryReservationId = document.createElement("div");
            secondaryReservationId.className = "reservation-id-secondary";
            secondaryReservationId.textContent = `訂${tableStatus[table].secondaryReservationId}`;
            tableDiv.appendChild(secondaryReservationId);
        }

        const tableNumber = document.createElement("div");
        tableNumber.textContent = `A${table}`;
        tableDiv.appendChild(tableNumber);

        // 如果是已入座狀態
        if (status === "occupied" && tableStatus[table].startTime) {
            const startTime = tableStatus[table].startTime;
            const endTime = new Date(startTime.getTime() + 90 * 60000);
            const timeInfo = document.createElement("div");
            timeInfo.className = "time-info";
            timeInfo.innerHTML = 
                `<div style="color: #005435;">${formatTime(startTime)} 入座<br>
                <div style="color: #FFFFFF;">${formatTime(endTime)} 結束`
            ;
            tableDiv.appendChild(timeInfo);
        }

        // 如果是訂位狀態，顯示當前活動的預訂信息
        if (status === "reserved" && tableStatus[table]?.reservedTime) {
            const timeInfo = document.createElement("div");
            timeInfo.className = "time-info";
            
            const reservedTime = tableStatus[table].reservedTime;
            const beforeTime = getTimeBeforeReservation(reservedTime);
            const afterTime = getTimeAfterReservation(reservedTime);
            
            timeInfo.innerHTML = 
                `<div class="before-time">${beforeTime} 前可接</div>
                <div>${reservedTime}</div>
                <div class="after-time">${afterTime} 後可接</div>`
            ;
            tableDiv.appendChild(timeInfo);
        }

        // 單擊事件處理邏輯
        tableDiv.onclick = () => toggleTable(table);

        // 長按事件處理邏輯（僅限 occupied 狀態）
        if (status === "occupied") {
            let pressTimer;

            // 開始長按（移動端和桌面端共用邏輯）
            const startPress = () => {
                pressTimer = setTimeout(() => {
                    // 長按事件處理邏輯
                    changeTime(table);
                }, 500); // 長按時間設定為 500 毫秒
            };

            // 結束長按（移動端和桌面端共用邏輯）
            const endPress = () => {
                clearTimeout(pressTimer);
            };

            // 移動端事件綁定
            tableDiv.addEventListener('touchstart', startPress);
            tableDiv.addEventListener('touchend', endPress);
            tableDiv.addEventListener('touchmove', endPress); // 如果用戶移動手指，取消長按

            // 桌面端事件綁定
            tableDiv.addEventListener('mousedown', startPress);
            tableDiv.addEventListener('mouseup', endPress);
            tableDiv.addEventListener('mouseleave', endPress); // 如果鼠標移出元素，取消長按
        }

        container.appendChild(tableDiv);
    });
}

// 長按事件處理函數
function changeTime(table) {
    // 創建自定義彈出框
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    const popup = document.createElement("div");
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
    popup.style.width = "90%"; // 設置彈出框寬度
    popup.style.maxWidth = "280px"; // 設置最大寬度，避免在大屏幕上過寬

    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "numeric"; // 強制彈出數字鍵盤
    input.placeholder = "輸入 4 位數字（11:30=1130）";
    input.style.width = "100%"; // 輸入框寬度為彈出框的 100%
    input.style.padding = "10px";
    input.style.fontSize = "16px";
    input.style.marginBottom = "10px";
    input.style.boxSizing = "border-box"; // 確保 padding 和 border 不影響總寬度
   // 設置 placeholder 顏色
input.style.setProperty("--placeholder-color", "#999999"); // 定義 CSS 變量
input.style.setProperty("--placeholder-opacity", "1"); // 定義透明度
input.addEventListener("input", () => {
    input.style.setProperty("--placeholder-color", input.value ? "transparent" : "#999999");
});

// 動態設置 placeholder 顏色
const style = document.createElement("style");
style.textContent = `
    input::placeholder {
        color: var(--placeholder-color, #999999);
        opacity: var(--placeholder-opacity, 1);
    }
`;
document.head.appendChild(style);

    const button = document.createElement("button");
    button.textContent = "確認";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    button.style.backgroundColor = "#000000";
    button.style.color = "#fff";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";

    // 確認按鈕點擊事件
    button.onclick = () => {
        const newTime = input.value;

        // 檢查輸入是否為 4 位數字
        if (newTime && /^\d{4}$/.test(newTime)) {
            const hours = parseInt(newTime.slice(0, 2), 10);
            const minutes = parseInt(newTime.slice(2, 4), 10);

            // 檢查小時和分鐘是否有效
            if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60) {
                const newStartTime = new Date();
                newStartTime.setHours(hours, minutes, 0, 0);

                // 更新 tableStatus 中的時間
                tableStatus[table].startTime = newStartTime;

                // 重新渲染表格
                renderTables();
            } else {
                alert("輸入時間無效！請輸入有效的 4 位數字（例如 0930 表示 09:30）。");
            }
        } else {
            alert("輸入格式錯誤！請輸入 4 位數字（例如 0930 表示 09:30）。");
        }

        // 關閉彈出框
        document.body.removeChild(overlay);
    };

    // 點擊空白處關閉彈出框
    overlay.onclick = (e) => {
        if (e.target === overlay) { // 確保點擊的是 overlay 而不是 popup
            document.body.removeChild(overlay);
        }
    };

    // 將元素添加到彈出框中
    popup.appendChild(input);
    popup.appendChild(button);
    overlay.appendChild(popup);

    // 將彈出框添加到頁面中
    document.body.appendChild(overlay);

}
  

        function toggleTable(table) {
            const tableState = tableStatus[table];
            
            // If empty table, set to occupied
            if (!tableState || tableState.status === "empty") {
                tableStatus[table] = { 
                    status: "occupied", 
                    startTime: new Date() 
                };
                markDataChanged();
                renderTables();
                return;
            }
            
            // If table has a reservation and no secondary reservation, do nothing
            if (tableState?.status === "reserved" && !tableState?.secondaryReservationId) {
                return;
            }
            
            // If table has both primary and secondary reservations, swap them
            if (tableState?.status === "reserved" && tableState?.secondaryReservationId) {
                const tempId = tableState.reservationId;
                const tempTime = tableState.reservedTime;
                
                tableStatus[table].reservationId = tableState.secondaryReservationId;
                tableStatus[table].reservedTime = tableState.secondaryReservedTime;
                
                tableStatus[table].secondaryReservationId = tempId;
                tableStatus[table].secondaryReservedTime = tempTime;
                
                markDataChanged();
                renderTables();
                return;
            }
            
            // If table is occupied and has a secondary reservation
            if (tableState?.status === "occupied" && tableState?.secondaryReservationId) {
                tableStatus[table] = { 
                    status: "finished", 
                    secondaryReservationId: tableState.secondaryReservationId,
                    secondaryReservedTime: tableState.secondaryReservedTime
                };
                markDataChanged();
                renderTables();
                return;
            }
            
            // If table is in "finished" state and has a secondary reservation
            if (tableState?.status === "finished" && tableState?.secondaryReservationId) {
                tableStatus[table] = { 
                    status: "reserved", 
                    reservationId: tableState.secondaryReservationId,
                    reservedTime: tableState.secondaryReservedTime,
                    secondaryReservationId: null,
                    secondaryReservedTime: null
                };
                markDataChanged();
                renderTables();
                return;
            }
            
            // Standard state transitions for tables without secondary reservations
            if (tableState.status === "occupied") {
                tableStatus[table] = { status: "finished" };
            } else if (tableState.status === "finished") {
                tableStatus[table] = { status: "empty" };
            }
            
            markDataChanged();
            renderTables();
            renderReservedList();
            renderWaitingList();
        }

        function formatTime(date) {
            return date.toLocaleTimeString("zh-TW", { 
                hour: "2-digit", 
                minute: "2-digit", 
                hour12: false 
            });
        }

        function getTimeBeforeReservation(time) {
            const [hours, minutes] = time.split(':').map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes - 90);
            return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        }

        function getTimeAfterReservation(time) {
            const [hours, minutes] = time.split(':').map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes + 90);
            return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        }

        // 檢查兩個預訂時間是否可以共存
        function canDoubleBook(time1, time2) {
            const [hours1, minutes1] = time1.split(':').map(Number);
            const [hours2, minutes2] = time2.split(':').map(Number);
            
            // 計算兩個時間點之間的分鐘差
            const time1Minutes = hours1 * 60 + minutes1;
            const time2Minutes = hours2 * 60 + minutes2;
            
            // 計算時間差的絕對值
            const timeDiff = Math.abs(time1Minutes - time2Minutes);
            
            // 如果時間差大於等於90分鐘，則允許雙重預訂
            return timeDiff >= 90;
        }

        window.selectTitleReserved = function(title) {
            selectedTitleReserved = title;
            document.getElementById("mrButtonReserved").classList.toggle("active", title === "先生");
            document.getElementById("msButtonReserved").classList.toggle("active", title === "小姐");
        };

        window.selectTitleWaiting = function(title) {
            selectedTitleWaiting = title;
            document.getElementById("mrButtonWaiting").classList.toggle("active", title === "先生");
            document.getElementById("msButtonWaiting").classList.toggle("active", title === "小姐");
        };

        window.addToReservedList = function() {
            const count = document.getElementById("reservedCount").value;
            const name = document.getElementById("reservedName").value;
            const phone = document.getElementById("reservedPhone").value;
            const reservedTime = document.getElementById("reservedTime").value;
            
            if (!count || !name || !phone || !reservedTime) return;
            
            const reservation = {
                id: reservationCounter++,
                count,
                name,
                title: selectedTitleReserved,
                phone,
                reservedTime,
                assignedTable: null
            };
            
            reservedList.push(reservation);
            markDataChanged();
            clearReservedInputs();
            renderReservedList();
        };

        window.addToWaitingList = function() {
            const count = document.getElementById("waitingCount").value;
            const name = document.getElementById("waitingName").value;
            const phone = document.getElementById("waitingPhone").value;
            
            if (!count || !name || !phone) return;
            
            const waiting = {
                id: waitingCounter++,
                count,
                name,
                title: selectedTitleWaiting,
                phone,
                assignedTable: null
            };
            
            waitingList.push(waiting);
            markDataChanged();
            clearWaitingInputs();
            renderWaitingList();
        };

        // 修改渲染預訂列表的函數，增加桌子按鈕禁用邏輯
function renderReservedList() {
    const list = document.getElementById("reservedList");
    list.innerHTML = "";
    
    reservedList.forEach((guest, index) => {
        // 創建父容器
        const container = document.createElement("div");
        container.className = "waitlist-container";
        
        const li = document.createElement("li");
        li.className = "waitlist-item";
       li.innerHTML = `
    <span class="guest-info">
        <span class="guest-id-corner">訂${guest.id}</span>
        <span class="guest-details">${guest.count}位 - ${guest.name} ${guest.title}  - ${guest.phone} - 訂位時間 ${guest.reservedTime}</span>
    </span>
`;
        
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        if (!guest.assignedTable) {
            tables.forEach(table => {
                const button = document.createElement("button");
                button.className = "table-button";
                button.textContent = `A${table}`;
                
                // 檢查該桌是否有衝突的預訂時間
                const isConflict = checkTimeConflict(table, guest.reservedTime);
                
                if (isConflict) {
                    // 如果時間衝突，禁用按鈕
                    button.disabled = true;
                    button.style.backgroundColor = "#cccccc";
                    button.style.cursor = "not-allowed";
                    button.title = "此桌已有時間相近的預訂";
                } else {
                    button.onclick = () => assignTable(guest.id, table, guest.reservedTime, index);
                }
                
                buttonContainer.appendChild(button);
            });
        } else {
            const confirmButton = document.createElement("button");
            confirmButton.className = "confirm-button";
            confirmButton.textContent = `確認入座 A${guest.assignedTable}`;
            confirmButton.onclick = () => confirmSeating(guest.assignedTable, index);
            buttonContainer.appendChild(confirmButton);
        }

        const cancelButton = document.createElement("button");
        cancelButton.className = "cancel-button";
        cancelButton.textContent = "取消訂位";
        cancelButton.onclick = () => cancelReservedOrder(index);
        buttonContainer.appendChild(cancelButton);

        li.appendChild(buttonContainer);
        container.appendChild(li); // 將 li 放入父級容器中
        list.appendChild(container);
    });
}

        function renderWaitingList() {
    const list = document.getElementById("waitingList");
    list.innerHTML = "";

    waitingList.forEach((guest, index) => {
        const container = document.createElement("div");
        container.className = "waitlist-container";

        const li = document.createElement("li");
        li.className = "waitlist-item";
        li.innerHTML = `
    <span class="guest-info waiting-guest-info">
        <span class="guest-id-corner">候${guest.id}</span>
        <span class="guest-details">
            ${guest.count}位 - ${guest.name} ${guest.title} - ${guest.phone}-
            ${guest.assignedTable ? `<span class="assigned-table">A${guest.assignedTable}</span>` : ''}
        </span>
    </span>
`;

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        if (!guest.assignedTable) {
            tables.forEach(table => {
                const button = document.createElement("button");
                button.className = "table-button";
                button.textContent = `A${table}`;

                button.onclick = () => assignWaitingTable(table, index);
                buttonContainer.appendChild(button);
            });

        } else {
            
            const confirmButton = document.createElement("button");
            confirmButton.className = "confirm-button";
            confirmButton.textContent = `確認入座 A${guest.assignedTable}`;
            confirmButton.onclick = () => confirmWaitingSeating(guest.assignedTable, index);
            buttonContainer.appendChild(confirmButton);
        }

        const cancelButton = document.createElement("button");
        cancelButton.className = "cancel-button";
        cancelButton.textContent = "取消候位";
        cancelButton.onclick = () => cancelWaitingOrder(index);
        buttonContainer.appendChild(cancelButton);

        li.appendChild(buttonContainer);
        container.appendChild(li);
        list.appendChild(container);
    });
}
// 新增函數：檢查是否存在時間衝突
function checkTimeConflict(table, newReservationTime) {
    const tableState = tableStatus[table];
    
    // 如果桌子是空的，沒有衝突
    if (!tableState || tableState.status !== "reserved") {
        return false;
    }
    
    // 如果已經有次要預訂，一律視為衝突（不允許第三個預訂）
    if (tableState.secondaryReservationId) {
        return true;
    }
    
    // 檢查與主要預訂的時間差
    const canDouble = canDoubleBook(tableState.reservedTime, newReservationTime);
    
    // 如果不能雙重預訂，表示有衝突
    return !canDouble;
}

        // 檢查桌子是否可以分配給新的預訂
        function checkTableAvailability(table, newReservationTime) {
            // 如果桌子是空的，可以預訂
            if (!tableStatus[table]) return false;
            
            // 如果桌子已經有一個預訂
            if (tableStatus[table].status === "reserved") {
                // 如果已經有次要預訂，不可再預訂
                if (tableStatus[table].secondaryReservationId) return true;
                
                // 檢查與現有預訂的時間間隔是否允許雙重預訂
                return !canDoubleBook(tableStatus[table].reservedTime, newReservationTime);
            }
            
            return false;
        }

        function assignTable(reservationId, table, reservedTime, index) {
    const tableState = tableStatus[table];
    
    // If table is occupied, keep that status but add reservation info
    if (tableState && tableState.status === "occupied") {
        // Preserve the occupied status and startTime
        tableStatus[table] = {
            ...tableState,  // Keep all existing properties (including startTime)
            secondaryReservationId: reservationId,
            secondaryReservedTime: reservedTime
        };
    }
    // If table is empty or non-reserved status
    else if (!tableState || tableState.status !== "reserved") {
        tableStatus[table] = {
            status: "reserved",
            reservationId: reservationId,
            reservedTime: reservedTime
        };
    } 
    // If table already has one reservation but no secondary reservation
    else if (!tableState.secondaryReservationId) {
        // Check if times allow double booking
        if (canDoubleBook(tableState.reservedTime, reservedTime)) {
            tableStatus[table].secondaryReservationId = reservationId;
            tableStatus[table].secondaryReservedTime = reservedTime;
        }
    }
    
    reservedList[index].assignedTable = table;
    markDataChanged();
    renderTables();
    renderReservedList();
}
        function confirmSeating(table, index) {
    console.log("confirmSeating 被调用:", { table, index });
    
    // 检查参数有效性
    if (table === undefined || table === null) {
        console.error("错误: 桌号为空");
        alert("错误: 无法确认入座，桌号不存在");
        return;
    }
    
    if (index === undefined || index < 0 || index >= reservedList.length) {
        console.error("错误: 无效的订位索引", index, "列表长度:", reservedList.length);
        alert("错误: 无法确认入座，订位记录不存在");
        return;
    }
    
    // 获取订位信息
    const reservation = reservedList[index];
    console.log("订位信息:", reservation);
    
    // 检查订位信息有效性
    if (!reservation) {
        console.error("错误: 订位信息不存在");
        alert("错误: 无法获取订位信息");
        return;
    }
    
    // 检查 table 是否在 tableStatus 中存在
    if (!tableStatus[table]) {
        console.log("桌子状态不存在，创建新状态");
        tableStatus[table] = {
            status: "occupied",
            startTime: new Date()
        };
    } else {
        console.log("当前桌子状态:", tableStatus[table]);
        
        // 安全地访问 reservationId
        const currentReservationId = tableStatus[table].reservationId;
        const secondaryReservationId = tableStatus[table].secondaryReservationId;
        
        console.log("比较ID:", {
            currentReservationId,
            secondaryReservationId,
            reservationId: reservation.id
        });
        
        // 如果是主要预订被入座
        if (currentReservationId === reservation.id) {
            console.log("确认主要预订入座");
            // 保存次要预订信息（如果存在）
            const newStatus = {
                status: "occupied",
                startTime: new Date()
            };
            
            // 如果存在次要预订，保留它
            if (secondaryReservationId) {
                newStatus.secondaryReservationId = secondaryReservationId;
                newStatus.secondaryReservedTime = tableStatus[table].secondaryReservedTime;
            }
            
            tableStatus[table] = newStatus;
        } 
        // 如果是次要预订被入座
        else if (secondaryReservationId === reservation.id) {
            console.log("尝试确认次要预订入座 - 需要先切换");
            alert("請先切換為此預訂，再確認入座");
            return;
        }
        // 如果桌子状态与预订不匹配
        else {
            console.log("预订ID与桌子不匹配，强制设置入座状态");
            tableStatus[table] = {
                status: "occupied",
                startTime: new Date()
            };
        }
    }
    
    try {
        // 从列表中移除已入座的预订
        console.log("移除预订，索引:", index);
        reservedList.splice(index, 1);
        
        // 确保数据标记为已更改并同步
        console.log("标记数据已更改");
        markDataChanged();
        
        console.log("重新渲染界面");
        renderTables();
        renderReservedList();
        
        console.log("入座操作完成");
    } catch (error) {
        console.error("处理预订时发生错误:", error);
        alert("处理预订时发生错误: " + error.message);
    }
}
    
    

    function confirmWaitingSeating(table, index) {
            tableStatus[table] = {
                status: "occupied",
                startTime: new Date()
            };
            waitingList.splice(index, 1);
            markDataChanged(); // 標記數據已變化
            renderTables();
            renderWaitingList();
        }

function cancelReservedOrder(index) {
    const canceledReservation = reservedList[index];
    const table = canceledReservation.assignedTable;
    
    if (table) {
        const tableState = tableStatus[table];
        
        // 如果是主要訂位取消
        if (tableState.reservationId === canceledReservation.id) {
            // 如果有次要訂位，將其提升為主要訂位
            if (tableState.secondaryReservationId) {
                tableStatus[table] = {
                    status: "reserved",
                    reservationId: tableState.secondaryReservationId,
                    reservedTime: tableState.secondaryReservedTime
                };
            } else {
                // 如果沒有次要訂位，清空桌子
                delete tableStatus[table];
            }
        } 
        // 如果是次要訂位取消
        else if (tableState.secondaryReservationId === canceledReservation.id) {
            // 清除次要訂位
            delete tableState.secondaryReservationId;
            delete tableState.secondaryReservedTime;
        }
    }
    
    // 從訂位列表中移除該筆訂位
    reservedList.splice(index, 1);
    markDataChanged();
    renderTables();
    renderReservedList();
}

       function assignWaitingTable(table, index) {
    // 檢查桌子是否可用
    

    // 設置候位記錄的 assignedTable
    waitingList[index].assignedTable = table;

    // 標記數據已變化並重新渲染
    markDataChanged();
    renderTables();
    renderWaitingList();
}
        function changeTableTime(table) {
    // 獲取當前時間並格式化為 HHMM（去掉冒號）
    const currentTime = formatTime(tableStatus[table].startTime).replace(":", "");

    // 提示用戶輸入新的時間（4 位數字，例如 0930）
    const newTimeInput = prompt("請輸入新的入座時間 (例如 1130 = 11:30):", currentTime);
    if (!newTimeInput) return;

    // 檢查輸入是否為 4 位數字
    if (!/^\d{4}$/.test(newTimeInput)) {
        alert("請輸入 4 位數字，例如 0930 代表 09:30。");
        return;
    }

    // 解析輸入的時間
    const hours = parseInt(newTimeInput.slice(0, 2), 10);
    const minutes = parseInt(newTimeInput.slice(2), 10);

    // 檢查時間是否有效
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        alert("無效的時間，請輸入 4 位數字，例如 1130 代表 11:30。");
        return;
    }

    // 更新桌位的 startTime
    const newStartTime = new Date();
    newStartTime.setHours(hours);
    newStartTime.setMinutes(minutes);

    tableStatus[table].startTime = newStartTime;

    // 更新資料並重新渲染
    markDataChanged();
    renderTables();
}

        function cancelWaitingOrder(index) {
    // 從 waitingList 中移除該候位
    waitingList.splice(index, 1);

    // 標記數據已更改
    markDataChanged();

    // 重新渲染候位列表
    renderWaitingList();
}

        function clearReservedInputs() {
            document.getElementById("reservedCount").value = "";
            document.getElementById("reservedName").value = "";
            document.getElementById("reservedPhone").value = "";
            document.getElementById("reservedTime").value = "11:00";
        }

        function clearWaitingInputs() {
            document.getElementById("waitingCount").value = "";
            document.getElementById("waitingName").value = "";
            document.getElementById("waitingPhone").value = "";
        }

         // 初始化頁面
        window.onload = function() {
            document.getElementById("mrButtonReserved").classList.add("active");
            document.getElementById("mrButtonWaiting").classList.add("active");

            setupFirebaseListeners();
            renderTables();
            renderReservedList();
            renderWaitingList();

            dataChanged = false;
        };

        });
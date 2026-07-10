/* ==========================================================
   KnowledgeHub
   category.js
   功能：分类切换独立对话 + 消息自适应气泡
========================================================== */

/* ---------- DOM ---------- */
const backHome = document.getElementById("backHome");
const chatHistory = document.getElementById("chatHistory");
const questionInput = document.getElementById("questionInput");
const sendQuestion = document.getElementById("sendQuestion");
const summaryBtn = document.getElementById("summaryBtn");
const summaryBox = document.getElementById("summaryBox");

/* ---------- 模拟知识库数据 ---------- */
const knowledgeData = {
    "Transformer": {
        summary: "Transformer 是 Google 于2017年提出的神经网络模型，目前 GPT、DeepSeek、Qwen 等模型均基于该架构。",
        answer: "Transformer 使用 Self-Attention 替代传统 RNN，因此能够并行计算，并更好地学习长距离依赖关系。"
    },
    "Python": {
        summary: "Python 是一种解释型语言，拥有丰富的第三方库，非常适合 AI 开发。",
        answer: "Python 是目前人工智能领域使用最广泛的开发语言。"
    },
    "AI Agent": {
        summary: "AI Agent 可以自主规划任务、调用工具并完成复杂目标。",
        answer: "AI Agent 不只是聊天，还能够调用工具完成复杂任务。"
    },
    "RAG": {
        summary: "RAG 是检索增强生成技术。",
        answer: "RAG 会先查询知识库，再生成回答，因此更加准确。"
    },
    "LLM": {
        summary: "LLM 即 Large Language Model。",
        answer: "LLM 可以完成问答、总结、翻译、代码生成等任务。"
    }
};

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
    bindEvent();
    bindKnowledge();
    renderCategories();
    loadCurrentCategoryChat();
});

/* ---------- 注册事件【判空防止报错】 ---------- */
function bindEvent() {
    if (backHome) backHome.addEventListener("click", goHome);
    if (sendQuestion) sendQuestion.addEventListener("click", sendMessage);
    if (summaryBtn) summaryBtn.addEventListener("click", generateSummary);
    if (questionInput) {
        questionInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

/* ---------- 返回首页 ---------- */
function goHome() {
    window.location.href = "/";
}

function bindKnowledge() {
    const items = document.querySelectorAll(".knowledge-item");
    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(i => i.style.borderColor = "#edf1f7");
            item.style.borderColor = "#2962ff";
            loadKnowledge(item.querySelector("h4").innerText);
        });
    });
}

function loadKnowledge(title) {
    if (!chatHistory) return;
    const data = knowledgeData[title];
    if (!data) return;
    chatHistory.innerHTML = `<div class="ai-message">
<h3>${title}</h3>
<br>
${data.answer}
</div>`;
    if (summaryBox) summaryBox.innerHTML = data.summary;
}

/* ==============================================
                聊天持久化模块
============================================== */
function getAllChatData() {
    const raw = localStorage.getItem("category_chat_data");
    return raw ? JSON.parse(raw) : {};
}
function saveAllChatData(obj) {
    localStorage.setItem("category_chat_data", JSON.stringify(obj));
}

// 根据选中分类加载对话
function loadCurrentCategoryChat() {
    if (!chatHistory) return;
    const activeId = getActiveId();
    const chatData = getAllChatData();
    if (!activeId || !chatData[activeId] || chatData[activeId].length === 0) {
        chatHistory.innerHTML = `<div class="ai-message">💡 欢迎来到 知识库。<br>请选择左侧分类，或直接向 AI 提问。</div>`;
        return;
    }
    let html = "";
    chatData[activeId].forEach(msg => {
        if(msg.type === "user"){
            html += `<div class="user-message">${msg.content}</div>`;
        }else{
            html += `<div class="ai-message">${msg.content}</div>`;
        }
    });
    chatHistory.innerHTML = html;
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 发送消息
async function sendMessage() {

    if (!questionInput || !chatHistory) return;


    const question = questionInput.value.trim();


    if (question === "") {

        alert("请输入问题");
        return;

    }


    // 用户消息显示

    chatHistory.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;


    questionInput.value = "";


    chatHistory.scrollTop =
        chatHistory.scrollHeight;



    try {


        const response = await fetch(
            "/api/chat",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    question: question

                })

            }
        );


        const data = await response.json();



        const answer = data.answer;



        chatHistory.innerHTML += `
            <div class="ai-message">
                ${answer}
            </div>
        `;



        chatHistory.scrollTop =
            chatHistory.scrollHeight;



    } catch(error) {


        console.error(error);


        chatHistory.innerHTML += `
            <div class="ai-message">
                AI连接失败
            </div>
        `;


    }

}

function generateSummary() {
    if (!summaryBox) return;
    summaryBox.innerHTML = `
<h4>📄 AI Summary</h4>
<br>
当前页面属于第一阶段演示版本。
<br><br>
第二阶段将：
<ul>
<li>连接 DeepSeek API</li>
<li>连接 MySQL</li>
<li>自动总结聊天内容</li>
<li>生成关键词</li>
<li>推荐阅读</li>
</ul>
`;
}

// ==============================================
// 分类管理模块
// ==============================================
const DEFAULT_CATEGORIES = [
    { id: 1, name: "默认分类" }
];
let pendingNewCategoryId = null;

function getCategories() {
    let data = localStorage.getItem("knowledge_categories");
    if (!data) return DEFAULT_CATEGORIES;
    return JSON.parse(data);
}
function saveCategories(list) {
    localStorage.setItem("knowledge_categories", JSON.stringify(list));
}
function getActiveId() {
    return localStorage.getItem("active_category_id") || null;
}
function setActiveId(id) {
    localStorage.setItem("active_category_id", id);
}

// 渲染分类列表
function renderCategories() {
    const listEl = document.getElementById("categoryList");
    if (!listEl) return;
    const categories = getCategories();
    const activeId = getActiveId();
    listEl.innerHTML = "";

    categories.forEach(item => {
        const div = document.createElement("div");
        div.className = "category-item " + (activeId == item.id ? "active" : "");
        div.dataset.id = item.id;

        const textSpan = document.createElement("span");
        textSpan.innerText = item.name;

        const delBtn = document.createElement("button");
        delBtn.className = "category-delete-btn";
        delBtn.innerText = "删除";

        delBtn.onclick = (e) => {
            e.stopPropagation();
            showConfirmModal(`确定要删除分类【${item.name}】吗？`, () => {
                let list = getCategories();
                list = list.filter(c => c.id !== item.id);
                saveCategories(list);
                const chatData = getAllChatData();
                delete chatData[item.id];
                saveAllChatData(chatData);

                if (getActiveId() == item.id) {
                    localStorage.removeItem("active_category_id");
                    if(chatHistory) chatHistory.innerHTML = `<div class="ai-message">请选择分类开始对话</div>`;
                }
                renderCategories();
            });
        };

        div.appendChild(textSpan);
        div.appendChild(delBtn);

        // 点击切换分类 + 加载对话
        div.onclick = (e) => {
            if (e.target.tagName === "INPUT" || e.target.classList.contains("category-delete-btn")) return;
            setActiveId(item.id);
            renderCategories();
            loadCurrentCategoryChat();
        };

        textSpan.ondblclick = (e) => {
            e.stopPropagation();
            startEdit(div, item);
        };
        listEl.appendChild(div);

        if (pendingNewCategoryId === item.id) {
            setTimeout(() => {
                startEdit(div, item);
                pendingNewCategoryId = null;
            }, 20);
        }
    });
}

// 原地重命名
function startEdit(domEl, categoryItem) {
    const oldName = categoryItem.name;
    domEl.innerHTML = "";
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldName;
    input.style.width = "100%";
    input.style.border = "none";
    input.style.background = "transparent";
    input.style.borderRadius = "4px";
    input.style.padding = "2px 4px";

    domEl.appendChild(input);
    input.focus();

    function saveNewName() {
        let newName = input.value.trim();
        if (newName === "") newName = oldName;
        const list = getCategories();
        const target = list.find(x => x.id === categoryItem.id);
        if (target) target.name = newName;
        saveCategories(list);
        renderCategories();
    }
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") saveNewName();
    });
    input.addEventListener("blur", saveNewName);
}

// 弹窗组件
function showConfirmModal(message, onConfirm) {
    if (document.getElementById("confirmModal")) return;
    const modal = document.createElement("div");
    modal.id = "confirmModal";
    modal.className = "confirm-modal";
    modal.innerHTML = `
        <div class="confirm-modal-box">
            <p class="confirm-modal-text">${message}</p >
            <div class="confirm-modal-actions">
                <button class="confirm-modal-cancel">取消</button>
                <button class="confirm-modal-ok">确定删除</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".confirm-modal-cancel").onclick = () => modal.remove();
    modal.querySelector(".confirm-modal-ok").onclick = () => {
        onConfirm();
        modal.remove();
    };
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// 全局 添加分类
window.triggerAddCategory = function () {
    const list = getCategories();
    const newId = Date.now();
    list.push({
        id: newId,
        name: "未命名分类"
    });
    saveCategories(list);
    pendingNewCategoryId = newId;
    renderCategories();
}
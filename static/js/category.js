/* ==========================================================
   KnowledgeHub
   category.js
   第一阶段演示版
========================================================== */

// ===================== 获取元素 =====================

const backHome = document.getElementById("backHome");
const chatHistory = document.getElementById("chatHistory");
const questionInput = document.getElementById("questionInput");
const sendQuestion = document.getElementById("sendQuestion");
const summaryBtn = document.getElementById("summaryBtn");
const summaryBox = document.getElementById("summaryBox");


// ===================== 返回首页 =====================

backHome.addEventListener("click", () => {

    window.location.href = "/";

});


// ===================== 模拟知识库 =====================

const knowledgeData = {

    "Transformer":{

        summary:"Transformer 是 Google 于2017年提出的神经网络模型，目前 GPT、DeepSeek、Qwen 等模型均基于该架构。",

        answer:"Transformer 使用 Self-Attention 替代传统 RNN，因此能够并行计算，并更好地学习长距离依赖关系。"

    },

    "Python":{

        summary:"Python 是一种解释型语言，拥有丰富的第三方库，非常适合 AI 开发。",

        answer:"Python 由于语法简单、生态完善，因此成为人工智能领域最常用的语言。"

    },

    "AI Agent":{

        summary:"AI Agent 可以自主规划任务、调用工具并完成复杂目标。",

        answer:"AI Agent 不只是聊天，它还能自动执行任务、搜索信息、调用 API。"

    },

    "RAG":{

        summary:"RAG（Retrieval-Augmented Generation）是一种结合知识库检索的大模型技术。",

        answer:"RAG 不需要重新训练模型，而是在回答问题前先查询知识库。"

    },

    "LLM":{

        summary:"LLM（Large Language Model）即大语言模型。",

        answer:"LLM 能够完成问答、总结、翻译、代码生成等任务。"

    }

};


// ===================== 点击左侧知识 =====================

const knowledgeItems=document.querySelectorAll(".knowledge-item");

knowledgeItems.forEach(item=>{

    item.addEventListener("click",()=>{

        knowledgeItems.forEach(i=>i.style.borderColor="#edf1f7");

        item.style.borderColor="#2962ff";

        const title=item.querySelector("h4").innerText;

        const data=knowledgeData[title];

        if(!data)return;

        chatHistory.innerHTML=`

<div class="ai-message">

<h3>${title}</h3>

<br>

${data.answer}

</div>

`;

        summaryBox.innerHTML=data.summary;

    });

});


// ===================== AI聊天 =====================

sendQuestion.addEventListener("click",sendMessage);


questionInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"&&!e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});


function sendMessage(){

    const question=questionInput.value.trim();

    if(question===""){

        alert("请输入问题");

        return;

    }

    chatHistory.innerHTML+=`

<div class="user-message">

${question}

</div>

`;

    questionInput.value="";

    chatHistory.scrollTop=chatHistory.scrollHeight;

    setTimeout(()=>{

        const answer=simulateAnswer(question);

        chatHistory.innerHTML+=`

<div class="ai-message">

${answer}

</div>

`;

        chatHistory.scrollTop=chatHistory.scrollHeight;

    },600);

}


// ===================== 模拟AI回答 =====================

function simulateAnswer(question){

    const q=question.toLowerCase();

    if(q.includes("transformer")){

        return knowledgeData["Transformer"].answer;

    }

    if(q.includes("python")){

        return knowledgeData["Python"].answer;

    }

    if(q.includes("agent")){

        return knowledgeData["AI Agent"].answer;

    }

    if(q.includes("rag")){

        return knowledgeData["RAG"].answer;

    }

    if(q.includes("llm")){

        return knowledgeData["LLM"].answer;

    }

    return "这是第一阶段演示版本。\n\n第二阶段这里将调用 Flask 后端，再由 DeepSeek API 返回真实答案。";

}


// ===================== AI总结 =====================

summaryBtn.addEventListener("click",()=>{

    summaryBox.innerHTML=`

<h4>📄 AI Summary</h4>

<br>

当前页面属于第一阶段演示版本。

<br><br>

第二阶段将：

<ul>

<li>连接 DeepSeek API</li>

<li>自动总结聊天内容</li>

<li>提取关键词</li>

<li>生成推荐阅读</li>

</ul>

`;

});


// ===================== 页面初始化 =====================

window.onload=()=>{

    console.log("KnowledgeHub 启动成功");

};
/* ==========================================================
   KnowledgeHub
   category.js
   第一阶段演示版
========================================================== */

/* ---------- DOM ---------- */

const backHome=document.getElementById("backHome");

const chatHistory=document.getElementById("chatHistory");

const questionInput=document.getElementById("questionInput");

const sendQuestion=document.getElementById("sendQuestion");

const summaryBtn=document.getElementById("summaryBtn");

const summaryBox=document.getElementById("summaryBox");

/* ---------- 模拟数据库 ---------- */

const knowledgeData={

    "Transformer":{

        summary:"Transformer 是 Google 于2017年提出的神经网络模型，目前 GPT、DeepSeek、Qwen 等模型均基于该架构。",

        answer:"Transformer 使用 Self-Attention 替代传统 RNN，因此能够并行计算，并更好地学习长距离依赖关系。"

    },

    "Python":{

        summary:"Python 是一种解释型语言，拥有丰富的第三方库，非常适合 AI 开发。",

        answer:"Python 是目前人工智能领域使用最广泛的开发语言。"

    },

    "AI Agent":{

        summary:"AI Agent 可以自主规划任务、调用工具并完成复杂目标。",

        answer:"AI Agent 不只是聊天，还能够调用工具完成复杂任务。"

    },

    "RAG":{

        summary:"RAG 是检索增强生成技术。",

        answer:"RAG 会先查询知识库，再生成回答，因此更加准确。"

    },

    "LLM":{

        summary:"LLM 即 Large Language Model。",

        answer:"LLM 可以完成问答、总结、翻译、代码生成等任务。"

    }

};

/* ---------- 初始化 ---------- */

document.addEventListener("DOMContentLoaded",()=>{

    bindEvent();

    bindKnowledge();

});

/* ---------- 注册事件 ---------- */

function bindEvent(){

    backHome.addEventListener("click",goHome);

    sendQuestion.addEventListener("click",sendMessage);

    summaryBtn.addEventListener("click",generateSummary);

    questionInput.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"&&!e.shiftKey){

            e.preventDefault();

            sendMessage();

        }

    });

}

/* ---------- 返回首页 ---------- */

function goHome(){

    window.location.href="/";

}

/* ---------- 左侧知识 ---------- */

function bindKnowledge(){

    const items=document.querySelectorAll(".knowledge-item");

    items.forEach(item=>{

        item.addEventListener("click",()=>{

            items.forEach(i=>{

                i.style.borderColor="#edf1f7";

            });

            item.style.borderColor="#2962ff";

            loadKnowledge(

                item.querySelector("h4").innerText

            );

        });

    });

}

/* ---------- 加载知识 ---------- */

function loadKnowledge(title){

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

}

/* ---------- 发送消息 ---------- */

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

/* ---------- 模拟AI ---------- */

function simulateAnswer(question){

    const q=question.toLowerCase();

    if(q.includes("transformer"))

        return knowledgeData["Transformer"].answer;

    if(q.includes("python"))

        return knowledgeData["Python"].answer;

    if(q.includes("agent"))

        return knowledgeData["AI Agent"].answer;

    if(q.includes("rag"))

        return knowledgeData["RAG"].answer;

    if(q.includes("llm"))

        return knowledgeData["LLM"].answer;

    return "这是第一阶段演示版本。\n\n第二阶段这里将调用 Flask 后端，再由 DeepSeek API 返回真实答案。";

}

/* ---------- AI总结 ---------- */

function generateSummary(){

    summaryBox.innerHTML=`

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
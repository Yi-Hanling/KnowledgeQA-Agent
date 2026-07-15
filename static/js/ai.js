/*
KnowledgeHub
ai.js

功能：
1. AI聊天
2. 调用Flask API
3. Markdown解析
4. 加载聊天历史
5. 左侧历史记录
*/

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const sendButton =
            document.getElementById(
                "sendQuestion"
            );

        const questionInput =
            document.getElementById(
                "questionInput"
            );

        const chatHistory =
            document.getElementById(
                "chatHistory"
            );

        const historyList =
            document.getElementById(
                "historyList"
            );

        if(
            !sendButton ||
            !questionInput ||
            !chatHistory
        ){
            return;
        }

        // 页面加载
        loadHistory();

        // 分类切换
        window.addEventListener(
            "categoryChanged",
            function(){

                loadHistory();

            }
        );

        // 点击发送
        sendButton.onclick =
            sendMessage;

        // Enter发送
        questionInput.addEventListener(
            "keydown",
            function(e){

                if(
                    e.key === "Enter"
                    &&
                    !e.shiftKey
                ){

                    e.preventDefault();

                    sendMessage();

                }

            }
        );



        // ===================================
        // 加载聊天记录
        // ===================================

        async function loadHistory(){

            try{

                chatHistory.innerHTML = "";

                if(historyList){

                    historyList.innerHTML = "";

                }

                const categoryId =
                    localStorage.getItem(
                        "active_category_id"
                    );

                const response =
                    await fetch(

                        "/api/chat/history?category_id="
                        +
                        categoryId

                    );

                const data =
                    await response.json();

                // 没有聊天记录
                if(data.length === 0){

                    const categoryName =
                        document.querySelector(
                            ".category-item.active .category-name"
                        )?.innerText
                        ||
                        "当前分类";

                    chatHistory.innerHTML = `

                    <div class="ai-message">

                        👋 欢迎来到
                        <strong>

                        ${categoryName}

                        </strong>

                        <br><br>

                        当前分类暂无聊天记录。

                    </div>

                    `;

                    if(historyList){

                        historyList.innerHTML = `

                        <div class="history-empty">

                            当前暂无历史记录

                        </div>

                        `;

                    }

                    return;

                }

                let userIndex = 0;

                data.forEach(

                    message=>{

                        let content =
                            message.content;

                        if(
                            message.role
                            ===
                            "assistant"
                        ){

                            if(
                                typeof marked
                                !==
                                "undefined"
                            ){

                                content =
                                    marked.parse(
                                        content
                                    );

                            }

                        }

                        const className =
                            message.role === "user"
                            ?
                            "user-message"
                            :
                            "ai-message";

                        let messageId = "";

                        if(
                            message.role
                            ===
                            "user"
                        ){

                            messageId =
                                `id="chat-${userIndex}"`;

                        }

                        chatHistory.innerHTML += `

                        <div
                            class="${className}"
                            ${messageId}
                        >

                            ${content}

                        </div>

                        `;

                        // 左侧历史记录
                        if(
                            message.role === "user"
                            &&
                            historyList
                        ){

                            const title =
                                message.content.length
                                >
                                25
                                ?
                                message.content.slice(
                                    0,
                                    25
                                )
                                +
                                "..."
                                :
                                message.content;

                            historyList.innerHTML += `

                            <div
                                class="history-item"
                                data-id="chat-${userIndex}"
                            >

                                ${title}

                            </div>

                            `;

                            userIndex++;

                        }

                    }

                );

                // 绑定点击事件
                if(historyList){

                    document
                    .querySelectorAll(
                        ".history-item"
                    )
                    .forEach(

                        item=>{

                            item.onclick =
                                function(){

                                    document
                                    .getElementById(
                                        this.dataset.id
                                    )
                                    ?.scrollIntoView({

                                        behavior:"smooth",

                                        block:"start"

                                    });

                                };

                        }

                    );

                }

                chatHistory.scrollTop =
                    chatHistory.scrollHeight;

            }

            catch(error){

                console.error(

                    "加载聊天历史失败",

                    error

                );

            }

        }
        // ===================================
        // 发送消息
        // ===================================

        async function sendMessage(){

            const question =
                questionInput.value.trim();

            if(!question){

                return;

            }

            // 清空输入框
            questionInput.value = "";

            // 立即显示用户消息
            chatHistory.innerHTML += `

            <div class="user-message">

                ${question}

            </div>

            `;

            // AI思考中
            const loading =
                document.createElement(
                    "div"
                );

            loading.className =
                "ai-message";

            loading.innerHTML =
                "🤖 AI正在思考，请稍候...";

            chatHistory.appendChild(
                loading
            );

            chatHistory.scrollTop =
                chatHistory.scrollHeight;

            try{

                const categoryId =
                    localStorage.getItem(
                        "active_category_id"
                    );

                const response =
                    await fetch(

                        "/api/chat",

                        {

                            method:"POST",

                            headers:{

                                "Content-Type":
                                "application/json"

                            },

                            body:JSON.stringify({

                                question:question,

                                category_id:
                                categoryId

                            })

                        }

                    );

                if(!response.ok){

                    throw new Error(
                        "请求失败"
                    );

                }

                await response.json();

                loading.remove();

                // 重新读取数据库聊天记录
                await loadHistory();

            }

            catch(error){

                loading.remove();

                chatHistory.innerHTML += `

                <div class="ai-message">

                    AI连接失败，请稍后重试。

                </div>

                `;

                console.error(
                    error
                );

            }

        }

    }

);
/*
KnowledgeHub
ai.js

功能：
1. AI聊天
2. 调用Flask API
3. Markdown解析
4. 加载聊天历史
*/


document.addEventListener(
    "DOMContentLoaded",
    function(){


        const sendButton =
            document.getElementById("sendQuestion");


        const questionInput =
            document.getElementById("questionInput");


        const chatHistory =
            document.getElementById("chatHistory");



        if(!sendButton || !questionInput || !chatHistory){
            return;
        }



       // 页面打开加载历史聊天
        loadHistory();

// 分类切换后重新加载聊天
   window.addEventListener(
    "categoryChanged",
    function(){


        loadHistory();

    }
);
// 点击发送
sendButton.onclick = sendMessage;


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



        // 加载聊天记录
        async function loadHistory(){

            try{

                chatHistory.innerHTML = "";

            const categoryId =
    localStorage.getItem(
        "active_category_id"
    );
const response =
    await fetch(
        "/api/chat/history?category_id=" +
        categoryId
    );

const data =
    await response.json();
if(data.length === 0){

    const categoryName =
    document.querySelector(
        ".category-item.active .category-name"
    )?.innerText || "当前分类";

chatHistory.innerHTML = `

<div class="ai-message">

    👋 欢迎来到 <strong>${categoryName}</strong>。

    <br><br>

    当前分类暂无聊天记录。

</div>

`;

    return;

}

                data.forEach(
                    message=>{


                        let content =
                            message.content;



                        // AI消息Markdown解析
                        if(
                            message.role === "assistant"
                        ){

                            content =
                                marked.parse(content);

                        }



                        const className =
                            message.role === "user"
                            ?
                            "user-message"
                            :
                            "ai-message";



                        chatHistory.innerHTML += `

                        <div class="${className}">

                            ${content}

                        </div>

                        `;


                    }
                );



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




        async function sendMessage(){


            const question =
                questionInput.value.trim();



            if(!question){

                return;

            }

// 立即显示用户消息
chatHistory.innerHTML += `

<div class="user-message">

    ${question}

</div>

`;

            questionInput.value = "";



            // AI等待

            const loading =
                document.createElement("div");


            loading.className =
                "ai-message";


            loading.innerHTML =
                "AI正在思考...";


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

                category_id:categoryId

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


                await loadHistory();


            }


            catch(error){


                loading.remove();



                chatHistory.innerHTML += `

                <div class="ai-message">

                    AI连接失败

                </div>

                `;


                console.error(
                    error
                );


            }


        }


    }
);

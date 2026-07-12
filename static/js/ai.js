/*
KnowledgeHub
ai.js

功能：
1. AI聊天
2. 调用Flask API
3. Markdown解析
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




        async function sendMessage(){


            const question =
                questionInput.value.trim();



            if(!question){

                return;

            }



            // 显示用户问题

            chatHistory.innerHTML += `

            <div class="user-message">

                ${question}

            </div>

            `;



            questionInput.value="";



            // AI等待

            const loading = document.createElement("div");

            loading.className="ai-message";

            loading.innerHTML="AI正在思考...";

            chatHistory.appendChild(loading);



            chatHistory.scrollTop =
                chatHistory.scrollHeight;




            try{


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

                                question:question

                            })

                        }
                    );



                const data =
                    await response.json();



                // 删除等待

                loading.remove();



                const answer =
                    data.answer;



                // Markdown解析

                const htmlAnswer =
                    marked.parse(answer);




                chatHistory.innerHTML += `

                <div class="ai-message">

                    ${htmlAnswer}

                </div>

                `;



                chatHistory.scrollTop =
                    chatHistory.scrollHeight;


            }



            catch(error){


                loading.remove();



                chatHistory.innerHTML += `

                <div class="ai-message">

                    AI连接失败

                </div>

                `;


                console.error(error);


            }


        }


    }
);
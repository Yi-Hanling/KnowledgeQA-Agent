document.addEventListener(
    "DOMContentLoaded",
    function(){


        const sendButton =
            document.getElementById("sendQuestion");


        const questionInput =
            document.getElementById("questionInput");


        const chatHistory =
            document.getElementById("chatHistory");



        sendButton.onclick = async function(){


            let question =
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



            questionInput.value = "";



            // 等待提示

            chatHistory.innerHTML += `

                <div class="ai-message">

                    AI正在思考...

                </div>

            `;



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



                // 删除等待提示

                chatHistory.lastElementChild.remove();



                // 显示AI回答

                chatHistory.innerHTML += `

                    <div class="ai-message">

                        ${data.answer}

                    </div>

                `;



                // 自动滚动到底部

                chatHistory.scrollTop =
                    chatHistory.scrollHeight;



            }
            catch(error){


                chatHistory.innerHTML += `

                    <div class="ai-message">

                        AI连接失败

                    </div>

                `;


                console.log(error);


            }


        };


    }
);
/*
KnowledgeHub
summary.js

功能：
1. 点击生成总结按钮
2. 获取当前聊天内容
3. 请求 Flask /api/summary
4. 显示 AI 总结
*/


document.addEventListener(
    "DOMContentLoaded",
    function(){


        const summaryBtn =
            document.getElementById(
                "summaryBtn"
            );


        const summaryBox =
            document.getElementById(
                "summaryBox"
            );



        // 页面没有总结区域直接退出

        if(!summaryBtn || !summaryBox){

            return;

        }



        summaryBtn.onclick = async function(){


            // 提示生成中

            summaryBox.innerHTML = `

            <p>
            🤖 AI正在生成总结，请稍候...
            </p>

            `;



            /*
                获取聊天内容

                注意：
                这里先读取页面聊天区域

                后续可以改成读取 ai.js 保存的历史记录
            */

            const chatHistory =
                document.getElementById(
                    "chatHistory"
                );



            let content = "";



            if(chatHistory){


                content =
                    chatHistory.innerText;


            }



            if(!content.trim()){


                summaryBox.innerHTML = `

                <p>
                当前没有聊天内容，无法生成总结。
                </p>

                `;


                return;

            }




            try{


                const response =
                    await fetch(
                        "/api/summary",
                        {

                            method:"POST",


                            headers:{

                                "Content-Type":
                                "application/json"

                            },


                            body:JSON.stringify({

                                content:content

                            })

                        }
                    );




                const data =
                    await response.json();




                if(data.summary){


                    // Markdown解析

                    if(typeof marked !== "undefined"){


                        summaryBox.innerHTML =
                            marked.parse(
                                data.summary
                            );


                    }
                    else{


                        summaryBox.innerText =
                            data.summary;


                    }


                }
                else{


                    summaryBox.innerHTML = `

                    <p>
                    总结生成失败。
                    </p>

                    `;

                }



            }
            catch(error){


                console.error(
                    error
                );


                summaryBox.innerHTML = `

                <p>
                AI总结请求失败。
                </p>

                `;


            }



        };


    }
);
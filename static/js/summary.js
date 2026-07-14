/*
KnowledgeHub
summary.js

功能：
1. 点击生成总结按钮
2. 获取当前聊天内容
3. 请求 Flask /api/summary
4. 保存 AI 总结
5. 刷新页面恢复总结
*/


console.log("summary.js启动");


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

console.log("summaryBox:", summaryBox);

        if(!summaryBox){

            return;

        }





        // =========================
        // 分类切换重新读取总结
        // =========================


        window.addEventListener(
            "categoryChanged",
            function(){

                console.log(
                    "分类改变，重新加载总结"
                );

                loadSummary();

            }
        );





        // =========================
        // 页面加载读取总结
        // =========================


        loadSummary();






        // =========================
        // 获取数据库中的总结
        // =========================


        async function loadSummary(){


            const categoryId =
                localStorage.getItem(
                    "active_category_id"
                );



            console.log(
                "当前分类ID:",
                categoryId
            );



            if(!categoryId){


                summaryBox.innerHTML = `

                <p>
                请选择分类查看总结。
                </p>

                `;


                return;

            }



            try{


                const response =
                    await fetch(
                        "/api/summary?category_id="
                        +
                        categoryId
                    );



                const data =
                    await response.json();



                console.log(
    "数据库返回总结:",
    JSON.stringify(data)
);




                if(data.summary){



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
                    当前分类暂无总结。
                    </p>

                    `;


                }



            }
            catch(error){


                console.error(
                    "加载总结失败",
                    error
                );


            }


        }









        // =========================
        // 点击生成总结
        // =========================


        if(summaryBtn){


            summaryBtn.onclick = async function(){



                summaryBox.innerHTML = `

                <p>
                🤖 AI正在生成总结，请稍候...
                </p>

                `;




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






                const categoryId =
                    localStorage.getItem(
                        "active_category_id"
                    );





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


                                    content:content,


                                    category_id:categoryId


                                })


                            }
                        );






                    const data =
                        await response.json();





                    console.log(
                        "生成总结返回:",
                        data
                    );



                    console.log(
                        "summaryBox:",
                        summaryBox
                    );






                    if(data.summary){



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



    }
);
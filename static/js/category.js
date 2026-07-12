/*
KnowledgeHub
category.js

功能：
1. 分类管理
2. 页面交互
3. 左侧知识库
4. 分类切换
*/


// =========================
// 页面初始化
// =========================

document.addEventListener(
    "DOMContentLoaded",
    function(){

        renderCategories();

        bindKnowledge();

    }
);



// =========================
// DOM
// =========================

const summaryBox =
    document.getElementById("summaryBox");


const chatHistory =
    document.getElementById("chatHistory");


const backHome =
    document.getElementById("backHome");



if(backHome){

    backHome.onclick=function(){

        window.location.href="/";

    }

}





// =========================
// 分类数据
// =========================


function getCategories(){

    const data =
        localStorage.getItem(
            "knowledge_categories"
        );


    return data
        ?
        JSON.parse(data)
        :
        [];

}



function saveCategories(list){

    localStorage.setItem(
        "knowledge_categories",
        JSON.stringify(list)
    );

}



// =========================
// 当前分类
// =========================


function getActiveId(){

    return localStorage.getItem(
        "active_category_id"
    );

}



function setActiveId(id){

    localStorage.setItem(
        "active_category_id",
        id
    );

}





// =========================
// 渲染分类
// =========================


function renderCategories(){


    const list =
        document.getElementById(
            "categoryList"
        );


    if(!list){

        return;

    }



    list.innerHTML="";



    const categories =
        getCategories();



    const activeId =
        getActiveId();




    categories.forEach(item=>{


        const div =
            document.createElement(
                "div"
            );



        div.className =
            "category-item";



        if(activeId == item.id){

            div.classList.add(
                "active"
            );

        }





        // 分类结构

        div.innerHTML = `


        <span class="category-name">

            ${item.name}

        </span>



        <div class="category-actions">


            <button
            class="category-edit-btn">

                重命名

            </button>



            <button
            class="category-delete-btn">

                删除

            </button>


        </div>


        `;




        // =====================
        // 点击分类
        // =====================


        div.onclick=function(){


            setActiveId(
                item.id
            );


            renderCategories();


            loadCategoryChat(
                item.name
            );


        };





        // =====================
        // 删除
        // =====================


        const deleteBtn =
            div.querySelector(
                ".category-delete-btn"
            );


        deleteBtn.onclick=function(e){


            e.stopPropagation();



            let list =
                getCategories();



            list =
                list.filter(
                    c=>c.id!==item.id
                );



            saveCategories(
                list
            );



            renderCategories();



            if(chatHistory){

                chatHistory.innerHTML = `


                <div class="ai-message">


                请选择分类开始学习。


                </div>


                `;

            }


        };







        // =====================
        // 重命名
        // =====================


        const editBtn =
            div.querySelector(
                ".category-edit-btn"
            );



        const nameSpan =
            div.querySelector(
                ".category-name"
            );



        editBtn.onclick=function(e){


            e.stopPropagation();



            editCategory(
                item.id,
                nameSpan
            );


        };





        list.appendChild(div);


    });



}





// =========================
// 修改分类名字
// =========================


function editCategory(
    id,
    element
){


    const oldName =
        element.innerText;



    const newName =
        prompt(
            "请输入新的分类名称:",
            oldName
        );



    if(!newName || !newName.trim()){

        return;

    }




    let list =
        getCategories();



    let target =
        list.find(
            c=>c.id===id
        );



    if(target){


        target.name =
            newName.trim();

    }




    saveCategories(
        list
    );



    renderCategories();



}





// =========================
// 添加分类
// =========================


window.triggerAddCategory=function(){



    const name =
        prompt(
            "请输入分类名称:"
        );



    if(!name || !name.trim()){

        return;

    }



    let list =
        getCategories();



    list.push({

        id:Date.now(),

        name:name.trim()

    });



    saveCategories(
        list
    );



    renderCategories();



};





// =========================
// 分类聊天区域
// =========================


function loadCategoryChat(name){


    if(!chatHistory){

        return;

    }



    chatHistory.innerHTML = `


    <div class="ai-message">


    👋 欢迎进入


    <strong>

    ${name}

    </strong>


    知识库。


    <br><br>


    你可以直接向 AI 提问。


    </div>


    `;


}







// =========================
// 知识卡片
// =========================


function bindKnowledge(){



    const items =
        document.querySelectorAll(
            ".knowledge-item"
        );



    items.forEach(item=>{


        item.onclick=function(){


            const title =
                item.innerText;



            if(summaryBox){


                summaryBox.innerHTML = `


                <h4>

                ${title}

                </h4>


                <br>


                当前知识内容摘要。


                `;


            }


        };


    });


}
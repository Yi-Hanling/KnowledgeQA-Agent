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
        bindInputModal();
        bindConfirmModal();
        // 全局点击空白关闭下拉菜单
        document.addEventListener("click", ()=>{
            document.querySelectorAll(".category-dropdown-menu").forEach(menu=>{
                menu.classList.remove("show");
            })
        })
    }
);

// =========================
// DOM
// =========================
const backHome = document.getElementById("backHome");
if(backHome){
    backHome.onclick=function(){
        window.location.href="/";
    }
}

// =========================
// 分类数据
// =========================
function getCategories(){
    const data = localStorage.getItem("knowledge_categories");
    return data ? JSON.parse(data) : [];
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
    return localStorage.getItem("active_category_id");
}
function setActiveId(id){
    localStorage.setItem("active_category_id", id);
}

// =========================
// 渲染分类
// =========================
function renderCategories(){
    const list = document.getElementById("categoryList");
    if(!list){
        return;
    }
    list.innerHTML="";

    const categories = getCategories();
    const activeId = getActiveId();

    categories.forEach(item=>{
        const div = document.createElement("div");
        div.className = "category-item";
        if(activeId == item.id){
            div.classList.add("active");
        }

        const spanName = document.createElement("span");
        spanName.className = "category-name";
        spanName.innerText = item.name;

        // 三点按钮
        const moreBtn = document.createElement("button");
        moreBtn.className = "category-more-btn";
        moreBtn.innerText = "···";

        // 下拉菜单
        const dropdown = document.createElement("div");
        dropdown.className = "category-dropdown-menu";
        dropdown.innerHTML = `
            <div class="category-menu-item rename">重命名</div>
            <div class="category-menu-item delete">删除</div>
        `;

        // 点击三点开关下拉
        moreBtn.onclick = (e)=>{
            e.stopPropagation();
            // 关闭其他所有下拉
            document.querySelectorAll(".category-dropdown-menu").forEach(menu=>{
                if(menu !== dropdown) menu.classList.remove("show");
            })
            dropdown.classList.toggle("show");
        }

        // 重命名
        dropdown.querySelector(".rename").onclick = (e)=>{
            e.stopPropagation();
            dropdown.classList.remove("show");
            editCategory(item.id, spanName);
        }

        // 删除
        dropdown.querySelector(".delete").onclick = async (e)=>{
            e.stopPropagation();
            dropdown.classList.remove("show");
            const ok = await showConfirmModal("确定要删除该分类吗？");
            if (!ok) return;

            let listData = getCategories();
            listData = listData.filter(c=>c.id!==item.id);
            saveCategories(listData);
            if(getActiveId()==item.id){
                localStorage.removeItem("active_category_id");
            }
            renderCategories();
            window.dispatchEvent(
                new Event("categoryChanged")
            );
        }

        div.appendChild(spanName);
        div.appendChild(moreBtn);
        div.appendChild(dropdown);

        // 点击条目切换分类（排除按钮/下拉区域）
        div.onclick=function(e){
            if(e.target.classList.contains("category-more-btn") || e.target.closest(".category-dropdown-menu")){
                return;
            }
            setActiveId(item.id);
            renderCategories();
            window.dispatchEvent(
                new Event("categoryChanged")
            );
        };

        list.appendChild(div);
    });
}

// =========================
// 修改分类名字
// =========================
async function editCategory(id, element){
    const oldName = element.innerText;
    const newName = await showInputModal("请输入新的分类名称:", oldName);

    if(!newName){
        return;
    }

    let list = getCategories();
    let target = list.find(c=>c.id===id);
    if(target){
        target.name = newName.trim();
    }
    saveCategories(list);
    renderCategories();
}

// =========================
// 添加分类
// =========================
window.triggerAddCategory = async function(){
    const name = await showInputModal("请输入分类名称:");
    if(!name){
        return;
    }

    let list = getCategories();
    list.push({
        id:Date.now(),
        name:name.trim()
    });
    saveCategories(list);
    renderCategories();
};

function bindKnowledge(){
    const items = document.querySelectorAll(".knowledge-item");
    items.forEach(item=>{
        item.onclick=function(){
            console.log("当前选择知识:", item.innerText);
        };
    });
}

// =========================
// 【弹窗1】输入弹窗（新增/重命名）
// =========================
let modalResolve = null;
function showInputModal(tip, defaultValue = ""){
    return new Promise((resolve)=>{
        modalResolve = resolve;
        const modal = document.getElementById("inputModal");
        const tipEl = document.getElementById("modalTip");
        const input = document.getElementById("modalInput");

        tipEl.innerText = tip;
        input.value = defaultValue;
        modal.style.display = "flex";
        input.focus();
    });
}
function bindInputModal(){
    const modal = document.getElementById("inputModal");
    const cancelBtn = document.getElementById("modalCancel");
    const okBtn = document.getElementById("modalOk");
    const input = document.getElementById("modalInput");

    function closeModal(){
        modal.style.display = "none";
    }

    cancelBtn.onclick = function(){
        closeModal();
        if(modalResolve) modalResolve(null);
    };

    okBtn.onclick = function(){
        closeModal();
        if(modalResolve) modalResolve(input.value.trim());
    };

    input.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            okBtn.click();
        }
    });

    modal.onclick = function(e){
        if(e.target === modal){
            cancelBtn.click();
        }
    };
}

// =========================
// 【弹窗2】确认弹窗（删除二次确认）
// =========================
let confirmResolve = null;
function showConfirmModal(tipText){
    return new Promise((resolve)=>{
        confirmResolve = resolve;
        const modal = document.getElementById("confirmModal");
        const tipDom = document.getElementById("confirmTip");
        tipDom.innerText = tipText;
        modal.style.display = "flex";
    });
}
function bindConfirmModal(){
    const modal = document.getElementById("confirmModal");
    const cancelBtn = document.getElementById("confirmCancel");
    const okBtn = document.getElementById("confirmOk");

    function closeConfirmModal(){
        modal.style.display = "none";
    }

    cancelBtn.onclick = function(){
        closeConfirmModal();
        if(confirmResolve) confirmResolve(false);
    };
    okBtn.onclick = function(){
        closeConfirmModal();
        if(confirmResolve) confirmResolve(true);
    };
    // 点击遮罩关闭
    modal.onclick = function(e){
        if(e.target === modal){
            cancelBtn.click();
        }
    }
}
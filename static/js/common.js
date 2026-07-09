/* ==========================================================
   KnowledgeHub
   common.js
   全站公共JS
========================================================== */

/* ---------- 页面加载 ---------- */

document.addEventListener("DOMContentLoaded", () => {

    console.log("KnowledgeHub 已启动");

});

/* ---------- 返回顶部 ---------- */

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ---------- Toast ---------- */

function showMessage(message){

    alert(message);

}

/* ---------- Ajax占位 ---------- */

async function request(url,options={}){

    try{

        const response=await fetch(url,options);

        return await response.json();

    }

    catch(error){

        console.error(error);

    }

}
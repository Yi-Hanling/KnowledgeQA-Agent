/*
==========================
首页
==========================
*/

document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.querySelector(".hero .btn");

    if(startButton){

        startButton.addEventListener("click", () => {

            window.location.href="/category";

        });

    }

});
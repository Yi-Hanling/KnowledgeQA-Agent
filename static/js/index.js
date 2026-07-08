/* ==========================================================
   KnowledgeHub 首页 JavaScript
   仅保留规范要求首页函数：goToCategory()
   已移除所有搜索框相关逻辑
========================================================== */

/**
 * 规范首页函数：点击分类卡片跳转
 */
function goToCategory(category) {
    window.location.href = "/category/" + category;
}

/**
 * 页面加载完成绑定卡片hover动画
 */
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".category-card");
    cards.forEach(function (card) {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });
        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0px) scale(1)";
        });
    });

    // 推荐按钮点击弹窗
    const buttons = document.querySelectorAll(".recommend-card button");
    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            alert("第一阶段演示：后续将进入文章详情页面。");
        });
    });
});

/**
 * 页面载入淡入动画
 */
window.addEventListener("load", function () {
    document.body.style.opacity = "1";
});

/**
 * 导航栏滚动阴影效果
 */
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 30) {
        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.08)";
    } else {
        navbar.style.boxShadow = "";
    }
});
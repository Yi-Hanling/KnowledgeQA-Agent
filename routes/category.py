from flask import Blueprint, render_template

category_bp = Blueprint(
    "category",
    __name__
)


@category_bp.route("/category")
def category():

    categories = [
        {
            "id": 1,
            "name": "人工智能"
        },
        {
            "id": 2,
            "name": "计算机"
        },
        {
            "id": 3,
            "name": "数学"
        }
    ]

    article = {
        "id": 1,
        "title": "欢迎使用 KnowledgeHub",
        "category": "人工智能",
        "cover_image": "",
        "content": """
        这里是第一阶段模拟知识内容。
        第二阶段将由数据库读取。
        """
    }

    return render_template(

        "pages/category.html",

        categories=categories,

        article=article,

        summary="",

        keywords=[],

        recommend_articles=[],

        reading_history=[]

    )
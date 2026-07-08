from flask import Flask, render_template

app = Flask(__name__)


# 首页
@app.route("/")
def index():
    return render_template("index.html")


# 分类页面
@app.route("/category/<category>")
def category(category):

    # 英文分类 -> 中文
    category_map = {
        "science": "科学",
        "technology": "科技",
        "humanity": "人文",
        "society": "社会",
        "health": "健康"
    }

    category_name = category_map.get(category, "未知")

    # 第一阶段模拟数据
    knowledge_list = [
        {
            "title": "Transformer 是什么？",
            "description": "Transformer 是一种基于注意力机制的深度学习模型。"
        },
        {
            "title": "Python 为什么解释执行？",
            "description": "Python 是解释型语言，代码由解释器逐行执行。"
        },
        {
            "title": "AI Agent 是什么？",
            "description": "AI Agent 是能够自主完成任务的智能体。"
        },
        {
            "title": "RAG 与微调有什么区别？",
            "description": "RAG 利用外部知识库，微调则修改模型参数。"
        },
        {
            "title": "大语言模型如何训练？",
            "description": "通过海量文本进行预训练，再进行指令微调。"
        }
    ]

    return render_template(
        "category.html",
        category_name=category_name,
        knowledge_list=knowledge_list
    )


if __name__ == "__main__":
    app.run(debug=True)
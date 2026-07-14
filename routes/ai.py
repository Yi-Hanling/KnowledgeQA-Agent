from flask import Blueprint, request, jsonify

from service.ai_service import ask_ai

from database.db import db

from models.chat_history import ChatHistory


ai_bp = Blueprint(
    "ai",
    __name__
)


# AI聊天
@ai_bp.route(
    "/api/chat",
    methods=["POST"]
)
def chat():

    data = request.get_json()

    question = data.get("question")

    category_id = data.get("category_id")

    if not question:
        return jsonify({
            "error": "问题不能为空"
        }), 400


    # 调用AI
    answer = ask_ai(question)


    # 保存用户消息
    db.session.add(
        ChatHistory(
            role="user",
            content=question,
            category_id=category_id
        )
    )


    # 保存AI消息
    db.session.add(
        ChatHistory(
            role="assistant",
            content=answer,
            category_id=category_id
        )
    )


    db.session.commit()


    return jsonify({

        "question": question,

        "answer": answer

    })



# 获取聊天历史
@ai_bp.route(
    "/api/chat/history",
    methods=["GET"]
)
def chat_history():
    category_id = request.args.get("category_id")
    if category_id:

        histories = ChatHistory.query.filter_by(
            category_id=category_id
        ).order_by(
            ChatHistory.created_at.asc()
        ).all()

    else:

        histories = []


    result = []

    for item in histories:

        result.append({

            "role": item.role,

            "content": item.content

        })


    return jsonify(result)
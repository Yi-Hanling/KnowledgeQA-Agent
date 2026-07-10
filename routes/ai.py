from flask import Blueprint, request, jsonify

from service.ai_service import ask_ai


ai_bp = Blueprint(
    "ai",
    __name__
)


@ai_bp.route(
    "/api/chat",
    methods=["POST"]
)
def chat():

    data = request.get_json()

    question = data.get("question")


    if not question:

        return jsonify({
            "error": "问题不能为空"
        }), 400


    answer = ask_ai(question)


    return jsonify({

        "question": question,

        "answer": answer

    })
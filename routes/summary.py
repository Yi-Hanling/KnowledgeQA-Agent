from flask import Blueprint, jsonify, request

from service.ai_service import generate_summary


summary_bp = Blueprint(
    "summary",
    __name__,
    url_prefix="/api"
)



@summary_bp.route(
    "/summary",
    methods=["POST"]
)
def summary():


    data = request.json


    content = data.get(
        "content",
        ""
    )

    print("总结收到内容:")
    print(content)

    result = generate_summary(
        content
    )


    return jsonify({

        "summary": result

    })
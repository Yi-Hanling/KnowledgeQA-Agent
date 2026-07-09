from flask import Blueprint, jsonify

ai_bp = Blueprint(
    "ai",
    __name__,
    url_prefix="/api"
)


@ai_bp.route("/ai")
def ai():

    return jsonify({

        "message": "第二阶段接入AI"

    })
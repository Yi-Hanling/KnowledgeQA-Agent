from flask import Blueprint, jsonify

knowledge_bp = Blueprint(
    "knowledge",
    __name__,
    url_prefix="/api"
)


@knowledge_bp.route("/knowledge")
def knowledge():

    return jsonify({

        "message": "第二阶段知识接口"

    })
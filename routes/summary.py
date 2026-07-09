from flask import Blueprint, jsonify

summary_bp = Blueprint(
    "summary",
    __name__,
    url_prefix="/api"
)


@summary_bp.route("/summary")
def summary():

    return jsonify({

        "message": "第二阶段AI总结"

    })
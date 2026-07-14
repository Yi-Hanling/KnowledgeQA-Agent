from flask import Blueprint, jsonify, request

from service.ai_service import generate_summary

from database.db import db
from models.summary import Summary


summary_bp = Blueprint(
    "summary",
    __name__,
    url_prefix="/api"
)


# =========================
# AI生成总结
# =========================
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

    category_id = data.get(
        "category_id"
    )

    print("总结收到内容:")
    print(content)

    result = generate_summary(
        content
    )
    print("AI生成总结:")
    print(result)
    # 查询当前分类是否已有总结
    summary = Summary.query.filter_by(
        category_id=category_id
    ).first()

    if summary:

        summary.content = result

    else:

        summary = Summary(
            category_id=category_id,
            content=result
        )

        db.session.add(summary)

    db.session.commit()
    db.session.commit()

    print(
        "保存数据库:",
        category_id,
        result
    )
    return jsonify({

        "summary": result

    })


# =========================
# 获取分类总结
# =========================
@summary_bp.route(
    "/summary",
    methods=["GET"]
)
def get_summary():

    category_id = request.args.get(
        "category_id"
    )


    print(
        "收到查询ID:",
        category_id
    )


    summary = Summary.query.filter_by(
        category_id=category_id
    ).first()


    if summary:

        return jsonify({

            "summary": summary.content

        })


    return jsonify({

        "summary": ""

    })
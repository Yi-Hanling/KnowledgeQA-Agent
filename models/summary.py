from database.db import db
from datetime import datetime


class Summary(db.Model):

    __tablename__ = "summary"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    category_id = db.Column(
        db.String(50),
        nullable=False,
        unique=True
    )

    content = db.Column(
        db.Text,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.now
    )
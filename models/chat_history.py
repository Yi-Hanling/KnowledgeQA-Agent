from database.db import db
from datetime import datetime


class ChatHistory(db.Model):

    __tablename__ = "chat_history"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    role = db.Column(
        db.String(20),
        nullable=False
    )


    content = db.Column(
        db.Text,
        nullable=False
    )


    category_id = db.Column(
        db.String(50),
        nullable=False
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.now
    )
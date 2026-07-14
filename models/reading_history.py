from database.db import db
from datetime import datetime


class ReadingHistory(db.Model):

    __tablename__ = "reading_history"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    user_id = db.Column(
        db.Integer
    )


    knowledge_id = db.Column(
        db.Integer
    )


    read_time = db.Column(
        db.DateTime,
        default=datetime.now
    )
from database.db import db
from datetime import datetime


class Knowledge(db.Model):

    __tablename__ = "knowledge"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    title = db.Column(
        db.String(200),
        nullable=False
    )


    category = db.Column(
        db.String(100)
    )


    content = db.Column(
        db.Text
    )


    keywords = db.Column(
        db.String(255)
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.now
    )
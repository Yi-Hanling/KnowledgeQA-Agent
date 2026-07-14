from database.db import db
from datetime import datetime


class User(db.Model):

    __tablename__ = "user"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    username = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )


    password = db.Column(
        db.String(100),
        nullable=False
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.now
    )
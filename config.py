import os
from dotenv import load_dotenv


load_dotenv()


class Config:

    # DeepSeek
    DEEPSEEK_API_KEY = os.getenv(
        "DEEPSEEK_API_KEY"
    )


    DEEPSEEK_BASE_URL = (
        "https://api.deepseek.com"
    )


    # SQLite数据库
    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///knowledgehub.db"
    )


    SQLALCHEMY_TRACK_MODIFICATIONS = False
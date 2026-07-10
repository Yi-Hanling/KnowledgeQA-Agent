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


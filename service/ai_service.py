from openai import OpenAI
from config import Config


client = OpenAI(
    api_key=Config.DEEPSEEK_API_KEY,
    base_url=Config.DEEPSEEK_BASE_URL
)



# =========================
# AI问答
# =========================

def ask_ai(question):


    response = client.chat.completions.create(

        model="deepseek-chat",

        messages=[

            {
                "role":"system",
                "content":
                """
你是KnowledgeHub智能知识助手。

帮助用户学习和理解知识。
"""
            },

            {
                "role":"user",
                "content":question
            }

        ]

    )


    return response.choices[0].message.content





# =========================
# AI总结
# =========================

def generate_summary(content):


    response = client.chat.completions.create(

        model="deepseek-chat",

        messages=[

            {
                "role":"system",
                "content":
                """
你是KnowledgeHub AI学习总结助手。

请根据下面的学习内容生成总结。

要求：
1. 使用Markdown格式
2. 提取核心知识点
3. 分层整理
4. 适合学生复习
"""
            },


            {
                "role":"user",
                "content":content
            }

        ]

    )


    return response.choices[0].message.content
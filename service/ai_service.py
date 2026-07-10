from openai import OpenAI

from config import Config



client = OpenAI(
    api_key=Config.DEEPSEEK_API_KEY,
    base_url=Config.DEEPSEEK_BASE_URL
)



def ask_ai(question):

    response = client.chat.completions.create(

        model="deepseek-chat",

        messages=[

            {
                "role": "system",
                "content": """
你是KnowledgeHub智能知识助手。

你的职责：
1. 帮助用户学习和理解知识。
2. 回答科学、技术、人文等领域的问题。
3. 用清晰、准确、易懂的方式解释复杂概念。
4. 如果用户的问题涉及知识库内容，应优先参考知识库提供的信息。
5. 不确定的信息不要编造。

回答要求：
- 语言简洁清晰。
- 适当使用例子帮助理解。
- 面向学生和知识探索者。
"""
            },

            {
                "role": "user",
                "content": question
            }

        ]

    )


    answer = (
        response
        .choices[0]
        .message
        .content
    )


    return answer

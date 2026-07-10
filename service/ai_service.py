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
                "content":
                "你是KnowledgeHub智能知识助手"
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

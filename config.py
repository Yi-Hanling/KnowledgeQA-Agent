class Config:
    SECRET_KEY = "knowledgehub"

    # 第一阶段先不用数据库也没关系
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:123456@localhost/knowledgehub"

    SQLALCHEMY_TRACK_MODIFICATIONS = False
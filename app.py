from flask import Flask

from config import Config

from routes import register_routes

from database.db import db

import models



def create_app():

    app = Flask(__name__)


    # 加载配置
    app.config.from_object(Config)


    # 初始化数据库
    db.init_app(app)


    # 注册蓝图
    register_routes(app)


    # 创建数据库表
    with app.app_context():

        db.create_all()


    return app



app = create_app()



if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
from flask import Flask

from config import Config

from routes import register_routes



def create_app():

    app = Flask(__name__)


    # 加载配置
    app.config.from_object(Config)


    # 注册所有蓝图
    register_routes(app)


    return app



app = create_app()



if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
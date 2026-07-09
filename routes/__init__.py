from .home import home_bp
from .category import category_bp



def register_routes(app):

    # 首页
    app.register_blueprint(home_bp)


    # 知识工作区
    app.register_blueprint(category_bp)
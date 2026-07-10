from routes.home import home_bp
from routes.category import category_bp
from routes.ai import ai_bp



def register_routes(app):

    app.register_blueprint(home_bp)

    app.register_blueprint(category_bp)

    app.register_blueprint(ai_bp)
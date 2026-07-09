from .home import home_bp
from .category import category_bp
from .ai import ai_bp
from .knowledge import knowledge_bp
from .summary import summary_bp


def register_routes(app):
    app.register_blueprint(home_bp)
    app.register_blueprint(category_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(knowledge_bp)
    app.register_blueprint(summary_bp)
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    
    db.init_app(app)
    
    with app.app_context():
            from .models import Region, SignEntry
            print("creating tables...")
            db.create_all()
            print("tables created")

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app

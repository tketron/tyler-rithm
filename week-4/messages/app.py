from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db = SQLAlchemy(app)


@app.route('/users')
def get_users():
    return 'Hello world'

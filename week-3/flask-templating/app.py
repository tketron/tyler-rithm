from flask import Flask, render_template

app = Flask(__name__)


@app.route('/person/<name>/<age>')
def display_age(name, age):
    return render_template('about.html', name=name, age=age)
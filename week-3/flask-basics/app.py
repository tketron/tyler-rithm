from flask import Flask

app = Flask(__name__)


@app.route('/welcome')
def welcome():
    return 'welcome'


@app.route('/welcome/home')
def welcome_home():
    return 'welcome home'


@app.route('/welcome/back')
def welcome_back():
    return 'welcome back'


@app.route('/sum')
def get_sum():
    sum = 5 + 5
    return str(sum)


@app.route('/say/<msg>')
def say_msg(msg):
    return 'I SAID ' + msg
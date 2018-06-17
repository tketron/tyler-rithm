from flask import Flask, render_template, request
from random import randint

app = Flask(__name__)

math = {
    'add': lambda x, y: x + y,
    'subtract': lambda x, y: x - y,
    'multiply': lambda x, y: x * y,
    'divide': lambda x, y: x / y
}


@app.route('/math')
def calculate():
    return render_template('calc.html')


@app.route('/calculate')
def perform_math():
    num1 = int(request.args.get('num1'))
    num2 = int(request.args.get('num2'))
    operation = request.args.get('operation')
    result = math[operation](num1, num2)
    return render_template('result.html', result=result)


@app.route('/')
def homepage():
    lucky_number = randint(1, 100)
    return render_template('welcome.html', lucky_number=lucky_number)


@app.route('/math/<operation>/<int:first>/<int:second>')
def do_math(operation, first, second):
    return str(math[operation](first, second))
    # if operation == 'add':
    #     return f'{first + second}'
    # elif operation == 'subtract':
    #     return f'{first - second}'
    # elif operation == 'multiply':
    #     return f'{first * second}'
    # elif operation == 'divide':
    #     return f'{first / second}'

from flask import Flask, render_template, request, url_for, redirect
from flask_modus import Modus
from snack import Snack

app = Flask(__name__)
Modus(app)

banana = Snack(1, 'Banana', 'fruit')
cookie = Snack(2, 'Cookie', 'dessert')
almond = Snack(3, 'Almonds', 'nut')
brownie = Snack(4, 'Brownie', 'dessert')

snacks = [banana, cookie, almond, brownie]


# /snacks GET Displays all snacks
@app.route('/snacks')
def get_all_snacks():
    return render_template('snacks.html', snacks=snacks)


# /snacks PUT add a new snack
@app.route('/snacks', methods=['POST'])
def add_snack():
    snacks.append(
        Snack(request.values.get('name'), request.values.get('kind')))
    return redirect(url_for('get_all_snacks'))


# /snacks/<snack_id> GET display a snack
@app.route('/snacks/<int:snack_id>')
def get_snack(snack_id):
    snack = get_snack_by_id(snack_id)
    print(snack)
    return render_template('snack.html', snack=snack)


# /snacks/<snack_id> PATCH edit a snack
@app.route('/snacks/<snack_id>', methods=['PATCH'])
def edit_snack(snack_id):
    found_snack = next(snack for snack in snacks if snack.id == int(snack_id))
    found_snack.name = request.values.get('name')
    found_snack.kind = equest.values.get('kind')
    print(found_snack)
    return redirect(url_for('edit_snack', snack_id=snack_id))


# /snacks/<snack_id> DELETE delete a snack
@app.route('/snacks/<int:snack_id>', methods=['DELETE'])
def delete_snack(snack_id):
    snacks.remove(get_snack_by_id(snack_id))
    return redirect(url_for('get_all_snacks'))


def get_snack_by_id(snack_id):
    return next(snack for snack in snacks if snack.id == snack_id)

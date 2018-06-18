import psycopg2
from flask import Flask, render_template, request, url_for, redirect
from flask_modus import Modus
from snack import Snack
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'abc123'

Modus(app)
DebugToolbarExtension(app)

# banana = Snack(1, 'Banana', 'fruit')
# cookie = Snack(2, 'Cookie', 'dessert')
# almond = Snack(3, 'Almonds', 'nut')
# brownie = Snack(4, 'Brownie', 'dessert')

# snacks = [banana, cookie, almond, brownie]


# /snacks GET Displays all snacks
@app.route('/snacks')
def get_all_snacks():
    with psycopg2.connect("postgresql://localhost/snacks") as conn:
        c = conn.cursor()
        c.execute("SELECT id, name, kind FROM snacks")
        s = c.fetchall()
        s = [{"id": s[0], "name": s[1], "kind": s[2]} for s in s]
    return render_template('snacks.html', snacks=s)


# /snacks PUT add a new snack
@app.route('/snacks', methods=['POST'])
def add_snack():
    name = request.values.get('name')
    kind = request.values.get('kind')
    with psycopg2.connect("postgresql://localhost/snacks") as conn:
        c = conn.cursor()
        c.execute("INSERT INTO snacks(name, kind) VALUES (%s, %s)",
                  (name, kind))
    return redirect(url_for('get_all_snacks'))


# /snacks/<snack_id> GET display a snack
@app.route('/snacks/<int:snack_id>')
def get_snack(snack_id):
    with psycopg2.connect("postgresql://localhost/snacks") as conn:
        c = conn.cursor()
        c.execute("SELECT id, name, kind FROM snacks WHERE id = %s",
                  (snack_id, ))
        s = c.fetchone()
        s = {"id": s[0], "name": s[1], "kind": s[2]}
    return render_template('snack.html', snack=s)


#SQLify
# /snacks/<snack_id> PATCH edit a snack
@app.route('/snacks/<snack_id>', methods=['PATCH'])
def edit_snack(snack_id):
    found_snack = next(snack for snack in snacks if snack.id == int(snack_id))
    found_snack.name = request.values.get('name')
    found_snack.kind = request.values.get('kind')
    print(found_snack)
    with psycopg2.connect("postgresql://localhost/snacks") as conn:
        c = conn.cursor()
        c.execute("UPDATE snacks SET name, kind =  WHERE id = %s",
                  (snack_id, ))
    return redirect(url_for('edit_snack', snack_id=snack_id))


# /snacks/<snack_id> DELETE delete a snack
@app.route('/snacks/<int:snack_id>', methods=['DELETE'])
def delete_snack(snack_id):
    with psycopg2.connect("postgresql://localhost/snacks") as conn:
        c = conn.cursor()
        c.execute("DELETE FROM snacks WHERE id = %s", (snack_id, ))
    return redirect(url_for('get_all_snacks'))


def get_snack_by_id(snack_id):
    return next(snack for snack in snacks if snack.id == snack_id)

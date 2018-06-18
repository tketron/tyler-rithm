from flask import Flask, render_template, request, url_for, redirect
from flask_modus import Modus
from snack import Snack
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/snacks'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'abc123'

modus = Modus(app)
toolbar = DebugToolbarExtension(app)
db = SQLAlchemy(app)


class Snack(db.Model):
    __tablename__ = "snacks"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, unique=True)
    kind = db.Column(db.Text)


db.create_all()


# /snacks GET Displays all snacks
@app.route('/snacks')
def get_all_snacks():
    snacks = Snack.query.all()
    return render_template('snacks.html', snacks=snacks)


# /snacks PUT add a new snack
@app.route('/snacks', methods=['POST'])
def add_snack():
    name = request.values.get('name')
    kind = request.values.get('kind')

    s = Snack(name=name, kind=kind)
    db.session.add(s)
    db.session.commit()

    return redirect(url_for('get_all_snacks'))


# /snacks/<snack_id> GET display a snack
@app.route('/snacks/<int:snack_id>')
def get_snack(snack_id):
    s = Snack.query.filter(Snack.id == snack_id).first_or_404()
    return render_template('snack.html', snack=s)


# /snacks/<snack_id> PATCH edit a snack
@app.route('/snacks/<snack_id>', methods=['PATCH'])
def edit_snack(snack_id):
    name = request.values.get('name')
    kind = request.values.get('kind')

    s = Snack.query.filter(Snack.id == snack_id).one()
    s.name = name
    s.kind = kind
    db.session.add(s)
    db.session.commit()

    return redirect(url_for('edit_snack', snack_id=snack_id))


# /snacks/<snack_id> DELETE delete a snack
@app.route('/snacks/<int:snack_id>', methods=['DELETE'])
def delete_snack(snack_id):
    s = Snack.query.filter(Snack.id == snack_id).one()
    db.session.delete(s)
    db.session.commit()
    return redirect(url_for('get_all_snacks'))


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

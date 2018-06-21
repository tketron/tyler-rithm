from flask import Flask, render_template, redirect, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Optional, URL, NumberRange, AnyOf

app = Flask(__name__)

app.config['SECRET_KEY'] = '123456'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/pets'

db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)


class Pet(db.Model):
    """Model for pet objects """
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text, nullable=True)
    age = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)


db.create_all()


class AddPetForm(FlaskForm):
    """Add Pet form object"""
    name = StringField('Name', validators=[DataRequired()])
    species = StringField(
        'Species',
        validators=[DataRequired(),
                    AnyOf(['cat', 'dog', 'porcupine'])])
    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    age = IntegerField('Age', validators=[NumberRange(min=0, max=30)])
    notes = StringField('Notes', validators=[Optional()])


class EditPetForm(FlaskForm):
    """Edit Pet form object"""
    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    notes = StringField('Notes', validators=[Optional()])
    available = BooleanField('Available', validators=[])


# add pets
# p1 = Pet(
#     name='Fluffy',
#     species='cat',
#     photo_url=
#     'https://orig00.deviantart.net/c20f/f/2013/042/1/a/1ae3dd27c26061c322d797d9727d8e98-d5uksiy.jpg',
#     age=4,
#     notes='Silent but deadly',
#     available=True)
# p2 = Pet(
#     name='Fido',
#     species='dog',
#     photo_url=
#     'https://s3-media2.fl.yelpcdn.com/bphoto/gDE_iYfnlSovh7RqdOGCxw/348s.jpg',
#     age=2,
#     notes='Never sleeps!',
#     available=True)
# db.session.add(p1)
# db.session.add(p2)
# db.session.commit()


@app.route('/')
def show_pets():
    """Route to show all pets"""
    pets = Pet.query.all()
    return render_template('index.html', pets=pets)


@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    """Route to render and accept the form to add a new pet"""

    form = AddPetForm()

    if form.validate_on_submit():
        # create a new database object
        pet = Pet(
            name=form.data['name'],
            species=form.data['species'],
            photo_url=form.data['photo_url'],
            age=form.data['age'],
            notes=form.data['notes'])
        db.session.add(pet)
        db.session.commit()

        # redirect to show all pets
        return redirect(url_for('show_pets'))

    else:
        return render_template('show_add_pet_form.html', form=form)


@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def show_or_edit_pet(pet_id):
    """Route to show an existing pet along with the form to edit the pet"""
    pet = Pet.query.get(pet_id)

    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        #edit the pet
        pet = Pet.query.get(pet_id)
        pet.photo_url = form.data['photo_url']
        pet.notes = form.data['notes']
        pet.available = form.data['available']
        db.session.add(pet)
        db.session.commit()

        #reload show pet page
        return redirect(url_for('show_or_edit_pet', pet_id=pet.id))
    else:
        return render_template('show_and_edit_pet.html', pet=pet, form=form)

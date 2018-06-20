from flask import Flask, render_template, redirect, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_modus import Modus

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/messages'

db = SQLAlchemy(app)
modus = Modus(app)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)


db.create_all()

# Temporary hard coded users
# u1 = User(first_name='Tyler', last_name='Ketron')
# u2 = User(first_name='Matthew', last_name='Elliott')
# u3 = User(first_name='Andrew', last_name='Schnieder')
# db.session.add(u1)
# db.session.add(u2)
# db.session.add(u3)
# db.session.commit()


# Base Route
@app.route('/')
def redirect_to_users():
    return redirect(url_for('get_users'))


# Users Routes


@app.route('/users')
def get_users():
    """Render a list of all users"""
    return render_template('users/index.html', users=User.query.all())


@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Render a single user"""
    return render_template(
        'users/show.html', user=User.query.get_or_404(user_id))


@app.route('/users/new')
def add_user():
    """Render the form to create a new user"""
    return render_template('users/new.html')


@app.route('/users', methods=['POST'])
def create_user():
    """Creates a new user in the database"""
    new_user = User(
        first_name=request.values.get('fname'),
        last_name=request.values.get('lname'))
    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('get_users'))


@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    """Renders a form to edit a user"""
    return render_template(
        'users/edit.html', user=User.query.get_or_404(user_id))


@app.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    """Updates a user in the database"""
    user = User.query.get_or_404(user_id)
    user.first_name = request.values.get('fname')
    user.last_name = request.values.get('lname')
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('show_user', user_id=user_id))


@app.route('/users/<int:user_id>/delete', methods=['DELETE'])
def delete_user(user_id):
    """Deletes a user then redirects to the list of users"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect(url_for('get_users'))


# Error routes


@app.errorhandler(404)
def page_not_found(e):
    """Returns custom 404 error page"""
    return render_template('errors/404.html'), 404

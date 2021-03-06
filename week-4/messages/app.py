from flask import Flask, render_template, redirect, request, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_modus import Modus
from flask_bcrypt import Bcrypt
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/messages'
app.config['SECRET_KEY'] = 'my_top_secret_key'
app.config['DEBUG_TB_ENABLED'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

db = SQLAlchemy(app)
modus = Modus(app)
bcrypt = Bcrypt()
toolbar = DebugToolbarExtension(app)


class User(db.Model):
    """
    Class representing a User model.
    """
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text)
    username = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)

    messages = db.relationship('Message', backref='user')

    @classmethod
    def register(cls, first_name, last_name, username, password):
        """Register a user with a hashed password.
        
        Returns user object.
        """
        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode('utf8')
        return cls(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=hashed_utf8)

    @classmethod
    def authenticate(cls, username, password):
        """Validate that the user exists and the password is correct

        Returns the user if valid, otherwise returns false.
        """
        user = User.query.filter_by(username=username).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                return user
        return False


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)

    messages = db.relationship(
        'Message', secondary='tags_messages', backref=db.backref('tags'))


tags_messages = db.Table(
    'tags_messages',
    db.Column(
        'tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True),
    db.Column(
        'message_id',
        db.Integer,
        db.ForeignKey('messages.id'),
        primary_key=True))

db.create_all()

# Temporary hard coded db seeds
# u1 = User(
#     first_name='Tyler',
#     last_name='Ketron',
#     username='tketron',
#     password='abc123')
# u2 = User(
#     first_name='Matthew',
#     last_name='Elliott',
#     username='melliott',
#     password='ilikecats')
# u3 = User(
#     first_name='Andrew',
#     last_name='Schnieder',
#     username='aschnieder',
#     password='magictg')
# m1 = Message(content="hello world!", user_id=1)
# m2 = Message(content="My second message", user_id=1)
# t1 = Tag(name='LOL')
# t2 = Tag(name='sad')
# db.session.add(u1)
# db.session.add(u2)
# db.session.add(u3)
# db.session.add(m1)
# db.session.add(m2)
# db.session.add(t1)
# db.session.add(t2)
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
    new_user = User.register(
        first_name=request.values.get('fname'),
        last_name=request.values.get('lname'),
        username=request.values.get('username'),
        password=request.values.get('password'))

    db.session.add(new_user)
    db.session.commit()
    return redirect(url_for('get_users'))


@app.route('/users/login', methods=['GET', 'POST'])
def login_user():
    """Either render the login form or accept the input and attempt to authenticate."""
    if request.method == 'POST':
        u = User.authenticate(
            username=request.values.get('username'),
            password=request.values.get('password'))
        if u:
            session['user'] = u.id
            return redirect(url_for('get_users'))

    else:
        return render_template('/users/login.html')


@app.route('/users/logout')
def logout_user():
    """Clear the session user value to logout the user."""
    session['user'] = False
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


# Message routes


@app.route('/users/<int:user_id>/messages')
def get_messages(user_id):
    """Render a list of all messages"""
    return render_template(
        'messages/index.html',
        messages=User.query.get_or_404(user_id).messages,
        user_id=user_id)


@app.route('/messages/<int:message_id>')
def show_message(message_id):
    """Render a single message"""
    message = Message.query.get_or_404(message_id)
    return render_template(
        'messages/show.html', message=message, tags=message.tags)


@app.route('/users/<int:user_id>/messages/new')
def add_message(user_id):
    """Render the form to create a new message"""
    tags = Tag.query.all()
    return render_template('messages/new.html', user_id=user_id, tags=tags)


@app.route('/users/<int:user_id>/message', methods=['POST'])
def create_message(user_id):
    """Creates a new message in the database"""
    new_message = Message(
        content=request.values.get('content'), user_id=user_id)
    tag_ids = request.values.getlist('tags')
    new_message.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
    db.session.add(new_message)
    db.session.commit()
    return redirect(url_for('get_messages', user_id=user_id))


@app.route('/messages/<int:message_id>/edit')
def edit_message(message_id):
    """Renders a form to edit a message"""
    return render_template(
        'messages/edit.html', message=Message.query.get_or_404(message_id))


@app.route('/messages/<int:message_id>', methods=['PATCH'])
def update_message(message_id):
    """Updates a message in the database"""
    message = Message.query.get_or_404(message_id)
    message.content = request.values.get('content')
    db.session.add(message)
    db.session.commit()
    return redirect(url_for('show_message', message_id=message_id))


@app.route('/messages/<int:message_id>/delete', methods=['DELETE'])
def delete_message(message_id):
    """Deletes a message then redirects to the list of users"""
    message = Message.query.get_or_404(message_id)
    user_id = message.user_id
    db.session.delete(message)
    db.session.commit()
    return redirect(url_for('get_messages', user_id=user_id))


# Tags routes


@app.route('/tags')
def get_tags():
    """Render a list of all tags"""
    return render_template('tags/index.html', tags=Tag.query.all())


@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    """Render a single tag"""
    return render_template('tags/show.html', tag=Tag.query.get_or_404(tag_id))


@app.route('/tags/new')
def add_tag():
    """Render the form to create a new tag"""
    return render_template('tags/new.html')


@app.route('/tags', methods=['POST'])
def create_tag():
    """Creates a new tag in the database"""
    new_tag = Tag(name=request.values.get('name'))
    db.session.add(new_tag)
    db.session.commit()
    return redirect(url_for('get_tags'))


@app.route('/tags/<int:tag_id>/edit')
def edit_tag(tag_id):
    """Renders a form to edit a tag"""
    return render_template('tags/edit.html', tag=Tag.query.get_or_404(tag_id))


@app.route('/tags/<int:tag_id>', methods=['PATCH'])
def update_tag(tag_id):
    """Updates a tag in the database"""
    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.values.get('name')
    db.session.add(tag)
    db.session.commit()
    return redirect(url_for('show_tag', tag_id=tag_id))


@app.route('/tags/<int:tag_id>/delete', methods=['DELETE'])
def delete_tag(tag_id):
    """Deletes a tag then redirects to the list of tags"""
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    return redirect(url_for('get_tags'))


# Error routes


@app.errorhandler(404)
def page_not_found(e):
    """Returns custom 404 error page"""
    return render_template('errors/404.html'), 404

from flask import Flask, request, url_for, render_template
from flask_modus import Modus

app = Flask(__name__)
Modus(app)


class Toy:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price


barbie = Toy("barb", "Barbie", 25)
playstation = Toy("ps", "Playstation", 100)
skeletor = Toy("skel", "Skeletor", 5)

toys = [barbie, playstation, skeletor]


#GET /toys page about all toys
@app.route('/toys', methods=['GET'])
def get_toy_list():
    return render_template('toys.html', toys=toys)


#PUT /toys add a new toy

# GET /toys/toy Get a page about the toy


# toys/elmo?_method=DELETE
# DELETE /toys/toy delete toy from the list, redirect to list of toys
@app.route('/toys/<toy_id>', methods=["DELETE"])
def delete_toy(toy_id):
    # delete toy with id from list
    pass


# PATCH /toys/toy change/edit/update toy

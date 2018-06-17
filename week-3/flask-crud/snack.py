class Snack():
    id = 1

    def __init__(self, name, kind):
        self.id = Snack.id
        Snack.id += 1
        self.name = name
        self.kind = kind

    def __repr__(self):
        return f'{self.id}, {self.name}, {self.kind}'

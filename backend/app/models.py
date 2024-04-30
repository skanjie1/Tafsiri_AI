from . import db

class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    def __repr__(self):
        return '<Region %r>' % self.name

class SignEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sign_data = db.Column(db.Text, nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)

    region = db.relationship('Region', backref=db.backref('entries', lazy=True))

    def __repr__(self):
        return '<SignEntry %r>' % self.id

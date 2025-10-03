from flask import Flask, render_template, request
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'

todos = ["Learn Flask", "Build a cool app", "Setup venv "]

#creating form with wtforms
class TodoForm(FlaskForm):
    todo = StringField("Todo",validators=[DataRequired()], render_kw={"placeholder": "Enter todo"})
    submit = SubmitField("Add Todo")

""" define one of our routes which means that where the user can go in our app and what they can do there, operatonal like get or post"""
@app.route('/', methods=['GET', 'POST'])
def index():
    if 'todo' in request.form:
        todos.append(request.form['todo'])
    return render_template('index.html', todos=todos, template_form=TodoForm()) #new instance of the form class

@app.route('/<string:name>')
def hello(name):
    name = name.capitalize()
    return f"<h1>Hello {name}!</h1>"
from flask import Flask, render_template, escape, request, redirect
import requests
import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/registration')
def registration():
    return render_template('registration.html')


@app.route('/registration/new', methods=['POST'])
def add_new_registration():
    username = request.form['new_user_name']
    password = request.form['new_password']
    query = """INSERT INTO users (username, password) VALUES ('%s', '%s')""" % (username, password)
    data_manager.handle_query(query)
    return redirect('/')    


@app.route('/login')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    app.run(debug=True)
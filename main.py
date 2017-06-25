from flask import Flask, render_template, request, redirect, session, url_for
import werkzeug

import requests
import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    loggedin = False
    username = ""
    if 'username' in session:
        loggedin = True
        username = session['username']
    return render_template('index.html', loggedin=loggedin, username=username)


@app.route('/registration')
def registration():
    return render_template('registration.html')


@app.route('/registration/new', methods=['POST'])
def add_new_registration():
    username = request.form['new_user_name']
    password = request.form['new_password']
    hashed_password = werkzeug.security.generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
    query = """INSERT INTO users (username, password) VALUES ('%s', '%s')""" % (username, hashed_password)
    data_manager.handle_query(query)
    return redirect('/')


@app.route('/login', methods=['GET', 'POST'])
def login():
    login_ok = True
    if request.method == 'POST':
        query = """SELECT username, password FROM users WHERE username='""" + request.form['user_name'] + """'"""
        user = data_manager.handle_query(query)
        if werkzeug.security.check_password_hash(user[0][1], request.form['password']):
            session['username'] = request.form['user_name']
            return redirect('/')
        else:
            login_ok = False
    return render_template('login.html', login_ok=login_ok)


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    app.run(debug=True)
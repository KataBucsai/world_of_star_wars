from flask import Flask, render_template, escape, request
import requests

app = Flask(__name__)


@app.route('/')
def index():
    print(request.form)
    planet_table = requests.get('http://swapi.co/api/planets/').json()
    previous = planet_table['previous']
    next_page = planet_table['next']
    planet_table = planet_table['results']
    return render_template('index.html', planet_table=planet_table, previous=previous, next_page=next_page)


if __name__ == '__main__':
    app.run(debug=True)
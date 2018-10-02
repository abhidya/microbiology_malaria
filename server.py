#!/usr/bin/env python
from threading import Lock
from flask import Flask, render_template, session, request, jsonify, abort
from flask_pymongo import PyMongo

from compute import compute

async_mode = None

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/malaria'
mongo = PyMongo(app)
thread = None
thread_lock = Lock()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/example.html')
def example():
    return render_template('example.html')

@app.route('/custom.html')
def custom():
    return render_template('custom.html')


@app.route('/compute', methods=['POST'])
def new_game():
    # bob = request.args
    # for key in bob:
    #     print(bob.get(key))
    #     print(bob.getlist(key))
    probs = request.form.getlist('probs[]')
    size = request.form['size']
    functionLaw = request.form.getlist('functionLaw[]')
    binsStart = request.form.getlist('binsStart[]')
    binsEnd = request.form.getlist('binsEnd[]')
    print(functionLaw, size, probs, binsStart, binsEnd)
    bob = compute(functionLaw, size, probs, binsStart, binsEnd)
    print(bob)
    return jsonify(bob), 201


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')

#!/usr/bin/env python
from threading import Lock
import json
from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
import datetime
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
    probs = request.form.getlist('probs[]')
    size = request.form['size']
    functionLaw = request.form.getlist('functionLaw[]')
    binsStart = request.form.getlist('binsStart[]')
    binsEnd = request.form.getlist('binsEnd[]')
    location = request.form['location_form']
    species = request.form['species_form']
    data = compute(functionLaw, size, probs, binsStart, binsEnd)
    print(functionLaw, size, probs, binsStart, binsEnd, location, species)
    dict = {"location": location, "species": species, "size": size, "binStart": binsStart, "binEnd": binsEnd,
            "Probability": probs, "Models": functionLaw, "date": datetime.datetime.utcnow()}
    r = json.dumps(dict, indent=4, sort_keys=True, default=str)
    loaded_r = json.loads(r)
    print(loaded_r)
    mongo.db.data.insert_one(loaded_r)
    return jsonify(data), 200


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')

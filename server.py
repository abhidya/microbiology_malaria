#!/usr/bin/env python
from threading import Lock
import json
import ast
from flask import Flask, render_template, request, jsonify, make_response, url_for, redirect
import datetime
import random
from compute import compute

mongoflag = False



import sys


async_mode = None

app = Flask(__name__)

thread = None
thread_lock = Lock()


if "--mongodb" in sys.argv:
    mongoflag = True
    from flask_pymongo import PyMongo

    app.config['SECRET_KEY'] = 'secret!'
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/malaria'
    mongo = PyMongo(app)
    FIELDS = {'location': True, 'species': True, 'date': True}





@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/example.html')
def example():
    return render_template('example.html')


@app.route('/custom.html')
def custom():
    return render_template('custom.html')


@app.route('/data.html')
def data():
    if mongoflag:
        return render_template('data.html')
    else:
        return redirect(url_for('fubar'))




@app.route('/mongodberror.html')
def fubar():
    return render_template('mongodberror.html')


@app.route('/data/visualization', methods=['get'])
def data_visualization():
    projects = mongo.db.data.find(projection=FIELDS)
    json_projects = []
    for project in projects:
        json_projects.append(project)
        # print(project)
    json_projects = json.dumps(json_projects, indent=4, sort_keys=True, default=str)
    return json_projects, 200




@app.route('/transform', methods=["POST"])
def transform_view():
    csv = 'foo,bar,baz\nhai,bai,crai\n'
    response = make_response(csv)
    cd = 'attachment; filename=mycsv.csv'
    response.headers['Content-Disposition'] = cd
    response.mimetype = 'text/csv'

    return response


@app.route('/compute', methods=['POST'])
def new_entry():
    probs = request.form.getlist('probs[]')
    size = request.form['size']
    functionLaw = request.form.getlist('functionLaw[]')
    binsStart = request.form.getlist('binsStart[]')
    binsEnd = request.form.getlist('binsEnd[]')
    location = request.form['location']
    species = request.form['species']
    # print(functionLaw, size, probs, binsStart, binsEnd)

    data = compute(functionLaw, size, probs, binsStart, binsEnd)
    # print(functionLaw, size, probs, binsStart, binsEnd, location, species)
    # year = random.randint(2010, 2019)
    # month = random.randint(1, 11)
    # day = random.randint(1, 28)
    t = datetime.datetime.now()
    # t = datetime.datetime(year, month, day)
    s = t.strftime('%Y-%m-%d %H:%M:%S.%f')

    dict = {"location": location, "species": species, "size": size, "binStart": binsStart, "binEnd": binsEnd,
            "Probability": probs, "Models": functionLaw, "date": s[:-3]}
    r = json.dumps(dict, indent=4, sort_keys=True, default=str)
    loaded_r = json.loads(r)
    # print(loaded_r)
    if mongoflag:
        mongo.db.data.insert_one(loaded_r)
        loaded_r.pop('_id', None)
    data["download"] = str(loaded_r)
    return jsonify(data), 200


@app.route('/jsoncompute', methods=['POST'])
def upload_entry():
    incomming_data = str(request.data).replace('b"{', '{')
    incomming_data = incomming_data.replace('}"', '}')
    incomming_data = ast.literal_eval(incomming_data)
    probs = incomming_data['Probability']
    size = incomming_data['size']
    functionLaw = incomming_data['Models']
    binsStart = incomming_data['binStart']
    binsEnd = incomming_data['binEnd']
    location = incomming_data['location']
    species = incomming_data['species']
    data = compute(functionLaw, size, probs, binsStart, binsEnd)
    # print(functionLaw, size, probs, binsStart, binsEnd, location, species)
    t = datetime.datetime.now()
    # t = datetime.datetime(year, month, day)
    s = t.strftime('%Y-%m-%d %H:%M:%S.%f')

    dict = {"location": location, "species": species, "size": size, "binStart": binsStart, "binEnd": binsEnd,
            "Probability": probs, "Models": functionLaw, "date": s[:-3]}
    r = json.dumps(dict, indent=4, sort_keys=True, default=str)
    loaded_r = json.loads(r)
    # print(loaded_r)
    data["download"] = str(loaded_r)
    return jsonify(data), 200


if __name__ == '__main__':
    app.run()

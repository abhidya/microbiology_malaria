import requests
from requests import Session
from robobrowser import RoboBrowser
import random
import tqdm

url = "http://127.0.0.1:5000/example.html"

species = ["Culex", "Anopheles", "Aedes", 'Abraedes', 'Aedes', 'Alanstonea', 'Albuginosus', ]
locations = ["ABW", "AFG", "AGO", "AIA", ]

functionLaw = ['powerLaw', 'threshold', 'logisticThreshold']

requests.packages.urllib3.disable_warnings()

for i in tqdm.tqdm(range(1000)):
    c = Session()
    c.verify = False

    browser = RoboBrowser(session=c, parser='html.parser')

    browser.open(url)
    # # print(browser.parsed)
    form = browser.get_form()

    form['location'] = random.choice(locations)
    form['species'] = random.choice(species)
    form['size'] = 1
    form['functionLaw[]'] = random.choice(functionLaw)

    response = browser.submit_form(form)

    #
    # browser.open('http://127.0.0.1:5000/compute', method='post', data=form)
    #
    # print(response)
    # print(browser.parsed)

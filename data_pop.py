import requests
from requests import Session
from robobrowser import RoboBrowser
import random
import tqdm

url = "http://127.0.0.1:5000/example.html"

species = ["Culex", "Anopheles", "Aedes", 'Abraedes', 'Aedes', 'Alanstonea', 'Albuginosus', ]
locations = ["ABW", "AFG", "AGO", "AIA", ]

functionLaw = ['powerLaw','threshold', 'logisticThreshold']

requests.packages.urllib3.disable_warnings()


for i in tqdm.tqdm(range(1000)):
    c = Session()
    c.verify = False

    browser = RoboBrowser(session=c, parser='html.parser')

    browser.open(url)
    form = browser.get_form()
    # print(form)


    form['location_form'] = random.choice(locations)
    form['species_form'] = random.choice(species)
    form['size'] = 10
    form['functionLaw[]'] = random.choice(functionLaw)
    response = browser.submit_form(form)


    # print(response)
    # print(browser.parsed)


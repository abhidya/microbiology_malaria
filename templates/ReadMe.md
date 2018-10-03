
## API


## /data/visualization
Method: Get

Accepts: 

Returns: Json of objects with the following fields ['location','species','date'], 200 response code

Source: server.py data_visualization()


## /compute
Method: Post

Accepts: Json of ["location", "species", "size", "binStart", "binEnd", "Probability", "Models"]

Returns: Json of ["Model": "[data1, data2, .... dataN]"],  200 response code

Source: server.py  new_entry()




## Files

## server.py 
Where the flask logic is

## data_pop.py
Tests website by making 1000 entries

## compute.py
Does all the logic for generating data for each model


## > Templates

##index.html
Navigation of site, links to custom, example, and data

##custom.html
The user interface for adding data and viewing models

##example.html
Testing the logic and backend with a prefilled entry values

##data.html
Displays the collected data by date, species, and locations

## > Static

## js 

##functions.js

##addfields()
adds an input to div class=gen_forms

##removefields()
removes input from div class=gen_forms

##createbins()
adds multiple bins at once

##createbins()
makes sure that probs add up to 100

##post_functions.js


##visualize_graphs.js

## css

## style.css
holds the css for the loading gif and fade out

##images
all images used by site 


## lib 
javascript source code for libraries used and css and imgs







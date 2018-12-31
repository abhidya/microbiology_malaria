
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

##checksum()
makes sure that probs add up to 100

##showbins()
Makes bins visible

##showgraphs()
Makes graphs visible

##hideentry()
Hides entry div

##post_functions.js

##openModal()
starts the fade in and the loading gif

##closeModal()
stops fade in and hides the loading gif

##powerlaw()
displays powerlaw graph

##threshold()
displays threshold graph

##log_threshold()
displays log threshold graph

## on submit function
starts loading gif and loads data and builds graphs
hides gif after loading is complete

##visualize_graphs.js

makes graphs for data.html

## css

## style.css
holds the css for the loading gif and fade out

##images
all images used by site 


## lib 
javascript source code for libraries used and css and imgs







<?php


###START Getting the number of bins and functions###
$binStart = $_GET['binsStart'];
$numbins = count($binStart);


#Grabs the functions information from the form
$functions = $_GET['functionLaw'];
#Gets the number of elements in the array
$numfunctions = count($functions);

###END GEtting the number of bins and functions###



###START bin array parse information###
$binEnd = $_GET['binsEnd'];
$probs = $_GET['probs'];
$size = $_GET['size'];


//$binStartStr = "";
$args = "";
$args .= $numbins ." ". $numfunctions . " " . $size . " ";


$binEndStr = "";
for($i = 0; $i < $numbins; $i++){
	$args .= $binStart[$i] . " " . $binEnd[$i] . " " . $probs[$i] . " ";
	//$binEndStr .= $binEnd[$i] . " ";
}


###START function parse information###

#Runs through the functions array and adds the values to a single string to pass to python
for($i = 0; $i < $numfunctions; $i++){
	$args .= $functions[$i] . " ";
}

#echo($args);
echo("<br>");

###END function parse information###

$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Nasib Ubuntu
$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Mark Windows
$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Kristina Mac
$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Manny Ubuntu
echo($page);

?>



<head>
    <!-- Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>

<body>
    <!-- Plotly chart will be drawn inside this DIV -->
    <div id="myDiv"></div>
    <script>
    /* JAVASCRIPT CODE GOES HERE */
    var data = <?php echo json_encode($page); ?>;
    var x= data.split("\n");

    var trace = {
        x: x,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('myDiv', data);
</script>
</body>

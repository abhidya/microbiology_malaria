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


#$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Nasib Ubuntu
#$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Mark Windows
#$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'"); #Kristina Mac
$page = shell_exec("/home/manny/anaconda3/bin/python3 /var/www/html/microbiology_malaria/website/estimate.py '" .$args."'"); #Manny Ubuntu
// echo($page)
$models_ar = explode(', ', $page);
// echo($models_ar[0])

// $handle = popen("/home/manny/anaconda3/bin/python3 /var/www/html/microbiology_malaria/website/estimate.py 2>&1 '" .$args."'" , 'r');
// $output = fread($handle, 1024);
// var_dump($output);
// pclose($handle);
// echo($handle)

?>



<head>
    <!-- Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>

<body>
    <h1> powerlaw_probs <h1>
    <!-- Plotly chart will be drawn inside this DIV -->
    <div id="powerlaw_probs"></div>
    <script>
    /* JAVASCRIPT CODE GOES HERE */
    var data = <?php echo json_encode($models_ar[0]); ?>;
    var x= data.split("\n");

    var trace = {
        x: x,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('powerlaw_probs', data);
</script>


    <!-- Plotly chart will be drawn inside this DIV -->
    <h1> threshold_probs <h1>

    <div id="threshold_probs"></div>
    <script>
    /* JAVASCRIPT CODE GOES HERE */
    var data = <?php echo json_encode($models_ar[1]); ?>;
    var x= data.split("\n");

    var trace = {
        x: x,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('threshold_probs', data);
</script>



    <!-- Plotly chart will be drawn inside this DIV -->
    <h1> logisticthreshold_probs <h1>

    <div id="logisticthreshold_probs"></div>
    <script>
    /* JAVASCRIPT CODE GOES HERE */
    var data = <?php echo json_encode($models_ar[2]); ?>;
    var x= data.split("\n");

    var trace = {
        x: x,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('logisticthreshold_probs', data);
</script>
</body>

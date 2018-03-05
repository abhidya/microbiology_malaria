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


//$binStartStr = "";
$args = "";
$args .= $numbins ." ". $numfunctions . " ";


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

echo($args);
echo("<br>");

###END function parse information###

$var1 = "hi fh djfh";
$var2 = "second";

#$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$strFun."'");
#$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$var2."'");
$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'");
echo($page);

?>


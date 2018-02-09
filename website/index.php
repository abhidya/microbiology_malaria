<!--OLD PHP
//$hello = 'world';
//$result = shell_exec('/usr/bin/python /var/www/html/microbio/hello.py ' . $hello);
//echo($result);
--> 

<?php



###START bin array parse information###
$binStart = $_GET['binsStart'];
$binEnd = $_GET['binsEnd'];
$probs = $_GET['probs'];

$numbins = count($binStart);

//$binStartStr = "";
$args = "";
$binEndStr = "";
for($i = 0; $i < $numbins; $i++){
	$args .= $binStart[$i] . " " . $binEnd[$i] . " " . $probs[$i] . " ";
	//$binEndStr .= $binEnd[$i] . " ";
}


###START function parse information###
#Grabs the functions information from the form
$functions = $_GET['functionLaw'];
#Gets the number of elements in the array
$numFunctions = count($functions);
$FunStr = "";

#Runs through the functions array and adds the values to a single string to pass to python
for($i = 0; $i < $numFunctions; $i++){
	$args .= $functions[$i] . " ";
}

echo($args);
echo("<br>");

###END function parse information###

$var1 = "hi fh djfh";
$var2 = "second";

#$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$strFun."'");
#$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$var2."'");
$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '" .$args."'");
echo($page);

?>



<html>
 <head>
  <title>PHP Test</title>
 </head>
 <body>
<br><br>
	Test Stuff: 
	<form action="" method="get">
	<p>Bins1 Start: <input type="text" name='binsStart[]' /> Bins End: <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bins2 Start: <input type="text" name='binsStart[]' /> Bins End: <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bins3 Start: <input type="text" name='binsStart[]' /> Bins End: <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<input type="checkbox" name="functionLaw[]" value="powerLaw">Powerlaw<br>
	<input type="checkbox" name="functionLaw[]" value="threshold">Threshold<br> 
	<input type="checkbox" name="functionLaw[]" value="logisticThreshold">Logistic Threshold<br> 
	<br><br>
	<input type="submit" value="Submit">
	</form>
	
</body>
</html>

<!--OLD PHP
//$hello = 'world';
//$result = shell_exec('/usr/bin/python /var/www/html/microbio/hello.py ' . $hello);
//echo($result);
--> 

<?php

###START function parse information###
#Grabs the functions information from the form
$functions = $_GET['functionLaw'];
#Gets the number of elements in the array
$numFunctions = count($functions);
$strFun = "";

#Runs through the functions array and adds the values to a single string to pass to python
for($i = 0; $i < $numFunctions; $i++){
	$strFun .= $functions[$i] . " ";
}
###END function parse information###

###START bin array parse information###
$binStart = $_GET['binsStart'];
$binStartStr = "";
$numBinStart = count($binStart);
for($i = 0; $i < $numBinStart; $i++){
	$binStartStr .= $binStart[$i] . " ";
}

$binEnd = $_GET['binsEnd'];
$binEndStr = "";
$numBinEnd = count($binEnd);
for($i = 0; $i < $numBinEnd; $i++){
	$binEndStr .= $binEnd[$i] . " ";
}

$binProb = $_GET['probs'];
$binProbStr = "";
$numBinProb = count($binProb);
for($i = 0; $i < $numBinProb; $i++){
	$binProbStr .= $binProb[$i] . " ";
}

###END bin array parse information###

#$result = shell_exec('/usr/bin/python /var/www/html/microbio/hello.py ' . $var3 ; $var4);
$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$strFun."'");
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

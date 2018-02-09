<!--OLD PHP
//$hello = 'world';
//$result = shell_exec('/usr/bin/python /var/www/html/microbio/hello.py ' . $hello);
//echo($result);
--> 

<?php
$var1 = $_GET['binsStart'];
$var2 = $_GET['binsEnd'];
$var3 = "test";
$var4 = "test2";

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


###END bin array parse information###

#$result = shell_exec('/usr/bin/python /var/www/html/microbio/hello.py ' . $var3 ; $var4);
$page = shell_exec("/usr/bin/python /var/www/html/microbio/hello.py '".$var1."' '".$strFun."'");
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
	<p>Bins1 Start: <input type="text" name='binsStart1' /> Bins End: <input type="text" name='binsEnd1' />Probibility: <input type="text" name='probs' /></p>
	<input type="checkbox" name="functionLaw[]" value="powerLaw">Powerlaw<br>
	<input type="checkbox" name="functionLaw[]" value="threshold">Threshold<br> 
	<input type="checkbox" name="functionLaw[]" value="logisticThreshold">Logistic Threshold<br> 
	<br><br>
	<input type="submit" value="Submit">
	</form>
	
</body>
</html>

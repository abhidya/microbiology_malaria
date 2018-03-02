<!--OLD PHP
//$hello = 'world';
//$result = shell_exec('/usr/bin/python /var/www/html/microbio/hello.py ' . $hello);
//echo($result);
--> 

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



<html>
 <head>
  <title>PHP Test</title>
 
  <!-- JAVASCRIPT -->
  <script>
    var i = 11;
    function addfields() {
      var e = document.createElement("P");
      e.setAttribute("id", i);
      var t = document.createTextNode("Bin "+ i+": ");
      e.appendChild(t);      
      //Add start bin
      var x = document.createElement("INPUT");
      x.setAttribute("type", "text");
      x.setAttribute("name", "binsStart[]");
      e.appendChild(x);
      //Add "-"
      t = document.createTextNode(" - ");
      e.appendChild(t);
      //Add end bin
      x = document.createElement("INPUT");
      x.setAttribute("type", "text");
      x.setAttribute("name", "binsEnd[]");
      e.appendChild(x);
      //Add "Probability:"
      t = document.createTextNode("Probability: ");
      e.appendChild(t);
      //Add probability
      x = document.createElement("INPUT");
      x.setAttribute("type", "text");
      x.setAttribute("name", "probs[]");
      e.appendChild(x);
      i++;
      document.getElementById("binsform").appendChild(e);        
    }

    function removefields() {
      document.getElementById("binsform").removeChild(document.getElementById(i-1)); 
      i--;
    }
  </script>

  
 </head>
 <body>
<br><br>
	Test Stuff: 
        <div id="binsform">
	<form action="" method="get">

	<p>Bin 1: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 2: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 3: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 4: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 5: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 6: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 7: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 8: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 9: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
	<p>Bin 10: <input type="text" name='binsStart[]' /> - <input type="text" name='binsEnd[]' />Probibility: <input type="text" name='probs[]' /></p>
        </div>
	<button type="button" onclick="addfields()"> ADD Bins </button>
	<button type="button" onclick="removefields()"> Remove Bins </button>
	<br>
	<input type="checkbox" name="functionLaw[]" value="powerLaw">Powerlaw<br>
	<input type="checkbox" name="functionLaw[]" value="threshold">Threshold<br> 
	<input type="checkbox" name="functionLaw[]" value="logisticThreshold">Logistic Threshold<br> 
	<br><br>
	<input type="submit" value="Submit">
	</form>
	
</body>
</html>



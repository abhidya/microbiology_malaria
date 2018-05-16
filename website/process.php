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

$var1 = "hi fh djfh";
$var2 = "second";

#$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$strFun."'");
#$page = shell_exec("/usr/bin/python /var/www/html/website/hello.py '".$var1."' '".$var2."'");
$page = shell_exec("/usr/bin/python3 /var/www/html/website/estimate.py '" .$args."'");
echo($page);

?>

<html>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 
	 <style>
            .center {
       margin: auto;
       width: 100%;
       padding: 10px;
   }
 .container {
   display: flex;
 }
 .container > div {
   flex: 1; /*grow*/
 }
 
       </style> 	
<body>
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
   <a class="navbar-brand" href="index.html">Microbiology Malaria</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
    </button> 
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
     <div class="navbar-nav">
       <a class="nav-item nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>
       <a class="nav-item nav-link" href="example.html">Example Distribution</a>
       <a class="nav-item nav-link" href="custom.html">New Distribution</a>
      <a class="nav-item nav-link disabled" href="#">Disabled</a>
    </div>
  </div>
 </nav>
<br><br>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<canvas id="myChart" width="4" height="4"></canvas>
<script>
//var data = "<?php echo json_encode("42", JSON_HEX_TAG); ?>"; //Don't forget the extra semicolon!
var data2 = [12, 12, 12, 12, 12, 12]; //Don't forget the extra semicolon!
//var data2 = <?php echo $chartData ?>;

//alert(data2);
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: data2,//[12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
</script>
</body>
</html> 




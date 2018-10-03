var i = 1;

function addfields() {
    var e = document.createElement("P");
    e.setAttribute("id", i);
    e.setAttribute("class", "card w-75");
    e.setAttribute("class", "content");
    var t = document.createTextNode("Bin " + i + ": ");
    e.appendChild(t);
    //Add start bin
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("name", 'binsStart[]');
    x.setAttribute("id", "start" + i);
    e.appendChild(x);
    //Add "-"
    t = document.createTextNode(" - ");
    e.appendChild(t);
    //Add end bin
    x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("name", 'binsEnd[]');
    x.setAttribute("id", "end" + i);
    e.appendChild(x);
    //Add "Probability:"
    t = document.createTextNode("Probability %: ");
    e.appendChild(t);
    //Add probability
    x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("name", 'probs[]');
    x.setAttribute("id", "prob" + i);
    e.appendChild(x);
    i++;
    document.getElementById("gen_forms").appendChild(e);
}

function removefields() {
    document.getElementById("gen_forms").removeChild(document.getElementById(i - 1));
    i--;
}

//create bins based on number entered by user
function createbins() {
    var j;
    var number = parseInt(document.getElementById("bincreate").value);
    while (i <= number) {
        addfields();
    }
    // auto fill of the bins
    var val = parseInt(document.getElementById("min").value);
    var step = parseInt(document.getElementById("step").value);

    for (j = 1; j < i; j++) {
        document.getElementById("start" + j).value = val;
        val--;
        val += step;
        //     step = val;
        document.getElementById("end" + j).value = val;
        val++;

    }

}

//check sum of probabilities
function checksum() {
    var sum = 0;
    var j;

    for (j = 1; j < i; j++) {
        sum += parseFloat(document.getElementById("prob" + j).value);
    }

    if (sum > 100) {
        var diff = sum - 100;
        alert("Percentage sum is bigger than 100 by " + diff);
        return false;
    }
    else if (isNaN(sum) || sum < 100) {
        var diff = 100 - sum;
        alert("Percentage sum is smaller than 100 by " + diff);
        return false;
    }
    else return true;
}


function showbins() {
    // document.getElementById("data_entry").style.display = "inline";
    $("#data_entry").show(400);

}


function showgraphs() {
    // document.getElementById("graphs").style.display = "inline";
    $("#graphs").show(400);

}

function hideentry() {
    // document.getElementById("entry").style.display = "none";
    $("#entry").hide(400);

}
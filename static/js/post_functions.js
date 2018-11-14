function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}


document.getElementById('uploadAnchorElem').onclick = function () {
    document.getElementById('uploadAnchorElem').style.display = 'none';
    document.getElementById('selectFiles').style.display = 'block';
    document.getElementById('import').style.display = 'block';

};


document.getElementById('import').onclick = function () {
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
        return false;
    }

    var fr = new FileReader();

    fr.onload = function (e) {
        var result = JSON.parse(e.target.result);
        hideentry();
        console.log(result)


        $.ajax({
            type: 'post',
            url: "/jsoncompute",
            data: result,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                openModal();
            },
            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                // $("#graphs").show(400);

                // $(".bins").hide(100);

                if (data) {
                    all_graphs(data.threshold, data.powerLaw, data.logisticThreshold);
                    subplots(data.threshold, data.logisticThreshold, data.powerLaw);
                    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.download));
                    var dlAnchorElem = document.getElementById('downloadAnchorElem');
                    dlAnchorElem.setAttribute("href", dataStr);
                    dlAnchorElem.setAttribute("download", "parameters.json");
                    dlAnchorElem.setAttribute("style", "display: block;");
                }

            },

            complete: function (data) {
                closeModal();

            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
            },
        });

    }

    fr.readAsText(files.item(0));
};


// $("#graphs").hide();


/*
function powerlaw(data) {
    var trace = {
        x: data,
        type: 'histogram',
            opacity: 0.4,
            marker: {
                color: 'red'
            },
    };
    var data = [trace];
    Plotly.newPlot('powerlaw_probs', data);

}


function treshold(data) {
    var trace = {
        x: data,
        type: 'histogram',
            opacity: 0.4,
            marker: {
                color: 'green'
            },
    };

    var data = [trace];
    Plotly.newPlot('threshold_probs', data);

}


function log_treshold(data) {
    var trace = {
        x: data,
        type: 'histogram',
            opacity: 0.4,
            marker: {
                color: 'blue'
            },
    };
    var data = [trace];
    Plotly.newPlot('logisticthreshold_probs', data);

}
*/

function all_graphs(a, b, c) {
    var trace1 = {
        x: a,
        name: 'Threshold',
        type: "histogram",
        histnorm: 'probability',
        opacity: 0.8,
        marker: {
            color: 'green',
        },
    };
    var trace3 = {
        x: b,
        name: 'Powerlaw',
        type: "histogram",
        histnorm: 'probability',
        opacity: 0.6,
        marker: {
            color: 'red',
        },
    };
    var trace2 = {
        x: c,
        name: 'Logistic Threshold',
        type: "histogram",
        histnorm: 'probability',
        opacity: 0.45,
        marker: {
            color: 'blue'
        },
    };

    var alldata = [trace2, trace1, trace3];
    var layout = {
        showlegend: true,
        legend: {
            bgcolor: '#E8E8E8',
            bordercolor: '#808080',
            borderwidth: 2,
            font: {
                family: 'Courier New, monospace',
                size: 20,
                color: '#000000'
            },
            traceorder: 'reversed',
            orientation: 'h',
            x: 0.1,
            y: 1.12
        },
        xaxis: {
            title: 'Infection Probability per Bite',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000000'
            }
        },
        yaxis: {
            title: 'PDF',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#000000'
            }
        },
        autosize: false,
        width: 800,
        height: 660,
        margin: {
            l: 70,
            r: 50,
            t: 50,
            b: 50,
        },
        barmode: "overlay"
    };
    Plotly.newPlot("allGraphs", alldata, layout);
}

function subplots(x1, x2, x3) {
    var trace1 = {
        x: x1,
        name: "Threshold",
        type: "histogram",
        opacity: 0.8,
        marker: {
            color: 'green'
        },
    };
    var trace2 = {
        x: x2,
        xaxis: 'x2',
        yaxis: 'y2',
        name: "Logistic Threshold",
        type: "histogram",
        opacity: 0.45,
        marker: {
            color: 'blue'
        },
    };
    var trace3 = {
        x: x3,
        xaxis: 'x3',
        yaxis: 'y3',
        name: "Powerlaw",
        type: "histogram",
        opacity: 0.6,
        marker: {
            color: 'red'
        },
    };

    var data = [trace1, trace2, trace3];
    var layout = {
        xaxis: {
            title: "Threshold Model: Infection Probability per Bite"
        },
        xaxis2: {
            title: "Logistic Threshold Model: Infection Probability per Bite"
        },
        xaxis: {
            title: "Powerlaw Model: Infection Probability per Bite"
        },
        yaxis: {
            title: "Number of Runs"
        },
        yaxis2: {
            title: "Number of Runs"
        },
        yaxis3: {
            title: "Number of Runs"
        },
        showlegend: false,
        autosize: false,
        autorange: true,
        rangemode: 'normal',
        width: 650,
        height: 650,
        margin: {
            l: 50,
            r: 50,
            t: 50,
            b: 50,
        },
        grid: {rows: 3, columns: 1, pattern: 'independent', roworder: 'bottom to top'},
    };
    Plotly.newPlot("subs", data, layout);
}


var frm = $('#binsform');

$("body").addClass("loading");

frm.submit(function (e) {

    e.preventDefault();

    $.ajax({
        type: frm.attr('method'),
        url: frm.attr('action'),
        data: frm.serialize(),
        beforeSend: function () {
            openModal();
        },
        success: function (data) {
            console.log('Submission was successful.');
            console.log(data);
            // $("#graphs").show(400);

            // $(".bins").hide(100);

            if (data) {
                all_graphs(data.threshold, data.powerLaw, data.logisticThreshold);
                subplots(data.threshold, data.logisticThreshold, data.powerLaw);
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data.download));
                var dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", "parameters.json");
                dlAnchorElem.setAttribute("style", "display: block;");
            }

        },

        complete: function (data) {
            closeModal();

        },
        error: function (data) {
            console.log('An error occurred.');
            console.log(data);
        },
    });
});


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
                    subplots(data);
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


function all_graphs(a, b, c) {
    var trace1 = {
        x: a,
        name: 'Threshold',
        type: "histogram",
        histnorm: 'probability',
        opacity: 0.5,
        marker: {
            color: 'green',
        },
    };
    var trace3 = {
        x: b,
        name: 'Powerlaw',
        type: "histogram",
        histnorm: 'probability',
        opacity: 0.45,
        marker: {
            color: 'red',
        },
    };
    var trace2 = {
        x: c,
        name: 'Logistic Threshold',
        type: "histogram",
        histnorm: 'probability',
        opacity: 0.6,
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

function subplots(incomming_data) {
    var trace1 = {
        x: incomming_data.threshold,
        xaxis: 'x',
        yaxis: 'y',
        name: "Threshold",
        type: "histogram",
        opacity: 0.5,
        marker: {
            color: 'green'
        },
    };
    var trace2 = {
        x: incomming_data.logisticThreshold,
        xaxis: 'x2',
        yaxis: 'y2',
        name: "Logistic Threshold",
        type: "histogram",
        opacity: 0.6,
        marker: {
            color: 'blue'
        },
    };
    var trace3 = {
        x: incomming_data.powerLaw,
        xaxis: 'x3',
        yaxis: 'y3',
        name: "Powerlaw",
        type: "histogram",
        opacity: 0.45,
        marker: {
            color: 'red'
        },
    };

    var data = [trace1, trace2, trace3];
    var layout = {
        annotations: [
            {
                x: incomming_data.threshold_median,
                y: 0,
                xref: 'x',
                yref: 'y',
                text: 'Median',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.logisticThreshold_probs_median,
                y: 0,
                xref: 'x2',
                yref: 'y2',
                text: 'Median',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.powerLaw_median,
                y: 0,
                xref: 'x3',
                yref: 'y3',
                text: 'Median',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.threshold_higher,
                y: 0,
                xref: 'x',
                yref: 'y',
                text: '97.5%',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.logisticThreshold_probs_higher,
                y: 0,
                xref: 'x2',
                yref: 'y2',
                text: '97.5%',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.powerLaw_higher,
                y: 0,
                xref: 'x3',
                yref: 'y3',
                text: '97.5%',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.threshold_lower,
                y: 0,
                xref: 'x',
                yref: 'y',
                text: '2.5%',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.logisticThreshold_probs_lower,
                y: 0,
                xref: 'x2',
                yref: 'y2',
                text: '2.5%',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
            {
                x: incomming_data.powerLaw_lower,
                y: 0,
                xref: 'x3',
                yref: 'y3',
                text: '2.5%',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40
            },
        ],
        xaxis3: {
            title: "Infection Probability per Bite (Powerlaw Model)",
            titlefont: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#000000'
            }
        },
        xaxis2: {
            title: "Infection Probability per Bite (Logistic Threshold Model)",
            titlefont: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#000000'
            }
        },
        xaxis: {
            title: "Infection Probability per Bite (Threshold Model)",
            titlefont: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#000000'
            }
        },
        yaxis: {
            title: "Number of Runs",
            titlefont: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#000000'
            }
        },
        yaxis2: {
            title: "Number of Runs",
            titlefont: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#000000'
            }
        },
        yaxis3: {
            title: "Number of Runs",
            titlefont: {
                family: 'Courier New, monospace',
                size: 14,
                color: '#000000'
            }
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
                subplots(data);
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


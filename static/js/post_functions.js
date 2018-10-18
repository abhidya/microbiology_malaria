function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}

// $("#graphs").hide();



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

function all_graphs(a, b, c){
             var trace1 = {
                x: a,
                name: 'Threshold',
                type: "histogram",
                    histnorm: 'probability',
                    opacity: 0.4,
                    marker: {
                        color: 'green'
                    },
            };
             var trace2 = {
                x: b,
                name: 'Powerlaw',
                type: "histogram",
                    histnorm: 'probability',
                    opacity: 0.4,
                    marker: {
                        color: 'red'
                    },
            };
             var trace3 = {
                x: c,
                name: 'Logistic Threshold',
                type: "histogram",
                    histnorm: 'probability',
                    opacity: 0.4,
                    marker: {
                        color: 'blue'
                    },
            };

            var alldata = [trace1, trace2, trace3];
            var layout = {
                title: 'Model Comparison',
                xaxis: {
                    title: 'Infection Probability per Bite',
                    titlefont: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
                yaxis: {
                    title: 'PDF',
                    titlefont: {
                        family: 'Courier New, monospace',
                        size: 18,
                        color: '#7f7f7f'
                    }
                },
                autosize: false,
                width: 700,
                height: 800,
                barmode: "overlay"
            };
            Plotly.newPlot("allGraphs", alldata, layout);
}

function subplots(x1, x2, x3){
            var trace1 = {
                x: x1,
                name: 'Threshold',
                type: "histogram",
                    opacity: 0.4,
                    marker: {
                        color: 'green'
                    },
            };
            var trace2 = {
                x: x2,
                name: 'Powerlaw',
                xaxis: 'x2',
                yaxis: 'y2',
                type: "histogram",
                    opacity: 0.4,
                    marker: {
                        color: 'red'
                    },
            };
            var trace3 = {
                x: x3,
                name: 'Logistic Threshold',
                xaxis: 'x3',
                yaxis: 'y3',
                type: "histogram",
                    opacity: 0.4,
                    marker: {
                        color: 'blue'
                    },
            };

            var data = [trace1, trace2, trace3];
            var layout = {
                autosize: false,
                width: 700,
                height: 800,
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

           // alert(data);
           /*
            if (data.threshold != null) {
                treshold(data.threshold);
                $("#threshold_probs_container_h1").text("threshold_probs_container_h1");
                // $("#powerlaw_probs_container").show(400);

            }
            if (data.powerLaw != null) {
                powerlaw(data.powerLaw);
                $("#powerlaw_probs_container_h1").text("powerlaw_probs_container_h1");
                // $("#threshold_probs_container").show(400);

            }
            if (data.logisticThreshold != null) {
                log_treshold(data.logisticThreshold);
                $("#logisticthreshold_probs_container_h1").text("logisticthreshold_probs_container_h1");

            }
            */
            if(data){
                all_graphs(data.threshold, data.powerLaw, data.logisticThreshold);
                subplots(data.threshold, data.powerLaw, data.logisticThreshold);
                $("#allGraphs_container_h1").text("allGraphs_container_h1");
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


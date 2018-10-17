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
    };
    var data = [trace];
    Plotly.newPlot('powerlaw_probs', data);

}


function treshold(data) {
    var trace = {
        x: data,
        type: 'histogram',
    };

    var data = [trace];
    Plotly.newPlot('threshold_probs', data);

}


function log_treshold(data) {
    var trace = {
        x: data,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('logisticthreshold_probs', data);

}

function all_graphs(x1, x2, x3){
             var trace1 = {
                x: x1,
                type: "histogram",
                opacity: 0.4,
                marker: {
                    color: 'green',
                },
            };
             var trace2 = {
                x: x2,
                type: "histogram",
                opacity: 0.5,
                marker: {
                    color: 'blue',
                },
            };
             var trace3 = {
                x: x3,
                type: "histogram",
                opacity: 0.6,
                marker: {
                    color: 'red',
                },
            };

            var alldata = [trace1, trace2, trace3];
            var layout = {barmode: "overlay"};
            Plotly.newPlot("allGraphs", alldata, layout);
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


            var x1 = data.threshold;
            var x2 = data.powerLaw;
            var x3 = data.logisticThreshold;

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
                // $("#logisticthreshold_probs_container").show(400);
                all_graphs(x1, x2, x3);
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


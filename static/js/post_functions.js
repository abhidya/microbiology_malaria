function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}

// $("#graphs").hide();

var layout = {
    autosize: false,
    width: 250,
    height: 500,
};

function powerlaw(data) {
    var trace = {
        x: data,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('powerlaw_probs', data, layout);

}


function treshold(data) {
    var trace = {
        x: data,
        type: 'histogram',
    };

    var data = [trace];
    Plotly.newPlot('threshold_probs', data, layout);

}


function log_treshold(data) {
    var trace = {
        x: data,
        type: 'histogram',
    };
    var data = [trace];
    Plotly.newPlot('logisticthreshold_probs', data, layout);

}

function all_graphs(data1, data2, data3){
            var trace1 = {
                x: data1,
                type: "histogram",
                opacity: 0.4,
                marker: {
                    color: 'green',
                },
            };
             var trace2 = {
                x: data2,
                type: "histogram",
                opacity: 0.5,
                marker: {
                    color: 'blue',
                },
            };
             var trace3 = {
                x: data3,
                type: "histogram",
                opacity: 0.6,
                marker: {
                    color: 'red',
                },
            };

            var alldata = [trace1, trace2, trace3];
            var layout = {barmode: "overlay"};
            Plotly.newPlot("allGraphs, alldata, layout");
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

            }
            if True:
                all_graphs(data.threshold, data.powerLaw, data.logisticThreshold);
                $("#allgraphs_container_h1").text("allgraphs_container_h1");


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


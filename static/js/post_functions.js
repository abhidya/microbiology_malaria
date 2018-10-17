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

function all_graphs(a, b, c){
             var trace1 = {
                x: a,
                type: "histogram",
            };
             var trace2 = {
                x: b,
                type: "histogram",
            };
             var trace3 = {
                x: c,
                type: "histogram",
            };

            var alldata = [trace1];
          //  var layout = {
           //     grid: {rows: 2, columns: 2, pattern: 'independent'},
           // };
            Plotly.newPlot("allGraphs", alldata);
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
            /*
            var x1 = [];
            var x2 = [];
            var x3 = [];




            if (data.threshold != null) {
                x1 = data.threshold;
                //treshold(data.threshold);
                $("#threshold_probs_container_h1").text("threshold_probs_container_h1");
                // $("#powerlaw_probs_container").show(400);

            }
            if (data.powerLaw != null) {
                x2 = data.powerLaw;
               // powerlaw(data.powerLaw);
                $("#powerlaw_probs_container_h1").text("powerlaw_probs_container_h1");
                // $("#threshold_probs_container").show(400);

            }
            if (data.logisticThreshold != null) {
                x3 = data.logisticThreshold;
                //log_treshold(data.logisticThreshold);
                $("#logisticthreshold_probs_container_h1").text("logisticthreshold_probs_container_h1");

            }
            */

            if(data.threshold != null && data.powerLaw != null && data.logisticThreshold != null){
                all_graphs(data.threshold, data.powerLaw, data.logisticThreshold);
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


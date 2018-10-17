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
    width: 100,
    height: 500,
};

function powerlaw(data) {
    var trace = {
        x: data,
        type: 'histogram',
        opacity: 0.5,
        marker: {
            color: 'green',
        },
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
                $("#allgraphs_container_h1").text("allgraphs_container_h1");
                // $("#logisticthreshold_probs_container").show(400);

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


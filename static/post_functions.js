

function openModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}


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

            // $(".bins").hide(100);
            if (data.threshold != null) {
                treshold(data.threshold);
            }
            if (data.powerLaw != null) {
                powerlaw(data.powerLaw);
            }
            if (data.logisticThreshold != null) {
                log_treshold(data.logisticThreshold);
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


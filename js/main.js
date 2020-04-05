$(document).ready(function () {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);

    var dataIniziale = moment('2018-01-01');
    var meseIniziale = dataIniziale.month();
    stampaGiorniMese(dataIniziale);
    stampaFestivi(meseIniziale);

    $('.mese-succ').click(function () {
        dataIniziale.add(1, 'month');
        var meseAttuale = dataIniziale.month();
        stampaGiorniMese(dataIniziale);
        stampaFestivi(meseAttuale);
    });

    $('.mese-prec').click(function () {
        dataIniziale.subtract(1, 'month');
        var meseAttuale = dataIniziale.month();
        stampaGiorniMese(dataIniziale);
        stampaFestivi(meseAttuale);
    });

    function stampaFestivi(meseAttuale) {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: meseAttuale
            },
            success: function (data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('#calendar li[data-day="' + dataFestivo + '"]').addClass('festivo').append(' - ' + nomeFestivo);
                }
            },
            error: function (err) {
                alert ('errore');
            }
        });
    }

    function stampaGiorniMese(meseDaStampare) {
        $('#calendar').empty();
        var annoDaStampare = meseDaStampare.year();
        if (annoDaStampare == 2018) {
            var standardDay = meseDaStampare.clone();
            var giorniMese = meseDaStampare.daysInMonth();
            var nomeMese = meseDaStampare.format('MMMM');
            $('#nome-mese').text(nomeMese);
            for (var i = 1; i <= giorniMese; i++) {
                var giornoDaInserire = {
                    day: i + ' ' + nomeMese,
                    dataDay: standardDay.format('YYYY-MM-DD')
                }
                var templateFinale = templateGiorno(giornoDaInserire);
                $('#calendar').append(templateFinale);
                standardDay.add(1, 'day');
            }
        } else {
            $('.container').empty();
            alert("L'api, purtroppo, funziona solo per il 2018. Ricarica la pagina.");
        }
    }

});

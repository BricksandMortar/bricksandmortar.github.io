function toggleForm() {
    var form = $('#contact_form');
    var state = form.is(":visible");
    form.fadeToggle(600);
    if (form.hasClass('hidden'))
        form.removeClass('hidden');
    if (state) {
        $('#formButton').text("Okay, I'm interested");
    } else {
        $('#formButton').text("Nevermind");
    }
};

window.toggleForm = toggleForm;

function mobileRates() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
        $('.rates').attr('href', '#rates');
    }
};

function setupCoverChevron() {
    $('#chevron-down').click(function () {
        var isMobile = window.matchMedia("only screen and (max-width: 760px)");
        if (!(isMobile.matches)) {
                $(window).scrollTo(document.getElementById("content-top"), 200);
        }
    });
};

$(function() {
    $.getJSON('https://free.currencyconverterapi.com/api/v5/convert?q=USD_GBP&compact=ultra')
        .done(function(data) {
            $('#gbp-rate').text((parseInt($('#usd-rate').text()) * data.USD_GBP).toFixed(2))
        });
});

jQuery( document ).ready(function() {
    mobileRates();
    setupCoverChevron();
  });

jQuery(function($) {
    $("#contact_form").submit(function() {
        if ($("#check").val() != '')
            return false;
        $.ajax({
            url: "https://formspree.io/arran@bricksandmortarstudio.com",
            method: "POST",
            data: {
                email: $("#email").val(),
                name: $("#name").val(),
                message: $("#msg").val()
            },
            dataType: "json"
        });
        $('#contact_form').fadeToggle(300);
        $("#formButton").text("Thanks.").delay(2000).fadeOut(400);
        return false; // prevent page refresh
    });
});

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
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (!(isMobile.matches)) {
        $('#chevron-down').click(function () {
            $(window).scrollTo(document.getElementById("content-top"), 200);
        });
    }
};

$(function() {
    $.getJSON('https://api.fixer.io/latest?base=USD&symbols=GBP&callback=?')
        .done(function(data) {
            $('#gbp-rate').text((parseInt($('#usd-rate').text()) * data.rates.GBP).toFixed(2))
        });
});

jQuery( document ).ready(function() {
    console.log('Confirm');
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

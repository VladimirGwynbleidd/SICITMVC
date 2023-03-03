$(document).ready(function () {



});

async function iniciarSesion() {
    var urlString = '';

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "show",
        "hideMethod": "hide"
    }


    if ($("#formSesion").valid()) {

        urlString = '/Login/IniciarSesion/';

        var args = {
            "pass": $("#Password").val(),
            "user": $("#IdUser").val()
        }

        return await $.ajax({
            contentType: 'application/json',
            url: urlString,
            data: JSON.stringify(args),
            dataType: 'json',
            type: 'POST'
        }).then(function (response) {

            if (response.Exito == "false") {
                resetControls();
                toastr.error(response.Mensaje).css("width", "250px");
            } else {
                if (response.PrimeraSesion == 0) {
                    window.location.href = '/Home/Index/';
                }
                else {
                    window.location.href = '/CambiarPassword/CambiarPasswordIndex/';
                }
            }
        });

    }
}

function resetControls() {
    $("#Password").val("");
    $("#IdUser").val("");
}

$().ready(function () {

    $("#formSesion").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {

            Password: { required: true },
            IdUser: { required: true },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        messages: {
            IdUser: { required: "Ingrese el Usuario" },
            Password: { required: "Ingrese su Contraseña" },

        }

    });


});




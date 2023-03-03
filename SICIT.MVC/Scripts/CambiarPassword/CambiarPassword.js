$(document).ready(function () {

    cambiarPassword();
});

async function cambiarPassword() {
    var urlString = '';
    urlString = '/CambiarPassword/CambiarPassword/';

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


    if ($("#txtCambiarPasswordUno").val() === $("#txtCambiarPasswordDos").val() || $("#txtCambiarPasswordDos").val() === $("#txtCambiarPasswordUno").val()) {

        var args = {
            "pass": $("#txtCambiarPasswordUno").val(),
        }

        return await $.ajax({
            contentType: 'application/json',
            url: urlString,
            data: JSON.stringify(args),
            dataType: 'json',
            type: 'POST'
        }).then(function (response) {

            if (response.Exito == false) {
                resetControls();
                toastr.error(response.Mensaje).css("width", "250px");
            } else {
                window.location.href = '/Home/Index';
            }
        });

    }
    else {
        toastr.error("Las contraseñas no coincide").css("width", "250px");
    }

}


$().ready(function () {


    //$.validator.addMethod("txtCambiarPasswordUno", function (value, element) {
    //    return $("#txtCambiarPasswordUno").val() === $("#txtCambiarPasswordDos").val() || $("#txtCambiarPasswordDos").val() === $("#txtCambiarPasswordUno").val()
    //}, "La contraseña no coincide");


    $("#formCambiarPassword").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        rules: {
            txtCambiarPasswordUno: { required: true },
            txtCambiarPasswordDos: { required: true },
        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        messages: {
            txtCambiarPasswordUno: { required: "Ingrese su Contraseña" },
            txtCambiarPasswordDos: { required: "Ingrese su Contraseña" },
        }

    });
});
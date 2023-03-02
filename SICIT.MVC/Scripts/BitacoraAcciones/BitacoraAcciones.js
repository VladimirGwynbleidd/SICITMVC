
$(document).ready(function () {


    $("#IDFechaIni").datepicker({
        dateFormat: "dd-mm-yy"
    });
});

async function ConsultarBitacoraAcciones() {

    if (!($('#formBitacoraAcciones').valid())) return false;


    var url = '';
    var argsFolios = '';

    var date = $('#IDFechaIni').val().split('/');
    date = date[1] + '-' + date[0] + '-' + date[2];



    /*alert(date)*/
    //return;

    argsFolios = {
        fecha_inicial: $('#IDFechaIni').val(),
        fecha_final: $('#IDFechaFin').val(),
        USUARIO: "",
        EVENTO: "",
    };
    url = 'http://localhost:6435/Api/BitacoraAcciones/GetBitacoraAcciones';
    //url = $("#FQDN").val() + 'api/SICOD/GetFoliosSicod';

    try {
        response = await fetchDataAsyncTableBitacoraAcciones(url, 'POST', JSON.stringify(argsFolios));
        console.log(response)
    } catch (error) {
        console.log(error);
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function FiltrarSICOD() {


}


async function fetchDataAsyncTableBitacoraAcciones(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType,
        beforeSend: function () {
            $('#btnFiltroSICOD').attr('disabled', 'disabled').prepend('<i class="fa fa-refresh fa-spin"></i> ');
        },
        complete: function () {
            $('#btnFiltroSICOD').removeAttr('disabled').find('i.fa').remove();
        }
    }).then(function (response) {
        var table = $('#dataTableBitacoraAcciones').DataTable({
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
                "infoEmpty": "Mostrando 0 to 0 of 0 Registros",
                "infoFiltered": "(Filtrado de _MAX_ total registros)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Registros",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            destroy: true,
            data: response,
            sort: true,
            searching: true,
            responsive: true,
            pagination: "bootstrap",
            scrollCollapse: true,

            scrollX: true,
            columns: [
                { 'data': 'USUARIO', className: "uniqueClassName" },
                { 'data': 'EVENTO', className: "uniqueClassName" },
                { 'data': 'fecha_actividad', className: "uniqueClassName" },


            ],

            //columnDefs: [
            //    { className: "dt-left", targets: [6] },
            //    { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14] }
            //]
        });

        $('.filter-input').keyup(function () {
            table.column($(this).data('column'))
                .search($(this).val())
                .draw();
        });

    });
}




$().ready(function () {

    $.validator.addMethod('sintaxisFechaFormato', function (value) {
        var isValid = value.match(/^\d{4}\-\d{2}\-\d{2}$/);

        if (isValid)
            return true;
        else
            return false;

    }, 'Ingrese una fecha con el formato dd/mm/aaaa');


    $.validator.addMethod("sintaxisFechaMayorHoy", function (value, element) {
        var isValid = value.match(/^\d{4}\-\d{2}\-\d{2}$/);

        if (element.id == 'IDFecha' && IDFecha.value == '' && isValid == null) {
            return true;
        }

        if (isValid) {
            var datetime = value;
            var date = new Date();
            var parts = datetime.split('-');
            var day = parseInt(parts[2]);
            var month = parseInt(parts[1]) - 1;
            var year = parseInt(parts[0]);
            var maxyear = date.getFullYear();
            var maxDay = date.getDate();
            var maxMonth = date.getMonth();
            var enteredDate = new Date(year, month, day);
            var maxDate = new Date(maxyear, maxMonth, maxDay);

            if (enteredDate <= maxDate) {
                isValid = true;
            }
            else {
                isValid = false;
            }
        }
        return isValid;
    }, "La fecha ingresada no puede ser mayor a la fecha actual");


    $("#formBitacoraAcciones").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {

            IDFechaIni: "required",
            IDFechaFin: "required",


            IDFechaIni: {
                sintaxisFechaFormato: true,
                sintaxisFechaMayorHoy: true,
                required: true,
                minlength: 10,
                maxlength: 10
            },

            IDFechaFin: {
                sintaxisFechaFormato: true,
                sintaxisFechaMayorHoy: true,
                required: true,
                minlength: 10,
                maxlength: 10
            }


        },

        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },

        messages: {

            IDFechaIni: {
                required: "Por favor ingresa la fecha de inicio",
                minlength: "La fecha es de 10 caracteres",
                maxlength: "La fecha es de 10 caracteres"
            },

            IDFechaFin: {
                required: "Por favor ingresa la fecha fin",
                minlength: "La fecha es de 10 caracteres",
                maxlength: "La fecha es de 10 caracteres"
            }


        }

    });

});
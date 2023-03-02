$(document).ready(function () {

    //GetAllAreas();
    GetTipoConsultas();
    
});


async function GetTipoConsultas() {


    var url = '';

    //url = $("#FQDN").val() + 'api/Entidades/GetEntidades';
    url = 'http://localhost:6435/Api/Consultas/GetTipoConsultas';


    try {
        response = await fetchTipoConsultasAsync('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchTipoConsultasAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Tipo de Consulta</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_PAQUETE + '">' + response[i].DESC_PAQUETE + '</option>';
        }
        $("#IdSelectedTipoConsulta").html(s);
    });
}

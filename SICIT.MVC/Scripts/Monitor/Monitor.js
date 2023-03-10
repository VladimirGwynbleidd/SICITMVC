$(document).ready(function () {
    //GetAllDataMonitorTodos();
    GetAllDataMonitorSinRevisar();

});

async function GetAllDataMonitorTodos() {

    CardStylesOne();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Monitor/GetMonitor';

    try {

        //response = await fetchDataAsyncTable('' + url + '', 'POST', { "USUARIO": "sar", "REVISADO": "-1", "NUM_FOLIO": "332" });
        response = await fetchDataAsyncTableTodos('' + url + '', 'POST', { "USUARIO": "sar", "REVISADO": "-1" });
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableTodos(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: JSON.stringify(args),
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableMonitorTodos').DataTable({
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
            select: true,
            destroy: true,
            data: response,
            sort: true,
            searching: true,
            responsive: true,
            pagination: "bootstrap",
            columns: [
                /*       { 'data': ''},*/
                { 'data': 'NUM_FOLIO', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'ID_PAQUETE', className: "text-center" },
                { 'data': 'FECH_INI_OPER', className: "uniqueClassName", "visible": true },
                { 'data': 'FECH_FIN_OPER', className: "text-left" },
                { 'data': 'FECH_PROP_TERM', className: "uniqueClassName", "visible": true },
                //{ 'data': 'ID_ESTATUS', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        switch (row.ID_ESTATUS) {
                            case 0:
                                return '<a title="Editar" href="#" onclick="getReporte(' + row.NUM_FOLIO + ')"><i style="color:green" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                            case 1:
                                return '<i style="color:yellow" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                            case 2:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                        }

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ],

        });
    });
}


async function GetAllDataMonitorSinRevisar() {

    CardStylesTwo();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Monitor/GetMonitor';

    try {

        //response = await fetchDataAsyncTable('' + url + '', 'POST', { "USUARIO": "sar", "REVISADO": "-1", "NUM_FOLIO": "332" });
        response = await fetchDataAsyncTableSinRevisar('' + url + '', 'POST', { "USUARIO": "sar", "REVISADO": "0" });
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}

async function fetchDataAsyncTableSinRevisar(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: JSON.stringify(args),
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableSinRevisar').DataTable({
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
            select: true,
            destroy: true,
            data: response,
            sort: true,
            searching: true,
            responsive: true,
            pagination: "bootstrap",
            columns: [
                /*       { 'data': ''},*/
                { 'data': 'NUM_FOLIO', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'ID_PAQUETE', className: "text-center" },
                { 'data': 'FECH_INI_OPER', className: "uniqueClassName", "visible": true },
                { 'data': 'FECH_FIN_OPER', className: "text-left" },
                { 'data': 'FECH_PROP_TERM', className: "uniqueClassName", "visible": true },
                //{ 'data': 'ID_ESTATUS', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {

                        var btnPDF = '<a title="Ver Archivo" href="#" onclick="DescargarArchivo(' + row.NUM_FOLIO + ',' + row.ID_PAQUETE + ')"><i style="color:red" class="fas fa-duotone fa-file-pdf fa-lg"></i></a>';

                        var circleGreen = '<a title="Concluido"><i style="color:green" class="fas fa-solid fa-circle fa-lg"></i></a>';

                        switch (row.ID_ESTATUS) {
                            case 0:
                                return circleGreen + ' | ' + btnPDF;
                                break;
                            case 1:
                                return '<i style="color:blue" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                            case 2:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                        }

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ],

        });
    });
}


async function GetAllDataMonitorHistorial() {

    CardStylesThree();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Monitor/GetMonitor';

    try {

        //response = await fetchDataAsyncTable('' + url + '', 'POST', { "USUARIO": "sar", "REVISADO": "-1", "NUM_FOLIO": "332" });
        response = await fetchDataAsyncTableHistorial('' + url + '', 'POST', { "USUARIO": "sar", "REVISADO": "1" });
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}

async function fetchDataAsyncTableHistorial(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: JSON.stringify(args),
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableMonitorHistorial').DataTable({
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
            select: true,
            destroy: true,
            data: response,
            sort: true,
            searching: true,
            responsive: true,
            pagination: "bootstrap",
            columns: [
                /*       { 'data': ''},*/
                { 'data': 'NUM_FOLIO', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'ID_PAQUETE', className: "text-center" },
                { 'data': 'FECH_INI_OPER', className: "uniqueClassName", "visible": true },
                { 'data': 'FECH_FIN_OPER', className: "text-left" },
                { 'data': 'FECH_PROP_TERM', className: "uniqueClassName", "visible": true },
                //{ 'data': 'ID_ESTATUS', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        switch (row.ID_ESTATUS) {
                            case 0:
                                return '<a title="Editar" href="#" onclick="getReporte(' + row.NUM_FOLIO + ')"><i style="color:green" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                            case 1:
                                return '<i style="color:blue" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                            case 2:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i></a>';
                                break;
                        }

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ],

        });
    });
}




function DescargarArchivo(idFolio, idPaquete) {

    var formato = 'pdf';

    argsMonitor = {
        NUM_FOLIO: idFolio,
        ID_PAQUETE: idPaquete
    };

    $.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        url: '/Monitor/ObtenerArchivoConcluido',
        data: JSON.stringify(argsMonitor),
        success: function (response) {

            if (response.Exito) {

                var dato = response.ResponseDataEnumerable[0];

                var respuesta = dato.G_DOC_ARCHIVO_BASE64;
                var nombreArchivo = dato.T_DSC_ARCHIVO;

                const blob = base64ToBlob(respuesta, formato);
                guardarArchivo(blob, nombreArchivo);

            }
            else {
                toastr.error(response.Mensaje, 'Monitor');
            }
        },
        error: function (error) {
            console.log(error.statusText);
            toastr.error('Ocurrió un error al extraer el archivo', 'Monitor')
        }
    });
};

function base64ToBlob(base64, type = "application/pdf") {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
}

function guardarArchivo(blob, filename) {

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        const a = document.createElement('a');
        document.body.appendChild(a);
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
    }
}


function getReporte(data) {

    $.ajax({
        url: '/Monitor/GetReport',
        type: 'GET',
        data: { "numFolio": data },
        success: function (result) {
            //if (result == "Success") {
            //    location.href = '@Url.Action("DownloadCSV", "ControllerName")';
            //}
        }
    });

}
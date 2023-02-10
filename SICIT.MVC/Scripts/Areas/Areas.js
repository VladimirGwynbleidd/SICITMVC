$(document).ready(function () {

    GetAllAreas();
});




async function GetAllAreas() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Areas/GetAreas';

    try {
        response = await fetchDataAsyncTableAreas('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableAreas(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableAreas').DataTable({
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
            columns: [
                { 'data': 'ID_AREA', className: "uniqueClassName" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "uniqueClassName" },
                { 'data': 'SIGLAS_ENT', className: "uniqueClassName" },

                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'CVE_ID_ENTAS', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6] }
            ]
        });
    });
}



async function GetAllDataAreasVigentes() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Areas/GetTipoAreasVigentes';

    try {
        response = await fetchDataAsyncTableAreasVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableAreasVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableAreasVigentes').DataTable({
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
            columns: [
                { 'data': 'ID_AREA', className: "uniqueClassName" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "uniqueClassName" },
                { 'data': 'SIGLAS_ENT', className: "uniqueClassName" },

                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'CVE_ID_ENTAS', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6] }
            ]
        });
    });
}



async function GetAllDataAreasHistorial() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Areas/GetTipoAreasHistorial';

    try {
        response = await fetchDataAsyncTableAreasHistorial('' + url + '', 'GET', {});
        console.log(response)
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableAreasHistorial(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableAreasHistorial').DataTable({
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
            columns: [
                { 'data': 'ID_AREA', className: "uniqueClassName" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "uniqueClassName" },
                { 'data': 'SIGLAS_ENT', className: "uniqueClassName" },

                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'CVE_ID_ENTAS', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6] }
            ]
        });
    });
}


function OpenModalAddUpdateEntidades(CVE_ID_ENT, DESC_ENT, SIGLAS_ENT, ID_T_ENT) {

    if (CVE_ID_ENT != 0) {
        $("#ModalCenterTitle").html('Editar Entidad');
        $("#ModalCenterTitleH6").html('Editar Entidad');

    }
    else {
        $("#ModalCenterTitle").html('Registrar Entidad');
        $("#ModalCenterTitleH6").html('Registrar Entidad');

        //ResetControls();
    }


    $('#ModalAddUpdateUsuarios').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdateUsuarios').modal('show');

}


function CloseModalAddUpdateUsuarios() {
    //$("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdateUsuarios").modal('hide');
    //$("#frmAddUpdateUsuario").data('validator').resetForm();
}


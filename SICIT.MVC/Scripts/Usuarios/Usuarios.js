$(document).ready(function () {

    GetAllDataUsuarios();
    GetAllTipoEntidades();
});


async function GetAllTipoEntidades() {

    var url = '';

    //url = $("#FQDN").val() + 'api/Entidades/GetEntidades';
    url = 'http://localhost:6435/Api/Entidades/GetTipoEntidades';


    try {
        response = await fetchPerfilesAsync('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchPerfilesAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Tipo de Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESC_T_ENT + '</option>';
        }
        $("#IdSelectedTipoEntidad").html(s);
    });
}


async function GetAllDataUsuarios() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/usuarios/getusuarios';

    try {
        response = await fetchDataAsyncTableUsuarios('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableUsuarios(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableUsuarios').DataTable({
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
                { 'data': 'USUARIO', className: "uniqueClassName" },
                {
                    data: 'NOMBRES', render: function (data, type, row) {
                        return row.NOMBRES + ' ' + row.APELLIDO_PATERNO + ' ' + row.APELLIDO_MATERNO;
                    },
                },

                //{ 'data': 'NOMBRES', className: "uniqueClassName" },
                //{ 'data': 'APELLIDO_PATERNO', className: "text-left" },
                //{ 'data': 'APELLIDO_MATERNO', className: "text-left" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" }, 
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}



async function GetAllDataUsuariosVigentes() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/usuarios/GetUsuariosVigentes';

    try {
        response = await fetchDataAsyncTableUsuariosVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableUsuariosVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableUsuariosVigentes').DataTable({
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
                { 'data': 'USUARIO', className: "uniqueClassName" },
                {
                    data: 'NOMBRES', render: function (data, type, row) {
                        return row.NOMBRES + ' ' + row.APELLIDO_PATERNO + ' ' + row.APELLIDO_MATERNO;
                    },
                },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}



async function GetAllDataUsuariosHistorial() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/usuarios/GetUsuariosHistorial';

    try {
        response = await fetchDataAsyncTableUsuariosHistorial('' + url + '', 'GET', {});
        console.log(response)
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableUsuariosHistorial(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableUsuariosHistorial').DataTable({
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
                { 'data': 'USUARIO', className: "uniqueClassName" },
                {
                    data: 'NOMBRES', render: function (data, type, row) {
                        return row.NOMBRES + ' ' + row.APELLIDO_PATERNO + ' ' + row.APELLIDO_MATERNO;
                    },
                },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
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


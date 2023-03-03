$(document).ready(function () {
    hiddenControls();
    disabledDDL();
    GetAllDataUsuariosVigentes();
    GetAllTipoEntidades();

});

function resetControls() {
    disabledDDL();
    $("#IDNombre").val("");
    $("#IDApellidoPaterno").val("");
    $("#IDApellidoMaterno").val("");
    $("#IDTelefono").val("");
    $("#IDEMail").val("");
    $("#IdInputUsuario").val("");
}

function disabledDDL() {
    $("#IdSelectedEntidad").attr('disabled', true);
    $("#IdSelectedEntidad").val("-1");
    $('#IdSelectedArea').attr('disabled', true);
    $('#IdSelectedArea').val("-1");
    $('#IdSelectedPerfil').attr('disabled', true);
    $('#IdSelectedPerfil').val("-1");
    $('#IdSelectedPuesto').attr('disabled', true);
    $('#IdSelectedPuesto').val("-1");
}


function hiddenControls() {

    $("#IdSelectedTipoEntidadHidden").attr('hidden', true);
    $("#IdSelectedTipoEntidad").attr('hidden', false);

    $("#IdSelectedEntidadHidden").attr('hidden', true);
    $("#IdSelectedEntidad").attr('hidden', false);

    $("#IdSelectedAreaHidden").attr('hidden', true);
    $("#IdSelectedArea").attr('hidden', false);

    $("#IdSelectedPuestoHidden").attr('hidden', true);
    $("#IdSelectedPuesto").attr('hidden', false);

    $("#IdSelectedPerfilHidden").attr('hidden', true);
    $("#IdSelectedPerfil").attr('hidden', false);

    $("#chbReestablecerPassword").attr('hidden', true);
    $("#labelChbReestablecerPassword").attr('hidden', true);
}


function changeEventHandlerTipoEntidad(event) {

    var id = event.target.value;

    if (id == "-1") {

        $("#IdSelectedEntidad").attr('disabled', true);
        $("#IdSelectedEntidad").val("-1");
        $('#IdSelectedArea').attr('disabled', true);
        $('#IdSelectedArea').val("-1");
        $('#IdSelectedPerfil').attr('disabled', true);
        $('#IdSelectedPerfil').val("-1");
        $('#IdSelectedPuesto').attr('disabled', true);
        $('#IdSelectedPuesto').val("-1");
        return;
    }

    $("#IdSelectedEntidad").attr('disabled', false);
    $('#IdSelectedEntidad').val("-1");

    GetEntidadId(id);
}

async function GetAllTipoEntidades() {

    var url = '';

    //url = $("#FQDN").val() + 'api/Entidades/GetEntidades';
    url = 'http://localhost:6435/Api/Entidades/GetTipoEntidades';


    try {
        response = await fetchTipoEntidadesAsync('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}

async function fetchTipoEntidadesAsync(urlString, methodType, args) {

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

async function GetEntidadId(idTipoEntidad) {

    var url = '';

    argsEntidades = {

        CVE_ID_ENT: idTipoEntidad,//$('#IdSelectedEntidad').val(),
        ID_T_ENT: $('#IdSelectedTipoEntidad').val()
    };


    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Entidades/GetEntidadesById';

    try {
        response = await fetchDataAsyncEntidad('' + url + '', 'POST', JSON.stringify(argsEntidades));
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}

async function fetchDataAsyncEntidad(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].CVE_ID_ENT + '">' + response[i].SIGLAS_ENT + '</option>';
        }
        $("#IdSelectedEntidad").html(s);
    });
}


function changeEventHandlerEntidad(event) {

    var id = event.target.value;

    if (id == "-1") {

        $("#IdSelectedArea").attr('disabled', true);
        $("#IdSelectedArea").val("-1");

        $("#IdSelectedPuesto").attr('disabled', true);
        $("#IdSelectedPuesto").val("-1");

        $("#IdSelectedPerfil").attr('disabled', true);
        $("#IdSelectedPerfil").val("-1");
        return;
    }

    $("#IdSelectedArea").attr('disabled', false);
    $('#IdSelectedArea').val("-1");

    GetAllDataAreasId(id);

}


async function GetAllDataAreasId(idEntidad) {

    var url = '';

    argsAreas = {

        CVE_ID_ENT: idEntidad,//$('#IdSelectedEntidad').val(),
        ID_T_ENT: $('#IdSelectedTipoEntidad').val()
    };

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Areas/GetAreasById';

    try {
        response = await fetchDataAsyncAreasId('' + url + '', 'POST', JSON.stringify(argsAreas));
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncAreasId(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona una Area</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_AREA + '">' + response[i].DESC_AREA + '</option>';
        }
        $("#IdSelectedArea").html(s);
    });
}


function changeEventHandlerPuesto(event) {

    var id = event.target.value;

    if (id == "-1") {

        $("#IdSelectedPuesto").attr('disabled', true);
        $("#IdSelectedPuesto").val("-1");

        $("#IdSelectedPerfil").attr('disabled', true);
        $("#IdSelectedPerfil").val("-1");
        return;
    }

    $("#IdSelectedPuesto").attr('disabled', false);
    $('#IdSelectedPuesto').val("-1");

    GetAllDataPuestoId(id);

}


async function GetAllDataPuestoId(idPuesto) {

    var url = '';

    argsPuestos = {
        ID_T_ENT: $('#IdSelectedTipoEntidad').val(),//$('#IdSelectedEntidad').val(),
        ID_AREA: $('#IdSelectedArea').val(),
        CVE_ID_ENT: $('#IdSelectedEntidad').val(),
    };

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Puestos/GetPuestoById';

    try {
        response = await fetchDataAsyncPuestoId('' + url + '', 'POST', JSON.stringify(argsPuestos));
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncPuestoId(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Puesto</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_PUESTO + '">' + response[i].DESCRIPCION_PUESTO + '</option>';
        }
        $("#IdSelectedPuesto").html(s);
    });
}


async function GetAllDataPuestosVigentes() {
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Puestos/GetTipoPuestosVigentes';

    try {
        response = await fetchDataAsyncPuestoVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncPuestoVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Puesto</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESC_AREA + '</option>';
        }
        $("#IdSelectedPuesto").html(s);
    });
}


function changeEventHandlerPerfil(event) {

    var id = event.target.value;

    if (id == "-1") {
        $("#IdSelectedPerfil").attr('disabled', true);
        $("#IdSelectedPerfil").val("-1");
        return;
    }

    $("#IdSelectedPerfil").attr('disabled', false);
    $('#IdSelectedPerfil').val("-1");

    GetAllDataPerfilVigentes();
}

async function GetAllDataPerfilVigentes() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Perfil/GetTipoPerfilVigentes';

    try {
        response = await fetchDataAsyncPerfilVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncPerfilVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Perfil</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_PERFIL + '">' + response[i].DESCRIPCION_PERFIL + '</option>';
        }
        $("#IdSelectedPerfil").html(s);
    });
}


async function GetAllDataUsuarios() {
    CardStylesOne();
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
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },
                {
                    data: "Vigente", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case false:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                            case true:
                                return '<i style="color:green" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                        }


                    }, sortable: false, className: "uniqueClassName"
                },
                {
                    data: "Acciones", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case true:
                                return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateUsuarios(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.USUARIO + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + '\'' + row.USUARIO + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                                break;
                        }
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
            ]
        });
    });
}



async function GetAllDataUsuariosVigentes() {
    CardStylesTwo();
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
                    data: "Vigente", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case false:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                            case true:
                                return '<i style="color:green" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                        }


                    }, sortable: false, className: "uniqueClassName"
                },
                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateUsuarios(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.USUARIO + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + '\'' + row.USUARIO + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
            ]
        });
    });
}

async function GetAllDataUsuariosHistorial() {
    CardStylesThree();
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
                    data: "Vigente", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case false:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                        }

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}

function OpenModalAddUpdateUsuarios(CVE_ID_ENT, DESC_ENT, SIGLAS_ENT, ID_T_ENT, USUARIO) {


    if (CVE_ID_ENT != 0) {

        $("#IdTipoAlta").val(1);
        $("#ModalCenterTitle").html('Editar Usuario');
        $("#ModalCenterTitleH6").html('Editar Usuario');
        var urlString = 'http://localhost:6435/api/usuarios/GetUsuarioById';

        $.ajax({
            contentType: 'application/json',
            url: urlString,
            data: JSON.stringify({ "USUARIO": USUARIO }),
            dataType: 'json',
            type: 'POST'
        }).then(function (response) {

            $("#IDNombre").val(response[0].NOMBRES);
            $("#IDApellidoPaterno").val(response[0].APELLIDO_PATERNO);
            $("#IDApellidoMaterno").val(response[0].APELLIDO_MATERNO);
            $("#IDTelefono").val(response[0].TELEFONO);
            $("#IDEMail").val(response[0].EMAIL);

            $('#IdInputUsuario').attr('disabled', true);
            $("#IdInputUsuario").val(response[0].USUARIO);

            $('#IdSelectedTipoEntidadHidden').attr('disabled', true);
            $("#IdSelectedTipoEntidadHidden").attr('hidden', false);
            $("#IdSelectedTipoEntidad").attr('hidden', true);
            var option = '<option value="' + response[0].ID_T_ENT + '">' + response[0].DESC_T_ENT + '</option>';
            $("#IdSelectedTipoEntidadHidden").html(option);

            $('#IdSelectedEntidadHidden').attr('disabled', true);
            $("#IdSelectedEntidadHidden").attr('hidden', false);
            $("#IdSelectedEntidad").attr('hidden', true);
            option = '<option value="' + response[0].CVE_ID_ENT + '">' + response[0].SIGLAS_ENT + '</option>';
            $("#IdSelectedEntidadHidden").html(option);

            $('#IdSelectedAreaHidden').attr('disabled', true);
            $("#IdSelectedAreaHidden").attr('hidden', false);
            $("#IdSelectedArea").attr('hidden', true);
            option = '<option value="' + response[0].ID_AREA + '">' + response[0].DESC_AREA + '</option>';
            $("#IdSelectedAreaHidden").html(option);

            $('#IdSelectedPuestoHidden').attr('disabled', true);
            $("#IdSelectedPuestoHidden").attr('hidden', false);
            $("#IdSelectedPuesto").attr('hidden', true);
            option = '<option value="' + response[0].ID_PUESTO + '">' + response[0].DESCRIPCION_PUESTO + '</option>';
            $("#IdSelectedPuestoHidden").html(option);

            $('#IdSelectedPerfilHidden').attr('disabled', true);
            $("#IdSelectedPerfilHidden").attr('hidden', false);
            $("#IdSelectedPerfil").attr('hidden', true);
            option = '<option value="' + response[0].ID_PERFIL + '">' + response[0].DESCRIPCION_PERFIL + '</option>';
            $("#IdSelectedPerfilHidden").html(option);

            $("#labelChbReestablecerPassword").attr('hidden', false);
            $("#chbReestablecerPassword").attr('hidden', false);

        });
    }
    else {
        $("#ModalCenterTitle").html('Registrar Usuario');
        $("#ModalCenterTitleH6").html('Registrar Usuario');
        $("#IdTipoAlta").val(0);
        hiddenControls();
        disabledDDL();
        resetControls();

    }

    $('#ModalAddUpdateUsuarios').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdateUsuarios').modal('show');

}


async function AddUpdateUsuarios() {

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

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';

    var operacion = $("#IdTipoAlta").val();

    if ($("#formNewUser").valid()) {

        var args;
        if (operacion == 0) {
            urlString = 'http://localhost:6435/api/usuarios/Insert';

            args = {

                "USUARIO": $("#IdInputUsuario").val(),
                "ID_PERFIL": $("#IdSelectedPerfil").val(),
                "ID_PUESTO": $("#IdSelectedPuesto").val(),
                "ID_AREA": $("#IdSelectedArea").val(),
                "ID_T_ENT": $("#IdSelectedTipoEntidad").val(),
                "CVE_ID_ENT": $("#IdSelectedEntidad").val(),
                "NOMBRES": $("#IDNombre").val(),
                "APELLIDO_PATERNO": $("#IDApellidoPaterno").val(),
                "APELLIDO_MATERNO": $("#IDApellidoMaterno").val(),
                "TELEFONO": $("#IDTelefono").val(),
                "EMAIL": $("#IDEMail").val(),
            };
        }
        else {

            urlString = 'http://localhost:6435/api/usuarios/Update';

            args = {

                "USUARIO": $("#IdInputUsuario").val(),
                "ID_PERFIL": $("#IdSelectedPerfilHidden").val(),
                "ID_PUESTO": $("#IdSelectedPuestoHidden").val(),
                "ID_AREA": $("#IdSelectedAreaHidden").val(),
                "ID_T_ENT": $("#IdSelectedTipoEntidadHidden").val(),
                "CVE_ID_ENT": $("#IdSelectedEntidadHidden").val(),
                "NOMBRES": $("#IDNombre").val(),
                "APELLIDO_PATERNO": $("#IDApellidoPaterno").val(),
                "APELLIDO_MATERNO": $("#IDApellidoMaterno").val(),
                "TELEFONO": $("#IDTelefono").val(),
                "EMAIL": $("#IDEMail").val(),
            };
        }


        $.ajax({
            contentType: 'application/json',
            url: urlString,
            data: JSON.stringify(args),
            dataType: 'json',
            type: 'POST'
        }).then(function (response) {

            if (response.Exito) {

                GetAllDataUsuariosVigentes();

                $("#ModalAddUpdateUsuarios").modal('hide');
                if ($("#IdTipoAlta").val() == 0) {
                    toastr.success('Se ha agregado correctamente el usuario').css("width", "250px");
                    //toastr.success(response.Mensaje, 'Se ha agregado correctamente el usuario').css("width", "250px");
                }
                else {
                    toastr.success('Se ha modificado correctamente el usuario').css("width", "250px");
                }

            }
            else {
                toastr.error(response.Mensaje, 'Usuarios').css("width", "200px");
            }

        });

    }

}

function CloseModalAddUpdateUsuarios() {
    $("#formNewUser").trigger("reset");
    $("#formNewUser").data('validator').resetForm();
    $("#ModalAddUpdateUsuarios").modal('hide');

}

function OpenModalDelete(ID_USUARIO) {
    $("#IDUsuario").val(ID_USUARIO);
    $('#ModalDelete').modal({ backdrop: 'static', keyboard: false, show: true })
    $('#ModalDelete').modal('show');
}

function CloseModalDelete() {
    $("#formNewUser").trigger("reset");
    $("#formNewUser").data('validator').resetForm();
    $("#ModalDelete").modal('hide');
}

async function resetPassword() {

    var urlString = '';
    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    urlString = 'http://localhost:6435/api/usuarios/ResetPassword';

    var args = {
        "USUARIO": $("#IdInputUsuario").val(),
    }

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: JSON.stringify(args),
        dataType: 'json',
        type: 'POST'
    }).then(function (response) {

        if (response.Exito) {

            GetAllDataUsuariosVigentes();

            $("#ModalAddUpdateUsuarios").modal('hide');
            toastr.success('Se ha reestablecio correctamente la contraseña del usuario').css("width", "250px");
            $("#chbReestablecerPassword").prop("checked", false);

        }
        else {
            toastr.error(response.Mensaje, 'Usuarios').css("width", "200px");
        }
    });

}


async function DeleteUsuario() {
    var urlString = '';

    argsEntidades = {
        USUARIO: $("#IDUsuario").val(),
    };

    //url = $("#FQDN").val() + 'api/usuarios/delete';
    urlString = 'http://localhost:6435/api/usuarios/DeleteUsuario';

    try {

        return await $.ajax({
            contentType: 'application/json',
            url: urlString,
            data: JSON.stringify(argsEntidades),
            dataType: 'json',
            type: 'POST'
        }).then(function (response) {

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


            if (response.Exito) {
                $("#ModalDelete").modal('hide');
                toastr.success('Se ha eliminado correctamente el usuario').css("width", "250px");
                GetAllDataPerfilVigentes();
            }
            else {
                toastr.error('Usuarios').css("width", "250px");
            }

        });

    } catch (error) {

    }
}


$().ready(function () {

    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');

    $("#formNewUser").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {

            IDNombre: { required: true },
            IDApellidoPaterno: { required: true },
            IdInputUsuario: { required: true },
            IdSelectedTipoEntidad: { valueNotEquals: "-1" },
            IdSelectedEntidad: { valueNotEquals: "-1" },
            IdSelectedArea: { valueNotEquals: "-1" },
            IdSelectedPuesto: { valueNotEquals: "-1" },
            IdSelectedPerfil: { valueNotEquals: "-1" },

            //IdInputClavePuesto: "required",
            //IdInputClavePuesto: {
            //    required: true,
            //    minlength: 1,
            //    maxlength: 500
            //},


            //IdinputDescripcionPuesto: "required",
            //IdinputDescripcionPuesto: {
            //    required: true,
            //    minlength: 1,
            //    maxlength: 500
            //},


            IdSelectedTipoEntidad: {
                negativo: true
            },
            IdSelectedEntidad: {
                negativo: true
            },
            IdSelectedArea: {
                negativo: true
            },
            IdSelectedPuesto: {
                negativo: true
            },
            IdSelectedPerfil: {
                negativo: true
            },

        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        messages: {
            IDNombre: { required: "Ingrese el Nombre" },
            IDApellidoPaterno: { required: "Ingrese su Apellido Paterno" },
            IdInputUsuario: { required: "Ingrese el Usuario" },
            //IdInputClavePuesto: {
            //    required: "Por favor ingresa el clave",
            //    minlength: "El nombre no debe ser menor a 1 caracter",
            //    maxlength: "El nombre no debe de ser mayor a 500 caracteres"
            //},

            //IdinputDescripcionPuesto: {
            //    required: "Por favor ingresa la Descripción",
            //    minlength: "La Descripción no debe ser menor a 1 caracter",
            //    maxlength: "La Descripción no debe de ser mayor a 500 caracteres"
            //},

            //IdSelectedTipoEntidad: {
            //    negativo: "Seleccione un elemento de la lista"
            //},

        }

    });


});

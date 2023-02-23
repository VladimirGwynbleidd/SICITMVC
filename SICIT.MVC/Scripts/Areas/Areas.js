$(document).ready(function () {

    //GetAllAreas();
    GetAllDataAreasVigentes();
    //DDL
    GetAllDataTipoEntidadVigentes();
});




async function GetAllAreas() {
    CardStylesOne();
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateAreas(' + row.ID_AREA + ',' + '\'' + row.DESC_AREA + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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
    CardStylesTwo();
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateAreas(' + row.ID_AREA + ',' + '\'' + row.DESC_AREA + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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
    CardStylesThree();
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateAreas(' + row.ID_AREA + ',' + '\'' + row.DESC_AREA + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6] }
            ]
        });
    });
}



//******************************ADD***************************************

async function AddUpdateAreas() {

    //if (!($('#frmAddUpdateUsuario').valid())) return false;


    var response;
    var argsUsuario;
    var methodStr = '';
    var url = '';

    argsEntidades = {

        CVE_ID_ENT: $('#IdInputClave').val(),
        DESC_ENT: $('#IdinputDescripcion').val(),
        SIGLAS_ENT: $('#IdInputSiglas').val(),
        ID_T_ENT: $('#IdSelectedTipo').val()
    };
    //console.log($('#IdEntidadHidden').val())
    /*url = $('#IDUsuario').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';*/
    url = $('#IdEntidadHidden').val() == 0 ? 'http://localhost:6435/api/Entidades/Post' : 'http://localhost:6435/api/Entidades/Put';

    try {

        methodStr = $('#IdPerfilHidden').val() == 0 ? 'POST' : 'PUT';

        response = await fetchDataAsync(url, methodStr, JSON.stringify(argsEntidades));

        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-center",
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
            GetAllDataEntidades();
            $("#ModalAddUpdatePerfiles").modal('hide');
            toastr.info(response.Mensaje, 'Entidades').css("width", "250px");
        }
        else {
            toastr.error(response.Mensaje, 'Entidades').css("width", "200px");
        }
    } catch (error) {
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Usuarios').css("width", "150px");
    }
}


function OpenModalAddUpdateAreas(ID_PERFIL, DESCRIPCION_PERFIL) {

    if (ID_PERFIL != 0) {
        $("#ModalCenterTitle").html('Editar Área');
        $("#ModalCenterTitleH6").html('Editar Área');
        $("#IdInputClave").val(ID_PERFIL);
        $('#IdInputClave').attr('disabled', 'disabled');
        $("#IdinputDescripcion").val(DESCRIPCION_PERFIL);
    }
    else {
        $("#ModalCenterTitle").html('Registrar Área');
        $("#ModalCenterTitleH6").html('Registrar Área');

        //ResetControls();
    }

    $("#IdPerfilHidden").val(ID_PERFIL);
    $('#ModalAddUpdateAreas').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdateAreas').modal('show');

}
//***************************************************************************


//*******************************DELETE************************************

async function DeleteArea() {

    //alert("1")

    var argsUsuario;
    var response;
    var url = '';

    argsEntidades = {
        CVE_ID_ENT: $('#IdEntidadHidden').val(),
        ID_T_ENT: $('#IdTipoEntidadHidden').val()
    };

    //url = $("#FQDN").val() + 'api/usuarios/delete';
    url = 'http://localhost:6435/api/Entidades/Delete';

    try {
        response = await fetchDataAsync('' + url + '', 'DELETE', JSON.stringify(argsEntidades));

        toastr.options = {
            "timeOut": 2500,
            "closeButton": true,
            "progressBar": true,
            "newestOnTop": true
        }

        if (response.Exito) {
            GetAllDataVigentes();
            $("#ModalDelete").modal('hide');

            toastr.success(response.Mensaje, 'Entidades').css("width", "250px");
        }
        else {
            toastr.error(response.Mensaje, 'Entidades').css("width", "250px");
        }
    } catch (error) {
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Entidades').css("width", "250px");
    }
}


function OpenModalDelete(IdEntidadHidden, IdTipoEntidadHidden) {

    $("#IdEntidadHidden").val(IdEntidadHidden);
    $("#IdTipoEntidadHidden").val(IdTipoEntidadHidden);

    console.log($("#IdEntidadHidden").val())
    console.log($("#IdTipoEntidadHidden").val())
    $('#ModalDelete').modal({ backdrop: 'static', keyboard: false, show: true })
    $('#ModalDelete').modal('show');
}


function CloseModalAddUpdateAreas() {
    //$("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdateAreas").modal('hide');
    //$("#frmAddUpdateUsuario").data('validator').resetForm();
}


function CloseModalDelete() {
    $("#ModalDelete").modal('hide');
}

//***************************************************************************

async function GetAllDataTipoEntidadVigentes() {
    CardStylesTwo();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/TipoEntidad/GetTipoEntidadVigentes';

    try {
        response = await fetchDataAsyncTableTipoEntidadVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}

async function fetchDataAsyncTableTipoEntidadVigentes(urlString, methodType, args) {

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

function SelectedTipoEntidad() {

    var idTipoEntidad = $("#IdSelectedTipoEntidad").val();
    GetAllEntidad(idTipoEntidad);
}


async function GetAllEntidad(idTipoEntidad) {
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Entidades/GetEntidadesById';

    try {
        response = await fetchDataAsyncTableEntidad('' + url + '', 'POST', { "ID_T_ENT": idTipoEntidad });
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableEntidad(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: JSON.stringify(args),
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona una Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].SIGLAS_ENT + '</option>';
        }
        $("#IdSelectedEntidad").html(s);
    });
}


function AddUpdateAreas() {

    var urlString = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    urlString = '';

    var entidades = {
        ID_T_ENT: $("IdSelectedTipoEntidad").val(),
        CVE_ID_ENT: $("IdSelectedEntidad").val(),
        DESC_ENT: $("IdinputDescripcion").val(),
        SIGLAS_ENT: $("IdInputClave").val(),
    };


    $("#formNewArea").validate(validateFormAcceso);

    if ($("#formNewArea").valid()) {

        $.ajax({
            contentType: 'application/json',
            url: urlString,
            data: JSON.stringify(entidades),
            dataType: 'json',
            type: 'POST'
        }).then(function (response) {

            var s = '<option value="-1">Selecciona una Entidad</option>';
            for (var i = 0; i < response.length; i++) {
                s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].SIGLAS_ENT + '</option>';
            }
            $("#IdSelectedEntidad").html(s);
        });
    }

}

var validateFormAcceso = {
    rules: {
        IdSelectedTipoEntidad: {
            required: {
                depends: function (element) {
                    if ('-1' == $('#IdSelectedTipoEntidad').val()) {
                        //Set predefined value to blank.
                        $('#IdSelectedTipoEntidad').val('');
                    }
                    return true;
                }
            }
        },
        IdSelectedEntidad: {
            required: {
                depends: function (element) {
                    if ('-1' == $('#IdSelectedEntidad').val()) {
                        //Set predefined value to blank.
                        $('#IdSelectedEntidad').val('');
                    }
                    return true;
                }
            }
        },
        IdInputClave: { required: true },
        //IDEMail: { required: true },
        //IDTelefono: { required: true },
        //IdInputUsuario: { required: true },
        //txtPassword: {required: true, minlength: 5, maxlength: 10 }
    },
    messages: {
        //IdUser: {
        //    required: function () {
        //        messageAlert("Ingrese su Usuario.", 100)
        //    },
        //},
        //Password: {
        //    required: function () {
        //        messageAlert("Ingrese su Contraseña.", 100)
        //    },
        //}
        IdSelectedTipoEntidad: { required: "Seleccione el Tipo de Entidad" },
        IdSelectedEntidad: { required: "Seleccione la Entidad" },
        IdInputClave: { required: "Ingrese una clave" },
        IdinputDescripcion: { required: "Ingrese una descripción" },
        //IDApellidoMaterno: { required: "Ingrese su Apellido Materno" },
        //IDTelefono: { required: "Ingrese el Teléfono" },
        //IdInputUsuario: { required: "Ingrese el Usuario" },
        //txtPersonalizado: {required: "* Ingresa un valor", minlength: $.validator.format("* Ingresa {0} o mas caracteres"), maxlength: $.validator.format("* Ingresa {0} o menos caracteres") }
    },
    //errorContainer: $("#divErrores"),
    //errorLabelContainer: "#divErrores ul",
    //errorElement: "span",
    //wrapper: "li",
}

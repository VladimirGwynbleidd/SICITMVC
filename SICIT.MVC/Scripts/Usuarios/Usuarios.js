$(document).ready(function () {

    GetAllDataUsuarios();
    GetAllTipoEntidades();
    GetAllEntidadVigentes();
    GetAllDataAreasVigentes();
    GetAllDataPuestosVigentes();
    GetAllDataPerfilVigentes();
});


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
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESC_ENT + '</option>';
        }
        $("#IdSelectedTipoEntidad").html(s);
    });
}



async function GetAllEntidadVigentes() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Entidades/GetEntidadesVigentes';

    try {
        response = await fetchDataAsyncEntidadVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncEntidadVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESC_ENT + '</option>';
        }
        $("#IdSelectedEntidad").html(s);
    });
}


async function GetAllDataAreasVigentes() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Areas/GetTipoAreasVigentes';

    try {
        response = await fetchDataAsyncAreasVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncAreasVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona una Area</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESC_AREA + '</option>';
        }
        $("#IdSelectedArea").html(s);
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

        var s = '<option value="-1">Selecciona un Puesto</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESCRIPCION_PERFIL + '</option>';
        }
        $("#IdSelectedPerfil").html(s);
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateUsuarios(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateUsuarios(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateUsuarios(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}

function OpenModalAddUpdateUsuarios(CVE_ID_ENT, DESC_ENT, SIGLAS_ENT, ID_T_ENT) {

    if (CVE_ID_ENT != 0) {
        $("#ModalCenterTitle").html('Editar Usuario');
        $("#ModalCenterTitleH6").html('Editar Usuario');

    }
    else {
        $("#ModalCenterTitle").html('Registrar Usuario');
        $("#ModalCenterTitleH6").html('Registrar Usuario');

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

function AddUpdateUsuarios() {

    $("#formNewUser").validate(validateFormAcceso);

    if ($("#formNewUser").valid()) {

    }

    //ChangeStyleInputsForm();
    //var inputs = $("#IDNombre").attr('class');

    //if (inputs.includes('error')) {

    //    alert("Hola");

    //    $("#IDNombre").removeClass('error');
    //} else {
    //    alert("salida");
    //}

}

var validateFormAcceso = {
    rules: {
        IDNombre: { required: true },
        IDApellidoPaterno: { required: true },
        IDApellidoMaterno: { required: true },
        IDEMail: { required: true },
        IDTelefono: { required: true },
        IdInputUsuario: { required: true },
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
        IDNombre: { required: "Ingrese el Nombre" },
        IDApellidoPaterno: { required: "Ingrese su Apellido Paterno" },
        IDEMail: { required: "Ingrese un correo electrónico" },
        IDApellidoMaterno: { required: "Ingrese su Apellido Materno" },
        IDTelefono: { required: "Ingrese el Teléfono" },
        IdInputUsuario: { required: "Ingrese el Usuario" },
        //txtPersonalizado: {required: "* Ingresa un valor", minlength: $.validator.format("* Ingresa {0} o mas caracteres"), maxlength: $.validator.format("* Ingresa {0} o menos caracteres") }
    },
    //errorContainer: $("#divErrores"),
    //errorLabelContainer: "#divErrores ul",
    //errorElement: "span",
    //wrapper: "li",
}


function ChangeStyleInputsForm() {

    var elementos = document.querySelectorAll('input[type="text"]')

    elementos.forEach((elemento) => {
        console.log(elemento);
        var id = elemento.id;
        var inpunt = "$('#" + id + "')";
        //var name = elemento.getAttribute(id);
        var elementInput = inpunt.attr('class');
        (elementInput.includes('error')) ? this.removeClass('error') : this.addClass('')
    })



    //$(".form-group > input").each(function () {

    //    var clss = this.attr('class');

    //    if (clss.includes('error')) {

    //        this.removeClass('error');
    //    }
    //});


}
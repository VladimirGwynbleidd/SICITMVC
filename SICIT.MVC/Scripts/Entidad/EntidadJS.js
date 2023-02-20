$(document).ready(function () {
    GetAllTipoEntidades();
    GetAllDataEntidades();
});

$('#frmAddUpdateUsuario').submit(function (e) {
    e.preventDefault();
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
        $("#IdSelectedTipo").html(s);
    });
}


async function GetAllDataEntidades() {
    CardStylesOne();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Entidades/GetEntidades';

    try {
        response = await fetchDataAsyncTable('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTable(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableEntidades').DataTable({
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
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'DESC_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" },
                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName", "visible": false },

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


async function AddUpdateEntidades() {

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

        methodStr = $('#IdEntidadHidden').val() == 0 ? 'POST' : 'PUT';

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
            $("#ModalAddUpdateEntidades").modal('hide');
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



async function GetAllDataVigentes() {
    CardStylesTwo();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Entidades/GetEntidadesVigentes';

    try {
        response = await fetchDataAsyncTableVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}

async function fetchDataAsyncTableVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableVigentes').DataTable({
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
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'DESC_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" },
                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName", "visible": false },

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


async function GetAllDataHistorial() {
    CardStylesThree();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Entidades/GetEntidadesHistorial';

    try {
        response = await fetchDataAsyncTableHistorial('' + url + '', 'GET', {});
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
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableHistorial').DataTable({
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
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'DESC_ENT', className: "text-left" },
                { 'data': 'SIGLAS_ENT', className: "text-left" },
                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName", "visible": false },

             
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ]
        });
    });
}


async function DeleteEntidad() {

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

function CloseModalAddUpdateUser() {
    $("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdateUser").modal('hide');
    $("#frmAddUpdateUsuario").data('validator').resetForm();
}

function CloseModalDelete() {
    $("#ModalDelete").modal('hide');
}

async function fetchDataAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        console.log(JSON.stringify(response));
        return response;
    });
}




function OpenModalAddUpdateEntidades(CVE_ID_ENT, DESC_ENT, SIGLAS_ENT, ID_T_ENT) {
    

    if (CVE_ID_ENT != 0) {
        $("#ModalCenterTitle").html('Editar Entidad');
        $("#ModalCenterTitleH6").html('Editar Entidad');
        $("#IdInputClave").val(CVE_ID_ENT);
        $('#IdInputClave').attr('disabled', 'disabled');
        $("#IdinputDescripcion").val(DESC_ENT);
        $("#IdInputSiglas").val(SIGLAS_ENT);
        $("#IdSelectedTipo").val(ID_T_ENT);
        $('#IdSelectedTipo').attr('disabled', 'disabled');
    }
    else {
        $("#ModalCenterTitle").html('Registrar Entidad');
        $("#ModalCenterTitleH6").html('Registrar Entidad');

        ResetControls();
    }

     
    $("#IdEntidadHidden").val(CVE_ID_ENT);
    $('#ModalAddUpdateEntidades').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdateEntidades').modal('show');

}



function ResetControls() {

    $("#IdInputClave").val("");
    $("#IdInputClave").attr('disabled', false);

    $("#IdSelectedTipo").attr('disabled', false);
    $('#IdSelectedTipo').val("-1");


    $("#IdinputDescripcion").val("");
    $("#IdInputSiglas").val("");


}
function CloseModalAddUpdateEntidades() {
    //$("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdateEntidades").modal('hide');
    //$("#frmAddUpdateUsuario").data('validator').resetForm();
}


function CloseModalDelete() {
    $("#ModalDelete").modal('hide');
}






$().ready(function () {


    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');


    $("#frmAddUpdateUsuario").validate({

        errorElement: 'span',
        //errorContainer: "#formconsole",
        //errorLabelContainer: "#formconsole",
        //    wrapper: "span",
        //  errorElement: "div",

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {

            IDDSC_USUARIO: "required",
            IDNombre: "required",
            IDApellidoPat: "required",
            IDApellidoMat: "required",
            IDddlPerfil: { valueNotEquals: "-1" },

            IDDSC_USUARIO: {
                required: true,
                minlength: 1,
                maxlength: 100
            },

            IDNombre: {
                required: true,
                minlength: 1,
                maxlength: 100
            },

            IDApellidoPat: {
                required: true,
                minlength: 1,
                maxlength: 100
            },

            IDApellidoMat: {
                required: true,
                minlength: 1,
                maxlength: 100
            },

            IDddlPerfil: {

                negativo: true

            }

        },


        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },

        messages: {

            IDDSC_USUARIO: {
                required: "Por favor ingresa el usuario",
                minlength: "El nombre no debe ser menor a 1 caracter",
                maxlength: "El nombre no debe de ser mayor a 100 caracteres"
            },

            IDNombre: {
                required: "Por favor ingresa el nombre",
                minlength: "El nombre no debe ser menor a 1 caracter",
                maxlength: "El nombre no debe de ser mayor a 100 caracteres"
            },

            IDApellidoPat: {
                required: "Por favor ingresa el apellido paterno",
                minlength: "El apellido paterno no debe ser menor a 1 caracter",
                maxlength: "El apellido paterno no debe de ser mayor a 100 caracteres"
            },

            IDApellidoMat: {
                required: "Por favor ingresa el apellido materno",
                minlength: "El apellido materno no debe ser menor a 1 caracter",
                maxlength: "El apellido materno no debe de ser mayor a 100 caracteres"
            },

            IDddlTipoNormatividad: {
                negativo: "Seleccione un elemento de la lista"
            }
        }

    });


});
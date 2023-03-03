$(document).ready(function () {
    GetAllTipoEntidades();
    //GetAllDataEntidades();
    GetAllDataVigentes();
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

                        if (row.VIG_FLAG) {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                        }
                        else {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black;display:none" class="fas fa-fw fa-edit fa-lg"></i></a><a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red;display:none" class="fas fa-solid fa-trash fa-lg"></i></a>';
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


async function AddUpdateEntidades() {

    if (!($('#formAddUpdateEntidades').valid())) return false;


    var response;
    var argsUsuario;
    var methodStr = '';
    var url = '';

    argsEntidades = {

        CVE_ID_ENT: $('#IdEntidadHidden').val(),
        DESC_ENT: $('#IdinputDescripcionEntidad').val(),
        SIGLAS_ENT: $('#IdInputSiglasEntidad').val(),
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
    //url = 'http://localhost:6435/Api/Entidades/GetEntidadesById';
    url = 'http://localhost:6435/Api/Entidades/GetEntidadesVigentes';

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

                        if (row.VIG_FLAG) {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                        }
                        else {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black;display:none" class="fas fa-fw fa-edit fa-lg"></i></a><a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red;display:none" class="fas fa-solid fa-trash fa-lg"></i></a>';
                        }

                    }, sortable: false, className: "uniqueClassName"
                },
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
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
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6] }
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
        $("#IdInputClaveEntidad").val(CVE_ID_ENT);
        $('#IdInputClaveEntidad').attr('disabled', 'disabled');
        $("#IdinputDescripcionEntidad").val(DESC_ENT);
        $("#IdInputSiglasEntidad").val(SIGLAS_ENT);
        $("#IdSelectedTipo").val(ID_T_ENT);
        $('#IdSelectedTipo').attr('disabled', 'disabled');
    }
    else {
        $("#ModalCenterTitle").html('Registrar Entidad');
        $("#ModalCenterTitleH6").html('Registrar Entidad');
        $("#IdInputClaveEntidad").attr('disabled', true);
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

    $("#formAddUpdateEntidades").trigger("reset");
    $("#formAddUpdateEntidades").data('validator').resetForm();
    $("#ModalAddUpdateEntidades").modal('hide');

}


function CloseModalDelete() {
    $("#formAddUpdateEntidades").trigger("reset");
    $("#formAddUpdateEntidades").data('validator').resetForm();
    $("#ModalDelete").modal('hide');
}





$().ready(function () {


    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');



    $("#formAddUpdateEntidades").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {

            IdinputDescripcionEntidad: "required",
            IdinputDescripcionEntidad: {
                required: true,
                minlength: 1,
                maxlength: 500
            },

            IdInputSiglasEntidad: "required",
            IdInputSiglasEntidad: {
                required: true,
                minlength: 1,
                maxlength: 500
            },

            IdSelectedTipo: { valueNotEquals: "-1" },
            IdSelectedTipo: {
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



            IdinputDescripcionEntidad: {
                required: "Por favor ingresa la Descripción",
                minlength: "La Descripción no debe ser menor a 1 caracter",
                maxlength: "La Descripción no debe de ser mayor a 500 caracteres"
            },

            IdInputSiglasEntidad: {
                required: "Por favor ingresa las Siglas",
                minlength: "El nombre no debe ser menor a 1 caracter",
                maxlength: "El nombre no debe de ser mayor a 500 caracteres"
            },

            IdSelectedTipo: {
                negativo: "Seleccione un elemento de la lista"
            },

        }

    });


});
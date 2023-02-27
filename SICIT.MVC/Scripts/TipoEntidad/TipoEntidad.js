$(document).ready(function () {

    //GetAllDataTipoEntidad();
    //GetAllTipoEntidades();
    GetAllDataTipoEntidadVigentes();

});



async function GetAllDataTipoEntidad() {
    CardStylesOne();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/TipoEntidad/GetTipoEntidad';

    try {
        response = await fetchDataAsyncTableTipoEntidad('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTableTipoEntidad(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTableTipoEntidad').DataTable({
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
                { 'data': 'ID_T_ENT', className: "uniqueClassName" },

                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'ESPC_T_ENT', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateTipoEntidad(' + row.ID_T_ENT + ',' + '\'' + row.DESC_T_ENT + '\'' + ',\'' + row.ESPC_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_T_ENT + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3] }
            ]
        });
    });
}



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
        $('#dataTableTipoEntidadVigentes').DataTable({
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
                { 'data': 'ID_T_ENT', className: "uniqueClassName" },

                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'ESPC_T_ENT', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateTipoEntidad(' + row.ID_T_ENT + ',' + '\'' + row.DESC_T_ENT + '\'' + ',\'' + row.ESPC_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_T_ENT + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3] }
            ]
        });
    });
}



async function GetAllDataTipoEntidadHistorial() {
    CardStylesThree();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/TipoEntidad/GetTipoEntidadHistorial';

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
        $('#dataTableTipoEntidadHistorial').DataTable({
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
                { 'data': 'ID_T_ENT', className: "uniqueClassName" },

                { 'data': 'DESC_T_ENT', className: "text-left" },
                { 'data': 'ESPC_T_ENT', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateTipoEntidad(' + row.ID_T_ENT + ',' + '\'' + row.DESC_T_ENT + '\'' + ',\'' + row.ESPC_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_T_ENT + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2] }
            ]
        });
    });
}



//******************************ADD***************************************

async function AddUpdateTipoEntidad() {



    if (!($('#formAddUpdateTipoEntidad').valid())) return false;

    if ($("#formAddUpdateTipoEntidad").valid()) {

        var response;
        var argsUsuario;
        var methodStr = '';
        var url = '';
        console.log($('#IdTipoEntidadHidden').val())

        argsTipoEntidades = {

            ID_T_ENT: $('#IdInputTipoEntidadClave').val(),
            DESC_T_ENT: $('#IdInputTipoEntidadDescripcion').val(),
            ESPC_T_ENT: $('#IdinputTipoEntidadEspecificacion').val()
        };
        console.log($('#IdTipoEntidadHidden').val())
        /*url = $('#IDUsuario').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';*/
        url = $('#IdTipoEntidadHidden').val() == 0 ? 'http://localhost:6435/Api/TipoEntidad/Post' : 'http://localhost:6435/Api/TipoEntidad/Put';

        try {

            methodStr = $('#IdTipoEntidadHidden').val() == 0 ? 'POST' : 'PUT';

            response = await fetchDataAsyncTipoEntidad(url, methodStr, JSON.stringify(argsTipoEntidades));

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
                GetAllDataTipoEntidadVigentes();
                $("#ModalAddUpdateTipoEntidad").modal('hide');
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
}

async function fetchDataAsyncTipoEntidad(urlString, methodType, args) {

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

function OpenModalAddUpdateTipoEntidad(ID_T_ENT, DESC_T_ENT, ESPC_T_ENT) {

    if (ID_T_ENT != 0) {
        $("#ModalCenterTitle").html('Editar Tipo de Entidad');
        $("#ModalCenterTitleH6").html('Editar Tipo de Entidad');
        $("#IdInputTipoEntidadClave").val(ID_T_ENT);
        $('#IdInputTipoEntidadClave').attr('disabled', 'disabled');
        $("#IdInputTipoEntidadDescripcion").val(DESC_T_ENT);

        $("#IdinputTipoEntidadEspecificacion").val(ESPC_T_ENT);


    }
    else {
        $("#ModalCenterTitle").html('Registrar Tipo de Entidad');
        $("#ModalCenterTitleH6").html('Registrar Tipo de Entidad');
        $("#IdInputTipoEntidadClave").attr('disabled', true);

        //ResetControls();
    }

    $("#IdTipoEntidadHidden").val(ID_T_ENT);

    $('#ModalAddUpdateTipoEntidad').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdateTipoEntidad').modal('show');

}
//***************************************************************************


//*******************************DELETE************************************

async function DeleteTipoEntidad() {

    //alert("1")

    var argsUsuario;
    var response;
    var url = '';

    argsTipoEntidades = {
        ID_T_ENT: $('#IdTipoEntidadHidden').val(),

    };

    //url = $("#FQDN").val() + 'api/usuarios/delete';
    url = 'http://localhost:6435/Api/TipoEntidad/Delete';

    try {
        response = await fetchDataAsyncTipoEntidad('' + url + '', 'DELETE', JSON.stringify(argsTipoEntidades));

        toastr.options = {
            "timeOut": 2500,
            "closeButton": true,
            "progressBar": true,
            "newestOnTop": true
        }

        if (response.Exito) {
            GetAllDataTipoEntidadVigentes();
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


function OpenModalDelete(ID_T_ENT) {

    $("#IdTipoEntidadHidden").val(ID_T_ENT);


    $('#ModalDelete').modal({ backdrop: 'static', keyboard: false, show: true })
    $('#ModalDelete').modal('show');
}


function CloseModalAddUpdateTipoEntidad() {
    $("#formAddUpdateTipoEntidad").trigger("reset");
    $("#formAddUpdateTipoEntidad").data('validator').resetForm();
    $("#ModalAddUpdateTipoEntidad").modal('hide');

}

function CloseModalDelete() {
    $("#formAddUpdateTipoEntidad").trigger("reset");
    $("#formAddUpdateTipoEntidad").data('validator').resetForm();
    $("#ModalDelete").modal('hide');
}


//***************************************************************************


$().ready(function () {


    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');



    $("#formAddUpdateTipoEntidad").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {


            IdInputTipoEntidadDescripcion: "required",
            IdInputTipoEntidadDescripcion: {
                required: true,
                minlength: 1,
                maxlength: 500
            },

            IdinputTipoEntidadEspecificacion: "required",
            IdinputTipoEntidadEspecificacion: {
                required: true,
                minlength: 1,
                maxlength: 500
            },

        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        messages: {

            IdInputTipoEntidadDescripcion: {
                required: "Por favor ingresa el clave",
                minlength: "El nombre no debe ser menor a 1 caracter",
                maxlength: "El nombre no debe de ser mayor a 500 caracteres"
            },

            IdinputTipoEntidadEspecificacion: {
                required: "Por favor ingresa la Descripción",
                minlength: "La Descripción no debe ser menor a 1 caracter",
                maxlength: "La Descripción no debe de ser mayor a 500 caracteres"
            },


        }

    });


});


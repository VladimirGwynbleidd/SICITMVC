$(document).ready(function () {
    //GetAllPerfil();
    GetAllDataPerfilVigentes();
    //GetAllDataPerfilHistorial();
});


async function GetAllPerfil() {

    CardStylesOne();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Perfil/GetPerfil';

    try {
        response = await fetchDataAsyncTablePerfil('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTablePerfil(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTablePerfiles').DataTable({
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
            dom: '<"top"Bf>rt<"bottom"lpi><"clear">',
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Exportar a Excel',
                    titleAttr: 'Exportar a Excel',
                    title: 'CatálogoPerfiles',
                    className: 'btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 4]
                    }
                },
            ],
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'VIG_FLAG', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {

                        if (row.VIG_FLAG != 0) {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePerfiles(' + row.ID_PERFIL + ',' + '\'' + row.DESCRIPCION_PERFIL + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_PERFIL + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                        } else {
                            return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i></a>';
                        }
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ]
        });
    });
}



async function GetAllDataPerfilVigentes() {

    CardStylesTwo();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Perfil/GetTipoPerfilVigentes';

    try {
        response = await fetchDataAsyncTablePerfilVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTablePerfilVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTablePerfilesVigentes').DataTable({
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
            dom: '<"top"Bf>rt<"bottom"lpi><"clear">',
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Exportar a Excel',
                    titleAttr: 'Exportar a Excel',
                    title: 'CatálogoPerfiles',
                    className: 'btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 4]
                    }
                },
            ],
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'VIG_FLAG', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {

                        if (row.VIG_FLAG != 0) {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePerfiles(' + row.ID_PERFIL + ',' + '\'' + row.DESCRIPCION_PERFIL + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_PERFIL + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                        } else {
                            return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i></a>';
                        }

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ]
        });
    });
}



async function GetAllDataPerfilHistorial() {
    CardStylesThree();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Perfil/GetTipoPerfilHistorial';

    try {
        response = await fetchDataAsyncTablePerfilHistorial('' + url + '', 'GET', {});
        console.log(response)
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTablePerfilHistorial(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTablePerfilesHistorial').DataTable({
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
            dom: '<"top"Bf>rt<"bottom"lpi><"clear">',
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Exportar a Excel',
                    titleAttr: 'Exportar a Excel',
                    title: 'CatálogoPerfiles',
                    className: 'btn btn-success',
                    exportOptions: {
                        columns: [0, 1, 4]
                    }
                },
            ],
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'VIG_FLAG', className: "uniqueClassName", "visible": false },
                {
                    data: "Estatus", render: function (data, type, row) {

                        if (row.VIG_FLAG != 0) {
                            return '<i style="color:green" class="fas fa-solid fa-circle fa-lg"></i></a>';
                        } else {
                            return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i></a>';
                        }

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5] }
            ]
        });
    });
}



//******************************ADD***************************************

async function AddUpdatePerfiles() {

    var response;
    var argsUsuario;
    var methodStr = '';
    var url = '';

    $("#formAddUpdatePerfiles").validate(validateFormAcceso);

    if ($("#formAddUpdatePerfiles").valid()) {


        argsEntidades = {

            ID_PERFIL: $('#IdPerfilHidden').val(),
            DESCRIPCION_PERFIL: $('#IdinputDescripcion').val(),
        };
        //console.log($('#IdEntidadHidden').val())
        /*url = $('#IDUsuario').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';*/
        url = $('#IdPerfilHidden').val() == 0 ? 'http://localhost:6435/api/Perfiles/Post' : 'http://localhost:6435/api/Perfiles/Put';

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

                GetAllDataPerfilVigentes();

                $("#ModalAddUpdatePerfiles").modal('hide');
                toastr.info(response.Mensaje, 'Se ha agregado correctamente el perfil').css("width", "250px");
            }
            else {
                toastr.error(response.Mensaje, 'Perfiles').css("width", "200px");
            }
        } catch (error) {
            response = error.responseJSON;
            mensaje = response.Mensaje;
            toastr.error('Error', 'Perfiles').css("width", "150px");
        }
    }

}


async function fetchDataAsync(urlString, methodType, args) {
    alert("2")
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

function OpenModalAddUpdatePerfiles(ID_PERFIL, DESCRIPCION_PERFIL) {
    
    if (ID_PERFIL != 0) {
        $("#ModalCenterTitle").html('Editar Perfil');
        $("#ModalCenterTitleH6").html('Editar Perfil');
        $("#IdInputClave").val(ID_PERFIL);
        $('#IdInputClave').attr('disabled', 'disabled');
        $("#IdinputDescripcion").val(DESCRIPCION_PERFIL);
    }
    else {
        $("#ModalCenterTitle").html('Registrar Perfil');
        $("#ModalCenterTitleH6").html('Registrar Perfil');
        $("#IdInputClave").attr('disabled', true);

        ResetControls();
    }

    $("#IdPerfilHidden").val(ID_PERFIL);
    $('#ModalAddUpdatePerfiles').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdatePerfiles').modal('show');

}
//***************************************************************************


//*******************************DELETE************************************

async function DeletePerfiles() {

    //alert("1")

    var argsUsuario;
    var response;
    var url = '';

    argsEntidades = {
        ID_PERFIL: $('#IdPerfilHidden').val(),
        
    };

    //url = $("#FQDN").val() + 'api/usuarios/delete';
    url = 'http://localhost:6435/api/Perfiles/Delete';

    try {
        response = await fetchDataAsync('' + url + '', 'DELETE', JSON.stringify(argsEntidades));
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
            
            GetAllDataPerfilVigentes();
            
            $("#ModalDelete").modal('hide');

            toastr.success(response.Mensaje, 'Se ha eliminado correctamente el perfil').css("width", "250px");
        }
        else {
            toastr.error(response.Mensaje, 'Perfiles').css("width", "250px");
        }
    } catch (error) {
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Perfiles').css("width", "250px");
    }
}


function OpenModalDelete(ID_PERFIL) {
    $("#IdPerfilHidden").val(ID_PERFIL);
    $('#ModalDelete').modal({ backdrop: 'static', keyboard: false, show: true })
    $('#ModalDelete').modal('show');
}


function CloseModalAddUpdatePerfiles() {
    //$("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdatePerfiles").modal('hide');
    //$("#frmAddUpdateUsuario").data('validator').resetForm();
}

function CloseModalDelete() {
    $("#ModalDelete").modal('hide');
}


//***************************************************************************



function ResetControls() {

    $("#IdInputClave").val("");
    //$("#IdInputClave").attr('disabled', false);

    $("#IdinputDescripcion").val("");
}


var validateFormAcceso = {
    rules: {
        IdinputDescripcion: { required: true }
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
        IdinputDescripcion: { required: "Ingrese la descripción" },
        //txtPersonalizado: {required: "* Ingresa un valor", minlength: $.validator.format("* Ingresa {0} o mas caracteres"), maxlength: $.validator.format("* Ingresa {0} o menos caracteres") }
    },
    errorContainer: $("#divErrores"),
    errorLabelContainer: "#divErrores ul",
    errorElement: "span",
    wrapper: "li",
}
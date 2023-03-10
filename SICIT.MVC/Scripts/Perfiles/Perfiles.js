$(document).ready(function () {
    //GetAllPerfil();
    GetAllDataPerfilVigentes();
    //GetAllDataPerfilHistorial();
});


async function GetAllPerfil() {

    CardStylesOne();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    //url = 'http://localhost:6435/Api/Perfil/GetPerfil';
    url = $("#FQDN").val() + 'Api/Perfil/GetPerfil';

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
            dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
            buttons: {
                dom: {
                    button: {
                        tag: 'i',
                        className: ''
                    }
                },
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel btn btn-success"></i>',
                        title: 'Perfil Todos',
                        exportOptions: {
                            columns: [0, 1]
                        },
                    },

                ]
            },
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'VIG_FLAG', className: "uniqueClassName", "visible": false },
                {
                    data: "Vigente", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case 0:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                            case 1:
                                return '<i style="color:green" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                        }


                    }, sortable: false, className: "uniqueClassName"
                },
                {
                    data: "Acciones", render: function (data, type, row) {

                        if (row.VIG_FLAG != 0) {
                            return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePerfiles(' + row.ID_PERFIL + ',' + '\'' + row.DESCRIPCION_PERFIL + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_PERFIL + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                        } else {
                            return '';
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



async function GetAllDataPerfilVigentes() {

    CardStylesTwo();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    //url = 'http://localhost:6435/Api/Perfil/GetTipoPerfilVigentes';
    url = $("#FQDN").val() + 'Api/Perfil/GetTipoPerfilVigentes';

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
        var table = $('#dataTablePerfilesVigentes').DataTable({
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
            dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
            buttons: {
                dom: {
                    button: {
                        tag: 'i',
                        className: ''
                    }
                },
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel btn btn-success"></i>',
                        title: 'Perfil Vigentes',
                        exportOptions: {
                            columns: [0, 1]
                        },
                    },

                ]
            },
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'VIG_FLAG', className: "uniqueClassName", "visible": false },
                {
                    data: "Vigente", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case 0:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                            case 1:
                                return '<i style="color:green" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
                        }


                    }, sortable: false, className: "uniqueClassName"
                },
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
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6] }
            ]
        });
    });
}



async function GetAllDataPerfilHistorial() {
    CardStylesThree();

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    //url = 'http://localhost:6435/Api/Perfil/GetTipoPerfilHistorial';
    url = $("#FQDN").val() + 'Api/Perfil/GetTipoPerfilHistorial';

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
        var table = $('#dataTablePerfilesHistorial').DataTable({
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
            dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
            buttons: {
                dom: {
                    button: {
                        tag: 'i',
                        className: ''
                    }
                },
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: '<i class="fas fa-file-excel btn btn-success"></i>',
                        title: 'Perfil Historial',
                        exportOptions: {
                            columns: [0, 1]
                        },
                    },

                ]
            },
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'VIG_FLAG', className: "uniqueClassName", "visible": false },
                {
                    data: "Vigente", render: function (data, type, row) {

                        switch (row.VIG_FLAG) {
                            case 0:
                                return '<i style="color:red" class="fas fa-solid fa-circle fa-lg"></i>';
                                break;
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

    if (!($('#formAddUpdatePerfiles').valid())) return false;

    if ($("#formAddUpdatePerfiles").valid()) {


        argsEntidades = {

            ID_PERFIL: $('#IdPerfilHidden').val(),
            DESCRIPCION_PERFIL: $('#IdinputDescripcionPerfiles').val(),

            USUARIOSESION: $('#USUARIOSESION').val(),
            GUID: $('#GUID').val()
        };
        
        url = $('#IdPerfilHidden').val() == 0 ? $("#FQDN").val() + 'api/Perfiles/Post' : $("#FQDN").val() + 'api/Perfiles/Put';

        try {

            methodStr = $('#IdPerfilHidden').val() == 0 ? 'POST' : 'PUT';

            response = await fetchDataAsync(url, methodStr, JSON.stringify(argsEntidades));

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

                GetAllDataPerfilVigentes();

                $("#ModalAddUpdatePerfiles").modal('hide');
                if ($('#IdPerfilHidden').val() == 0) {
                    toastr.success(response.Mensaje, 'Se ha agregado correctamente el perfil').css("width", "250px");
                }
                else {
                    toastr.success(response.Mensaje, 'Se ha actualizado correctamente el perfil').css("width", "250px");
                }

            }
            else {
                toastr.error(response.Mensaje, 'Error al registrar o actulizar el Perfil').css("width", "200px");
            }
        } catch (error) {
            response = error.responseJSON;
            mensaje = response.Mensaje;
            toastr.error('Error', 'Error al registrar o actulizar el Perfil').css("width", "150px");
        }
    }

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

function OpenModalAddUpdatePerfiles(ID_PERFIL, DESCRIPCION_PERFIL) {

    if (ID_PERFIL != 0) {
        $("#ModalCenterTitle").html('Editar Perfil');
        $("#ModalCenterTitleH6").html('Editar Perfil');
        $("#IdInputClavePerfiles").val(ID_PERFIL);
        $('#IdInputClavePerfiles').attr('disabled', 'disabled');
        $("#IdinputDescripcionPerfiles").val(DESCRIPCION_PERFIL);
    }
    else {
        $("#ModalCenterTitle").html('Registrar Perfil');
        $("#ModalCenterTitleH6").html('Registrar Perfil');
        $("#IdInputClavePerfiles").attr('disabled', true);

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
        USUARIOSESION: $('#USUARIOSESION').val(),
        GUID: $('#GUID').val()
    };

    //url = $("#FQDN").val() + 'api/usuarios/delete';
    //url = 'http://localhost:6435/api/Perfiles/Delete';
    url = $("#FQDN").val() + 'api/Perfiles/Delete';

    try {
        response = await fetchDataAsync('' + url + '', 'DELETE', JSON.stringify(argsEntidades));
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

            GetAllDataPerfilVigentes();

            $("#ModalDelete").modal('hide');

            toastr.success(response.Mensaje, 'Se ha eliminado correctamente el perfil').css("width", "250px");
        }
        else {
            toastr.error(response.Mensaje, 'Error al eliminar el Perfil').css("width", "250px");
        }
    } catch (error) {
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Error al eliminar el Perfil').css("width", "250px");
    }
}


function OpenModalDelete(ID_PERFIL) {
    $("#IdPerfilHidden").val(ID_PERFIL);
    $('#ModalDelete').modal({ backdrop: 'static', keyboard: false, show: true })
    $('#ModalDelete').modal('show');
}


function CloseModalAddUpdatePerfiles() {
    $("#formAddUpdatePerfiles").trigger("reset");
    $("#formAddUpdatePerfiles").data('validator').resetForm();
    $("#ModalAddUpdatePerfiles").modal('hide');

}

function CloseModalDelete() {
    $("#formAddUpdatePerfiles").trigger("reset");
    $("#formAddUpdatePerfiles").data('validator').resetForm();
    $("#ModalDelete").modal('hide');
}


//***************************************************************************



function ResetControls() {

    $("#IdInputClave").val("");

    $("#IdinputDescripcion").val("");
}



$().ready(function () {


    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');



    $("#formAddUpdatePerfiles").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {

            IdinputDescripcionPerfiles: "required",
            IdinputDescripcionPerfiles: {
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



            IdinputDescripcionPerfiles: {
                required: "Por favor ingresa la Descripción",
                minlength: "La Descripción no debe ser menor a 1 caracter",
                maxlength: "La Descripción no debe de ser mayor a 500 caracteres"
            },

        }

    });


});
$(document).ready(function () {

    GetAllPerfil();
});




async function GetAllPerfil() {

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
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },
                
                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePerfiles(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4] }
            ]
        });
    });
}



async function GetAllDataPerfilVigentes() {

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
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },

                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePerfiles(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4] }
            ]
        });
    });
}



async function GetAllDataPerfilHistorial() {

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
            columns: [
                { 'data': 'ID_PERFIL', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PERFIL', className: "uniqueClassName" },

                { 'data': 'FECH_INI_VIG', className: "uniqueClassName", "visible": false },
                { 'data': 'FECH_FIN_VIG', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePerfiles(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4] }
            ]
        });
    });
}



//******************************ADD***************************************

async function AddUpdatePerfiles() {

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


function OpenModalAddUpdatePerfiles(CVE_ID_ENT, DESC_ENT, SIGLAS_ENT, ID_T_ENT) {

    if (CVE_ID_ENT != 0) {
        $("#ModalCenterTitle").html('Editar Entidad');
        $("#ModalCenterTitleH6").html('Editar Entidad');

    }
    else {
        $("#ModalCenterTitle").html('Registrar Entidad');
        $("#ModalCenterTitleH6").html('Registrar Entidad');

        //ResetControls();
    }


    $('#ModalAddUpdatePerfiles').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdatePerfiles').modal('show');

}
//***************************************************************************


//*******************************DELETE************************************

async function DeletePerfiles{

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


function CloseModalAddUpdatePerfiles() {
    //$("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdatePerfiles").modal('hide');
    //$("#frmAddUpdateUsuario").data('validator').resetForm();
}

//***************************************************************************


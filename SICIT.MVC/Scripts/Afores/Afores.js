$(document).ready(function () {

    GetAllData();
    GetEntidades();
    GetOrganoGobierno();
    GetSesion();
    GetTipoSesion();



});


async function GetAllData() {

    var url = '';
    url = 'http://localhost:12935/api/Afores/ObtenerAfores';
    console.log(url)
    try {
        response = await fetchDataAsyncTable('' + url + '', 'GET', {});
        console.log(response)
    } catch (error) {
        console.log(error);
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

        console.log(response)
        $('#dataTableAfores').DataTable({
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
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName" },

                { 'data': 'I_CVE_AFORE', className: "uniqueClassName" },

                { 'data': 'T_DSC_RAZON_SOCIAL', className: "uniqueClassName" },
                { 'data': 'T_DSC_RFC', className: "uniqueClassName" },


                { 'data': 'T_DSC_NUM_ACUERDO', className: "uniqueClassName" },

                { 'data': 'T_DSC_OFICIO_AUT', className: "uniqueClassName" },
                { 'data': 'F_FECH_INICIO_OPERACION', className: "uniqueClassName" },


                { 'data': 'F_FECH_ACUERDO', className: "uniqueClassName" },

                { 'data': 'F_FECH_AUTORIZACION', className: "uniqueClassName" },
                { 'data': 'I_CVE_ORG_GOBIERNO', className: "uniqueClassName" },


                { 'data': 'T_DSC_GOBIERNO', className: "uniqueClassName" },

                { 'data': 'I_CVE_TIPO_SESION', className: "uniqueClassName" },
                { 'data': 'T_DSC_TIPO_SESION', className: "uniqueClassName" },


                { 'data': 'I_CVE_SESION', className: "uniqueClassName" },

                { 'data': 'T_DSC_SESION', className: "uniqueClassName" },




                //{
                //    data: "VIG_FLAG", render: function (data, type, row) {

                //        var btnReactivar = '';

                //        if (row.VIG_FLAG) {
                //            return btnReactivar = '<a href="#"><i style="color:green" class="fa-solid fa-user-check"></i></a> </br> Activo';
                //        }
                //        else {
                //            return btnReactivar = '<a href="#" onclick="OpenEstadoUsuario(' + '\'' + row.I_CVE_USUARIO + '\'' + ')"><i style="color:red" class="fa-solid fa-user-check"></i></a> </br> Inactivo';
                //        }
                //    }, sortable: false, className: "uniqueClassName"
                //},

                {
                    data: "image",
                    render: function (data, type, row) {
                        
                        return '<img src="data:image/jpeg;base64,' + row.LOGO_ENT + '" width="50px" height="50px">';
                    }
                },


                {
                    data: "Acciones", render: function (data, type, row) {

                        if (row.VIG_FLAG) {

                            var btnEditar = '<a title="Editar" href="#" onclick="return OpenModalAddUpdateUser(' + 1 + ',' + '\'' + row.I_CVE_USUARIO + '\'' + ',\'' + row.T_DSC_NOMBRE + '\'' + ',\'' + row.T_DSC_APELLIDO_PATERNO + '\'' + ',\'' + row.T_DSC_APELLIDO_MATERNO + '\'' + ',\'' + row.I_CVE_PERFIL + '\'' + ',\'' + row.T_DSC_CORREO + '\'' + ')"><i style="color:black" class="fa-solid fas fa-edit fa-lg"></i></a>';
                            var btnEliminar = '<a title="Eliminar" href="#" onclick="OpenModalDelete(' + '\'' + row.I_CVE_USUARIO + '\'' + ')"><i style="color:red" class="fa-solid fas fa-trash fa-lg"></i></a>';
                            var btnEnviarCorreo = '<a title="Reenviar Correo" href="#" onclick="OpenModalCorreo(' + '\'' + row.I_CVE_USUARIO + '\'' + ',\'' + row.T_DSC_CORREO + '\'' + ',\'' + row.T_DSC_NOMBRE_LARGO + '\'' + ')"><i style="color:steelblue" class="fa-solid fas fa-envelope fa-lg"></i></a>';

                            if (row.I_CVE_PERFIL == 1) {
                                return btnEditar + ' | ' + btnEliminar;
                            }
                            else {
                                return btnEditar + ' | ' + btnEliminar + ' | ' + btnEnviarCorreo;
                            }
                        }
                        return '';

                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { "width": "20%", className: "dt-center", targets: [1] }
            ]
        });
    });
}

async function AddUpdateAforeSiefore() {

    if (!($('#frmAddUpdateAforeSiefore').valid())) return false;

    var response;
    var argsUsuario;
    var methodStr = '';
    var url = '';

    argsUsuario = {
        I_CVE_USUARIO: $('#IDDSC_USUARIO').val(),
        T_DSC_NOMBRE: $('#IDNombre').val(),
        T_DSC_APELLIDO_PATERNO: $('#IDApellidoPat').val(),
        T_DSC_APELLIDO_MATERNO: $('#IDApellidoMat').val(),
        I_CVE_PERFIL: $('#IDddlPerfil').val(),
        T_DSC_CORREO: $('#IDCorreo').val(),
        T_DSC_USUARIOSESION: $('#USUARIOSESION').val(),
        T_DSC_ORIGEN: 'I'   /*  I - Interno     E - Externo  */
    };

    url = $('#IDTipoAlta').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';

    try {

        methodStr = $('#IDTipoAlta').val() == 0 ? 'POST' : 'PUT';

        response = await fetchDataAsync(url, methodStr, JSON.stringify(argsUsuario));

        toastr.options = {
            "timeOut": 3000,
            "closeButton": true,
            "progressBar": true,
            "newestOnTop": true
        }

        if (response.Exito) {
            GetAllData();
            $('#ModalAddUpdateUser').modal('hide');
            toastr.success('Operación exitosa', 'Usuarios').css("width", "200px");
        }
        else {
            toastr.error(response.Mensaje, 'Usuarios').css("width", "200px");
        }
    } catch (error) {
        console.log(error);
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Usuarios').css("width", "150px");
    }
}




async function GetEntidades() {

    var argsNormatividad;
    var url = '';

    //url = $("#FQDN").val() + 'api/Afores/ObtenerEntidades';
    url = 'http://localhost:12935/api/Afores/ObtenerEntidades';
    console.log(url)
    try {
        response = await fetchDataEntidadesAsync('' + url + '', 'GET', {})
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
        toastr.error('No se puede cargar catálogo', 'Entidades')
    }
}


async function fetchDataEntidadesAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        console.log(response)

        var s = '<option value="-1">Selecciona un Tipo de Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_T_ENT + '">' + response[i].DESC_T_ENT + '</option>';
            /*     console.log(s);*/
        }
        $("#SelectEntidades").html(s);
    });
}



async function GetOrganoGobierno() {

    var argsNormatividad;
    var url = '';

    //url = $("#FQDN").val() + 'api/Afores/ObtenerOrganoGobierno';
    url = 'http://localhost:12935/api/Afores/ObtenerOrganoGobierno';
    console.log(url)
    try {
        response = await fetchDataOrganoGobiernoAsync('' + url + '', 'GET', {})
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
        toastr.error('No se puede cargar catálogo', 'Entidades')
    }
}


async function fetchDataOrganoGobiernoAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        console.log(response)

        var s = '<option value="-1">Selecciona un Organo de Gobierno</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].I_CVE_GOBIERNO + '">' + response[i].T_DSC_CORTA + ' - ' + response[i].T_DSC_GOBIERNO + '</option>';
            /*     console.log(s);*/
        }
        $("#SelectOrganoGobierno").html(s);
    });
}



async function GetSesion() {

    var argsNormatividad;
    var url = '';

    //url = $("#FQDN").val() + 'api/Afores/ObtenerEntidades';
    url = 'http://localhost:12935/api/Afores/ObtenerSesion';
    console.log(url)
    try {
        response = await fetchDataSesionAsync('' + url + '', 'GET', {})
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
        toastr.error('No se puede cargar catálogo', 'Entidades')
    }
}


async function fetchDataSesionAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        console.log(response)

        var s = '<option value="-1">Selecciona un número de sesión</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].I_CVE_SESION + '">' + response[i].T_DSC_SESION + '</option>';
            /*     console.log(s);*/
        }
        $("#SelectSesion").html(s);
    });
}



async function GetTipoSesion() {

    var argsNormatividad;
    var url = '';

    //url = $("#FQDN").val() + 'api/Afores/ObtenerEntidades';
    url = 'http://localhost:12935/api/Afores/ObtenerTipoSesion';
    console.log(url)
    try {
        response = await fetchDataTipoSesionAsync('' + url + '', 'GET', {})
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
        toastr.error('No se puede cargar catálogo', 'Entidades')
    }
}


async function fetchDataTipoSesionAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        console.log(response)

        var s = '<option value="-1">Selecciona un Tipo de sesión</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].I_CVE_TIPO_SESION + '">' + response[i].T_DSC_TIPO_SESION + '</option>';
            /*     console.log(s);*/
        }
        $("#SelectTipoSesion").html(s);
    });
}



function OpenModalAddUpdateAfores(I_CVE_GOBIERNO, T_DSC_GOBIERNO) {


    $("#IDDSC_USUARIO").val(I_CVE_GOBIERNO);
    $("#IDNombre").val(T_DSC_GOBIERNO);

    $('#ModalAddUpdateAfores').modal({ backdrop: 'static', keyboard: false });

    $('#ModalAddUpdateAfores').modal('show');

}

function CloseModalAddUpdateAfores() {
    //$("#frmAddUpdateUsuario").trigger("reset");
    $("#ModalAddUpdateAfores").modal('hide');
    //$("#frmAddUpdateUsuario").data('validator').resetForm();
}

function OpenModalDelete(id) {
    //$("#IDDSC_USUARIO").val(id);
    $('#ModalDelete').modal('show');
}

function CloseModalDelete() {
    $("#ModalDelete").modal('hide');
}
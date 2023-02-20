$(document).ready(function () {

    //GetAllPuestos();
    GetAllTipoEntidades();
    //GetAllEntidades();
    //GetAllAreas();
    GetAllDataPuestosVigentes();


});


function changeEventHandler(event) {

    var id = event.target.value

    if (id == "-1") {

        $("#IdSelectedEntidad").attr('disabled', true);
        $('#IdSelectedEntidad').val("");
        $('#IdSelectedArea').attr('disabled', true);
        $('#IdSelectedArea').val("");

        return;
    }

    $("#IdSelectedEntidad").attr('disabled', false);
    $('#IdSelectedEntidad').val("");

    /*alert(event.target.value);*/

    GetAllEntidades(id);
}

function changeEventHandlerEntidad(event) {

    var id = event.target.value


    var id = event.target.value

    if (id == "-1") {

        //$("#IdSelectedEntidad").attr('disabled', true);
        //$('#IdSelectedEntidad').val("");
        $('#IdSelectedArea').attr('disabled', true);
        $('#IdSelectedArea').val("");

        return;
    }

    $('#IdSelectedArea').attr('disabled', false);
    $('#IdSelectedArea').val("");

    GetAllAreas(id);
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




async function GetAllEntidades(id) {



    if (id == "-1") {
        $("#IdSelectedEntidad").attr('disabled', false);
        $('#IdSelectedEntidad').val("-1");
        return;
    }
    $("#IdSelectedEntidad").attr('disabled', false);
    $('#IdSelectedEntidad').val("-1");

    //alert(id)
    var url = '';
    argsEntidades = {

        ID_T_ENT: id
    };
    //url = $("#FQDN").val() + 'api/Entidades/GetEntidades';
    url = 'http://localhost:6435/Api/Entidades/GetEntidadesById';


    try {
        response = await fetchEntidadesAsync('' + url + '', 'POST', JSON.stringify(argsEntidades));
        console.log(response)
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchEntidadesAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        console.log(response)
        var s = '<option value="-1">Selecciona una Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].CVE_ID_ENT + '">' + response[i].SIGLAS_ENT + '</option>';
        }
        $("#IdSelectedEntidad").html(s);
    });
}


async function GetAllAreas(idArea) {
    var url = '';

    argsEntidades = {

        CVE_ID_ENT: idArea,//$('#IdSelectedEntidad').val(),
        ID_T_ENT: $('#IdSelectedTipoEntidad').val()
    };

    //url = $("#FQDN").val() + 'api/Entidades/GetEntidades';
    url = 'http://localhost:6435/Api/Areas/GetAreasById';


    try {
        response = await fetchAreasAsync('' + url + '', 'POST', JSON.stringify(argsEntidades));
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchAreasAsync(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {

        var s = '<option value="-1">Selecciona un Área</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].ID_AREA + '">' + response[i].DESC_AREA + '</option>';
        }
        $("#IdSelectedArea").html(s);
    });
}



async function GetAllPuestos() {
    CardStylesOne();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Puestos/GetPuestos';

    try {
        response = await fetchDataAsyncTablePuestos('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTablePuestos(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTablePuestos').DataTable({
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
                { 'data': 'ID_PUESTO', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "uniqueClassName" },
                { 'data': 'SIGLAS_ENT', className: "uniqueClassName" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },

                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'ID_AREA', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePuesto(' + row.ID_PUESTO + ',' + '\'' + row.DESCRIPCION_PUESTO + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.CVE_ID_ENT + '\'' + ',\'' + row.ID_AREA + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_PUESTO + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}



async function GetAllDataPuestosVigentes() {
    CardStylesTwo();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Puestos/GetTipoPuestosVigentes';

    try {
        response = await fetchDataAsyncTablePuestosVigentes('' + url + '', 'GET', {});
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}


async function fetchDataAsyncTablePuestosVigentes(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTablePuestosVigentes').DataTable({
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
                { 'data': 'ID_PUESTO', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "uniqueClassName" },
                { 'data': 'SIGLAS_ENT', className: "uniqueClassName" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },

                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'ID_AREA', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePuesto(' + row.ID_PUESTO + ',' + '\'' + row.DESCRIPCION_PUESTO + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.CVE_ID_ENT + ',\'' + row.ID_AREA + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_PUESTO + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}



async function GetAllDataPuestosHistorial() {
    CardStylesThree();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/Api/Puestos/GetTipoPuestosHistorial';

    try {
        response = await fetchDataAsyncTablePuestosHistorial('' + url + '', 'GET', {});
        console.log(response)
    } catch (error) {
        console.log(error)
        response = error.responseJSON;
        mensaje = response.mensaje;
    }
}




async function fetchDataAsyncTablePuestosHistorial(urlString, methodType, args) {

    return await $.ajax({
        contentType: 'application/json',
        url: urlString,
        data: args,
        dataType: 'json',
        type: methodType
    }).then(function (response) {
        $('#dataTablePuestosHistorial').DataTable({
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
                { 'data': 'ID_PUESTO', className: "uniqueClassName" },
                { 'data': 'DESCRIPCION_PUESTO', className: "uniqueClassName" },
                { 'data': 'DESC_T_ENT', className: "uniqueClassName" },
                { 'data': 'SIGLAS_ENT', className: "uniqueClassName" },
                { 'data': 'DESC_AREA', className: "uniqueClassName" },

                { 'data': 'ID_T_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'CVE_ID_ENT', className: "uniqueClassName", "visible": false },
                { 'data': 'ID_AREA', className: "uniqueClassName", "visible": false },

                {
                    data: "Acciones", render: function (data, type, row) {
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdatePuesto(' + row.ID_PUESTO + ',' + '\'' + row.DESCRIPCION_PUESTO + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.DESC_AREA + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_PUESTO + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4, 5, 6, 7] }
            ]
        });
    });
}




//******************************ADD***************************************

async function AddUpdatePuestos() {


    if (!($('#formAddUpdatePuestos').valid())) return false;


    if ($("#formAddUpdatePuestos").valid()) {


        var response;
        var argsUsuario;
        var methodStr = '';
        var url = '';

        argsPuestos = {

            //ID_PUESTO: $('#IdInputClavePuesto').val(),
            DESCRIPCION_PUESTO: $('#IdinputDescripcionPuesto').val(),
            ID_T_ENT: $('#IdSelectedTipoEntidad').val(),
            CVE_ID_ENT: $('#IdSelectedEntidad').val(),
            ID_AREA: $('#IdSelectedArea').val()
        };
        console.log($('#IdPuestoHidden').val())
        console.log(argsPuestos)
        /*url = $('#IDUsuario').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';*/
        url = $('#IdPuestoHidden').val() == 0 ? 'http://localhost:6435/Api/Puestos/Post' : 'http://localhost:6435/api/Entidades/Put';

        try {

            methodStr = $('#IdPuestoHidden').val() == 0 ? 'POST' : 'PUT';
            
            response = await fetchDataAsyncPuesto(url, methodStr, JSON.stringify(argsPuestos));

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
                GetAllDataPuestosVigentes();
                $("#ModalAddUpdatePuesto").modal('hide');
                toastr.info(response.Mensaje, 'Puestos').css("width", "250px");
            }
            else {
                toastr.error(response.Mensaje, 'Puestos').css("width", "200px");
            }
        } catch (error) {
            response = error.responseJSON;
            mensaje = response.Mensaje;
            toastr.error('Error', 'Usuarios').css("width", "150px");
        }
    }

}


async function fetchDataAsyncPuesto(urlString, methodType, args) {
    
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

function OpenModalAddUpdatePuesto(ID_PUESTO, DESCRIPCION_PUESTO, ID_T_ENT, CVE_ID_ENT, ID_AREA) {

    if (ID_PUESTO != 0) {
        $("#ModalCenterTitle").html('Editar Puesto');
        $("#ModalCenterTitleH6").html('Editar Puesto');

        $("#IdSelectedTipoEntidad").val(ID_T_ENT);
        $("#IdSelectedEntidad").val(CVE_ID_ENT);
        $("#IdSelectedTipoEntidad").val(ID_AREA);

        $("#IdInputClave").val(ID_PUESTO);
        $("#IdinputDescripcion").val(DESCRIPCION_PUESTO);



    }
    else {
        $("#ModalCenterTitle").html('Registrar Puesto');
        $("#ModalCenterTitleH6").html('Registrar Puesto');
        $('#IdSelectedEntidad').val("");
        $("#IdSelectedEntidad").html("");
        $('#IdSelectedArea').val("");

        ResetControlsPuestos();
    }

    $("#IdPuestoHidden").val(ID_PUESTO);

    $('#ModalAddUpdatePuesto').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdatePuesto').modal('show');

}


function CloseModalAddUpdatePuesto() {
    $("#formAddUpdatePuestos").trigger("reset");
    $("#ModalAddUpdatePuesto").modal('hide');
    $("#formAddUpdatePuestos").data('validator').resetForm();
}

//***************************************************************************


//*******************************DELETE************************************

async function DeletePuesto() {

    //alert("1")

    var argsUsuario;
    var response;
    var url = '';

    argsPuestos = {

        ID_PUESTO: $('#IdInputClavePuesto').val(),
        
        ID_T_ENT: $('#IdSelectedTipoEntidad').val(),
        CVE_ID_ENT: $('#IdSelectedEntidad').val(),
        ID_AREA: $('#IdSelectedArea').val()
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

            toastr.success(response.Mensaje, 'Puestos').css("width", "250px");
        }
        else {
            toastr.error(response.Mensaje, 'Puestos').css("width", "250px");
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


function CloseModalDelete() {
    $("#ModalDelete").modal('hide');
    $("#formAddUpdatePuestos").trigger("reset");
    $("#formAddUpdatePuestos").data('validator').resetForm();

}

//***************************************************************************


function ResetControlsPuestos() {

    $("#IdInputClave").val("");
    $("#IdInputClave").attr('disabled', false);


    $("#IdSelectedEntidad").attr('disabled', true);
    $('#IdSelectedEntidad').val("-1");

    $("#IdSelectedArea").attr('disabled', true);
    $('#IdSelectedArea').val("-1");



    $("#IdinputDescripcion").val("");
    $("#IdInputSiglas").val("");


}


$().ready(function () {


    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');



    $("#formAddUpdatePuestos").validate({

        errorElement: 'span',

        errorPlacement: function (error, element) {

            if (element.parent().hasClass('input-group')) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }

        },

        rules: {


            IdSelectedTipoEntidad: { valueNotEquals: "-1" },
            IdSelectedEntidad: { valueNotEquals: "-1" },
            IdSelectedArea: { valueNotEquals: "-1" },

            IdInputClavePuesto: "required",
            IdInputClavePuesto: {
                required: true,
                minlength: 1,
                maxlength: 500
            },


            IdinputDescripcionPuesto: "required",
            IdinputDescripcionPuesto: {
                required: true,
                minlength: 1,
                maxlength: 500
            },


            IdSelectedTipoEntidad: {
                negativo: true
            },
            IdSelectedEntidad: {
                negativo: true
            },
            IdSelectedArea: {
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

            IdInputClavePuesto: {
                required: "Por favor ingresa el clave",
                minlength: "El nombre no debe ser menor a 1 caracter",
                maxlength: "El nombre no debe de ser mayor a 500 caracteres"
            },

            IdinputDescripcionPuesto: {
                required: "Por favor ingresa la Descripción",
                minlength: "La Descripción no debe ser menor a 1 caracter",
                maxlength: "La Descripción no debe de ser mayor a 500 caracteres"
            },

            IdSelectedTipoEntidad: {
                negativo: "Seleccione un elemento de la lista"
            },

        }

    });


});
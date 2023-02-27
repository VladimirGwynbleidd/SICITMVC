$(document).ready(function () {

    //GetAllAreas();
    GetAllDataAreasVigentes();
    $('#IdInputClaveAreas').attr('disabled', true);
});


function changeEventHandlerTipoEntidad(event) {

    var id = event.target.value

    if (id == "-1") {

        $("#IdSelectedEntidad").attr('disabled', true);
        $('#IdSelectedEntidad').val("");

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
        //console.log(response)
        var s = '<option value="-1">Selecciona una Entidad</option>';
        for (var i = 0; i < response.length; i++) {
            s += '<option value="' + response[i].CVE_ID_ENT + '">' + response[i].SIGLAS_ENT + '</option>';
        }
        $("#IdSelectedEntidad").html(s);
    });
}


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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateAreas(' + row.ID_AREA + ',' + '\'' + row.DESC_AREA + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.CVE_ID_ENTAS + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_AREA + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateAreas(' + row.ID_AREA + ',' + '\'' + row.DESC_AREA + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.CVE_ID_ENTAS + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_AREA + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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
                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateAreas(' + row.ID_AREA + ',' + '\'' + row.DESC_AREA + '\'' + ',\'' + row.DESC_T_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ',\'' + row.CVE_ID_ENTAS + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.ID_AREA + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
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

    if (!($('#formAddUpdateAreas').valid())) return false;


    var response;
    var argsUsuario;
    var methodStr = '';
    var url = '';

    argsAreas = {

        ID_AREA: $('#IdAreaHidden').val(),
        DESC_AREA: $('#IdinputDescripcionAreas').val(),
        //DESC_T_ENT: $("#IdSelectedTipoEntidad :selected").text(),
        //SIGLAS_ENT: $("#IdSelectedEntidad :selected").text(),
        ID_T_ENT: $('#IdSelectedTipoEntidad').val(),
        CVE_ID_ENT: $('#IdSelectedEntidad').val(),
    };
    console.log(JSON.stringify(argsAreas))

    /*url = $('#IDUsuario').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';*/
    url = $('#IdAreaHidden').val() == 0 ? 'http://localhost:6435/Api/Areas/Post' : 'http://localhost:6435/Api/Areas/Put';

    try {

        methodStr = $('#IdAreaHidden').val() == 0 ? 'POST' : 'PUT';

        response = await fetchDataAsyncAreas(url, methodStr, JSON.stringify(argsAreas));

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
            GetAllDataAreasVigentes();
            $("#ModalAddUpdateAreas").modal('hide');
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

async function fetchDataAsyncAreas(urlString, methodType, args) {

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

async function OpenModalAddUpdateAreas(ID_AREA, DESC_AREA, DESC_T_ENT, SIGLAS_ENT, ID_T_ENT, CVE_ID_ENTAS) {


    if (ID_AREA != 0) {
        $("#ModalCenterTitle").html('Editar Área');
        $("#ModalCenterTitleH6").html('Editar Área');
        $("#IdInputClaveAreas").val(ID_AREA);

        $("#IdinputDescripcionAreas").val(DESC_AREA);
        $("#IdAreaHidden").val(ID_AREA);
        await GetAllTipoEntidades();
        await GetAllEntidades(ID_T_ENT);

        $("#IdSelectedTipoEntidad").val(ID_T_ENT);
        $("#IdSelectedEntidad").val(CVE_ID_ENTAS);

    }
    else {
        $("#ModalCenterTitle").html('Registrar Área');
        $("#ModalCenterTitleH6").html('Registrar Área');
        $('#IdTipoEntidadHidden').val(DESC_T_ENT);
        $('#IdEntidadHidden').val(SIGLAS_ENT);
        $('#IdSelectedEntidad').val("");

        ResetControlsAreas();
    }


    $('#ModalAddUpdateAreas').modal({ backdrop: 'static', keyboard: false });
    $('#ModalAddUpdateAreas').modal('show');

}
//***************************************************************************



function ResetControlsAreas() {

    $("#IdInputClaveAreas").val("");
    $("#IdInputClaveAreas").attr('disabled', true);


    $("#IdSelectedEntidad").attr('disabled', true);
    $('#IdSelectedEntidad').val("-1");



    $("#IdinputDescripcionAreas").val("");

    GetAllTipoEntidades();

}


//*******************************DELETE************************************

async function DeleteArea() {

    //alert("1")

    var argsUsuario;
    var response;
    var url = '';

    argsAreas = {
        ID_AREA: $('#IdAreaHidden').val(),
    };

    //url = $("#FQDN").val() + 'api/usuarios/delete';
    url = 'http://localhost:6435/Api/Areas/Delete';

    try {
        response = await fetchDataAsyncAreas('' + url + '', 'DELETE', JSON.stringify(argsAreas));

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


function OpenModalDelete(ID_AREA) {

    $("#IdAreaHidden").val(ID_AREA);


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


$().ready(function () {


    $.validator.addMethod('negativo', function (value, element) {
        return (value != '-1');
    }, 'Seleccione un elemento de la lista');



    $("#formAddUpdateAreas").validate({

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
            


            IdinputDescripcionAreas: "required",
            IdinputDescripcionAreas: {
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


        },
        highlight: function (element) {
            $(element).parent().addClass('error')
        },
        unhighlight: function (element) {
            $(element).parent().removeClass('error')
        },
        messages: {


            IdinputDescripcionAreas: {
                required: "Por favor ingresa la Descripción",
                minlength: "La Descripción no debe ser menor a 1 caracter",
                maxlength: "La Descripción no debe de ser mayor a 500 caracteres"
            },

        }

    });


});
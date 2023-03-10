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
    //url = 'http://localhost:6435/Api/Entidades/GetTipoEntidades';
    url = $("#FQDN").val() + 'Api/Entidades/GetTipoEntidades';


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
    //url = 'http://localhost:6435/api/Entidades/GetEntidades';
    url = $("#FQDN").val() + 'api/Entidades/GetEntidades';

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
                        title: 'Entidades Todas',
                        exportOptions: {
                            columns: [0, 1, 2, 3],

                            format: {
                                body: function (data, row, column, node) {

                                    if (column == 5) {
                                        return node.innerText.replaceAll('|', '');
                                    }
                                    else {
                                        return data;
                                    }
                                }
                            }
                        },
                    },

                ]
            },
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
        ID_T_ENT: $('#IdSelectedTipo').val(),

        USUARIOSESION: $('#USUARIOSESION').val(),
        GUID: $('#GUID').val()
    };
    //console.log($('#IdEntidadHidden').val())
    /*url = $('#IDUsuario').val() == 0 ? $("#FQDN").val() + 'api/usuarios/post' : $("#FQDN").val() + 'api/usuarios/put';*/
    //url = $('#IdEntidadHidden').val() == 0 ? 'http://localhost:6435/api/Entidades/Post' : 'http://localhost:6435/api/Entidades/Put';
    url = $('#IdEntidadHidden').val() == 0 ? $("#FQDN").val() + 'api/Entidades/Post' : $("#FQDN").val() + 'api/Entidades/Put';

    try {

        methodStr = $('#IdEntidadHidden').val() == 0 ? 'POST' : 'PUT';

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
            GetAllDataVigentes();
            $("#ModalAddUpdateEntidades").modal('hide');
            if ($('#IdEntidadHidden').val() == 0) {
                toastr.success(response.Mensaje, 'Se ha agregado correctamente la Entidad').css("width", "250px");
            }
            else {
                toastr.success(response.Mensaje, 'Se ha actualizado correctamente la Entidad').css("width", "250px");
            }
        }
        else {
            toastr.error(response.Mensaje, 'Error al registrar o actulizar la Entidad').css("width", "200px");
        }
    } catch (error) {
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Error al registrar o actulizar la Entidad').css("width", "150px");
    }
}



async function GetAllDataVigentes() {
    CardStylesTwo();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    //url = 'http://localhost:6435/Api/Entidades/GetEntidadesById';
    //url = 'http://localhost:6435/Api/Entidades/GetEntidadesVigentes';

    url = $("#FQDN").val() + 'Api/Entidades/GetEntidadesVigentes';

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
        var table = $('#dataTableVigentes').DataTable({
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
            //"bJQueryUI": true,
            //"bSort": false,
            //"bPaginate": true,
            //"sPaginationType": "full_numbers",
            //"iDisplayLength": 10,
            //pagingType: 'full_numbers',
            /* "bLengthChange": false,*/

            destroy: true,
            data: response,
            sort: true,
            searching: true,
            responsive: true,
            pagination: "bootstrap",
            //buttons: ['excel', 'csv', 'pdf', 'copy'],
            //"lengthMenu": [50, 100, 500, 1000, 2000, 5000, 10000, 50000, 100000],
            /*dom: '<"top"Blf>rt<"bottom"p><"clear">',*/
            //dom: 'B<"clear">lfrtip',
            //dom: 'lBfrtip',
            //dom: 'lfrtip',
            //Dom: '<"top"i>rt<"bottom"flpi><"clear">',
            //dom: "<'row'<'col-3'B><'col-9 text-right'lf>><'row'<'col-sm-12'tr>><'row'<'col-sm-12'ip>>",
            /*     dom: '<"container-fluid"<"row"<"col"B><"col"l><"col"f>>>rtip',*/
            //dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
            //dom: 'T<"clear">lftipr',
            //dom: "<'row'<'col-sm-12 col-md-6'f><'col-sm-12 col-md-6'B>>" +
            //    "<'row'<'col-sm-12'tr>>" +
            //    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
            //buttons: {
            //    dom: {
            //        button: {
            //            tag: 'i',
            //            className: ''
            //        }
            //    },
            //    buttons: [
            //        //{
            //        //    titleAttr: 'Download as PDF',
            //        //    extend: 'pdfHtml5',
            //        //    className: 'custom-btn fa fa-file-pdf-o',
            //        //    text: ''
            //        //},
            //        //{
            //        //    titleAttr: 'Download as Excel',
            //        //    extend: 'excelHtml5',
            //        //    className: 'custom-btn btn btn-success fa fa-file-excel fa-2x color:green',
            //        //    text: ''
            //        //},
            //        {
            //            //EXCEL
            //            extend: 'excelHtml5',
            //            text: '<i class="fas fa-file-excel btn btn-success"></i>', //u can define a diferent text or icon
            //            title: 'Entidades Vigentes',
            //        },
            //        //{
            //        //    titleAttr: 'Download as CSV',
            //        //    extend: 'csvHtml5',
            //        //    className: 'custom-btn fa fa-file-text-o',
            //        //    text: ''
            //        //},
            //        //{
            //        //    titleAttr: 'Print',
            //        //    extend: 'print',
            //        //    className: 'custom-btn fa fa-print',
            //        //    text: ''
            //        //},

            //    ]
            //},  
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
                        title: 'Entidades Vigentes',
                        exportOptions: {
                            columns: [0, 1, 2, 3],

                            format: {
                                body: function (data, row, column, node) {

                                    if (column == 5) {
                                        return node.innerText.replaceAll('|', '');
                                    }
                                    else {
                                        return data;
                                    }
                                }
                            }
                        },
                    },

                ]
            },
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


        var tableTools = new $.fn.dataTable.TableTools(table, {
            'aButtons': [
                {
                    'Extends': 'xls',
                    'ButtonText': 'Save to Excel',
                    'FileName': 'Data.xls'
                }],
            'sSwfPath': '//cdn.datatables.net/tabletools/2.2.4/swf/copy_csv_xls_pdf.swf'
        });
        $(tableTools.fnContainer()).insertBefore('#datatable_wrapper');


    });
}


async function GetAllDataHistorial() {
    CardStylesThree();
    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    //url = 'http://localhost:6435/api/Entidades/GetEntidadesHistorial';
    url = $("#FQDN").val() + 'api/Entidades/GetEntidadesHistorial';

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
            //dom: '<"top"<"left-col"B><"center-col"l><"right-col"f>>rtip',
            //buttons: {
            //    dom: {
            //        button: {
            //            tag: 'i',
            //            className: ''
            //        }
            //    },
            //    buttons: [
            //        {
            //            extend: 'excelHtml5',
            //            text: '<i class="fas fa-file-excel btn btn-success"></i>', //u can define a diferent text or icon
            //            title: 'Entidades Historial',
            //        },

            //    ]
            //},
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
                        title: 'Entidades Historial',
                        exportOptions: {
                            columns: [0, 1, 2, 3],

                            format: {
                                body: function (data, row, column, node) {

                                    if (column == 5) {
                                        return node.innerText.replaceAll('|', '');
                                    }
                                    else {
                                        return data;
                                    }
                                }
                            }
                        },
                    },

                ]
            },
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
        ID_T_ENT: $('#IdTipoEntidadHidden').val(),

        USUARIOSESION: $('#USUARIOSESION').val(),
        GUID: $('#GUID').val()
    };

    url = $("#FQDN").val() + 'api/Entidades/Delete';

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
            GetAllDataVigentes();
            $("#ModalDelete").modal('hide');

            toastr.success(response.Mensaje, 'Se ha eliminado correctamente la Entidad').css("width", "250px");
        }
        else {
            toastr.error(response.Mensaje, 'Error al eliminar la Entidad').css("width", "250px");
        }
    } catch (error) {
        response = error.responseJSON;
        mensaje = response.Mensaje;
        toastr.error('Error', 'Error al eliminar la Entidad').css("width", "250px");
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
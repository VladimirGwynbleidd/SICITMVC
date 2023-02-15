$(document).ready(function () {
    GetAllDataMonitor();
});

async function GetAllDataMonitor() {

    var url = '';

    //url = $("#FQDN").val() + 'api/usuarios/ObtenerUsuarios';
    url = 'http://localhost:6435/api/Monitor/GetMonitor';

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
        $('#dataTableMonitorTodos').DataTable({
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
                { 'data': 'NUM_FOLIO', className: "uniqueClassName" },
                //{ 'data': 'ID_T_ENT', className: "uniqueClassName" },
                { 'data': 'ID_PAQUETE', className: "text-center" },
                { 'data': 'FECH_FIN_OPER', className: "text-left" },
                { 'data': 'FECH_INI_OPER', className: "uniqueClassName", "visible": true },
                { 'data': 'FECH_PROP_TERM', className: "uniqueClassName", "visible": true },
                { 'data': 'ID_ESTATUS', className: "text-left" },

                {
                    data: "Acciones", render: function (data, type, row) {

                        if (row.ID_ESTATUS == 1)


                        return '<a title="Editar" href="#" onclick="return OpenModalAddUpdateEntidades(' + row.CVE_ID_ENT + ',' + '\'' + row.DESC_ENT + '\'' + ',\'' + row.SIGLAS_ENT + '\'' + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:black" class="fas fa-fw fa-edit fa-lg"></i></a> | <a title="Eliminar" href="#" onclick="OpenModalDelete(' + row.CVE_ID_ENT + ',\'' + row.ID_T_ENT + '\'' + ')"><i style="color:red" class="fas fa-solid fa-trash fa-lg"></i></a>';
                    }, sortable: false, className: "uniqueClassName"
                }
            ],

            columnDefs: [
                { className: "dt-center", targets: [0, 1, 2, 3, 4] }
            ]
        });
    });
}
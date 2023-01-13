var consulta = $("#searchTable").DataTable();

$("#inputBusqueda").keyup(function(){
    consulta.search($(this).val()).draw();

    $("header"). css({
    "height": "100vh",
    "background": "rgba(0, 0, 0, 0.5)"
    })

    if ($("#inputBusqueda").val() == ""){
        $("header"). css({
            "height": "40px !important",
            "background": "none"
            }) 

            $("#search").hide();
    } else{
        $("#search").fadeIn("fast");
    }

})
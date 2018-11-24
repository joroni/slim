$(document).ready(function () {
   /*
    
    $(".sidebar").load("sidebar.html", function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            console.log("sidebar loaded");
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });



    $(".navbar").load("navbar.html", function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            console.log("navbar loaded");
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
*/
    loadPage('Products');
  
    /*$( ".link-item" ).each( function(){
        // var link = $( "a.link-item", this );
       
     })*/


     $('button.button-add, button.close').on('click', function () {
        resetFields();
    });
    
    $('#myModal').modal({backdrop:'static',keyboard:false, show:false});
});
resetFields = function(){
   // $('form input, form textarea').val("");
   
        $(".identifier").val("");
            $("#sku").val("");
            $("#name").val("");
            $("#state").val("");
            $("#cat").val("");
            $("#statecolor").val("");
            $("#size").val("");
            $("#img").val("");
            $("#oldprice").val("");
            $("#price").val("");
            $("#descr").val("");
            $("#stock").val("");
   
}





/**************************View All Products 
readAllProducts = function () {
    console.log("Pulling data...");
   
    $.getJSON(base_url + '/slim/public/api/products', function (data) {
        var items = [];
        products = data;
        // localStorage.setItem("products", JSON.stringify(data));
       
        console.log(data);
        console.log("Pulling data complete.");
        // var products = JSON.parse(localStorage.getItem("products"));
        $('#product-tbody').html("");
        loader.show();
        setTimeout(function(){
        for (var i = 0; i < products.length; i++) {

            var temp = '<tr><td>' + products[i].id + '</td>' +
                '<td><a href="#" onclick="readEditProduct(' + products[i].id +
                ');" data-toggle="modal" class="item-link" data-target="#myModal" data-whatever="' +
                products[i].id +
                '">' + products[i].sku + '</a></td>' +
                '<td>' + products[i].name + '</td>' +
                '<td>' + products[i].cat + '</td>' +
                '<td>' + products[i].price + '</td></tr>';
            //   alert(temp);
            $('#product-tbody').append(temp);
            loader.hide();
            }
        },2000);
    
    });


}



$('#myModal').on('show.bs.modal', function (event) {
    var modal = $(this);
    var button = $(event.relatedTarget); // Button that triggered the modal
    console.log(button);
    var recipient = button.data('whatever'); // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    modal.find('.modal-body input.identifier').val(recipient);


});


$('.button-add').on('click', function (event) {
    $('form input, form textarea').val("");
    $('.button-update').addClass("hidden");
    $('.button-save').removeClass("hidden");
});*/

var loader = $('.loader');
//   var base_url = 'http://104.238.96.209/~project/joroni/super8';
var base_url = 'http://localhost';

$(document).ready(function () {
    readAllProducts();
    dashboardLoad();
    //readAllOrders();
    $("a.products-load").on('click', function () {
        readAllProducts();
    });

    $("a.orders-load").on('click', function () {
        readAllOrders();
    })
//loadPage('Products');

    $('.datenow').html(new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear());
    

});



dashboardLoad = function(){
    var page = 'Dashboard';
    $("#ContentContainer").load("./"+page+".html", function(responseTxt, statusTxt, xhr){
    
        $(this).parent().addClass("active");
           if(statusTxt == "success"){
               loader.show();
               setTimeout(function(){
                  
                   loader.hide();
                   readAllProducts();
                   readAllOrders();
               },1000);
               console.log("list loaded");
           }
         
              
           if(statusTxt == "error")
               console.log("Error: " + xhr.status + ": " + xhr.statusText);
       });
}

$('a.link-item').on('click', function(){
    var page = $(this).data('id');
    console.log(page);
    $('.navbar-brand').html(page);
    $("#ContentContainer").load("./"+page+".html", function(responseTxt, statusTxt, xhr){
    
     $(this).parent().addClass("active");
        if(statusTxt == "success"){
            loader.show();
            setTimeout(function(){
               
                loader.hide();
                readAllProducts();
                readAllOrders();
            },1000);
            console.log("list loaded");
        }
      
           
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
});
/************************START Products********************* */


/**************************View All Products */
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
});

/*******************Add Product*************************/

saveProductData = function (event) {
    var sku = $("#sku").val(),
        name = $("#name").val(),
        state = $("#state").val(),
        cat = $("#cat").val(),
        statecolor = $("#statecolor").val(),
        size = $("#size").val(),
        img = $("#img").val(),
        oldprice = $("#oldprice").val(),
        price = $("#price").val(),
        descr = $("#descr").val(),
        stock = $("#stock").val();

    loader.show();
    // Add record
    $.post(base_url + '/slim/public/api/products/add', {
        sku: sku,
        name: name,
        state: state,
        cat: cat,
        statecolor: statecolor,
        size: size,
        img: img,
        oldprice: oldprice,
        price: price,
        stock: stock,
        descr: descr
    }, function (data, status) {
        loader.hide();
        // close the popup
        $("#myModal").modal("hide");

        // read records again
        readAllProducts();

        // clear fields from the popup
        $('input').val("");
    })


}


/*******************Update Product*************************/


readEditProduct = function (id) {
    $('.button-update').removeClass("hidden");
    $('.button-save').addClass("hidden");
    loader.show();
    console.log("Pulling data...");


    // Loading form objects to modal

    $.getJSON(base_url + '/slim/public/api/products/' + id, function (data) {
        var items = [];

        console.log(data);
        console.log("Pulling data complete.");
        loader.hide();
        var modal = $("#myModal");
        $(".identifier").val(data.id),
            $("#sku").val(data.sku),
            $("#name").val(data.name),
            $("#state").val(data.state),
            $("#cat").val(data.cat),
            $("#statecolor").val(data.statecolor),
            $("#size").val(data.size),
            $("#img").val(data.img),
            $("#oldprice").val(data.oldprice),
            $("#price").val(data.price),
            $("#descr").val(data.descr),
            $("#stock").val(data.stock)
        modal.find('.modal-title').text('Edit');
    });


}



updateProductData = function (event) {
    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: base_url + '/slim/public/api/products/update/' + $('.identifier').val(),
        dataType: "json",
        data: formToJSON(),
        success: function (data, textStatus, jqXHR) {
            alert('Product updated successfully');
            // close the popup
            $("#myModal").modal("hide");
            // read records again
            readAllProducts();
            // clear fields from the popup
            $('input, textarea').val("");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Product updated successfully with error: ' + textStatus);
            // close the popup
            $("#myModal").modal("hide");
            // read records again
            readAllProducts();
            // clear fields from the popup
            $('input, textarea').val("");
        }
    });


    function formProductToJSON() {
        return JSON.stringify({
            "sku": $("#sku").val(),
            "name": $("#name").val(),
            "cat": $("#cat").val(),
            "state": $("#state").val(),
            "statecolor": $("#statecolor").val(),
            "size": $("#size").val(),
            "img": $("#img").val(),
            "oldprice": $("#oldprice").val(),
            "price": $("#price").val(),
            "descr": $("#descr").val(),
            "stock": $("#stock").val(),
            "id": $(".identifier").val()
        });
    }

}
/************************END Products********************* */










/************************START Orders********************* */


/**************************View All Orders */
readAllOrders =function () {
    console.log("Pulling data...");
    loader.show();
    $.getJSON(base_url + '/slim/public/api/orders', function (data) {
        var items = [];
        orders = data;
        // localStorage.setItem("orders", JSON.stringify(data));
        loader.hide();
        console.log(data);
        console.log("Pulling data complete.");
        // var orders = JSON.parse(localStorage.getItem("orders"));
        $('#orders-tbody').html("");
        for (var i = 0; i < orders.length; i++) {

            var temp = '<tr><td>' + orders[i].id + '</td>' +
                '<td><a href="#" onclick="readEditOrder(' + orders[i].ponumber +
                ');" data-toggle="modal" class="item-link" data-target="#myOrderModal" data-whatever="' +
                orders[i].ponumber +
                '">' + orders[i].ponumber + '</a></td>' +
                '<td>' + orders[i].cname + '</td>' +
                '<td>' + orders[i].notes + '</td>' +
                '<td>' + orders[i].dateordered + '</td>' 
            //   alert(temp);
            $('#orders-tbody').append(temp);
        }

    });


}



$('#myOrderModal').on('show.bs.modal', function (event) {
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
});

/*******************Add Order*************************/
function addOrder() {
    console.log('addOrder');
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: base_url + '/slim/public/api/orders/add',
        dataType: "json",
        data: formOrderToJSON(),
        success: function(data, textStatus, jqXHR){
            alert('Wine created successfully');
            $('#btnDelete').show();
            $('#wineId').val(data.id);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('addWine error: ' + textStatus);
        }
    });
}

saveOrdertData = function (event) {
    var ponumber = $("#ponumber").val();

 //   loader.show();
    // Add record
    $.post(base_url + '/slim/public/api/orders/add', {
       
        ponumber: ponumber
    }, function (data, status) {
//loader.hide();
alert("Order sent.")
        // close the popup
      //  $("#myModal").modal("hide");

        // read records again
       // readAllProducts();

        // clear fields from the popup
        $('input').val("");
    })



/*******************Update Order*************************/


readEditOrder = function (ponumber) {
    $('.button-update').removeClass("hidden");
    $('.button-save').addClass("hidden");
    loader.show();
    console.log("Pulling data...");


    // Loading form objects to modal

    $.getJSON(base_url + '/slim/public/api/orders/' + ponumber, function (data) {
       // var items = [];

        console.log('Order Data: ',data);
        console.log("Pulling data complete.");
        loader.hide();
        var modal = $("#myOrderModal");
        $(".identifier").val(data.ponumber),
            $("#ponumber").val(data.ponumber),
            $("#cname").val(data.cname),
            $("#dateordered").val(data.dateordered),
            $("#notes").val(data.notes),
            $("#items").val(data.items),
            $("#total").val(data.total)
        modal.find('.modal-title').text('Edit');
    });


}



updateOrders = function (event) {
    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: base_url + '/slim/public/api/orders/update/' + $('.identifier').val(),
        dataType: "json",
        data: formOrderToJSON(),
        success: function (data, textStatus, jqXHR) {
            alert('Order updated successfully');
            // close the popup
            $("#myOrderModal").modal("hide");
            // read records again
            readAllProducts();
            // clear fields from the popup
            $('input, textarea').val("");

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Order updated successfully with error: ' + textStatus);
            // close the popup
            $("#myModal").modal("hide");
            // read records again
            readAllOrders();
            // clear fields from the popup
            $('input, textarea').val("");
        }
    });

}

function formOrderToJSON() {
        return JSON.stringify({
            "sku": $("#sku").val(),
            "name": $("#name").val(),
            "cat": $("#cat").val(),
            "state": $("#state").val(),
            "statecolor": $("#statecolor").val(),
            "size": $("#size").val(),
            "img": $("#img").val(),
            "oldprice": $("#oldprice").val(),
            "price": $("#price").val(),
            "descr": $("#descr").val(),
            "stock": $("#stock").val(),
            "id": $(".identifier").val()
        });
    }
}





/************************End Orders********************* */


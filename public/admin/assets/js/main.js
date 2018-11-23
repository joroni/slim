$(document).ready(function () {
    readProductData();
    $('.datenow').html(new Date().getMonth() + '/' + new Date().getDate() + '/' + new Date().getFullYear());
$("html").on('click', function(){

    readProductData();
})     

});


var loader=    $('.loader');




//   var base_url = 'http://104.238.96.209/~project/joroni/super8';
var base_url = 'http://localhost';


readProductData = function () {
    console.log("Pulling data...");
loader.show();
    $.getJSON(base_url + '/slim/public/api/products', function (data) {
        var items = [];
        products = data;
        // localStorage.setItem("products", JSON.stringify(data));
       loader.hide();
        console.log(data);
        console.log("Pulling data complete.");
        // var products = JSON.parse(localStorage.getItem("products"));
        $('#product-tbody').html("");
        for (var i = 0; i < products.length; i++) {

            var temp = '<tr><td>' + products[i].id + '</td>' +
                '<td><a href="#" onclick="readEditProductData(' + products[i].id +
                ');" data-toggle="modal" class="item-link" data-target="#productModal" data-whatever="' +
                products[i].id +
                '">' + products[i].sku + '</a></td>' +
                '<td>' + products[i].name + '</td>' +
                '<td>' + products[i].cat + '</td>' +
                '<td>' + products[i].price + '</td></tr>';
            //   alert(temp);
            $('#product-tbody').append(temp);
        }

    });


}



$('#productModal').on('show.bs.modal', function (event) {
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






/*******************Add*************************/

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
        $("#productModal").modal("hide");

        // read records again
        readProductData();

        // clear fields from the popup
        $('input').val("");
    })


}


/*******************Update*************************/


readEditProductData = function (id) {
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
        var modal = $("#productModal");
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
                $("#productModal").modal("hide");
                // read records again
                readProductData();
                // clear fields from the popup
                $('input, textarea').val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Product updated successfully with error: ' + textStatus);

               
                // close the popup
                $("#productModal").modal("hide");
                // read records again
                readProductData();
                // clear fields from the popup
                $('input, textarea').val("");
            }
        });


    function formToJSON() {
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


    /*

            $.post(base_url + '/slim/public/api/products/update/' + id, {
                sku: sku,
                name: name,
                cat: cat,
                state: state,
                statecolor: statecolor,
                size: size,
                img: img,
                oldprice: oldprice,
                price: price,
                descr: descr,
                stock: stock
            }, function (data, status) {
                
                // close the popup
                $("#productModal").modal("hide");
                // read records again
                readProductData();
                // clear fields from the popup
                $('input, textarea').val("");


            })*/




}

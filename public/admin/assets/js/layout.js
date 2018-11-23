$(document).ready(function () {
   
    
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

    loadPage('Products');
    var link = $( "a.link-item", this );
    link.on('click', function(){
        
        $(this).addClass("active");
    }) 
    $( ".link-item" ).each( function(){
        // var link = $( "a.link-item", this );
       
     })


     $('button.button-add, button.close').on('click', function () {
        resetFields();
    });
    
    $('#productModal').modal({backdrop:'static',keyboard:false, show:false});
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

loadPage = function (x){
  
    var thisLabel = x;
    console.log(thisLabel);
    $('.navbar-brand').html(thisLabel);
    $("#ContentContainer").load("./"+x+".html", function(responseTxt, statusTxt, xhr){
    
        $(this).parent().addClass("active");
        if(statusTxt == "success")
            console.log("product list loaded");
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });
}



loadDashboard = function(x){
    $("#ContentContainer").load("dashboard.html", function(responseTxt, statusTxt, xhr){
      $()
        $(this).parent().addClass("active");
        if(statusTxt == "success")
            console.log("dashboard list loaded");
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    });

    readProductData();
}
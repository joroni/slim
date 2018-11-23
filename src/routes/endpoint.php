<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


$app = new \Slim\App;

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


// Get All products
$app->get('/api/jsonproducts', function(Request $request, Response $response){
    $sql = "SELECT * FROM products";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
       echo json_encode($products);
        //console.log(json_encode($products));
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Get All products
$app->get('/api/products', function(Request $request, Response $response){
    $sql = "SELECT * FROM products";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $products = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
       echo json_encode($products, JSON_NUMERIC_CHECK);
        //console.log(json_encode($products));
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Get Single Products
$app->get('/api/products/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "SELECT * FROM products WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $products = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($products);
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Add Products
$app->post('/api/products/add', function(Request $request, Response $response){
    $sku = $request->getParam('sku');
    $name = $request->getParam('name');
    $cat = $request->getParam('cat');
    $state = $request->getParam('state');
    $statecolor = $request->getParam('statecolor');
    $size = $request->getParam('size');
    $img = $request->getParam('img');
    $oldprice = $request->getParam('oldprice');
    $price = $request->getParam('price');
    $descr = $request->getParam('descr');
    $stock = $request->getParam('stock');
    /*$cname = $request->getParam('cname');
    $check = $request->getParam('check');
    $select = $request->getParam('select');
    $notes = $request->getParam('notes');
    $email = $request->getParam('email');
    $smname = $request->getParam('smname');
    $timestamp = $request->getParam('timestamp');
    $ponumber = $request->getParam('ponumber');
    $total = $request->getParam('total');*/



    $sql = "INSERT INTO products (sku,name,cat,state,statecolor,size,img, oldprice, price,descr,stock) VALUES
    (:sku,:name,:cat,:state,:statecolor,:size,:img,:oldprice,:price,:descr,:stock)";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name',  $name);
        $stmt->bindParam(':cat',      $cat);
        $stmt->bindParam(':state',      $state);
        $stmt->bindParam(':statecolor',    $statecolor);
        $stmt->bindParam(':size',       $size);
        $stmt->bindParam(':img',       $img);
        $stmt->bindParam(':oldprice',      $oldprice);
        $stmt->bindParam(':price',      $price);
        $stmt->bindParam(':descr',      $descr);
         $stmt->bindParam(':stock',      $stock);
        

        $stmt->execute();

        echo '{"notice": {"text": "Products Added"}';
       // echo '<script>alert("Products Added");</script>';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
      //  echo "<script>alert(".$e->getMessage().");</script>";
    }
});


/******************Update********************* */

// Update Products
$app->put('/api/products/update/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $sku = $request->getParam('sku');
    $name = $request->getParam('name');
    $cat = $request->getParam('cat');
    $state = $request->getParam('state');
    $statecolor = $request->getParam('statecolor');
    $size = $request->getParam('size');
    $img = $request->getParam('img');
    $oldprice = $request->getParam('oldprice');
    $price = $request->getParam('price');
    $descr = $request->getParam('descr');
    $stock = $request->getParam('stock');
    
   

    $sql = "UPDATE products SET
				sku 	    = :sku,
				name 	    = :name,
                cat		    = :cat,
                state		= :state,
                statecolor 	= :statecolor,
                size 		= :size,
                img		    = :img,
                oldprice    = :oldprice,  
                price       = :price,   
                descr       = :descr,
                stock       = :stock 
			WHERE id        = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name',  $name);
        $stmt->bindParam(':cat',      $cat);
        $stmt->bindParam(':state',      $state);
        $stmt->bindParam(':statecolor',    $statecolor);
        $stmt->bindParam(':size',       $size);
        $stmt->bindParam(':img',      $img);
        $stmt->bindParam(':oldprice',      $oldprice);
        $stmt->bindParam(':price',      $price);
        $stmt->bindParam(':descr',      $descr);
        $stmt->bindParam(':stock',      $stock);

        $stmt->execute();

        echo '{"notice": {"text": "Products Updated"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Delete Products
$app->delete('/api/products/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "DELETE FROM products WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Products Deleted"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});



/*********************************************************** */


// Get All Customers
$app->get('/api/customers', function(Request $request, Response $response){
    $sql = "SELECT * FROM customers";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $customers = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
       echo json_encode($customers);
        //console.log(json_encode($customers));
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Get Single Customer
$app->get('/api/customer/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "SELECT * FROM customers WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $customer = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($customer);
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Add Customer
$app->post('/api/customer/add', function(Request $request, Response $response){
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $sql = "INSERT INTO customers (first_name,last_name,phone,email,address,city,state) VALUES
    (:first_name,:last_name,:phone,:email,:address,:city,:state)";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name',  $last_name);
        $stmt->bindParam(':phone',      $phone);
        $stmt->bindParam(':email',      $email);
        $stmt->bindParam(':address',    $address);
        $stmt->bindParam(':city',       $city);
        $stmt->bindParam(':state',      $state);

        $stmt->execute();

        echo '{"notice": {"text": "Customer Added"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Update Customer
$app->put('/api/customer/update/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $sql = "UPDATE customers SET
				first_name 	= :first_name,
				last_name 	= :last_name,
                phone		= :phone,
                email		= :email,
                address 	= :address,
                city 		= :city,
                state		= :state
			WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name',  $last_name);
        $stmt->bindParam(':phone',      $phone);
        $stmt->bindParam(':email',      $email);
        $stmt->bindParam(':address',    $address);
        $stmt->bindParam(':city',       $city);
        $stmt->bindParam(':state',      $state);

        $stmt->execute();

        echo '{"notice": {"text": "Customer Updated"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Delete Customer
$app->delete('/api/customer/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "DELETE FROM customers WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Customer Deleted"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

/******************************************************************** */


// Get All categories
$app->get('/api/categories', function(Request $request, Response $response){
    $sql = "SELECT * FROM categories";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $categories = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
       echo json_encode($categories);
        //console.log(json_encode($categories));
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Get Single Category
$app->get('/api/categories/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "SELECT * FROM categories WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $categories = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($categories);
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Add Category
$app->post('/api/categories/add', function(Request $request, Response $response){
    $c_catname = $request->getParam('c_catname');
    $c_active = $request->getParam('c_active');
   

    $sql = "INSERT INTO categories (c_catname,c_active)";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':c_catname', $c_catname);
        $stmt->bindParam(':c_active',  $c_active);
       

        $stmt->execute();

        echo '{"notice": {"text": "Category Added"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Update Category
$app->put('/api/categories/update/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $c_catname = $request->getParam('c_catname');
 

    $sql = "UPDATE categories SET
				c_catname 	= :c_catname,
				c_active 	= :c_active,
              
			WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':c_catname', $c_catname);
        $stmt->bindParam(':c_active',  $c_active);
      

        $stmt->execute();

        echo '{"notice": {"text": "Category Updated"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Delete Category
$app->delete('/api/categories/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "DELETE FROM categories WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Category Deleted"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});
/************************************************* */



// Get All Customers
$app->get('/api/users', function(Request $request, Response $response){
    $sql = "SELECT * FROM users";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
       echo json_encode($users);
        //console.log(json_encode($users));
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Get Single Customer
$app->get('/api/users/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "SELECT * FROM users WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->query($sql);
        $users = $stmt->fetch(PDO::FETCH_OBJ);
        $db = null;
        echo json_encode($users);
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Add Customer
$app->post('/api/users/add', function(Request $request, Response $response){
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $sql = "INSERT INTO users (first_name,last_name,phone,email,address,city,state) VALUES
    (:first_name,:last_name,:phone,:email,:address,:city,:state)";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name',  $last_name);
        $stmt->bindParam(':phone',      $phone);
        $stmt->bindParam(':email',      $email);
        $stmt->bindParam(':address',    $address);
        $stmt->bindParam(':city',       $city);
        $stmt->bindParam(':state',      $state);

        $stmt->execute();

        echo '{"notice": {"text": "Customer Added"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Update Customer
$app->put('/api/users/update/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $first_name = $request->getParam('first_name');
    $last_name = $request->getParam('last_name');
    $phone = $request->getParam('phone');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $city = $request->getParam('city');
    $state = $request->getParam('state');

    $sql = "UPDATE users SET
				first_name 	= :first_name,
				last_name 	= :last_name,
                phone		= :phone,
                email		= :email,
                address 	= :address,
                city 		= :city,
                state		= :state
			WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name',  $last_name);
        $stmt->bindParam(':phone',      $phone);
        $stmt->bindParam(':email',      $email);
        $stmt->bindParam(':address',    $address);
        $stmt->bindParam(':city',       $city);
        $stmt->bindParam(':state',      $state);

        $stmt->execute();

        echo '{"notice": {"text": "Customer Updated"}';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});

// Delete Customer
$app->delete('/api/users/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');

    $sql = "DELETE FROM users WHERE id = $id";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"notice": {"text": "Customer Deleted"}';
    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
    }
});



$output_dir = "./uploads/";
if(isset($_FILES["myfile"]))
{
	$ret = array();
	
//	This is for custom errors;	
/*	$custom_error= array();
	$custom_error['jquery-upload-file-error']="File already exists";
	echo json_encode($custom_error);
	die();
*/
	$error =$_FILES["myfile"]["error"];
	//You need to handle  both cases
	//If Any browser does not support serializing of multiple files using FormData() 
	if(!is_array($_FILES["myfile"]["name"])) //single file
	{
 	 	$fileName = $_FILES["myfile"]["name"];
 		move_uploaded_file($_FILES["myfile"]["tmp_name"],$output_dir.$fileName);
    	$ret[]= $fileName;
	}
	else  //Multiple files, file[]
	{
	  $fileCount = count($_FILES["myfile"]["name"]);
	  for($i=0; $i < $fileCount; $i++)
	  {
	  	$fileName = $_FILES["myfile"]["name"][$i];
		move_uploaded_file($_FILES["myfile"]["tmp_name"][$i],$output_dir.$fileName);
	  	$ret[]= $fileName;
	  }
	
	}
    echo json_encode($ret);
 }
 


/**************Add Order********** */


// Add Orders
$app->post('/api/orders/add', function(Request $request, Response $response){
    $sku = $request->getParam('sku');
    $name = $request->getParam('name');
    $cat = $request->getParam('cat');
    $state = $request->getParam('state');
    $statecolor = $request->getParam('statecolor');
    $size = $request->getParam('size');
    $img = $request->getParam('img');
    $oldprice = $request->getParam('oldprice');
    $price = $request->getParam('price');
    $descr = $request->getParam('descr');
    $stock = $request->getParam('stock');
    /*$cname = $request->getParam('cname');
    $check = $request->getParam('check');
    $select = $request->getParam('select');
    $notes = $request->getParam('notes');
    $email = $request->getParam('email');
    $smname = $request->getParam('smname');
    $timestamp = $request->getParam('timestamp');
    $ponumber = $request->getParam('ponumber');
    $total = $request->getParam('total');*/



    $sql = "INSERT INTO products (sku,name,cat,state,statecolor,size,img, oldprice, price,descr,stock) VALUES
    (:sku,:name,:cat,:state,:statecolor,:size,:img,:oldprice,:price,:descr,:stock)";

    try{
        // Get DB Object
        $db = new db();
        // Connect
        $db = $db->connect();

        $stmt = $db->prepare($sql);

        $stmt->bindParam(':sku', $sku);
        $stmt->bindParam(':name',  $name);
        $stmt->bindParam(':cat',      $cat);
        $stmt->bindParam(':state',      $state);
        $stmt->bindParam(':statecolor',    $statecolor);
        $stmt->bindParam(':size',       $size);
        $stmt->bindParam(':img',       $img);
        $stmt->bindParam(':oldprice',      $oldprice);
        $stmt->bindParam(':price',      $price);
        $stmt->bindParam(':descr',      $descr);
         $stmt->bindParam(':stock',      $stock);
        

        $stmt->execute();

        echo '{"notice": {"text": "Products Added"}';
       // echo '<script>alert("Products Added");</script>';

    } catch(PDOException $e){
        echo '{"error": {"text": '.$e->getMessage().'}';
      //  echo "<script>alert(".$e->getMessage().");</script>";
    }
});



$app->get('/test', function(Request $request, Response $response){

 

});
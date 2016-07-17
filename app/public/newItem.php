<?php

require 'php/cloudinary/Cloudinary.php';
require 'php/cloudinary/Uploader.php';

error_reporting(0);

Cloudinary::config(array(
     "cloud_name" => "desbjknxm",
    "api_key" => "513781999244473",
    "api_secret" => "gvOtr37u4QK9jv6Nl4lWO-3rHME"
));


if (isset($_POST["submit"])) {
    $item_type = $_POST["ptype"];
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $sdesc = $_POST['sdesc'];
    $desc = $_POST['desc'];
    $cat = $_POST['category'];

    if(!strcmp($item_type, "prod")){
       $add_url = "http://webserviceproj.herokuapp.com/api/addProduct/".rawurlencode($id)."/".rawurlencode($name)."/".rawurlencode($price)."/".rawurlencode($sdesc)."/".rawurlencode($desc)."/".rawurlencode($cat);
    } else {
       $add_url = "http://webserviceproj.herokuapp.com/api/addCategory/".rawurlencode($id)."/".rawurlencode($name);
    }
    // Get cURL resource
    $curl = curl_init();

    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $add_url,
        CURLOPT_USERAGENT => 'Codular Sample cURL Request'
    ));


    // Send the request & save response to $resp
    $resp = curl_exec($curl);
    // Close request to clear up some resources
    curl_close($curl);
    $add_item_result = json_decode($resp);

    if($add_item_result->{"success"}){
            //upload to cloud
        $cloudUpload = \Cloudinary\Uploader::upload($_FILES["fileToUpload"]['tmp_name']);

        if(!strcmp($item_type, "prod")){
            $cloudUpload2 = \Cloudinary\Uploader::upload($_FILES["fileToUpload2"]['tmp_name']);

            $url = 'http://webserviceproj.herokuapp.com/api/uploadProdImage';
            $myvars = 'id=' . rawurlencode($_POST['id']) .'&image=' . rawurlencode($cloudUpload['secure_url']).
            '&bimage=' . rawurlencode($cloudUpload2['secure_url']);
        } else {
             $url = 'http://webserviceproj.herokuapp.com/api/uploadCategoryImage';
            $myvars = 'category=' . rawurlencode($_POST['name']) .'&url=' . rawurlencode($cloudUpload['secure_url']);
        }
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_POST, 1);
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec( $ch );

        //show information regarding the request
        $result = json_decode($response, true);

        //close the connection
        curl_close($ch);

    }
    
}

?>
<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="css/lib/bootstrap.min.css">
    <link rel="stylesheet" href="css/lib/bootstrap-theme.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="531479800503-6lvg1h8gotm5e80p7vcll0q3hfilbg81.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>

    <link rel="stylesheet" href="css/dev/style.css">
    <link rel="stylesheet" href="css/dev/newItem.css">
    <script src="js/dev/newItem.js"></script>
    <title>הוספת פריט</title>
</head>
<body >
    <nav class="user-menu navbar">
      <div id="user">
          <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" ></div><br>
      </div>
      <ul>
        <li id="loggedIn"><span class="greeting"></span> <a class="signOut" ng-click="signOut()">התנתק</a></li>
        <li class="account"><a ext-link href="account.html">סל קניות</a></li>
        <li><a href="#">צור קשר</a></li>
        <li><a href="#">מועדון הלקוחות</a></li>
        <li class="manage-page"><a ext-link href="managePage.html">עמוד ניהול</a></li>
      </ul>
    </nav>
    <nav class="main-menu navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="index.html" class="navbar-brand" id="logo"></a>
        </div>
        <ul class="nav navbar-nav">
          <li><a ext-link href="index.html">בית של אופנה</a></li>
          <li><a href="#">פוטפוליו</a></li>
          <li><a ext-link href="shop.html">מוצרים</a></li>
          <li><a ext-link href="looks.html">מראות-איפור</a></li>
          <li><a href="#">סדנאות</a></li>
          <li><a href="#">תקשורת</a></li>
        </ul>
      </div>
  </nav>

   <div class="container new-item">
        <div class="addItem">
            <h1>פריט חדש</h1>
            <form method="post" enctype="multipart/form-data">
             <div class="form-control input radioPtype">  
                    <input type="radio" name="ptype" value="prod" checked><label>מוצר</label>
                    <input type="radio" name="ptype" value="cat"><label>קטגוריה</label>
             </div>
             <input name="id" type="number" class="form-control input" placeholder="הכנס מזהה" required>
             <input name="name" type="text" class="form-control input" placeholder="הכנס שם" required>
             <div class="prodValues">
                 <input type="text" name="price" placeholder="מחיר" class="form-control input">
                 <input type="text" name="category" placeholder="קטגוריה" class="form-control input">
                 <!-- <input type -->
                 <input type="text" name="sdesc" placeholder="תיאור קצר" maxlength="50" class="form-control input">
                 <textarea rows="4" cols="50" name="desc" placeholder="תיאור מלא" class="form-control input"></textarea>
             </div>
            
        </div>
        <div class="imageUpload">
            <h2>העלאת תמונה</h2>
            
                <div class="form-control input">    
                    <label>בחר תמונה</label>
                    <input type="file" name="fileToUpload" id="fileToUpload" required>
                </div>
                <div class="form-control input bigImage">    
                    <label>בחר תמונה גדולה</label>
                    <input type="file" name="fileToUpload2" id="fileToUpload2">
                </div>
                <input type="submit" class="btn btn-default input" value="שלח" name="submit">
            </form>
            <div class="result">   
            <?php
            if(isset($_POST["submit"])){
                if($result!=NULL&&!curl_errno($ch)&&!$result[0]["error"]&&!$add_item_result->{'error'}){
                    echo "פריט עלה בהצלחה.";
                } else {
                    if($result[0] == NULL) echo "תקלה.";// no connection to ws
                    if($result[0]["error"]) echo $result[0]["error"];
                    if($add_item_result->{"error"}) echo "פריט קיים במערכת.";
                    echo $add_item_result->{"error"};
                }
            }
            
            ?>
            </div>
        </div>
        
    </div>
</body>
</html>
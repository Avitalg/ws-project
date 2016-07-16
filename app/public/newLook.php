<?php

require 'php/cloudinary/Cloudinary.php';
require 'php/cloudinary/Uploader.php';

Cloudinary::config(array(
    "cloud_name" => "desbjknxm",
    "api_key" => "513781999244473",
    "api_secret" => "gvOtr37u4QK9jv6Nl4lWO-3rHME"
));


if (isset($_POST["submit"])) {
    $look = $_POST["look"];
    $url = $_FILES["fileToUpload"]['tmp_name'];


    $cloudUpload = \Cloudinary\Uploader::upload($url);

    // $url = "https://webserviceproj.herokuapp.com/api/addLook/".rawurlencode($look)."/".rawurlencode($cloudUpload['secure_url']);
    
    // $curl = curl_init();

    // // Set some options - we are passing in a useragent too here
    // curl_setopt_array($curl, array(
    //     CURLOPT_RETURNTRANSFER => 1,
    //     CURLOPT_URL => $add_url,
    //     CURLOPT_USERAGENT => 'Codular Sample cURL Request'
    // ));


    // // Send the request & save response to $resp
    // $resp = curl_exec($curl);
    // // Close request to clear up some resources
    // curl_close($curl);
    // $add_item_result = json_decode($resp);
    // echo add_item_result;
    // echo "<br>";
    // echo $add_item_result->{"success"};
    // // if($add_item_result->{"success"}){
    //         //upload to cloud

    //     if(!strcmp($item_type, "prod")){
    //         $cloudUpload2 = \Cloudinary\Uploader::upload($_FILES["fileToUpload2"]['tmp_name']);

    //         $url = 'http://webserviceproj.herokuapp.com/api/uploadProdImage';
    //         $myvars = 'id=' . rawurlencode($_POST['id']) .'&image=' . rawurlencode($cloudUpload['secure_url']).
    //         '&bimage=' . rawurlencode($cloudUpload2['secure_url']);
    //     } else {
    //          $url = 'http://webserviceproj.herokuapp.com/api/uploadCategoryImage';
        $myvars = 'look=' . rawurlencode($look) .'&image=' . rawurlencode($cloudUpload['secure_url']);
    //     }
        
        $ch = curl_init();
        curl_setopt ($ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_POST, 1);
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);

        $response = curl_exec( $ch );

        //show information regarding the request
        $result = json_decode($response, true);

        //close the connection
        curl_close($ch);

    // }
    
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
    <title>Upload an Image</title>
</head>
<body id="itemCtrl" ng-controller="itemCtrl">
    <nav class="user-menu navbar">
    <div id="user">
        <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" ></div><br>
    </div>
    <ul>
      <li id="loggedIn"><span class="greeting"></span> <a class="signOut" ng-click="signOut()">התנתק</a></li>
      <li class="account"><a href="account.html">סל קניות</a></li>
      <li class="manage-page"><a href="managePage.html">עמוד ניהול</a></li>
    </ul>
  </nav>
  <nav class="main-menu navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a href="#" class="navbar-brand" id="logo"></a>
      </div>
      <ul class="nav navbar-nav">
        <li><a class="active" href="index.html">עמוד הבית</a></li>
        <li><a href="shop.html">מוצרים</a></li>
        <li><a href="looks.html">מראות-איפור</a></li>
      </ul>
    </div>
  </nav>

   <div class="container">
        <div class="addItem">
            <h1>מראה חדש</h1>
            <form method="post" enctype="multipart/form-data">
                <input class="form-control input" type="text" name="look" placeholder="הכנס שם של מראה איפור" required>
                <div class="form-control input">    
                    <label>בחר תמונה</label>
                    <input type="file" name="fileToUpload" id="fileToUpload" required>
                </div>
                <input type="submit" class="btn btn-default input" value="שלח" name="submit">
            </form>
        </div>        
    </div>
</body>
</html>
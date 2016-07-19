<?php

require 'php/cloudinary/Cloudinary.php';
require 'php/cloudinary/Uploader.php';

error_reporting(0);

Cloudinary::config(array(
    "cloud_name" => "XXXXXX",
    "api_key" => "XXXXXXX",
    "api_secret" => "XXXXXX-3rHME"
));


if (isset($_POST["submit"])) {
    $look = $_POST["look"];
    $url = $_FILES["fileToUpload"]['tmp_name'];


    $cloudUpload = \Cloudinary\Uploader::upload($url);
    //if upload image secceed
    if($cloudUpload){ 
        $url = 'http://webserviceproj.herokuapp.com/api/addLook';
  
        $myvars = 'look=' . rawurlencode($look) .'&url=' . rawurlencode($cloudUpload['secure_url']);
    
        
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
    }
    
}

?>
<!DOCTYPE HTML>
<html>
<head>
    <link rel="stylesheet" href="css/lib/bootstrap.min.css">
    <link rel="stylesheet" href="css/lib/bootstrap-theme.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="531479800503-6lvg1h8gotm5e80p7vcll0q3hfilbg81.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>

    <link rel="stylesheet" href="css/dev/style.css">
    <script src="js/dev/manager.js"></script>
    <title>הוספת מראה איפור</title>
</head>
<body id="itemCtrl">
    <nav class="user-menu navbar">
      <div id="user">
          <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark" ></div><br>
      </div>
      <ul>
        <li id="loggedIn"><span class="greeting"></span> <a class="signOut" onclick="onSignOut()">התנתק</a></li>
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

   <div id="managePage" class="container">
        <div class="addItem new-item">
            <h1>מראה חדש</h1>
            <form method="post" enctype="multipart/form-data">
                <input class="form-control input" type="text" name="look" placeholder="הכנס שם של מראה איפור" required>
                <div class="form-control input">    
                    <label>בחר תמונה</label>
                    <input type="file" name="fileToUpload" id="fileToUpload" required>
                </div>
                <input type="submit" class="btn btn-default input" value="שלח" name="submit">
            </form>
            <span><?php 
            if($result) echo "הפריט עלה בהצלחה";
            else "תקלה"
             ?></span>
        </div>        
    </div>
</body>
</html>

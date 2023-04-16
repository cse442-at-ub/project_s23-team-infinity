<?php
include 'database.php';
include 'endswith.php';
$usernameoremail = $_POST['username/email'];
$newpassword = $_POST['newpassword'];
$passwordhash = password_hash($newpassword,PASSWORD_DEFAULT);
if(!endsWith($usernameoremail,"@buffalo.edu")){
    $update = "UPDATE Users SET Password = '$passwordhash' WHERE Username = '$usernameoremail'";
    $updated = mysqli_query($conn,$update);
    echo "Password Change Successful";
}else{
    $update = "UPDATE Users SET Password = '$passwordhash' WHERE Email = '$usernameoremail'";
    $updated = mysqli_query($conn,$update);
    echo "Password Change Successful";
}
?>
<?php
include 'database.php';
include 'endswith.php';
$usernameoremail = $_POST['username/email'];
$newpassword = $_POST['newpassword'];
if(!endsWith($usernameoremail,"@buffalo.edu")){
    $update = "UPDATE Users SET Password = '$newpassword' WHERE Username = '$usernameoremail'";
    $updated = mysqli_query($conn,$update);
    echo "Password Change Successful";
}else{
    $update = "UPDATE Users SET Password = '$newpassword' WHERE Email = $usernameoremail";
    $updated = mysqli_query($conn,$update);
    echo "Password Change Successful";
}
?>
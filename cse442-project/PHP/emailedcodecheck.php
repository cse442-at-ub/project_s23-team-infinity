<?php
include 'database.php';
$token = $_POST['code'];
$checktoken = "SELECT * FROM PasswordTokens WHERE token = ?";
$stmt = mysqli_prepare($conn, $checktoken);
mysqli_stmt_bind_param($stmt, "s", $token);
mysqli_stmt_execute($stmt);
$tokencheck = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($tokencheck);
if(mysqli_num_rows($tokencheck) == 0){
    echo "Incorrect Token";
}else{
    echo "Proceed to Change Password";
}
?>

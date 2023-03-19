<?php
function endsWith($string, $endString){
    $len = strlen($endString);
    if ($len == 0) {
        return true;
    }
    return (substr($string, -$len) === $endString);
}
$hostname = "oceanus";
$serverusername = "duncenzh";
$serverpassword = "123";
$databasename = "cse442_2023_spring_team_ad_db";
$conn = mysqli_connect($hostname,$serverusername,$serverpassword,$databasename);
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
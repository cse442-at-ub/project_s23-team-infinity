<?php
$hostname = "oceanus";
$serverusername = "duncenzh";
$serverpassword = "123";
$databasename = "cse442_2023_spring_team_ad_db";
$conn = mysqli_connect($hostname,$serverusername,$serverpassword,$databasename);
$token = $_POST['token'];
$checktoken = "SELECT * FROM PasswordTokens WHERE token = '$token'";
$tokencheck = mysqli_query($conn,$checktoken);
$row = mysqli_fetch_assoc($tokencheck);
if(mysqli_num_rows($tokencheck) == 0){
    echo "Incorrect Token";
}else{
    echo "Proceed to Change Password";
    return "<div data-tokencheck={'Correct'} class=\'token'\></div>";
}
?>
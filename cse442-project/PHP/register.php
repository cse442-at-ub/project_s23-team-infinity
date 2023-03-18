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
$email=$_POST['email'];
$username=$_POST['username'];
$password=$_POST["password"];
$retypepassword=$_POST['retypepassword'];
if(isset($_POST['s'])) {
    $checkemail="SELECT * FROM Users WHERE Email = '$email'";
    $emailcheck=mysqli_query($conn,$checkemail);
    $checkusername="SELECT * FROM Users WHERE Username = '$username'";
    $usernamecheck=mysqli_query($conn,$checkusername);
    if($email == ""){
        echo '<script>alert("Please Enter an Email")</script>';
    }elseif(!endsWith($email,"@buffalo.edu")){
        echo '<script>alert("Please Enter a buffalo.edu email")</script>';
    }elseif($username == ""){
        echo '<script>alert("Please Enter a Username")</script>';
    }elseif($password == ""){
        echo '<script>alert("Please Enter a Password")</script>';
    }elseif($retypepassword == ""){
        echo '<script>alert("Please Reenter your Password")</script>';
    }elseif(mysqli_num_rows($emailcheck) != 0){
        echo '<script>alert("Account Already Exist With This Email")</script>';
    }elseif(mysqli_num_rows($usernamecheck) != 0){
        echo '<script>alert("Username Already Taken")</script>';
    }elseif($password != $retypepassword) {
        echo '<script>alert("Password Does Not Match")</script>';
    }else{
        $insert = "INSERT INTO Users (Username,Email,Password) VALUE ('$username','$email','$password')";
        $inserted = mysqli_query($conn,$insert);
        if($inserted) {
            echo "Account Created";
        }else{
            echo "ERROR Account Creation Failed";
        }
    }
}
?>
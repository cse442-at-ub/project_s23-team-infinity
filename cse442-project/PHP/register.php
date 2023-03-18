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
$retypepassword=$_POST['confirmPassword'];
    $checkemail="SELECT * FROM Users WHERE Email = '$email'";
    $emailcheck=mysqli_query($conn,$checkemail);
    $checkusername="SELECT * FROM Users WHERE Username = '$username'";
    $usernamecheck=mysqli_query($conn,$checkusername);
    if($email == ""){
        echo "Please Enter an Email";
    }elseif(!endsWith($email,"@buffalo.edu")){
        echo "Please Enter a buffalo.edu email";
    }elseif($username == ""){
        echo "Please Enter a Username";
    }elseif($password == ""){
        echo "Please Enter a Password";
    }elseif($retypepassword == ""){
        echo "Please Reenter your Password";
    }elseif(mysqli_num_rows($emailcheck) != 0){
        echo "Account Already Exist With This Email";
    }elseif(mysqli_num_rows($usernamecheck) != 0){
        echo "Username Already Taken";
    }elseif($password != $retypepassword) {
        echo "Password Does Not Match";
    }else{
        $insert = "INSERT INTO Users (Username,Email,Password) VALUE ('$username','$email','$password')";
        $inserted = mysqli_query($conn,$insert);
        if($inserted) {
            echo "Account Created";
        }else{
            echo "ERROR Account Creation Failed";
        }
    }
?>
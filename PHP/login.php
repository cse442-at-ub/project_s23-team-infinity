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
$emailorusername=$_POST['emailorusername'];
$password=$_POST["password"];
$checkusername="SELECT * FROM Users WHERE Username = '$emailorusername'";
$usernamecheck=mysqli_query($conn,$checkusername);
$checkemail="SELECT * FROM Users WHERE Email = '$emailorusername'";
$emailcheck=mysqli_query($conn,$checkemail);
$wrongtyping = "Your Email, Username or Password is Incorrect";
if(isset($_POST['s'])){
    if($emailorusername == ""){
        echo "<script>alert('Please Enter a Email or Username')</script>";
    }elseif($password == ""){
        echo "<script>alert('Please Enter Your Password')</script>";
    }elseif(endsWith($emailorusername,"@buffalo.edu")){
        if(mysqli_num_rows($emailcheck) == 0){
            echo "<script>alert('$wrongtyping')</script>";
        }else{
            $row = mysqli_fetch_assoc($emailcheck);
            if($row['Password']!=$password){
                echo "<script>alert('$wrongtyping')</script>";
            }else{
                echo "redirect to home page";
            }
        }
    }elseif(mysqli_num_rows($usernamecheck) == 0){
        echo "<script>alert('$wrongtyping')</script>"; 
    }else{
        $row = mysqli_fetch_assoc($usernamecheck);
        if($row['Password']!=$password){
            echo "<script>alert('$wrongtyping')</script>"; 
        }else{
            echo 'redirect to home page';
        }
    }
}
?>
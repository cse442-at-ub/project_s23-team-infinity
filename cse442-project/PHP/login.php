<?php
include 'database.php';
include 'endswith.php';
session_start();
$emailorusername=$_POST['username'];
$password=$_POST["password"];
$checkusername="SELECT * FROM Users WHERE Username = '$emailorusername'";
$usernamecheck=mysqli_query($conn,$checkusername);
$checkemail="SELECT * FROM Users WHERE Email = '$emailorusername'";
$emailcheck=mysqli_query($conn,$checkemail);
$expire = time() + ((60*60*24) * 7);
$remembertoken = password_hash(time(), PASSWORD_DEFAULT);
$usertoken = password_hash(time(),PASSWORD_DEFAULT);
$wrongtyping = "Your Email, Username or Password is Incorrect";
    if(isset($_COOKIE['remember'])){
        echo 'redirect to home page';
    }elseif($emailorusername == ""){
        echo "Please Enter a Email or Username";
    }elseif($password == ""){
        echo "Please Enter Your Password";
    }elseif(endsWith($emailorusername,"@buffalo.edu")){
        if(mysqli_num_rows($emailcheck) == 0){
            echo "'$wrongtyping'";
        }else{
            $row = mysqli_fetch_assoc($emailcheck);
            if($row['Password']!=$password){
                echo "'$wrongtyping'";
            }else{
                echo "redirect to home page";
                setcookie('token', $usertoken, $expire);
                $usertoken = "UPDATE Users SET token = '$usertoken' WHERE Email = '$emailorusername'";
                $usertokenupdate = mysqli_query($conn,$usertoken);
                if(isset($_POST["rememberme"])){
                    setcookie('remember', $remembertoken, $expire);
                    $remember = "UPDATE Users SET rememberme = $remembertoken WHERE Email = '$emailorusername'";
                    $remembered = mysqli_query($conn,$remember);
                }
            }
        }
    }elseif(mysqli_num_rows($usernamecheck) == 0){
        echo "'$wrongtyping'"; 
    }else{
        $row = mysqli_fetch_assoc($usernamecheck);
        if($row['Password']!=$password){
            echo "'$wrongtyping'"; 
        }else{
            echo 'redirect to home page';
            setcookie('token', $usertoken, $expire);
            $usertoken = "UPDATE Users SET token = '$usertoken' WHERE Username = '$emailorusername'";
            $usertokenupdate = mysqli_query($conn,$usertoken);
            if(isset($_POST["rememberme"])){
                setcookie('remember', $remembertoken, $expire);
                $remember = "UPDATE Users SET rememberme = '$remembertoken' WHERE Username = '$emailorusername'";
                $remembered = mysqli_query($conn,$remember);
            }
        }
    }
?>
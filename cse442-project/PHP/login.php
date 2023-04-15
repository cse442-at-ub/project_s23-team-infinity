<?php
include 'database.php';
include 'endswith.php';
$emailorusername=$_POST['username'];
$password=$_POST["password"];
$checkusername="SELECT * FROM Users WHERE Username = '$emailorusername'";
$usernamecheck=mysqli_query($conn,$checkusername);
$checkemail="SELECT * FROM Users WHERE Email = '$emailorusername'";
$emailcheck=mysqli_query($conn,$checkemail);
$expire = time() + ((60*60*24) * 7);
$usertoken = password_hash(time(),PASSWORD_DEFAULT);
$wrongtyping = "Your Email, Username or Password is Incorrect";
$cookie_options = array(
    'expires' => $expire,
    'path' => '/CSE442-542/2023-Spring/cse-442ad/',
    'domain' => 'www-student.cse.buffalo.edu',
    'secure' => true,
    'httponly' => false,
    'samesite' => 'None'
  );
    if(isset($_COOKIE['remember'])){
        echo 'redirect to homepage';
    }elseif($emailorusername == ""){
        echo "Please Enter a Email or Username";
    }elseif($password == ""){
        echo "Please Enter Your Password";
    }elseif(endsWith($emailorusername,"@buffalo.edu")){
        if(mysqli_num_rows($emailcheck) == 0){
            echo $wrongtyping;
        }else{
            $row = mysqli_fetch_assoc($emailcheck);
            if(!password_verify($password,$row['Password'])){
                echo $wrongtyping;
            }else{
                echo 'redirect to homepage';
                setcookie('token', $usertoken, $cookie_options);
                $usertoken = "UPDATE Users SET token = '$usertoken' WHERE Email = '$emailorusername'";
                $usertokenupdate = mysqli_query($conn,$usertoken);
                if($_POST["rememberMe"]){
                    setcookie('remember', 'rememberme', $cookie_options);
                }
            }
        }
    }elseif(mysqli_num_rows($usernamecheck) == 0){
        echo $wrongtyping; 
    }else{
        $row = mysqli_fetch_assoc($usernamecheck);
        if(!password_verify($password,$row['Password'])){
            echo $wrongtyping; 
        }else{
            echo 'redirect to homepage';
            setcookie('token', $usertoken, $cookie_options);
            $usertoken = "UPDATE Users SET token = '$usertoken' WHERE Username = '$emailorusername'";
            $usertokenupdate = mysqli_query($conn,$usertoken);
            if($_POST["rememberMe"]){
                setcookie('remember', 'rememberme', $cookie_options);
            }
        }
    }
?>
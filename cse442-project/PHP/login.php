<?php
include 'database.php';
include 'endswith.php';
$emailorusername=$_POST['username'];
$checkbox=$_POST['rememberMe'];
$password=$_POST["password"];

$stmt = mysqli_prepare($conn, "SELECT * FROM Users WHERE Email = ? OR Username = ?");
mysqli_stmt_bind_param($stmt, "ss", $emailorusername, $emailorusername);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$expire = time() + ((60*60*24) * 7);
$usertoken = password_hash(time(),PASSWORD_DEFAULT);
$wrongtyping = "Your Email, Username or Password is Incorrect";

if($emailorusername == ""){
    echo json_encode(array("Please Enter a Email or Username"));
}elseif($password == ""){
    echo json_encode(array("Please Enter Your Password"));
}elseif(endsWith($emailorusername,"@buffalo.edu")){
    if(mysqli_num_rows($result) == 0){
        echo json_encode(array($wrongtyping));
    }else{
        $row = mysqli_fetch_assoc($result);
        if(!password_verify($password,$row['Password'])){
            echo json_encode(array($wrongtyping));
        }else{
            $userToken= "UPDATE Users SET token = ? WHERE Email = ?";
            $stmt = mysqli_prepare($conn, $userToken);
            mysqli_stmt_bind_param($stmt, "ss", $usertoken, $emailorusername);
            $usertokenupdate = mysqli_stmt_execute($stmt);
            if($checkbox == 'true'){
                echo json_encode(array($usertoken,'remember'));
            }else{
                echo json_encode(array($usertoken));
            }
        }
    }
}elseif(mysqli_num_rows($result) == 0){
    echo json_encode(array($wrongtyping));
}else{
    $row = mysqli_fetch_assoc($result);
    if(!password_verify($password,$row['Password'])){
        echo json_encode(array($wrongtyping));
    }else{
        $userToken = "UPDATE Users SET token = ? WHERE Username = ?";
        $stmt = mysqli_prepare($conn, $userToken);
        mysqli_stmt_bind_param($stmt, "ss", $usertoken, $emailorusername);
        $usertokenupdate = mysqli_stmt_execute($stmt);
        if($checkbox == 'true'){
            echo json_encode(array($usertoken,'remember'));
        }else{
            echo json_encode(array($usertoken));
        }
    }
}
?>

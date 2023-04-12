<?php
include 'database.php';
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$random = '';
for ($i = 0; $i < 6; $i++) {
    $index = rand(0, strlen($characters) - 1);
    $random .= $characters[$index];
}
$email=$_POST['email'];
$lookupemail = "SELECT * FROM Users WHERE Email = '$email'";
$createtoken = "INSERT INTO PasswordTokens VALUES ('$email','$random')";
$putintoken = mysqli_query($conn,$createtoken);
$lookedupemail = mysqli_query($conn,$lookupemail);
    if (mysqli_num_rows($lookedupemail) == 0) {
        echo "No Account Created Using This Email";
    }else{
        $row = mysqli_fetch_assoc($lookedupemail);
        echo "Check your email for link and token to reset password";
        $to = $email;
        $subject = "no-reply password recovery token";
        $message = wordwrap('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442ad/verify Enter token in the link above to reset password: '.$random,70);
        mail($to,$subject,$message);
    }
?>
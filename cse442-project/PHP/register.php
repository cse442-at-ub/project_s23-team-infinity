<?php
include 'database.php';
include 'endswith.php';

$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['password'];
$retypepassword = $_POST['retypepassword'];

if ($email == "") {
    echo "Please Enter an Email";
} elseif (!endsWith($email, "@buffalo.edu")) {
    echo "Please Enter a buffalo.edu email";
} elseif ($username == "") {
    echo "Please Enter a Username";
} elseif ($password == "") {
    echo "Please Enter a Password";
} elseif ($retypepassword == "") {
    echo "Please Reenter your Password";
} else {
    $checkemail_query = "SELECT * FROM Users WHERE Email = ?";
    $checkemail_stmt = mysqli_prepare($conn, $checkemail_query);
    mysqli_stmt_bind_param($checkemail_stmt, "s", $email);
    mysqli_stmt_execute($checkemail_stmt);
    $email_result = mysqli_stmt_get_result($checkemail_stmt);

    $checkusername_query = "SELECT * FROM Users WHERE Username = ?";
    $checkusername_stmt = mysqli_prepare($conn, $checkusername_query);
    mysqli_stmt_bind_param($checkusername_stmt, "s", $username);
    mysqli_stmt_execute($checkusername_stmt);
    $username_result = mysqli_stmt_get_result($checkusername_stmt);

    if (mysqli_num_rows($email_result) != 0) {
        echo "Account Already Exist With This Email";
    } elseif (mysqli_num_rows($username_result) != 0) {
        echo "Username Already Taken";
    } elseif ($password != $retypepassword) {
        echo "Password Does Not Match";
    } else {
        $passwordhash = password_hash($password, PASSWORD_DEFAULT);

        $insert_query = "INSERT INTO Users (Username, Email, Password) VALUES (?, ?, ?)";
        $insert_stmt = mysqli_prepare($conn, $insert_query);
        mysqli_stmt_bind_param($insert_stmt, "sss", $username, $email, $passwordhash);
        $inserted = mysqli_stmt_execute($insert_stmt);

        if ($inserted) {
            echo "Account Created";
        } else {
            echo "ERROR Account Creation Failed";
        }
    }
}
?>

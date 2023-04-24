<?php
include 'database.php';
include 'endswith.php';
$usernameoremail = $_POST['username/email'];
$newpassword = $_POST['newpassword'];
$passwordhash = password_hash($newpassword, PASSWORD_DEFAULT);

if (!endsWith($usernameoremail, "@buffalo.edu")) {
    $stmt = $conn->prepare("UPDATE Users SET Password = ? WHERE Username = ?");
    $stmt->bind_param("ss", $passwordhash, $usernameoremail);
    $stmt->execute();
    $stmt->close();
    echo "Password Change Successful";
} else {
    $stmt = $conn->prepare("UPDATE Users SET Password = ? WHERE Email = ?");
    $stmt->bind_param("ss", $passwordhash, $usernameoremail);
    $stmt->execute();
    $stmt->close();
    echo "Password Change Successful";
}
?>

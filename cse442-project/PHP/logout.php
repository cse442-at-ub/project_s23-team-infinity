<?php
include "database.php";

$usertoken = $_POST['usertoken'];

$stmt = $conn->prepare("UPDATE Users SET token = ? WHERE token = ?");
$stmt->bind_param("ss", $nullToken, $usertoken);

$nullToken = null;
$stmt->execute();

$stmt->close();
$conn->close();
?>
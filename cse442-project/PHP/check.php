<?php
include "database.php";

$token = $_POST['usertoken'];

$stmt = $conn->prepare("SELECT Username FROM Users WHERE token = ?");
$stmt->bind_param("s", $token);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  echo json_encode(array("yes", $row['Username']));
} else {
  echo json_encode(array('no'));
}

$stmt->close();
$conn->close();
?>
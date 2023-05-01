<?php
include 'database.php';

$notification = $_POST['nofication'];

if ($notification) {
    $stmt = $conn->prepare("SELECT * FROM Users WHERE token = ?");
    $stmt->bind_param("s", $notification);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $to = $row['Email'];
        $subject = "no-reply Event Notification";
        $message = "You have an event coming up in 1 hour";
        mail($to, $subject, $message);
    }
    $stmt->close();
}
?>
<?php
include 'database.php';
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$random = '';
for ($i = 0; $i < 6; $i++) {
    $index = rand(0, strlen($characters) - 1);
    $random .= $characters[$index];
}
$email = $_POST['email'];

// Prepare the SELECT statement
$lookupemail = $conn->prepare("SELECT * FROM Users WHERE Email = ?");
$lookupemail->bind_param("s", $email);

// Prepare the INSERT statement
$createtoken = $conn->prepare("INSERT INTO PasswordTokens (email, token) VALUES (?, ?)");
$createtoken->bind_param("ss", $email, $random);

$lookupemail->execute();
$result = $lookupemail->get_result();

if ($result->num_rows === 0) {
    echo "No Account Created Using This Email";
} else {
    $createtoken->execute();
    echo "Check your email for link and token to reset password";
    $to = $email;
    $subject = "no-reply password recovery token";
    $message = wordwrap('https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442ad/verify Enter token in the link above to reset password: '.$random,70);
    mail($to,$subject,$message);
}

// Clean up the prepared statements
$lookupemail->close();
$createtoken->close();
?>

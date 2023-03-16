<form action="" method="post">
Enter Token:<br>
<input type=text name="token"><br><br>
<input type=submit name="s"><br><br>
<?php
$hostname = "oceanus";
$serverusername = "duncenzh";
$serverpassword = "123";
$databasename = "cse442_2023_spring_team_ad_db";
$conn = mysqli_connect($hostname,$serverusername,$serverpassword,$databasename);
$token = $_POST['token'];
$checktoken = "SELECT * FROM PasswordTokens WHERE email = '$token'";
$tokencheck = mysqli_query($conn,$checktoken);
if(isset($_POST['s'])){
    $row = mysqli_fetch_assoc($tokencheck);
    if($row['token'] != $token){
        echo "<script>alert('Incorrect Token')</script>"; 
    }else{
    }
}
?>
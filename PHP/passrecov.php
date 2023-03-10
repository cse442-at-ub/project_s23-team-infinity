<form action="" method="post">
Enter Email:<br>
<input type=text name="email"><br><br>
<input type=submit name="s"><br><br>
<?php
$hostname = "oceanus";
$serverusername = "duncenzh";
$serverpassword = "123";
$databasename = "cse442_2023_spring_team_ad_db";
$conn = mysqli_connect($hostname,$serverusername,$serverpassword,$databasename);
if(isset($_POST['s'])) {
$a=$_POST['email'];
$b = "SELECT * FROM Users WHERE Email = '$a'";
$result = mysqli_query($conn,$b);
    if (mysqli_num_rows($result) == 0) {
        echo '<script>alert("No Account Created Using This Email")</script>';
    }else{
        $row = mysqli_fetch_assoc($result);
        echo "Password: " . $row["Password"];
    }
}
?>
</form>

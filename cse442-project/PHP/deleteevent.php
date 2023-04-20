<?php

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

        echo "<br>Delete event request received<br>";
        $username = $_POST["username"];
        $eventId = $_POST["eventId"];
        $token = $_POST["token"];

        if (strlen(trim($username)) == 0 or 
            strlen(trim($eventId)) == 0 or 
            strlen(trim($token)) == 0) {
                echo "<br>New event requires both username and event title";
                die();
        }

        else {
            $dbhost = 'oceanus';
            $dbname = 'cse442_2023_spring_team_ad_db';
            $tablename = 'Users';
            $dbuser = 'colegrab';
            $dbpass = '50225546';

            $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
        
            $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE Username=? AND Usertoken=?");
            //Following copied from the PHP mysqli Documentation for prepared statements: https://www.php.net/manual/en/mysqli.prepare.php
            $first = mysqli_stmt_bind_param($stmt, "ss", $username, $token);
            $second = mysqli_stmt_execute($stmt);
            $third = mysqli_stmt_bind_result($stmt, $userID);
            $fourth = mysqli_stmt_fetch($stmt);

            //if the username exists AND token is correct
            if ($userID > 0) {
                $prepstmt = mysqli_prepare($newConn, "DELETE FROM Events WHERE eventId = ?");
                $first = mysqli_stmt_bind_param($prepstmt, "s", $eventId);
                $second = mysqli_stmt_execute($prepstmt);
                echo "<br>executed";
            }
        }
    }
    die();
?>
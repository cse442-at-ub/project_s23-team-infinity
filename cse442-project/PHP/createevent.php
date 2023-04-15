<?php

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

        echo "Event request received<br>";
        $username = $_POST['username'];
        $title = $_POST['title'];
        $date = $_POST['date'];
        $time = $_POST['time'] . ":00";
        $location = $_POST['location'];
        $notes = $_POST['notes'];

        echo "<br>",$username;
        echo "<br>",$title, " TYPE: ", gettype($title);
        echo "<br>",$date, " TYPE: ", gettype($date);
        echo "<br>",$time, " TYPE: ", gettype($time);
        echo "<br>",$location, " TYPE: ", gettype($location);
        echo "<br>",$notes, " TYPE: ", gettype($notes);

        if (strlen(trim($username)) == 0 or strlen(trim($title)) == 0) {
            echo "New event requires both username and event title";
        }

        else {
            $dbhost = 'oceanus';
            $dbname = 'cse442_2023_spring_team_ad_db';
            $tablename = 'Users';
            $dbuser = 'colegrab';
            $dbpass = '50225546';

            $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());

            $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE Username=?");
            //Following copied from the PHP mysqli Documentation for prepared statements: https://www.php.net/manual/en/mysqli.prepare.php
            $first = mysqli_stmt_bind_param($stmt, "s", $username);
            $second = mysqli_stmt_execute($stmt);
            $third = mysqli_stmt_bind_result($stmt, $userID);
            $fourth = mysqli_stmt_fetch($stmt);

            //user exists
            if ($userID > 0) {
                //create new event in Events table with provided data - will most likely be tough cuz of formatting
                echo "<br>User found!, UserID: ", $userID, " TYPE: ", gettype($userID);

                $newConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
                $tablename = 'Events';

                /*
                $eventquery = "INSERT INTO $tablename VALUES (NULL, '$userID', '$title', '$date', '$time', '$location', '$notes')";
                try {
                        $meme = mysqli_query($newConn, $eventquery);
                } catch (mysqli_sql_exception $exception){
                        echo "<br>FAILURE<br>";
                }
                if ($meme) {
                    echo "<br>SUCCESS!<br>";
                }
                else {
                    echo "<br>FAILURE<br>";
                }
                */
                
                $neweventStatement = mysqli_prepare($newConn, "INSERT INTO $tablename VALUES (NULL, ?, ?, ?, ?, ?, ?)");
                echo "<br>prepared";
                $first = mysqli_stmt_bind_param($neweventStatement, "isssss", $userID, $title, $date, $time, $location, $notes);
                echo "<br>bound";
                $second = mysqli_stmt_execute($neweventStatement);
		
                //REDIRECT TO WHEREVER, may try to implement with like "event created" on homepage
                //header("Location: https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442ad/backend/");
		        //die();
                
                // echo "<br>executed";
                // echo "<br>", $neweventStatement;
                // echo "<br>", $first;
                // echo "<br>", $second;
                // echo "<br>", $third;
                // echo "<br>", $fourth;
                
            }
        }
    }
?>

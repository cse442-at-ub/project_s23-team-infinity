<?php

    $sendback = "Event request received";
    $usertoken = $_POST['usertoken'];
    $title = $_POST['title'];
    $date = $_POST['date'];
    $timeStart = $_POST['timeStart'] . ":00";
    $timeEnd = $_POST['timeEnd'] . ":00";
    $location = $_POST['location'];
    $notes = $_POST['notes'];

    if (strlen(trim($usertoken)) == 0 or strlen(trim($title)) == 0) {
        $sendback = "New event requires both username and event title";
        echo $sendback;
        die();
    }

    else {
        $dbhost = 'oceanus';
        $dbname = 'cse442_2023_spring_team_ad_db';
        $tablename = 'Users';
        $dbuser = 'colegrab';
        $dbpass = '50225546';

        $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());

        $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE token=?");
        //Following copied from the PHP mysqli Documentation for prepared statements: https://www.php.net/manual/en/mysqli.prepare.php
        $first = mysqli_stmt_bind_param($stmt, "s", $usertoken);
        $second = mysqli_stmt_execute($stmt);
        $third = mysqli_stmt_bind_result($stmt, $userID);
        $fourth = mysqli_stmt_fetch($stmt);

        //user exists
        if ($userID > 0) {
            //create new event in Events table with provided data - will most likely be tough cuz of formatting
            $sendback = "User found!, UserID: ". $userID. " TYPE: ". gettype($userID);

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
            
            $neweventStatement = mysqli_prepare($newConn, "INSERT INTO $tablename VALUES (NULL, ?, ?, ?,?,?, ?, ?)");
            $sendback = "prepared";
            $first = mysqli_stmt_bind_param($neweventStatement, "issssss", $userID, $title, $date, $timeStart, $timeEnd, $location, $notes);
            $sendback = "bound";
            $second = mysqli_stmt_execute($neweventStatement);
            $sendback = "event created for ". $username;
    
            //REDIRECT TO WHEREVER, may try to implement with like "event created" on homepage
            //header("Location: https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442ad/backend/");
            //die();
            
            // echo "<br>executed";
            // echo "<br>", $neweventStatement;
            // echo "<br>", $first;
            // echo "<br>", $second;
            // echo "<br>", $third;
            // echo "<br>", $fourth;
            echo $sendback;
            die();
        }
    }
?>

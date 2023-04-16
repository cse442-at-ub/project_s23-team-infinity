<?php

    $usertoken = $_POST['usertoken'];

    $dbhost = 'oceanus';
    $dbname = 'cse442_2023_spring_team_ad_db';
    $tablename = 'Users';
    $dbuser = 'colegrab';
    $dbpass = '50225546';

    $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());

    $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE token=?");

    $first = mysqli_stmt_bind_param($stmt, "s", $usertoken);
    $second = mysqli_stmt_execute($stmt);
    $third = mysqli_stmt_bind_result($stmt, $userID);
    $fourth = mysqli_stmt_fetch($stmt);

    if ($userID > 0) {
        $newConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
        $prepstmt = mysqli_prepare($newConn,"SELECT * FROM Events WHERE UserID=?");
        $one = mysqli_stmt_bind_param($prepstmt, "s", $userID);
        $two = mysqli_stmt_execute($prepstmt);
        mysqli_stmt_bind_result($prepstmt, $eventID, $userID, $title, $date, $time, $location, $notes);
        $jsonobject = array() ;
        while ($row = mysqli_stmt_fetch($prepstmt)) {
            array_push($jsonobject, array(
                "eventID"=>$eventID, 
                "userID"=>$userID, 
                "title"=>$title, 
                "date"=>$date, 
                "time"=>$time, 
                "location"=>$location, 
                "notes"=>$notes));
        }
        echo json_encode($jsonobject);
        die();
    }

?>
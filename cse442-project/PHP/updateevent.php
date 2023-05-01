<?php

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

        $eventId = $_POST["eventId"];
        $token = $_POST["token"];

        $title = $_POST['title'];
        $date = $_POST['date'];
        $time = $_POST['time'] . ":00";
        $location = $_POST['location'];
        $notes = $_POST['notes'];

        $dbhost = 'oceanus';
        $dbname = 'cse442_2023_spring_team_ad_db';
        $dbuser = 'colegrab';
        $dbpass = '50225546';

        //Connect to USER table to get UserID from Token
        $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
        echo "Connected successfully to USER table <br>";
        $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE token=?");
        $first = mysqli_stmt_bind_param($stmt, "s", $token);
        $second = mysqli_stmt_execute($stmt);
        $third = mysqli_stmt_bind_result($stmt, $userID);
        $fetched = mysqli_stmt_fetch($stmt);

        if ($fetched) {
            echo "Fetched userID from USER table: " . $userID . "<br>";
            //Connect to EVENTS table for two reasons: A. Verify that userID+eventID match, and to fill in empty spots
            $eventConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
            $eventstmt = mysqli_prepare($eventConn, "SELECT Title, Date, TimeStart, TimeEnd, Location, Notes FROM Events WHERE UserID = ? AND EventID = ?");
            $first = mysqli_stmt_bind_param($eventstmt, "ss", $userID, $eventId);
            $second = mysqli_stmt_execute($eventstmt);
            $third = mysqli_stmt_bind_result($eventstmt, $title_stored, $date_stored, $timeStart_stored, $timeEnd_stored, $location_stored, $notes_stored);
            $found = mysqli_stmt_fetch($eventstmt);

<<<<<<< Updated upstream
            if ($fetched) {
                //Connect to EVENTS table for two reasons: A. Verify that userID+eventID match, and to fill in empty spots
                $eventConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
                $eventstmt = mysqli_prepare($connection, "SELECT Title, Date, Time, Location, Notes FROM Events WHERE UserID = ? AND EventID = ?");
                $first = mysqli_stmt_bind_param($eventstmt, "ss", $userID, $eventId);
                $second = mysqli_stmt_execute($eventstmt);
                $third = mysqli_stmt_bind_result($eventstmt, $title_stored, $date_stored, $time_stored, $location_stored, $notes_stored);
                $found = mysqli_stmt_fetch($eventstmt);

                //There is a matching userID and eventID pair - therefore can be updated
                if ($found) {
                    $updateConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
                    $prepstmt = mysqli_prepare($updateConn, "UPDATE Events SET Title = ?, Date = ?, Time = ?, Location = ?, Notes = ? WHERE eventId = ?");
                    //if the field isn't set from front-end i.e. user didn't change it
                    if (!isset($title)) {
                        $title = $title_stored;
                    }
                    if (!isset($date)) {
                        $date = $date_stored;
                    }
                    if (!isset($time)) {
                        $time = $time_stored;
                    }
                    if (!isset($location)) {
                        $location = $location_stored;
                    }
                    if (!isset($notes)) {
                        $notes = $notes_stored;
                    }
                    $first = mysqli_stmt_bind_param($prepstmt, "ssssss", $title, $date, $time, $location, $notes, $eventId);
                    $second = mysqli_stmt_execute($prepstmt);
=======
            //There is a matching userID and eventID pair - therefore can be updated
            if ($found) {
                echo "Fetched event from EVENTS table <br>";
                $updateConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
                $prepstmt = mysqli_prepare($updateConn, "UPDATE Events SET Title = ?, Date = ?, TimeStart = ?, TimeEnd = ?, Location = ?, Notes = ? WHERE eventId = ?");
                //if the field isn't set from front-end i.e. user didn't change it
                if ($title == "") {
                    echo "Title not set <br>";
                    $title = $title_stored;
>>>>>>> Stashed changes
                }
                if ($date == "") {
                    echo "Date not set <br>";
                    $date = $date_stored;
                }
                if ($timeStart == ":00") {
                    echo "TimeStart not set <br>";
                    $timeStart = $timeStart_stored;
                }
                if ($timeEnd == ":00") {
                    echo "TimeEnd not set <br>";
                    $timeEnd = $timeEnd_stored;
                }
                if ($location == "") {
                    echo "Location not set <br>";
                    $location = $location_stored;
                }
                if ($notes == "") {
                    echo "Notes not set <br>";
                    $notes = $notes_stored;
                }
                $first = mysqli_stmt_bind_param($prepstmt, "sssssss", $title, $date, $timeStart, $timeEnd, $location, $notes, $eventId);
                $second = mysqli_stmt_execute($prepstmt);
                echo "Updated event in EVENTS table <br>";
            }
        }
    }
    die();
?>
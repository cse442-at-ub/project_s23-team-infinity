<?php

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

        $eventId = $_POST["eventId"];
        $token = $_POST["usertoken"];

        $title = $_POST['title'];
        $date = $_POST['date'];
        $time = $_POST['time'] . ":00";
        $location = $_POST['location'];
        $notes = $_POST['notes'];

        if (strlen(trim($eventId)) == 0 or strlen(trim($token)) == 0) {
                echo "New event requires both username and event title";
                die();
        }

        else {
            $dbhost = 'oceanus';
            $dbname = 'cse442_2023_spring_team_ad_db';
            $dbuser = 'colegrab';
            $dbpass = '50225546';

            //Connect to USER table to get UserID from Token
            $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
            $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE token=?");
            $first = mysqli_stmt_bind_param($stmt, "s", $token);
            $second = mysqli_stmt_execute($stmt);
            $third = mysqli_stmt_bind_result($stmt, $userID);
            $fetched = mysqli_stmt_fetch($stmt);

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
                }
            }
        }
    }
    die();
?>
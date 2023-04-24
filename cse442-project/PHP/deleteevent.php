<?php

    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

        $eventId = $_POST["eventId"];
        $token = $_POST["token"];

        if (strlen(trim($eventId)) == 0 or 
            strlen(trim($token)) == 0) {
                echo "New event requires both username and event title";
                die();
        }

        else {
            $dbhost = 'oceanus';
            $dbname = 'cse442_2023_spring_team_ad_db';
            $dbuser = 'colegrab';
            $dbpass = '50225546';

            $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
        
            //find userID associated with token
            $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE Usertoken=?");
            $first = mysqli_stmt_bind_param($stmt, "s", $token);
            $second = mysqli_stmt_execute($stmt);
            $third = mysqli_stmt_bind_result($stmt, $userID);
            $fetch = mysqli_stmt_fetch($stmt);
            
            //if user found with that ID
            if ($fetch) {
                //Connect to EVENTS table for two reasons: A. Verify that userID+eventID match, and to fill in empty spots
                $eventConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
                $eventstmt = mysqli_prepare($connection, "SELECT Title, Date, Time, Location, Notes FROM Events WHERE UserID = ? AND EventID = ?");
                $first = mysqli_stmt_bind_param($eventstmt, "ss", $userID, $eventId);
                $second = mysqli_stmt_execute($eventstmt);
                $third = mysqli_stmt_bind_result($eventstmt, $title_stored, $date_stored, $time_stored, $location_stored, $notes_stored);
                $found = mysqli_stmt_fetch($eventstmt);

                //There is a matching userID and eventID pair - therefore can be removed
                if ($found) {
                    $deleteConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
                    $deletestmt = mysqli_prepare($deleteConn, "DELETE FROM Events WHERE EventId = ? AND UserID = ?");
                    $first = mysqli_stmt_bind_param($eventstmt, "ss", $userID, $eventId);
                    $done = mysqli_stmt_execute($eventstmt);

                    if ($done) {
                        echo "Event Removed!";
                        die();
                    }
                    else {
                        echo "Error when trying to remove event";
                        die();
                    }
                }
            }
        }
    }
    die();
?>
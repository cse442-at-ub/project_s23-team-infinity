<?php

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {

    $eventTitle = $_POST["eventTitle"];
    $token = $_POST["token"];
    echo "Got eventTitle: " . $eventTitle . " and token: " . $token . "<br>";

    if (strlen(trim($eventTitle)) == 0 or 
        strlen(trim($token)) == 0) {
            echo "New event requires both username and event title";
            die();
    }

    else {
        echo "Didn't fail <br>";
        $dbhost = 'oceanus';
        $dbname = 'cse442_2023_spring_team_ad_db';
        $dbuser = 'colegrab';
        $dbpass = '50225546';

        $connection = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());

        echo "Connected to DB <br>";
        //find userID associated with token
        $stmt = mysqli_prepare($connection, "SELECT UserID FROM Users WHERE token=?");
        $first = mysqli_stmt_bind_param($stmt, "s", $token);
        $second = mysqli_stmt_execute($stmt);
        $third = mysqli_stmt_bind_result($stmt, $userID);
        $fetch = mysqli_stmt_fetch($stmt);

        //if user found with that ID
        if ($fetch) {
            echo "Fetched userID: " . $userID . "<br>";
            echo "EventTitle: " . $eventTitle . "<br>";
            //Connect to EVENTS table for two reasons: A. Verify that userID+eventTitle match, and to fill in empty spots
            $eventConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
            $eventstmt = mysqli_prepare($eventConn, "SELECT Title FROM Events WHERE UserID = ? AND Title = ?");
            $first = mysqli_stmt_bind_param($eventstmt, "ss", $userID, $eventTitle);
            $second = mysqli_stmt_execute($eventstmt);
            $third = mysqli_stmt_bind_result($eventstmt, $title);
            $found = mysqli_stmt_fetch($eventstmt);
            echo "Found: " . $found . "<br>";

            //There is a matching userID and eventTitle pair - therefore can be removed
            if ($found) {
                echo "Found event with matching userID and eventTitle <br>";
                $deleteConn = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Connection Failed: " . mysqli_connect_error());
                $deletestmt = mysqli_prepare($deleteConn, "DELETE FROM Events WHERE UserID = ? AND Title = ?");
                $first = mysqli_stmt_bind_param($deletestmt, "ss", $userID, $eventTitle);
                $done = mysqli_stmt_execute($deletestmt);

                if ($done) {
                    echo "Event Removed!";
                }
                else {
                    echo "Error when trying to remove event";
                }
            }
        }
    }
}
?>

<?php
        //Code adapted from https://www.youtube.com/watch?v=nP-MvFoDVZE
        //PHP with MySql Tutorial by SimpliLearn
        //This is just as an example, will most likely need to be adapted

        //If statement says if server receives POST and the submit button was pressed
        if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {
                //Creating connection to our DB, if it fails, report error
                $dbhost = 'oceanus';
                $dbname = 'cse442_2023_spring_team_ad_db';
                $tablename = 'Users';
                $username = 'colegrab';
                $password = '50225546';
                $conn = mysqli_connect($dbhost,$username,$password,$dbname)
                        or die("Connection Failed: " .mysqli_connect_error());
                echo "Connection Success!<br>";
                //If the field 'username' and 'password' are not blank
                if(isset($_POST['username']) && isset($_POST ['email']) && isset($_POST['password'])) {
                        //Grab username and password from user-entered data
                        $user = $_POST['username'];
                        echo "Got username!<br>";
                        $pass = $_POST['password'];
                        echo "Got password!<br>";
                        $email = $_POST['email'];
                        echo "Got email!<br>";

                        //Create query statement (might need to be prepared; unsure)
                        $sql= "INSERT INTO $tablename VALUES (NULL, '$user', '$email', '$pass')";
                        echo $sql;
                        echo "<br>";
                        //run the query against MySQL db
                        $query = mysqli_query($conn, $sql);
                        //If there was no error
                        if ($query) {
                                echo "Success!<br><br><br>";
                                $allUsers = "SELECT Username, Email FROM $tablename";
                                $showall = mysqli_query($conn,$allUsers);
                                if ($showall) {
                                        echo "Query Successful!";
                                        echo $showall;
                                } else {
                                        echo "Error";
                                }
                        }
                        //Otherwise (there was an error)
                        else {
                                echo $query;
                                echo "Error<br>";
                        }
                }
        }
?>

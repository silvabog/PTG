<?php
$host = "localhost";
$user = "root";  // Default for XAMPP
$password = "njtransit";  // Default XAMPP password is empty
$dbname = "passthepapers";

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>

<?php
include 'config.php';

$title = $_POST['title'];
$author = $_POST['author'];
$description = $_POST['description'];
$donor_id = $_POST['donor_id'];

$sql = "INSERT INTO books (title, author, description, donor_id) VALUES ('$title', '$author', '$description', '$donor_id')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Book added successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>

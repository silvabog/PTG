<?php
include 'config.php';

$book_id = $_POST['book_id'];
$user_id = $_POST['user_id'];

$sql = "UPDATE books SET claimed_by = '$user_id' WHERE id = '$book_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Book claimed successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $conn->error]);
}

$conn->close();
?>

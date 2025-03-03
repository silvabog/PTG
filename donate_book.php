<?php
include 'config.php';

$title = $_POST['title'];
$author = $_POST['author'];
$description = $_POST['description'];
$donor_id = $_POST['donor_id'];

$sql = "INSERT INTO books (title, author, description, donor_id) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $title, $author, $description, $donor_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Book donated successfully!"]);
} else {
    echo json_encode(["error" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>

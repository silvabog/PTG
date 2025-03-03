<?php
include 'config.php';

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM books WHERE donor_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode($books);
$stmt->close();
$conn->close();
?>

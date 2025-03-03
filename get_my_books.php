<?php
include 'config.php';

$user_id = $_GET['user_id'];

$sql = "SELECT books.*, users.name AS donor_name FROM books 
        JOIN users ON books.donor_id = users.id 
        WHERE books.claimed_by = ?";
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

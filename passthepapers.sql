-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2025 at 05:45 PM
-- Server version: 8.4.3
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `passthepapers`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `donor_id` int NOT NULL,
  `claimed_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author`, `description`, `donor_id`, `claimed_by`, `created_at`) VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'A classic novel set in the Roaring Twenties.', 1, 1, '2025-02-13 02:05:48'),
(2, 'To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice and moral growth.', 2, 1, '2025-02-13 02:05:48'),
(3, '1984', 'George Orwell', 'A dystopian novel about totalitarian surveillance.', 3, 1, '2025-02-13 02:05:48'),
(4, 'Pride and Prejudice', 'Jane Austen', 'A love story set in 19th-century England.', 4, 1, '2025-02-13 02:05:48'),
(5, 'Moby Dick', 'Herman Melville', 'A thrilling tale of obsession and revenge.', 5, NULL, '2025-02-13 02:05:48'),
(6, 'The Catcher in the Rye', 'J.D. Salinger', 'A novel about teenage angst and alienation.', 6, NULL, '2025-02-13 02:05:48'),
(7, 'War and Peace', 'Leo Tolstoy', 'A historical novel covering Napoleon’s invasion of Russia.', 7, NULL, '2025-02-13 02:05:48'),
(8, 'The Hobbit', 'J.R.R. Tolkien', 'A fantasy adventure following Bilbo Baggins.', 8, NULL, '2025-02-13 02:05:48'),
(9, 'Crime and Punishment', 'Fyodor Dostoevsky', 'A psychological novel about guilt and redemption.', 9, NULL, '2025-02-13 02:05:48'),
(10, 'Brave New World', 'Aldous Huxley', 'A dystopian novel about a futuristic society.', 10, 1, '2025-02-13 02:05:48'),
(11, 'ajsdn', 'asd', 'asjdna', 12, NULL, '2025-03-01 22:57:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Alice Johnson', 'alice@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(2, 'Bob Smith', 'bob@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(3, 'Charlie Brown', 'charlie@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(4, 'David White', 'david@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(5, 'Emily Green', 'emily@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(6, 'Frank Miller', 'frank@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(7, 'Grace Hall', 'grace@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(8, 'Henry Adams', 'henry@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(9, 'Isla Brown', 'isla@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(10, 'Jack Wilson', 'jack@example.com', '$2y$10$eW5p2X1yMbwzpeJ1XbU1ROrZaLRVXBCnTFuF7qQXq.oXym6U.WMlK'),
(11, 'jovany', 'johndoe@example.com', '$2y$10$xJSv/JMtk4GSS7dytqxuOOWPGYYe.SfYewk8..2GOncpnJvho2WPy'),
(12, 'test', 'test123@gmail.com', '$2y$10$v.vqtObtnIeQIac3tdrMvOArK8YnpTOfsHrLKgMvGtsRMxpxNUwEa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donor_id` (`donor_id`),
  ADD KEY `claimed_by` (`claimed_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`claimed_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

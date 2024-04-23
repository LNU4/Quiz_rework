-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 24 apr 2024 kl 00:33
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `quiz_rework`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `cities`
--

INSERT INTO `cities` (`id`, `name`, `latitude`, `longitude`) VALUES
(1, 'Tokyo', 35.6895, 139.692),
(2, 'New Delhi', 28.6139, 77.209),
(3, 'Mexico City', 19.4326, -99.1332),
(4, 'Moscow', 55.7558, 37.6176),
(5, 'Cairo', 30.0444, 31.2357),
(6, 'London', 51.5074, -0.1278),
(7, 'Paris', 48.8566, 2.3522),
(8, 'Berlin', 52.52, 13.405),
(9, 'Rome', 41.9028, 12.4964),
(10, 'Madrid', 40.4168, -3.7038),
(11, 'Athens', 37.9838, 23.7275),
(12, 'Brasília', -15.8267, -47.9218),
(13, 'Washington D.C.', 38.8951, -77.0364),
(14, 'Ottawa', 45.4215, -75.6981),
(15, 'Canberra', -35.2809, 149.13),
(16, 'Beijing', 39.9042, 116.407),
(17, 'Seoul', 37.5665, 126.978),
(18, 'Bangkok', 13.7563, 100.502),
(19, 'Hanoi', 21.0285, 105.854),
(20, 'Jakarta', -6.2088, 106.846),
(21, 'Lima', -12.0464, -77.0428),
(22, 'Buenos Aires', -34.6037, -58.3816),
(23, 'Santiago', -33.4489, -70.6693),
(24, 'Caracas', 10.4806, -66.9036),
(25, 'Lisbon', 38.7167, -9.1333),
(26, 'Dublin', 53.3441, -6.2675),
(27, 'Stockholm', 59.3293, 18.0686),
(28, 'Oslo', 59.9139, 10.7522),
(29, 'Copenhagen', 55.6761, 12.5683),
(30, 'Helsinki', 60.1699, 24.9384),
(31, 'Warsaw', 52.2298, 21.0118),
(32, 'Budapest', 47.4979, 19.0402),
(33, 'Vienna', 48.2085, 16.3738),
(34, 'Prague', 50.0755, 14.4378),
(35, 'Brussels', 50.8503, 4.3517),
(36, 'Amsterdam', 52.3676, 4.9041),
(37, 'Bern', 46.948, 7.4474),
(38, 'Athens', 37.9838, 23.7275),
(39, 'Ankara', 39.9334, 32.8597),
(40, 'Jerusalem', 31.7683, 35.2137),
(41, 'Riyadh', 24.7136, 46.6753),
(42, 'Baghdad', 33.3152, 44.3661),
(43, 'Tehran', 35.6892, 51.389),
(44, 'Kabul', 34.5553, 69.2075),
(45, 'Islamabad', 33.6844, 73.0479),
(46, 'Dhaka', 23.8103, 90.4125),
(47, 'Colombo', 6.9271, 79.8612),
(48, 'Kathmandu', 27.7172, 85.324);

-- --------------------------------------------------------

--
-- Tabellstruktur `game_sessions`
--

CREATE TABLE `game_sessions` (
  `id` int(11) NOT NULL,
  `session_token` varchar(36) NOT NULL,
  `creating_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `game_sessions`
--

INSERT INTO `game_sessions` (`id`, `session_token`, `creating_user_id`) VALUES
(1, '21c6fe12-4267-4609-8510-75dbff1d2685', 1),
(2, 'aaebee08-eb0a-41d3-b7f0-ea43dfa4d187', 1),
(3, '9fcbbf90-6e74-4f78-aa3a-6330e4394ab2', 4),
(4, 'e8c2fd52-254c-495d-88e5-ee563be97779', 1);

-- --------------------------------------------------------

--
-- Tabellstruktur `game_session_cities`
--

CREATE TABLE `game_session_cities` (
  `id` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `game_session_cities`
--

INSERT INTO `game_session_cities` (`id`, `game_session_id`, `city_id`) VALUES
(1, 1, 32),
(2, 1, 41),
(3, 1, 28),
(4, 1, 24),
(5, 1, 34),
(6, 2, 12),
(7, 2, 3),
(8, 2, 27),
(9, 2, 43),
(10, 2, 14),
(11, 3, 21),
(12, 3, 42),
(13, 3, 14),
(14, 3, 22),
(15, 3, 29),
(16, 4, 31),
(17, 4, 27),
(18, 4, 13),
(19, 4, 45),
(20, 4, 26);

-- --------------------------------------------------------

--
-- Tabellstruktur `game_session_leaderboard`
--

CREATE TABLE `game_session_leaderboard` (
  `id` int(11) NOT NULL,
  `game_session_id` int(11) NOT NULL,
  `answering_user_id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `game_session_leaderboard`
--

INSERT INTO `game_session_leaderboard` (`id`, `game_session_id`, `answering_user_id`, `score`) VALUES
(1, 2, 1, 5),
(2, 2, 1, 10),
(3, 2, 2, 10),
(4, 3, 4, 12),
(5, 4, 1, 12);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'testuser', 'test1'),
(2, 'testuser22', 'test22'),
(3, 'El', 'user1'),
(4, 'El', 'password1');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `game_sessions`
--
ALTER TABLE `game_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_token` (`session_token`),
  ADD KEY `creating_user_id` (`creating_user_id`);

--
-- Index för tabell `game_session_cities`
--
ALTER TABLE `game_session_cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_session_id` (`game_session_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Index för tabell `game_session_leaderboard`
--
ALTER TABLE `game_session_leaderboard`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_session_id` (`game_session_id`),
  ADD KEY `answering_user_id` (`answering_user_id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT för tabell `game_sessions`
--
ALTER TABLE `game_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT för tabell `game_session_cities`
--
ALTER TABLE `game_session_cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT för tabell `game_session_leaderboard`
--
ALTER TABLE `game_session_leaderboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `game_sessions`
--
ALTER TABLE `game_sessions`
  ADD CONSTRAINT `game_sessions_ibfk_1` FOREIGN KEY (`creating_user_id`) REFERENCES `users` (`id`);

--
-- Restriktioner för tabell `game_session_cities`
--
ALTER TABLE `game_session_cities`
  ADD CONSTRAINT `game_session_cities_ibfk_1` FOREIGN KEY (`game_session_id`) REFERENCES `game_sessions` (`id`),
  ADD CONSTRAINT `game_session_cities_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`);

--
-- Restriktioner för tabell `game_session_leaderboard`
--
ALTER TABLE `game_session_leaderboard`
  ADD CONSTRAINT `game_session_leaderboard_ibfk_1` FOREIGN KEY (`game_session_id`) REFERENCES `game_sessions` (`id`),
  ADD CONSTRAINT `game_session_leaderboard_ibfk_2` FOREIGN KEY (`answering_user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

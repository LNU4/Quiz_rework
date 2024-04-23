DROP DATABASE IF EXISTS quiz_rework;
CREATE DATABASE IF NOT EXISTS quiz_rework;
USE quiz_rework;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL, 
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_token VARCHAR(36) NOT NULL UNIQUE,
  creating_user_id INT NOT NULL,
  FOREIGN KEY (creating_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS game_session_cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_session_id INT NOT NULL,
  city_id INT NOT NULL,
  FOREIGN KEY (game_session_id) REFERENCES game_sessions(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE IF NOT EXISTS game_session_leaderboard (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_session_id INT NOT NULL,
  answering_user_id INT NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (game_session_id) REFERENCES game_sessions(id),
  FOREIGN KEY (answering_user_id) REFERENCES users(id)
);

INSERT INTO cities (id, name, latitude, longitude) VALUES
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
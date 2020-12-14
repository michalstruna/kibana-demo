DELETE FROM user;
DELETE FROM device;
DELETE FROM sensor;

INSERT INTO user (id, username, password, role) VALUES
(1, 'admin@admin.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 2),
(2, 'user@user.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 1),
(3, 'admin2@admin.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 2),
(4, 'user2@user.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 1),
(5, 'admin3@admin.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 2),
(6, 'user3@user.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 1),
(7, 'admin4@admin.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 2),
(8, 'user4@user.cz', '$2a$10$XgbP6h1UQ1tI8O6t/5u8mOGiWxMIbEwCmzawLCK4Ui9kNqrwqT1g2', 1);

INSERT INTO device (id, name, user_id, latitude, longitude, altitude) VALUES
(1, 'Meteorologická stanice 1', 1, 10, 20, 0),
(2, 'Sonda 1', 1, 20, 30, 300),
(3, 'Meteorologická stanice 2', 1, 30, 40, 100),
(4, 'Sonda 2', 1, 40, 50, 100),
(5, 'Meteorologická stanice 3', 2, 50, 60, 250),
(6, 'Sonda 3', 2, 60, 70, 100),
(7, 'Meteorologická stanice 4', 3, 80, 10, 500),
(8, 'Sonda 4', 4, 70, 20, 500),
(9, 'Meteorologická stanice 5', 5, 60, 30, 50),
(10, 'Sonda 5', 6, 50, 40, 60),
(11, 'Meteorologická stanice 6', 6, 40, 70, 200),
(12, 'Sonda 6', 7, 60, 70, 0),
(13, 'Meteorologická stanice 7', 7, 60, 30, 300),
(14, 'Sonda 7', 7, 50, 30, 250),
(15, 'Meteorologická stanice 8', 8, 40, 60, 50),
(16, 'Sonda 8', 8, 60, 80, 300);

INSERT INTO sensor (id, name, device_id, type) VALUES
(1, 'Teploměr 1', 1, 'THERMOMETER'),
(2, 'Anemometr 2', 1, 'ANEMOMETER'),
(4, 'Vlhkoměr 3', 1, 'HYGROMETER'),
(5, 'Tlakoměr 4', 1, 'BAROMETER'),

(6, 'Teploměr 5', 2, 'THERMOMETER'),
(7, 'Anemometr 6', 2, 'ANEMOMETER'),
(8, 'Vlhkoměr 7', 2, 'HYGROMETER'),
(9, 'Tlakoměr 8', 2, 'BAROMETER'),

(10, 'Teploměr 9', 3, 'THERMOMETER'),
(11, 'Anemometr 10', 3, 'ANEMOMETER'),
(12, 'Tlakoměr 11', 3, 'BAROMETER'),
(13, 'Tlakoměr 12', 5, 'BAROMETER'),

(14, 'Teploměr 13', 4, 'THERMOMETER'),
(15, 'Anemometr 14', 4, 'ANEMOMETER'),
(16, 'Vlhkoměr 15', 4, 'THERMOMETER'),
(17, 'Tlakoměr 16', 4, 'BAROMETER'),

(18, 'Teploměr 17', 5, 'THERMOMETER'),
(19, 'Anemometr 18', 5, 'ANEMOMETER'),
(20, 'Vlhkoměr 19', 5, 'HYGROMETER'),
(21, 'Teploměr 20', 5, 'THERMOMETER'),

(56, 'Teploměr 21', 6, 'THERMOMETER'),
(22, 'Anemometr 22', 7, 'ANEMOMETER'),
(24, 'Vlhkoměr 23', 6, 'HYGROMETER'),
(25, 'Tlakoměr 24', 7, 'BAROMETER'),

(26, 'Teploměr 25', 8, 'THERMOMETER'),
(27, 'Tlakoměr 26', 9, 'BAROMETER'),
(28, 'Vlhkoměr 27', 10, 'HYGROMETER'),
(29, 'Tlakoměr 28', 11, 'BAROMETER'),

(30, 'Teploměr 29', 12, 'THERMOMETER'),
(32, 'Anemometr 30', 13, 'ANEMOMETER'),
(34, 'Teploměr 31', 14, 'THERMOMETER'),
(35, 'Tlakoměr 32', 16, 'BAROMETER'),

(41, 'Teploměr 33', 16, 'THERMOMETER'),
(42, 'Anemometr 34', 16, 'ANEMOMETER'),
(44, 'Vlhkoměr 35', 15, 'HYGROMETER'),
(45, 'Tlakoměr 36', 15, 'BAROMETER'),

(51, 'Teploměr 37', 13, 'THERMOMETER'),
(52, 'Anemometr 38', 13, 'ANEMOMETER'),
(54, 'Vlhkoměr 39', 13, 'HYGROMETER'),
(55, 'Tlakoměr 40', 1, 'BAROMETER');

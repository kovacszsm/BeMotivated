-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 21. 10:13
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `adatbazis`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tasks`
--

CREATE TABLE `tasks` (
  `Id` int(10) UNSIGNED NOT NULL,
  `UserId` int(10) UNSIGNED NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `StartTime` varchar(5) NOT NULL,
  `EndTime` varchar(5) NOT NULL,
  `TaskDate` date NOT NULL,
  `Completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tasks`
--

INSERT INTO `tasks` (`Id`, `UserId`, `CategoryId`, `StartTime`, `EndTime`, `TaskDate`, `Completed`) VALUES
(8, 1, 13, '11:11', '13:13', '2025-02-20', 0),
(9, 1, 13, '15:13', '16:16', '2025-02-20', 0),
(10, 1, 65, '11:11', '12:12', '2025-02-21', 0),
(11, 1, 79, '10:10', '10:40', '2025-02-20', 0),
(12, 1, 79, '11:11', '11:12', '2025-02-21', 0),
(13, 1, 14, '10:10', '10:50', '2025-02-22', 0),
(14, 1, 107, '10:01', '10:09', '2025-02-22', 0),
(16, 1, 41, '15:25', '16:00', '2025-02-20', 0),
(17, 1, 13, '11:01', '12:12', '2025-02-21', 0),
(19, 1, 10, '11:11', '12:12', '2025-02-22', 0),
(20, 1, 14, '15:11', '16:10', '2025-02-21', 0),
(21, 1, 2, '10:10', '10:20', '2025-02-23', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` int(10) UNSIGNED NOT NULL,
  `FelhasznaloNev` varchar(255) NOT NULL,
  `Salt` varchar(255) NOT NULL,
  `Hash` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Jogosultsag` int(11) NOT NULL DEFAULT 0,
  `Aktiv` int(11) NOT NULL DEFAULT 1,
  `RegisztracioDatuma` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `FelhasznaloNev`, `Salt`, `Hash`, `Email`, `Jogosultsag`, `Aktiv`, `RegisztracioDatuma`) VALUES
(1, 'Zsoltyx', 'FroHWi3lu1uGpWUS', '90d25ef9eb6e9237f6ca8126b34e1dd9d1fd6a21ed315f7bac0d4b9e7480194c', 'kovacszs@kkszki.hu', 0, 1, '2025-02-21 09:00:28');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `FelhasznaloNev` (`FelhasznaloNev`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `tasks`
--
ALTER TABLE `tasks`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

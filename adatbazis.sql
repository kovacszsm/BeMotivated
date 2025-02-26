-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 26. 11:22
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
(33, 1, 85, '10:10', '10:20', '2025-02-24', 1),
(34, 2, 53, '07:15', '14:20', '2025-02-24', 1),
(35, 2, 53, '07:15', '15:15', '2025-02-25', 0),
(44, 1, 11, '10:01', '10:30', '2025-02-25', 1),
(45, 1, 43, '12:01', '12:02', '2025-02-25', 1),
(59, 1, 53, '07:15', '11:30', '2025-02-26', 1),
(60, 1, 1, '12:00', '13:30', '2025-02-26', 0);

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
  `RegisztracioDatuma` datetime NOT NULL DEFAULT current_timestamp(),
  `streak` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `xp` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `Profilkep` varchar(255) NOT NULL DEFAULT 'default.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `FelhasznaloNev`, `Salt`, `Hash`, `Email`, `Jogosultsag`, `Aktiv`, `RegisztracioDatuma`, `streak`, `xp`, `Profilkep`) VALUES
(1, 'Zsoltyx', 'FroHWi3lu1uGpWUS', '90d25ef9eb6e9237f6ca8126b34e1dd9d1fd6a21ed315f7bac0d4b9e7480194c', 'kovacszs@kkszki.hu', 0, 1, '2025-02-21 09:00:28', 0, 120, 'default.jpg'),
(2, 'Mark', 'PA4dvxwdpWkDOEs3', '60e731ff40963bf66f36e9b196cd26f379d5528c08dab9922a7dd19d25c1c996', 'tothm@kkszki.hu', 0, 1, '2025-02-24 08:57:49', 0, 0, 'default.jpg');

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
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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

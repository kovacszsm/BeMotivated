-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 03. 14:48
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
CREATE DATABASE IF NOT EXISTS `adatbazis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `adatbazis`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `category_type`
--

CREATE TABLE `category_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `category_type`
--

INSERT INTO `category_type` (`id`, `name`) VALUES
(2, 'Egészség & Wellness'),
(6, 'Hétköznapi Teendők'),
(5, 'Kapcsolatok & Szociális élet'),
(3, 'Munka & Tanulás'),
(1, 'Sport & Testmozgás'),
(4, 'Szórakozás & Hobbi');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `predefined_tasks`
--

CREATE TABLE `predefined_tasks` (
  `id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `text` varchar(255) NOT NULL,
  `icon` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `predefined_tasks`
--

INSERT INTO `predefined_tasks` (`id`, `category_id`, `text`, `icon`) VALUES
(1, 1, 'Edzés', '🏋️‍♂️'),
(2, 1, 'Futás', '🏃‍♂️'),
(3, 1, 'Jóga', '🧘‍♂️'),
(4, 1, 'Kerékpározás', '🚴‍♂️'),
(5, 1, 'Úszás', '🏊‍♂️'),
(6, 1, 'Séta', '🚶‍♂️'),
(7, 1, 'Nyújtás', '🤸‍♂️'),
(8, 1, 'Tornázás', '🤾‍♂️'),
(9, 1, 'Pilates', '🧘‍♀️'),
(10, 1, 'Guggolás gyakorlás', '🏋️‍♀️'),
(11, 1, 'Fekvőtámaszok', '💪'),
(12, 1, 'Felülések', '🏋️'),
(13, 1, 'Súlyemelés', '🏋️‍♂️'),
(14, 1, 'Boxolás', '🥊'),
(15, 1, 'Kickbox', '🥊'),
(16, 1, 'Küzdősport edzés', '🥋'),
(17, 1, 'Labdarúgás (foci)', '⚽'),
(18, 1, 'Kosárlabdázás', '🏀'),
(19, 1, 'Röplabdázás', '🏐'),
(20, 1, 'Kézilabda', '🤾'),
(21, 1, 'Jégkorong', '🏒'),
(22, 1, 'Tollaslabda', '🏸'),
(23, 1, 'Teniszezés', '🎾'),
(24, 1, 'Pingpongozás', '🏓'),
(25, 1, 'Gördeszkázás', '🛹'),
(26, 1, 'Snowboardozás', '🏂'),
(27, 1, 'Síelés', '🎿'),
(28, 1, 'Lovaglás', '🐎'),
(29, 1, 'Íjászat', '🏹'),
(30, 1, 'Búvárkodás', '🤿'),
(31, 1, 'Vízisí', '🚤'),
(32, 1, 'Szörfözés', '🏄‍♂️'),
(33, 1, 'Kajakozás', '🚣'),
(34, 1, 'Sárkányhajózás', '🛶'),
(35, 1, 'Kötélmászás', '🧗'),
(36, 1, 'Hegymászás', '🏔️'),
(37, 1, 'Parkour', '🏃‍♂️💨'),
(38, 1, 'Golf', '⛳'),
(39, 1, 'Frizbi', '🥏'),
(40, 1, 'Horgászat', '🎣'),
(41, 2, 'Orvosi vizsgálat', '🏥'),
(42, 2, 'Vitaminok bevétele', '💊'),
(43, 2, 'Vízfogyasztás', '🚰'),
(44, 2, 'Egészséges étkezés', '🥗'),
(45, 2, 'Pihenés', '😌'),
(46, 2, 'Alvás', '🛌'),
(47, 2, 'Szaunázás', '🔥'),
(48, 2, 'Masszázs', '💆‍♂️'),
(49, 2, 'Légzőgyakorlatok', '🌬️'),
(50, 2, 'Napfényben töltött idő', '🌞'),
(51, 2, 'Bőrápolás', '🧴'),
(52, 3, 'Munka', '💼'),
(53, 3, 'Tanulás', '📚'),
(54, 3, 'Olvasás', '📖'),
(55, 3, 'Meeting', '📅'),
(56, 3, 'Nyelvtanulás', '🌍'),
(57, 3, 'Programozás', '💻'),
(58, 3, 'Prezentáció készítése', '🖥️'),
(59, 3, 'Projekttervezés', '📊'),
(60, 3, 'Email kezelés', '📧'),
(61, 3, 'Jegyzetelés', '📝'),
(62, 3, 'Új készségek tanulása', '🎓'),
(63, 3, 'Kutatás vagy információgyűjtés', '🔍'),
(64, 3, 'Időmenedzsment', '⏳'),
(65, 3, 'Határidők kezelése', '⏰'),
(66, 4, 'Filmnézés', '🎬'),
(67, 4, 'Sorozatnézés', '📺'),
(68, 4, 'Zenehallgatás', '🎵'),
(69, 4, 'Hangszeren játszás', '🎸'),
(70, 4, 'Rajzolás vagy festés', '🎨'),
(71, 4, 'Fotózás', '📷'),
(72, 4, 'Kirándulás', '⛰️'),
(73, 4, 'Társasjáték', '🎲'),
(74, 4, 'Tánc', '💃'),
(75, 4, 'Podcast hallgatás', '🎙️'),
(76, 4, 'Kézműveskedés', '✂️'),
(77, 4, 'Kertészkedés', '🌱'),
(78, 4, 'Barkácsolás', '🔨'),
(79, 4, 'Kirándulás egy új városba', '🏙️'),
(80, 4, 'Videójáték', '🎮'),
(81, 4, 'Gasztronómiai élmények kipróbálása', '🍽️'),
(82, 4, 'Bor- vagy sörkóstolás', '🍷'),
(83, 5, 'Családi időtöltés', '🏡'),
(84, 5, 'Baráti találkozó', '🍻'),
(85, 5, 'Telefonhívás', '📞'),
(86, 5, 'Üzenetek küldése', '💬'),
(87, 5, 'Önkénteskedés', '❤️'),
(88, 5, 'Születésnapi köszöntés', '🎂'),
(89, 5, 'Csapatmunka vagy kollaboráció', '🤝'),
(90, 5, 'Új emberekkel való ismerkedés', '🗣️'),
(91, 5, 'Együtt főzés', '👩‍🍳'),
(92, 5, 'Közösségi eseményen való részvétel', '🎉'),
(93, 5, 'Randi', '💖'),
(94, 5, 'Jótékonyság', '🎁'),
(95, 6, 'Bevásárlás', '🛒'),
(96, 6, 'Takarítás', '🏠'),
(97, 6, 'Mosás', '🧺'),
(98, 6, 'Autóvezetés', '🚗'),
(99, 6, 'Számlák befizetése', '💵'),
(100, 6, 'Postára menés', '📦'),
(101, 6, 'Főzés', '🍲'),
(102, 6, 'Szemét kivitele', '🚮'),
(103, 6, 'Növények locsolása', '🌿'),
(104, 6, 'Ruhák selejtezése', '👕'),
(105, 6, 'Számítógép vagy telefon rendszerezése', '🖥️'),
(106, 6, 'Fiókok rendbetétele', '🗄️'),
(107, 6, 'Sportfelszerelés karbantartása', '🎾'),
(108, 6, 'Autómosás', '🚘'),
(109, 6, 'Új ruhák vásárlása', '🛍️'),
(110, 6, 'Heti költségvetés ellenőrzése', '💰'),
(111, 6, 'Napi célok kitűzése', '🏆'),
(112, 6, 'Naplóírás', '📔');

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
(1, 'Zsoltyx', 'FroHWi3lu1uGpWUS', '90d25ef9eb6e9237f6ca8126b34e1dd9d1fd6a21ed315f7bac0d4b9e7480194c', 'kovacszs@kkszki.hu', 0, 1, '2025-02-21 09:00:28', 0, 240, 'http://bemotivated3.nhely.hu/images/Zsoltyx.jpg'),
(2, 'Mark', 'PA4dvxwdpWkDOEs3', '60e731ff40963bf66f36e9b196cd26f379d5528c08dab9922a7dd19d25c1c996', 'tothm@kkszki.hu', 9, 1, '2025-02-24 08:57:49', 0, 0, 'default.jpg'),
(3, 'nemethb', 'FYvgGXPJFMRETl7e', '8d43625cd832878912ea302b98220f9332e9230e0832dc597f8f7972a6d1402e', 'nemethb@kkszki.hu', 0, 1, '2025-02-27 11:14:22', 0, 0, 'http://bemotivated3.nhely.hu/images/nemethb.png');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_tasks`
--

CREATE TABLE `user_tasks` (
  `Id` int(10) UNSIGNED NOT NULL,
  `UserId` int(10) UNSIGNED NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `StartTime` varchar(5) NOT NULL,
  `EndTime` varchar(5) NOT NULL,
  `TaskDate` date NOT NULL,
  `Completed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user_tasks`
--

INSERT INTO `user_tasks` (`Id`, `UserId`, `CategoryId`, `StartTime`, `EndTime`, `TaskDate`, `Completed`) VALUES
(72, 1, 42, '12:01', '12:02', '2025-02-28', 1),
(73, 1, 2, '12:00', '12:20', '2024-01-01', 1),
(76, 1, 70, '10:00', '11:00', '2024-03-02', 1),
(77, 1, 70, '13:00', '14:00', '2025-02-28', 1),
(78, 1, 67, '15:00', '16:00', '2025-02-28', 1),
(79, 1, 53, '07:15', '14:20', '2025-03-03', 0),
(80, 1, 43, '10:00', '10:01', '2025-02-28', 0),
(81, 1, 41, '10:01', '10:02', '2025-03-01', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `category_type`
--
ALTER TABLE `category_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `predefined_tasks`
--
ALTER TABLE `predefined_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `FelhasznaloNev` (`FelhasznaloNev`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- A tábla indexei `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `UserId_2` (`UserId`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `category_type`
--
ALTER TABLE `category_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `predefined_tasks`
--
ALTER TABLE `predefined_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `user_tasks`
--
ALTER TABLE `user_tasks`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `predefined_tasks`
--
ALTER TABLE `predefined_tasks`
  ADD CONSTRAINT `predefined_tasks_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_type` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD CONSTRAINT `user_tasks_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

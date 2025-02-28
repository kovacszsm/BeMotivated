-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 28. 10:10
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
-- Tábla szerkezet ehhez a táblához `predefined_tasks`
--

CREATE TABLE `predefined_tasks` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `task_text` varchar(100) NOT NULL,
  `icon` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `predefined_tasks`
--

INSERT INTO `predefined_tasks` (`id`, `category`, `task_text`, `icon`) VALUES
(1, 'Sport & Testmozgás', 'Edzés', '🏋️‍♂️'),
(2, 'Sport & Testmozgás', 'Futás', '🏃‍♂️'),
(3, 'Sport & Testmozgás', 'Jóga', '🧘‍♂️'),
(4, 'Sport & Testmozgás', 'Kerékpározás', '🚴‍♂️'),
(5, 'Sport & Testmozgás', 'Úszás', '🏊‍♂️'),
(6, 'Sport & Testmozgás', 'Séta', '🚶‍♂️'),
(7, 'Sport & Testmozgás', 'Nyújtás', '🤸‍♂️'),
(8, 'Sport & Testmozgás', 'Tornázás', '🤾‍♂️'),
(9, 'Sport & Testmozgás', 'Pilates', '🧘‍♀️'),
(10, 'Sport & Testmozgás', 'Guggolás gyakorlás', '🏋️‍♀️'),
(11, 'Sport & Testmozgás', 'Fekvőtámaszok', '💪'),
(12, 'Sport & Testmozgás', 'Felülések', '🏋️'),
(13, 'Sport & Testmozgás', 'Súlyemelés', '🏋️‍♂️'),
(14, 'Sport & Testmozgás', 'Boxolás', '🥊'),
(15, 'Sport & Testmozgás', 'Kickbox', '🥊'),
(16, 'Sport & Testmozgás', 'Küzdősport edzés', '🥋'),
(17, 'Sport & Testmozgás', 'Labdarúgás (foci)', '⚽'),
(18, 'Sport & Testmozgás', 'Kosárlabdázás', '🏀'),
(19, 'Sport & Testmozgás', 'Röplabdázás', '🏐'),
(20, 'Sport & Testmozgás', 'Kézilabda', '🤾'),
(21, 'Sport & Testmozgás', 'Jégkorong', '🏒'),
(22, 'Sport & Testmozgás', 'Tollaslabda', '🏸'),
(23, 'Sport & Testmozgás', 'Teniszezés', '🎾'),
(24, 'Sport & Testmozgás', 'Pingpongozás', '🏓'),
(25, 'Sport & Testmozgás', 'Gördeszkázás', '🛹'),
(26, 'Sport & Testmozgás', 'Snowboardozás', '🏂'),
(27, 'Sport & Testmozgás', 'Síelés', '🎿'),
(28, 'Sport & Testmozgás', 'Lovaglás', '🐎'),
(29, 'Sport & Testmozgás', 'Íjászat', '🏹'),
(30, 'Sport & Testmozgás', 'Búvárkodás', '🤿'),
(31, 'Sport & Testmozgás', 'Vízisí', '🚤'),
(32, 'Sport & Testmozgás', 'Szörfözés', '🏄‍♂️'),
(33, 'Sport & Testmozgás', 'Kajakozás', '🚣'),
(34, 'Sport & Testmozgás', 'Sárkányhajózás', '🛶'),
(35, 'Sport & Testmozgás', 'Kötélmászás', '🧗'),
(36, 'Sport & Testmozgás', 'Hegymászás', '🏔️'),
(37, 'Sport & Testmozgás', 'Parkour', '🏃‍♂️💨'),
(38, 'Sport & Testmozgás', 'Golf', '⛳'),
(39, 'Sport & Testmozgás', 'Frizbi', '🥏'),
(40, 'Sport & Testmozgás', 'Horgászat', '🎣'),
(41, 'Egészség & Wellness', 'Orvosi vizsgálat', '🏥'),
(42, 'Egészség & Wellness', 'Vitaminok bevétele', '💊'),
(43, 'Egészség & Wellness', 'Vízfogyasztás', '🚰'),
(44, 'Egészség & Wellness', 'Egészséges étkezés', '🥗'),
(45, 'Egészség & Wellness', 'Pihenés', '😌'),
(46, 'Egészség & Wellness', 'Alvás', '🛌'),
(47, 'Egészség & Wellness', 'Szaunázás', '🔥'),
(48, 'Egészség & Wellness', 'Masszázs', '💆‍♂️'),
(49, 'Egészség & Wellness', 'Légzőgyakorlatok', '🌬️'),
(50, 'Egészség & Wellness', 'Napfényben töltött idő', '🌞'),
(51, 'Egészség & Wellness', 'Bőrápolás', '🧴'),
(52, 'Munka & Tanulás', 'Munka', '💼'),
(53, 'Munka & Tanulás', 'Tanulás', '📚'),
(54, 'Munka & Tanulás', 'Olvasás', '📖'),
(55, 'Munka & Tanulás', 'Meeting', '📅'),
(56, 'Munka & Tanulás', 'Nyelvtanulás', '🌍'),
(57, 'Munka & Tanulás', 'Programozás', '💻'),
(58, 'Munka & Tanulás', 'Prezentáció készítése', '🖥️'),
(59, 'Munka & Tanulás', 'Projekttervezés', '📊'),
(60, 'Munka & Tanulás', 'Email kezelés', '📧'),
(61, 'Munka & Tanulás', 'Jegyzetelés', '📝'),
(62, 'Munka & Tanulás', 'Új készségek tanulása', '🎓'),
(63, 'Munka & Tanulás', 'Kutatás vagy információgyűjtés', '🔍'),
(64, 'Munka & Tanulás', 'Időmenedzsment', '⏳'),
(65, 'Munka & Tanulás', 'Határidők kezelése', '⏰'),
(66, 'Szórakozás & Hobbi', 'Filmnézés', '🎬'),
(67, 'Szórakozás & Hobbi', 'Sorozatnézés', '📺'),
(68, 'Szórakozás & Hobbi', 'Zenehallgatás', '🎵'),
(69, 'Szórakozás & Hobbi', 'Hangszeren játszás', '🎸'),
(70, 'Szórakozás & Hobbi', 'Rajzolás vagy festés', '🎨'),
(71, 'Szórakozás & Hobbi', 'Fotózás', '📷'),
(72, 'Szórakozás & Hobbi', 'Kirándulás', '⛰️'),
(73, 'Szórakozás & Hobbi', 'Társasjáték', '🎲'),
(74, 'Szórakozás & Hobbi', 'Tánc', '💃'),
(75, 'Szórakozás & Hobbi', 'Podcast hallgatás', '🎙️'),
(76, 'Szórakozás & Hobbi', 'Kézműveskedés', '✂️'),
(77, 'Szórakozás & Hobbi', 'Kertészkedés', '🌱'),
(78, 'Szórakozás & Hobbi', 'Barkácsolás', '🔨'),
(79, 'Szórakozás & Hobbi', 'Kirándulás egy új városba', '🏙️'),
(80, 'Szórakozás & Hobbi', 'Videójáték', '🎮'),
(81, 'Szórakozás & Hobbi', 'Gasztronómiai élmények kipróbálása', '🍽️'),
(82, 'Szórakozás & Hobbi', 'Bor- vagy sörkóstolás', '🍷'),
(83, 'Kapcsolatok & Szociális élet', 'Családi időtöltés', '🏡'),
(84, 'Kapcsolatok & Szociális élet', 'Baráti találkozó', '🍻'),
(85, 'Kapcsolatok & Szociális élet', 'Telefonhívás', '📞'),
(86, 'Kapcsolatok & Szociális élet', 'Üzenetek küldése', '💬'),
(87, 'Kapcsolatok & Szociális élet', 'Önkénteskedés', '❤️'),
(88, 'Kapcsolatok & Szociális élet', 'Születésnapi köszöntés', '🎂'),
(89, 'Kapcsolatok & Szociális élet', 'Csapatmunka vagy kollaboráció', '🤝'),
(90, 'Kapcsolatok & Szociális élet', 'Új emberekkel való ismerkedés', '🗣️'),
(91, 'Kapcsolatok & Szociális élet', 'Együtt főzés', '👩‍🍳'),
(92, 'Kapcsolatok & Szociális élet', 'Közösségi eseményen való részvétel', '🎉'),
(93, 'Kapcsolatok & Szociális élet', 'Randi', '💖'),
(94, 'Kapcsolatok & Szociális élet', 'Jótékonyság', '🎁'),
(95, 'Hétköznapi Teendők', 'Bevásárlás', '🛒'),
(96, 'Hétköznapi Teendők', 'Takarítás', '🏠'),
(97, 'Hétköznapi Teendők', 'Mosás', '🧺'),
(98, 'Hétköznapi Teendők', 'Autóvezetés', '🚗'),
(99, 'Hétköznapi Teendők', 'Számlák befizetése', '💵'),
(100, 'Hétköznapi Teendők', 'Postára menés', '📦'),
(101, 'Hétköznapi Teendők', 'Főzés', '🍲'),
(102, 'Hétköznapi Teendők', 'Szemét kivitele', '🚮'),
(103, 'Hétköznapi Teendők', 'Növények locsolása', '🌿'),
(104, 'Hétköznapi Teendők', 'Ruhák selejtezése', '👕'),
(105, 'Hétköznapi Teendők', 'Számítógép vagy telefon rendszerezése', '🖥️'),
(106, 'Hétköznapi Teendők', 'Fiókok rendbetétele', '🗄️'),
(107, 'Hétköznapi Teendők', 'Sportfelszerelés karbantartása', '🎾'),
(108, 'Hétköznapi Teendők', 'Autómosás', '🚘'),
(109, 'Hétköznapi Teendők', 'Új ruhák vásárlása', '🛍️'),
(110, 'Hétköznapi Teendők', 'Heti költségvetés ellenőrzése', '💰'),
(111, 'Hétköznapi Teendők', 'Napi célok kitűzése', '🏆'),
(112, 'Hétköznapi Teendők', 'Naplóírás', '📔');

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
(1, 'Zsoltyx', 'FroHWi3lu1uGpWUS', '90d25ef9eb6e9237f6ca8126b34e1dd9d1fd6a21ed315f7bac0d4b9e7480194c', 'kovacszs@kkszki.hu', 0, 1, '2025-02-21 09:00:28', 0, 130, 'http://bemotivated3.nhely.hu/images/Zsoltyx.jpg'),
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
(33, 1, 85, '10:10', '10:20', '2025-02-24', 1),
(34, 2, 53, '07:15', '14:20', '2025-02-24', 1),
(35, 2, 53, '07:15', '15:15', '2025-02-25', 0),
(44, 1, 11, '10:01', '10:30', '2025-02-25', 1),
(45, 1, 43, '12:01', '12:02', '2025-02-25', 1),
(59, 1, 53, '07:15', '11:30', '2025-02-26', 1),
(60, 1, 1, '12:00', '13:30', '2025-02-26', 0),
(62, 1, 52, '10:01', '11:11', '2025-02-28', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `predefined_tasks`
--
ALTER TABLE `predefined_tasks`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `user_tasks`
--
ALTER TABLE `user_tasks`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `user_tasks`
--
ALTER TABLE `user_tasks`
  ADD CONSTRAINT `user_tasks_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_tasks_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `predefined_tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2018 at 08:33 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_slimsuper8`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `c_catname` varchar(200) NOT NULL,
  `c_active` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `c_catname`, `c_active`) VALUES
(2, 'Coffee', '1'),
(4, 'Baby', '1');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `phone`, `email`, `address`, `city`, `state`) VALUES
(2, 'Sam', 'Smith', '333-333-3333', 'ssmith@yahoo.com', '33 Birch Rd', 'Miami', 'FL'),
(3, 'Brad', 'Traversy', '333-333-3333', 'brad@test.com', '333 South st', 'Portland', 'ME'),
(4, 'John', 'Doe', '333-333-3333', 'brad@test.com', '333 South st', 'Portland', 'ME');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `sku` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `cat` varchar(200) NOT NULL,
  `state` varchar(200) NOT NULL,
  `statecolor` varchar(200) NOT NULL,
  `size` varchar(200) NOT NULL,
  `img` varchar(200) NOT NULL,
  `oldprice` varchar(200) NOT NULL,
  `price` varchar(200) NOT NULL,
  `desc` varchar(200) NOT NULL,
  `stock` varchar(200) NOT NULL,
  `cname` varchar(200) NOT NULL,
  `check` varchar(200) NOT NULL,
  `select` varchar(200) NOT NULL,
  `notes` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `smname` varchar(200) NOT NULL,
  `timestamp` varchar(200) NOT NULL,
  `ponumber` varchar(200) NOT NULL,
  `total` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `sku`, `name`, `cat`, `state`, `statecolor`, `size`, `img`, `oldprice`, `price`, `desc`, `stock`, `cname`, `check`, `select`, `notes`, `email`, `smname`, `timestamp`, `ponumber`, `total`) VALUES
(1, 'A0000001', 'Denim Shirt', 'Sports Wear', 'New', 'red', '', '12.jpg', '', '350.00', 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time', '10', '', '', '', '', '', '', '', '', ''),
(2, 'A0000002', 'Drypers Mega Pack', 'Baby', 'Sale', 'green', 'Large x 62 pcs', 'baby.jpg', '', '360.00', 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time', '10', '', '', '', '', '', '', '', '', ''),
(3, 'A0000003', 'Cookl Shirt', 'Out Wear', 'New', 'green', '', '14.jpg', '', '299.00', 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time', '4', '', '', '', '', '', '', '', '', ''),
(4, 'A0000004', 'Cookl Shirt', 'Out Wear', '', '', '3 pcs x 180 ml', 'coffee.jpg', '', '310.00', '137 Degrees Iced Coffee Latte with Almond Milk Drink', '20', '', '', '', '', '', '', '', '', ''),
(5, 'A0000005', 'Gingen Strong Ginger Formula Tea', 'Tea', '', '', '3 pcs x 180 ml', 'tea.jpg', '', '75.00', 'Hot drink with slightly sweet and strong taste from aged quality ginger\',', '100', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_name` varchar(300) NOT NULL,
  `u_id` varchar(300) NOT NULL,
  `u_password` varchar(300) NOT NULL,
  `u_phone` varchar(300) NOT NULL,
  `u_address` varchar(300) NOT NULL,
  `u_pincode` varchar(300) NOT NULL,
  `u_verified` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_name`, `u_id`, `u_password`, `u_phone`, `u_address`, `u_pincode`, `u_verified`) VALUES
('John', 'jraymund.niconi@gmail.com', '6f12c69a25eb247892b2d77d0b40f402', '1231234', 'address', '1234', 1),
('J', 'user@user.com', '81dc9bdb52d04dc20036dbd8313ed055', '1234567', 'Address', '1234', 1),
('213', 'wewe@fsfsds', '81dc9bdb52d04dc20036dbd8313ed055', '1234', '12334', '1234', 1),
('Ray', 'ray@mail.com', '81dc9bdb52d04dc20036dbd8313ed055', '1234', '1234', '1234', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

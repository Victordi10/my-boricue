-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-03-2025 a las 22:22:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `boricue`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chats`
--

CREATE TABLE `chats` (
  `id` int(50) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `idEmisor` int(11) NOT NULL,
  `idReceptor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `chats`
--

INSERT INTO `chats` (`id`, `mensaje`, `fecha`, `idEmisor`, `idReceptor`) VALUES
(1, 'hola 1', '2024-10-26 00:00:00', 1, 2),
(2, 'como estas', '2024-10-26 00:00:00', 2, 1),
(3, 'bien y tu?', '2024-10-26 00:00:00', 1, 2),
(4, 'me olvide', '2024-10-26 00:00:00', 1, 2),
(6, 'tranquilo', NULL, 2, 1),
(7, 'bueno', '2024-10-26 13:28:42', 1, 2),
(8, 'f', '2024-10-27 05:23:43', 1, 2),
(9, 'ttt', '2024-10-27 05:24:13', 1, 2),
(10, 'gg', '2024-10-27 05:28:49', 2, 1),
(11, 'como estas', '2024-10-27 05:31:38', 1, 2),
(12, 'bien y tu?', '2024-10-27 05:32:01', 2, 1),
(13, 'hola', '2024-10-27 05:42:37', 2, 1),
(14, 'ya llego?', '2024-10-27 05:43:36', 2, 1),
(15, 'ff', '2024-10-27 05:46:46', 2, 1),
(16, 'ff', '2024-10-27 05:46:48', 2, 1),
(17, 'fff', '2024-10-27 05:46:51', 2, 1),
(18, 'fff', '2024-10-27 05:46:55', 2, 1),
(19, '¡Hola! Estoy interesado en el producto upload testing [Trade]. Aquí está la imagen: /images/1721238814720.png', '2024-10-27 06:34:47', 3, 1),
(20, '¡Hola! Estoy interesado en el producto upload testing [Trade]. Aquí está la imagen: /images/1721238814720.png', '2024-10-27 06:35:13', 3, 1),
(21, '¡Hola! Estoy interesado en el producto platano. Aquí está la imagen: /images/1727544839516.jpeg', '2024-10-27 06:39:08', 3, 2),
(22, 'estor feliz', '2024-10-27 06:40:06', 3, 1),
(23, '¡Hola! Estoy interesado en el producto platano. Aquí está la imagen: /images/1727544839516.jpeg', '2024-10-27 06:42:36', 3, 2),
(24, '¡Hola! Estoy interesado en el producto platano. <img src=\"/images/1727544839516.jpeg\" alt=\"Image\">', '2024-10-27 06:43:20', 3, 2),
(25, '¡Hola! Estoy interesado en el producto platano. <img src=\"/images/1727544839516.jpeg\" alt=\"Image\">', '2024-10-27 06:52:03', 3, 2),
(26, 'jf', '2024-10-27 06:55:22', 3, 2),
(27, '¡Hola! Estoy interesado en el producto upload testing [Donation]. <img src=\"/images/1721239024850.png\" alt=\"Image\">', '2024-10-27 07:05:00', 3, 1),
(28, 'yy', '2024-10-27 07:13:07', 3, 2),
(29, 'hola', '2024-10-27 07:16:52', 3, 2),
(30, 'gg', '2024-10-27 07:17:19', 3, 2),
(31, 'aver', '2024-10-27 07:18:40', 3, 2),
(32, '¡Hola! Estoy interesado en el producto upload testing [Trade]. <img src=\"/images/1721238814720.png\" alt=\"Image\">', '2024-10-27 07:24:02', 3, 1),
(33, '¡Hola! Estoy interesado en el producto cubo. <img src=\"/images/1730025533841.png\" alt=\"Image\">', '2024-10-27 07:24:56', 2, 3),
(34, 'Homa', '2024-10-27 07:25:21', 3, 2),
(35, 'todavia esta disponible?', '2024-10-27 07:25:57', 2, 3),
(36, 'Si', '2024-10-27 07:26:11', 3, 2),
(37, 'Adiós ', '2024-10-27 07:44:08', 3, 2),
(38, 'bueno', '2024-10-27 07:50:41', 2, 3),
(39, 'Ok.', '2024-10-27 07:50:58', 3, 2),
(40, 'm', '2024-10-27 07:52:45', 1, 2),
(41, 'Se perdio', '2024-10-27 07:53:34', 3, 1),
(42, 'ya me llegan los mensajes', '2024-10-27 07:56:59', 1, 3),
(43, 'mari', '2024-10-27 07:58:17', 1, 3),
(44, '¡Hola! Estoy interesado en el producto upload testing [Donation]. <img src=\"/images/1721239024850.png\" alt=\"Image\">', '2024-10-28 08:39:50', 2, 1),
(45, 'hola dilan', '2024-10-28 08:43:01', 2, 1),
(46, '¡Hola! Estoy interesado en el producto upload testing [Trade]. <img src=\"/images/1721238814720.png\" alt=\"Image\">', '2024-11-05 14:03:12', 2, 1),
(47, 'juiliana', '2024-11-05 14:03:25', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodopago`
--

CREATE TABLE `metodopago` (
  `idMetodopago` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `ntarjeta` varchar(15) NOT NULL,
  `codigoQR` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso`
--

CREATE TABLE `proceso` (
  `idProceso` int(11) NOT NULL,
  `idRegProducto` int(11) NOT NULL,
  `idFactura` int(11) NOT NULL,
  `idMetodopago` int(11) NOT NULL,
  `accion` varchar(15) NOT NULL,
  `valoru` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Disparadores `proceso`
--
DELIMITER $$
CREATE TRIGGER `inventario` AFTER INSERT ON `proceso` FOR EACH ROW BEGIN
    DECLARE cant_actual INT;
    SELECT cantFin INTO cant_actual FROM regproducto WHERE idRegProducto = NEW.idRegProducto;

    IF cant_actual - NEW.cantidad < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: La cantidad final del producto sería menor a cero.';
    ELSE
        UPDATE regproducto 
        SET cantFin = cantFin - NEW.cantidad,
            estado = CASE WHEN cantFin - NEW.cantidad = 0 THEN 'Finalizado' ELSE estado END
        WHERE idRegProducto = NEW.idRegProducto;

        IF (cant_actual - NEW.cantidad = 0) THEN
            UPDATE regproducto 
            SET estado = 'Finalizado' WHERE idRegProducto = NEW.idRegProducto;
        END IF;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `precio` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `imagen`, `nombre`, `categoria`, `tipo`, `precio`, `descripcion`, `usuario_id`) VALUES
(1, '1721238644473.png', 'upload testing [Sell]', 'Venta', 'Cuero', '$10000', 'upload test #1', 1),
(2, '1721238814720.png', 'upload testing [Trade]', 'Intercambio', 'Papel', 'CAMBIO', 'upload test #2', 1),
(3, '1721239024850.png', 'upload testing [Donation]', 'Donacion', 'Cuero', 'GRATIS', 'upload test #3 ', 1),
(4, '1727544839516.jpeg', 'platano', 'Venta', 'Otro', '$7000', 'es un platano muy bueno', 2),
(5, '1730025533841.png', 'cubo', 'Donacion', 'Otro', 'GRATIS', 'al cuadrado', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regproducto`
--

CREATE TABLE `regproducto` (
  `idRegProducto` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantIni` int(11) NOT NULL,
  `cantFin` int(11) NOT NULL,
  `longitud` int(11) NOT NULL,
  `fecha` varchar(10) NOT NULL,
  `categoria` varchar(15) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `identificacion` varchar(10) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `rol` varchar(15) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `identificacion`, `nombres`, `direccion`, `telefono`, `correo`, `contrasena`, `rol`, `estado`) VALUES
(1, '1', 'testing', '1', '1', 'tester@test.com', '$2a$08$qyuof6kymqqR3YrmWXsP9uN4woQ0hscHvRmSGABajsNG9PIntDXFC', 'Usuario', 'Activo'),
(2, '10001917', 'victor', 'b', '3103015179', 'cordo@test.com', '$2a$08$.nfHQFvcxw.jaPEjv6SZBeoG7atBnp/DzMzDlGWjwTguPAdtc6AQa', 'Usuario', 'Activo'),
(3, '42342', 'prueba3', 'dvf', '232323', 'corre3@gmail.com', '$2a$08$N7IvGbv5Ozgif0gb054gdusw4hqHXM7jxIhVMO5/ewffY4tsdjLOe', 'Usuario', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  ADD PRIMARY KEY (`idMetodopago`);

--
-- Indices de la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD PRIMARY KEY (`idProceso`),
  ADD KEY `idFactura` (`idFactura`),
  ADD KEY `idRegProducto` (`idRegProducto`),
  ADD KEY `idMetodopago` (`idMetodopago`) USING BTREE;

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `regproducto`
--
ALTER TABLE `regproducto`
  ADD PRIMARY KEY (`idRegProducto`),
  ADD KEY `idProducto` (`idProducto`) USING BTREE;

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `identificacion` (`identificacion`),
  ADD UNIQUE KEY `telefono` (`telefono`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `metodopago`
--
ALTER TABLE `metodopago`
  MODIFY `idMetodopago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proceso`
--
ALTER TABLE `proceso`
  MODIFY `idProceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `regproducto`
--
ALTER TABLE `regproducto`
  MODIFY `idRegProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD CONSTRAINT `proceso_ibfk_1` FOREIGN KEY (`idFactura`) REFERENCES `factura` (`idFactura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proceso_ibfk_2` FOREIGN KEY (`idRegProducto`) REFERENCES `regproducto` (`idRegProducto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `proceso_ibfk_3` FOREIGN KEY (`idMetodopago`) REFERENCES `metodopago` (`idMetodopago`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `regproducto`
--
ALTER TABLE `regproducto`
  ADD CONSTRAINT `regproducto_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

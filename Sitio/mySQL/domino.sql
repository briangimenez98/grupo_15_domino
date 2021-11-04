CREATE DATABASE  IF NOT EXISTS `domino1_db` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `domino1_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: domino1_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuarioId` int unsigned NOT NULL,
  `productoId` int unsigned NOT NULL,
  `items` int NOT NULL,
  `precio` float unsigned NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Carritos_Usuarios_idx` (`usuarioId`),
  KEY `fk_Carritos_Productos_idx` (`productoId`),
  CONSTRAINT `fk_Carritos_Productos` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`),
  CONSTRAINT `fk_Carritos_Usuarios` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Remeras'),(2,'Camperas'),(3,'Pantalones'),(4,'Camisetas'),(5,'Zapatillas'),(6,'Shorts'),(7,'Gorras'),(8,'Bolsos'),(9,'Riñoneras'),(10,'Mochilas'),(11,'Conjuntos'),(12,'Sweaters'),(13,'Buzos');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colores`
--

DROP TABLE IF EXISTS `colores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colores`
--

LOCK TABLES `colores` WRITE;
/*!40000 ALTER TABLE `colores` DISABLE KEYS */;
INSERT INTO `colores` VALUES (1,'Blanco'),(2,'Negro'),(3,'Gris'),(4,'Azul'),(5,'Verde'),(6,'Verde Oliva'),(7,'Violeta'),(8,'Bordo'),(9,'Naranja'),(10,'Mostaza'),(11,'Rosa'),(12,'Azul Agua'),(13,'Marron'),(14,'Salmon'),(15,'Verde Militar'),(16,'Rojo');
/*!40000 ALTER TABLE `colores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colores_producto`
--

DROP TABLE IF EXISTS `colores_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colores_producto` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `productoId` int unsigned NOT NULL,
  `colorId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Colores_Producto2_idx` (`colorId`),
  KEY `fk_Talles_Producto2_idx` (`productoId`),
  KEY `fk_Colores_Producto2_idx1` (`productoId`),
  CONSTRAINT `fk_Colores_Producto1` FOREIGN KEY (`colorId`) REFERENCES `colores` (`id`),
  CONSTRAINT `fk_Colores_Producto2` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colores_producto`
--

LOCK TABLES `colores_producto` WRITE;
/*!40000 ALTER TABLE `colores_producto` DISABLE KEYS */;
INSERT INTO `colores_producto` VALUES (1,1,2),(2,1,3),(3,1,14),(4,2,2),(5,2,3),(6,2,1),(7,3,1),(8,3,2),(9,3,9),(10,4,2),(11,4,3),(12,4,4),(13,5,1),(14,5,2),(15,5,3),(16,6,2),(17,6,1),(18,6,7),(19,7,2),(20,7,1),(21,7,5),(22,8,2),(23,8,3),(24,8,4),(25,9,1),(26,9,2),(27,9,8),(28,10,1),(29,10,2),(30,10,5),(31,11,2),(32,11,1),(33,11,7),(34,12,1),(35,12,3),(36,12,2),(37,13,2),(38,13,1),(39,13,7),(40,14,2),(41,14,4),(42,14,3),(43,15,2),(44,15,4),(45,15,3),(46,16,2),(47,16,3),(48,16,4),(49,17,2),(50,17,11),(51,17,3),(52,18,13),(53,18,12),(54,18,10),(55,19,6),(56,19,3),(57,19,15),(58,20,2),(59,20,3),(60,20,7),(61,21,2),(62,21,1),(63,21,3),(64,22,11),(65,22,3),(66,22,10),(67,23,1),(68,23,3),(69,23,2),(70,24,8),(71,24,3),(72,24,2),(73,25,1),(74,25,2),(75,25,16),(76,26,2),(77,26,1),(78,26,3),(79,27,6),(80,27,1),(81,27,11);
/*!40000 ALTER TABLE `colores_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `genero` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Hombre'),(2,'Mujer'),(3,'Unisex');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `productoId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Images_Products1_idx` (`productoId`),
  CONSTRAINT `fk_Imagenes_Productos` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=221 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'remera-switch-1.jpg',1),(2,'remera-switch-2.jpg',1),(3,'remera-switch-3.jpg',1),(4,'remera-switch-4.jpg',1),(5,'campera-row-1.jpg',2),(6,'campera-row-2.jpg',2),(7,'campera-row-3.jpg',2),(8,'campera-row-4.jpg',2),(9,'camiseta-size-1.jpg',3),(10,'camiseta-size-2.jpg',3),(11,'camiseta-size-3.jpg',3),(12,'camiseta-size-4.jpg',3),(13,'mochila-adidas-1.png',4),(14,'mochila-adidas-2.jpg',4),(15,'mochila-adidas-3.jpg',4),(16,'mochila-adidas-4.jpg',4),(17,'zapa-air-zoom-1.png',5),(18,'zapa-air-zoom-2.png',5),(19,'zapa-air-zoom-3.png',5),(20,'zapa-air-zoom-4.png',5),(21,'bolso-res-1.png',6),(22,'bolso-res-2.png',6),(23,'bolso-res-3.png',6),(24,'bolso-res-4.png',6),(25,'riñonera-piet3-1.png',7),(26,'riñonera-piet3-2.png',7),(27,'riñonera-piet3-3.png',7),(28,'riñonera-piet3-4.png',7),(29,'bolso-active-1.png',8),(30,'bolso-active-2.png',8),(31,'bolso-active-3.png',8),(32,'bolso-active-4.png',8),(33,'zapa-cliff-1.png',9),(34,'zapa-cliff-2.png',9),(35,'zapa-cliff-3.png',9),(36,'zapa-cliff-4.png',9),(37,'mochila-one-1.png',10),(38,'mochila-one-2.png',10),(39,'mochila-one-3.png',10),(40,'mochila-one-4.png',10),(41,'gorra-piet-1.png',11),(42,'gorra-piet-2.png',11),(43,'gorra-piet-3.png',11),(44,'gorra-piet-4.png',11),(45,'zapa-runfalcon-1.png',12),(46,'zapa-runfalcon-2.png',12),(47,'zapa-runfalcon-3.png',12),(48,'zapa-runfalcon-4.png',12),(49,'riñonera-piet2-1.png',13),(50,'riñonera-piet2-2.png',13),(51,'riñonera-piet2-3.png',13),(52,'riñonera-piet2-4.png',13),(53,'gorra-piet2-1.png',14),(54,'gorra-piet2-2.png',14),(55,'gorra-piet2-3.png',14),(56,'gorra-piet2-4.png',14),(57,'riñonera-piet-1.png',15),(58,'riñonera-piet-2.png',15),(59,'riñonera-piet-3.png',15),(60,'riñonera-piet-4.png',15),(61,'campera-michigan-1.jpg',16),(62,'campera-michigan-2.jpg',16),(63,'campera-michigan-3.jpg',16),(64,'campera-michigan-4.jpg',16),(65,'palazzo-frizado-1.jpg',17),(66,'palazzo-frizado-2.jpg',17),(67,'palazzo-frizado-3.jpg',17),(68,'palazzo-frizado-4.jpg',17),(69,'pantalon-tamesis-1.jpg',18),(70,'pantalon-tamesis-2.jpg',18),(71,'pantalon-tamesis-3.jpg',18),(72,'pantalon-tamesis-4.jpg',18),(73,'conjunto-slouchy-1.jpg',19),(74,'conjunto-slouchy-2.jpg',19),(75,'conjunto-slouchy-3.jpg',19),(76,'conjunto-slouchy-4.jpg',19),(77,'conjunto-function-1.jpg',20),(78,'conjunto-function-2.jpg',20),(79,'conjunto-function-3.jpg',20),(80,'conjunto-function-4.jpg',20),(81,'campera-tisza-1.jpg',21),(82,'campera-tisza-2.jpg',21),(83,'campera-tisza-3.jpg',21),(84,'campera-tisza-4.jpg',21),(85,'conjunto-else-1.jpg',22),(86,'conjunto-else-2.jpg',22),(87,'conjunto-else-3.jpg',22),(88,'conjunto-else-4.jpg',22),(89,'remera-saona-1.jpg',23),(90,'remera-saona-2.jpg',23),(91,'remera-saona-3.jpg',23),(92,'remera-saona-4.jpg',23),(93,'sweater-holme-1.jpg',24),(94,'sweater-holme-2.jpg',24),(95,'sweater-holme-3.jpg',24),(96,'sweater-holme-4.jpg',24),(97,'pantalon-let-1.jpg',25),(98,'pantalon-let-2.jpg',25),(99,'pantalon-let-3.jpg',25),(100,'pantalon-let-4.jpg',25),(101,'remera-arrow-1.jpg',26),(102,'remera-arrow-2.jpg',26),(103,'remera-arrow-3.jpg',26),(104,'remera-arrow-4.jpg',26),(105,'camiseta-angora-1.jpeg',27),(106,'camiseta-angora-2.jpeg',27),(107,'camiseta-angora-3.jpeg',27),(108,'camiseta-angora-4.jpeg',27);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` float unsigned NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `marca` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `descuento` int unsigned NOT NULL,
  `idCategoria` int unsigned NOT NULL,
  `idGeneros` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Productos_Categorias_idx` (`idCategoria`),
  KEY `fk_Productos_Generos_idx` (`idGeneros`),
  CONSTRAINT `fk_Productos_Categorias` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`),
  CONSTRAINT `fk_Productos_Generos` FOREIGN KEY (`idGeneros`) REFERENCES `generos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Remera Switch',2000,'Esto es una Desc','1','0000-00-00 00:00:00','2021-11-01 23:03:28',0,1,2),(2,'Campera Row',9600,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,2,1),(3,'Camiseta Size',1800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,4,1),(4,'Mochila Power',5500,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,10,3),(5,'Zapatillas Zoom',14900,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,5,1),(6,'Bolso Res',4200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,8,2),(7,'Riñonera Unix',5200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,9,3),(8,'Bolso Active',6500,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,8,2),(9,'Zapatillas Cliff',12800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,5,2),(10,'Mochila One',6900,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,10,3),(11,'Gorra Piet II',4800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,7,3),(12,'Zapatillas Run',7500,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,5,2),(13,'Riñonera Class',4900,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,9,2),(14,'Gorra Piet',4800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,7,3),(15,'Riñonera Mou',10200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,9,3),(16,'Campera Michigan',7200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,2,1),(17,'Palazzo Frizado',4800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,3,1),(18,'Pantalón Tamesis',5200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,3,2),(19,'Conjunto Slouchy',9200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,11,2),(20,'Conjunto Function',8400,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,11,1),(21,'Campera Tisza',4800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,2,2),(22,'Conjunto Else',7600,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,11,1),(23,'Remera Saona',1800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,1,2),(24,'Sweater Holme',5200,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,12,2),(25,'Pantalón Let',5800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,3,2),(26,'Remera Arrow',1800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,1,1),(27,'Camiseta Angora',2800,'lorem ipsum dolor amet sit','1','0000-00-00 00:00:00','0000-00-00 00:00:00',0,4,2);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talles`
--

DROP TABLE IF EXISTS `talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `talle` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talles`
--

LOCK TABLES `talles` WRITE;
/*!40000 ALTER TABLE `talles` DISABLE KEYS */;
INSERT INTO `talles` VALUES (1,'XS'),(2,'S'),(3,'M'),(4,'L'),(5,'XL'),(6,'XXL'),(7,'1'),(8,'2'),(9,'3'),(10,'4'),(11,'36'),(12,'37'),(13,'38'),(14,'39'),(15,'40'),(16,'41'),(17,'42'),(18,'44'),(19,'46'),(20,'48'),(21,'Unico');
/*!40000 ALTER TABLE `talles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talles_producto`
--

DROP TABLE IF EXISTS `talles_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talles_producto` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `productoId` int unsigned NOT NULL,
  `talleId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Talles_Producto1_idx` (`talleId`),
  KEY `fk_Talles_Producto1_idx1` (`productoId`),
  CONSTRAINT `fk_Talles_Producto1` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`),
  CONSTRAINT `fk_Talles_Producto2` FOREIGN KEY (`talleId`) REFERENCES `talles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talles_producto`
--

LOCK TABLES `talles_producto` WRITE;
/*!40000 ALTER TABLE `talles_producto` DISABLE KEYS */;
INSERT INTO `talles_producto` VALUES (1,1,2),(2,1,2),(3,1,2),(4,1,2),(5,2,7),(6,2,8),(7,2,9),(8,2,10),(9,3,7),(10,3,8),(11,3,9),(12,3,10),(13,4,21),(14,5,13),(15,5,14),(16,5,15),(17,5,16),(18,5,17),(19,6,21),(20,7,21),(21,8,21),(22,9,11),(23,9,12),(24,9,13),(25,9,14),(26,9,15),(27,10,21),(28,11,21),(29,12,13),(30,12,14),(31,12,15),(32,12,16),(33,12,17),(34,13,21),(35,14,21),(36,15,21),(37,16,2),(38,16,3),(39,16,4),(40,16,5),(41,17,7),(42,17,8),(43,17,9),(44,17,10),(45,18,17),(46,18,18),(47,18,19),(48,18,20),(49,19,7),(50,19,8),(51,19,9),(52,20,7),(53,20,8),(54,20,9),(55,20,10),(56,21,2),(57,21,3),(58,21,4),(59,21,5),(60,22,7),(61,22,8),(62,22,9),(63,22,10),(64,23,2),(65,23,3),(66,23,4),(67,23,5),(68,24,2),(69,24,3),(70,24,4),(71,24,5),(72,25,7),(73,25,8),(74,25,9),(75,25,10),(76,26,2),(77,26,3),(78,26,4),(79,26,5),(80,27,1),(81,27,2),(82,27,3);
/*!40000 ALTER TABLE `talles_producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `birthday` date NOT NULL,
  `avatar` varchar(200) NOT NULL,
  `rol` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Sol','Tete','sol@gmail.com','$2a$10$xqfGthkqeZLkt6aKMpdtgexem.ZyHix8g5wRHd5Ay9tMT4qiYdq32','1995-07-03','default-profile-image.jpg','admin','0000-00-00 00:00:00','0000-00-00 00:00:00'),(2,'Usuario','Comun','pepe@gmail.com','$2a$10$A/i5m/55LRF7K0Er.UzjCOVoD.XnqKyBUrRZa0sz5Cshvu/9u/aWC','2021-08-04','default-profile-image.jpg','usuario','0000-00-00 00:00:00','0000-00-00 00:00:00'),(3,'Usuario','Administrador','martin@gmail.com','$2a$10$DPVnY5mggu1IwC.YneiyCu2kHUi10xkQiqueOmvrRHGYzkaJizUb2','2021-08-05','1635571443032.webp','admin','0000-00-00 00:00:00','2021-11-01 18:18:17'),(4,'John','Coltrane','john.coltrane@gmail.com','$2a$10$9ZkMChLIEEZqyWA6nZtEkOVcMSTO3RkSoVaHNwjrEKvypX2rWv7HO','2021-10-06','default-profile-image.jpg','User','2021-10-06 22:25:22','2021-10-06 22:25:22'),(5,'Ergiben','Mirza','ergibenmirza@gmail.com','$2a$10$PSLiJxkzIbI.vQY4wPiWdes5vU7CtQ4F4dkIkGmr1YBEXkOlPSI9y','2021-10-04','1635962295234.png','User','2021-10-13 01:54:37','2021-11-03 17:58:15'),(6,'Brian','Gimenez','email@gmail.com','$2a$10$TT7SPm9B5r8Nv.3ZfNLFjOK9YLoUuFgS1r2c87GO8PJrk4RXDw3Im','2021-10-13','default-profile-image.jpg','User','2021-10-13 13:54:28','2021-10-13 13:54:28'),(7,'Jonathan','Doe','john@gmail.com','$2a$10$Zx5qF4KcHWOdB/Uf3b/6Pe7zoKx9Yb4L5VjxyZGpJVVjt1NkpW9fi','2021-10-13','default-profile-image.jpg','User','2021-10-13 18:50:06','2021-10-28 18:45:05');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-04  1:08:49

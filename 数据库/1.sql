-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: my_db_02
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `food_sort`
--

DROP TABLE IF EXISTS `food_sort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `food_sort` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `shop_id` int NOT NULL,
  `is_delete` int NOT NULL DEFAULT '0' COMMENT '0代表存在\n1代表删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idfood_sort_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_sort`
--

LOCK TABLES `food_sort` WRITE;
/*!40000 ALTER TABLE `food_sort` DISABLE KEYS */;
INSERT INTO `food_sort` VALUES (1,'韩式炸鸡',1,0),(2,'套餐系列',1,0),(3,'饮料系列',1,0),(4,'加料区',1,0),(5,'汤圆',2,0),(6,'柠檬系列',2,0),(7,'水果',2,0),(8,'芋圆系列',2,0),(9,'水果冰粉',2,0),(10,'邓老凉茶',2,0),(11,'调味料',8,0),(12,'自选：主食',8,0),(13,'自选：副食',8,0),(14,'自选：小食',8,0),(15,'自选：饮品',8,0),(16,'F+',10,0),(17,'招牌',10,0),(18,'硬菜',10,0),(19,'双拼',10,0),(20,'加料区',10,0),(21,'水果',11,0),(22,'切好',11,0),(23,'糕点',12,0),(24,'肉包',12,0),(25,'素包',12,0);
/*!40000 ALTER TABLE `food_sort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` varchar(45) NOT NULL COMMENT '订单号',
  `order_type` varchar(45) NOT NULL COMMENT '0堂食\n1自提\n2外卖',
  `food_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT '0' COMMENT '0订单未完成\\n1订单已完成',
  `admin_phone` varchar(255) DEFAULT NULL,
  `admin_address` varchar(255) DEFAULT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `admin_id` int NOT NULL,
  `shop_id` int NOT NULL,
  `food_num` varchar(255) DEFAULT NULL,
  `food_Price` varchar(255) DEFAULT NULL,
  `is_pingLun` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idnew_table_UNIQUE` (`id`),
  UNIQUE KEY `created_UNIQUE` (`created`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (10,'2021-12-22 12:56:53.970','0','5','3','1234567775','34栋301','加料',5,1,'2','13',0),(11,'2021-12-22 13:02:38.630','2','58','3','1234455666','29东019','加料',5,8,'1','18',0),(23,'2021-12-25 16:52:35.290','2','5','1','2144555555','小刘，二十栋309','加料',5,1,'1','13',1),(25,'2021-12-27 23:11:42.758','0','94','0','13212144441','27栋301 小城','挑点好的',5,11,'3','22.5',0);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `adress` varchar(45) DEFAULT NULL,
  `shop_pic` text,
  `fenLei` varchar(45) DEFAULT NULL,
  `qiS` int NOT NULL DEFAULT '1',
  `PeiS` int NOT NULL DEFAULT '1',
  `gongGao` varchar(225) NOT NULL DEFAULT '没有填写',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idshop_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'admin','000000','城市行动汉堡店','134508251550','二饭二','S1','0',4,3,'欢迎新老顾客选购，我们将一如既往的为顾客服务！'),(2,'admin123','000000','维C奶茶和邓老凉茶','133022271015','一饭五','S2','1',2,2,'实训楼，教学楼，行政楼3份起送'),(8,'admin4','000000','Q堡堡','185663481980','一饭四','S3','0',1,3,'没有填写'),(10,'admin3','999999','F+牛肉饭','134585858767','二饭二','S4','3',1,1,'没有填写'),(11,'admin5','000000','人见人爱水果铺','112313441444','一饭三','S5','2',1,2,'大家多d来帮衬!'),(12,'admin6','000000','小小面包铺','123344543667','一饭二','S6','4',1,2,'早上就卖完');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_food`
--

DROP TABLE IF EXISTS `shop_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `shop_food` (
  `id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(45) NOT NULL,
  `food_price` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT '0' COMMENT '1表示销售\\n0表示售罄',
  `food_pic` text,
  `shop_id` varchar(255) NOT NULL,
  `food_sort` varchar(255) NOT NULL,
  `is_delete` varchar(45) NOT NULL DEFAULT '0' COMMENT '1代表存在\\n0代表删除',
  `score` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_food`
--

LOCK TABLES `shop_food` WRITE;
/*!40000 ALTER TABLE `shop_food` DISABLE KEYS */;
INSERT INTO `shop_food` VALUES (1,'韩式炸鸡套餐A','23.8','0','F1','1','韩式炸鸡','0',4),(2,'韩式炸鸡套餐B','22.8','0','F2','1','韩式炸鸡','0',1),(3,'韩式炸鸡套餐C','23.8','0','F3','1','韩式炸鸡','0',33),(4,'韩式炸鸡套餐D','23.8','0','F4','1','韩式炸鸡','0',2),(5,'半只脆皮鸡+北京卷','15.8','0','F5','1','套餐系列','0',20),(6,'两个老北京卷+小可乐','16.0','0','F6','1','套餐系列','0',16),(7,'香辣鸡腿堡+骨肉相连','19.8','0','F7','1','套餐系列','0',2),(8,'香辣鸡腿堡+老北京卷','19.8','0','F8','1','套餐系列','0',4),(9,'蜜汁全鸡+小可','25.0','0','F9','1','套餐系列','0',55),(10,'椰果奶茶','7.9','0','F10','1','饮料系列','0',2),(11,'珍珠奶茶','8.5','0','F11','1','饮料系列','0',3),(12,'四季春茶','9.0','0','F12','1','饮料系列','0',4),(13,'烧仙草','9.0','0','F13','1','饮料系列','0',2),(14,'飘香奶绿','10.0','0','F14','1','饮料系列','0',5),(15,'奶香芝士酱','0.3','0','F15','1','加料区','0',2),(16,'甜辣酱','0.4','0','F16','1','加料区','0',3),(17,'番茄酱','2.9','0','F17','1','加料区','0',1),(18,'孜然粉','3.0','0','F18','1','加料区','0',0),(19,'蜂蜜芥末酱','2.0','0','F19','1','加料区','0',2),(20,'牛奶花生芝麻汤圆','12.5','0','A1','2','汤圆','0',1),(21,'花生汤圆椰汁仙草','12.5','0','A2','2','汤圆','0',0),(22,'暴打柠檬茶','8.8','0','A3','2','柠檬系列','0',20),(23,'泰绿柠檬茶','7.9','0','A4','2','柠檬系列','0',30),(24,'金桔柠檬茶','8.8','0','A5','2','水果','0',5),(25,'哈密瓜汁','11','0','A6','2','水果','0',4),(26,'西瓜汁','10','0','A7','2','水果','0',54),(45,'芋圆椰奶砖','13.2','0','A8','2','芋圆系列','0',0),(46,'芋圆双皮奶','13.2','0','A9','2','芋圆系列','0',22),(47,'芋圆椰汁西米','13.2','0','A10','2','芋圆系列','0',40),(48,'酸奶水果捞','10.8','0','A11','2','水果冰粉','0',33),(49,'菊花冻','10.2','0','A13','2','水果冰粉','0',3),(50,'椰汁水果冰粉','12.0','0','A12','2','水果冰粉','0',213),(51,'罗汉果茶','8.0','0','A14','2','邓老凉茶','0',11),(52,'滋阴降火茶','10.0','0','A14','2','邓老凉茶','0',1),(53,'止咳化痰茶','7.0','0','A14','2','邓老凉茶','0',22),(54,'孜然粉','0.3','0','B1','8','调味料','0',33),(56,'番茄酱','0.3','0','B2','8','调味料','0',33),(57,'香辣鸡腿堡','12.0','0','B3','8','自选：主食','0',102),(58,'双层鸡腿堡','19.0','0','B4','8','自选：主食','0',2),(59,'墨西哥鸡肉卷','12.2','0','B5','8','自选：主食','0',108),(60,'老北京鸡肉卷','12.0','0','B6','8','自选：主食','0',1),(61,'奥尔良烤翅','10.5','0','B7','8','自选：副食','0',1),(62,'香辣鸡翅','10.0','0','B8','8','自选：副食','0',4),(63,'手枪腿','12.0','0','B9','8','自选：副食','0',0),(64,'脆香薯条','8.0','0','B10','8','自选：小食','0',99),(65,'上校鸡块','7.0','0','B11','8','自选：小食','0',33),(66,'地瓜丸（5）','6.0','0','B12','8','自选：小食','0',8),(67,'可乐','3.0','0','B13','8','自选：饮品','0',12),(68,'七喜','3.0','0','B14','8','自选：饮品','0',0),(69,'橙汁','3.0','0','B15','8','自选：饮品','0',33),(70,'F+牛肉饭','18.0','0','C1','10','F+','0',32),(71,'咖喱鸡饭','19.0','0','C2','10','F+','0',45),(72,'湖南小炒肉饭','14.0','0','C3','10','F+','0',0),(73,'土家酱香鸡饭','15.0','0','C4','10','F+','0',33),(74,'肉末茄子饭','13.0','0','C5','10','招牌','0',0),(75,'鱼香肉丝饭','15.0','0','C6','10','招牌','0',353),(76,'可乐鸡饭','12.3','0','C7','10','招牌','0',244),(77,'手撕鸡饭','12.3','0','C8','10','硬菜','0',0),(78,'土豆酱肉饭','18.8','0','C9','10','硬菜','0',55),(79,'宫保鸡丁饭','18.8','0','C10','10','硬菜','0',0),(80,'巴西烤肉饭','13.5','0','C11','10','硬菜','0',11),(81,'牛肉拼茄子','13.8','0','C12','10','双拼','0',22),(82,'牛肉拼黑椒鸡扒','12.8','0','C13','10','双拼','0',333),(83,'白米饭','2.4','0','C14','10','双拼','0',23),(84,'黑椒鸡扒','6.0','0','C15','10','加料区','0',2),(85,'肉末茄子','6.0','0','C16','10','加料区','0',0),(86,'加料区','10.8','0','C17','10','加料区','1',44),(94,'皇帝柑（斤）','6.5','0','D1','11','水果','0',114),(95,'沃柑（斤）','7.8','0','D2','11','水果','0',22),(96,'苹果（斤）','10.2','0','D3','11','水果','0',55),(97,'石榴（斤）','4.4','0','D4','11','水果','0',23),(98,'苹果（盒）','8.0','0','D5','11','切好','0',24),(99,'草莓（盒）','19.0','0','D6','11','切好','0',55),(100,'芒果（盒）','12.0','0','D7','11','切好','0',22),(101,'葡萄（盒）','12.0','0','D8','11','切好','0',2),(102,'牛肉丸','5.0','0','E1','12','糕点','0',44),(103,'猪肉丸','4.0','0','E2','12','糕点','0',66),(104,'玉米饺子','1.0','0','E3','12','糕点','0',56),(105,'韭菜饺子','0.5','0','E4','12','糕点','0',12),(106,'猪肉馅包','2.0','0','E5','12','肉包','0',4),(107,'牛肉馅包','2.5','0','E6','12','肉包','0',3),(108,'馒头','1.0','0','E7','12','素包','0',55),(109,'豆沙包','1.5','0','E8','12','素包','0',44),(110,'流沙包','2.0','0','E9','12','素包','0',23),(111,'红豆包','2.0','0','E10','12','素包','0',11);
/*!40000 ALTER TABLE `shop_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop_score`
--

DROP TABLE IF EXISTS `shop_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `shop_score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` varchar(45) NOT NULL DEFAULT '5' COMMENT '总分',
  `food` varchar(45) NOT NULL DEFAULT '5' COMMENT '口味分',
  `deliver` varchar(45) NOT NULL DEFAULT '5' COMMENT '配送分',
  `shop_id` varchar(45) NOT NULL,
  `admin_id` varchar(45) NOT NULL,
  `miaoSu` varchar(255) DEFAULT NULL,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idshop_score_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop_score`
--

LOCK TABLES `shop_score` WRITE;
/*!40000 ALTER TABLE `shop_score` DISABLE KEYS */;
INSERT INTO `shop_score` VALUES (1,'5','5','5','1','1','好好味','2021-12-26 14:44:13.461'),(2,'5','1','5','1','6','可以可以','2021-12-26 14:44:13.461'),(3,'4','7','7','1','5','大家多来光顾','2021-12-26 14:44:13.461'),(4,'3','4','5','1','5','速来速来，下次还来','2021-12-26 14:44:13.461'),(5,'6','7','8','2','5','啦啦啦啦啦，好好吃','2021-12-26 14:44:13.461'),(6,'8','7','8','2','5','还行','2021-12-26 14:44:13.461'),(7,'3','4','8','2','5','老板大气！','2021-12-26 14:44:13.461'),(8,'10','10','10','8','5','好好味','2021-12-26 14:44:13.461'),(9,'6','8','5','8','5','下次还来','2021-12-26 14:44:13.461'),(10,'3','3','5','8','6','一定到','2021-12-26 14:44:13.461'),(11,'6','2','5','10','1','好吃','2021-12-26 14:44:13.461'),(12,'2','5','7','10','6','一般','2021-12-26 14:44:13.461'),(13,'4','4','6','11','5','啊啊啊啊啊啊啊啊啊啊啊啊，太好吃啦','2021-12-26 14:44:13.461'),(14,'9','6','8','11','5','会再来的','2021-12-26 14:44:13.461'),(15,'7','7','9','12','1','好吃噢','2021-12-26 14:44:13.461'),(16,'8','8','6','12','1','好吃阿','2021-12-26 14:44:13.461');
/*!40000 ALTER TABLE `shop_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_pic` text,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iduser_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','000000','Iwryyy','2',NULL,'26dong'),(2,'admin01','000000','aaa',NULL,NULL,NULL),(3,'admin02','0000000','ssss',NULL,NULL,NULL),(5,'admin000','000000','小刘','000-000-00000',NULL,'27栋301'),(6,'admin0001','000000','sad',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'my_db_02'
--

--
-- Dumping routines for database 'my_db_02'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-27 23:13:54

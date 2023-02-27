/*
 Navicat Premium Data Transfer

 Source Server         : dengwenj
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : oldpersonhome

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 26/02/2023 22:38:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accident
-- ----------------------------
DROP TABLE IF EXISTS `accident`;
CREATE TABLE `accident` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accident` varchar(255) DEFAULT NULL COMMENT '事故',
  `accidentTime` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `loss` decimal(10,2) DEFAULT NULL COMMENT '损失',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of accident
-- ----------------------------
BEGIN;
INSERT INTO `accident` (`id`, `accident`, `accidentTime`, `reason`, `loss`) VALUES (3, '火灾', '2022-08-10', '夏天太热引发火灾 42°c', 50000.00);
COMMIT;

-- ----------------------------
-- Table structure for bedroom
-- ----------------------------
DROP TABLE IF EXISTS `bedroom`;
CREATE TABLE `bedroom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bedroomNum` varchar(255) DEFAULT NULL,
  `disPersonNum` int DEFAULT NULL COMMENT '分配人数',
  `isFull` int DEFAULT NULL COMMENT '是否已满。0、未满，1、已满。3人已满',
  `lived` int DEFAULT NULL COMMENT '已住多少人',
  `price` decimal(10,2) DEFAULT NULL COMMENT '寝室价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of bedroom
-- ----------------------------
BEGIN;
INSERT INTO `bedroom` (`id`, `bedroomNum`, `disPersonNum`, `isFull`, `lived`, `price`) VALUES (1, 'A13-552', 6, 0, 1, 1700.00);
INSERT INTO `bedroom` (`id`, `bedroomNum`, `disPersonNum`, `isFull`, `lived`, `price`) VALUES (3, 'A13-528', 6, 0, 1, 1700.00);
INSERT INTO `bedroom` (`id`, `bedroomNum`, `disPersonNum`, `isFull`, `lived`, `price`) VALUES (5, 'B12-513', 6, 0, 0, 1400.00);
INSERT INTO `bedroom` (`id`, `bedroomNum`, `disPersonNum`, `isFull`, `lived`, `price`) VALUES (6, 'A8-433', 2, 1, 2, 1700.00);
COMMIT;

-- ----------------------------
-- Table structure for care_worker
-- ----------------------------
DROP TABLE IF EXISTS `care_worker`;
CREATE TABLE `care_worker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oldPersonId` int DEFAULT NULL,
  `careWorkerName` varchar(255) DEFAULT NULL COMMENT '护工名字',
  `careWorkerAge` int DEFAULT NULL COMMENT '护工年纪',
  `carWorkerPrice` decimal(10,2) DEFAULT NULL COMMENT '护工薪资（元/月）',
  `seniority` int DEFAULT NULL COMMENT '工龄（/年）',
  `isHealthy` int DEFAULT NULL COMMENT '是否健康，1.健康。0，不健康（不健康把病例写出）',
  `careWorkerCases` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '选择不健康，填写病例',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of care_worker
-- ----------------------------
BEGIN;
INSERT INTO `care_worker` (`id`, `oldPersonId`, `careWorkerName`, `careWorkerAge`, `carWorkerPrice`, `seniority`, `isHealthy`, `careWorkerCases`) VALUES (1, 17, '李爱玲', 48, 4600.00, 4, 1, '');
INSERT INTO `care_worker` (`id`, `oldPersonId`, `careWorkerName`, `careWorkerAge`, `carWorkerPrice`, `seniority`, `isHealthy`, `careWorkerCases`) VALUES (4, 20, '李丽', 45, 7000.00, 7, 0, '流感');
INSERT INTO `care_worker` (`id`, `oldPersonId`, `careWorkerName`, `careWorkerAge`, `carWorkerPrice`, `seniority`, `isHealthy`, `careWorkerCases`) VALUES (5, 13, '张丽丽', 45, 8000.00, 6, 1, '');
INSERT INTO `care_worker` (`id`, `oldPersonId`, `careWorkerName`, `careWorkerAge`, `carWorkerPrice`, `seniority`, `isHealthy`, `careWorkerCases`) VALUES (6, 12, '王思思', 46, 7000.00, 6, 1, '');
COMMIT;

-- ----------------------------
-- Table structure for cases
-- ----------------------------
DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oldPersonId` int DEFAULT NULL,
  `cases` varchar(255) DEFAULT NULL COMMENT '病例',
  `fallIllTime` varchar(255) DEFAULT NULL COMMENT '得病时间',
  `isTreat` varchar(255) DEFAULT NULL COMMENT '是否治疗：0、未治疗；1、已治疗',
  `treatDrug` varchar(255) DEFAULT NULL COMMENT '治疗药品',
  `drugPrice` decimal(10,2) DEFAULT NULL COMMENT '药品价格',
  `treatHospital` varchar(255) DEFAULT NULL COMMENT '治疗医院',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of cases
-- ----------------------------
BEGIN;
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (3, 12, '冠心病', '2019-09-22', '1', '西药', 300.00, '西南医院');
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (4, 3, '冠心病', '2019-09-22', '1', '西药', 300.00, '西南医院');
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (5, 2, '冠心病', '2019-09-22', '1', '西药', 300.00, '西南医院');
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (6, 2, '冠心病', '2019-09-22', '1', '西药', 300.00, '西南医院');
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (7, 2, '冠心病', '2019-09-22', '1', '西药', 300.00, '西南医院');
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (8, 17, '心脏病', '2023-02-06', '1', '西药', 50000.00, '北京医院');
INSERT INTO `cases` (`id`, `oldPersonId`, `cases`, `fallIllTime`, `isTreat`, `treatDrug`, `drugPrice`, `treatHospital`) VALUES (10, 18, '高血压', '2020-02-13', '0', '', 0.00, '');
COMMIT;

-- ----------------------------
-- Table structure for go_out
-- ----------------------------
DROP TABLE IF EXISTS `go_out`;
CREATE TABLE `go_out` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oldPersonId` int DEFAULT NULL,
  `goOutAddress` varchar(255) DEFAULT NULL,
  `goOutTime` varchar(255) DEFAULT NULL,
  `goOutEvent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of go_out
-- ----------------------------
BEGIN;
INSERT INTO `go_out` (`id`, `oldPersonId`, `goOutAddress`, `goOutTime`, `goOutEvent`) VALUES (4, 17, '上海市浦东新区周浦镇', '2023-01-04', '回家过年');
INSERT INTO `go_out` (`id`, `oldPersonId`, `goOutAddress`, `goOutTime`, `goOutEvent`) VALUES (5, 18, '上海市', '2023-01-18', '回家过年');
COMMIT;

-- ----------------------------
-- Table structure for healthy
-- ----------------------------
DROP TABLE IF EXISTS `healthy`;
CREATE TABLE `healthy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oldPersonId` int DEFAULT NULL,
  `PETime` varchar(255) DEFAULT NULL COMMENT '体检时间',
  `height` double DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `bloodType` varchar(255) DEFAULT NULL COMMENT '血型',
  `heartRate` varchar(255) DEFAULT NULL COMMENT '心率',
  `bloodOxygen` varchar(255) DEFAULT NULL COMMENT '血氧',
  `bloodPressure` varchar(255) DEFAULT NULL COMMENT '血压',
  `isAllergy` int DEFAULT NULL COMMENT '过敏。0:过敏；1、不过敏',
  `isSmoke` int DEFAULT NULL COMMENT '吸烟。0、不吸；1、吸',
  `healthyDes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of healthy
-- ----------------------------
BEGIN;
INSERT INTO `healthy` (`id`, `oldPersonId`, `PETime`, `height`, `weight`, `bloodType`, `heartRate`, `bloodOxygen`, `bloodPressure`, `isAllergy`, `isSmoke`, `healthyDes`) VALUES (23, 18, '2023-02-25', 161, 45, 'A', '40', '99', '80', 1, 0, '血氧正常,心动过缓,血压过低');
COMMIT;

-- ----------------------------
-- Table structure for life
-- ----------------------------
DROP TABLE IF EXISTS `life`;
CREATE TABLE `life` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oldPersonId` int DEFAULT NULL,
  `bedroomId` int DEFAULT NULL COMMENT '寝室表id',
  `checkInTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '入住时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of life
-- ----------------------------
BEGIN;
INSERT INTO `life` (`id`, `oldPersonId`, `bedroomId`, `checkInTime`) VALUES (6, 12, 1, '2023-01-09');
INSERT INTO `life` (`id`, `oldPersonId`, `bedroomId`, `checkInTime`) VALUES (7, 17, 3, '2023-02-24');
INSERT INTO `life` (`id`, `oldPersonId`, `bedroomId`, `checkInTime`) VALUES (9, 18, 6, '2023-02-25');
INSERT INTO `life` (`id`, `oldPersonId`, `bedroomId`, `checkInTime`) VALUES (10, 19, 6, '2023-02-25');
COMMIT;

-- ----------------------------
-- Table structure for old_person
-- ----------------------------
DROP TABLE IF EXISTS `old_person`;
CREATE TABLE `old_person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `oldPersonName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gender` int DEFAULT NULL COMMENT '1、男；0、女',
  `age` int DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `relation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '和老人关系',
  `isSpouse` int DEFAULT NULL COMMENT '是否有配偶。1、在世。2、已故。3、未婚',
  `familyMember` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '家属',
  `familyMemberPhone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `familyMemberJob` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `familyMemberAddress` varchar(255) DEFAULT NULL,
  `birthDate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of old_person
-- ----------------------------
BEGIN;
INSERT INTO `old_person` (`id`, `createTime`, `updateTime`, `oldPersonName`, `gender`, `age`, `phone`, `address`, `relation`, `isSpouse`, `familyMember`, `familyMemberPhone`, `familyMemberJob`, `familyMemberAddress`, `birthDate`) VALUES (12, '1676463041031', '1677318083871', '张学友', 1, 10, '1851236521', '上海', '父子', 1, '父子', '1111555', '开滴滴', '重庆市', '2013-02-06');
INSERT INTO `old_person` (`id`, `createTime`, `updateTime`, `oldPersonName`, `gender`, `age`, `phone`, `address`, `relation`, `isSpouse`, `familyMember`, `familyMemberPhone`, `familyMemberJob`, `familyMemberAddress`, `birthDate`) VALUES (13, '1676463380864', '1677318161745', '高学强', 1, 80, '18536956232', '街道', '黑社会', 1, '弟弟', '12345202', '买小灵通', '冻库', '1943-05-05');
INSERT INTO `old_person` (`id`, `createTime`, `updateTime`, `oldPersonName`, `gender`, `age`, `phone`, `address`, `relation`, `isSpouse`, `familyMember`, `familyMemberPhone`, `familyMemberJob`, `familyMemberAddress`, `birthDate`) VALUES (17, '1677080592824', '1677318138882', '李霞莉', 0, 73, '15112345678', '上海市浦东新区周浦镇', '母子关系', 2, '刘强', '15612345678', '开店', '上海市浦东新区周浦镇', '1950-01-11');
INSERT INTO `old_person` (`id`, `createTime`, `updateTime`, `oldPersonName`, `gender`, `age`, `phone`, `address`, `relation`, `isSpouse`, `familyMember`, `familyMemberPhone`, `familyMemberJob`, `familyMemberAddress`, `birthDate`) VALUES (18, '1677337802520', '1677337905094', '韩梅梅', 0, 80, '15312345678', '上海市浦东新区周浦镇', '母子关系', 3, '李宏', '15312345678', '开超市', '上海市浦东新区周浦镇', '1943-02-10');
INSERT INTO `old_person` (`id`, `createTime`, `updateTime`, `oldPersonName`, `gender`, `age`, `phone`, `address`, `relation`, `isSpouse`, `familyMember`, `familyMemberPhone`, `familyMemberJob`, `familyMemberAddress`, `birthDate`) VALUES (19, '1677338249745', NULL, '李三', 0, 80, '15623122222', '重庆市合阳大道', '母子关系', 1, '张四', '16431211111', '开火锅', '重庆市合阳大道', '1943-05-06');
INSERT INTO `old_person` (`id`, `createTime`, `updateTime`, `oldPersonName`, `gender`, `age`, `phone`, `address`, `relation`, `isSpouse`, `familyMember`, `familyMemberPhone`, `familyMemberJob`, `familyMemberAddress`, `birthDate`) VALUES (20, '1677338455550', '1677338472943', '李银河', 0, 73, '18912345678', '浙江省杭州市', '母子关系', 2, '王大波', '15412345678', '作家', '浙江省杭州市', '1950-02-01');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `createTime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `createTime`) VALUES (61, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 1, '1676538774203');
INSERT INTO `user` (`id`, `username`, `password`, `role`, `createTime`) VALUES (65, 'test111', 'e10adc3949ba59abbe56e057f20f883e', 2, '1677076703809');
INSERT INTO `user` (`id`, `username`, `password`, `role`, `createTime`) VALUES (66, 'ww', 'e10adc3949ba59abbe56e057f20f883e', 1, '1677076779790');
INSERT INTO `user` (`id`, `username`, `password`, `role`, `createTime`) VALUES (68, '朴灵', 'e10adc3949ba59abbe56e057f20f883e', 2, '1677337595108');
COMMIT;

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `oldPersonId` int DEFAULT NULL,
  `visitorsName` varchar(255) DEFAULT NULL,
  `visitorsPhone` varchar(255) DEFAULT NULL,
  `relation` varchar(255) DEFAULT NULL COMMENT '关系',
  `visitorsEvent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '访客事件',
  `accessTime` varchar(255) DEFAULT NULL COMMENT '访问时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of visitors
-- ----------------------------
BEGIN;
INSERT INTO `visitors` (`id`, `oldPersonId`, `visitorsName`, `visitorsPhone`, `relation`, `visitorsEvent`, `accessTime`) VALUES (3, 17, '张德治', '13342221234', '母子关系', '探望母亲', '2023-02-24');
INSERT INTO `visitors` (`id`, `oldPersonId`, `visitorsName`, `visitorsPhone`, `relation`, `visitorsEvent`, `accessTime`) VALUES (4, 18, '李雷', '15612345678', '朋友关系', '探访韩梅梅', '2023-02-25');
COMMIT;

-- ----------------------------
-- Table structure for work_rest
-- ----------------------------
DROP TABLE IF EXISTS `work_rest`;
CREATE TABLE `work_rest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `season` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '季节；1、春，2、夏，3、秋，4、冬',
  `sevenEight` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '7-8',
  `eightNine` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '8-9',
  `nineTen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '9-10',
  `tenEleven` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '10-11',
  `elevenTwelve` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '11-12',
  `twelveFourteen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '12-14',
  `fourteenSeventeen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '14-17',
  `seventeenNineteen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '17-19',
  `nineteenTwentyone` varchar(255) DEFAULT NULL COMMENT '19-21',
  `twentyoneAfter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '21 之后',
  `slogan` varchar(255) DEFAULT NULL COMMENT '口号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of work_rest
-- ----------------------------
BEGIN;
INSERT INTO `work_rest` (`id`, `season`, `sevenEight`, `eightNine`, `nineTen`, `tenEleven`, `elevenTwelve`, `twelveFourteen`, `fourteenSeventeen`, `seventeenNineteen`, `nineteenTwentyone`, `twentyoneAfter`, `slogan`) VALUES (4, '1', '起床', '吃早饭', '健身', '打牌', '吃午饭', '午休', '和伙伴们玩耍', '吃饭完', '回顾中华民主传统文化🇨🇳', '自由活动', '永远相信美好的事情即将发生');
INSERT INTO `work_rest` (`id`, `season`, `sevenEight`, `eightNine`, `nineTen`, `tenEleven`, `elevenTwelve`, `twelveFourteen`, `fourteenSeventeen`, `seventeenNineteen`, `nineteenTwentyone`, `twentyoneAfter`, `slogan`) VALUES (5, '2', '起床', '吃早饭', '和护工谈心', '自由活动', '吃午饭', '午休', '打牌🃏', '吃完饭', '集体大电影', '自由活动', '远处的小山坡有一群小肥羊');
INSERT INTO `work_rest` (`id`, `season`, `sevenEight`, `eightNine`, `nineTen`, `tenEleven`, `elevenTwelve`, `twelveFourteen`, `fourteenSeventeen`, `seventeenNineteen`, `nineteenTwentyone`, `twentyoneAfter`, `slogan`) VALUES (6, '3', '起床', '吃早饭', '跳早操', '健身', '吃午饭', '午休', '和护工谈心', '吃晚饭', '讲中国🇨🇳历史', '自由活动', '秋天真是个美好的季节');
INSERT INTO `work_rest` (`id`, `season`, `sevenEight`, `eightNine`, `nineTen`, `tenEleven`, `elevenTwelve`, `twelveFourteen`, `fourteenSeventeen`, `seventeenNineteen`, `nineteenTwentyone`, `twentyoneAfter`, `slogan`) VALUES (8, '4', '起床', '吃早饭', '跳早操', '健身', '吃午饭', '午休', '和护工谈心', '吃晚饭', '篝火晚会🔥', '自由活动', '过得真快，一年又到尾了');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

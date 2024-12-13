show DATABASES;

USE sesac

CREATE Table visitor(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    comment MEDIUMTEXT
);

INSERT INTO visitor(name, comment) VALUES('홍길동', '내가 왔다');
INSERT INTO visitor VALUES(null, '이찬혁', '으라차차');
INSERT INTO visitor VALUES(null, '삭제예정', '으라차차');

SELECT * FROM visitor;


-- data 수정
UPDATE visitor SET comment="야호~~!" WHERE id = 2;

--삭제
DELETE FROM visitor WHERE id=3;

############ DCL 
--MY SQL  사용자 만들기 
CREATE USER 'sesac'@'%' IDENTIFIED BY '1234';

GRANT ALL PRIVILEGES ON *.* TO 'sesac'@'%' WITH GRANT OPTION;

ALTER USER 'sesac'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES;

SELECT * FROM mysql.user;

show GRANTS for 'sesac'@'%';

DESC visitor

SHOW TABLES;

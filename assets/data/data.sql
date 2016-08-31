SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS tests;
CREATE TABLE tests (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(255) NOT NULL UNIQUE
) ENGINE InnoDB
DEFAULT CHARACTER SET = utf8;

SET FOREIGN_KEY_CHECKS=1;
-- CONSTRAINT (id0 FOREIGN KEY (tests_id) REFERENCES tests (id);
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    answerTrue INTEGER NOT NULL,
    answerFalse INTEGER NOT NULL,
    tests_id INTEGER NOT NULL,
    datefield VARCHAR(255) NOT NULL
    FOREIGN KEY (tests_id) REFERENCES tests(id)
) ENGINE InnoDB
DEFAULT CHARACTER SET = utf8;

-- создание базы
create database database_forUsers

-- создание таблицы тестов
create table usersTests;

-- создание таблицы юзеров
create table users;


-- просмотр тестируемых учеников
-- просмотр даты тестирование, типы примеров и колличество правельных-неправельных ответов
select * from users;

-- сохранение результатов тестирования
insert into users (name, answerTrue, answerFalse, datefield, tests_id) values ('Marina', 25, 25, NOW(),4);

-- получение отчётов выполнив сортирвку по дате и имени ученика, алфавитный порядок
select name from users where name LIKE 'A%' order by name asc;
-- показать учеников, прошедшие тестирование за указанный период
select datefield from users where datefield LIKE '25-06';

-- показать учеников ниразу не прошедших тестирование
-- показать учеников проходившие тестирование не менне трёх раз за указанный периметр, результат которых превысил 50%

CREATE TABLE users(
    id VARCHAR(40) UNIQUE,
    email VARCHAR(70) UNIQUE,
    password VARCHAR(100),
    name VARCHAR(50),
    isLogin BOOLEAN
);
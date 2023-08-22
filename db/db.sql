CREATE SCHEMA `delivery_app` ;

USE delivery_app;

CREATE TABLE users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'RESTAURANTE',
    '/restaurant/orders/list/',
    '2023-08-21',
    '2023-08-21'
);


INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'REPARTIDOR',
    '/delivery/orders/list/',
    '2023-08-21',
    '2023-08-21'
);

INSERT INTO roles(
	name,
    route,
    created_at,
    updated_at
)
VALUES(
	'CLIENTE',
    '/client/products/list/',
    '2023-08-21',
    '2023-08-21'
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);

--create database db_rok;
use db_rok;

-- Alianzas
CREATE TABLE tb_alianzas( 
	id_alianza       INT AUTO_INCREMENT PRIMARY KEY, 
	nombre_alianza   VARCHAR(200) NOT NULL, 
	siglas           CHAR(4) NOT NULL, 
	fecha_create     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
	flg_Activo       TINYINT(1) NOT NULL DEFAULT 1,
	CONSTRAINT uq_nombre_alianza UNIQUE (nombre_alianza)
);

-- Jugadores
CREATE TABLE tb_jugador( 
	id_jugador       INT AUTO_INCREMENT PRIMARY KEY, 
	id_jugador_rok   BIGINT NOT NULL UNIQUE, 
	id_alianza       INT NOT NULL, 
	nombre_juego     VARCHAR(200) NOT NULL, 
	poder            BIGINT NOT NULL, 
	kp_inicial       BIGINT NOT NULL, 
	fecha_registro   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
	flg_Activo       TINYINT(1) NOT NULL DEFAULT 1,
	FOREIGN KEY (id_alianza) REFERENCES tb_alianzas(id_alianza)
);

-- KVKs
CREATE TABLE tb_kvk( 
	id_kvk        INT AUTO_INCREMENT PRIMARY KEY, 
	nombre_kvk    VARCHAR(100) NOT NULL, 
	numero_kvk    INT NOT NULL, 
	fecha_inicio  DATE NOT NULL, 
	fecha_fin     DATE
);

-- Etapas del KVK
CREATE TABLE tb_etapa_kvk( 
	id_etapa        INT AUTO_INCREMENT PRIMARY KEY,
	id_kvk          INT NOT NULL,
	nombre_etapa    VARCHAR(100) NOT NULL, 
	detalles        TEXT NULL,
	fecha_inicio    DATE NOT NULL,
	fecha_fin       DATE NOT NULL,
	fecha_registro  DATE NOT NULL,
	FOREIGN KEY (id_kvk) REFERENCES tb_kvk(id_kvk)
);

-- Registro de KP por etapa y jugador
CREATE TABLE tb_kp_jugador( 
	id_kp_jugador  INT AUTO_INCREMENT PRIMARY KEY, 
	id_jugador_rok BIGINT NOT NULL, 
	id_etapa       INT NOT NULL, 
	id_kvk         INT NOT NULL,  
	kp_etapa       BIGINT NOT NULL,
	poder_etapa    BIGINT NOT NULL,
	FOREIGN KEY (id_jugador_rok) REFERENCES tb_jugador(id_jugador_rok),
	FOREIGN KEY (id_etapa) REFERENCES tb_etapa_kvk(id_etapa),
	UNIQUE KEY uq_jugador_etapa_kvk (id_jugador_rok, id_etapa, id_kvk)  
);

-- Metas de KP según poder
CREATE TABLE tb_meta_kp( 
	id_meta_kp    INT AUTO_INCREMENT PRIMARY KEY, 
	poder_min     BIGINT NOT NULL, 
	poder_max     BIGINT NOT NULL, 
	meta_kp       BIGINT NOT NULL, 
	id_kvk        INT NOT NULL,
	FOREIGN KEY (id_kvk) REFERENCES tb_kvk(id_kvk)
);

create table tb_jugador_kvk (
	id_jugador_kvk INT AUTO_INCREMENT PRIMARY KEY,
	id_jugador_rok BIGINT NOT NULL,
	id_kvk         INT NOT NULL,
	flg_participa	 TINYINT(1) NOT NULL DEFAULT 1,
	fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_jugador_rok) REFERENCES tb_jugador(id_jugador_rok),
	FOREIGN KEY (id_kvk) REFERENCES tb_kvk(id_kvk),
	UNIQUE KEY uq_jugador_kvk (id_jugador_rok, id_kvk)
);

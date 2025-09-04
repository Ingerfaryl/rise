
use db_rok;

-- Alianzas
create table tb_alianzas( 
	id_alianza 			int identity primary key, 
	nombre_alianza 		nvarchar(200) not null, 
	siglas 				nchar(4) not null, 
	fecha_create 		DATETIME not null DEFAULT GETDATE(), 
	flg_Activo 			bit not null default 1 
)

-- Jugadores
create table tb_jugador( 
	id_jugador 			int identity primary key, 
	id_jugador_rok 		bigint not null unique, 
	id_alianza 			int not null, 
	nombre_juego 		nvarchar(200) not null, 
	poder 				bigint not null, 
	kp_inicial 			bigint not null, 
	fecha_registro 		datetime not null default getdate(), 
	flg_Activo 			bit not null default 1
)
-- KVKs
create table tb_kvk( 
	id_kvk 			int identity primary key, 
	nombre_kvk 		varchar(100) not null, 
	numero_kvk 		int not null, 
	fecha_inicio 	date not null, 
	fecha_fin 		date 
)

-- Etapas del KVK (para registrar cada "paso" como el paso 4 o 5)
create table tb_etapa_kvk( 
	id_etapa 		int identity primary key,
	id_kvk 			int not null,
	nombre_etapa 	varchar(100) not null, 
	detalles 		text null,
	fecha_inicio 	date not null,
	fecha_fin 		date not null,
	fecha_registro  date not null 
)
-- Registro de KP por etapa y jugador
create table tb_kp_jugador( 
	id_kp_jugador 	int identity primary key, 
	id_jugador 		int not null, 
	id_etapa 		int not null, 
	kp_etapa 		bigint not null 
)

-- Metas de KP seg�n poder
create table tb_meta_kp( 
	id_meta_kp 		int identity primary key, 
	poder_min 		bigint not null, 
	poder_max 		bigint not null, 
	meta_kp 		bigint not null, 
	id_kvk 			int not null 
)
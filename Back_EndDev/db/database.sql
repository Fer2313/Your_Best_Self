CREATE DATABASE IF NOT EXISTS youbestself;
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(45),
  edad INT,
  peso INT,
  altura FLOAT,
  sexo VARCHAR(10)
);

CREATE TABLE ejercicios (
  Id_ejercicios INT AUTO_INCREMENT PRIMARY KEY,
  nombre_ejercicios VARCHAR(45),
  Descripcion varchar(1000),
  video varchar(500),
  imagen varchar(500)
);
CREATE TABLE EjercicioMusculo (
    Id_ejercicios INT,
    id_musculo INT,
    PRIMARY KEY (Id_ejercicios, id_musculo),
    FOREIGN KEY (Id_ejercicios) REFERENCES ejercicios(Id_ejercicios),
    FOREIGN KEY (id_musculo) REFERENCES musculos(id_musculo)
);
CREATE TABLE musculos (
  id_musculo INT AUTO_INCREMENT PRIMARY KEY,
  nombre_musculo varchar(50),
  imagen_musculo VARCHAR(500)
);

CREATE TABLE entrenamiento (
  id_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  nombre_entrenamiento varchar(20),
  dificultad int,
  descripcion varchar(500),
  fecha date,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) 
);

CREATE TABLE detalle_entrenamientos (
  id_detalle_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  id_ejercicios int,
  id_entrenamiento int,
  series int,
  repeticiones int,
  tiempo timestamp,
 FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
 FOREIGN KEY (id_ejercicios) REFERENCES ejercicios(id_ejercicios),
 FOREIGN KEY (id_entrenamiento) REFERENCES entrenamiento(id_entrenamiento)
);

CREATE TABLE Registro_entrenamiento (
  registro_id int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  id_entrenamiento int,
  fecha date,
  kcal int,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_entrenamiento) REFERENCES entrenamiento(id_entrenamiento)
);

/* 
Insercion de datos.
 Musculos:
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Abdomen',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881656/images/abs/m3x7otqjqdbvj4qnrabn.jpg'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Abdomen Oblicuo',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881656/images/abs/uouatkpvfnfskmn01uop.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Antebrazos-Front',
 'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881662/images/brazo%20inferior/reccryposdccgnhvyk0b.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Antebrazos-Back',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881662/images/brazo%20inferior/tpjs7qxvguxkh7iopsxz.png'
 );
 
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Triceps',
 'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881663/images/brazo%20superior/xhneb8caevtw2bcaqccn.jpg'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Biseps',
 'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881663/images/brazo%20superior/yhjjwieeszrsunhuqjqo.jpg'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Cuello-Front',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881665/images/cuello/z5k0f2nbpxkkggx0d6yl.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Cuello-Back',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881665/images/cuello/v0i2o5yfui8qxbd4i7zp.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Hombro-Front',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881667/images/hombros/r0fyjmoibn1hsdjrsdpa.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Hombro-Back',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881667/images/hombros/mnnoccdrsta3qucvcexv.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Tibial',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881669/images/piena%20baja/j3eggyf1zinfmeqmhbbn.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Pantorilla',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881669/images/piena%20baja/e8k7kpmq9qi8kymoihk7.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Isquios',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881671/images/pierna%20superior/gvrktdfqbyceoflyapoy.png'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Cuadriseps',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881670/images/pierna%20superior/dzw1e8xzb6kriwgu4ims.jpg'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Pectorales',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881672/images/Tren%20superior/hbumg9drihj0gcmxbrfg.jpg'
 );
 insert into musculos (nombre_musculo,imagen_musculo)
 values (
  'Espalda',
'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698881672/images/Tren%20superior/m3ebzakl5enk7l9oobve.jpg'
 );
 Ejercicios: 

INSERT INTO ejercicios (nombre_ejercicios, Descripcion, video, imagen)
VALUES (
  'Crunch abdominal ',
  'Comience acostandose en el suelo con los brazos levantados en un angulo de 85 grados, Levante la parte superior de la espalda manteniendo el abdomen siempre apretado. Repita tantas repeticiones y series como desee.',
  'https://storage.googleapis.com/sworkit-assets/video/ios/abdominal-crunch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698961088/images/Ejercicios/tmm2srowsxp6snkvzcim.png'
);
INSERT INTO EjercicioMusculo (id_ejercicios, id_musculo) VALUES (1, 1);

*/









CREATE DATABASE IF NOT EXISTS youbestself;

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(200),
  contraseña varchar(150),
  nombre VARCHAR(100),
  edad INT,
  peso INT,
  pesoIdeal INT,
  altura FLOAT,
  racha int,
  sexo VARCHAR(10),
  update_token VARCHAR(255),
  imagen_perfil varchar(255),
  verify ENUM("true", "false") default 'false',
  rol ENUM('admin', 'user') DEFAULT 'user'
);


CREATE TABLE ejercicios (
  Id_ejercicios INT AUTO_INCREMENT PRIMARY KEY,
  nombre_ejercicios VARCHAR(100),
  descripcion varchar(1000),
  dificultad ENUM("Principiante","Experimentado","Avanzado"),
  video varchar(500),
  imagen varchar(500),
  categoria ENUM("Fuerza","Cardio","Estiramiento")
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
  nombre_musculo varchar(100),
  imagen_musculo VARCHAR(500)
);

CREATE TABLE entrenamiento (
  id_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  imagen varchar(500),
  nombre_entrenamiento varchar(100),
  dificultad int,
  descripcion varchar(500),
  fecha date,
  descanso_entre_series int,
  descanso_entre_ejercicio int,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) 
);

CREATE TABLE detalle_ejercicio (
  id_detalle_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  id_ejercicios int,
  id_entrenamiento int,
  series int,
  repeticiones int,
  tiempo int,
  lado ENUM("izquierdo","derecho"),
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
  minutos int,
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

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Crunch abdominal',
  'Comience acostandose en el suelo con los brazos levantados en un angulo de 85 grados, Levante la parte superior de la espalda manteniendo el abdomen siempre apretado. Repita tantas repeticiones y series como desee.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/abdominal-crunch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1698961088/images/Ejercicios/tmm2srowsxp6snkvzcim.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (1, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominal con plancha y patada hacia atras',
  'Comienza en una posición de plancha con los codos doblados y el cuerpo en línea recta. Mientras mantienes la posición de plancha,lleva tu pierna hacia el estomago y luego levantala lo mas que puedas hacia atras, manteniendo la pierna recta y los músculos de la parte posterior del muslo y los glúteos comprometidos. Regresa la pierna a la posición inicial y repite el movimiento con la otra pierna.',
  'Avanzado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/plank-crunch-and-kickback-right.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700775744/images/Ejercicios/diqidipejuvfeku8vyke.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (2, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (2, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (2, 10);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (2, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (2, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominal Ruso',
  'En posición sentada con las rodillas dobladas, eleva ligeramente los pies del suelo. Inclina el torso hacia atrás manteniendo la espalda recta. Ejecuta una rotación del torso, tocando el suelo cerca de la cadera con las manos. Retorna al centro y repite el movimiento hacia el otro lado. Este ejercicio, conocido como abdominal ruso, se enfoca en fortalecer los oblicuos mediante la torsión del torso.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/mason-twist.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700778889/images/Ejercicios/wkwpejdmiin0m9xb1per.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (3, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominal lateral con abductor',
  'Acuestate de lado apoyando el codo en el suelo con las manos atras de la nuca, ensancha tus piernas intentando con la rodilla de la pierna de arriba tocar el codo del otro bazo mientras contraes el oblicuo, Repite el movimiento con el otro lado',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/lateral-abductor-crunch-beginner-right.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700781110/images/Ejercicios/ktdw6n6ymoh4vkz0iald.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (4, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (4, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominales adentro y afuera',
  'En el suelo apoya solamente la zona lumbar mientra mantienes los pies sin tocar el suelo y las manos hacia delante nuevamente sin tocar el suelo, Y vas intentar juntar tu pecho con tus piernas.',
  'Avanzado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/in-and-out-ab.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700841012/images/Ejercicios/np70vztppplyenzdpqcv.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (5, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (5, 14);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (5, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominales con alcance superior',
  'Comienza acostado boca arriba con las rodillas dobladas, los brazos en linea recta hacia arriba, Vas a levantar la espalda superior mientras contraes el abdomen',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/reach-up.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700841955/images/Ejercicios/wu8wesjpjw2xwkggugoo.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (6, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (6, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominales con brazos extendidos con alcance inferior',
  'Comienza acostado boca arriba con los brazos rectos hacia atrás de la cabeza y las rodillas dobladas dejando un breve espacio entre los pies para hacer todo el recorrido abdominal y luego tocar el suelo con las manos',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/reach-through.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700842763/images/Ejercicios/vywqupzcjwvd7xuxkjug.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (7, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominales de esquiador',
  'Ponte en posicion de placha con los brazos estirados, empieza con un salto llevando tus pies hacia delante y luego vueve a la posicion inicial, luego salta hacia un lado luego al medio y despues hacia el otro lado, repite el ejercicio las veses nesesarias',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/skier-abs.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700850497/images/Ejercicios/b3kjalyavquyxt8tyaom.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (8, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominales inferiores en V',
  'Acuéstate en el suelo con las piernas elevadas y los brazos extendidos formando una "V". Mantén los músculos abdominales contraídos y realiza un movimiento de apertura lateral de las piernas, ensanchándolas sin tocar el suelo. Este ejercicio se centra en fortalecer los abdominales inferiores y mejorar la flexibilidad de las piernas. Realiza el movimiento de manera controlada para maximizar la eficacia y evitar tensión innecesaria en la espalda baja.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/leg-spreader.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700851524/images/Ejercicios/s1rfmbvktbmneipchi94.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (9, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (9, 14);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (9, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominales angel de nieve',
  'Acuéstate en el suelo con las manos colocadas cerca de las caderas y los pies suspendidos sin tocar el suelo. Inicia el ejercicio rotando los brazos hacia atrás mientras simultáneamente realizas una apertura lateral de las piernas. Luego, vuelve a la posición inicial y repite el movimiento.',
  'Avanzado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/snow-angel.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700852369/images/Ejercicios/v1cbochoi1pheygdmucg.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (10, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (10, 14);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (10, 16);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (10, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (10, 10);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Apertura de caderas supino',
  'Acuéstate en el suelo boca arriba con las manos extendidas detrás de la cabeza. Eleva las piernas hacia la cabeza y levanta la parte baja de la espalda. Luego, regresa con un movimiento circular y abre las caderas para volver a la posición inicial. Repite el mismo movimiento, pero esta vez, desde la posición inicial hasta la cabeza. Finalmente, baja las piernas hasta el suelo. Repite el ejercicio según sea necesario, y como opción adicional, realiza el ejercicio sin que los pies toquen el suelo.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/lying-hip-opener.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700858979/images/Ejercicios/waudnnwurfyjcgdtjswf.png',
  'Estiramiento'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (11, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (11, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (11, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Arriba abajo',
  'Empieza trotando por unos segundos, luego bajas al suelo para hacer una flexion, repite este ejercicio las veses nesesarias.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/up-down.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700862240/images/Ejercicios/guswajbgpmsvh4hxda9v.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 5);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 12);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 15);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 14);  
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 10);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (12, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Balance con patada posterior',
  'Empieza parado con una sola pierna y la otra con la rodilla levantada y los brazos al frente, el movimiento es con el cuerpo hacia abajo intentado con las manos tocar el piso y simultaneamente llevando la pierna levantada hacia atras estirando lo mas que se pueda',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/balanced-kick-back-left.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1700863634/images/Ejercicios/qakncatbmjszr8cuhn95.png',
  'Estiramiento'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (13, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (13, 13);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Balance de core en V',
  'Empieza sentado en el piso con las manos al frente tocando el piso y las rodillas dobladas, lo siguiente es tomar impulso hacia atras para equilibrarse solamente con el trasero, manteniendo la espalda recta y los brazos en forma de V hacia delante, las rodillas a la misma altura que los hombros, manten esta posicion por el tiempo indicado',
  'Avanzado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/v-balance.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702373815/images/Ejercicios/cpakmdu5b8xtribsjaxd.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (14, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Barridos',
  'Empieza en posicion de cangrejo, luego levanta tu mano derecha con la intencion de llevarla al lado opuesto y mientras pasas tu pierna izquierda por debajo de la otra pierna para luego levantarla, luego trata de imitar una especie de posicion superman, Por ultimo vuelve a tu posicion original y repite el mismo ejercicio hacia el otro lado',
  'Avanzado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/swiper.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702375175/images/Ejercicios/pulg4qlvzwurnlcxvquy.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 5);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 10);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 14);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (15, 15);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Bicicleta en posicion supina',
  'Empieza acostado boca arriba, alterna el movimiento de las piernas como si estuvieras pedaleando en una bicicleta, mientras llevas los codos hacia las rodillas opuestas.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/supine-bicycle.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702376572/images/Ejercicios/fwky9j8rip6zojszn4lh.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (16, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (16, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Teaser',
  'Empieza acostado boca arriba, brazos extendidos, piernas estiradas. Eleva torso y piernas, formando una "V". Busca equilibrio, luego baja controladamente. Repite, enfocándote en abdomen y estabilidad.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/teaser.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702377566/images/Ejercicios/nj2etiuzyesywv1d8oo5.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (17, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Sprinter',
  'Ponte de pie con los pies juntos. Da un paso adelante con una pierna en una posición de lunge, bajando la cadera. Simultáneamente, lleva el brazo opuesto hacia adelante, imitando la posición de sprint. Alterna las piernas en un movimiento continuo, como si estuvieras corriendo en el lugar. Mantén un movimiento rápido de brazos, con los codos doblados. Realiza el ejercicio a un ritmo rápido, imitando la velocidad de correr.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/sprinter.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702378962/images/Ejercicios/rnlyns7y6izqmp1diwuq.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 3);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 4);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 5);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 6);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 10);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 12);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (18, 14);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Cuerpo Hueco',
  'Acuéstate boca arriba en el suelo o en una colchoneta. Eleva las piernas y los brazos simultáneamente, manteniéndolos rectos. Intenta formar una "U" con tu cuerpo, elevando la parte superior e inferior hacia el centro. Contrae los músculos abdominales durante todo el movimiento. Sostén la posición por unos segundos y luego baja las piernas y los brazos hacia el suelo.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/hollow-body.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702385531/images/Ejercicios/ztpdepjtr6xj8lh9bsdr.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (19, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Sombra',
  'Simula movimientos de golpes y patadas como si estuvieras enfrentando a un oponente imaginario. Mantén un ritmo constante para elevar la frecuencia cardíaca y mejorar la resistencia cardiovascular. Incorpora movimientos de esquiva y defensa para trabajar la agilidad y la coordinación. Varía la intensidad y la velocidad de los movimientos para adaptar el entrenamiento a tus necesidades. Puedes incluir combinaciones de golpes y patadas para hacer el ejercicio más dinámico. Visualiza situaciones de combate y practica estrategias de movimiento. Asegúrate de mantener una buena postura y técnica para maximizar los beneficios y prevenir lesiones.',
  'Experimentado',
  'https://res.cloudinary.com/dvp8rjepk/video/upload/v1702385989/images/Ejercicios/e99tx4ftcppj9m3yohcm.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702386117/images/Ejercicios/qxjyald4owbeilumz69p.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 5);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 6);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 10);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 12);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 14);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (20, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Elevación de Pierna hacia Atrás',
  'Apoya las manos en el respaldo de una silla. Eleva una pierna hacia atrás, manteniendo la rodilla extendida. Inclina ligeramente el torso hacia adelante para sentir el estiramiento en la parte frontal del muslo y la cadera. Asegúrate de mantener el abdomen contraído para apoyar la postura.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/back-leg-raise.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702387058/images/Ejercicios/oxtj2twaju2msdgldgqk.png',
  'Estiramiento'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (21, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (21, 13);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Elevación de Piernas',
  'Acuéstate boca arriba en una colchoneta con las manos debajo de tus glúteos para brindar apoyo a la parte baja de la espalda. Con las piernas juntas y estiradas, inicia elevando lentamente las piernas hacia arriba, contrae los músculos abdominales y lleva las piernas a un ángulo perpendicular al suelo o hasta donde sea cómodo para ti. Desciende las piernas de manera controlada, evitando que toquen el suelo y manteniendo el control para evitar tensiones en la zona lumbar.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/leg-lift.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702387475/images/Ejercicios/ougmrcql1p4jrssqytjg.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (22, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (22, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Elevación de Tronco',
  'Comienza acostado boca arriba en una colchoneta con las piernas dobladas. Coloca las manos detrás de la cabeza. Contrae los músculos abdominales y eleva la parte superior del cuerpo hacia arriba, evitando jalar el cuello con las manos. La fuerza debe provenir principalmente del abdomen. Sostén la posición elevada por un momento para maximizar la contracción abdominal y luego desciende lentamente la parte superior del cuerpo de vuelta al suelo.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/sit-up.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702388001/images/Ejercicios/nfvxkehfxffhhs4qurah.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (23, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Abdominal elevado',
  'Comienza acostado boca arriba con las manos detrás de la cabeza y las piernas elevadas, con las rodillas dobladas. El movimiento consiste en elevar la parte superior de la espalda, acercando los codos hacia las rodillas en un movimiento de crunch.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/elevated-crunch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702388545/images/Ejercicios/j8t5gcsjnlctgorqaa69.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (24, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Crunch con Torsión',
  'Acuéstate boca arriba en una colchoneta con las piernas levantadas y las rodillas dobladas, y las manos detrás de la cabeza. Inicia el movimiento realizando un crunch, elevando la parte superior del torso hacia las rodillas. En el punto más alto del crunch, añade una torsión al torso llevando el codo derecho hacia la rodilla izquierda, contrayendo los músculos oblicuos. Desciende el torso de manera controlada hacia la posición inicial. Repite el movimiento, alternando los lados en cada repetición al llevar el codo izquierdo hacia la rodilla derecha.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/twisting-crunch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702479596/images/Ejercicios/nyyhvoluwdmcy6sja2uc.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (25, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Sit-Up en V',
  'Acuéstate boca arriba con las piernas extendidas y los brazos estirados por encima de la cabeza. Inicia elevando simultáneamente el torso y las piernas, formando un ángulo en "V" y tocando con las manos el piso. Contrae los abdominales en la parte alta del movimiento. Desciende de manera controlada el torso y las piernas hacia la posición inicial.',
  'Avanzado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/v-sit-up.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702479983/images/Ejercicios/cygxfve4edo9b9sonukf.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (26, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Elevacion lateral de piernas',
  'Acuéstate de lado en una colchoneta, apoyando el peso sobre un antebrazo. Eleva ambas piernas rectas hacia arriba, manteniendo el cuerpo alineado. Sostén en la posición más alta para trabajar los abdominales inferiores y la cadera. Desciende las piernas de manera controlada y repite. Cambia de lado para trabajar ambos lados.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/side-leg-lift.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702480578/images/Ejercicios/vcgdm4m32abbstiifzdj.png',
  'Fuerza'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (27, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (27, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Estiramiento de abdominales',
  'Acuéstate boca abajo en una colchoneta con las piernas extendidas. Coloca las manos detrás de la cabeza, con los codos hacia afuera. Enfoca la atención en la región lumbar de la espalda baja. Utilizando los músculos de la espalda baja, eleva suavemente el torso superior del suelo. Evita forzar el movimiento y mantén una posición elevada por un momento para sentir la contracción en la zona lumbar y estirar los músculos abdominales. Desciende de manera controlada a la posición inicial.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/laying-back-extension.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702506857/images/Ejercicios/hh9gbz1bvabdeqaqgxf0.png',
  'Estiramiento'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (28, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (28, 16);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (28, 8);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Escaladas abdominales',
  'En posición de plancha alta, con las manos debajo de los hombros y las piernas extendidas, inicia el ejercicio. Engancha los músculos abdominales y lleva una rodilla hacia el pecho, doblando la pierna. Alterna rápidamente las piernas, llevando una hacia atrás mientras acercas la otra al pecho.',
  'Experimentado',
  'https://storage.googleapis.com/sworkit-assets/video/ios/mountain-climber.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702507989/images/Ejercicios/mdk8az1j7pdwu6kr3hjt.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (29, 1);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Escalador en Posición de Pie',
  'En posición vertical con los pies a la altura de los hombros, comienza el ejercicio. Levanta una rodilla hacia el pecho mientras mantienes la otra pierna en el suelo. Alterna rápidamente las piernas, imitando el patrón de correr en el lugar, llevando una rodilla hacia el pecho mientras extiendes la otra hacia atrás. Mantén una postura erguida y contrae los músculos abdominales durante el movimiento.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/standing-mountain-climber.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702508351/images/Ejercicios/clqrtclkk4yejjrlfwdt.png',
  'Cardio'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (30, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (30, 9);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (30, 10);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (30, 12);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (30, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (30, 14);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Estiramientos de abdominales en posición de pie',
  'De pie con los pies a la altura de los hombros, eleva ambos brazos sobre la cabeza y entrelaza los dedos, girando las palmas hacia arriba e inclinando levemente el cuerpo hacia atras.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/abdominal-stretch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702508797/images/Ejercicios/u0nhxuoq1b8dgkzb9ls4.png',
  'Estiramiento'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (31, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (31, 8);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (31, 16);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Estiramientos de piernas',
  'Acuéstate boca arriba en una colchoneta con las piernas extendidas. Eleva tus pierna del suelo y dobla la rodilla de una hacia el pecho. Utiliza las manos para agarrar parte de ella y llévala hacia tu pecho lo mas que puedas, Regresa la pierna a su posición inicial y repite el movimiento con la otra pierna.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/single-leg-stretch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702509664/images/Ejercicios/tdcyeoz2mkk10fyj0fgw.png',
  'Estiramiento'
);

INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (32, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (32, 12);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (32, 13);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (32, 14);

INSERT INTO ejercicios (nombre_ejercicios, descripcion, dificultad, video, imagen, categoria)
VALUES (
  'Estiramiento lateral de pie',
  'Comienza de pie con los pies ligeramente separados, eleva un brazo por encima de la cabeza y e inclínate suavemente hacia un lado, manteniendo la espalda recta, y siente el estiramiento en los músculos laterales. Respira profundamente mientras mantienes la posición y luego regresa lentamente a la posición inicial. Repite el estiramiento hacia el otro lado.',
  'Principiante',
  'https://storage.googleapis.com/sworkit-assets/video/ios/side-stretch.mp4',
  'https://res.cloudinary.com/dvp8rjepk/image/upload/v1702510691/images/Ejercicios/ttlzvpyd0eukd1vjkyaj.png',
  'Estiramiento'
);


INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (33, 1);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (33, 8);
INSERT INTO EjercicioMusculo (Id_ejercicios, id_musculo) VALUES (33, 16);

SINTAXIS 
CREATE TABLE entrenamiento (
  id_entrenamiento int AUTO_INCREMENT PRIMARY KEY,
  id_usuario int,
  nombre_entrenamiento varchar(20),
  dificultad int,
  descripcion varchar(500),
  fecha date,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) 
);

CREATE TABLE detalle_ejercicio (
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

Creacion de entrenamientos

INSERT INTO entrenamiento (id_usuario, nombre_entrenamiento, dificultad, descripcion, descanso_entre_series, descanso_entre_ejercicio, imagen, fecha)
VALUES(
  1,
  'Rutina Núcleo Firme: Desafío Abdominal Total',
  3,
  'Es un entrenamiento intenso diseñado para fortalecer y esculpir tus músculos abdominales. Incorpora ejercicios variados, desde abdominales clásicos hasta planchas, adaptándose a diferentes niveles de condición física. Prepárate para sentir la activación profunda de tus abdominales y avanzar hacia un núcleo fuerte y tonificado.',
  15,
  30,
  "https://res.cloudinary.com/dvp8rjepk/image/upload/v1708445933/images/Entrenamientos/aom7eqp6x5bermtwogwv.jpg",
  '2024-02-19'
);
INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, series,  repeticiones)
VALUES(
  1,
  1,
  1, 
  3,
  12
);
INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, tiempo, lado)
VALUES(
  1,
  2,
  1,
  30,
  "derecho"
);
INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, tiempo, lado)
VALUES(
  1,
  2,
  1,
  30,
  "izquierdo"
);
INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, series,  repeticiones)
VALUES(
  1,
  22,
  1,
  3,
  12
);
INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, tiempo)
VALUES(
  1,
 30,
  1,
  60
);
INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, tiempo)
VALUES(
  1,
 29,
  1,
  30
);

UPDATE entrenamiento
SET descanso_entre_ejercicio = 30;
ALTER TABLE detalle_entrenamiento
MODIFY COLUMN tiempo int;
*/




SELECT
    E.EjercicioID AS Id_ejercicios,
    E.Nombre AS nombre_ejercicios,
    E.Descripcion,
    E.Video,
    E.Imagen AS imagen
FROM Ejercicios E
JOIN EjercicioMusculo EM ON E.EjercicioID = EM.EjercicioID
WHERE EM.MusculoID = 1;

SELECT
    M.id_musculo AS id_Musculos,
    M.nombre_musculo AS nombre_Musculos,
    M.imagen_musculo AS imagen_musculos
FROM Musculos M
JOIN EjercicioMusculo EM ON M.id_musculo = EM.id_musculo
WHERE EM.id_ejercicios = 4;

    
    SELECT
    E.Id_ejercicios AS Id_ejercicios,
    E.nombre_ejercicios AS nombre_ejercicios,
    E.Descripcion AS descripcion,
    E.Video AS video,
    E.Imagen AS imagen,
    E.categoria AS categoria,
    E.dificultad AS dificultad,
    ED.series AS series,
    ED.repeticiones AS repeticiones,
    ED.tiempo AS tiempo,
    ED.lado AS lado
    FROM Ejercicios E
    JOIN detalle_ejercicio ED ON E.Id_ejercicios = ED.Id_ejercicios
    WHERE ED.id_entrenamiento = ${id}`

 SELECT DISTINCT
    E.Id_ejercicios AS Id_ejercicios,
    E.nombre_ejercicios AS nombre_ejercicios,
    E.Descripcion AS descripcion,
    E.Video AS video,
    E.Imagen AS imagen,
    E.categoria AS categoria,
    E.dificultad AS dificultad
FROM Ejercicios E
JOIN EjercicioMusculo EM ON E.Id_ejercicios = EM.Id_ejercicios
WHERE EM.id_musculo IN (2,3,4,5,6,7) AND E.categoria = "Cardio" AND E.dificultad = "Experimentado";

SELECT DISTINCT E.Id_ejercicios AS Id_ejercicios, E.nombre_ejercicios AS nombre_ejercicios, E.Descripcion AS descripcion, E.Video AS video, E.Imagen AS imagen, E.categoria AS categoria, E.dificultad AS dificultad FROM Ejercicios E JOIN EjercicioMusculo EM ON E.Id_ejercicios = EM.Id_ejercicios WHERE E.categoria = "Cardio" AND E.dificultad = "Experimentado" AND EM.id_musculo IN (1,2,3,4,5,6)



UPDATE ejercicios
SET categoria = 'Fuerza'
WHERE id_ejercicios = 32;

INSERT INTO detalle_ejercicio (id_usuario, id_ejercicios, id_entrenamiento, tiempo)
VALUES(
  1,
 29,
  1,
  30
);
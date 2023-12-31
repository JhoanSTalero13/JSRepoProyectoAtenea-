# JSRepoProyectoAtenea-
Repositorio atenea del proyecto de atenea js, node js, css y html 

Revisar la raiz master

![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/05237207-1683-4527-9103-904f7468f481)


Proyecto creado y trabajado por Jhoan Sebastian Talero Alarcon para el proyecto Atenea - Universidad Distrial Jose Franscisco de Caldas

Objetivo
Crear un aplicativo de gestion de citas utilizando Java Script, html, Css, Node Js, Bootstrap, sql y uno que otro Framework 

Dificultadades o item a mejorar 
- Conexion entre los endoins del Backend y el formulario el frontend
- Utilizacion de los metodos y los endpoints en un mismo archivo
- No utilización de TyScript en la relación del proyecto

Estructura del proyecto

El proyecto utiliza una pagina Html con tres formularios para realizar el CRUD de Pacientes, Citas y Doctores, en donde la conexion son los api's creados en el backend que esta conectado un base de datos en Mysql 

Estructura de la base datos 
La base de datos se llama "dbcitas" esta creada en Mysql Workbreach y su estructura es:

{ 
-- creacion base de datos 
Create database dbcitas,
--  comnado para usar la base datos creada 
use dbcitas
CREATE TABLE `citas` (
  `cita_id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int DEFAULT NULL,
  `paciente_id` int DEFAULT NULL,
  `especialidad_id` int DEFAULT NULL,
  PRIMARY KEY (`cita_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `paciente_id` (`paciente_id`),
  KEY `especialidad_id` (`especialidad_id`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctores` (`doctor_id`),
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`paciente_id`),
  CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`especialidad_id`) REFERENCES `especialidades` (`Especialidades_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


CREATE TABLE `doctores` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `especialidad` int DEFAULT NULL,
  `consultorio` varchar(50) NOT NULL,
  `correo_contacto` varchar(100) NOT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `especialidades` (
  `Especialidades_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`Especialidades_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pacientes` (
  `paciente_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `edad` int DEFAULT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`paciente_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


}

Esquema de la base de datos 
![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/aeca98b4-a756-40ea-8d67-23e28dc5ca33)


Estructura proyecto JS

Utilizando Js, Html, css, node js, bootstrap 

los archivos base son:
-index.js
-indexMysql.html
-config.js
-dbmysql.js 
![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/eeb50584-60be-4979-bf91-8e30cd0ba537)
___________________________________________________________________________
configuracion de la conexion de la base datos 
Para esto necesitamos configurar e instalar mysql para realizarlo, abrimos una terminal por consola y ejecutamos npm install mysql12

luego creamos la conexion utilizando Js



{
//llamamos una constaste llamado mysql y que requiera el complemneto instalado mysql12

const mysql = require('mysql2');

//luego creamos una conexion

const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está alojada en otro servidor
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: 'admin', // Reemplaza con tu contraseña de MySQL
  database: 'dbcitas', // Reemplaza con el nombre de tu base de datos
});

//y al conectarse con la base de datos genera error realiza lo siguiente 
connection.connect((err) => {

//si es error imprimir que hay un error para conectarse con la base de datos
  if (err) {
    console.error('Error al conectar a MySQL', err);

// si no conexion éxitosa
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

//el valor que será exportado desde el módulo actual
module.exports = connection;
}

___________________________________________________________________

en la parte de index.js la configuracion es:

//servidor donde se conecta la BD con la peticion atraves de los endpoints
const express = require('express');
const app = express();
const path = require('path');
const config = require('./config.js');
const router = express.Router();
const connection = require('./dbmysql');

___________________________________________________________________________
//este codigo es para que la peticiones a traves de Json funcionen
app.use(express.json());

// este codigo para que cuando se haga la petición a travez de la url, usando el get de consulta para mirar que todos las citas registradas  
app.get('/api/citas/all', (req, res) => {
//en este codigo se realiza la consulta select para traer todo de las citas
    const query = 'SELECT * FROM citas';
//en este codigo gestiona los resulatados de la conexion con la base de datos y los endpoints en este caso get
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener las citas de MySQL', err);
        res.status(500).send('Error al obtener las citas');
      } else {
        res.send(results);
      }
    });
  });
![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/b6f3c7b9-cf8a-4537-bed8-05c3d8a95603)

![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/31d9dd74-5e2c-41ae-9ff6-625649264b8e)

![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/5634af35-8e94-4aea-918f-9ccb2777cc4a)

![image](https://github.com/JhoanSTalero13/JSRepoProyectoAtenea-/assets/114318104/d9153d79-bb5a-46e1-bdac-069340ebce65)


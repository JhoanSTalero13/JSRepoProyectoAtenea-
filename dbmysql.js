const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está alojada en otro servidor
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: 'admin', // Reemplaza con tu contraseña de MySQL
  database: 'dbcitas', // Reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL', err);
  } else {
    console.log('Conexión exitosa a MySQL');
  }
});

module.exports = connection;
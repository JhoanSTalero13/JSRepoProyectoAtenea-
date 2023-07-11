const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const config = require('./config');
const connection = require('./dbmysql');
// Obtener todas las especialidades
router.get('/especialidades', (req, res) => {
  const query = 'SELECT * FROM especialidades';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las especialidades de MySQL', err);
      res.status(500).send('Error al obtener las especialidades');
    } else {
      res.send(results);
    }
  });
});

// Agregar una especialidad
router.post('/especialidades', (req, res) => {
  const { nombre } = req.body;
  const query = 'INSERT INTO especialidades (nombre) VALUES (?)';
  const values = [nombre];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al agregar la especialidad en MySQL', err);
      res.status(500).send('Error al agregar la especialidad');
    } else {
      res.send('Especialidad agregada exitosamente');
    }
  });
});

// Rutas con datos predefinidos de especialidades
router.get('/especialidades/predefinidas', (req, res) => {
  const especialidadesPredefinidas = [
    'Medicina general',
    'Cardiología',
    'Medicina interna',
    'Dermatología',
    'Rehabilitación física',
    'Psicología',
    'Odontología',
    'Radiología'
  ];

  const query = 'INSERT INTO especialidades (nombre) VALUES ?';
  const values = especialidadesPredefinidas.map((nombre) => [nombre]);

  connection.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error al agregar las especialidades predefinidas en MySQL', err);
      res.status(500).send('Error al agregar las especialidades predefinidas');
    } else {
      res.send('Especialidades predefinidas agregadas exitosamente');
    }
  });
});

module.exports = router;

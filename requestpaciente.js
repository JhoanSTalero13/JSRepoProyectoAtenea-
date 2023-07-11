const express = require('express');
const router = express.Router();
const connection = require('./dbmysql');

router.get('/pacientes', (req, res) => {
    const query = 'SELECT * FROM pacientes';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los pacientes de MySQL', err);
        res.status(500).send('Error al obtener los pacientes');
      } else {
        res.send(results);
      }
    });
      });

router.post('/pacientes', (req, res) => {
        const { nombre, cedula, apellido, edad, telefono } = req.body;
        const query = 'INSERT INTO pacientes (nombre, cedula, apellido, edad, telefono) VALUES (?, ?, ?, ?, ?)';
        const values = [nombre, cedula, apellido, edad, telefono];
      
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error al agregar el paciente en MySQL', err);
            res.status(500).send('Error al agregar el paciente');
          } else {
            res.send('Paciente agregado exitosamente');
          }
        });
      });
      
router.put('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    const { nombre, cedula, apellido, edad, telefono } = req.body;
    const query = 'UPDATE pacientes SET nombre = ?, cedula = ?, apellido = ?, edad = ?, telefono = ? WHERE paciente_id = ?';
    const values = [nombre, cedula, apellido, edad, telefono, pacienteId];
      
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error al actualizar el paciente en MySQL', err);
            res.status(500).send('Error al actualizar el paciente');
          } else if (results.affectedRows === 0) {
            res.status(404).send('Paciente no encontrado');
          } else {
            res.send('Paciente actualizado exitosamente');
          }
        });
      });
      
router.delete('/pacientes/:id', (req, res) => {
    const pacienteId = req.params.id;
    const query = 'DELETE FROM pacientes WHERE paciente_id = ?';
    const values = [pacienteId];
      
    connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error al eliminar el paciente en MySQL', err);
            res.status(500).send('Error al eliminar el paciente');
          } else if (results.affectedRows === 0) {
            res.status(404).send('Paciente no encontrado');
          } else {
            res.send('Paciente eliminado exitosamente');
          }
        });
      });
      
module.exports = router;
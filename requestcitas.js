const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const config = require('./config');
const connection = require('./dbmysql');

router.get('/citas', (req, res) => {
    const query = 'SELECT * FROM citas';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener las citas de MySQL', err);
        res.status(500).send('Error al obtener las citas');
      } else {
        res.send(results);
      }
    });
  });

router.post('/citas', (req, res) => {
    const { doctorId, pacienteId, especialidadId } = req.body;
    const query = 'INSERT INTO citas (doctor_id, paciente_id, especialidad_id) VALUES (?, ?, ?)';
    const values = [doctorId, pacienteId, especialidadId];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al agregar la cita en MySQL', err);
        res.status(500).send('Error al agregar la cita');
      } else {
        res.send('Cita agregada exitosamente');
      }
    });
  });
  
router.put('/citas/:id', (req, res) => {
    const citaId = req.params.id;
    const { doctorId, pacienteId, especialidadId } = req.body;
    const query = 'UPDATE citas SET doctor_id = ?, paciente_id = ?, especialidad_id = ? WHERE cita_id = ?';
    const values = [doctorId, pacienteId, especialidadId, citaId];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al actualizar la cita en MySQL', err);
        res.status(500).send('Error al actualizar la cita');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Cita no encontrada');
      } else {
        res.send('Cita actualizada exitosamente');
      }
    });
  });
  
router.delete('/citas/:id', (req, res) => {
    const citaId = req.params.id;
    const query = 'DELETE FROM citas WHERE cita_id = ?';
    const values = [citaId];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al eliminar la cita en MySQL', err);
        res.status(500).send('Error al eliminar la cita');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Cita no encontrada');
      } else {
        res.send('Cita eliminada exitosamente');
      }
    });
  });
  
module.exports = router;
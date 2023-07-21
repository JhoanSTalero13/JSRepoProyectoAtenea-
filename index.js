//servidor
const express = require('express');
const app = express();
const path = require('path');
const config = require('./config.js');
const router = express.Router();
const requestCitasRouter = require('./requestcitas');
const requestDoctorRouter = require('./requestdoctor');
const requestPacienteRouter = require('./requestpaciente');
const requestespecialidadesRouter = require('./requestespecialidades');
const connection = require('./dbmysql');


app.use(express.json());

app.get('/api/citas', (req, res) => {
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

app.post('/api/citas', (req, res) => {
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
  
app.put('/api/citas/:id', (req, res) => {
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
  
app.delete('/api/citas/:id', (req, res) => {
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
  
app.get('/api/pacientes', (req, res) => {
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
  
app.post('/api/pacientes', (req, res) => {
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
  
app.put('/api/pacientes/:id', (req, res) => {
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
  
  app.delete('/api/pacientes/:id', (req, res) => {
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
    
app.get('/api/doctores', (req, res) => {
      const query = 'SELECT * FROM doctores';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error al obtener los doctores de MySQL', err);
          res.status(500).send('Error al obtener los doctores');
        } else {
          res.send(results);
        }
      });
    });
    
app.post('/api/doctores', (req, res) => {
      const { nombre, apellido, especialidad, consultorio, correo_contacto } = req.body;
      const query = 'INSERT INTO doctores (nombre, apellido, especialidad, consultorio, correo_contacto) VALUES (?, ?, ?, ?, ?)';
      const values = [nombre, apellido, especialidad, consultorio, correo_contacto];
    
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error al agregar el doctor en MySQL', err);
          res.status(500).send('Error al agregar el doctor');
        } else {
          res.send('Doctor agregado exitosamente');
        }
      });
    });

app.put('/api/doctores/:id', (req, res) => {
      const idDoctor = req.params.id;
      const { nombre, apellido, especialidad, consultorio, correo_contacto } = req.body;
      const query = 'UPDATE doctores SET nombre = ?, apellido = ?, especialidad = ?, consultorio = ?, correo_contacto = ? WHERE id_doctor = ?';
      const values = [nombre, apellido, especialidad, consultorio, correo_contacto, idDoctor];
    
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error al actualizar el doctor en MySQL', err);
          res.status(500).send('Error al actualizar el doctor');
        } else if (results.affectedRows === 0) {
          res.status(404).send('Doctor no encontrado');
        } else {
          res.send('Doctor actualizado exitosamente');
        }
      });
    });
    
app.delete('/api/doctores/:id', (req, res) => {
      const idDoctor = req.params.id;
      const query = 'DELETE FROM doctores WHERE id_doctor = ?';
      
      connection.query(query, idDoctor, (err, results) => {
        if (err) {
          console.error('Error al eliminar el doctor en MySQL', err);
          res.status(500).send('Error al eliminar el doctor');
        } else if (results.affectedRows === 0) {
          res.status(404).send('Doctor no encontrado');
        } else {
          res.send('Doctor eliminado exitosamente');
        }
      });
    });

app.get('/api/especialidades', (req, res) => {
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
app.post('/api/especialidades', (req, res) => {
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
app.get('/api/especialidades/predefinidas', (req, res) => {
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

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/Indexmysql.html'));
});

app.use(express.static('public'));
app.use('/citas', requestCitasRouter);
app.use('/doctores', requestDoctorRouter);
app.use('/pacientes', requestPacienteRouter);
app.use('/especialidades', requestespecialidadesRouter);
app.listen(config.PORT, config.HOST, function () {
      console.log(`El servidor se está ejecutando en http://${config.HOST}:${config.PORT}`);
    });
    
module.exports = router;


const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const config = require('./config');
const connection = require('./dbmysql');



// Ruta para obtener todos los doctores
/*
function leerDoctores() {
  const query = 'SELECT * FROM doctores';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los doctores de MySQL', err);
    } else {
      let doctores = results;
      $("#listaDoctores").empty();
      for (let i = 0; i < doctores.length; i++) {
        $("#listaDoctores").append(doctores[i].doctor_id + " <b>" + doctores[i].nombre + "</b> " + doctores[i].correo_contacto + " " + doctores[i].especialidad);
        $("#listaDoctores").append("<button onclick='borrarDoctor(" + doctores[i].doctor_id + ")'>Borrar</button><br>");
      }
    }
  });
}
*/
router.get('/doctores', (req, res) => {
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
/*
function guardarDoctor() {
  let doctorId = $("#doctorId").val();
  let nombre = $("#nombreDoctor").val();
  let correoContacto = $("#correoContacto").val();
  let especialidad = $("#especialidad").val();

  const query = 'INSERT INTO doctores (doctor_id, nombre, correo_contacto, especialidad) VALUES (?, ?, ?, ?)';
  const values = [doctorId, nombre, correoContacto, especialidad];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al guardar el doctor en MySQL', err);
    } else {
      $("#doctorId").val("");
      $("#nombreDoctor").val("");
      $("#correoContacto").val("");
      $("#especialidad").val("");
    }
    leerDoctores();
  });
}
*/
router.post('/doctores', (req, res) => {
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
/*
function editarDoctor() {
    let idDoctor = $("#idDoctor").val();
    let nombre = $("#nombreDoctor").val();
    let correoContacto = $("#correoContacto").val();
    let especialidad = $("#especialidad").val();
  
    let data = {
      id: idDoctor,
      nombre: nombre,
      correo_contacto: correoContacto,
      especialidad: especialidad
    };
  
    let dataToSend = JSON.stringify(data);
  
    $.ajax({    
      url: 'https://g2e4d2519403b08-reto15ciclo3g14.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
      type: 'PUT',
      data: dataToSend,
      contentType: 'application/json',
      success: function(response) {
        $("#idDoctor").val("");
        $("#nombreDoctor").val("");
        $("#correoContacto").val("");
        $("#especialidad").val("");
      },
      error: function(xhr, status) {
        // alert('Ha sucedido un problema');
      },
      complete: function() {
        leerDoctores();
      }
    });
  }
*/
router.put('/doctores/:id', (req, res) => {
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
  

router.delete('/doctores/:id', (req, res) => {
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
    
  // Ruta para obtener todos los pacientes
// Ruta para obtener todas las citas


module.exports = router;
function leerDoctores(){
    //FUNCION GET
        $.ajax({    
            url : 'http://localhost:3000/api/doctores',
            type : 'GET',
            dataType : 'json',
    
            success : function(doctores) {
                   let cs=doctores.items;
                   $("#listadoctores").empty();
                   for(i=0;i<cs.length;i++){
                       $("listadoctores").append(cs[i].id+" "+cs[i].nombre+" "+cs[i].apellido+" <b>"+cs[i].especialidad+"</b>"+cs[i].consultorio+"</b>"+cs[i].email);
                       $("#listadoctores").append("<button onclick='borrarDoctor("+cs[i].id+")'>Borrar</button><br>");
                   
                   }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema');
            }
        });
    }
function guardarDoctor() {
        let idDoctor=$("#idDoctor").val();
        let nombreDoctor=$("#nombreDoctor").val();
        let apellidoDoctor=$("#apellidoDoctor").val();
        let especialidadDoc=$("#especialidad").val();
        let consultorioDoctor=$("#consultorioDoctor").val();
        let emailDoctor=$("#emailDoctor").val();
        let data={
            id:idDoctor,
            nombre:nombreDoctor,
            apellido:apellidoDoctor,
            especialidad:especialidadDoc,
            consultorio:consultorioDoctor,
            email:emailDoctor
        };
    
        let dataToSend=JSON.stringify(data);
        //console.log(dataToSend);
    
    
        $.ajax({    
            url : 'http://localhost:3000/api/doctores',
            type : 'POST',
         //   dataType : 'json',
            data:dataToSend,
            contentType:'application/json',
            success : function(pepito) {
                   $("#idDoctor").val("");
                $("#nombreDoctor").val("");
                $("#apellidoDoctor").val("");
                $("#nombreCliente").val("");
                $("#especialidad").val("");
                $("#consultorioDoctor").val("");
                $("#emailDoctor").val("");
            },
            error : function(xhr, status) {
           //     alert('ha sucedido un problema');
            },
            complete: function(){
                leerClientes();
            }
        });
    
    
    }
function actualizarDoctor(idDoctor) {
        let nombreDoctor = $("#nombreDoctor").val();
        let apellidoDoctor = $("#apellidoDoctor").val();
        let especialidadDoc = $("#especialidad").val();
        let consultorioDoctor = $("#consultorioDoctor").val();
        let emailDoctor = $("#emailDoctor").val();
        let data = {
          nombre: nombreDoctor,
          apellido: apellidoDoctor,
          especialidad: especialidadDoc,
          consultorio: consultorioDoctor,
          email: emailDoctor
        };
      
        let dataToSend = JSON.stringify(data);
      
        $.ajax({
          url: 'http://localhost:3000/api/doctores/' + idDoctor,
          type: 'PUT',
          data: dataToSend,
          contentType: 'application/json',
          success: function(response) {
            $("#idDoctor").val("");
            $("#nombreDoctor").val("");
            $("#apellidoDoctor").val("");
            $("#nombreCliente").val("");
            $("#especialidad").val("");
            $("#consultorioDoctor").val("");
            $("#emailDoctor").val("");
            // Realizar alguna acción después de la actualización exitosa
          },
          error: function(xhr, status) {
            // Manejar el error en caso de fallo en la actualización
          },
          complete: function() {
            leerDoctores();
          }
        });
    }      
function eliminarDoctor(idDoctor) {
  $.ajax({
    url: 'http://localhost:3000/api/doctores/' + idDoctor,
    type: 'DELETE',
    success: function(response) {
      // Realizar alguna acción después de la eliminación exitosa
    },
    error: function(xhr, status) {
      // Manejar el error en caso de fallo en la eliminación
    },
    complete: function() {
      leerDoctores();
    }
  });
    }
   
function leerPacientes() {
      $.ajax({
        url: 'http://localhost:3000/api/pacientes',
        type: 'GET',
        dataType: 'json',
        success: function(pacientes) {
          let cs = pacientes.items;
          $("#listapacientes").empty();
          for (i = 0; i < cs.length; i++) {
            $("#listapacientes").append(cs[i].id + " " + cs[i].nombre + " " + cs[i].apellido + " <b>" + cs[i].cedula + "</b> " + cs[i].edad + " " + cs[i].telefono);
            $("#listapacientes").append("<button onclick='borrarPacientes(" + cs[i].id + ")'>Borrar</button><br>");
          }
        },
        error: function(xhr, status) {
          alert('Ha ocurrido un problema al obtener los pacientes');
        }
      });
    }
function guardarPacientes() {
      let idPaciente = $("#idPaciente").val();
      let cedulaPaciente = $("#cedulaPaciente").val();
      let nombrePaciente = $("#nombrePaciente").val();
      let apellidoPaciente = $("#apellidoPaciente").val();
      let edadPaciente = $("#edadPaciente").val();
      let telefonoPaciente = $("#telefonoPaciente").val();
      
      let data = {
        id: idPaciente,
        cedula: cedulaPaciente,
        nombre: nombrePaciente,
        apellido: apellidoPaciente,
        edad: edadPaciente,
        telefono: telefonoPaciente
      };
    
      let dataToSend = JSON.stringify(data);
    
      $.ajax({
        url: 'http://localhost:3000/api/pacientes',
        type: 'POST',
        data: dataToSend,
        contentType: 'application/json',
        success: function(response) {
          $("#idPaciente").val("");
          $("#cedulaPaciente").val("");
          $("#nombrePaciente").val("");
          $("#apellidoPaciente").val("");
          $("#edadPaciente").val("");
          $("#telefonoPaciente").val("");
        },
        error: function(xhr, status) {
          // Manejar el error en caso de fallo en la guardado
        },
        complete: function() {
          leerPaciente();
        }
      });
    }
    
function actualizarPacientes(idPaciente) {
      let cedulaPaciente = $("#cedulaPaciente").val();
      let nombrePaciente = $("#nombrePaciente").val();
      let apellidoPaciente = $("#apellidoPaciente").val();
      let edadPaciente = $("#edadPaciente").val();
      let telefonoPaciente = $("#telefonoPaciente").val();
    
      let data = {
        cedula: cedulaPaciente,
        nombre: nombrePaciente,
        apellido: apellidoPaciente,
        edad: edadPaciente,
        telefono: telefonoPaciente
      };
    
      let dataToSend = JSON.stringify(data);
    
      $.ajax({
        url: 'http://localhost:3000/api/pacientes/' + idPaciente,
        type: 'PUT',
        data: dataToSend,
        contentType: 'application/json',
        success: function(response) {
          $("#idPaciente").val("");
          $("#cedulaPaciente").val("");
          $("#nombrePaciente").val("");
          $("#apellidoPaciente").val("");
          $("#edadPaciente").val("");
          $("#telefonoPaciente").val("");
          // Realizar alguna acción después de la actualización exitosa
        },
        error: function(xhr, status) {
          // Manejar el error en caso de fallo en la actualización
        },
        complete: function() {
          leerPaciente();
        }
      });
    }
function eliminarPacientes(idPaciente) {
        $.ajax({
          url: 'http://localhost:3000/api/pacientes/' + idPaciente,
          type: 'DELETE',
          success: function(response) {
            // Realizar alguna acción después de la eliminación exitosa
          },
          error: function(xhr, status) {
            // Manejar el error en caso de fallo en la eliminación
          },
          complete: function() {
            leerPaciente();
          }
        });
    }
function leerCitas() {
        $.ajax({
          url: 'http://localhost:3000/api/citas',
          type: 'GET',
          dataType: 'json',
          success: function(citas) {
            let cs = citas.items;
            $("#listaCitas").empty();
            for (i = 0; i < cs.length; i++) {
              $("#listaCitas").append(cs[i].cita_id + " " + cs[i].doctor_id + " " + cs[i].paciente_id + " <b>" + cs[i].especialidad_id + "</b>");
              $("#listaCitas").append("<button onclick='borrarCita(" + cs[i].cita_id + ")'>Borrar</button><br>");
            }
          },
          error: function(xhr, status) {
            alert('Ha ocurrido un problema al obtener las citas');
          }
        });
      }
      
function guardarCitas() {
        let idCitas = $("#idCitas").val();
        let idDoctor = $("#idDoctor").val();
        let idPaciente = $("#idPaciente").val();
        let especialidad = $("#especialidad").val();
      
        let data = {
          doctorId: idDoctor,
          pacienteId: idPaciente,
          especialidadId: especialidad
        };
      
        let dataToSend = JSON.stringify(data);
      
        $.ajax({
          url: 'http://localhost:3000/api/citas',
          type: 'POST',
          data: dataToSend,
          contentType: 'application/json',
          success: function(response) {
            $("#idCitas").val("");
            $("#idDoctor").val("");
            $("#idPaciente").val("");
            $("#especialidad").val("");
          },
          error: function(xhr, status) {
            // Manejar el error en caso de fallo en la guardado
          },
          complete: function() {
            leerCitas();
          }
        });
      }
      
function actualizarCitas(idCitas) {
        let idDoctor = $("#idDoctor").val();
        let idPaciente = $("#idPaciente").val();
        let especialidad = $("#especialidad").val();
      
        let data = {
          doctorId: idDoctor,
          pacienteId: idPaciente,
          especialidadId: especialidad
        };
      
        let dataToSend = JSON.stringify(data);
      
        $.ajax({
          url: 'http://localhost:3000/api/citas/' + idCitas,
          type: 'PUT',
          data: dataToSend,
          contentType: 'application/json',
          success: function(response) {
            $("#idCitas").val("");
            $("#idDoctor").val("");
            $("#idPaciente").val("");
            $("#especialidad").val("");
            // Realizar alguna acción después de la actualización exitosa
          },
          error: function(xhr, status) {
            // Manejar el error en caso de fallo en la actualización
          },
          complete: function() {
            leerCitas();
          }
        });
      }
      
function eliminarCitas(idCitas) {
        $.ajax({
          url: 'http://localhost:3000/api/citas/' + idCitas,
          type: 'DELETE',
          success: function(response) {
            // Realizar alguna acción después de la eliminación exitosa
          },
          error: function(xhr, status) {
            // Manejar el error en caso de fallo en la eliminación
          },
          complete: function() {
            leerCitas();
          }
        });
      }
      

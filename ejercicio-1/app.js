const fs = require('fs');
const path = require('path');
const dni = process.argv[2]; 

if (!dni) {
  console.error('Por favor, proporciona un DNI como argumento.');
  process.exit(1); 
}

/** Leer README */
/**const filePath = path.join(__dirname, 'hacienda.json');
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
  
      console.log(jsonData);
    } catch (parseErr) {
      console.error('Error al parsear el archivo JSON:', parseErr);
    }
  });
*/
 /** const filePath = path.join(__dirname, 'hacienda.json');
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
  
      jsonData.forEach(element => {console.log(element.nombre);
        
      });

    } catch (parseErr) {
      console.error('Error al parsear el archivo JSON:', parseErr);
    }
  });
*/ 
const filePath = path.join(__dirname, 'hacienda.json');
const notificacionesPath = path.join(__dirname, 'notificaciones.txt');

fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
  
    try {
      const jsonData = JSON.parse(data);
  
      const contribuyente = jsonData.find(item => item.dni === dni);
  
      if (contribuyente) {
        let mensaje = '';
        if (contribuyente.notificacionesPendientes === true) {
          mensaje = `${contribuyente.nombre} tiene notificaciones pendientes con Hacienda. Se enviará un email a ${contribuyente.email}\n`;
          console.log(mensaje.trim());
        } else {
          mensaje = `${contribuyente.nombre} NO tiene notificaciones pendientes con Hacienda.\n`;
          console.log(mensaje.trim());
        }

        fs.appendFile(notificacionesPath, mensaje, (err) => {
            if (err) {
              console.error('Error al guardar la notificación en el archivo:', err);
            } else {
              console.log('Notificación guardada en notificaciones.txt');
            }
          });

      } else {
        console.log(`No se encontró ningún contribuyente con el DNI: ${dni}`);
      }
  
    } catch (parseErr) {
      console.error('Error al parsear el archivo JSON:', parseErr);
    }
  });
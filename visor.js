const fileId = "SU_FILE_ID_DE_DRIVE";
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

// Solicitar el archivo ChordPro
fetch(url)
  .then(response => response.text())   // obtener el texto del cuerpo
  .then(chordProText => {
    // Aquí tendremos el contenido del archivo ChordPro en la variable chordProText.
    // Ahora lo parsearemos y mostraremos (siguiente paso).
  })
  .catch(error => {
    console.error("Error cargando el archivo ChordPro:", error);
  });


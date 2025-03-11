const fileId = "11UygAAguuZH0e4VibxfsbAMyFOdDYH-B";
const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

fetch(url)
  .then(response => response.text())
  .then(chordProText => {
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(chordProText);
    const formatter = new ChordSheetJS.HtmlDivFormatter();
    const songHtml = formatter.format(song);

    const viewer = document.getElementById("chordProViewer");
    viewer.innerHTML = "";
    viewer.appendChild(songHtml);
  })
  .catch(error => console.error("Error cargando el archivo ChordPro:", error));

// Alternar notación (Español/Inglés)
const notasEsp = { "C": "Do", "D": "Re", "E": "Mi", "F": "Fa", "G": "Sol", "A": "La", "B": "Si" };
const notasIng = { "Do": "C", "Re": "D", "Mi": "E", "Fa": "F", "Sol": "G", "La": "A", "Si": "B" };

document.getElementById("langSelect").addEventListener("change", (e) => {
  const idioma = e.target.value;
  document.querySelectorAll(".chord").forEach(span => {
    let txt = span.textContent;
    span.textContent = idioma === "es" ? (notasEsp[txt] || txt) : (notasIng[txt] || txt);
  });
});

// Alternar sostenidos/bemoles
document.getElementById("accSelect").addEventListener("change", (e) => {
  const preferFlat = e.target.value === "flat";
  document.querySelectorAll(".chord").forEach(span => {
    let acorde = ChordSheetJS.Chord.parse(span.textContent);
    acorde = acorde.useModifier(preferFlat ? 'b' : '#');
    span.textContent = acorde.toString();
  });
});

// Transposición de tono
function transponer(semitonos) {
  document.querySelectorAll(".chord").forEach(span => {
    let acorde = ChordSheetJS.Chord.parse(span.textContent);
    acorde = acorde.transpose(semitonos);
    span.textContent = acorde.toString();
  });
}

document.getElementById("btnTransposeUp").addEventListener("click", () => transponer(1));
document.getElementById("btnTransposeDown").addEventListener("click", () => transponer(-1));

// Ajustar tamaño de fuente
let fontSize = 1;
document.getElementById("btnFontInc").addEventListener("click", () => {
  fontSize *= 1.1;
  document.getElementById("chordProViewer").style.fontSize = fontSize + "em";
});
document.getElementById("btnFontDec").addEventListener("click", () => {
  fontSize *= 0.9;
  document.getElementById("chordProViewer").style.fontSize = fontSize + "em";
});

// Descargar PDF
document.getElementById("btnDownloadPdf").addEventListener("click", () => {
  const element = document.getElementById("chordProViewer");
  html2pdf().from(element).save("cancion.pdf");
});

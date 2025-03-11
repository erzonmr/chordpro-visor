document.addEventListener("DOMContentLoaded", () => {
    const viewer = document.getElementById("chordProViewer");
    const fileId = viewer.getAttribute("data-fileid"); // Obtener el ID del atributo HTML

    if (!fileId) {
        console.error("No se encontró el ID del archivo en el HTML.");
        return;
    }

    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

    fetch(url)
        .then(response => response.text())
        .then(chordProText => {
            const parser = new ChordSheetJS.ChordProParser();
            const song = parser.parse(chordProText);
            const formatter = new ChordSheetJS.HtmlDivFormatter();
            const songHtml = formatter.format(song);
            
            viewer.innerHTML = "";
            viewer.appendChild(songHtml);
        })
        .catch(error => console.error("Error cargando el archivo ChordPro:", error));
});

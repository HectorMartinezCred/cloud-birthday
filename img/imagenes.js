const IMAGENES_COLECCION = [
    ...IMAGENES_1,
    ...IMAGENES_2,
    ...IMAGENES_3,
    ...IMAGENES_4,
    ...IMAGENES_5,
    ...IMAGENES_6,
];

// ===== CARGADOR DE FOTOS (desde datos base64) =====
const cuadriculaCollage = document.getElementById("collage-grid");

// Patron de diseño que se repite: da variedad visual a la cuadricula
const PATRON_DISENO = [
    "collage-item--large",  // 1ra: grande (2x2)
    "",                     // 2da: normal
    "",                     // 3ra: normal
    "collage-item--tall",   // 4ta: alta (1x2)
    "collage-item--wide",   // 5ta: ancha (2x1)
    "",                     // 6ta: normal
    "",                     // 7ma: normal
    "collage-item--wide",   // 8va: ancha (2x1)
];

/**
 * Carga todas las imágenes desde el arreglo base64 IMAGENES_COLECCION.
 * Solo agrega una nueva entrada en images-data.js para añadir mas fotos.
 */
function cargarImagenesCollage() {
    if (typeof IMAGENES_COLECCION === "undefined" || !IMAGENES_COLECCION.length) return;

    IMAGENES_COLECCION.forEach((src, i) => {
        const claseDiseno = PATRON_DISENO[i % PATRON_DISENO.length];

        const elemento = document.createElement("div");
        elemento.className = `collage-item ${claseDiseno}`.trim();
        elemento.id = `foto-${i + 1}`;
        elemento.style.animationDelay = `${(i + 1) * 0.1}s`;

        const img = document.createElement("img");
        img.src = src;
        img.alt = `Foto especial ${i + 1}`;
        img.style.cursor = "zoom-in";
        img.loading = "lazy";

        // Abrir caja de luz al hacer clic
        img.addEventListener("click", () => {
            cajaLuzImg.src = img.src;
            cajaLuzImg.alt = img.alt;
            cajaLuz.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        });

        elemento.appendChild(img);
        cuadriculaCollage.appendChild(elemento);
    });
}
cargarImagenesCollage();
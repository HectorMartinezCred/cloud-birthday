const IMAGENES_COLECCION = [
    ...IMAGENES_1,
    ...IMAGENES_2,
    ...IMAGENES_3,
    ...IMAGENES_4,
    ...IMAGENES_5,
    ...IMAGENES_6,
];

// ===== REFERENCIAS DE LA CAJA DE LUZ =====
const cajaLuz = document.getElementById("lightbox");
const cajaLuzImg = document.getElementById("lightbox-img");
const cajaLuzCerrar = document.getElementById("lightbox-close");
const botonAnterior = document.getElementById("lightbox-prev");
const botonSiguiente = document.getElementById("lightbox-next");

// Indice actual de la imagen mostrada en la caja de luz
let indiceActual = 0;
const totalImagenes = IMAGENES_COLECCION.length;

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
 * Solo agrega una nueva entrada en los archivos data para añadir mas fotos.
 */
function cargarImagenesCollage() {
    if (!IMAGENES_COLECCION.length) return;

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
            abrirCajaLuz(i);
        });

        elemento.appendChild(img);
        cuadriculaCollage.appendChild(elemento);
    });
}

// ===== CAJA DE LUZ CON NAVEGACION =====
function abrirCajaLuz(indice) {
    indiceActual = indice;
    mostrarImagenActual();
    cajaLuz.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function mostrarImagenActual() {
    cajaLuzImg.src = IMAGENES_COLECCION[indiceActual];
    cajaLuzImg.alt = `Foto especial ${indiceActual + 1}`;
    // Animacion sutil al cambiar de imagen
    cajaLuzImg.style.animation = "none";
    // Forzar reflow para reiniciar la animacion
    void cajaLuzImg.offsetWidth;
    cajaLuzImg.style.animation = "lightbox-zoom 0.3s ease-out";
}

function imagenAnterior() {
    indiceActual = (indiceActual - 1 + totalImagenes) % totalImagenes;
    mostrarImagenActual();
}

function imagenSiguiente() {
    indiceActual = (indiceActual + 1) % totalImagenes;
    mostrarImagenActual();
}

function cerrarCajaLuz() {
    cajaLuz.classList.add("hidden");
    document.body.style.overflow = "";
}

function iniciarCajaLuz() {
    // Cerrar al hacer clic en el fondo
    cajaLuz.addEventListener("click", (e) => {
        if (e.target === cajaLuz) cerrarCajaLuz();
    });

    // Boton de cerrar
    cajaLuzCerrar.addEventListener("click", cerrarCajaLuz);

    // Botones de navegacion
    botonAnterior.addEventListener("click", (e) => {
        e.stopPropagation();
        imagenAnterior();
    });

    botonSiguiente.addEventListener("click", (e) => {
        e.stopPropagation();
        imagenSiguiente();
    });

    // Navegacion con teclado
    document.addEventListener("keydown", (e) => {
        if (cajaLuz.classList.contains("hidden")) return;

        switch (e.key) {
            case "Escape":
                cerrarCajaLuz();
                break;
            case "ArrowLeft":
                imagenAnterior();
                break;
            case "ArrowRight":
                imagenSiguiente();
                break;
        }
    });
}

cargarImagenesCollage();
iniciarCajaLuz();
/* ================================================
   PAGINA DE CUMPLEAÑOS PARA CALDO
   ================================================ */

(() => {
  "use strict";

  // ===== CONFIGURACIÓN =====
  // Objetivo: 15 de Junio de 2026 a las 12:00 AM GMT-6
  const FECHA_OBJETIVO = new Date("2026-06-10T12:03:00-06:00");

  // ===== REFERENCIAS AL DOM =====
  const vistaCuentaRegresiva = document.getElementById("countdown-view");
  const vistaCumpleanios = document.getElementById("birthday-view");
  const seccionCollage = document.getElementById("collage-section");
  const seccionDeseos = document.getElementById("wishes-section");
  const piePagina = document.getElementById("birthday-footer");
  const temporizadorDias = document.querySelector("#timer-days .timer-value");
  const temporizadorHoras = document.querySelector("#timer-hours .timer-value");
  const temporizadorMinutos = document.querySelector("#timer-minutes .timer-value");
  const temporizadorSegundos = document.querySelector("#timer-seconds .timer-value");
  const canvasEspacio = document.getElementById("space-canvas");
  const canvasConfeti = document.getElementById("confetti-canvas");
  const cajaLuz = document.getElementById("lightbox");
  const cajaLuzImg = document.getElementById("lightbox-img");
  const cajaLuzCerrar = document.getElementById("lightbox-close");

  // ===== LÓGICA DE CUENTA REGRESIVA =====
  let intervaloCuentaRegresiva = null;

  function rellenarCeros(n) {
    return String(n).padStart(2, "0");
  }

  function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferencia = FECHA_OBJETIVO - ahora;

    if (diferencia <= 0) {
      clearInterval(intervaloCuentaRegresiva);
      mostrarCumpleanios();
      return;
    }

    const totalSegundos = Math.floor(diferencia / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    animarValor(temporizadorDias, rellenarCeros(dias));
    animarValor(temporizadorHoras, rellenarCeros(horas));
    animarValor(temporizadorMinutos, rellenarCeros(minutos));
    animarValor(temporizadorSegundos, rellenarCeros(segundos));
  }

  function animarValor(elemento, nuevoValor) {
    if (elemento.textContent !== nuevoValor) {
      elemento.style.transform = "scale(1.15)";
      elemento.textContent = nuevoValor;
      setTimeout(() => {
        elemento.style.transform = "scale(1)";
      }, 150);
    }
  }

  function mostrarCumpleanios() {
    vistaCuentaRegresiva.classList.add("hidden");
    vistaCumpleanios.classList.remove("hidden");
    // Mostrar colección, deseos y pie de pagina después del cumpleaños
    seccionCollage.classList.remove("hidden");
    seccionDeseos.classList.remove("hidden");
    piePagina.classList.remove("hidden");
    animarLetras();
    iniciarConfeti();
  }

  function inicializar() {
    const ahora = new Date();
    if (ahora >= FECHA_OBJETIVO) {
      mostrarCumpleanios();
    } else {
      vistaCumpleanios.classList.add("hidden");
      seccionCollage.classList.add("hidden");
      seccionDeseos.classList.add("hidden");
      piePagina.classList.add("hidden");
      vistaCuentaRegresiva.classList.remove("hidden");
      actualizarCuentaRegresiva();
      intervaloCuentaRegresiva = setInterval(actualizarCuentaRegresiva, 1000);
    }
  }

  // ===== ANIMACIÓN ESCALONADA DE LETRAS =====
  function animarLetras() {
    const letras = document.querySelectorAll(".letter-animate");
    letras.forEach((letra, i) => {
      letra.style.animationDelay = `${0.4 + i * 0.06}s`;
    });
  }

  // ===== FONDO ESPACIAL =====
  function iniciarEspacio() {
    const ctx = canvasEspacio.getContext("2d");
    let ancho, alto;

    // Capas de estrellas
    const estrellasLejanas = [];   // distantes, pequeñas, parpadeo lento
    const estrellasMedias = [];    // medianas
    const estrellasCercanas = [];  // cercanas, mas brillantes
    const estrellasFugaces = [];

    // Cuerpos celestes
    let luna = {};
    const nebulosas = [];

    function redimensionar() {
      ancho = canvasEspacio.width = window.innerWidth;
      alto = canvasEspacio.height = window.innerHeight;
      // Reiniciar posición de la luna al redimensionar
      luna = {
        x: ancho * 0.85,
        y: alto * 0.12,
        r: Math.min(ancho, alto) * 0.04,
      };
    }

    redimensionar();
    window.addEventListener("resize", redimensionar);

    // --- Generar Estrellas ---
    function crearEstrellas(arreglo, cantidad, radioMin, radioMax) {
      for (let i = 0; i < cantidad; i++) {
        arreglo.push({
          x: Math.random() * ancho,
          y: Math.random() * alto,
          r: Math.random() * (radioMax - radioMin) + radioMin,
          opacidadBase: Math.random() * 0.6 + 0.2,
          velocidadParpadeo: Math.random() * 0.02 + 0.005,
          desfaseParpadeo: Math.random() * Math.PI * 2,
          tono: Math.random() < 0.15 ? (Math.random() * 40 + 190) : 0, // 15% con tinte azul
          saturacion: Math.random() < 0.15 ? 40 : 0,
        });
      }
    }

    crearEstrellas(estrellasLejanas, 200, 0.3, 0.8);
    crearEstrellas(estrellasMedias, 80, 0.8, 1.4);
    crearEstrellas(estrellasCercanas, 30, 1.4, 2.2);

    // --- Resplandores de Nebulosa (nubes de color sutiles) ---
    for (let i = 0; i < 3; i++) {
      nebulosas.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        r: Math.random() * 200 + 150,
        tono: Math.random() * 40 + 195, // rango azul-cían
        opacidad: Math.random() * 0.025 + 0.01,
      });
    }

    // --- Fabrica de Estrellas Fugaces ---
    function crearEstrellaFugaz() {
      estrellasFugaces.push({
        x: Math.random() * ancho * 0.8,
        y: Math.random() * alto * 0.4,
        longitud: Math.random() * 80 + 60,
        velocidad: Math.random() * 6 + 4,
        angulo: (Math.random() * 20 + 20) * (Math.PI / 180), // 20-40 grados
        opacidad: 1,
        vida: 0,
        vidaMaxima: Math.random() * 40 + 30,
      });
    }

    // --- Funciones de Dibujo ---
    function dibujarCapaEstrellas(estrellas, tiempo) {
      for (const s of estrellas) {
        const parpadeo = Math.sin(tiempo * s.velocidadParpadeo + s.desfaseParpadeo);
        const opacidad = s.opacidadBase + parpadeo * 0.25;
        if (opacidad <= 0) continue;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

        if (s.tono > 0) {
          ctx.fillStyle = `hsla(${s.tono}, ${s.saturacion}%, 85%, ${opacidad})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacidad})`;
        }
        ctx.fill();

        // Brillo para estrellas cercanas
        if (s.r > 1.4) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
          grad.addColorStop(0, `rgba(180, 220, 255, ${opacidad * 0.15})`);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }
    }

    function dibujarLuna() {
      // Resplandor exterior
      const gradResplandor = ctx.createRadialGradient(luna.x, luna.y, luna.r * 0.5, luna.x, luna.y, luna.r * 4);
      gradResplandor.addColorStop(0, "rgba(180, 210, 240, 0.06)");
      gradResplandor.addColorStop(0.5, "rgba(140, 180, 220, 0.02)");
      gradResplandor.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(luna.x, luna.y, luna.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradResplandor;
      ctx.fill();

      // Cuerpo de la luna
      const gradLuna = ctx.createRadialGradient(
        luna.x - luna.r * 0.3, luna.y - luna.r * 0.3, luna.r * 0.1,
        luna.x, luna.y, luna.r
      );
      gradLuna.addColorStop(0, "rgba(220, 235, 250, 0.25)");
      gradLuna.addColorStop(0.7, "rgba(180, 200, 225, 0.15)");
      gradLuna.addColorStop(1, "rgba(140, 170, 200, 0.08)");
      ctx.beginPath();
      ctx.arc(luna.x, luna.y, luna.r, 0, Math.PI * 2);
      ctx.fillStyle = gradLuna;
      ctx.fill();

      // Sombra creciente (forma de luna creciente)
      ctx.beginPath();
      ctx.arc(luna.x + luna.r * 0.35, luna.y - luna.r * 0.1, luna.r * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(3, 13, 26, 0.8)";
      ctx.fill();
    }

    function dibujarNebulosas() {
      for (const n of nebulosas) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        grad.addColorStop(0, `hsla(${n.tono}, 60%, 50%, ${n.opacidad})`);
        grad.addColorStop(0.6, `hsla(${n.tono}, 40%, 30%, ${n.opacidad * 0.4})`);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    function dibujarEstrellasFugaces() {
      for (let i = estrellasFugaces.length - 1; i >= 0; i--) {
        const s = estrellasFugaces[i];
        s.vida++;

        // Mover
        s.x += Math.cos(s.angulo) * s.velocidad;
        s.y += Math.sin(s.angulo) * s.velocidad;

        // Desvanecer
        const progreso = s.vida / s.vidaMaxima;
        s.opacidad = 1 - progreso;

        if (s.vida >= s.vidaMaxima) {
          estrellasFugaces.splice(i, 1);
          continue;
        }

        // Estela
        const colaX = s.x - Math.cos(s.angulo) * s.longitud * s.opacidad;
        const colaY = s.y - Math.sin(s.angulo) * s.longitud * s.opacidad;

        const grad = ctx.createLinearGradient(colaX, colaY, s.x, s.y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.7, `rgba(180, 220, 255, ${s.opacidad * 0.4})`);
        grad.addColorStop(1, `rgba(220, 240, 255, ${s.opacidad * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(colaX, colaY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Brillo de la cabeza
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${s.opacidad})`;
        ctx.fill();
      }
    }

    // --- Bucle Principal ---
    let cuadro = 0;

    function animar() {
      cuadro++;
      ctx.clearRect(0, 0, ancho, alto);

      // Fondo de nebulosas
      dibujarNebulosas();

      // Luna
      dibujarLuna();

      // Capas de estrellas
      dibujarCapaEstrellas(estrellasLejanas, cuadro);
      dibujarCapaEstrellas(estrellasMedias, cuadro);
      dibujarCapaEstrellas(estrellasCercanas, cuadro);

      // Estrellas fugaces
      dibujarEstrellasFugaces();

      // Generar estrella fugaz aleatoriamente (~cada 3-5 segundos)
      if (Math.random() < 0.005) {
        crearEstrellaFugaz();
      }

      requestAnimationFrame(animar);
    }

    animar();
  }

  // ===== CONFETI =====
  function iniciarConfeti() {
    if (!canvasConfeti) return;

    const ctx = canvasConfeti.getContext("2d");
    let ancho, alto;
    const confeti = [];
    const CANTIDAD_CONFETI = 150;
    const colores = [
      "#38bdf8", "#5cc8f0", "#67e8f9", "#7dd3fc",
      "#a5f3fc", "#bae6fd", "#e0f2fe", "#22d3ee",
    ];

    function redimensionar() {
      ancho = canvasConfeti.width = window.innerWidth;
      alto = canvasConfeti.height = window.innerHeight;
    }

    redimensionar();
    window.addEventListener("resize", redimensionar);

    for (let i = 0; i < CANTIDAD_CONFETI; i++) {
      confeti.push({
        x: Math.random() * ancho,
        y: Math.random() * alto - alto,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colores[Math.floor(Math.random() * colores.length)],
        rotacion: Math.random() * 360,
        velocidadRotacion: (Math.random() - 0.5) * 8,
        dx: (Math.random() - 0.5) * 2,
        dy: Math.random() * 3 + 2,
        opacidad: 1,
        onda: Math.random() * Math.PI * 2,
      });
    }

    let contadorCuadros = 0;

    function dibujarConfeti() {
      ctx.clearRect(0, 0, ancho, alto);
      contadorCuadros++;

      for (const c of confeti) {
        c.y += c.dy;
        c.x += c.dx + Math.sin(c.onda + contadorCuadros * 0.02) * 0.5;
        c.rotacion += c.velocidadRotacion;

        if (c.y > alto * 0.85) {
          c.opacidad = Math.max(0, 1 - (c.y - alto * 0.85) / (alto * 0.15));
        }

        if (c.y > alto + 20) {
          c.y = -20;
          c.x = Math.random() * ancho;
          c.opacidad = 1;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotacion * Math.PI) / 180);
        ctx.globalAlpha = c.opacidad;
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
        ctx.restore();
      }

      if (contadorCuadros < 720) {
        requestAnimationFrame(dibujarConfeti);
      } else {
        ctx.clearRect(0, 0, ancho, alto);
      }
    }

    dibujarConfeti();
  }

  // ===== CAJA DE LUZ =====
  function iniciarCajaLuz() {
    // Cerrar al hacer clic en el fondo
    cajaLuz.addEventListener("click", (e) => {
      if (e.target === cajaLuz) cerrarCajaLuz();
    });

    // Boton de cerrar
    cajaLuzCerrar.addEventListener("click", cerrarCajaLuz);

    // Cerrar con tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !cajaLuz.classList.contains("hidden")) {
        cerrarCajaLuz();
      }
    });
  }

  function cerrarCajaLuz() {
    cajaLuz.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // ===== INICIO =====
  iniciarEspacio();
  iniciarCajaLuz();
  inicializar();
})();

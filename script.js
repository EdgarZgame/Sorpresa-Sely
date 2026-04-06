// 1. Lógica de la barra de carga (Loader)
let progreso = 0;
const barra = document.getElementById("progreso");
const texto = document.getElementById("porcentaje");
const loader = document.getElementById("loader");
const mainContainer = document.getElementById("main");

const intervalo = setInterval(() => {
  progreso++;
  barra.style.width = progreso + "%";
  texto.innerText = progreso + "%";

  if (progreso >= 100) {
    clearInterval(intervalo);
    loader.style.display = "none";
    mainContainer.style.display = "flex"; 
  }
}, 30);

// 2. Selección de elementos
const btnAbrir = document.getElementById("btn-abrir");
const btnCerrar = document.getElementById("btn-cerrar");
const sobreWrapper = document.getElementById("sobre-wrapper");

// 3. Función para el Confeti (Requiere la librería canvas-confetti)
function lanzarConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb6c1', '#ffffff']
    });
  }
}

// 4. Lógica para ABRIR la carta
btnAbrir.addEventListener("click", () => {
  // Ocultar botón inicial instantáneamente
  btnAbrir.style.opacity = "0";
  btnAbrir.style.pointerEvents = "none";
  
  // Mostrar contenedor del sobre
  sobreWrapper.style.display = "block"; 
  
  // Paso 1: Abrir solapa y lanzar confeti
  setTimeout(() => {
    sobreWrapper.classList.add("abrir");
    lanzarConfetti();
  }, 100);

  // Paso 2: La carta asoma del sobre
  setTimeout(() => {
    sobreWrapper.classList.add("subiendo");
  }, 600); 

  // Paso 3: La carta se expande a pantalla completa y oculta el título de fondo
  setTimeout(() => {
    sobreWrapper.classList.add("expandir"); 
    mainContainer.classList.add("abierta"); 
  }, 1400); 
});

// 5. Lógica para CERRAR la carta (Reset completo)
btnCerrar.addEventListener("click", () => {
  // Paso 1: Quitar expansión (vuelve al sobre)
  sobreWrapper.classList.remove("expandir");
  
  // Paso 2: La carta entra de nuevo al sobre
  setTimeout(() => {
    sobreWrapper.classList.remove("subiendo");
  }, 400);

  // Paso 3: Cerrar solapa y volver a mostrar el botón de "Abrir"
  setTimeout(() => {
    sobreWrapper.classList.remove("abrir");
    mainContainer.classList.remove("abierta");
    
    // El botón abrir vuelve a ser funcional y visible
    btnAbrir.style.opacity = "1";
    btnAbrir.style.pointerEvents = "auto";
  }, 1000);
});
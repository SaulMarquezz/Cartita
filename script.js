// Variables globales
let isMusicPlaying = false;
let photosVisible = false;
const audio = document.getElementById('backgroundMusic');
const heartsContainer = document.getElementById('heartsContainer');
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const letterBackdrop = document.getElementById('letterBackdrop');
const photosCollage = document.getElementById('photosCollage');

// Crear corazones flotantes
function createHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${5 + Math.random() * 5}s`;
        heartsContainer.appendChild(heart);
    }
}

// Control de música
function toggleMusic() {
    if (isMusicPlaying) {
        audio.pause();
        document.querySelector('.music-toggle').textContent = '🎵 Música';
    } else {
        audio.play().catch(e => {
            console.log("Error reproduciendo audio:", e);
        });
        document.querySelector('.music-toggle').textContent = '🔇 Silenciar';
    }
    isMusicPlaying = !isMusicPlaying;
}

// Control de fotos
function togglePhotos() {
    photosVisible = !photosVisible;
    photosCollage.classList.toggle('active');
    document.querySelector('.photos-toggle').textContent = photosVisible ? '👁️ Ocultar Fotos' : '🖼️ Mostrar Fotos';
}

// Control de la carta - ABRIR
function openLetter() {
    letter.classList.add('open');
    letterBackdrop.classList.add('open');
    document.getElementById('clickMessage').textContent = 'Cerrar Carta';
}

// Control de la carta - CERRAR
function closeLetter() {
    letter.classList.remove('open');
    letterBackdrop.classList.remove('open');
    document.getElementById('clickMessage').textContent = '¡Abre la Carta!';
}

// Control de la carta - TOGGLE
function toggleLetter() {
    if (letter.classList.contains('open')) {
        closeLetter();
    } else {
        openLetter();
    }
}

// Cerrar carta al hacer clic en el fondo O en la carta misma
letterBackdrop.addEventListener('click', closeLetter);
letter.addEventListener('click', function(e) {
    // Prevenir que el clic se propague al backdrop
    e.stopPropagation();
    closeLetter();
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    envelope.addEventListener('click', openLetter);
    
    // Configurar música
    audio.volume = 0.7;
    
    // Intentar reproducir música automáticamente
    setTimeout(() => {
        if (!isMusicPlaying) {
            audio.play().then(() => {
                isMusicPlaying = true;
                document.querySelector('.music-toggle').textContent = '🔇 Silenciar';
            }).catch(e => {
                console.log("La reproducción automática fue bloqueada.");
            });
        }
    }, 1000);
});
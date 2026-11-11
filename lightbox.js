const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close">✕</button>
    <img src="" alt="" draggable="false">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

let isLightboxZoomed = false;
let isDragging = false;
let hasDragged = false;
let dragStartX = 0;
let dragStartY = 0;
let imgTranslateX = 0;
let imgTranslateY = 0;
let startTouchX = 0;
let startTouchY = 0;

function updateImgTransform() {
    if (isLightboxZoomed) {
        lightboxImg.style.transform = `translate(${imgTranslateX}px, ${imgTranslateY}px) scale(2)`;
    } else {
        lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
    }
}

function handleStart(e) {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    startTouchX = clientX;
    startTouchY = clientY;
    hasDragged = false;
    
    if (isLightboxZoomed) {
        isDragging = true;
        lightboxImg.style.transition = 'none';
        dragStartX = clientX - imgTranslateX;
        dragStartY = clientY - imgTranslateY;
    }
}

function handleMove(e) {
    if (!isDragging) return;
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    if (Math.abs(clientX - startTouchX) > 5 || Math.abs(clientY - startTouchY) > 5) {
        hasDragged = true;
    }
    
    imgTranslateX = clientX - dragStartX;
    imgTranslateY = clientY - dragStartY;
    updateImgTransform();
    
    if (e.type === 'touchmove') {
        e.preventDefault();
    }
}

function handleEnd(e) {
    if (isDragging) {
        isDragging = false;
        lightboxImg.style.transition = 'transform 0.3s ease';
    }
    
    if (!hasDragged) {
        let clientX, clientY;
        if (e.type === 'touchend') {
            if (e.changedTouches && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = startTouchX;
                clientY = startTouchY;
            }
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        if (!isLightboxZoomed) {
            const rect = lightboxImg.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            
            imgTranslateX = cx - x;
            imgTranslateY = cy - y;
            
            isLightboxZoomed = true;
            lightboxImg.classList.add('zoomed');
            updateImgTransform();
        } else {
            isLightboxZoomed = false;
            imgTranslateX = 0;
            imgTranslateY = 0;
            lightboxImg.classList.remove('zoomed');
            updateImgTransform();
        }
    }
}

lightboxImg.addEventListener('mousedown', handleStart);
lightboxImg.addEventListener('touchstart', handleStart, { passive: true });
window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', handleMove, { passive: false });
window.addEventListener('mouseup', handleEnd);
window.addEventListener('touchend', handleEnd);

window.openLightbox = function(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    isLightboxZoomed = false;
    isDragging = false;
    hasDragged = false;
    imgTranslateX = 0;
    imgTranslateY = 0;
    lightboxImg.style.transition = 'transform 0.3s ease';
    lightboxImg.style.transform = 'translate(0px, 0px) scale(1)';
    lightboxImg.classList.remove('zoomed');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
    lightbox.classList.remove('open');
    isLightboxZoomed = false;
    isDragging = false;
    hasDragged = false;
    imgTranslateX = 0;
    imgTranslateY = 0;
    lightboxImg.style.transform = 'translate(0px, 0px) scale(1)';
    lightboxImg.classList.remove('zoomed');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 250);
};

lightbox.addEventListener('click', (e) => { if (e.target === lightbox) window.closeLightbox(); });
lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); window.closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) window.closeLightbox();
});
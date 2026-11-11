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
let isPointerDown = false;
let hasDragged = false;
let dragStartX = 0;
let dragStartY = 0;
let imgTranslateX = 0;
let imgTranslateY = 0;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;

function updateImgTransform() {
    if (isLightboxZoomed) {
        lightboxImg.style.transform = `translate(${imgTranslateX}px, ${imgTranslateY}px) scale(2)`;
    } else {
        lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
    }
}

function onPointerDown(e) {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    lastX = clientX;
    lastY = clientY;
    startX = clientX;
    startY = clientY;
    
    isPointerDown = true;
    hasDragged = false;
    
    dragStartX = clientX - imgTranslateX;
    dragStartY = clientY - imgTranslateY;
    
    if (isLightboxZoomed) {
        lightboxImg.style.transition = 'none';
    }
}

function onPointerMove(e) {
    if (!isPointerDown || !isLightboxZoomed) return;
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    lastX = clientX;
    lastY = clientY;
    
    if (Math.abs(clientX - startX) > 5 || Math.abs(clientY - startY) > 5) {
        hasDragged = true;
        imgTranslateX = clientX - dragStartX;
        imgTranslateY = clientY - dragStartY;
        updateImgTransform();
        
        if (e.cancelable) e.preventDefault();
    }
}

function onPointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;
    
    if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0) {
        lastX = e.changedTouches[0].clientX;
        lastY = e.changedTouches[0].clientY;
    } else if (e.type === 'mouseup' && e.clientX !== undefined) {
        lastX = e.clientX;
        lastY = e.clientY;
    }
    
    if (isLightboxZoomed) {
        lightboxImg.style.transition = 'transform 0.3s ease';
    }
}

lightboxImg.addEventListener('mousedown', onPointerDown);
lightboxImg.addEventListener('touchstart', onPointerDown, { passive: true });
window.addEventListener('mousemove', onPointerMove, { passive: false });
window.addEventListener('touchmove', onPointerMove, { passive: false });
window.addEventListener('mouseup', onPointerUp);
window.addEventListener('touchend', onPointerUp);

lightboxImg.addEventListener('click', (e) => {
    if (hasDragged) {
        hasDragged = false;
        return;
    }

    let clickX = lastX;
    let clickY = lastY;
    
    if (e.clientX !== undefined && e.clientX !== 0) {
        clickX = e.clientX;
        clickY = e.clientY;
    }

    if (!isLightboxZoomed) {
        const rect = lightboxImg.getBoundingClientRect();
        const x = clickX - rect.left;
        const y = clickY - rect.top;
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
});

window.openLightbox = function(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    isLightboxZoomed = false;
    isPointerDown = false;
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
    isPointerDown = false;
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
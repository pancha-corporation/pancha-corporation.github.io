const products = [
    {
        key: 'panchaTool',
        name: 'pancha tool',
        url: 'https://github.com/notLurkink/Pancha-tool',
        gitlabUrl: 'https://gitlab.com/lurkink/pancha-tool',
        avatar: '../firstavatar1.webp',
        screenshots: ['../info/panchatool.webp'],
        badge: 'python',
        directDownload: '../files/panchatool.zip'
    },
    {
        key: 'panchaToolSapphire',
        name: 'pancha tool sapphire',
        url: 'https://github.com/notLurkink/Pancha-Tool-sapphire',
        gitlabUrl: 'https://gitlab.com/lurkink/pancha-tool-sapphire',
        avatar: '../firstavatar8.webp',
        screenshots: ['../info/panchatoolsapphire.webp'],
        badge: 'python',
        directDownload: '../files/Pancha_tool_sapphire.zip'
    },
    {
        key: 'panchaTool2',
        name: 'pancha tool 2',
        url: 'https://github.com/notLurkink/panchatool2',
        gitlabUrl: 'https://gitlab.com/lurkink/pancha-tool-2',
        avatar: '../firstavatar2.webp',
        screenshots: ['../info/panchatool2.webp'],
        badge: 'c++',
        directDownload: '../files/panchatool2.exe'
    },
    {
        key: 'panchaTool25',
        name: 'pancha tool 2.5',
        url: 'https://github.com/notLurkink/Pancha-tool-2.5',
        gitlabUrl: 'https://gitlab.com/lurkink/pancha-tool-2.5',
        avatar: '../firstavatar3.webp',
        screenshots: ['../info/panchatool2.5.webp'],
        badge: 'python'
    },
    {
        key: 'panchaTool3',
        name: 'pancha tool 3',
        url: 'https://github.com/notLurkink/panchaTool3/releases/tag/panchaCorp',
        gitlabUrl: 'https://gitlab.com/lurkink/pancha-tool-3',
        avatar: '../firstavatar4.webp',
        screenshots: ['../info/panchatool3.webp'],
        badge: 'python',
        directDownload: '../files/panchatool3.zip'
    },
    {
        key: 'kabanlo',
        name: 'kabanlo',
        url: 'https://github.com/notLurkink/kabanlo/releases/tag/kabanlo',
        gitlabUrl: 'https://gitlab.com/lurkink/kabanlo',
        avatar: '../firstavatar6.webp',
        screenshots: ['../info/kabanlo.webp'],
        badge: 'python',
        directDownload: '../files/kabanlo.zip'
    }
];

const preloader = document.getElementById('preloader');

if (preloader) {
    document.body.style.overflow = 'hidden';
    
    const imagesToLoad = [];
    products.forEach(p => {
        if (p.avatar) imagesToLoad.push(p.avatar);
        if (p.screenshots) imagesToLoad.push(...p.screenshots);
    });
    
    const uniqueImages = [...new Set(imagesToLoad)];
    let loadedCount = 0;

    if (uniqueImages.length === 0) {
        hidePreloader();
    } else {
        uniqueImages.forEach(src => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                if (loadedCount === uniqueImages.length) {
                    hidePreloader();
                }
            };
            img.src = src;
        });
    }

    function hidePreloader() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 120);
        }, 400);
    }
}

let currentLang = localStorage.getItem('lang') || 'en';
let currentProductIndex = 0;
let currentPageId = 'welcome';

const productList = document.getElementById('productList');
const topbarTitle = document.getElementById('topbarTitle');
const detailBackText = document.getElementById('detailBackText');

const pages = {
    welcome: document.getElementById('page-welcome'),
    products: document.getElementById('page-products'),
    contact: document.getElementById('page-contact'),
    changelog: document.getElementById('page-changelog'),
    about: document.getElementById('page-about'),
    productDetail: document.getElementById('page-product-detail')
};

function getProductComment(p) {
    const t = translations[currentLang];
    if (t.productComments && t.productComments[p.key] !== undefined) return t.productComments[p.key];
    return '';
}

function getProductReleaseDate(p) {
    const t = translations[currentLang];
    if (t.productReleaseDates && t.productReleaseDates[p.key] !== undefined) {
        return `${t.releaseDate} ${t.productReleaseDates[p.key]}`;
    }
    return '';
}

function getDirectDownloadUrl(p) {
    return p.directDownload || null;
}

function getBadgeIcon(badge) {
    const icons = {
        python: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.11-3.402 3.348-3.402h5.765s3.235.052 3.235-3.127V3.243S18.307 0 11.914 0zM8.72 1.868a1.053 1.053 0 1 1 0 2.106 1.053 1.053 0 0 1 0-2.106z"/><path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.11 3.402-3.348 3.402H9.454s-3.235-.052-3.235 3.127v5.29S5.693 24 12.086 24zm3.194-1.868a1.053 1.053 0 1 1 0-2.106 1.053 1.053 0 0 1 0 2.106z"/></svg>`,
        'c++': `<span class="badge-lang">C<sup>++</sup></span>`,
        'c#': `<span class="badge-lang">C<sup>#</sup></span>`,
        java: `<span class="badge-stack"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3.5c-.6 1 .6 1.5 0 2.5s.6 1.5 0 2.5"/><path d="M12.5 3.5c-.6 1 .6 1.5 0 2.5s.6 1.5 0 2.5"/><path d="M16 3.5c-.6 1 .6 1.5 0 2.5s.6 1.5 0 2.5"/><path d="M4.5 9.5h13v3a4 4 0 0 1-4 4h-5a4 4 0 0 1-4-4z"/><path d="M17.5 11h1.2a2.3 2.3 0 0 1 0 4.6h-1.2"/><path d="M3 19.5h16"/></svg><span class="badge-stack-label">java</span></span>`
    };
    return icons[badge] || null;
}

let toastTimer = null;
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toastText');
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

function renderProducts() {
    productList.innerHTML = '';
    const t = translations[currentLang];

    products.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';

        const linkUrl = p.gitlabUrl || p.url || '#';
        const actionHTML = p.soon
            ? `<span class="btn-action soon">${t[p.status] || t.soon}</span>`
            : `<a href="${linkUrl}" target="_blank" class="btn-action">${t.github}</a>`;

        item.innerHTML = `
            <div class="product-avatar">
                <img src="${p.avatar}" alt="${p.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="avatar-placeholder" style="display:none;">P</div>
            </div>
            <div class="product-info">
                <div class="product-header">
                    <span class="product-name" data-index="${index}">${p.name}</span>
                </div>
                <div class="product-description">${getProductComment(p)}</div>
            </div>
            <div class="product-action">${actionHTML}</div>
        `;

        item.querySelector('.product-name').addEventListener('click', () => showProductDetail(index));
        item.querySelector('.product-avatar').addEventListener('click', () => showProductDetail(index));
        productList.appendChild(item);
    });
}

function getGreetingKey() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'greetingMorning';
    if (hour >= 12 && hour < 18) return 'greetingAfternoon';
    if (hour >= 18 && hour < 23) return 'greetingEvening';
    return 'greetingNight';
}

function updateWelcomePage() {
    const t = translations[currentLang];
    const greetEl = document.getElementById('welcomeGreeting');
    if (!greetEl) return;

    greetEl.textContent = `${t[getGreetingKey()]} 👋`;
}

function updateTopbar(pageId) {
    const t = translations[currentLang];
    if (pageId === 'productDetail') {
        document.body.classList.add('product-detail-active');
        if (detailBackText) detailBackText.textContent = t.backToStore;
    } else {
        document.body.classList.remove('product-detail-active');
        if (topbarTitle) topbarTitle.textContent = t[pageId] || '';
    }
}

function refreshChangelogButtons() {
    const t = translations[currentLang];

    document.querySelectorAll('.changelog-item').forEach(item => {
        const btn = item.querySelector('.changelog-toggle-btn');
        const log = item.querySelector('.changelog-log');
        if (!btn || !log) return;

        const isOpen = log.classList.contains('open');
        item.classList.toggle('is-open', isOpen);

        const label = isOpen ? t.close : t.info;
        const textSpan = btn.querySelector('.halloween-btn-text');
        if (textSpan) textSpan.textContent = label;
        else btn.textContent = label;
    });
}

function sortChangelogLogs() {
    const order = {
        'added': 1, 'добавлено': 1,
        'fixed': 2, 'исправлено': 2,
        'reworked': 3, 'changed': 3, 'переработано': 3, 'переработан': 3, 'изменено': 3,
        'improved': 4, 'улучшено': 4,
        'removed': 5, 'удалено': 5
    };

    document.querySelectorAll('.log-list').forEach(list => {
        const items = Array.from(list.querySelectorAll('li'));
        items.sort((a, b) => {
            if (a.getAttribute('data-i18n') === 'log14_13') return -1;
            if (b.getAttribute('data-i18n') === 'log14_13') return 1;
            
            const getOrder = (el) => {
                const text = el.textContent.trim().toLowerCase();
                const firstWord = text.split(/[\s-]/)[0];
                return order[firstWord] || 99;
            };
            return getOrder(a) - getOrder(b);
        });
        items.forEach(li => list.appendChild(li));
    });
}

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    const t = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] === undefined) return;
        if (el.children.length === 0) {
            el.textContent = t[key];
        } else {
            const target = el.querySelector('span');
            if (target) target.textContent = t[key];
        }
    });

    renderProducts();
    updateWelcomePage();
    updateTopbar(currentPageId);
    refreshChangelogButtons();
    sortChangelogLogs();

    if (pages.productDetail && pages.productDetail.classList.contains('active')) {
        showProductDetail(currentProductIndex, true);
    }
}

function showPage(pageId) {
    if (!pages[pageId]) return;
    currentPageId = pageId;

    Object.values(pages).forEach(p => {
        if (p) p.classList.remove('active');
    });
    pages[pageId].classList.add('active');

    document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) item.classList.add('active');
    });

    document.querySelectorAll('.bottom-nav .bottom-nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageId) item.classList.add('active');
    });

    if (pageId === 'changelog') {
        document.querySelectorAll('.changelog-log').forEach(l => {
            l.classList.remove('open');
        });
        document.querySelectorAll('.changelog-item').forEach(item => {
            item.classList.remove('is-open');
        });
        refreshChangelogButtons();
        sortChangelogLogs();
    }

    if (pageId === 'welcome') updateWelcomePage();

    updateTopbar(pageId);
    localStorage.setItem('currentPage', pageId);

    window.scrollTo(0, 0);
}

function showProductDetail(index, silent) {
    const p = products[index];
    if (!p) return;

    const t = translations[currentLang];
    currentProductIndex = index;
    currentPageId = 'productDetail';

    const avatarEl = document.getElementById('detailAvatar');
    if (!avatarEl) return;
    avatarEl.innerHTML = '';

    const img = document.createElement('img');
    img.src = p.avatar;
    img.alt = p.name;
    img.onerror = function () {
        this.style.display = 'none';
        avatarEl.textContent = 'P';
    };
    avatarEl.appendChild(img);

    const badgeEl = document.getElementById('detailBadge');
    if (badgeEl) {
        const icon = getBadgeIcon(p.badge);
        badgeEl.innerHTML = icon || (p.badge || 'tool');
    }

    const nameEl = document.getElementById('detailName');
    if (nameEl) {
        if (p.key === 'panchaToolSapphire') {
            nameEl.innerHTML = 'pancha tool<br>sapphire';
        } else {
            nameEl.textContent = p.name;
        }
    }

    const dateEl = document.getElementById('detailReleaseDate');
    if (dateEl) {
        const dateText = getProductReleaseDate(p);
        if (dateText) {
            dateEl.textContent = dateText;
            dateEl.style.display = '';
        } else {
            dateEl.textContent = '';
            dateEl.style.display = 'none';
        }
    }

    const descEl = document.getElementById('detailFullDesc');
    if (descEl) descEl.textContent = getProductComment(p);

    const statusEl = document.getElementById('detailStatus');
    if (statusEl) {
        if (p.status) {
            statusEl.textContent = t[p.status] || p.status;
            statusEl.className = 'detail-status ' + p.status;
            statusEl.style.display = '';
        } else {
            statusEl.style.display = 'none';
        }
    }

    const linkUrl = p.gitlabUrl || p.url;
    const hasGithub = !!(linkUrl && !p.soon);
    const hasDirectUrl = !!getDirectDownloadUrl(p);
    const hasLua = !!p.luaApi;

    const showGithub = hasGithub;
    const showLua = hasLua;

    const githubBtn = document.getElementById('detailGithubBtn');
    if (githubBtn) {
        if (showGithub) {
            githubBtn.href = linkUrl;
            githubBtn.classList.remove('disabled');
            githubBtn.removeAttribute('aria-disabled');
            githubBtn.style.display = '';
        } else {
            githubBtn.href = '#';
            githubBtn.classList.add('disabled');
            githubBtn.setAttribute('aria-disabled', 'true');
            githubBtn.style.display = 'none';
        }
    }

    const downloadBtn = document.getElementById('detailDownloadBtn');
    if (downloadBtn) {
        downloadBtn.style.display = '';
        if (hasDirectUrl && !p.soon) {
            downloadBtn.classList.remove('disabled');
            downloadBtn.removeAttribute('aria-disabled');
            downloadBtn.dataset.url = getDirectDownloadUrl(p);
        } else {
            downloadBtn.classList.add('disabled');
            downloadBtn.setAttribute('aria-disabled', 'true');
            delete downloadBtn.dataset.url;
        }
    }

    const luaApiBtn = document.getElementById('detailLuaApiBtn');
    if (luaApiBtn) {
        if (showLua) {
            luaApiBtn.style.display = '';
            if (p.soon) {
                luaApiBtn.href = '#';
                luaApiBtn.classList.add('disabled');
                luaApiBtn.setAttribute('aria-disabled', 'true');
            } else {
                luaApiBtn.href = p.luaApi;
                luaApiBtn.classList.remove('disabled');
                luaApiBtn.removeAttribute('aria-disabled');
            }
        } else {
            luaApiBtn.href = '#';
            luaApiBtn.classList.add('disabled');
            luaApiBtn.setAttribute('aria-disabled', 'true');
            luaApiBtn.style.display = 'none';
        }
    }

    const actionsBlock = document.getElementById('detailActionsBlock');
    if (actionsBlock) {
        actionsBlock.style.display = (showGithub || showLua || downloadBtn) ? '' : 'none';
    }

    const screenshotsBlock = document.getElementById('detailScreenshotsBlock');
    const screenshotsEl = document.getElementById('detailScreenshots');
    if (screenshotsEl) {
        screenshotsEl.innerHTML = '';

        const hasScreenshots = p.screenshots && p.screenshots.length;

        if (hasScreenshots) {
            p.screenshots.forEach(src => {
                const wrapper = document.createElement('div');
                wrapper.className = 'screenshot-wrapper';

                const shot = document.createElement('img');
                shot.src = src;
                shot.alt = p.name;
                shot.className = 'detail-screenshot';
                shot.dataset.realSrc = src;

                wrapper.addEventListener('click', () => {
                    if (shot.dataset.isMissing === '1') return;
                    openLightbox(shot.dataset.realSrc, p.name);
                });

                shot.onerror = function () {
                    if (this.dataset.isMissing === '1') return;
                    this.dataset.isMissing = '1';
                    this.src = '../info/missing.webp';
                    wrapper.classList.add('missing');
                };

                wrapper.appendChild(shot);
                screenshotsEl.appendChild(wrapper);
            });
        } else {
            const wrapper = document.createElement('div');
            wrapper.className = 'screenshot-wrapper missing';

            const shot = document.createElement('img');
            shot.src = '../info/missing.webp';
            shot.alt = p.name;
            shot.className = 'detail-screenshot';
            shot.dataset.isMissing = '1';
            
            wrapper.appendChild(shot);
            screenshotsEl.appendChild(wrapper);
        }

        if (screenshotsBlock) screenshotsBlock.style.display = '';
    }

    if (!silent) {
        Object.values(pages).forEach(pg => {
            if (pg) pg.classList.remove('active');
        });
        if (pages.productDetail) pages.productDetail.classList.add('active');

        document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === 'products') item.classList.add('active');
        });

        document.querySelectorAll('.bottom-nav .bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === 'products') item.classList.add('active');
        });

        document.body.classList.add('product-detail-active');
        if (detailBackText) detailBackText.textContent = t.backToStore;

        window.scrollTo(0, 0);
    }

    localStorage.setItem('currentPage', 'productDetail');
    localStorage.setItem('currentProduct', index);
}

document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
    item.addEventListener('click', function () {
        const pageId = this.dataset.page;
        if (pageId) showPage(pageId);
    });
});

document.querySelectorAll('.bottom-nav .bottom-nav-item').forEach(item => {
    item.addEventListener('click', function () {
        const pageId = this.dataset.page;
        if (pageId) showPage(pageId);
    });
});

document.querySelectorAll('.contact-copy').forEach(el => {
    el.addEventListener('click', function () {
        const text = this.dataset.copy;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            showToast(translations[currentLang].successfullyCopied);
        }).catch(() => {});
    });
});

document.querySelectorAll('.changelog-card').forEach(card => {
    const item = card.closest('.changelog-item');
    if (!item) return;
    const log = item.querySelector('.changelog-log');
    const btn = item.querySelector('.changelog-toggle-btn');
    if (!log || !btn) return;

    const textSpan = btn.querySelector('.halloween-btn-text');

    function setLabel(label) {
        if (textSpan) textSpan.textContent = label;
        else btn.textContent = label;
    }

    setLabel(translations[currentLang].info);

    const toggle = function (e) {
        if (e) e.stopPropagation();
        const isOpen = log.classList.toggle('open');
        item.classList.toggle('is-open', isOpen);
        setLabel(isOpen ? translations[currentLang].close : translations[currentLang].info);
    };

    const header = card.querySelector('.product-header');
    if (header) header.addEventListener('click', toggle);
    if (btn) btn.addEventListener('click', toggle);
});

const welcomeStoreBtn = document.getElementById('welcomeStoreBtn');
if (welcomeStoreBtn) welcomeStoreBtn.addEventListener('click', () => showPage('products'));

const detailBackBtn = document.getElementById('detailBackBtn');
if (detailBackBtn) detailBackBtn.addEventListener('click', () => showPage('products'));

const detailDownloadBtn = document.getElementById('detailDownloadBtn');
if (detailDownloadBtn) {
    detailDownloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const url = detailDownloadBtn.dataset.url;
        if (!url) return;

        const originalText = detailDownloadBtn.textContent;
        detailDownloadBtn.disabled = true;
        detailDownloadBtn.textContent = '...';

        let filename = 'download';
        try {
            const urlObj = new URL(url, window.location.href);
            const last = urlObj.pathname.split('/').pop();
            if (last) filename = decodeURIComponent(last);
        } catch (_) {}

        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) throw new Error('Network error');

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch (err) {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } finally {
            setTimeout(() => {
                detailDownloadBtn.disabled = false;
                detailDownloadBtn.textContent = originalText;
            }, 500);
        }
    });
}

const themeToggle = document.getElementById('themeToggle');
const sunIcon = '<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"/>';
const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light');
        if (themeToggle) themeToggle.innerHTML = moonIcon;
    } else {
        document.body.classList.remove('light');
        if (themeToggle) themeToggle.innerHTML = sunIcon;
    }
    localStorage.setItem('theme', theme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light');
        applyTheme(isLight ? 'dark' : 'light');
    });
}

const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => applyLanguage(currentLang === 'en' ? 'ru' : 'en'));
}

applyTheme(localStorage.getItem('theme') || 'dark');
applyLanguage(currentLang);

setInterval(() => {
    if (pages.welcome && pages.welcome.classList.contains('active')) updateWelcomePage();
}, 60000);

const hashPage = window.location.hash.slice(1);
const savedPage = hashPage || localStorage.getItem('currentPage');
const validPages = Object.keys(pages);

if (hashPage) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
}

if (savedPage === 'productDetail') {
    const savedProduct = parseInt(localStorage.getItem('currentProduct') || '0', 10);
    showProductDetail(savedProduct);
} else {
    const initialPage = savedPage && validPages.includes(savedPage) ? savedPage : 'welcome';
    showPage(initialPage);
}

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close">✕</button>
    <img src="" alt="">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

let isLightboxZoomed = false;

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    isLightboxZoomed = false;
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transformOrigin = 'center center';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.classList.remove('zoomed');
    lightboxImg.style.transformOrigin = 'center center';
    isLightboxZoomed = false;
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 250);
}

lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!isLightboxZoomed) {
        const rect = lightboxImg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        lightboxImg.style.transformOrigin = `${x}% ${y}%`;
        lightboxImg.classList.add('zoomed');
        isLightboxZoomed = true;
    } else {
        lightboxImg.classList.remove('zoomed');
        setTimeout(() => {
            if (!isLightboxZoomed) {
                lightboxImg.style.transformOrigin = 'center center';
            }
        }, 300);
        isLightboxZoomed = false;
    }
});

lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

document.body.classList.add('ready');
const products = [
    {
        key: 'panchaTool',
        name: 'pancha tool',
        url: 'https://github.com/notLurkink/Pancha-tool',
        avatar: '../firstavatar1.webp',
        screenshots: ['../info/panchatool.webp'],
        badge: 'python',
        directDownload: 'https://raw.githubusercontent.com/notLurkink/Pancha-tool/main/fff.py'
    },
    {
        key: 'panchaToolSapphire',
        name: 'pancha tool sapphire',
        url: 'https://github.com/notLurkink/Pancha-Tool-sapphire',
        avatar: '../firstavatar8.webp',
        screenshots: ['../info/panchatoolsapphire.webp'],
        badge: 'python',
        directDownload: 'https://raw.githubusercontent.com/notLurkink/Pancha-Tool-sapphire/main/panchaToolSapphire.py'
    },
    {
        key: 'panchaTool2',
        name: 'pancha tool 2',
        url: 'https://github.com/notLurkink/panchatool2',
        avatar: '../firstavatar2.webp',
        screenshots: ['../info/panchatool2.webp'],
        badge: 'c++',
        directDownload: 'https://raw.githubusercontent.com/notLurkink/panchatool2/main/panchaTool2.exe'
    },
    {
        key: 'panchaTool25',
        name: 'pancha tool 2.5',
        url: 'https://github.com/notLurkink/Pancha-tool-2.5',
        avatar: '../firstavatar3.webp',
        screenshots: ['../info/panchatool2.5.webp'],
        badge: 'python',
        directDownload: 'https://raw.githubusercontent.com/notLurkink/Pancha-tool-2.5/main/pancha%20tool2.5.py'
    },
    {
        key: 'panchaTool3',
        name: 'pancha tool 3',
        url: 'https://github.com/notLurkink/panchaTool3/releases/tag/panchaCorp',
        avatar: '../firstavatar4.webp',
        screenshots: ['../info/panchatool3.webp'],
        badge: 'python',
        releaseAsset: { repo: 'notLurkink/panchaTool3', file: 'panchaTool3.zip' }
    },
    {
        key: 'panchaLauncher',
        name: 'pancha launcher',
        url: 'https://github.com/notLurkink/panchaLauncher/releases/tag/panchaLoader',
        avatar: '../firstavatar5.webp',
        screenshots: ['../info/panchalauncher.webp'],
        badge: 'c#',
        releaseAsset: { repo: 'notLurkink/panchaLauncher', file: 'PanchaLauncher.rar' }
    },
    {
        key: 'panchality',
        name: 'panchality',
        soon: true,
        status: 'maintenance',
        avatar: '../firstavatar7.webp',
        screenshots: ['../info/panchality.webp'],
        badge: 'minecraft',
        luaApi: '#'
    },
    {
        key: 'kabanlo',
        name: 'kabanlo',
        url: 'https://github.com/notLurkink/kabanlo/releases/tag/kabanlo',
        avatar: '../firstavatar6.webp',
        screenshots: ['../info/kabanlo.webp'],
        badge: 'python',
        releaseAsset: { repo: 'notLurkink/kabanlo', file: 'kabanlo.py' }
    }
];

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

function getDirectDownloadUrl(p) {
    if (p.directDownload) return p.directDownload;
    if (p.releaseAsset) {
        return `https://github.com/${p.releaseAsset.repo}/releases/latest/download/${encodeURIComponent(p.releaseAsset.file)}`;
    }
    return null;
}

function renderProducts() {
    productList.innerHTML = '';
    const t = translations[currentLang];

    products.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';

        const actionHTML = p.soon
            ? `<span class="btn-action soon">${t[p.status] || t.soon}</span>`
            : `<a href="${p.url}" target="_blank" class="btn-action">${t.github}</a>`;

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
        btn.textContent = log.classList.contains('open') ? t.close : t.info;
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

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.textContent = btn.classList.contains('copied') ? t.copied : t.copy;
    });

    renderProducts();
    updateWelcomePage();
    updateTopbar(currentPageId);
    refreshChangelogButtons();

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

    if (pageId === 'changelog') {
        document.querySelectorAll('.changelog-log').forEach(l => {
            l.classList.remove('open');
        });
        refreshChangelogButtons();
    }

    if (pageId === 'welcome') updateWelcomePage();

    updateTopbar(pageId);
    localStorage.setItem('currentPage', pageId);
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
    if (badgeEl) badgeEl.textContent = p.badge || 'tool';

    const nameEl = document.getElementById('detailName');
    if (nameEl) nameEl.textContent = p.name;

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

    const hasGithub = !!(p.url && !p.soon);
    const hasDirectUrl = !!getDirectDownloadUrl(p);
    const hasLua = !!p.luaApi;

    const showGithub = hasGithub;
    const showDownload = hasDirectUrl || !!p.soon;
    const showLua = hasLua;

    const githubBtn = document.getElementById('detailGithubBtn');
    if (githubBtn) {
        if (showGithub) {
            githubBtn.href = p.url;
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
        if (showDownload) {
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
        } else {
            downloadBtn.classList.add('disabled');
            downloadBtn.setAttribute('aria-disabled', 'true');
            delete downloadBtn.dataset.url;
            downloadBtn.style.display = 'none';
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
        actionsBlock.style.display = (showGithub || showDownload || showLua) ? '' : 'none';
    }

    const screenshotsBlock = document.getElementById('detailScreenshotsBlock');
    const screenshotsEl = document.getElementById('detailScreenshots');
    if (screenshotsEl) {
        screenshotsEl.innerHTML = '';

        const hasScreenshots = p.screenshots && p.screenshots.length;

        if (hasScreenshots) {
            p.screenshots.forEach(src => {
                const shot = document.createElement('img');
                shot.src = src;
                shot.alt = p.name;
                shot.className = 'detail-screenshot';
                shot.dataset.realSrc = src;

                shot.addEventListener('click', () => {
                    if (shot.dataset.isMissing === '1') return;
                    openLightbox(shot.dataset.realSrc, p.name);
                });

                shot.onerror = function () {
                    if (this.dataset.isMissing === '1') return;
                    this.dataset.isMissing = '1';
                    this.src = '../info/missing.webp';
                    this.classList.add('missing');
                };

                screenshotsEl.appendChild(shot);
            });
        } else {
            const shot = document.createElement('img');
            shot.src = '../info/missing.webp';
            shot.alt = p.name;
            shot.className = 'detail-screenshot missing';
            shot.dataset.isMissing = '1';
            screenshotsEl.appendChild(shot);
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

        document.body.classList.add('product-detail-active');
        if (detailBackText) detailBackText.textContent = t.backToStore;

        const mainEl = document.querySelector('.main');
        if (mainEl) mainEl.scrollTop = 0;
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

document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const text = this.dataset.copy;
        navigator.clipboard.writeText(text).then(() => {
            this.textContent = translations[currentLang].copied;
            this.classList.add('copied');
            setTimeout(() => {
                this.textContent = translations[currentLang].copy;
                this.classList.remove('copied');
            }, 2000);
        }).catch(() => alert('Failed to copy.'));
    });
});

document.querySelectorAll('.changelog-toggle-btn').forEach(btn => {
    const item = btn.closest('.changelog-item');
    if (!item) return;
    const log = item.querySelector('.changelog-log');
    if (!log) return;

    btn.textContent = translations[currentLang].info;

    btn.addEventListener('click', function () {
        const isOpen = log.classList.toggle('open');
        btn.textContent = isOpen ? translations[currentLang].close : translations[currentLang].info;
    });
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

        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) throw new Error('Network error');

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            let filename = 'download';
            try {
                const urlObj = new URL(url);
                const last = urlObj.pathname.split('/').pop();
                if (last) filename = decodeURIComponent(last);
            } catch (_) {}

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch (err) {
            window.open(url, '_blank');
        } finally {
            detailDownloadBtn.disabled = false;
            detailDownloadBtn.textContent = originalText;
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

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 250);
}

lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

(function initMobileSidebar() {
    const burgerBtn = document.getElementById('burgerBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (!burgerBtn || !sidebar || !overlay) return;

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        burgerBtn.classList.add('active');
        document.body.classList.add('sidebar-locked');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        burgerBtn.classList.remove('active');
        document.body.classList.remove('sidebar-locked');
    }

    burgerBtn.addEventListener('click', function () {
        if (sidebar.classList.contains('open')) closeSidebar();
        else openSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    document.querySelectorAll('.sidebar-menu .menu-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) closeSidebar();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('open')) closeSidebar();
    });
})();

document.body.classList.add('ready');

/* ============================================================
   _includes.js — IFT shared nav + footer injection
   Injects nav and footer HTML into placeholder divs,
   then wires up drawer toggle, active links, and scroll shadow.
   ============================================================ */
(function () {
    // Determine base path: root pages use '' , sub-pages use '../'
    var path = window.location.pathname;
    // Normalise: strip trailing slash for matching, but keep awareness
    var normPath = path.replace(/\/index\.html$/, '/').replace(/\/$/, '');

    // Detect if we are in a sub-directory (tournaments, trips, festival, sponsors, about)
    var subDirs = ['tournaments', 'trips', 'festival', 'sponsors', 'about'];
    var inSubDir = false;
    var currentSection = '';
    for (var i = 0; i < subDirs.length; i++) {
        if (normPath.indexOf('/' + subDirs[i]) !== -1 || normPath.indexOf('\\' + subDirs[i]) !== -1) {
            inSubDir = true;
            currentSection = subDirs[i];
            break;
        }
    }
    var base = inSubDir ? '../' : '';

    // ─── NAV HTML ───
    var navHTML = '' +
        '<nav class="nav" id="mainNav">' +
            '<div class="nav-left">' +
                '<a href="' + base + './" class="nav-logo">IFT</a>' +
                '<span class="nav-logo-sub">International Fishing Team</span>' +
            '</div>' +
            '<div class="nav-center">' +
                '<a href="' + base + 'tournaments/" data-section="tournaments">Tournaments</a>' +
                '<a href="' + base + 'trips/" data-section="trips">Trips</a>' +
                '<a href="' + base + 'festival/" data-section="festival">Festival</a>' +
                '<a href="' + base + 'sponsors/" data-section="sponsors">Sponsors</a>' +
                '<a href="' + base + 'about/" data-section="about">About</a>' +
            '</div>' +
            '<div class="nav-right">' +
                '<span class="lang-switch"><span class="active">EN</span> | <span>ES</span></span>' +
                '<a href="' + base + 'tournaments/" class="nav-cta">Register Now</a>' +
            '</div>' +
            '<button class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">' +
                '<span class="hamburger-line"></span>' +
                '<span class="hamburger-line"></span>' +
                '<span class="hamburger-line"></span>' +
            '</button>' +
        '</nav>' +
        '<div class="mobile-drawer" id="mobileDrawer">' +
            '<div class="mobile-drawer-inner">' +
                '<div class="mobile-drawer-brand">' +
                    '<span class="mobile-drawer-logo">IFT</span>' +
                    '<span class="mobile-drawer-sub">International Fishing Team</span>' +
                '</div>' +
                '<div class="mobile-drawer-links">' +
                    '<a href="' + base + 'tournaments/" data-section="tournaments">Tournaments</a>' +
                    '<a href="' + base + 'trips/" data-section="trips">Trips</a>' +
                    '<a href="' + base + 'festival/" data-section="festival">Festival</a>' +
                    '<a href="' + base + 'sponsors/" data-section="sponsors">Sponsors</a>' +
                    '<a href="' + base + 'about/" data-section="about">About</a>' +
                '</div>' +
                '<a href="' + base + 'tournaments/" class="mobile-drawer-cta">Register Now</a>' +
                '<div class="mobile-drawer-lang">' +
                    '<span class="lang-switch"><span class="active">EN</span> | <span>ES</span></span>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="mobile-overlay" id="mobileOverlay"></div>';

    // ─── FOOTER HTML ───
    var footerHTML = '' +
        '<footer class="footer">' +
            '<div class="container">' +
                '<div class="footer-grid">' +
                    '<div class="footer-brand">' +
                        '<div class="footer-logo">IFT</div>' +
                        '<p class="footer-tagline">International Fishing Team<br>Puerto Rico\'s Premier Sport Fishing Experience</p>' +
                        '<!-- HIDDEN: re-enable when social media accounts are live -->' +
                        '<div class="footer-social" style="display:none">' +
                            '<a href="#" title="Instagram">' +
                                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                                    '<rect x="2" y="2" width="20" height="20" rx="5"/>' +
                                    '<circle cx="12" cy="12" r="5"/>' +
                                    '<circle cx="17.5" cy="6.5" r="1.5"/>' +
                                '</svg>' +
                            '</a>' +
                            '<a href="#" title="Facebook">' +
                                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                                    '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>' +
                                '</svg>' +
                            '</a>' +
                            '<a href="#" title="TikTok">' +
                                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                                    '<path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>' +
                                '</svg>' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="footer-col">' +
                        '<h4>Navigate</h4>' +
                        '<a href="' + base + 'tournaments/">Tournaments</a>' +
                        '<a href="' + base + 'trips/">Trips</a>' +
                        '<a href="' + base + 'festival/">Festival</a>' +
                        '<a href="' + base + 'sponsors/">Sponsors</a>' +
                        '<a href="' + base + 'about/">About</a>' +
                        '<a href="mailto:info@brsskiandtours.com">Contact</a>' +
                    '</div>' +
                    '<!-- HIDDEN: re-enable when legal pages are ready -->' +
                    '<div class="footer-col" style="display:none">' +
                        '<h4>Legal</h4>' +
                        '<a href="#">Privacy Policy</a>' +
                        '<a href="#">Terms of Service</a>' +
                        '<a href="#">Cookie Policy</a>' +
                    '</div>' +
                    '<div class="footer-col">' +
                        '<h4>Contact</h4>' +
                        '<a href="mailto:info@brsskiandtours.com">info@brsskiandtours.com</a>' +
                        '<!-- HIDDEN: re-enable when location link is ready -->' +
                        '<a href="#" style="display:none">San Juan, Puerto Rico</a>' +
                        '<div style="margin-top: 16px;">' +
                            '<span class="lang-switch"><span class="active">EN</span> | <span>ES</span></span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="footer-bottom">' +
                    '&copy; 2026 International Fishing Team &middot; Puerto Rico &middot; All rights reserved.' +
                '</div>' +
            '</div>' +
        '</footer>';

    // ─── INJECT ───
    var navRoot = document.getElementById('nav-root');
    if (navRoot) navRoot.innerHTML = navHTML;

    var footerRoot = document.getElementById('footer-root');
    if (footerRoot) footerRoot.innerHTML = footerHTML;

    // ─── ACTIVE LINK HIGHLIGHTING ───
    if (currentSection) {
        var navLinks = document.querySelectorAll('.nav-center a[data-section], .mobile-drawer-links a[data-section]');
        for (var j = 0; j < navLinks.length; j++) {
            if (navLinks[j].getAttribute('data-section') === currentSection) {
                navLinks[j].classList.add('active');
            }
        }
    }

    // ─── NAV SCROLL SHADOW ───
    var nav = document.getElementById('mainNav');
    if (nav) {
        var onScroll = function () {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
    }

    // ─── MOBILE DRAWER TOGGLE ───
    (function () {
        var hamburger = document.getElementById('navHamburger');
        var drawer = document.getElementById('mobileDrawer');
        var overlay = document.getElementById('mobileOverlay');
        if (!hamburger || !drawer || !overlay) return;

        function openDrawer() {
            hamburger.classList.add('active');
            drawer.classList.add('open');
            overlay.classList.add('open');
            hamburger.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeDrawer() {
            hamburger.classList.remove('active');
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburger.addEventListener('click', function () {
            if (drawer.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        overlay.addEventListener('click', closeDrawer);

        drawer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeDrawer);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && drawer.classList.contains('open')) {
                closeDrawer();
            }
        });
    })();

})();

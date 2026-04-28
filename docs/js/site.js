/* =====================================================================
   ms.studydev.com — 공통 사이트 스크립트
   ===================================================================== */
(function () {
    'use strict';

    // ===== Sidebar toggle (mobile) =====
    var sidebar = document.getElementById('sidebar');
    var sidebarToggle = document.getElementById('sidebarToggle');
    var sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('show');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
        });
    }
    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }

    // ===== Scroll spy for sidebar nav-link =====
    var sections = document.querySelectorAll('[id]');
    var navLinks = document.querySelectorAll('.sidebar .nav-link');

    function updateActiveLink() {
        var scrollPos = window.scrollY + 120;
        var current = '';
        sections.forEach(function (section) {
            if (section.offsetTop <= scrollPos) current = section.getAttribute('id');
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    }

    // ===== Sidebar step timeline =====
    var stepTimelineEl = document.getElementById('stepTimeline');
    var stepTlItems = stepTimelineEl ? stepTimelineEl.querySelectorAll('.step-tl-item') : [];
    var stepIds = Array.prototype.map.call(stepTlItems, function (item) {
        return item.getAttribute('data-step') || item.dataset.step;
    });
    var pastAllAnchorId = stepTimelineEl ? stepTimelineEl.getAttribute('data-past-anchor') : null;

    function updateStepTimeline() {
        if (!stepTimelineEl || !stepTlItems.length) return;
        var scrollPos = window.scrollY + 160;
        var activeIdx = -1;
        stepIds.forEach(function (id, idx) {
            if (!id) return;
            var el = document.getElementById(id);
            if (el && el.offsetTop <= scrollPos) activeIdx = idx;
        });
        var afterStepsEl = pastAllAnchorId ? document.getElementById(pastAllAnchorId) : null;
        var pastAllSteps = afterStepsEl && afterStepsEl.offsetTop <= scrollPos;

        stepTlItems.forEach(function (item, idx) {
            item.classList.remove('active', 'done');
            if (pastAllSteps) {
                item.classList.add('done');
            } else if (idx < activeIdx) {
                item.classList.add('done');
            } else if (idx === activeIdx) {
                item.classList.add('active');
            }
        });

        var firstTop = stepTlItems[0].offsetTop;
        var fillTarget = 0;
        if (pastAllSteps) {
            var last = stepTlItems[stepTlItems.length - 1];
            fillTarget = last.offsetTop + last.offsetHeight / 2 - firstTop;
        } else if (activeIdx >= 0) {
            var activeEl = stepTlItems[activeIdx];
            fillTarget = activeEl.offsetTop + activeEl.offsetHeight / 2 - firstTop;
        }
        stepTimelineEl.style.setProperty('--tl-progress', Math.max(0, fillTarget) + 'px');
    }

    window.addEventListener('scroll', function () {
        updateActiveLink();
        updateStepTimeline();
    }, { passive: true });
    window.addEventListener('resize', updateStepTimeline);
    updateActiveLink();
    updateStepTimeline();

    // ===== Smooth scroll for in-page anchors =====
    var smoothScrollTargets = document.querySelectorAll(
        '.sidebar .nav-link, .sidebar .step-tl-link, .sidebar .back-link'
    );
    smoothScrollTargets.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href') || '';
            if (href.startsWith('#')) {
                e.preventDefault();
                var target = document.getElementById(href.substring(1));
                if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
            if (sidebar) sidebar.classList.remove('show');
            if (sidebarOverlay) sidebarOverlay.classList.remove('show');
        });
    });

    // ===== Image lightbox (클릭하면 확대) =====
    // .compare-card img, .customer-card img, .zoomable 클래스가 붙은 이미지에 자동 적용.
    // 단, 이미지가 <a>로 감싸진 경우는 해당 링크 동작을 존중하도록 건너뜀.
    (function initLightbox() {
        var selector = '.compare-card img, .customer-card img, img.zoomable';
        var imgs = document.querySelectorAll(selector);
        if (!imgs.length) return;

        // overlay 요소 생성
        var overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML =
            '<button class="lightbox-close" aria-label="닫기"><i class="bi bi-x-lg"></i></button>' +
            '<img class="lightbox-img" alt="">' +
            '<div class="lightbox-caption"></div>';
        document.body.appendChild(overlay);

        var lightboxImg = overlay.querySelector('.lightbox-img');
        var lightboxCaption = overlay.querySelector('.lightbox-caption');
        var closeBtn = overlay.querySelector('.lightbox-close');

        function openLightbox(src, alt) {
            lightboxImg.src = src;
            lightboxImg.alt = alt || '';
            lightboxCaption.textContent = alt || '';
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            // 다음 열기에서 깜빡임 방지를 위해 src는 유지
        }

        imgs.forEach(function (img) {
            img.style.cursor = 'zoom-in';
            var anchor = img.closest('a');
            if (anchor) {
                // <a>로 감싸져 있어도 클릭 시 lightbox로 가로채되, Ctrl/Cmd+클릭·중클릭은 기본 새 탭 동작 유지
                anchor.addEventListener('click', function (e) {
                    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
                    e.preventDefault();
                    openLightbox(img.currentSrc || img.src, img.alt);
                });
            } else {
                img.addEventListener('click', function () {
                    openLightbox(img.currentSrc || img.src, img.alt);
                });
            }
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay || e.target === closeBtn || closeBtn.contains(e.target)) {
                closeLightbox();
            }
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay.classList.contains('show')) closeLightbox();
        });
    })();

    // ===== Copy code button =====
    window.copyCode = function (btn) {
        var block = btn.closest('.code-block');
        if (!block) return;
        var text = block.innerText.replace('복사', '').replace('복사됨!', '').trim();
        navigator.clipboard.writeText(text).then(function () {
            btn.innerHTML = '<i class="bi bi-check-lg"></i> 복사됨!';
            btn.classList.add('copied');
            setTimeout(function () {
                btn.innerHTML = '<i class="bi bi-clipboard"></i> 복사';
                btn.classList.remove('copied');
            }, 2000);
        });
    };

    // ===== Carousel: fix height to tallest image (all .researcher-carousel) =====
    (function () {
        var carousels = document.querySelectorAll('.researcher-carousel');
        if (!carousels.length) return;

        function initCarousel(carousel) {
            var imgs = carousel.querySelectorAll('.carousel-item img');
            var items = carousel.querySelectorAll('.carousel-item');
            if (!imgs.length) return;
            var loaded = 0;

            function measureAll() {
                var saved = [];
                items.forEach(function (item) {
                    saved.push({ d: item.style.display, p: item.style.position, v: item.style.visibility });
                    item.style.display = 'block';
                    item.style.position = 'absolute';
                    item.style.visibility = 'hidden';
                });
                var maxH = 0;
                imgs.forEach(function (img) {
                    if (img.offsetHeight > maxH) maxH = img.offsetHeight;
                });
                var caption = carousel.querySelector('.carousel-caption');
                var captionH = caption ? caption.offsetHeight : 40;
                items.forEach(function (item, i) {
                    item.style.display = saved[i].d;
                    item.style.position = saved[i].p;
                    item.style.visibility = saved[i].v;
                });
                return { imgH: maxH, captionH: captionH };
            }

            function applyFixedHeight() {
                var m = measureAll();
                if (m.imgH <= 0) return;
                var totalH = m.imgH + m.captionH;
                items.forEach(function (item) {
                    item.style.minHeight = totalH + 'px';
                    item.style.paddingBottom = m.captionH + 'px';
                });
            }

            function onAllLoaded() {
                loaded++;
                if (loaded < imgs.length) return;
                applyFixedHeight();
            }
            imgs.forEach(function (img) {
                if (img.complete) { onAllLoaded(); } else { img.addEventListener('load', onAllLoaded); }
            });
            window.addEventListener('resize', function () {
                items.forEach(function (item) {
                    item.style.minHeight = '';
                    item.style.paddingBottom = '';
                });
                applyFixedHeight();
            });
        }

        carousels.forEach(initCarousel);
    })();
})();

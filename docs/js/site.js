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
})();

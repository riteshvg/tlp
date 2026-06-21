(function() {
  var MOBILE_MAX = 767;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function getSidebar() {
    return document.getElementById('sidebar');
  }

  function openSidebar() {
    var sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.classList.add('is-open');
    document.body.classList.add('sidebar-drawer-open');
    document.documentElement.classList.add('sidebar-drawer-open');
  }

  function closeSidebar() {
    var sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.classList.remove('is-open');
    document.body.classList.remove('sidebar-drawer-open');
    document.documentElement.classList.remove('sidebar-drawer-open');
  }

  function toggleSidebar() {
    var sidebar = getSidebar();
    if (!sidebar) return;
    if (sidebar.classList.contains('is-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  function bindToggle() {
    var btn = document.getElementById('btn-open-sidebar');
    if (!btn) return;
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    });
  }

  function bindCloseHandlers() {
    document.addEventListener('click', function(e) {
      if (!isMobile()) return;
      var sidebar = getSidebar();
      if (!sidebar || !sidebar.classList.contains('is-open')) return;
      if (sidebar.contains(e.target) || e.target.closest('#btn-open-sidebar')) return;
      closeSidebar();
    });

    document.body.addEventListener('click', function(e) {
      if (!isMobile()) return;
      if (!document.body.classList.contains('sidebar-drawer-open')) return;
      if (e.target !== document.body) return;
      closeSidebar();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeSidebar();
    });

    var sidebar = getSidebar();
    if (!sidebar) return;

    sidebar.querySelectorAll('.sidebar-button-link').forEach(function(link) {
      link.addEventListener('click', function() {
        if (isMobile()) closeSidebar();
      });
    });
  }

  function onResize() {
    if (!isMobile()) closeSidebar();
  }

  function init() {
    bindToggle();
    bindCloseHandlers();
    window.addEventListener('resize', onResize);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

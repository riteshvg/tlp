(function() {
  var OPEN_KEY = 'tlp-sidebar-open';

  function init() {
    var sidebar = document.getElementById('sidebar');
    var toggleBtn = document.getElementById('sidebar-toggle');
    var toggleIcon = document.getElementById('sidebar-toggle-icon');

    if (!sidebar || !toggleBtn) return;

    function setOpen(open) {
      if (open) {
        document.body.classList.add('sidebar-open');
        sidebar.classList.add('sidebar-open-state');
        toggleIcon.classList.remove('fa-chevron-right');
        toggleIcon.classList.add('fa-chevron-left');
      } else {
        document.body.classList.remove('sidebar-open');
        sidebar.classList.remove('sidebar-open-state');
        toggleIcon.classList.remove('fa-chevron-left');
        toggleIcon.classList.add('fa-chevron-right');
      }
      localStorage.setItem(OPEN_KEY, open ? '1' : '0');
    }

    // Default: collapsed (chevron right). Restore if user had it open.
    if (localStorage.getItem(OPEN_KEY) === '1') {
      setOpen(true);
    } else {
      toggleIcon.classList.remove('fa-chevron-left');
      toggleIcon.classList.add('fa-chevron-right');
    }

    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      setOpen(!document.body.classList.contains('sidebar-open'));
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(function($) {
  var MOBILE_MAX = 767;

  function isMobile() {
    return $(window).width() <= MOBILE_MAX;
  }

  function resetMobileLayout() {
    if (!isMobile()) return;

    $('.page-til .isotope-container').each(function() {
      var $container = $(this);
      if ($container.data('isotope')) {
        $container.isotope('destroy');
      }
      $container.removeAttr('style');
    });

    $('.page-til .isotope-item').removeAttr('style');
  }

  function initDesktopIsotope() {
    if (isMobile() || !$('.page-til .isotope-container').length) return;
    if (typeof $.fn.isotope !== 'function') return;

    $('.page-til .isotope-container').imagesLoaded(function() {
      $(this).isotope({
        itemSelector: '.isotope-item',
        layoutMode: 'fitRows'
      });
    });
  }

  function syncLayout() {
    if (isMobile()) {
      resetMobileLayout();
    } else {
      initDesktopIsotope();
    }
  }

  $(document).ready(function() {
    syncLayout();
    $(window).on('resize', syncLayout);
  });
})(jQuery);

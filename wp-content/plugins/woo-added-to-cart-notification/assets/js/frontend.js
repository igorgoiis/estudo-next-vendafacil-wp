'use strict';

(function($) {
  $(document).on('click touch', '#wooac-continue', function(e) {
    var url = $(this).attr('data-url');

    $.magnificPopup.close();

    if (url != '') {
      window.location.href = url;
    }

    e.preventDefault();
  });

  $(document.body).on('added_to_cart', function(e) {
    setTimeout(function() {
      wooac_show();
    }, parseInt(wooac_vars.delay));
  });
})(jQuery);

function wooac_show() {
  if (jQuery.trim(jQuery('.wooac-popup').html()).length) {
    jQuery.magnificPopup.open({
      items: {
        src: jQuery('.wooac-popup'),
        type: 'inline',
      },
      mainClass: 'mfp-wooac',
      callbacks: {
        beforeOpen: function() {
          this.st.mainClass = 'mfp-wooac ' + wooac_vars.effect;
        },
      },
    });
  }
}
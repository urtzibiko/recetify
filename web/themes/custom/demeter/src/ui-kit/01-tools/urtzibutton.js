(function ($, Drupal, once) {
  Drupal.behaviors.urtziButton = {
    attach: function (context, settings) {
      once('urtziButton', '.demeter-dropdown-toggle', context).forEach(
        function (element) {
          tippy(".demeter-dropdown-toggle",
            {
              content: 'Holiiii'
            });
        },
      );
    },
  };
})(jQuery, Drupal, once);


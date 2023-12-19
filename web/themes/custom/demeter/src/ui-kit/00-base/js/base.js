(function ($, Drupal) {
  Drupal.behaviors.Base = {
    attach: function (context, settings) {
      once('demeter-dropdown-toggle', '.demeter-dropdown-toggle', context).forEach(
        function (element) {
          $(element).on('click', function () {
            $(this).closest(".demeter-dropdown").find(".demeter-dropdown-panel").stop().slideToggle();
          });
        }
      );
    }
  };
}(jQuery, Drupal));


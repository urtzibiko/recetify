(function ($, Drupal) {
  Drupal.behaviors.Base = {
    attach(context, settings) {
      $( ".demeter-dropdown-toggle" ).on( "click", function() {
        $(this).closest(".demeter-dropdown").find(".demeter-dropdown-panel").stop().slideToggle();
      } );
    }
  };
}(jQuery, Drupal));

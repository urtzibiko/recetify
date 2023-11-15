(function ($, Drupal) {
  Drupal.behaviors.Base = {
    attach(context, settings) {

      // Handle simulated links.
      $('[data-href]').each(function () {

        $(this).click(function (e) {

          // Ignore clics on real <a>s.
          if ($(e.target).parents('a').length) {
            return;
          }

          // Handle click.
          e.preventDefault();
          let target = '_self';
          if (e.ctrlKey || e.metaKey) {
            target = '_blank';
          }
          else if ($(this).data('target')) {
            target = $(this).data('target');
          }
          if (target === '_self') {
            window.location = $(this).data('href');
          }
          else {
            window.open($(this).data('href'), target).focus();
          }

        });

        // Simulate showing url in status bar on hover.
        $(this).mouseenter(function () {
          window.status = $(this).data('href');
        });
        $(this).mouseleave(() => {
          window.status = '';
        });

      });

      // Fire tooltips.
      $('[data-toggle="tooltip"]').tooltip();

      // Degradated boxes.
      const DEGRADATED_BOX_CLASS = 'js-degradated-box';
      const DEGRADATED_BOX_CLASS_ACTIVE = DEGRADATED_BOX_CLASS + '--active';
      $('.' + DEGRADATED_BOX_CLASS).once().each(function () {
        const degradatedElement = $(this);
        const maxChildrenCount = parseInt($(degradatedElement).data('degradated-count'));
        const maxHeight = parseInt($(degradatedElement).data('degradated-height'));
        const degradatedArrow = $(`[data-degradated-id="#${$(this).attr('id')}"]`);
        const degradatedBox = $(degradatedArrow).parent('.u-degradated-box');
        $(degradatedElement).addClass(DEGRADATED_BOX_CLASS_ACTIVE);
        $(degradatedElement).addClass('js-degradated-box--active');
        if ($(degradatedElement).hasClass('js-degradated-box-only-mobile') && !Modernizr.mq('(max-width: 768px)')) {
          $(degradatedBox).remove();
          $(degradatedElement).removeClass(DEGRADATED_BOX_CLASS_ACTIVE);
          return;
        }
        if (maxChildrenCount) {
          const children = $(degradatedElement).children();
          if (children.length > maxChildrenCount) {
            $(children).each((index, el) => {
              if (index + 1 > maxChildrenCount) {
                $(el).hide();
              }
            });
          }
          else {
            $(degradatedBox).remove();
            $(degradatedElement).removeClass(DEGRADATED_BOX_CLASS_ACTIVE);
          }
        }
        else if (maxHeight) {
          const softMaxHeight = Math.ceil((maxHeight * 1.25)); // * 1.25 = +25%
          const degradatedElementHeight = $(degradatedElement).outerHeight();
          $(degradatedElement).data('degradated-original-height', degradatedElementHeight);
          if (degradatedElementHeight > maxHeight) {
            if (degradatedElementHeight <= softMaxHeight) {
              // Element fits in the soft max height limit. Do not show the gradient.
              $(degradatedBox).remove();
              $(degradatedElement).removeClass(DEGRADATED_BOX_CLASS_ACTIVE);
            }
            else {
              // Element do not fit in the max height nor in the soft max height limits. Show the gradient.
              $(degradatedElement).outerHeight(maxHeight);
            }
          }
          else {
            // Element fits in the max height limit. Do not show the gradient.
            $(degradatedBox).remove();
            $(degradatedElement).removeClass(DEGRADATED_BOX_CLASS_ACTIVE);
          }
        }

      });
      $('.js-degradated-arrow').click(function (e) {
        e.preventDefault();
        const degradatedArrow = $(this);
        const degradatedBox = $(degradatedArrow).parent('.u-degradated-box');
        const degradatedId = $(this).data('degradated-id');
        const degradatedElement = $(degradatedId);
        const maxChildrenCount = parseInt($(degradatedElement).data('degradated-count'));
        const maxHeight = parseInt($(degradatedElement).data('degradated-height'));
        if (maxChildrenCount) {
          $(degradatedElement).children().each(function () {
            $(this).fadeIn();
          });
          $(degradatedBox).fadeOut();
        }
        else if (maxHeight) {
          const degradatedElementOriginalHeight = $(degradatedElement).data('degradated-original-height');
          $(degradatedElement).animate({ height: degradatedElementOriginalHeight }, 500, function () {
            $(this).css({height: 'unset'});
          });
          $(degradatedBox).fadeOut();
        }
      });

      // Prevent defaults.
      $('.js-prevent-default').click((e) => {
        e.preventDefault();
      });

      // Reduce text sizes.
      $('.js-reduce-text-size').each((index, element) => {
        const texto = $(element).text();
        if (texto.length > 50) {
          $(element).addClass('c-titular-segundo-nivel u-font-weight-xregular');
        }
      });

      // Oculta los elementos del contenedor de snippets.
      $(".js-ver-mas-container:not('.js-carrusel-mobile')").each(function (i, elem) {
        const parentContainer = $(elem);
        const totalEls = parentContainer.children().length;
        let numFirstEles = parentContainer.data('show-elem');
        let numMoreEles = parentContainer.data('more-elem');
        if (Modernizr.mq('(max-width: 992px)')) {
          numFirstEles = parentContainer.data('show-elem-mobile');
          numMoreEles = parentContainer.data('more-elem-mobile');
        }
        parentContainer.children().slice(numFirstEles, totalEls).hide();
        const hiddenElements = parentContainer.children(':hidden');
        const botonVerMas = $('.js-boton-ver-mas-container[data-snippet-container-id="#' + parentContainer.attr('id') + '"]');
        if (hiddenElements.length === 0 || numMoreEles === 0) {
          $(botonVerMas).parent().hide();
        }
      });

      // Comportamiento del botón "Ver más".
      $('.js-boton-ver-mas-container').children().click((e) => {
        e.preventDefault();
        const parentContainer = $($(e.target).parents('.js-boton-ver-mas-container').data('snippet-container-id'));
        let numFirstEles = parentContainer.data('show-elem');
        let numMoreEles = parentContainer.data('more-elem');
        if (Modernizr.mq('(max-width: 992px)')) {
          numFirstEles = parentContainer.data('show-elem-mobile');
          numMoreEles = parentContainer.data('more-elem-mobile');
        }
        let hiddenElements = parentContainer.children(':hidden');
        hiddenElements.slice(0, numMoreEles).show();
        hiddenElements = parentContainer.children(':hidden');
        if (hiddenElements.length === 0) {
          $(e.target).parents('.js-boton-ver-mas-container').parent().hide();
        }
      });

      $('.js-close-navegador-obsoleto').click((e) => {
        $('#navegadorObsoleto').modal('hide');
      });

      $('.js-menu-volver').click((ev) => {
        ev.preventDefault();
        if (document.referrer === "") {
          document.location.href = '/';
        } else {
          window.history.back();
        }
      });

      $('.c-carrusel-full').slick({
        speed: 500,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
      });

    },
  };
}(jQuery, Drupal));

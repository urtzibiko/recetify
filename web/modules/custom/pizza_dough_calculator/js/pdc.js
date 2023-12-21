(function ($, Drupal) {
  Drupal.behaviors.pdc = {
    attach: function (context, settings) {
      once('harina', '#harina', context).forEach(
        function (element) {
          $(element).on('input', function () {
            {
              // Obtener el valor introducido por el usuario para la harina
              const harina = parseFloat(document.getElementById('harina').value) || 0;

              // Calcular las proporciones
              const proporcionAgua = (harina / 100) * 65;
              const proporcionSal = (harina / 100) * 2;
              const proporcionLevadura = (harina / 100) * 2;
              const proporcionLevaduraSeca = proporcionLevadura / 3;

              // Mostrar las cantidades recalculadas
              document.getElementById('aguaRecalculada').innerText = proporcionAgua.toFixed(2);
              document.getElementById('salRecalculada').innerText = proporcionSal.toFixed(2);
              document.getElementById('levaduraRecalculada').innerText = proporcionLevadura.toFixed(2);
              document.getElementById('levaduraSecaRecalculada').innerText = proporcionLevaduraSeca.toFixed(2);
            }
          });
        }
      );
    }
  };
}(jQuery, Drupal));

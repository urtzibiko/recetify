function calcularProporciones() {
  // Obtener el valor introducido por el usuario para la harina
  const harina = parseFloat(document.getElementById('harina').value) || 0;

  // Calcular las proporciones
  const proporcionAgua = (harina / 200) * 150;
  const proporcionSal = (harina / 200) * 2;
  const proporcionLevadura = (harina / 200) * 1;

  // Mostrar las cantidades recalculadas
  document.getElementById('harinaRecalculada').innerText = harina.toFixed(2);
  document.getElementById('aguaRecalculada').innerText = proporcionAgua.toFixed(2);
  document.getElementById('salRecalculada').innerText = proporcionSal.toFixed(2);
  document.getElementById('levaduraRecalculada').innerText = proporcionLevadura.toFixed(2);
}

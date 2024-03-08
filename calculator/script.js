// Asumiendo que tienes un HTML similar a la imagen con botones para cada número y operación.

// Seleccionamos todos los botones y la pantalla de la calculadora
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

// Añadimos un evento de clic a cada botón
buttons.forEach(function(button) {
  button.addEventListener('click', calculate);
});

// Función de cálculo
function calculate(event) {
  // Obtenemos el valor del botón presionado
  const clickedButtonValue = event.target.value;

  if (clickedButtonValue === '=') {
    // Si el botón es igual a '=', calculamos y mostramos el resultado
    if (display.value !== '') {
      // Intentamos calcular y atrapar cualquier error que ocurra en el cálculo
      try {
        // Evaluamos la expresión y mostramos el resultado
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
    }
  } else if (clickedButtonValue === 'AC') {
    // Si el botón es 'AC', borramos la pantalla
    display.value = '';
  } else {
    // Para cualquier otro botón, agregamos el valor del botón a la pantalla
    display.value += clickedButtonValue;
  }
}

const dvKeyboard = document.querySelector("#divKey");
const output = document.querySelector("#calculator");
const btResultado = document.querySelector("#btequals");
const btClear = document.querySelector("#clear");
const btBackspace = document.querySelector("#btBackspace");
const sinais = document.querySelectorAll(".sinais");
const virgula = document.querySelector("#btdeci");


let operacao;
let primeiroValor;
let segundoValor;
let isSecondValue = false;


//----------------------------------------------------------------------------------------------------------------


dvKeyboard.addEventListener("click", (e) => {

    const targetId = e.target.id;

    if (e.target.classList.contains("button")) {
        definirNumeros(targetId);
        sinais.forEach((sinal) => { sinal.disabled = false; });
        btBackspace.disabled = false;
        btResultado.disabled = false;
        btClear.innerText = "clear";

    } else if (e.target.classList.contains("sinais")) {
        operacao = definirSinal(e);

    }
})

btResultado.addEventListener("click", (e) => {
    const resultado = calcularResultado(e);
    const resultFormatado = formatarNumero(resultado);
    output.innerText = resultFormatado;
    btBackspace.disabled = true;
    primeiroValor = resultado;
    isSecondValue = false;
})

btClear.addEventListener("click", () => {
    operacao;
    primeiroValor;
    segundoValor;
    isSecondValue = false;
    output.innerText = 0;
    sinais.forEach((sinal) => { sinal.disabled = true; });
    btClear.innerText = "clear";
    btResultado.disabled = true;
})

btBackspace.addEventListener("click", () => {
    if (output.innerText.length > 1) {
        output.innerText = output.innerText.slice(0, -1);
        if (isSecondValue == false) {
            primeiroValor = Number(output.innerText);
        } else {
            segundoValor = Number(output.innerText);
        }
    } else{
        output.innerText = 0;
        btClear.innerText = "clear";
        sinais.forEach((sinal) => { sinal.disabled = true; });
        btResultado.disabled = true;
    }
})

virgula.addEventListener("click", () => {
    output.innerHTML += ",";
})



//----------------------------------------------------------------------------------------------------------------


const definirNumeros = (targetId) => {
    if (output.innerText.length <= 11) {
        if (output.innerText == 0) {
            output.innerText = targetId.charAt(targetId.length - 1);
        } else {
            output.innerText += targetId.charAt(targetId.length - 1);
        }

        if (output.innerText.length >= 4) {
            const num = Number(output.innerText.replace(/\./g, '').replace(/\,/g, '.'));
            const numFormatado = formatarNumero(num);
            output.innerText = numFormatado;
          }

        if (isSecondValue == false) {
            primeiroValor = Number(output.innerText.replace(/\./g, '').replace(/\,/g, '.'));
        } else {
            segundoValor = Number(output.innerText.replace(/\./g, '').replace(/\,/g, '.'));
        }
    }
}


const definirSinal = (e) => {
    sinais.forEach((sinal) => { sinal.style.backgroundColor = "#ff0084" })
    e.target.style.backgroundColor = "#a10053";

    const simbolo = e.target.innerText;

    isSecondValue = true;
    output.innerText = "0";

    return simbolo
}

const calcularResultado = (e) => {
    let result;
    if (operacao == "÷") {
        result = primeiroValor / segundoValor;
    } else if (operacao == "×") {
        result = primeiroValor * segundoValor;
    } else if (operacao == "+") {
        result = primeiroValor + segundoValor;
    } else {
        result = primeiroValor - segundoValor;
    }

    sinais.forEach((sinal) => { sinal.style.backgroundColor = "#ff0084" })

    return result;
}

const formatarNumero = (num) => {
    const numFormatado = num.toLocaleString('pt-BR');
    return numFormatado;
  };


/*const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');

buttons.forEach(function(button) {
  button.addEventListener('click', calculate);
});


function calculate(event) {
  
  const clickedButtonValue = event.target.value;

  if (clickedButtonValue === 'equals') {
      if (display.value !== '') {
      try {    
        display.value = eval(display.value);
      } catch (error) {
        display.value = 'Error';
      }
    }
  } else if (clickedButtonValue === 'clear') {
    display.value = '';
  } else {
    display.value += clickedButtonValue;
  }
}*/

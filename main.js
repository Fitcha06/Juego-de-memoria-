// Inicializacion de variables
let tarjetas_destapadas = 0; 
let tarjeta1 = null;
let tarjeta2 = null;
let primer_resultado = null;
let segundo_resultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timer_inicial = 30;
let tiempo_regresivo = null

// Apuntando a documento HTML
let mostrar_movimientos = document.getElementById('movimientos');
let mostrar_aciertos = document.getElementById('aciertos');
let mostrar_tiempo = document.getElementById('t_restante');

// Generacion de numeros aleatorios
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {return Math.random() -0.5});
console.log(numeros);

// Funciones
function contar_tiempo(){
    tiempo_regresivo = setInterval(() => {
        timer --;
        mostrar_tiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if(timer == 0){
            clearInterval(tiempo_regresivo);
            bloquear_tarjetas();
        }

    }, 1000);
}

function bloquear_tarjetas(){
    for(let i = 0; i <= 15; i++){
        let trajetas_bloqueada = document.getElementById(i);
        trajetas_bloqueada.innerHTML = numeros[i];
        trajetas_bloqueada.disabled = true;

    }
}

// Funcion principal
function destapar(id){
    if(temporizador == false){
        contar_tiempo();
        temporizador = true;

    }

    tarjetas_destapadas ++;
    console.log(numeros);
    
    if(tarjetas_destapadas == 1){
        // Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primer_resultado = numeros[id];
        tarjeta1.innerHTML = primer_resultado;

        // Deshabilitar primer boton
        tarjeta1.disabled = true;

    }else if(tarjetas_destapadas == 2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundo_resultado = numeros[id];
        tarjeta2.innerHTML = segundo_resultado;

        // Deshabilitamos segundo boton
        tarjeta2.disabled = true;


        // Incrementar movimientos
        movimientos ++;
        mostrar_movimientos.innerHTML = `Movimientos: ${movimientos}`;


        if(primer_resultado == segundo_resultado){
            // Encerar contador tarjetas destapadas
            tarjetas_destapadas = 0;

            // Aumentar aciertos
            aciertos ++;
            mostrar_aciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempo_regresivo);
                mostrar_aciertos.innerHTML = `Aciertos: ${aciertos}😱`
                mostrar_tiempo.innerHTML = `Fantastico! Solo tardaste ${timer_inicial - timer} segundos`
                mostrar_movimientos.innerHTML = `Movimientos: ${movimientos}😎🤟`
            }

        }else{
            // Mostrar mometaneamentes valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetas_destapadas = 0;
                
            }, 800);
        }
    }


}

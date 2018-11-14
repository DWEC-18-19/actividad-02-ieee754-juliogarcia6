'use strict';

function invertirCadena(cadena) {
	//invertimos el binario de las sucesivas divisiones.
	var x = cadena.length;
	var cadenaInvertida = "";
     
	while (x>=0) {
		cadenaInvertida = cadenaInvertida + cadena.charAt(x);
        x--;
    }
    return cadenaInvertida;
 }


function pasarABinario(numero) {
    var parteEnteraBinaria = String(numero % 2);
    
	numero /=2;
	numero = Math.trunc(numero)

    while (numero>0){

       	parteEnteraBinaria = parteEnteraBinaria + String(numero % 2);
       	numero /=2;
    	numero = Math.trunc(numero)

    }
    return  parteEnteraBinaria;  
}


function procesarParteDecimal(parteDecimal) {
	var parteDecimalBinaria;
    //procesamos la parte decimal

    parteDecimal= 0+"."+parteDecimal;
 	parteDecimal = parteDecimal * 2;
    parteDecimalBinaria = String(Math.trunc(parteDecimal));

    //El indice determina el número de decimales.
    for(var i=1;i<23;i++){
       	if(1==String(Math.trunc(parteDecimal))){
			parteDecimal = parteDecimal.toString().replace("1.","0.");
        }	
     
      	parteDecimal = parteDecimal * 2;
        parteDecimalBinaria = parteDecimalBinaria +  String(Math.trunc(parteDecimal));

    }
    return parteDecimalBinaria;
}


function ieee754aBinario(numero) {

	var parteEntera;
	var parteDecimal;
	var parteEnteraBinaria;
	var parteDecimalBinaria;
	var numeroIeee754;
	var posicionDelPunto;
	var exponente;
	var exponenteIeee754;


	
	//Eliminación de posibles comillas.
	numero = numero.replace(/"/g,'');
    numero = numero.replace(/'/g,'');

	//Discriminamos si el número es positivo, negativo o 0.
	switch(Math.sign(numero)) {
	    case 1:
	        numeroIeee754 = 0;
	        break;
	    case -1:
	        numeroIeee754 = 1;
	        break;
   	    case 0:
     		return "00000000000000000000000000000000";
	        break;
   	    case -0:
	        return "10000000000000000000000000000000";
	        break;
	    default: 
	        return "El número no es correcto. Escríbalo de nuevo";
	} 


	//comprueba que es un número con decimales.

    if (numero.indexOf(".")== -1) {
        //Descomentar esta linea para procesar números enteros a float y comentar el return.
    	//numero = numero + ".0";
    	return "El número es entero. Escríbalo de nuevo";
    }


    //Tomamos la posición del punto.
	posicionDelPunto = numero.indexOf(".");

	//Seleccionamos la parte entera.
	parteEntera = Math.abs(numero.slice(0, posicionDelPunto))

	//Seleccionamos la parte decimal.
	parteDecimal = numero.substr(posicionDelPunto+1); 
    
    //Pasamos la parte entera a binario.
    parteEnteraBinaria = pasarABinario(parteEntera);

    //invertimos la parteEnteraBinaria
    parteEnteraBinaria = invertirCadena(parteEnteraBinaria);

    //Pasamos la parte decimal a binario.
    parteDecimalBinaria = procesarParteDecimal(parteDecimal);

    //hayamos el desplazamiento a partir del primer 1 para calcular el exponente 
    if (parteEnteraBinaria.indexOf(1) == -1 ) {
       	var desplazamiento = 0;
    }else {
       	var desplazamiento = (parteEnteraBinaria.length-1)-parteEnteraBinaria.indexOf(1);
    }

    //Creamos la mantisa
    var mantisa = parteEnteraBinaria.substr(-desplazamiento)+parteDecimalBinaria;
 
    //Calculo del exponente: a 127 se sumamos el desplazamiento.
    exponente = 127 + desplazamiento;

    //Pasamos a binario el exponente;
    exponenteIeee754 = pasarABinario(exponente);

    //Inverte el exponenteIeee754
    exponenteIeee754 = invertirCadena(exponenteIeee754);

    //Concatena el signo, el exponente y la mantisa.
 	numeroIeee754 = numeroIeee754 + exponenteIeee754 + mantisa;
 	numeroIeee754 = numeroIeee754.substring(0,32)
 		
 	//document.write(numeroIeee754);

    return numeroIeee754;
}





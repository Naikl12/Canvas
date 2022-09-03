/*FUNCIONES*/
/*Funciones de dibujo*/
function dibujarCirculo(x,y,colorActual){
    if(puedoDibujar){
        pincel.fillStyle = colorActual;
        pincel.beginPath();
        pincel.arc(x,y,5,0,2*3.14);
        pincel.fill();
    }
}

function habilitarDibujar(){
    puedoDibujar = true;
}
function deshabilitarDibujar(){
    puedoDibujar = false;
}

/*Funciones de la paleta*/
function dibujarCuadrado(x, y, tamanio, color){
    pincel.fillStyle = color;
    pincel.fillRect(x,y,tamanio,tamanio);
    pincel.fill();
}

function crearPaletaColores(colores){
    let cantidadColores = colores.length;
    let xCuadrado = 0;
    let yCuadrado = 0;
    let tamanioCuadrado = 50;
    for(i=0; i<cantidadColores; i++){
        dibujarCuadrado(xCuadrado, yCuadrado, tamanioCuadrado, colores[i]);
        xCuadrado+=50;
    }
}

function esAreaDeDiseño(xCoordenada, yCoordenada){
    let largoDePaleta = 50 * colores.length;
    let altoDePaleta = 50;
    if ((xCoordenada >= 0 && xCoordenada < largoDePaleta+5) && (yCoordenada >= 0 && yCoordenada < altoDePaleta+5)){
        return false;
    }else{
        return true;
    }

}

function capturarMovimientoDelMouse(evento){
    var x = evento.pageX - pantalla.offsetLeft;
    var y = evento.pageY - pantalla.offsetTop;
    if(esAreaDeDiseño(x,y)){
        dibujarCirculo(x,y,colorActual);
    }
}

/*Funciones para elegir color de pincel en la paleta*/
function seleccionarColor(evento){
    let x = evento.pageX - pantalla.offsetLeft;
    let y = evento.pageY - pantalla.offsetTop;
    let cantidadColores = colores.length;
    let xCuadrado = 0;
    let color = 0;
    console.log(x);
    if(!esAreaDeDiseño(x,y)){
        while((x < xCuadrado || x > xCuadrado+50)&& color < cantidadColores){
            color = color +1;
            xCuadrado = xCuadrado +50;
            console.log(color);
            console.log(xCuadrado);
        }
        console.log(colores[color]);
        colorActual = colores[color];
    }

}


/*DESARROLLO*/
/*Dibujar en canvas*/
var pantalla = document.querySelector('canvas');
var pincel = pantalla.getContext('2d');

pincel.fillStyle = '#3a86ff';
pincel.fillRect(0,0,600,400);

var puedoDibujar = false;

 //Aqui se pueden agregar hasta 12 colores!
var colores = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec','#2ec4b6'];
var colorActual = '#03045e'; // color del pincel 

pantalla.onmousemove = capturarMovimientoDelMouse;

pantalla.onmousedown = habilitarDibujar;
pantalla.onmouseup = deshabilitarDibujar;



crearPaletaColores(colores);

pantalla.onclick = seleccionarColor;

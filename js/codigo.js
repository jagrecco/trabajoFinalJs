const tablero=[];
const ficherio=[];
let colorCasillero=0;
let nombrePlayer;
let colorPlayer;
class Celda{

    constructor(ubicacion,color,estado)
    {
        this.ubicacion=ubicacion;
        this.color=color;
        this.estado=estado;
    }
}
class Ficha{
    
    constructor(id, color, posicion, viva, dama)
    {
        this.id=id;
        this.color = color;
        this.posicion = posicion;
	    this.viva = viva;
        this.es_dama = dama;
    }
    
    mover(posicion)
    {
        /* verificar estado de celda de destino */
        
    }
    comer(posicion)
    {
        /* mover a celda de destino - eliminar ficha contraria */
    }
}

TableroArray();
FichasArray();

function TableroArray(){
    
    for (let i=0; i<64; i++){
        
        if (((i%8)!==0) && i!==0)
        {
            if (colorCasillero===0)
            {
                colorCasillero=1;
            } else
            {
                colorCasillero=0;
            }
        }
        
        Casilla=new Celda(i,colorCasillero,0);
        
        tablero.push(Casilla);
    }
}

function IniciaJuego()
{
    Jugador();
    ArmaTablero();
}

function Jugador()
{
    nombrePlayer=prompt("Ingrese su nombre");
    do
        {
        colorPlayer=prompt("¿Juega con rojas ó azules? (ingrese r ó a)");
        }
    while (colorPlayer !== "r" && colorPlayer !== "a");
    
    switch (colorPlayer)
    {
        case 'r':
            colorPlayer="red";
            break;
        case 'a':
            colorPlayer="blue";
    }

    jugador_nombre=document.getElementById("playerNombre");
    jugador_nombre.innerHTML="Jugador = " + nombrePlayer;
    jugador_color=document.getElementById("playerColor");
    jugador_color.innerHTML="Juega con = " + colorPlayer;

}

function FichasArray()
{
    blancas= new Ficha(0,0,1,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(1,0,3,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(2,0,5,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(3,0,7,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(4,0,8,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(5,0,10,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(6,0,12,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(7,0,14,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(8,0,17,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(9,0,19,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(10,0,21,1,0);
    ficherio.push(blancas);
    blancas= new Ficha(11,0,23,1,0);
    ficherio.push(blancas);

    rojas= new Ficha(12,1,40,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(13,1,42,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(14,1,44,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(15,1,46,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(16,1,49,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(17,1,51,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(18,1,53,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(19,1,55,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(20,1,56,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(21,1,58,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(22,1,60,1,0);
    ficherio.push(rojas);
    rojas= new Ficha(23,1,62,1,0);
    ficherio.push(rojas);
}


function ArmaTablero()

{
    tableroHtml=document.getElementById("tablero");
    let dibujo="";

    tablero.forEach(element=>
        {
            if (element.color==0)
            {
                dibujo=dibujo + `<div class="item celda__w">${element.ubicacion}</div>`; /*  pone ubicación en celdas blancas ${element.ubicacion}  */
                
            } else
            {
                if (element.ubicacion>=0 && element.ubicacion<=23)
                {
                    dibujo=dibujo + `<div class="item celda__b"><div class="ficha__b" id="${element.ubicacion}" onclick="muestraID(${element.ubicacion})"></div></div>`;
                    

                } else if (element.ubicacion>=40 && element.ubicacion<=63)
                {
                    dibujo=dibujo + `<div class="item celda__b"><div style="background-color:${colorPlayer}" class="ficha__r id="${element.ubicacion}" onclick="muestraID(${element.ubicacion})"></div></div>`;

                } else
                {
                    dibujo=dibujo + '<div class="item celda__b"></div>';
                }
            }

            tableroHtml.innerHTML = dibujo;
        });
}

function muestraID(numero)
{
    ficha__id=document.getElementById(numero);
    alert(numero);
}
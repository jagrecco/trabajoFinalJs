const tablero=[];
let colorCasillero=0;
class Celda{

    constructor(ubicacion,color,estado)
    {
        this.ubicacion=ubicacion;
        this.color=color;
        this.estado=estado;
    }
}
class Ficha{
    
    constructor(color, posicion, viva, dama)
    {
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

prueba();

/*
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

tableroHtml=document.getElementById("tablero");
tableroHtml.innerHTML ='<div class="item celda__b"></div>';

console.log(tablero);
*/


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
        console.log(Casilla);
        
    }
}


function prueba()
{
    tableroHtml=document.getElementById("tablero");
    let dibujo="";

    tablero.forEach(element=> console.log(element.color));

    tablero.forEach(element=> {
            if (element.color==0)
            {
                dibujo=dibujo + '<div class="item celda__w"></div>';    
            } else
            {
                dibujo=dibujo + '<div class="item celda__b"></div>';
            }

            tableroHtml.innerHTML = dibujo;
        });
}

function ArmaTablero()
{
    tableroHtml=document.getElementById("tablero");

    let dibujo="";

    for (let i=0; i<64; i++)
    {
        if (tablero[i].Celda.color==0)
        {
            dibujo=dibujo + '<div class="item celda__w"></div>';
        } else 
        {
            dibujo=dibujo + '<div class="item celda__b"></div>';
        }
    }
    console.log(dibujo);
    tableroHtml.innerHTML = dibujo;
    
}


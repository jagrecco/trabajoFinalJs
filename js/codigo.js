const tablero=[];

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

let colorCasillero=0;

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


console.log(tablero);

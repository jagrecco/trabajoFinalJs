const tablero=[];
const ficherio=[];
const fichasBlancas=[];
const fichasNegras=[];

let quien_juega="negras";
let ubicacion_ficha_comida=null;

const movimientosCeldas=[];
let movimientosIndex;
let seleccionada=0;
let colorCasillero=0;
let nombrePlayer;
let colorPlayer=0;
let fichaHumano="/assets/ficha_negra.png";
let fichaCompu="/assets/ficha_roja.png";
let ColorMostrar;
let PartidaIniciada=false;
class Celda{

    constructor(ubicacion,color,estado,recuadro,seleccion)
    {
        this.ubicacion=ubicacion;
        this.color=color;
        this.estado=estado;
        this.recuadro=recuadro;
        this.seleccion=seleccion;
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

class Movimientos{

    constructor(pos, m1,m2,m3,m4)
    {
        this.pos=pos;
        this.m1=m1;
        this.m2=m2;
        this.m3=m3;
        this.m4=m4;
    }
}

agregarEnventoBoton();
agregarEventoFichaNegra();
agregarEventoFichaRoja();

TableroArray();
llenaFichasBlancas();
llenaFichasNegras();

/* FichasArray(); */
cargaNombreJugador();

CambiaAvatar(1);
CambiaAvatar(2);

/* function IniciaJuego()
{
    ArmaTablero(tablero);
    CargaMovimientos();
    mostrarTablero();
    grabaNombreJugador();
    
}
 */
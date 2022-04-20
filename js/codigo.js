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

const sonido_ficha = new Audio('../assets/sonido.mp3');
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

cargaNombreJugador();

CambiaAvatar(1);
CambiaAvatar(2);


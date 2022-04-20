
function TableroArray(){
    
    for (let i=0; i<64; i++){
        
        ((i%8)!==0) && (i!==0) ?  colorCasillero ===0 ? colorCasillero=1 : colorCasillero=0 : colorCasillero=colorCasillero;
        
        Casilla=new Celda(i,colorCasillero,0);
        
        tablero.push(Casilla);
    }
}

function ArmaTablero(Array_Tablero) //arma el tablero en función del array
{
    let tableroHtml=document.getElementById("tablero__dibujo");
    tableroHtml.innerHTML="";

    Array_Tablero.forEach(element=>
    {
            let ubicacionCelda=`${element.ubicacion}`;
            const nuevaCelda = document.createElement('div');
            nuevaCelda.setAttribute("id", ubicacionCelda);

            if (element.color==0)
            {
                nuevaCelda.classList.add("celda__w");
                /* nuevaCelda.textContent=ubicacionCelda; */
                tableroHtml.appendChild(nuevaCelda);
                
            } else
            {
                nuevaCelda.classList.add("celda__b");
                tableroHtml.appendChild(nuevaCelda);
                tableroHtml.appendChild(nuevaCelda);

            }

    });
}

function DibujaTablero(array_fichas, cualFicha)  //pone las fichas en el tablero
{

    array_fichas.forEach(element =>{
        
        let Casillero_Con_Ficha=document.getElementById(element.posicion);
        Casillero_Con_Ficha.innerHTML="";
        
        const NuevaFicha=document.createElement('img');
                    
        NuevaFicha.setAttribute("src",cualFicha);
        NuevaFicha.classList.add("ficha");
        NuevaFicha.setAttribute("id", element.id);

        Casillero_Con_Ficha.appendChild(NuevaFicha);

    })
}


function agregarEnventoBoton() // Agrega evento al botón jugar
{

    const btn=document.getElementById("Iniciar");

    btn.addEventListener("click", ()=>{
    
        PartidaIniciada ? DetenerJuego() : Jugar();

    })
}

function Jugar()
{
 
    ArmaTablero(tablero);
    CargaMovimientos();
    mostrarTablero();
    grabaNombreJugador();
    creaBotonGrabar();
    creaBotonRecuperar();

    cambiaEstadoBotonIniciar();
    estilosVarios();                 // modifica elementos en el DOM para iniciar el juego
    PartidaIniciada=true;

    DibujaTablero(fichasNegras, fichaHumano);
    DibujaTablero(fichasBlancas, fichaCompu);

    turnos("negras");

}

function turnos(turno)
{
    if (turno=="negras")
    {
        agregaEventoFichas (fichasNegras,"fichasNegras");

        indicaTurno(fichasNegras);

    } else
    {
        agregaEventoFichas (fichasBlancas,"fichasBlancas");

        indicaTurno(fichasBlancas);
    }
}

function indicaTurno(fichas_indicar) //controla los turnos para jugar
{

    let aviso="";

    if (fichas_indicar==fichasNegras) 
    {
        const jugador=document.getElementById("nombreJugador2")
        aviso="Mueve " + jugador.value;
    } else
    {
        const jugador=document.getElementById("nombreJugador1")
        aviso="Mueve " + jugador.value;
    }

    const content_aviso=document.getElementById("contenedor_avisos");
    content_aviso.setAttribute("style","display:block");

    const aviso_txt=document.getElementById("aviso");
    aviso_txt.value+=aviso+='\n';
    aviso_txt.scrollTop=aviso_txt.scrollHeight;

    fichas_indicar.forEach(elemento1 =>
    {
        let Ficha_seleccionada=document.getElementById(elemento1.id);
        Ficha_seleccionada.setAttribute("style","border: 3px solid yellow; border-radius: 50%; cursor: pointer ");
    });

    setTimeout(function(){

        fichas_indicar.forEach(elemento2 =>
        {
            let Ficha_seleccionada=document.getElementById(elemento2.id);
            Ficha_seleccionada.setAttribute("style","border: 0px solid yellow; border-radius: 50%; cursor: pointer ");
        });

    }, 250);
}

function estilosVarios()
{
    const contenedor=document.getElementById("container_general");
    contenedor.style.justifyContent='space-between';

    const texto=document.getElementById("content_texto");
    texto.style.display='none';
}

function DetenerJuego()
{
    GuardaPartida();
    
    const btn=document.getElementById("Iniciar");
    btn.textContent="Jugar";
    
    let boton_a_eliminar = document.getElementById("btn_grabar");
    boton_a_eliminar.parentNode.removeChild(boton_a_eliminar);
    
    boton_a_eliminar = document.getElementById("btn_recuperar");
    boton_a_eliminar.parentNode.removeChild(boton_a_eliminar);

    const verTablero=document.getElementById("tablero__dibujo");
    verTablero.style.display='none';

    const contenedor=document.getElementById("container_general");
    contenedor.style.justifyContent='center';
    
    const content_aviso=document.getElementById("contenedor_avisos");
    content_aviso.setAttribute("style","display:none");

    const aviso_txt=document.getElementById("aviso");
    aviso_txt.value="";
    
    PartidaIniciada=false;
}

function cambiaEstadoBotonIniciar()
{
    const btn=document.getElementById("Iniciar");
    btn.textContent="Cerrar Partida";

}

function agregarEventoFichaNegra(){  // elegir negras para jugar antes de comenzar a jugar

    const fichaN=document.getElementById("eligeNegra");

    fichaN.addEventListener("mouseover",()=>
        {
            fichaN.setAttribute("style","cursor: pointer ");            
        });
    
    fichaN.addEventListener("click", ()=>{
        
        const temp=fichaHumano;
        
        fichaHumano=fichaCompu;
        fichaCompu=temp;
        
        
        const otraFicha=document.getElementById("eligeRoja");
        otraFicha.setAttribute("src",fichaCompu);
        
        fichaN.setAttribute("src",fichaHumano); //fichaCompu

    })
}

function quitarEventoAmbasFichas(){ // REVISAR QUE NO FUNCIONA BIEN


    const fichaNN=document.getElementById("eligeNegra");
    
    fichaNN.removeEventListener("mouseover")

    fichaNN.removeEventListener("mouseover", nada());
    fichaNN.removeEventListener("click", nada());
    
    const fichaRR=document.getElementById("eligeRoja");
    fichaRR.removeEventListener("mouseover", nada());
    fichaRR.removeEventListener("click", nada());

}

function agregarEventoFichaRoja(){ // elegir rojas para jugar antes de comenzar a jugar

    const fichaR=document.getElementById("eligeRoja");

    fichaR.addEventListener("mouseover",()=>
        {
            fichaR.setAttribute("style","cursor: pointer ");            
        });


    fichaR.addEventListener("click", ()=>{

        const temp=fichaHumano;
        
        fichaHumano=fichaCompu;
        fichaCompu=temp;
        
        const otraFicha=document.getElementById("eligeNegra");

        otraFicha.setAttribute("src",fichaHumano);
        
        fichaR.setAttribute("src",fichaCompu); //fichaCompu

    })
}

function mostrarTablero()
{
    const verTablero=document.getElementById("tablero__dibujo");
    verTablero.style.display='grid';
}


function muestraFichaPos(celdita)
{
    
    dibujaCuadro(celdita.id);

    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

}

function dibujaCuadro(posi)
{
    const celdaSeleccionada=document.getElementById(posi);
    const recuadro=`<div class="recuadroAmarillo" id="recuadro" ></div>`;
    celdaSeleccionada.innerHTML = recuadro;
    console.log(celdaSeleccionada);
}


function llenaFichasBlancas()
{
    let ficha_ubicacion=1;
    let id_ficha=1;

    for (i=0; i<12; i++)
    {
        ficha_nueva=new Ficha("F"+id_ficha,0,ficha_ubicacion,1,0) //ficha(id, color, ubicacion, viva, dama)

        fichasBlancas.push(ficha_nueva);

        const Casillero_lleno=tablero.find(element => element.ubicacion==ficha_ubicacion);
        Casillero_lleno.estado=1;

        ficha_ubicacion = ficha_ubicacion+2;

        ficha_ubicacion===9 && ficha_ubicacion--;

        ficha_ubicacion===16 && ficha_ubicacion++;

        id_ficha++;

    }
}

function llenaFichasNegras()
{
    let ficha_ubicacion=40;
    let id_ficha=13;

    for (i=0; i<12; i++)
    {
        ficha_nueva=new Ficha("F"+id_ficha,1,ficha_ubicacion,1,0) //ficha(id, color, ubicacion, viva, dama)

        fichasNegras.push(ficha_nueva);

        const Casillero_lleno=tablero.find(element => element.ubicacion==ficha_ubicacion);
        Casillero_lleno.estado=1;
        
        ficha_ubicacion = ficha_ubicacion+2;

        ficha_ubicacion===48 && ficha_ubicacion++;

        ficha_ubicacion===57 && ficha_ubicacion--;

        id_ficha++;

    }
}

function agregaEventoFichas (array_fichas, fichas_Color)
{
    array_fichas.forEach(element =>
    {
        let Ficha_seleccionada=document.getElementById(element.id);
        
        Ficha_seleccionada.addEventListener("mouseover",()=>
        {
            Ficha_seleccionada.setAttribute("style","cursor: pointer ");
            seleccionada==Ficha_seleccionada.id && Ficha_seleccionada.setAttribute("style","border: 3px solid yellow; border-radius: 50%; cursor: pointer ");
        });

        Ficha_seleccionada.addEventListener("click",()=>
        {
            if (seleccionada!==Ficha_seleccionada.id) // SI SELECCIONA OTRA FICHA HABIENDO UNA SELECCIONADA
            {
                const fichaAnterior=document.getElementById(seleccionada);
                fichaAnterior.setAttribute("style","border: 0px solid yellow; cursor: pointer ");
            }

            seleccionada=Ficha_seleccionada.id;  // guarda el id de la ficha seleccionada

            Ficha_seleccionada.setAttribute("style","border: 3px solid yellow; border-radius: 50%; cursor: pointer ");

            MovimientosPosibles(element.posicion, fichas_Color);
            
        });
        
    });
}


function eliminaEventosFichas(cual_array)
{

    cual_array.forEach(element =>
        {
            let Ficha_seleccionada=document.getElementById(element.id);

            Ficha_seleccionada.removeEventListener("mouseover",nada());

            Ficha_seleccionada.removeEventListener("click",nada());
            
        });
}

function nada()
{
    
}

function CambiaAvatar(cual_jugador)
{
    const avat=document.getElementById(`nombreJugador${cual_jugador}`);

    const img_avatar=document.getElementById(`avatar${cual_jugador}`);
    img_avatar.innerHTML="";
    
    url="https://api.multiavatar.com/" + JSON.stringify(avat.value)+ "?apikey=ZC6toyIYWjb4B8";

    fetch(url)
        .then(res => res.text())
        
        .then(svg => img_avatar.innerHTML=svg)  // asigna un avatar de acuerdo al nombre del jugador
    
}

function esNegra(ubi_tablero)
{
    let existe=true;
    
    fichasNegras.find(elem => 
        {
            if (elem.posicion==ubi_tablero) {existe = false};
        });

    return existe;
}

function esBlanca(ubi_tablero)
{
    let existe=true;
    
    fichasBlancas.find(elem => 
        {
            if (elem.posicion==ubi_tablero) {existe = false};
        });
    
    return existe;
}

function array_vacio(array_de_fichas)
{
    let fichas_restantes=array_de_fichas.length;

    if (fichas_restantes==0)
    {
        let ganador="";

        if (array_de_fichas==fichasBlancas)
        {
            ganador=document.getElementById("nombreJugador2").value;

        } else {
            ganador=document.getElementById("nombreJugador1").value;
        }

        Swal.fire({
            title: '¡VICTORIA!',
            text: `Gana ${ganador}`,
            imageUrl: '../assets/giphy.webp',
            imageWidth: 500,
            imageHeight: 250,
            imageAlt: 'Victoria!',
          })

        reiniciarJuego();

    } 
}

function reiniciarJuego()
{
    setTimeout(function(){
        location.reload();
    }, 4000);
}
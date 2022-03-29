
function TableroArray(){
    
    for (let i=0; i<64; i++){
        
        ((i%8)!==0) && (i!==0) ?  colorCasillero ===0 ? colorCasillero=1 : colorCasillero=0 : colorCasillero=colorCasillero;

        /* if (((i%8)!==0) && i!==0) //Alterna el color de la casilla cuando posición no es multipo de 8 o 0
        {
            if (colorCasillero===0)
            {
                colorCasillero=1;
            } else
            {
                colorCasillero=0;
            }
        } */
        
        Casilla=new Celda(i,colorCasillero,0);
        
        tablero.push(Casilla);
    }
}

function ArmaTablero(Array_Tablero)
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
                nuevaCelda.textContent=ubicacionCelda;
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
    
    IniciaJuego();
    creaBotonGrabar();
    creaBotonRecuperar();

    cambiaEstadoBotonIniciar();
    PartidaIniciada=true;

    DibujaTablero(fichasNegras,fichaHumano);
    DibujaTablero(fichasBlancas,fichaCompu);

    agragaEventoFichas (fichasNegras);
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
    /* verTablero.parentNode.removeChild(verTablero); */
    
    PartidaIniciada=false;
}

function cambiaEstadoBotonIniciar()
{
    const btn=document.getElementById("Iniciar");
    btn.textContent="Cerrar Partida";

}

function agregarEventoFichaNegra(){

    const fichaN=document.getElementById("eligeNegra");

    fichaN.addEventListener("click", ()=>{

        const otraFicha=document.getElementById("eligeRoja");
        otraFicha.style.border='0px solid';
        otraFicha.style.width='2rem';
        otraFicha.style.height='2rem';

        fichaHumano="/assets/ficha_negra.png";
        fichaCompu="/assets/ficha_roja.png";

        fichaN.style.border='4px red solid';
        fichaN.style.height='4.5rem';
        fichaN.style.width='4.5rem';
        fichaN.style.borderRadius='5px';

    })
}

function agregarEventoFichaRoja(){

    const fichaR=document.getElementById("eligeRoja");

    fichaR.addEventListener("click", ()=>{
        
        const otraFicha=document.getElementById("eligeNegra");
        otraFicha.style.border='0px solid';
        otraFicha.style.width='2rem';
        otraFicha.style.height='2rem';

        fichaHumano="/assets/ficha_roja.png";
        fichaCompu="/assets/ficha_negra.png";
        fichaR.style.border='4px red solid';
        fichaR.style.height='4.5rem';
        fichaR.style.width='4.5rem';
        fichaR.style.borderRadius='5px';

    })
}

function mostrarTablero()
{
    const verTablero=document.getElementById("tablero__dibujo");
    verTablero.style.display='grid';
}

function grabaNombreJugador()
{
    const nom_jugador=document.getElementById("nombreJugador");
    localStorage.setItem("jugador", nom_jugador.value);
}

function cargaNombreJugador()
{
    const nom_jugador=document.getElementById("nombreJugador");
    localStorage.getItem("jugador")!== null ? nom_jugador.value=localStorage.getItem("jugador") : nom_jugador.value="Humano";

    //nom_jugador.value=localStorage.getItem("jugador");
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

function creaBotonGrabar()
{
    let panel_control=document.getElementById('panel')
    const test_boton=!!document.getElementById("btn_grabar")

    if(test_boton == false)
    {
        const boton_guardar=document.createElement('button')
    
        boton_guardar.setAttribute("id","btn_grabar");
        boton_guardar.textContent="Grabar Partida";
        boton_guardar.setAttribute("class","shadow boton_graba");
        boton_guardar.addEventListener("click",()=>
                        {
                            GuardaPartida();
                        });
    
        panel_control.appendChild(boton_guardar);
    }
}

function GuardaPartida()
{
    localStorage.setItem("tablero", JSON.stringify(tablero));
    Swal.fire({
        width: '25rem',
        showConfirmButton: false,
        timer: 1000,
        title: 'Guardar',
        text: 'Partida Guardada',
        icon: 'success',
        confirmButtonText: 'OK'
      })
}

function creaBotonRecuperar()
{
    let panel_control=document.getElementById('panel');
    const test_boton=!!document.getElementById("btn_recuperar");

    if (test_boton == false)
    {
        const boton_recuperar=document.createElement('button')
    
        boton_recuperar.setAttribute("id","btn_recuperar");
        boton_recuperar.textContent="Recuperar Partida";
        boton_recuperar.setAttribute("class","shadow boton_recuperar");
        boton_recuperar.addEventListener("click",()=>
                        {
                            RecuperarPartida();
                        });
    
        panel_control.appendChild(boton_recuperar);

    }

}

function RecuperarPartida()
{
    tablero_almacenado=JSON.parse(localStorage.getItem("tablero"));

    if (localStorage.getItem("tablero")!==null)
    {
        ArmaTablero(tablero_almacenado);
    
        Swal.fire({
            width: '25rem',
            showConfirmButton: false,
            timer: 1000,
            title: 'Cargar',
            text: 'Partida Cargada',
            icon: 'success',
            confirmButtonText: 'OK'
          })

    } else
    {
        Swal.fire({
            width: '25rem',
            showConfirmButton: false,
            timer: 1000,
            title: 'Recuperar Partida',
            text: 'No hay partidas para recuperar',
            icon: 'warning',
            confirmButtonText: 'OK'
          })
    }

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

function agragaEventoFichas (array_fichas)
{
    array_fichas.forEach(element =>
    {
        let Ficha_seleccionada=document.getElementById(element.id);
        
        Ficha_seleccionada.addEventListener("mouseover",()=>
        {
            Ficha_seleccionada.setAttribute("style","cursor: pointer ");
            seleccionada==Ficha_seleccionada.id && Ficha_seleccionada.setAttribute("style","border: 3px solid yellow; border-radius: 50%; cursor: pointer ");
        });

        Ficha_seleccionada.addEventListener("mouseout",()=>
        {
            /* Ficha_turno.setAttribute("style","height: 3rem; width:3rem;"); */
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

                        MovimientosPosibles(element.posicion);
                    });
    });
}

function MovimientosPosibles(posicionFicha)
{
    movimientosCeldas.find(element =>
    {
        
        if (element.pos==posicionFicha)
        {
            limpiaRecuadros();

            const array_posibles=tablero.filter(CeldasPosibles => ((CeldasPosibles.ubicacion==element.m1 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha )|| (CeldasPosibles.ubicacion==element.m2 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha) || (CeldasPosibles.ubicacion==element.m3 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha)|| (CeldasPosibles.ubicacion==element.m4 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha) ));

            array_posibles.forEach(element => {

                const casilla_donde_mover=document.getElementById(element.ubicacion);

                casilla_donde_mover.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");

                casilla_donde_mover.setAttribute("onclick", `mueveFicha(${element.ubicacion})`);

            } );

        }

    })
}

function limpiaRecuadros()
{
    
    const casillas_vacias=tablero.filter(vacias => vacias.estado==0);  //limpia de recuadros a las casillas vacias
    
    casillas_vacias.forEach(c_vacias=>{
        const casilla_donde_mover=document.getElementById(c_vacias.ubicacion);
        casilla_donde_mover.setAttribute("style", "border: 1.5px solid black;");

        casilla_donde_mover.setAttribute("onclick", "");
    })
}

function mueveFicha(destino)
{
    const contenedor_ficha_a_eliminar=document.getElementById(seleccionada).parentNode
    const ficha_a_volar=document.getElementById(seleccionada);
    contenedor_ficha_a_eliminar.removeChild(ficha_a_volar);

    const casi=document.getElementById(destino);
    casi.setAttribute("style", "border: 1.5px solid black;");

    casi.setAttribute("onclick", "");

    fichasNegras.find(element => 
        {
            if (element.id==seleccionada)
            {
                let anterior=element.posicion;

                element.posicion=destino;


                tablero.find(casilla_nueva => 
                    {
                        if (casilla_nueva.ubicacion==destino)
                        {
                            casilla_nueva.estado=1;


                        }

                    }) 
                
                tablero.find(casilla_anterior =>
                    {
                        if (casilla_anterior.ubicacion==anterior)
                        {
                            casilla_anterior.estado=0;
 
                        }
                    })

            }
        })
    
    DibujaTablero(fichasNegras,fichaHumano);
    
    agragaEventoFichas (fichasNegras);
    
    limpiaRecuadros();

    seleccionada=0;
}


function CambiaAvatar()
{
    const avat=document.getElementById("nombreJugador");

    const img_avatar=document.getElementById("avatar");
    img_avatar.innerHTML="";
    
    url="https://api.multiavatar.com/" + JSON.stringify(avat.value);

    fetch(url)
        .then(res => res.text())
        
        .then(svg => img_avatar.innerHTML=svg) //console.log(svg))
}
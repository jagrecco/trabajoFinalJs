
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
                if (element.ubicacion>=0 && element.ubicacion<=23)
                {

                    nuevaCelda.classList.add("celda__b");

                    const NuevaFicha=document.createElement('img');
                    
                    NuevaFicha.setAttribute("src",fichaCompu);
                    NuevaFicha.classList.add("ficha");
                    NuevaFicha.setAttribute("id", "F" + ubicacionCelda);

                    NuevaFicha.addEventListener("click",()=>
                    {
                        muestraFichaPos(NuevaFicha);
                    });

                    nuevaCelda.appendChild(NuevaFicha);
                    tableroHtml.appendChild(nuevaCelda);

                } else if (element.ubicacion>=40 && element.ubicacion<=63)
                {
                    nuevaCelda.classList.add("celda__b");
                    const NuevaFicha=document.createElement('img');
                    NuevaFicha.setAttribute("src",fichaHumano);
                    NuevaFicha.classList.add("ficha");
                    NuevaFicha.setAttribute("id", "F" + ubicacionCelda);

                    NuevaFicha.addEventListener("click",()=>
                    {
                        muestraFichaPos(NuevaFicha);
                    });
                    
                    nuevaCelda.appendChild(NuevaFicha);
                    tableroHtml.appendChild(nuevaCelda);

                } else
                {
                    nuevaCelda.classList.add("celda__b");
                    nuevaCelda.textContent=ubicacionCelda;

                    nuevaCelda.addEventListener("click",()=>
                    {
                        muestraFichaPos(nuevaCelda);
                    });

                    tableroHtml.appendChild(nuevaCelda);
                }
            }

        });
}

function agregarEnventoBoton(){

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

    cambiaEstadoBotonIniciar()
    PartidaIniciada=true;
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
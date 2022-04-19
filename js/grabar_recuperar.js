function grabaNombreJugador()
{
    const nom_jugador1=document.getElementById("nombreJugador1");
    localStorage.setItem("jugador1", nom_jugador1.value);

    const nom_jugador2=document.getElementById("nombreJugador2");
    localStorage.setItem("jugador2", nom_jugador2.value);

}

function cargaNombreJugador()
{
    const nom_jugador1=document.getElementById("nombreJugador1");
    localStorage.getItem("jugador1")!== null ? nom_jugador1.value=localStorage.getItem("jugador1") : nom_jugador1.value="Humano";

    const nom_jugador2=document.getElementById("nombreJugador2");
    localStorage.getItem("jugador2")!== null ? nom_jugador2.value=localStorage.getItem("jugador2") : nom_jugador2.value="Humano";

}


function creaBotonGrabar()
{
    let panel_control=document.getElementById("botones");
    const test_boton=!!document.getElementById("btn_grabar");

    if(test_boton == false)
    {
        const boton_guardar=document.createElement('button');
    
        boton_guardar.setAttribute("type", "button");
        boton_guardar.setAttribute("id","btn_grabar");
        boton_guardar.textContent="Grabar Partida";
        boton_guardar.setAttribute("class"," boton"); //boton_graba
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

    localStorage.setItem("negras", JSON.stringify(fichasNegras));

    localStorage.setItem("blancas", JSON.stringify(fichasBlancas));

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
    let panel_control=document.getElementById("botones");
    const test_boton=!!document.getElementById("btn_recuperar");

    if (test_boton == false)
    {
        const boton_recuperar=document.createElement('button');
    
        boton_recuperar.setAttribute("type", "button");
        boton_recuperar.setAttribute("id","btn_recuperar");
        boton_recuperar.textContent="Cargar Partida";
        boton_recuperar.setAttribute("class"," boton"); //boton_recuperar
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
    negras_almacenadas=JSON.parse(localStorage.getItem("negras"));
    blancas_almacenadas=JSON.parse(localStorage.getItem("blancas"));

    if (localStorage.getItem("negras")!==null && localStorage.getItem("blancas")!==null)
    {
        ArmaTablero(tablero_almacenado);

        DibujaTablero(negras_almacenadas,fichaHumano);
        DibujaTablero(blancas_almacenadas,fichaCompu);

        agregaEventoFichas (negras_almacenadas);
    
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

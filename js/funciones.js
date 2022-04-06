
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

    /* agregaEventoFichas (fichasNegras); */

    /* agregaEventoFichas (fichasNegras,"fichasNegras"); */
    /* agregaEventoFichas (fichasBlancas,"fichasBlancas"); */
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
    fichas_indicar==fichasNegras ? aviso="Mueven las negras" : aviso="Mueven las rojas";

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


function MovimientosPosibles(posicionFicha, fichas_Color) // muestra los movimientos posibles según la ficha seleccionada
{
    movimientosCeldas.find(element =>
    {
        
        if (element.pos==posicionFicha)
        {
            limpiaRecuadros();

            if (fichas_Color == "fichasNegras") {
                // movimientos posibles
                const array_posibles=tablero.filter(CeldasPosibles => ((CeldasPosibles.ubicacion==element.m1 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha )|| (CeldasPosibles.ubicacion==element.m2 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha) || (CeldasPosibles.ubicacion==element.m3 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha)|| (CeldasPosibles.ubicacion==element.m4 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion<posicionFicha) ));

                //movimientos imposibles
                const array_imposibles1=tablero.filter(CeldasPosibles => ((CeldasPosibles.ubicacion==element.m1 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion<posicionFicha )|| (CeldasPosibles.ubicacion==element.m2 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion<posicionFicha) || (CeldasPosibles.ubicacion==element.m3 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion<posicionFicha)|| (CeldasPosibles.ubicacion==element.m4 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion<posicionFicha) ));

                array_posibles.forEach(element => {

                    const casilla_donde_mover=document.getElementById(element.ubicacion);
    
                    casilla_donde_mover.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
    
                    casilla_donde_mover.setAttribute("onclick", `mueveFicha(${element.ubicacion}, fichasNegras,"negras")`);
    
                } );

                array_imposibles1.forEach(elemento =>  // array con celdas donde no se puede mover fichasNegras
                    {
                        console.log("existe " + esNegra(elemento.ubicacion));
                        /* console.log("existe " + elemento.ubicacion); */

                        if (elemento.color==1 && esNegra(elemento.ubicacion))
                        {
                            let come_izq=0;
                            let come_der=0;

                            if (posicionFicha-7==elemento.ubicacion) 
                            {
                                come_izq=posicionFicha-14;
                                tablero.find(casillero_llegar =>
                                    {
                                        /* console.log("Veamos si está libre" + casillero_llegar.ubicacion + casillero_llegar.estado); */
                                        if (casillero_llegar.estado==0 && casillero_llegar.ubicacion==come_izq)
                                        {
                                            const casilla_donde_comer=document.getElementById(parseInt(elemento.ubicacion)-7);
                                            casilla_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                                            casilla_donde_comer.setAttribute("onclick", `mueveFicha(${parseInt(elemento.ubicacion)-14}, fichasNegras,"negras")`);
                                        }
                                        
                                        casillero_llegar.ubicacion==come_izq && console.log(casillero_llegar.ubicacion + " " + casillero_llegar.estado);
                                    } )
                            }

                            if (posicionFicha-9==elemento.ubicacion) 
                            {
                                come_der=posicionFicha-18;
                                tablero.find(casillero_llegar =>
                                    {
                                        /* console.log("Veamos si está libre"  + casillero_llegar.ubicacion + casillero_llegar.estado); */
                                        if (casillero_llegar.estado==0 && casillero_llegar.ubicacion==come_der)
                                        {
                                            const casilla_donde_comer=document.getElementById(parseInt(elemento.ubicacion)-9);
                                            casilla_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                                            casilla_donde_comer.setAttribute("onclick", `mueveFicha(${parseInt(elemento.ubicacion)-18}, fichasNegras,"negras")`);
                                        }

                                        casillero_llegar.ubicacion==come_der && console.log(casillero_llegar.ubicacion + " " + casillero_llegar.estado);
                                    } )
                            }

                            
                        }
                    })

            } else
            {
                const array_posibles=tablero.filter(CeldasPosibles => ((CeldasPosibles.ubicacion==element.m1 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion>posicionFicha )|| (CeldasPosibles.ubicacion==element.m2 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion>posicionFicha) || (CeldasPosibles.ubicacion==element.m3 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion>posicionFicha)|| (CeldasPosibles.ubicacion==element.m4 && CeldasPosibles.estado==0 && CeldasPosibles.ubicacion>posicionFicha) ));  

                const array_imposibles2=tablero.filter(CeldasPosibles => ((CeldasPosibles.ubicacion==element.m1 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion>posicionFicha )|| (CeldasPosibles.ubicacion==element.m2 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion>posicionFicha) || (CeldasPosibles.ubicacion==element.m3 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion>posicionFicha)|| (CeldasPosibles.ubicacion==element.m4 && CeldasPosibles.estado==1 && CeldasPosibles.ubicacion>posicionFicha) ));  

                array_posibles.forEach(element => {

                    const casilla_donde_mover=document.getElementById(element.ubicacion);
    
                    casilla_donde_mover.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                    casilla_donde_mover.setAttribute("onclick", `mueveFicha(${element.ubicacion}, fichasBlancas, "blancas")`);
    
                } );

               /*  array_imposibles2.forEach(elemento =>
                    {
                        if (elemento.color==1){
                            const casiila_donde_comer=document.getElementById(parseInt(elemento.ubicacion)-7);
                            
                            casiila_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                            casiila_donde_comer.setAttribute("onclick", `mueveFicha(${parseInt(elemento.ubicacion)-7}, fichasBlancas, "blancas")`);
                        }
                    }) */
            }

        }

    })
}

function limpiaRecuadros() //limpia los recuadros de los movimientos posibles antes de dibujar otros
{
    
    const casillas_vacias=tablero.filter(vacias => vacias.estado==0);
    
    casillas_vacias.forEach(c_vacias=>{
        const casilla_donde_mover=document.getElementById(c_vacias.ubicacion);
        casilla_donde_mover.setAttribute("style", "border: 1.5px solid black;");

        casilla_donde_mover.setAttribute("onclick", "");
    })
}

function mueveFicha(destino, cual_array, cual)
{

    const contenedor_ficha_a_eliminar=document.getElementById(seleccionada).parentNode
    const ficha_a_volar=document.getElementById(seleccionada);
    contenedor_ficha_a_eliminar.removeChild(ficha_a_volar);  //elimina la ficha

    const casi=document.getElementById(destino);
    casi.setAttribute("style", "border: 1.5px solid black;");

    casi.setAttribute("onclick", "");

    cual_array.find(element =>
        {
            if (element.id==seleccionada)
            {
                let anterior=element.posicion;

                element.posicion=destino;

                // actualiza el array del tablero con las celdas ocupadas y vacias
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

        
    if (cual=="negras")
    {
        DibujaTablero(fichasNegras, fichaHumano);
    
        eliminaEventosFichas(fichasNegras);

        quien_juega="blancas";
    
    } else
    {
        DibujaTablero(fichasBlancas, fichaCompu);
        
        eliminaEventosFichas(fichasBlancas);
        
        quien_juega="negras";

    }
    
    limpiaRecuadros();
    
    seleccionada=0;

    turnos(quien_juega);
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
    //usado sólo para eliminar evento de fichas
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
            console.log("Existe= " + existe);
        });
    /* console.log (existe); */
    return existe;
}
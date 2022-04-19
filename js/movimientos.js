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
                        ubicacion_ficha_comida=elemento.ubicacion;
                        
                        if (elemento.color==1 && esNegra(elemento.ubicacion))
                        {
                            let come_izq=0;
                            let come_der=0;

                            if (posicionFicha-7==elemento.ubicacion) 
                            {
                                come_izq=posicionFicha-14;
                                
                                tablero.find(casillero_llegar =>
                                    {
                                        
                                        if (casillero_llegar.estado==0 && casillero_llegar.color==1 && casillero_llegar.ubicacion==come_izq)
                                        {
                                            const casilla_donde_comer=document.getElementById(parseInt(elemento.ubicacion)-7);
                                            casilla_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");                                            
                                            casilla_donde_comer.setAttribute("onclick", `mueveFicha(${come_izq}, fichasNegras,"negras", ${ubicacion_ficha_comida})`);
                                        }
                                        
                                        /* casillero_llegar.ubicacion==come_izq && console.log(casillero_llegar.ubicacion + " " + casillero_llegar.estado + " elemento.ubicacion=" + elemento.ubicacion); */
                                    } )
                            }

                            if (posicionFicha-9==elemento.ubicacion) 
                            {
                                come_der=posicionFicha-18;
                                tablero.find(casillero_llegar =>
                                    {

                                        if (casillero_llegar.estado==0 && casillero_llegar.color==1 && casillero_llegar.ubicacion==come_der)
                                        {
                                            const casilla_donde_comer=document.getElementById(parseInt(elemento.ubicacion)-9);
                                            casilla_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                                            casilla_donde_comer.setAttribute("onclick", `mueveFicha(${come_der}, fichasNegras,"negras", ${ubicacion_ficha_comida})`);
                                        }

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

                array_imposibles2.forEach(elemento =>  // array con celdas donde no se puede mover fichasNegras
                {
                    ubicacion_ficha_comida=elemento.ubicacion;

                    if (elemento.color==1 && esBlanca(elemento.ubicacion))
                    {
                        let come_izq=0;
                        let come_der=0;

                        if (posicionFicha+7==elemento.ubicacion) 
                        {
                            come_izq=posicionFicha+14;
                            tablero.find(casillero_llegar =>
                                {
                                    
                                    if (casillero_llegar.estado==0 && casillero_llegar.color==1 && casillero_llegar.ubicacion==come_izq)
                                    {
                                        const casilla_donde_comer=document.getElementById(parseInt(elemento.ubicacion)+7);
                                        casilla_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                                        casilla_donde_comer.setAttribute("onclick", `mueveFicha(${come_izq}, fichasBlancas,"blancas", ${ubicacion_ficha_comida})`);
                                    }
                                    
                                    /* casillero_llegar.ubicacion==come_izq && console.log(casillero_llegar.ubicacion + " " + casillero_llegar.estado); */
                                } )
                        }

                        if (posicionFicha+9==elemento.ubicacion) 
                        {
                            come_der=posicionFicha+18;
                            tablero.find(casillero_llegar =>
                                {
                                    
                                    if (casillero_llegar.estado==0 && casillero_llegar.color==1 && casillero_llegar.ubicacion==come_der)
                                    {
                                        const casilla_donde_comer=document.getElementById(parseInt(elemento.ubicacion)+9);
                                        casilla_donde_comer.setAttribute("style", "border: 3px solid yellow; border-radius: 15%; cursor: pointer; cursor: pointer");
                                        casilla_donde_comer.setAttribute("onclick", `mueveFicha(${come_der}, fichasBlancas,"blancas", ${ubicacion_ficha_comida})`);
                                    }

                                    /* casillero_llegar.ubicacion==come_der && console.log(casillero_llegar.ubicacion + " " + casillero_llegar.estado); */
                                } )
                        }
                        
                    }
                })
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

function mueveFicha(destino, cual_array, cual, ficha_comida)
{

    sonidoSi=document.getElementById("sonido");
    sonidoSi.checked && sonido_ficha.play();

    const contenedor_ficha_a_eliminar=document.getElementById(seleccionada).parentNode
    const ficha_a_volar=document.getElementById(seleccionada);
    contenedor_ficha_a_eliminar.removeChild(ficha_a_volar);  //elimina la ficha que se movió

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
        ficha_comida !==undefined && eliminaFichaComida(cual, ficha_comida);

        DibujaTablero(fichasNegras, fichaHumano);
    
        eliminaEventosFichas(fichasNegras);

        quien_juega="blancas";
    
    } else
    {
        ficha_comida !==undefined && eliminaFichaComida(cual, ficha_comida);

        DibujaTablero(fichasBlancas, fichaCompu);
        
        eliminaEventosFichas(fichasBlancas);
        
        quien_juega="negras";

    }
    
    limpiaRecuadros();
    
    seleccionada=0;

    turnos(quien_juega);
    
}

function eliminaFichaComida(cual_juega, ubicacion_ficha_comida)
{
    if (cual_juega=="negras")
    {
        const indice_a_eliminar=fichasBlancas.findIndex((elemento, indice_a_eliminar) =>
        {
            if (elemento.posicion==ubicacion_ficha_comida)
            {
                return true;
            }
        });

        fichasBlancas.splice(indice_a_eliminar, 1);

        tablero.find(celda_a_limpiar =>
            {
                if (celda_a_limpiar.ubicacion==ubicacion_ficha_comida)
                {
                    celda_a_limpiar.estado=0;
                }
            });
        
        ArmaTablero(tablero);
        DibujaTablero(fichasBlancas, fichaCompu);

        array_vacio(fichasBlancas);

        const jugador=document.getElementById("nombreJugador2")
        aviso= jugador.value +" comió una ficha en la casilla " + ubicacion_ficha_comida + " :)";
        
    } else
    {
        const indice_a_eliminar=fichasNegras.findIndex((elemento, indice_a_eliminar) =>
        {
            if (elemento.posicion==ubicacion_ficha_comida)
            {
                return true;
            }
        });

        fichasNegras.splice(indice_a_eliminar, 1);

        tablero.find(celda_a_limpiar =>
            {
                if (celda_a_limpiar.ubicacion==ubicacion_ficha_comida)
                {
                    celda_a_limpiar.estado=0;
                }
            });
        
        ArmaTablero(tablero);
        DibujaTablero(fichasNegras, fichaHumano);

        array_vacio(fichasNegras);

        const jugador=document.getElementById("nombreJugador1")
        aviso= jugador.value +" comió una ficha en la casilla " + ubicacion_ficha_comida + " :)";
        
    }

    const aviso_txt=document.getElementById("aviso");
    aviso_txt.value+=aviso+='\n';
    aviso_txt.scrollTop=aviso_txt.scrollHeight;
}


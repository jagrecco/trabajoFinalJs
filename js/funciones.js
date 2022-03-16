
function TableroArray(){
    
    for (let i=0; i<64; i++){
        
        if (((i%8)!==0) && i!==0) //Alterna el color de la casilla cuando posición no es multipo de 8 o 0
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
}

function ArmaTablero()

{
    let tableroHtml=document.getElementById("tablero__dibujo");
    tableroHtml.innerHTML="";

    tablero.forEach(element=>
        {
            let ubicacionCelda=`${element.ubicacion}`;
            const nuevaCelda = document.createElement('div');
            nuevaCelda.setAttribute("id", ubicacionCelda);
            nuevaCelda.addEventListener("click",muestraFichaPos());

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
                    //NuevaFicha.addEventListener("click",muestraFichaPos());
                    NuevaFicha.setAttribute("id", "F" + ubicacionCelda);
                    NuevaFicha.onclick=()=>{muestraFichaPos(this)}

                    nuevaCelda.appendChild(NuevaFicha);
                    tableroHtml.appendChild(nuevaCelda);

                } else if (element.ubicacion>=40 && element.ubicacion<=63)
                {
                    nuevaCelda.classList.add("celda__b");
                    const NuevaFicha=document.createElement('img');
                    NuevaFicha.setAttribute("src",fichaHumano);
                    NuevaFicha.classList.add("ficha");
                    NuevaFicha.addEventListener("click",muestraFichaPos());
                    NuevaFicha.setAttribute("id", "F" + ubicacionCelda);
                    
                    nuevaCelda.appendChild(NuevaFicha);
                    tableroHtml.appendChild(nuevaCelda);

                } else
                {
                    nuevaCelda.classList.add("celda__b");
                    nuevaCelda.textContent=ubicacionCelda;
                    tableroHtml.appendChild(nuevaCelda);
                }
            }

        });
}

function agregarEnventoBoton(){

    const btn=document.getElementById("Iniciar");

    btn.addEventListener("click", ()=>{
        IniciaJuego();
    })
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
    nom_jugador.value=localStorage.getItem("jugador");
}

function muestraFichaPos()
{
    console.log(this.id);
}

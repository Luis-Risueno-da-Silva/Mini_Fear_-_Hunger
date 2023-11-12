let main = document.getElementById("main")

let menu__config = document.getElementById("menu__config")
let protagonistas__box = document.getElementById("protagonistas__box")
let dificultades__box = document.getElementById("dificultades__box")
let btn__jugar = document.getElementById("btn__jugar")

let pantalla__juego = document.getElementById("pantalla__juego")
let caja__informacion= document.getElementById("caja__informacion")


let enemigo__img = document.getElementById("enemigo__img")
let estado__enemigo = document.getElementById("estado__enemigo")
let enemigo__box = document.getElementById("enemigo__box")
let puntos__vida__Enemigo = document.getElementById("puntos__vida__Enemigo")

let jugador__img = document.getElementById("jugador__img")
let personaje__box = document.getElementById("personaje__box")
let puntos__vida__Jugador = document.getElementById("puntos__vida__Jugador")
let estado__jugador = document.getElementById("estado__jugador") 


let info__enemigo = document.getElementById("info__enemigo")
let info__jugador = document.getElementById("info__jugador")

let caja__texto = document.getElementById("caja__texto")


let caja__botones = document.getElementById("caja__botones")
let boton__ataque = document.getElementById("boton__ataque")
let boton__magia = document.getElementById("boton__magia")
let boton__defensa = document.getElementById("boton__defensa")
let boton__otraPartida = document.getElementById("boton__otraPartida")



let personaje;
let dificultad;

let enemigos = [
    "Maneba",
    "Jaggedjaw",
    "Priest",
    "Yellow_mage",
    "Lizardman"
]

let monstruo;

// Se carga el menú del juego
const cargarMenu = () => {

    menu__config.classList.add("cargarElemento")
    btn__jugar.classList.add("cargarElemento")

    btn__jugar.disabled = true;

    setTimeout(function() {
        btn__jugar.disabled = false
    }, 3000)

}

// Seleccionar al personaje con el que se va a jugar
const configurarMenu = (event) => {

    let personajes = protagonistas__box.querySelectorAll("IMG")

    let dificultades = dificultades__box.querySelectorAll("INPUT")

    // Seleccionar al personaje protagonista
    if(event.target.tagName == "IMG"){

        protagonistas__box.classList.remove("noSeleccionado")

        for(let i = 0; i < personajes.length; i++){
            personajes[i].classList.remove("seleccionado")
        }//for

        event.target.classList.add("seleccionado")
    }//if

    // Seleccionar la dificultad
    if(event.target.tagName == "INPUT"){

        dificultades__box.classList.remove("noSeleccionado")

        for(let i = 0; i < dificultades.length; i++){
            dificultades[i].previousElementSibling.classList.remove("seleccionado__dificultad")
        }//for

        event.target.previousElementSibling.classList.add("seleccionado__dificultad")

    }//if

    if(event.target.tagName == "BUTTON"){

        for(let i = 0; i < personajes.length; i++){

            // Comprobar que se ha seleccionado un personjae
            if(personajes[i].classList == "seleccionado"){
                personaje = personajes[i].src.split("/")[10];    
            }else{
                protagonistas__box.classList.add("noSeleccionado")
            }

        }//for de i

        // Comprobar que se ha seleccionado una dificultad
        for(let j = 0; j < dificultades.length; j++){

            if(dificultades[j].previousElementSibling.classList == "seleccionado__dificultad"){
                
                dificultad = dificultades[j].previousElementSibling.innerHTML

            }else{
                dificultades__box.classList.add("noSeleccionado")
            }

        }//for de j

        if(personaje != null && dificultad != null){
            cargarJuego( personaje.split("_")[0], dificultad )
        }

    }//if

}



// Se carga el juego una vez se ha configurado
const cargarJuego = (personaje, dificultad) => {

    // console.log(personaje)
    // console.log(dificultad)

    // Jugador seleccionado
    jugador__img.src = "./assets/images/"+personaje+".webp"
    info__jugador.children[0].innerHTML = personaje;
    caja__texto.innerHTML = "Le llega el turno a "+personaje+", ¿Qué deseas hacer?"

    // Enemigo, es aleatorio el enemigo que aparece
    let random = Math.floor(Math.random()* enemigos.length)
    monstruo = enemigos[random]

    enemigo__img.src = "./assets/images/enemigos/"+monstruo+".webp"
    info__enemigo.children[0].innerHTML = monstruo;


    // Hacer desaparecer el menú de configuración
    menu__config.classList.add("desaparecer")

    // Hacer aparecer el juego
    enemigo__box.classList.remove("desaparecer")
    personaje__box.classList.remove("desaparecer")
    caja__informacion.classList.remove("desaparecer")

    jugador__img.classList.add("cargarElemento")
    enemigo__img.classList.add("cargarElemento")

    info__enemigo.classList.add("cargarInfoElemento")
    info__jugador.classList.add("cargarInfoElemento")

    caja__informacion.classList.add("cargarElemento")

    caja__texto.classList.add("cargarElementosFooter")
    caja__botones.classList.add("cargarElementosFooter")

    boton__ataque.disabled = true;
    boton__magia.disabled = true;
    boton__defensa.disabled = true;

    //Los botones se habilitan después de 3 segundos
    setTimeout(function() {
        boton__ataque.disabled = false;
        boton__magia.disabled = false;
        boton__defensa.disabled = false;
    }, 3000); 

}


// Al hacer clic en el botón de ataque
const btnAtaque = () => {

    // El nombre del personaje
    let personaje = info__jugador.children[0].innerHTML;

    jugador__img.classList.remove("cargarElemento")
    enemigo__img.classList.remove("cargarElemento")

    jugador__img.classList.remove("parpadeo")
    enemigo__img.classList.remove("parpadeo")

    let random;

    let vidaResta;

    let defensa = false;

    random = Math.floor(Math.random()* 10)

    //Si el número aleatorio es menor de 3 --> Se falla el ataque
    if(random < 3){
        caja__texto.innerHTML = personaje+" falla el ataque";

        //Le toca el turno al enemigo
        desactivarBotones();
        setTimeout(function() {
            
            turnoEnemigo(defensa);

        }, 2000);

    //Si el número aleatorio es mayor de 3 --> El ataque acierta
    }else{
        //El ataque puede ser o no crítico
        random = Math.floor(Math.random()* 10)

        //La probabilidad de crítico es baja
        if(random >= 8){
            caja__texto.innerHTML = "!"+personaje+" realiza un críticio!";
            
            vidaResta = 50;
            
            puntos__vida__Enemigo.innerHTML = 
            parseInt(puntos__vida__Enemigo.innerHTML) - vidaResta;

            enemigo__img.classList.add("parpadeo")

            puntosVida(puntos__vida__Enemigo, puntos__vida__Jugador)

            //Le toca el turno al enemigo
            desactivarBotones();
            setTimeout(function() {
            
                turnoEnemigo(defensa);
    
            }, 2000);
        }else{
            caja__texto.innerHTML = personaje+" hace un ataque exitoso";
            
            vidaResta = 25;

            enemigo__img.classList.add("parpadeo")

            puntos__vida__Enemigo.innerHTML = 
            parseInt(puntos__vida__Enemigo.innerHTML) - vidaResta;

            puntosVida(puntos__vida__Enemigo, puntos__vida__Jugador)

            //Le toca el turno al enemigo
            desactivarBotones();
            setTimeout(function() {
            
                turnoEnemigo(defensa);
    
            }, 2000);
        }// if-else

    }// if-esle

}

// Al hacer clic sobre el boton de magia
const btnMagia = () => {

    // El nombre del personaje
    let personaje = info__jugador.children[0].innerHTML;

    let random;

    let vidaResta;

    let defensa = false;

    random = Math.floor(Math.random()* 10)

        /*
            La magia falla más a menudo que los ataques normales
            A cambio, hace tanto daño como un crítico
        */
        if(random < 7){
            caja__texto.innerHTML = personaje+" ha fallado con su magia";

            //Le toca el turno al enemigo
            desactivarBotones();
            setTimeout(function() {
            
                turnoEnemigo(defensa);
    
            }, 2000);
        }else{
            caja__texto.innerHTML = personaje+" acierta con su magia"

            enemigo__img.classList.add("parpadeo")

            vidaResta = 50;

            puntos__vida__Enemigo.innerHTML =
            parseInt(puntos__vida__Enemigo.innerHTML) - vidaResta;

            puntosVida(puntos__vida__Enemigo, puntos__vida__Jugador)

            //Le toca el turno al enemigo
            desactivarBotones();
            setTimeout(function() {
            
                turnoEnemigo(defensa);
    
            }, 2000);
        }



}

// Manejar el click 
const manejarClick = (event) => {

    // El nombre del personaje
    let personaje = info__jugador.children[0].innerHTML;

    enemigo__img.classList.remove("parpadeo")
    jugador__img.classList.remove("parpadeo")

    let defensa = false;

    //Si pulsamos el boton de ataque
    if(event.target.id == "boton__ataque"){

       btnAtaque();

    }// if --> ataque

    //Si pulsamos el boton de magia
    if(event.target.id == "boton__magia"){

        btnMagia();

    }//if --> magia
    
    // Si pulsamos el boton de defensa
    if(event.target.id == "boton__defensa"){

        caja__texto.innerHTML = personaje+" se defiende del siguiente ataque";
        defensa = true;
        //Le toca el turno al enemigo       
            turnoEnemigo(defensa);

    }//if --> Defensa



    //Si pulsamos el boton para otra partida
    if(event.target.id == "boton__otraPartida"){
        window.location.reload();
    }// if --> otra partida  



}

// Se desactivan los botones mientras el enemigo ataca
const desactivarBotones = () => {

    let botones = caja__botones.querySelectorAll(".boton")

    random = Math.floor(Math.random()* 10)

    for(let i = 0; i < botones.length; i++){
        botones[i].disabled = true;
        botones[i].classList.add("deshabilitado")
    }

}


// Turno del enemigo
const turnoEnemigo = (defensa) => {

    jugador__img.classList.remove("cargarElemento")
    enemigo__img.classList.remove("cargarElemento")

    jugador__img.classList.remove("parpadeo")
    enemigo__img.classList.remove("parpadeo")

    let random;
    let vidaResta;
    let botones = caja__botones.querySelectorAll(".boton")

    random = Math.floor(Math.random()* 10)

    
    for(let i = 0; i < botones.length; i++){
        botones[i].disabled = false;
        botones[i].classList.remove("deshabilitado")
    }

    if(random < 3){

        //El enemigo falla el ataque
    caja__texto.innerHTML= "El enemigo falla el ataque"

    }else{

        //El enemigo ataca al jugador con un crítico
        if(random < 3){

            caja__texto.innerHTML = "¡El ataque del enemigo es crítico!"
    
            jugador__img.classList.add("parpadeo")

            switch (dificultad) {
                case "Fácil":
                    vidaResta = 50 * 0.8
                    break;
                case "Normal":
                    vidaResta = 50
                    break;
                case "Difícil":
                    vidaResta = 50 * 1.4
                    break;
            }
    
            if(defensa == true){
                puntos__vida__Jugador.innerHTML =
                parseInt(puntos__vida__Jugador.innerHTML) - vidaResta / 2;
            }else{
                puntos__vida__Jugador.innerHTML =
                parseInt(puntos__vida__Jugador.innerHTML) - vidaResta;
            }
    
        }else{
    
            //El enemigo ataca al jugador con un ataque normal
            caja__texto.innerHTML = "El enemigo acierta el ataque"
    
            jugador__img.classList.add("parpadeo")

            switch (dificultad) {
                case "Fácil":
                    vidaResta = 25 * 0.8
                    break;
                case "Normal":
                    vidaResta = 25
                    break;
                case "Difícil":
                    vidaResta = 25 * 1.4
                    break;
            }

            if(defensa == true){
                puntos__vida__Jugador.innerHTML =
                parseInt(puntos__vida__Jugador.innerHTML) - vidaResta / 2;
            }else{
                puntos__vida__Jugador.innerHTML =
                parseInt(puntos__vida__Jugador.innerHTML) - vidaResta;
            }

        }//if-else

    }// if-else

    //Comprobamos si alguién ha muerto
    puntosVida(puntos__vida__Enemigo, puntos__vida__Jugador)

    

}


//Comprobar los puntos de vida del enemigo y del jugador
const puntosVida = (puntos__vida__Enemigo, puntos__vida__Jugador) => {

    // El nombre del personaje
    let personaje = info__jugador.children[0].innerHTML;

    //El jugador se queda sin vida
    if(parseInt(puntos__vida__Jugador.innerHTML) <= 0){
        estado__jugador.innerHTML = "Muerto"

        boton__ataque.classList.add("desaparecer");
        boton__magia.classList.add("desaparecer");
        boton__defensa.classList.add("desaparecer");

        boton__otraPartida.classList.remove("desaparecer")
        caja__texto.innerHTML = personaje+" ha muerto...";
    }

    // El enemigo se queda sin vida
    if(parseInt(puntos__vida__Enemigo.innerHTML) <= 0){
        enemigo__img.src = "./assets/images/enemigos/"+monstruo+"_dead.webp";
        enemigo__img.classList.add("muerto");
        estado__enemigo.innerHTML = "Muerto";

        boton__ataque.classList.add("desaparecer");
        boton__magia.classList.add("desaparecer");
        boton__defensa.classList.add("desaparecer");

        boton__otraPartida.classList.remove("desaparecer")
        caja__texto.innerHTML = personaje+" ha ganado batalla";
    }
    
}



menu__config.addEventListener("click", configurarMenu)


caja__botones.addEventListener("click", manejarClick)
document.addEventListener("DOMContentLoaded", cargarMenu)
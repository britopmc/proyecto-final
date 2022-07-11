//1 DECLARACION DE VARIABLES


//variables por lectura DOM

let caja_cards = document.getElementById("caja_servicios")



//3 DECLARACION DE FUNCIONES


function leer_servicios(){
    fetch('servicios.json')
    .then(res => res.json())
    .then(data => {
        console.log(data)

        for(let cont=0 ; cont < data.length ; cont++){

            generar_card(data[cont].descripcion, data[cont].imagen)

        }

    })
}


function generar_card(titulo, foto){


let card_nueva = document.createElement("div")
let figura_nueva = document.createElement("figure")
let descri_nueva = document.createElement("figcaption")
let imagen_nueva = document.createElement("img")


descri_nueva.textContent = titulo
descri_nueva.className = "figure-caption text-center"

imagen_nueva.src = foto
imagen_nueva.className = "figure-img img-fluid rounded wow fadeIn"


figura_nueva.appendChild(imagen_nueva)
figura_nueva.appendChild(descri_nueva)



card_nueva.className = "figure col-md-12 col-lg-4"
card_nueva.appendChild(figura_nueva)


caja_cards.appendChild(card_nueva)

}



//4 EJECUCION

leer_servicios()

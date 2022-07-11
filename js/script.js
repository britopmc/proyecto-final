//1 DECLARACION DE VARIABLES

//array para datos de lectura

lect = []


//variables por lectura DOM


let cardClienteA = document.getElementById("cardClienteA")

let fotoCliente = document.getElementById("fotoCliente")




let boton_usuario_random = document.getElementById("btn5")



//2 DECLARACION DE CLASES


//3 DECLARACION DE FUNCIONES



function leer_API(direccion){
    fetch(direccion)
    .then((response) => response.json())
    .then((datos) => {
        lect = datos
        }
    )

}

function usuario_Random(){
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
            lect = data
            console.log(data)
        }
      });     
}

    

//4 EJECUCION

// EVENTOS



boton_usuario_random.onclick = () => {
    
    usuario_Random()

    cardClienteA.innerHTML=""

    let titulo = document.createElement("h2")
    titulo.classList.add("card-title")
    titulo.textContent = lect.results[0].name.first + " " + lect.results[0].name.last
    
    cardClienteA.appendChild(titulo) 


    let foto = document.createElement("img")
    foto.classList.add("card-img-top")

    foto.setAttribute('src', lect.results[0].picture.medium)
    cardClienteA.appendChild(foto)

    
    cardClienteA.className="card activo"


}


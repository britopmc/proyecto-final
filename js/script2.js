//1 DECLARACION DE VARIABLES

// array para almacenar datos de los productos en stock
const productos = []

//array para datos de lectura
lect = []

//control de acceso al stock
let controlpass = 25
let control

//Aviso por ingreso de datos

let msj =""

//variables por lectura DOM


let contrase2 = document.getElementById("contra2")


let boton_ver_stock = document.getElementById("btn3")
let boton_agregar_stock = document.getElementById("btn4")

let formu_stock = document.getElementById("formu_stock")

let form_marca = document.getElementById("form_marca")
let form_precio = document.getElementById("form_precio")
let form_descripcion = document.getElementById("form_descripcion")

let avisos_stock = document.getElementById("agregado_stock")

let caja_cards = document.getElementById("caja_productos")




//2 DECLARACION DE CLASES


class Producto{

    constructor(marca, descripcion, precio){
        this.marca = marca;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    consulta(){
        return (this.marca + " - " + this.descripcion + " - " + this.precio)
    }

}



//3 DECLARACION DE FUNCIONES

function leer_productos(){
    stock_storage2=JSON.parse(localStorage.getItem("stock"))
    fetch('productos.json')
    .then(res => res.json())
    .then(data => {
        for(let cont=0 ; cont < data.length ; cont++){
            productos.push(new Producto(data[cont].marca, data[cont].descri, data[cont].precio))
        }
    })
}

function ver_stock(){

    ver_stock_storage()

    caja_cards.innerHTML=""
    
    for(const pro of productos){

        generar_card(pro.marca, pro.descripcion, pro.precio)

    }

}

function ver_stock_storage(){

    stock_storage2=JSON.parse(localStorage.getItem("stock"))
    i=0;
    productos.length=0

    if(stock_storage2.length){
        while(i<stock_storage2.length){
        
            productos.push(new Producto(stock_storage2[i].marca, stock_storage2[i].descripcion, stock_storage2[i].precio))
            i++
        }
    }
    

}

function probar_valores(){

    if(!form_marca.value.trim()){
        msj= msj + "\nNo ingreso la marca de forma correcta"
    }
    if(!form_precio.value || isNaN(parseInt(form_precio.value))){
        msj = msj + "\nNo ingreso el precio de forma correcta"
    }
    if(!form_descripcion.value){
        msj = msj + "\nNo ingreso la descripcion de forma correcta"
    }
    if(msj !==""){
        avisos_stock.innerText = msj
        msj=""
    }else{
        productos.push(new Producto(form_marca.value, form_descripcion.value, form_precio.value))
        
        alerta_Exito("Buen trabajo", "El producto "+ form_descripcion.value + " fue agregado con exito")
        stock_storage=JSON.stringify(productos)
        localStorage.setItem("stock", stock_storage)

        formu_stock.className="inactivo"
        msj=""
        avisos_stock.innerText = msj
        form_marca.value = ""
        form_precio.value = ""
        form_descripcion.value = ""
     }

}

function agregarstock(valor){
    
    if(valor==controlpass){

        avisos_stock.innerText=""
        formu_stock.className="activo" 
        contrase2.value = ""

    }else{
        avisos_stock.innerText = "Usted ingreso una contrasena erronea"
        contrase2.value = ""
    }
}

function alerta_Exito(titulo, mensaje){

    swal({
        title: titulo,
        text: mensaje,
        icon: "success",
      });

}


function leer_API(direccion){
    fetch(direccion)
    .then((response) => response.json())
    .then((datos) => {
        lect = datos
        }
    )

}



function generar_card(descripcion, descripcion2, precio){

    let card_nueva = document.createElement("div")
    let figura_nueva = document.createElement("figure")
    let descri_nueva = document.createElement("figcaption")
    let descri2_nueva = document.createElement("h3")
    let precio_nueva = document.createElement("h3")
    
    descri_nueva.textContent = descripcion
    descri_nueva.className = "figure-caption text-center"
    
    descri2_nueva.textContent = descripcion2
    descri2_nueva.className = "figure-caption text-center"
    

    precio_nueva.textContent = precio + " AR$"
    precio_nueva.className = "figure-caption text-center"
    
    
    figura_nueva.appendChild(descri_nueva)
    figura_nueva.appendChild(descri2_nueva)
    figura_nueva.appendChild(precio_nueva)
    
    
    card_nueva.className = "figure col-md-12 col-lg-4"
    card_nueva.appendChild(figura_nueva)
    
    
    caja_cards.appendChild(card_nueva)
    
    }

    

//4 EJECUCION

// EVENTOS


boton_ver_stock.onclick = () => ver_stock()
 

contrase2.addEventListener("keypress",(e)=>{

    if(e.keyCode === 13){
        agregarstock(contrase2.value)
    }
})

boton_agregar_stock.addEventListener("click", () =>{
    agregarstock(contrase2.value)
})

form_marca.addEventListener("keypress",(e)=>{

    if(e.keyCode === 13){
        probar_valores()
    }
})

form_precio.addEventListener("keypress",(e)=>{

    if(e.keyCode === 13){
        probar_valores()
    }
})

form_descripcion.addEventListener("keypress",(e)=>{

    if(e.keyCode === 13){
        probar_valores()
    }
})


leer_productos()


let servicios = [
    { id: 4, categoria: "Corte", tipo: "Clasico", precio: 14.00, cantidad: 0},
    { id: 7, categoria: "Corte", tipo: "Premium", precio: 20.00, cantidad: 0},
    { id: 2, categoria: "Barba", tipo: "Clasica", precio: 12.00,   cantidad: 0},
    { id: 9, categoria: "SpaFacial", tipo: "Premium", precio: 26.00,cantidad: 0},
]



let carrito = [];


document.addEventListener("DOMContentLoaded", () =>{
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        carritoPantalla()
    } 
})




function botonesAgregarServicio() {

    servicios.forEach(servicio => {
        let servicioDivs = document.querySelectorAll(`.${servicio.categoria}${servicio.tipo}`)
        
        servicioDivs.forEach( servicioDiv => {
            let boton = document.createElement("div")
            boton.innerHTML =`<button id=ServicioN${servicio.id}> Agregar al carrito </button>`
            servicioDiv.appendChild(boton)
            
        });

    });
}


botonesAgregarServicio()


function eventosBotones() {

        servicios.forEach(servicio => {
            let botonCarrito = document.querySelector(`#ServicioN${servicio.id}`)
            botonCarrito.addEventListener("click", () => agregadoAlCarrito(servicio.id))
        });
    }

    eventosBotones()



    function agregadoAlCarrito(idServicio) {
        let servicioBuscado = servicios.find(servicio => servicio.id === idServicio);
        let indiceEnCarrito = carrito.findIndex(servCarrito => servCarrito.id === servicioBuscado.id);
        if (indiceEnCarrito !== -1) {
            carrito[indiceEnCarrito].cantidad++;
        } else {
            servicioBuscado.cantidad = 1;
            carrito.push(servicioBuscado);
        }
        carritoPantalla();
    }


let numeroServicios = document.querySelector("#numeroServicios");
let contenedorCarrito = document.querySelector("#Carrito");
let contenedorCarritoAll = document.querySelector(".ContainerCarrito")
let vaciarServicio = document.createElement("div")

//Vaciar Carrito
vaciarServicio.innerHTML = `<button class ="Vaciar">Vaciar carrito</button>`
contenedorCarritoAll.appendChild(vaciarServicio)
let vaciarServicios = document.querySelector(".Vaciar")
vaciarServicios.addEventListener("click", vaciarCarrito)



function carritoPantalla() {

    contenedorCarrito.innerHTML = "";
    
        let total = 0;

        let totalServicioCarrito = 0;

        carrito.forEach(servicio => {
        total += servicio.cantidad * servicio.precio;
        totalServicioCarrito += servicio.cantidad;

        let servicioP = document.createElement("div")
        servicioP.classList.add("resultadoCarrito")
        numeroServicios.innerHTML = `<p><i class="fa-sharp fa-solid fa-cart-shopping"></i> ${totalServicioCarrito}</p>`;

        servicioP.innerHTML =

        `<p class="eliminarItem"><i class="fa-sharp fa-solid fa-trash"></i></p>` +
        `<p class="TextoCarrito">${servicio.categoria} ${servicio.tipo}</p>`+
        `<p class="cantidadServicios">Cantidad: ${servicio.cantidad}</p>`

        contenedorCarrito.appendChild(servicioP)

        servicioP.querySelector(".eliminarItem").addEventListener("click", () => eliminarServicio(servicio.id));

        localStorage.setItem("carrito", JSON.stringify(carrito))

        });

        
        let totalCarrito = document.createElement("div");

        totalCarrito.innerHTML = `<p class="totalServ">TOTAL: $${total.toFixed(2)}</p>`;
    
        contenedorCarrito.appendChild(totalCarrito);
}






function eliminarServicio(id) {
    let index = carrito.findIndex(servicio => servicio.id === id);
    if (index === -1){
        return;
    }else if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
    } else {
      carrito.splice(index, 1);
    }
    carritoPantalla();
  }


function vaciarCarrito(){

    carrito = [];
    carritoPantalla();
    numeroServicios.innerHTML = `<p><i class="fa-sharp fa-solid fa-cart-shopping"></i> 0</p>`;

}

/*
* TODO: 
* - Quitar un servicio de la cotización
* - Pedir los datos de contacto antes de mandar la cotización final
* - Mostrar el IVA al final
* - Sumar el valor de la cotización + IVA
* - Cupón de descuento (?)
*/

// Reviso si ya hay alguna cotización y si la hay, la corgo
//document.onload(cargarCotizacion());

// Creo el array cotización que contendrá el listado completo de servicios
var cotizacion = [];

// Función para crear los objetos que se irán agregando a la cotización
function agregarACotizacion (categoria, nombre, entrega, precio) {
    let servicio = {
        categoria: categoria,
        nombre: nombre,
        entrega: entrega,
        precio: precio
    }
    cotizacion.push(servicio);
    localStorage.setItem('cotizacionLocal', JSON.stringify(cotizacion));
    mostrarCotizacion(categoria, nombre, entrega, precio);
    sumarDias();
    sumarPrecios();
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Servicio agregado',
        showConfirmButton: false,
        timer: 1500
    })
}

// Muestro el estado actual de la cotización
function quitarACotizacion (categoria, nombre, entrega, precio) {
    let servicio = {
        categoria: categoria,
        nombre: nombre,
        entrega: entrega,
        precio: precio
    }
    cotizacion.unshift(servicio);
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'error',
        title: 'Servicio eliminados',
        showConfirmButton: false,
        timer: 1500
    })
}

function mostrarCotizacion (categoria, nombre, entrega, precio) {
    let itemLista = document.createElement('li');
    itemLista.classList.add('has-border-left.my-6');
    itemLista.innerHTML = `
    <div class="columns px-3 py-3">
        <div class="column is-9">
            <h4 class="title is-5">${nombre}</h4>
            <p class="subtitle is-6 is-uppercase mb-0 has-text-morado">${categoria}</p>
            <p class="is-italic pt-0">Tiempo de entrega: ${entrega} días</p>
        </div>
        <div class="column is-2">
            <h4 class="title is-5 has-text-weight-bold">${Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precio)}</h4>
        </div>
        <div class="column is-1 is-narrow">
            <button class="delete is-small"></button>
        </div>
    </div>`;
    document.getElementById('cotizacion').appendChild(itemLista);
}

// Sumar días de entrega 
function sumarDias () {
    let entregaFinal = 0;
    cotizacion.forEach(servicio => {
        entregaFinal = entregaFinal + servicio.entrega;
    });
    document.getElementById('tiempoFinalEntrega').innerHTML = `Tiempo de entrega aproximado: ${entregaFinal} días`;
}

// Sumar precios
function sumarPrecios () {
    let precioFinal = 0;
    cotizacion.forEach(servicio => {
        precioFinal = precioFinal + servicio.precio;
        let formatoPrecio = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
        precioFinalFormateado = formatoPrecio.format(precioFinal);
    });
    document.getElementById('precioFinalCotizacion').innerHTML= precioFinalFormateado;
}


// Reseteo la cotización
function limpiarCotizacion() {
    cotizacion = [];
    localStorage.removeItem('cotizacionLocal');
    document.getElementById('precioFinalCotizacion').innerHTML= '$0';
    document.getElementById('tiempoFinalEntrega').innerHTML = 'Tiempo de entrega aproximado: 0 días';
    document.getElementById('cotizacion').innerHTML= '';
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'error',
        title: 'Cotización límpia',
        showConfirmButton: false,
        timer: 1500
    })
}

// Muestro el estado actual de la cotización
function revisarCotizacion() {
    console.table(cotizacion);
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'info',
        title: '¡Revisa la consola! 😃',
        showConfirmButton: false,
        timer: 1500
    })
}

// Cargar cotización del localStorage 
function cargarCotizacion() {
    if (typeof cotizacion !== 'undefined') {
        cotizacion = JSON.parse(localStorage.getItem('cotizacionLocal'));
        cotizacion.forEach(servicio => {
            agregarACotizacion(servicio.categoria, servicio.nombre, servicio.entrega, servicio.precio);
        });
    }
}

// Agregando productos para probar y confirmar que todo esté ok
// agregarACotizacion('branding', 'Paquete completo', 10, 1000000);
// agregarACotizacion('web', 'Paquete completo', 8, 15000000);
// agregarACotizacion('fotografia', 'Paquete completo', 18, 400000);
// agregarACotizacion('seo', 'Paquete completo', 36, 500000);
// agregarACotizacion('video', 'Paquete completo', 14, 2000000);
// agregarACotizacion('social media', 'Paquete completo', 2, 2500000);
// agregarACotizacion('copywriting', 'Paquete completo', 8, 1700000);
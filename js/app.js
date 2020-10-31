/*
* TODO: 
* - Pedir los datos de contacto antes de mandar la cotización final
* - Mostrar el IVA al final
* - Sumar el valor de la cotización + IVA
* - Cupón de descuento (?)
*/

// Reviso si ya hay alguna cotización y si la hay, la corgo
//
$(function() {
    cargarCotizacion();
})

const iva = 19;
precio
iva
preciofinal
let serviciosDisponibles = [];

// Cargo las categorías y los servicios de cada una por ajax desde un json externo
$.ajax({
    url: "js/servicios.json",

    success: function (categoria) {
        serviciosDisponibles = categoria;
        categoria.forEach((categoria) => {
            $("#bodyContainer").append(`
                <section class="section ${categoria.bg}" data-iva="${categoria.iva}" data-unico="${categoria.unico}">
                    <div class="container pb-6">
                        <h2 class="title">${categoria.titulo}</h2>
                        <p class="subtitle">${categoria.txt}</p>
                        <div class="columns is-multiline" id="${categoria.id}">
            `)
            categoria.servicios.forEach((servicios) => {
                $(`#${categoria.id}`).append (`
                    <div class="column is-one-third">
                        <div class="box servicio">
                            <div class="content">
                                <p>
                                    <strong>${servicios.nombre}</strong>
                                    <br>
                                    ${servicios.descripcion}
                                </p>
                            </div>
                            <button onclick="agregarACotizacion('${categoria.titulo}', '${servicios.nombre}', ${servicios.entrega}, ${servicios.precio}')" class="button is-primary">Agregar</button>
                            <button onclick="quitarACotizacion('${categoria.titulo}', '${servicios.nombre}', ${servicios.entrega}, ${servicios.precio})" class="button is-warning is-hidden">Quitar</button>
                        </div>
                    </div>
                `)
            })
        $("#bodyContainer").append(`
                    </div>
                </div>
            </section>
        `)
        })
    },

    error: function(error) {
        Swal.fire({
            position: "top-end",
            toast: true,
            icon: "error",
            title: "Error al cargar JSON",
            showConfirmButton: false,
            timer: 4000,
        });
    },
});

// Solo poder seleccionar un servicio
var serviciosWrapper = document.querySelectorAll('#bodyContainer>section');
function probarUnico() {
    serviciosWrapper.forEach((categoria, i) => {
        if ( serviciosWrapper[i].dataset.unico == true ) {
            console.log(`${categoria} es única`)
        }
        else {
            console.log(`${categoria} NO es única`)
        }
    })
}

// Creo el array cotización que contendrá el listado completo de servicios
let cotizacion = [];

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
    mostrarCotizacion();
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

function agregarACotizacion2 (idServicio) {
    let servicioAAgregar = serviciosDisponibles.findIndex(function (indexServicio) {
        return indexServicio === idServicio;
    })
    let servicio = {
        categoria: serviciosDisponibles.servicios[servicioAAgregar].categoria,
        nombre: serviciosDisponibles.servicios[servicioAAgregar].nombre,
        entrega: serviciosDisponibles.servicios[servicioAAgregar].entrega,
        precio: serviciosDisponibles.servicios[servicioAAgregar].precio
    }
    cotizacion.push(servicio);
    localStorage.setItem('cotizacionLocal', JSON.stringify(cotizacion));
    mostrarCotizacion();
    sumarDias();
    sumarPrecios();
    // if ( serviciosData.unico == true ) {
    //     let botonAgregar = document.querySelectorAll('.box.servicio>.button.is-primary');
    //     botonAgregar.onclick = function() {
    //         document.querySelector('button.is-warning').toggle('is-hidden');
    //     }
    // }
    Swal.fire({
        position: 'top-end',
        toast: true,
        icon: 'success',
        title: 'Servicio agregado',
        showConfirmButton: false,
        timer: 1500
    })
}





function mostrarCotizacion() {
    document.getElementById('cotizacion-intro').innerText = 'Los servicios que tienes en tu cotización son:';
    let itemLista = document.querySelector('#cotizacion');
    itemLista.innerHTML = "";
    cotizacion.forEach((service, index) => {
        precioBonito = Intl.NumberFormat('es-CO', { 
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(service.precio);
        localStorage.removeItem('cotizacionLocal');
        localStorage.setItem('cotizacionLocal', JSON.stringify(cotizacion));
        itemLista.innerHTML += `
        <li id = "servicio-${index}" class="has-border-left mb-6"> 
            <div class="columns px-3 level">
                <div class="column">
                    <p class="subtitle is-6 is-uppercase has-text-primary">${service.categoria}</p>
                    <h4 class="title is-5 mb-0">${service.nombre}</h4>
                    <p class="is-italic pt-0 is-small is-tiempo-entrega">Tiempo de entrega: ${service.entrega} días</p>
                </div>
                <div class="column is-narrow level-item">
                    <h4 class="title is-4 has-text-weight-bold has-text-right">${precioBonito}</h4>
                </div>
                <div class="column is-narrow level-item">
                    <span class="tag is-danger">
                        Borrar
                        <button class="delete" onclick="quitarACotizacion(${index})"></button>
                    </span>
                </div>
            </div>
        </li>`;
    });
}

// Quitar un producto de la cotización
function quitarACotizacion (index) {
    if (cotizacion.length > 1) {
        cotizacion.splice(index, 1); 
        mostrarCotizacion();
        sumarDias();
        sumarPrecios();
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'error',
            title: 'Servicio eliminados',
            showConfirmButton: false,
            timer: 1500
        })
    }
    else {
        limpiarCotizacion();
    }
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
        precioFinalBonito = Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(precioFinal);
    });
    document.getElementById('precioFinalCotizacion').innerHTML= precioFinalBonito;
}

// Reseteo la cotización
function limpiarCotizacion() {
    cotizacion = [];
    localStorage.removeItem('cotizacionLocal');
    document.getElementById('precioFinalCotizacion').innerHTML= '';
    document.getElementById('tiempoFinalEntrega').innerHTML = '';
    document.getElementById('cotizacion').innerHTML= '';
    document.getElementById('cotizacion-intro').innerHTML= '';
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
    if (cotizacion.length == 0 && localStorage.getItem('cotizacionLocal') != null) {
        cotizacion = JSON.parse(localStorage.getItem('cotizacionLocal'));
        mostrarCotizacion();
        sumarDias();
        sumarPrecios();
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Cotización cargada',
            showConfirmButton: false,
            timer: 1500
        })
    }
    else {
        console.log('No hay cotización para cargar...')
    }
};


// if (hasclass = is-unique) {
//     button.onclick {
//         toggle-class(disable) al resto;
//         toggle-class(show) al boton de quitar
//     }
// }
// else {
//     toggle-class(show) al boton de quitar
// }

//document.querySelectorAll('.box .servicio').document.querySelectorAll('.button .is-primary').onclick = document.querySelector('button.is-warning').toggle('is-hidden');

// function mostarBoton() {
//     document.querySelector('button.is-warning').toggle('is-hidden');
// }

// document.querySelectorAll('.box .servicio > .button .is-primary').click(document.querySelector('button.is-warning').toggle('is-hidden'))
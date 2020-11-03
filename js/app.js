/*
* TODO: 
* - Pedir los datos de contacto antes de mandar la cotización final
* - Mostrar el IVA al final
* - Sumar el valor de la cotización + IVA
* - Cupón de descuento (?)
*/

// Inicializo AOS
AOS.init({
    disable: 'mobile',
    duration: 1200,
    easing: 'ease-in-out-back',
    once: true
  });
  

// Servicios Disponibles, aquí se guardará el array que cargue del JSON
let serviciosDisponibles = [];

// Creo el array cotización que contendrá el listado completo de los servicios a cotizar
let cotizacion = [];

// Reviso si ya hay alguna cotización y si la hay, la corgo
$(function() {
    cargarCotizacion();
})


// Cargo las categorías y los servicios de cada una por ajax desde un json externo
$.ajax({
    url: "js/servicios.json",

    success: function (categoria) {
        serviciosDisponibles = categoria;
        categoria.forEach((categoria) => {
            $("#bodyContainer").append(`
                <section class="section ${categoria.bg}" data-iva="${categoria.iva}" data-unico="${categoria.unico}" data-aos="fade-up" data-aos-duration="800">
                    <div class="container pb-6">
                        <h2 class="title">${categoria.titulo}</h2>
                        <p class="subtitle">${categoria.txt}</p>
                        <div class="columns is-multiline" id="${categoria.id}">
            `)
            categoria.servicios.forEach((servicios) => {
                $(`#${categoria.id}`).append (`
                    <div class="column is-one-third" data-aos="fade-up" data-aos-duration="500" data-aos-anchor="${categoria.id}">
                        <div class="box servicio">
                            <div class="content">
                                <p>
                                    <strong>${servicios.nombre}</strong>
                                    <br>
                                    ${servicios.descripcion}
                                </p>
                            </div>
                            <button id="add-${servicios.id}" onclick="agregarACotizacion('${categoria.titulo}', '${servicios.nombre}', ${servicios.entrega}, ${servicios.precio}, '${servicios.id}', '${categoria.id}')" class="button is-primary">Agregar</button>
                            <button id="delete-${servicios.id}" onclick="quitarACotizacion('${servicios.id}', '${categoria.id}')" class="button is-warning" style="display: none">Quitar</button>
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
})

// Función para crear los objetos que se irán agregando a la cotización
function agregarACotizacion (categoria, nombre, entrega, precio, idServicio, idCategoria) {
    const dataLocal = JSON.parse(localStorage.getItem('cotizacionLocal'));
    const dataVacio = [];
    const resultadoValidacion = dataLocal != null ? dataLocal.find(element => element.idServicio == idServicio) : dataVacio;
    let isUnico = serviciosDisponibles.find(element => element.id == idCategoria);
    
    // Valido que la categoria solo deje seleccionar 1 servicio.
    if (isUnico.unico) {
        const listaServicios = isUnico.servicios;
        listaServicios.forEach(servicio => {
            let idBotonAgregar = 'add-' + servicio.id;
            document.getElementById(idBotonAgregar).disabled = true;
        });
    }

    if (resultadoValidacion == undefined || resultadoValidacion.length == 0) {
        let idBotonAgregar = 'add-' + idServicio;
        let idBotonQuitar = 'delete-' + idServicio;
        document.getElementById(idBotonAgregar).disabled = true;
        document.getElementById(idBotonQuitar).style.display = "";
        let servicio = {
            idCategoria: idCategoria,
            idServicio: idServicio,
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
            timer: 2000
        })
    }
}

// Muestro la cotización en el html y lo actualizo con cada servicio que se agregue o quite
function mostrarCotizacion() {
    document.getElementById('cotizacion-intro').innerText = 'Los servicios que tienes en tu cotización son:';
    let itemLista = document.querySelector('#cotizacion');
    itemLista.innerHTML = "";
    cotizacion.forEach((service) => {
        precioBonito = Intl.NumberFormat('es-CO', { 
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(service.precio);
        localStorage.removeItem('cotizacionLocal');
        localStorage.setItem('cotizacionLocal', JSON.stringify(cotizacion));
        itemLista.innerHTML += `
        <li id = "servicio-${service.idServicio}" class="has-border-left mb-6"> 
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
                        <button class="delete" onclick="quitarACotizacion('${service.idServicio}', '${service.idCategoria}')"></button>
                    </span>
                </div>
            </div>
        </li>`;
    });
}

// Quitar un producto de la cotización
function quitarACotizacion (idServicio, idCategoria) {
    if (cotizacion.length > 1) {
        const dataLocal = JSON.parse(localStorage.getItem('cotizacionLocal'));
        const index = dataLocal.findIndex(element => element.idServicio == idServicio);
        cotizacion.splice(index, 1);
        habilitarBotones(idServicio, idCategoria);
        mostrarCotizacion();
        sumarDias();
        sumarPrecios();
        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'error',
            title: 'Servicio eliminado',
            showConfirmButton: false,
            timer: 2000
        })
    }
    else {
        habilitarBotones(idServicio, idCategoria);
        limpiarCotizacion();
    }
}

// Habilitar los botones de los servicios despues de eliminarlos de la cotización
function habilitarBotones(idServicio, idCategoria) {
    let idBotonAgregar = "add-"+idServicio;
    let idBotonQuitar = "delete-"+idServicio;
    document.getElementById(idBotonQuitar).style.display = 'none';
    document.getElementById(idBotonAgregar).disabled = false;
    let isUnico = serviciosDisponibles.find(service => service.id == idCategoria);
    if (isUnico.unico) {
        const listaServicios = isUnico.servicios;
        listaServicios.forEach(servicio => {
            let idBotonAgregar = 'add-'+servicio.id;
            document.getElementById(idBotonAgregar).disabled = false;
        });
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
        timer: 2000
    })
}

// Cargar cotización del localStorage 
function cargarCotizacion() {
    if (cotizacion.length == 0 && localStorage.getItem('cotizacionLocal') != null) {
        cotizacion = JSON.parse(localStorage.getItem('cotizacionLocal'));
        mostrarCotizacion();
        sumarDias();
        sumarPrecios();

        // Después de pintar el html con los datos de la cotización, desactivo los botones que correspondan
        setTimeout(() => {
            cotizacion.forEach(servicio => {
            let isUnico = serviciosDisponibles.find(service => service.id == element.idCategoria);
                if (isUnico.unico) {
                    const listaServicios = isUnico.servicios;
                    listaServicios.forEach(servicio => {
                        let idBotonAgregar = 'add-'+servicio.id;
                        document.getElementById(idBotonAgregar).disabled = true;
                    });
                    let idBotonQuitar = 'delete-'+element.idServicio;
                    document.getElementById(idBotonQuitar).style.display = '';
                }
                else {
                    let idBotonAgregar = 'add-'+servicio.id;
                    let idBotonQuitar = 'delete-'+element.idServicio;
                    document.getElementById(idBotonQuitar).style.display = '';
                    document.getElementById(idBotonAgregar).disabled = true;
                }
            });
        }, 1000);

        Swal.fire({
            position: 'top-end',
            toast: true,
            icon: 'success',
            title: 'Cotización cargada',
            showConfirmButton: false,
            timer: 3000
        })
    }
    else {
        console.log('No hay cotización para cargar...')
    }
};

 // Muestro el estado actual de la cotización.
 // (No se usa en la versión final, pero me facilitó la vida mientras desarrollaba todo el proyecto)
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


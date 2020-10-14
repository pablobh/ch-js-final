// granArray donde estarán guardados todas las secciones y servicios que se usarán en el cotizador
let granArray = [
    (seccion = {
        id: "branding",
        titulo: "Identidad visual",
        txt:
            "Una completa e innovadora identidad corporativa genera una proyección positiva del negocio. Nos enfocamos en el desarrollo conceptual e identificamos, organizamos y promocionamos los productos, resaltando la calidad y el diseño, para lograr que tu marca obtenga el reconocimiento indicado.",
        bg: "has-background-cremita",
        servicios: [
            {
                nombre: "Paquete básico",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 10,
                precio: 1000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete mediano",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 20,
                precio: 2000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete completo",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 30,
                precio: 3000,
                unico: true,
                iva: true,
            },
        ],
    }),
    (seccion = {
        id: "web",
        titulo: "Página web",
        txt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eligendi, assumenda illo pariatur iure fugiat dignissimos quibusdam ullam consequuntur esse eius. Magni aperiam dolore nam voluptas quidem ratione? Fugit, temporibus.",
        bg: "has-background-white-bis",
        servicios: [
            {
                nombre: "CMS (Wordpress)",
                descripcion:
                    "Permite establecer una estructura de soporte para la creación, administración y publicación de contenido del sitio web. Esto es la base para hacer uso de las estrategias digitales.",
                entrega: 10,
                precio: 1000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Usuarios",
                descripcion:
                    "Aquí, los clientes pueden registrarse en el sitio, editar y actualizar su información (direcciones de entrega, etc), y visualizar su actividad (pedidos anteriores, etc).",
                entrega: 20,
                precio: 2000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Catálogo de productos",
                descripcion:
                    "Administra un catálogo con productos ilimitados. Cada producto será ilustrado con fotos, descripción e información relacionada. Se brinda la información del producto de manera clara y precisa.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Carrito de compras",
                descripcion:
                    "Desarrollamos un sistema completo para el manejo de pedidos online, donde los usuarios registrados en la página web, adquiere los productos, alimentando la de base de datos del sitio.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Reservas/Agenda",
                descripcion:
                    "Administra un catálogo con productos ilimitados. Cada producto será ilustrado con fotos, descripción e información relacionada. Se brinda la información del producto de manera clara y precisa.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Pasarela de pago",
                descripcion:
                    "Integra la pasarela de pagos seleccionada por el cliente con el carrito de compras. Esta aplicación está diseñada para realizar una serie de acciones que procesan las transacciones, de manera transparente para el comprador.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Galería de fotos",
                descripcion:
                    "Administra una galería de fotos de manera organizada por álbumes y categorías, brindándole la posibilidad al visitante de participar con sus comentarios en cada una de las imágenes.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Formularios",
                descripcion:
                    "Esta sección, genera formularios ilimitados según las diferentes necesidades. Estos datos son dirigidos a un correo proporcionado por el cliente, y al mismo tiempo quedarán guardados en una base de datos para consultas posteriores.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Buscador interno",
                descripcion:
                    "Realiza búsquedas dentro del contenido estático y dinámico del sitio, ordenando los resultados por relevancia. Esto permite que el cliente acceda de forma específica y rápida a los productos que necesita.",
                entrega: 30,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Blog/Noticias",
                descripcion:
                    "Espacio donde se administran artículos/noticias, permitiendo al visitante participar activamente.",
                entrega: 3,
                precio: 100,
                unico: false,
                iva: false,
            },
            {
                nombre: "Google Maps",
                descripcion:
                    "Mediante la integración de Google Maps, permite mostrarle al visitante la ubicación precisa y detallada de su negocio/empresa, ademas de la exploración de los alrededores.",
                entrega: 1,
                precio: 3000,
                unico: false,
                iva: false,
            },
            {
                nombre: "Multidiomas",
                descripcion:
                    "Permite integrar y administrar el contenido del sitio en diferentes idiomas.",
                entrega: 3,
                precio: 100,
                unico: false,
                iva: false,
            },
            {
                nombre: "Optimización sitio",
                descripcion:
                    "Conjunto de herramientas y técnicas que permiten la optimización completa de los contenidos del sitio (Fotos, Videos, Textos, ilustraciones, código, etc). El correcto uso de estas herramientas da como resultado final, un sitio más rápido y que permite tener más visitas al mismo tiempo, porque mejora la experiencia de los visitantes del sitio.",
                entrega: 3,
                precio: 230,
                unico: false,
                iva: false,
            },
            {
                nombre: "Estadísticas detalladas",
                descripcion:
                    "Integración con Google Analytics o Piwik. Ambos programas permiten tener reportes detallados (ciudad, país, duración, origen, etc) de las visitas al sitio web. Estos datos son utilizados para optimizar el contenido del sitio y así, atraer más visitantes.",
                entrega: 1,
                precio: 50,
                unico: false,
                iva: false,
            },
            {
                nombre: "Boletín electrónico",
                descripcion:
                    "Permite a los clientes ser parte de  la base de datos y así poder recibir los boletines electrónicos con información relevante de la empresa (Promociones, cupones de descuento, beneficios, etc)",
                entrega: 1,
                precio: 30,
                unico: false,
                iva: false,
            },
            {
                nombre: "Integración con CDN",
                descripcion:
                    "Todo el contenido estático del sitio es emitido desde servidores en 40 data centers a nivel mundial. Esto permite que la información llegue de manera más rápida al visitante, ya que es enviada desde el servidor más cercano.",
                entrega: 1,
                precio: 60,
                unico: false,
                iva: false,
            },
            {
                nombre: "Trazabilidad",
                descripcion:
                    "Acceso a un historial completo de las diferentes acciones/cambios/actualizaciones sobre la página y el usuario que los realizó, esto nos permite tener un control más detallado de todo lo que pasa en el sitio.",
                entrega: 1,
                precio: 60,
                unico: false,
                iva: false,
            },
            {
                nombre: "Backups automáticos",
                descripcion:
                    "Sistematiza fácilmente backups diarias, semanales o mensuales de los archivos y la base de datos de los sitios. Estas copias, pueden ser guardadas en el mismo servidor, Dropbox, Amazon S3, Rackspace Cloud, FTP, Stash e incluso, enviarlas a cualquier persona vía correo electrónico.",
                entrega: 1,
                precio: 150,
                unico: false,
                iva: false,
            },
        ],
    }),
    (seccion = {
        id: "redes-sociales",
        titulo: "Redes sociales",
        txt:
            "Contar con presencia y posicionamiento en redes sociales es vital para una marca. Crear conversación le permite a las empresas ganar exposición de marca y relacionarse con el target adecuado para generar ganancias.",
        bg: "has-background-cremita",
        servicios: [
            {
                nombre: "Paquete básico",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 10,
                precio: 1000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete mediano",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 20,
                precio: 2000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete completo",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 30,
                precio: 3000,
                unico: true,
                iva: true,
            },
        ],
    }),
    (seccion = {
        id: "foto-video",
        titulo: "Fotografía y video",
        txt:
            "Trabajo fotográfico completamente profesional, que promociona con una perspectiva impactante y apta para publicaciones, catálogos, página de Internet, redes sociales incluso hasta la decoración de sus oficinas.",
        bg: "has-background-white",
        servicios: [
            {
                nombre: "Paquete básico",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 10,
                precio: 1000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete mediano",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 20,
                precio: 2000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete completo",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 30,
                precio: 3000,
                unico: true,
                iva: true,
            },
        ],
    }),
    (seccion = {
        id: "adicionales",
        titulo: "Adicionales",
        txt:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eligendi, assumenda illo pariatur iure fugiat dignissimos quibusdam ullam consequuntur esse eius. Magni aperiam dolore nam voluptas quidem ratione? Fugit, temporibus.",
        bg: "has-background-cremita",
        servicios: [
            {
                nombre: "Paquete básico",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 10,
                precio: 1000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete mediano",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 20,
                precio: 2000,
                unico: true,
                iva: true,
            },
            {
                nombre: "Paquete completo",
                descripcion:
                    "Incluye: Diseño de logo, paleta de colores, articulaciones del logo, manual de identidad, brandeo de redes sociales.",
                entrega: 30,
                precio: 3000,
                unico: true,
                iva: true,
            },
        ],
    }),
];
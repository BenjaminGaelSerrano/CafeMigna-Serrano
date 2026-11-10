// Datos de ejemplo que se cargan al iniciar el servidor (persistencia en memoria).
// Las imágenes de los platos se sirven desde frontend/public/img/platos.

export const categoriasIniciales = [
    { id: 1, nombre: "Cafetería & Desayunos", descripcion: "Para arrancar la mañana o la merienda.", orden: 1 },
    { id: 2, nombre: "Principales & Bodegón", descripcion: "Menú ejecutivo al mediodía y platos para compartir a la noche.", orden: 2 },
    { id: 3, nombre: "Postres", descripcion: "Para cerrar la sobremesa.", orden: 3 }
];

export const platosIniciales = [
    {
        nombre: "Café con leche y medialunas",
        descripcion: "Clásico porteño. Dos medialunas de manteca o de grasa.",
        precio: 6500,
        categoriaId: 1,
        disponible: true,
        imagenUrl: ""
    },
    {
        nombre: "Tostado Migna",
        descripcion: "Tostado de miga de jamón y queso con infusión a elección.",
        precio: 8900,
        categoriaId: 1,
        disponible: true,
        imagenUrl: ""
    },
    {
        nombre: "Desayuno completo",
        descripcion: "Infusión, jugo de naranja exprimido y tostadas con queso crema y mermelada.",
        precio: 11500,
        categoriaId: 1,
        disponible: true,
        imagenUrl: ""
    },
    {
        nombre: "Milanesa napolitana con fritas",
        descripcion: "Con salsa, jamón, muzzarella y colchón de papas fritas.",
        precio: 19800,
        categoriaId: 2,
        disponible: true,
        imagenUrl: "/img/platos/milanesa-napolitana.jpg"
    },
    {
        nombre: "Menú ejecutivo del día",
        descripcion: "Plato principal, bebida y postre o café.",
        precio: 15500,
        categoriaId: 2,
        disponible: true,
        imagenUrl: ""
    },
    {
        nombre: "Torre de milanesas",
        descripcion: "Tres milanesas para compartir: a caballo, rúcula y crudo, y napolitana. Con fritas.",
        precio: 42000,
        categoriaId: 2,
        disponible: true,
        imagenUrl: "/img/platos/torre-milanesas.jpg"
    },
    {
        nombre: "Lemon pie",
        descripcion: "Masa sableé, crema de limón y merengue italiano.",
        precio: 7200,
        categoriaId: 3,
        disponible: true,
        imagenUrl: "/img/platos/lemon-pie.jpg"
    },
    {
        nombre: "Flan casero",
        descripcion: "Con dulce de leche y crema.",
        precio: 6400,
        categoriaId: 3,
        disponible: false,
        imagenUrl: ""
    }
];

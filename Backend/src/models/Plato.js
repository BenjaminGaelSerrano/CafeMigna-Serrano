class Plato {
    constructor(id, nombre, descripcion, precio, categoriaId, disponible, imagenUrl){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.precio=precio;
        this.categoriaId=categoriaId;
        this.disponible=disponible;
        this.imagenUrl=imagenUrl;
    }
    actualizarPrecio(){}
    marcarDisponible(){}
    marcarNoDisponible(){}
    actualizarImagen(){}
    obtenerCategoria(){}
}
export default Plato;

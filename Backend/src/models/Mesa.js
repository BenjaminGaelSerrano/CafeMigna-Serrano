class Mesa {
    constructor(id, numero, capacidad, ubicacion, disponible){
        this.id=id;
        this.numero=numero;
        this.capacidad=capacidad;
        this.ubicacion=ubicacion;
        this.disponible=disponible;
    }
    marcarDisponible(){}
    marcarOcupada(){}
    verificarDisponibilidad(){}
    obtenerReservas(){}
}
export default Mesa;

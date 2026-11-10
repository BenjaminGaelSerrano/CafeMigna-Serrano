class Reserva {
    constructor(id, clienteId, mesaId, fecha, hora, cantidadPersonas, estado, observaciones){
        this.id=id;
        this.clienteId=clienteId;
        this.mesaId=mesaId;
        this.fecha=fecha;
        this.hora=hora;
        this.cantidadPersonas=cantidadPersonas;
        this.estado=estado;
        this.observaciones=observaciones;
    }
}
export default Reserva;

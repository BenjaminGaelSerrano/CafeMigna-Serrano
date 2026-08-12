class Pedido {
    constructor(id, clienteId, fecha, hora, tipo, estado, total, direccionEntrega, observaciones){
        this.id=id;
        this.clienteId=clienteId;
        this.fecha=fecha;
        this.hora=hora;
        this.tipo=tipo;
        this.estado=estado;
        this.total=total;
        this.direccionEntrega=direccionEntrega;
        this.observaciones=observaciones;
    }
}
export default Pedido;

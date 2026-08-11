class ItemPedido {
    constructor(id, pedidoId, platoId, cantidad, precioUnitario, subtotal, observaciones){
        this.id=id;
        this.pedidoId=pedidoId;
        this.platoId=platoId;
        this.cantidad=cantidad;
        this.precioUnitario=precioUnitario;
        this.subtotal=subtotal;
        this.observaciones=observaciones;
    }
    calcularSubtotal(){}
    modificarCantidad(){}
    obtenerPlato(){}
    agregarObservaciones(){}
}
export default ItemPedido;

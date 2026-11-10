import Reserva from "../models/Reserva.js";
import { generateId } from "../utils/idGenerator.js";

class ReservaRepository {
    constructor(){
        this.reservas = [];
    }

    findAll(){
        return this.reservas;
    }

    findById(id){
        return this.reservas.find(reserva => reserva.id === id);
    }

    create(data){
        const reserva = new Reserva(
            generateId(),
            data.clienteId,
            data.mesaId ?? null,
            data.fecha,
            data.hora,
            data.cantidadPersonas,
            data.estado,
            data.observaciones ?? ""
        );
        this.reservas.push(reserva);
        return reserva;
    }

    update(id, data){
        const reserva = this.findById(id);
        if(!reserva) return null;
        Object.assign(reserva, data);
        return reserva;
    }

    delete(id){
        const index = this.reservas.findIndex(reserva => reserva.id === id);
        if(index === -1) return false;
        this.reservas.splice(index, 1);
        return true;
    }
}

export default new ReservaRepository();

import reservaRepository from "../repositories/ReservaRepository.js";
import clienteRepository from "../repositories/ClienteRepository.js";
import { BadRequestError, NotFoundError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";
import { EstadoReserva } from "../enums/EstadoReserva.js";

const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const HORA_REGEX = /^\d{2}:\d{2}$/;

function hoyISO(){
    const hoy = new Date();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${hoy.getFullYear()}-${mes}-${dia}`;
}

function soloDigitos(telefono){
    return String(telefono ?? "").replace(/\D/g, "");
}

class ReservaService {
    getAll(){
        return reservaRepository.findAll()
            .map(reserva => this.conCliente(reserva))
            .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));
    }

    getById(id){
        const reserva = reservaRepository.findById(id);
        if(!reserva) throw new NotFoundError(Messages.RESERVA_NOT_FOUND);
        return this.conCliente(reserva);
    }

    create(data){
        this.validar(data);

        // Si el teléfono ya reservó antes, se reutiliza el cliente.
        const telefono = soloDigitos(data.telefono);
        const nombre = data.nombre.trim();
        let cliente = clienteRepository.findByTelefono(telefono);
        if(cliente) clienteRepository.update(cliente.id, { nombre });
        else cliente = clienteRepository.create({ nombre, telefono });

        const reserva = reservaRepository.create({
            clienteId: cliente.id,
            fecha: data.fecha,
            hora: data.hora,
            cantidadPersonas: Number(data.cantidadPersonas),
            estado: EstadoReserva.PENDIENTE,
            observaciones: data.observaciones
        });
        return this.conCliente(reserva);
    }

    cambiarEstado(id, estado){
        this.getById(id);
        if(!Object.values(EstadoReserva).includes(estado)){
            throw new BadRequestError(Messages.RESERVA_ESTADO_INVALIDO);
        }
        return this.conCliente(reservaRepository.update(id, { estado }));
    }

    delete(id){
        this.getById(id);
        reservaRepository.delete(id);
    }

    validar(data){
        const personas = Number(data.cantidadPersonas);
        const telefono = soloDigitos(data.telefono);

        if(!data.nombre?.trim()
            || telefono.length < 8 || telefono.length > 15
            || !FECHA_REGEX.test(data.fecha ?? "")
            || !HORA_REGEX.test(data.hora ?? "")
            || !Number.isInteger(personas) || personas < 1 || personas > 20){
            throw new BadRequestError(Messages.RESERVA_DATOS_INVALIDOS);
        }

        if(data.fecha < hoyISO()) throw new BadRequestError(Messages.RESERVA_FECHA_PASADA);
    }

    // Devuelve la reserva con los datos básicos del cliente para mostrarla en el frontend.
    conCliente(reserva){
        const cliente = clienteRepository.findById(reserva.clienteId);
        return {
            ...reserva,
            cliente: cliente ? { id: cliente.id, nombre: cliente.nombre, telefono: cliente.telefono } : null
        };
    }
}

export default new ReservaService();

import Cliente from "../models/Cliente.js";
import { generateId } from "../utils/idGenerator.js";

class ClienteRepository {
    constructor(){
        this.clientes = [];
    }

    findById(id){
        return this.clientes.find(cliente => cliente.id === id);
    }

    findByTelefono(telefono){
        return this.clientes.find(cliente => cliente.telefono === telefono);
    }

    create(data){
        const cliente = new Cliente(generateId(), data.nombre, data.apellido ?? "", data.telefono, data.email ?? "", data.direccion ?? "");
        this.clientes.push(cliente);
        return cliente;
    }

    update(id, data){
        const cliente = this.findById(id);
        if(!cliente) return null;
        Object.assign(cliente, data);
        return cliente;
    }
}

export default new ClienteRepository();

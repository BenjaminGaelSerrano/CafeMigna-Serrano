import Plato from "../models/Plato.js";
import { generateId } from "../utils/idGenerator.js";

class PlatoRepository {
    constructor(){
        this.platos = [];
    }

    findAll(){
        return this.platos;
    }

    findById(id){
        return this.platos.find(plato => plato.id === id);
    }

    create(data){
        const plato = new Plato(generateId(), data.nombre, data.descripcion, data.precio, data.categoriaId, data.disponible, data.imagenUrl);
        this.platos.push(plato);
        return plato;
    }

    update(id, data){
        const plato = this.findById(id);
        if(!plato) return null;
        Object.assign(plato, data);
        return plato;
    }

    delete(id){
        const index = this.platos.findIndex(plato => plato.id === id);
        if(index === -1) return false;
        this.platos.splice(index, 1);
        return true;
    }
}

export default new PlatoRepository();

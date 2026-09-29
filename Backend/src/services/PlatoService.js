import platoRepository from "../repositories/PlatoRepository.js";
import { BadRequestError, NotFoundError } from "../exceptions/AppError.js";
import { Messages } from "../enums/Messages.js";

class PlatoService {
    getAll(){
        return platoRepository.findAll();
    }

    getById(id){
        const plato = platoRepository.findById(id);
        if(!plato) throw new NotFoundError(Messages.PLATO_NOT_FOUND);
        return plato;
    }

    create(data){
        this.validar(data);
        return platoRepository.create(data);
    }

    update(id, data){
        this.getById(id);
        this.validar(data);
        return platoRepository.update(id, data);
    }

    delete(id){
        this.getById(id);
        platoRepository.delete(id);
    }

    validar(data){
        if(!data.nombre || !data.precio || !data.categoriaId){
            throw new BadRequestError(Messages.INVALID_DATA);
        }
    }
}

export default new PlatoService();

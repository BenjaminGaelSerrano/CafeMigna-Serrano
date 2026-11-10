import { Router } from "express";
import reservaController from "../controllers/ReservaController.js";

const router = Router();

router.get("/", reservaController.getAll);
router.get("/:id", reservaController.getById);
router.post("/", reservaController.create);
router.patch("/:id", reservaController.cambiarEstado);
router.delete("/:id", reservaController.delete);

export default router;

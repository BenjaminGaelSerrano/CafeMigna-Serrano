import { Router } from "express";
import platoController from "../controllers/PlatoController.js";

const router = Router();

router.get("/", platoController.getAll);
router.get("/:id", platoController.getById);
router.post("/", platoController.create);
router.put("/:id", platoController.update);
router.delete("/:id", platoController.delete);

export default router;

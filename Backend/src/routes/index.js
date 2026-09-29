import { Router } from "express";
import platoRoutes from "./platoRoutes.js";

const router = Router();

router.use("/platos", platoRoutes);

export default router;

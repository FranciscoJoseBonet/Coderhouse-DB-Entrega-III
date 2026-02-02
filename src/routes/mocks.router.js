import { Router } from "express";
import { getMockingPets } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingpets", getMockingPets);

export default router;

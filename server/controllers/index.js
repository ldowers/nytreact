import express from "express";
import articleRoutes from "./articles-api.controller";

const router = express.Router();

router.use('/api/saved', articleRoutes);

export default router;
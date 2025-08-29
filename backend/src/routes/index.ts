import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World, This is a test." });
});

// ileride router.use("/users", userRoutes); gibi ekleyebilirsin

export default router;

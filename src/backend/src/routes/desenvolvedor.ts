import { Router } from "restify-router";
import Desenvolvedor from "../controllers/desenvolvedor";
const router = new Router()

router.get("/", Desenvolvedor.getAll)

router.get("/:id", Desenvolvedor.getOne)

router.post("/add", Desenvolvedor.add)

router.put("/edit", Desenvolvedor.edit)

router.del("/delete", Desenvolvedor.delete)

export default router
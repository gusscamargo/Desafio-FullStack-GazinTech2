import { Router } from "restify-router"
import Nivel from "../controllers/nivel"

const router = new Router()


router.get("/", Nivel.getAll)

router.get("/:id", Nivel.getOne)

router.post("/add", Nivel.add)

router.put("/edit", Nivel.edit)

router.del("/delete", Nivel.delete)

export default router
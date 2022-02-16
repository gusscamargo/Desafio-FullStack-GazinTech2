import { Router } from "restify-router";
const router = new Router()

router.get("/")

router.get("/:id")

router.post("/add")

router.put("/edit")

router.del("/delete")

export default router
import { Router } from "https://deno.land/x/oak/mod.ts";
import auth from "../services/auth.ts";
import notFound from "../handlers/notFound.ts";

const router = new Router();

router
  .get("*", notFound)
  .post("/signin", auth)
  .post("/signup", auth)
  .post("/signout", auth);

export default router;

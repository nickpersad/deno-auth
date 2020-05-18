import { Router } from "https://deno.land/x/oak/mod.ts";
import auth from "../services/auth.ts";
import notFound from "../handlers/notFound.ts";

const router = new Router();

router
  .get("*", notFound)
  .post("/api/signin", auth)
  .post("/api/signup", auth)
  .post("/api/signout", auth);

export default router;

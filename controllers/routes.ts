import { Router } from "https://deno.land/x/oak/mod.ts";
import auth from "../services/auth.ts";

const router = new Router();

router
  .post("/signin", auth);

export default router;

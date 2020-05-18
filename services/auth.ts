import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { mongo } from "./mongo.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

// start mongo instance
const _db = await mongo();

const salt = bcrypt.gensalt(10);

const signin = async (username: string, password: string) => {
    const users = _db.collection("users");
    try {
        const doc = await users.findOne({ username });
        const match = bcrypt.checkpw(password, doc.password);

        if (match) {
            return { success: true };
        }
    } catch (e) {
        return { success: false, msg: e };
    }
    return { success: false, msg: `Unable to login.` };
};

export default async ({
    request,
    response
}: {
        request: Request;
        response: Response;
    }) => {
    let obj;
    if (!request.hasBody) {
        response.status = 400;
        response.body = { msg: "Invalid user data" };
        return;
    }

    try {
        const {
            value: { username, password }
        } = await request.body();

        if (!username || !password) {
            response.status = 422;
            response.body = { msg: "Incorrect user data. Name and password are required" };
            return;
        }
        obj = await signin(username, password);
    } catch (e) {
        obj = { success: false, msg: e };
    }

    response.body = obj;
};
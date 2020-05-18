import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { mongo } from "./mongo.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

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

const signup = async (username: string, password: string) => {
    const users = _db.collection("users");
    try {
        return await users.insertOne({
            username,
            password
        });
    } catch (e) {
        return { success: false, msg: e };
    }
};

const signout = async (username: string) => {
    const users = _db.collection("users");
    try {
        return await users.deleteOne({
            username
        });
    } catch (e) {
        return { success: false, msg: e };
    }
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
        switch (request.url.pathname) {
            case "/signin":
                obj = await signin(username, password);
                break;
            case "/signup":
                obj = await signup(username, password);
                break;
            case "/signout":
                obj = await signout(username);
                break;
        }
    } catch (e) {
        obj = { success: false, msg: e };
    }
    response.body = obj;
};
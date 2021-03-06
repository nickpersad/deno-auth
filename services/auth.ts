import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { mongo } from "./mongo.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import uniq from "https://deno.land/x/vuniq/mod.ts"

// start mongo instance
const _db = await mongo();

const salt = bcrypt.genSalt(10);

const signin = async (username: string, password: string) => {
    const users = _db.collection("users");
    try {
        const doc = await users.findOne({ username });
        const match = bcrypt.compare(password, doc.password);

        if (match) {
            return { success: true };
        }
    } catch (e) {
        return { success: false, msg: e };
    }
    return { success: false, msg: `Unable to login.` };
};

const signup = async (username: string, password: string) => {
    const objectId = uniq(24);
    const users = _db.collection("users");
    try {
        const response = await users.insertOne({
            _id: objectId,
            id: objectId,
            username,
            password
        });
        return { success: true, id: response.id };
    } catch (e) {
        return { success: false, msg: e };
    }
};

const signout = async (username: string) => {
    const sessions = _db.collection("sessions");
    try {
        const response = await sessions.deleteOne({
            username
        });
        if (response.deletedCount === 1) {
            return { success: true, msg: `Session for ${username} removed.` };
        }
        return { success: false, msg: `Session for ${username} was not removed.` };
    } catch (e) {
        return { success: false, msg: e };
    }
};

const createSession = async (username: any) => {
    const sessions = _db.collection("sessions");
    try {
        const response = await sessions.insertOne({
            username
        });
        return { success: true, id: response.id };
    } catch (e) {
        return { success: false, msg: e };
    }
}

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
        switch (request.url.pathname.split("/")[2]) {
            case "signin":
                try {
                    obj = await signin(username, password);
                    if (obj.success) {
                        try {
                            obj = await createSession(username);
                        } catch (e) {
                            obj = {success: false, msg: e}
                        }
                    }
                    break;
                } catch (e) {
                    return { success: false, msg: e }
                }
            case "signup":
                try {
                    obj = await signup(username, password);
                } catch (e) {
                    obj = { success: false, msg: e }
                }
                break;
            case "signout":
                try {
                    obj = await signout(username);
                } catch (e) {
                    obj = { success: false, msg: e }
                }
                break;
            default:
                obj = { success: false, msg: `API endpoint doesn't exist` };
        }
    } catch (e) {
        obj = { success: false, msg: e };
    }
    response.body = obj;
};
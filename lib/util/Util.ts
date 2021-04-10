import * as c from "@aero/centra";

export class Util {
    constructor() {
        throw new Error("This class may not be initiated with new.");
    }

    static isFunction(input): boolean {
        return typeof input === "function";
    }

    static isThenable(input): boolean {
        if (!input) return false;
        return (
            input instanceof Promise ||
            (input !== Promise.prototype &&
                this.isFunction(input.then) &&
                this.isFunction(input.catch))
        );
    }
}

export const haste = async (body): Promise<string> => {
    const { key } = await c("https://haste.bongo.ninja")
        .path("documents")
        .method("POST")
        .body(body)
        .json();

    return `https://haste.bongo.ninja/${key}`;
};

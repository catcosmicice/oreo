import { Command } from "@oreo/lib/util/Command";
import { OreoMessage } from "@oreo/lib/structures/Message";

export default class Ping extends Command {
    constructor() {
        super("ping", {
            aliases: ["pong"],
            restrictTo: "all"
        });
    }

    async exec(ctx: OreoMessage) {
        return ctx.util.send("Ping?").then(() => {
            return ctx.send("PING", this.client.ws.ping);
        });
    }
}

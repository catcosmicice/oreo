import { Command } from "@oreo/lib/util/Command";
import { OreoMessage } from "@oreo/lib/structures/Message";
import { Language } from "@oreo/lib/util/language";

export default class Ping extends Command {
    constructor() {
        super("ping", {
            aliases: ["pong"],
            restrictTo: "all",
            description: (language: Language) =>
                language.get("DESCRIPTION_PING")
        });
    }

    async exec(ctx: OreoMessage) {
        return ctx.util.send("Ping?").then(() => {
            return ctx.send("PING", this.client.ws.ping);
        });
    }
}

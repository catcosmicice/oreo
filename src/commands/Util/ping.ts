import { Command } from "@oreo/lib/util/Command";
import { Message } from "discord.js";

export default class Ping extends Command {
    constructor() {
        super("ping", {
            aliases: ["pong"],
            restrictTo: "all"
        });
    }

    async exec(ctx: Message) {
        return ctx.util!.send("Ping?").then((msg) => {
            return msg.edit(`🏓 Pong! ${this.client.ws.ping}`);
        });
    }
}

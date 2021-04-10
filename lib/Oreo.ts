import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { config } from "@oreo/config/index";
import { join } from "path";

export class Oreo extends AkairoClient {
    handler: CommandHandler;
    listener: ListenerHandler;

    constructor() {
        super({ ...config.akairo, ...config.discord });

        this.handler = new CommandHandler(this, {
            directory: join(__dirname, "../src/commands"),
            commandUtil: true,
            handleEdits: true,
            automateCategories: true,
            prefix: "o."
        });

        this.listener = new ListenerHandler(this, {
            directory: join(__dirname, "../src/listeners")
        });

        this.handler.loadAll().useListenerHandler(this.listener);
        this.listener.setEmitters({
            handler: this.handler,
            listener: this.listener
        });
        this.listener.loadAll();
    }
}

import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { join } from "path";
import { config } from "@oreo/config/index";
import { Language, LanguageHandler } from "./util/language";
import constants from './util/constants';

export class Oreo extends AkairoClient {
    // handlers
    handler: CommandHandler;
    listener: ListenerHandler;
    languages: LanguageHandler;

    // other
    config: object;
    constants: object;

    constructor() {
        super(config.akairo, config.discord);

        // define all handlers
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

        this.languages = new LanguageHandler(this, {
            directory: join(__dirname, "../src/languages")
        });

        this.config = config;
        this.constants = constants;

        // load and use emitters and stuff
        this.handler.loadAll().useListenerHandler(this.listener);
        this.listener.setEmitters({
            handler: this.handler,
            listener: this.listener
        });
        this.listener.loadAll();
        this.languages.loadAll();
    }

    getLanguage(id: string) {
        return this.languages.modules.get(id) as Language;
    }
}

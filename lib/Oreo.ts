import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from "discord-akairo";
import { config } from "@oreo/config/index";

export class Oreo extends AkairoClient {
  handler: CommandHandler;
  listener: ListenerHandler;
  inhibitor: InhibitorHandler;

  constructor() {
    super({ ...config.akairo, ...config.discord });

    this.handler = new CommandHandler(this, {
      directory: __dirname.includes("/dist/")
        ? "./dist/src/commands/"
        : "./src/commands",
      commandUtil: true,
      handleEdits: true,
      automateCategories: true,
      prefix: config.oreo.defaultPrefix,
    });

    this.listener = new ListenerHandler(this, {
      directory: __dirname.includes("/dist/")
        ? "./dist/src/listeners/"
        : "./src/listeners",
    });

    this.inhibitor = new InhibitorHandler(this, {
      directory: __dirname.includes("/dist/")
        ? "./dist/src/inhibitors/"
        : "./src/inhibitors",
    });

    this.handler
      .loadAll()
      .useInhibitorHandler(this.inhibitor)
      .useListenerHandler(this.listener);
    this.inhibitor.loadAll();
    this.listener.setEmitters({
      handler: this.handler,
      listener: this.listener,
      inhibitor: this.inhibitor,
    });
    this.listener.loadAll();
  }
}

import { Listener } from "discord-akairo";
import { config } from '@oreo/config/index';

export default class Ready extends Listener {
    constructor() {
        super("ready", {
            emitter: "client",
            event: "ready"
        });
    }

    async exec() {
        console.log("[Discord] Connected.");
    }
}

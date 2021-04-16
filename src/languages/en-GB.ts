import { Language } from "@oreo/lib/util/language";

export default class enGB extends Language {
    constructor() {
        super("en-GB", {
            language: {
                DEFAULT: (id: string) => {
                    `No content for ${id}.`;
                },

                // eval command
                EVAL_NO_CODE: "bruh where's the fucking code?",

                // ping command
                PING: (ping: number) => `🏓 Pong! ${ping}ms`,

                // descriptions
                DESCRIPTION_AVATAR: "Get a User's or the server's avatar"
            },
            enabled: true
        });
    }
}

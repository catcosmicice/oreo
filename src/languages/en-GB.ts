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
                PING: (ping: number) => `🏓 Pong! ${ping}ms.`,

                // random testing ones lol
                ZEG: "nice dutch guy",
                NORTEX: "mongodb fanboi",
                BIRB: "i wish he'd tell us where he's from already bruh",
                DARK: 'him and his stupid "dragonbot"',
                MADLIB: (
                    first: string,
                    second: string,
                    third: string,
                    fourth: string
                ) =>
                    `The ${first} ate the ${second} while ${third} the ${fourth} duck`
            },
            enabled: true
        });
    }
}

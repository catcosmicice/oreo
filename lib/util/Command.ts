import {
    ArgumentGenerator as AkairoArgumentGenerator,
    ArgumentOptions as AkairoArgumentOptions,
    Command as AkairoCommand,
    CommandOptions as AkairoCommandOptions,
    Flag
} from "discord-akairo";
import { Oreo } from "@oreo/lib/Oreo";
import { Language } from "./language";

type ArgumentGenerator = (
    ...a: Parameters<AkairoArgumentGenerator>
) => IterableIterator<ArgumentOptions | Flag>;

export class Command extends AkairoCommand {
    client: Oreo;
    hidden: boolean;
    superuserOnly: boolean;
    channel?: "guild" | "dm";
    description: (language: Language) => string;
    args?: ArgumentOptions[] | ArgumentGenerator;

    constructor(id: string, options?: CommandOptions) {
        if (!options.aliases?.length) options.aliases = [id];
        else options?.aliases?.push(id);

        if (!options?.clientPermissions)
            options.clientPermissions = [
                "SEND_MESSAGES",
                "USE_EXTERNAL_EMOJIS",
                "ADD_REACTIONS"
            ];

        if (
            options.args instanceof Array &&
            options.args.length == 1 &&
            !options.args[0].match
        )
            options.args[0].match = "rest";

        if (options.args instanceof Array)
            options.args.forEach((arg) => {
                if (!arg.readableType && arg.type) {
                    if (arg.type instanceof Array)
                        arg.readableType = arg.type.join("|");
                    else arg.readableType = arg.type.toString();

                    if (
                        ["string", "snowflake", "boolean", "number"].includes(
                            arg.readableType
                        )
                    )
                        arg.readableType = arg.id;
                } else if (arg.flag && arg.match == "flag")
                    arg.readableType = "boolean";
                else if (arg.flag && arg.match == "option" && !arg.type)
                    arg.type = arg.readableType = "string";
            });

        if (!options.restrictTo) options.channel = "guild";
        else if (options.restrictTo != "all")
            options.channel = options.restrictTo;

        super(id, options);

        if (this.ownerOnly || options.superuserOnly) this.hidden = true;
        this.superuserOnly = options.superuserOnly || false;
        this.hidden = options.hidden || false;
        this.args = options.args;
    }

    async init(): Promise<any> {}

    async unload(): Promise<any> {}

    getArguments() {
        return typeof this.args != undefined && Array.isArray(this.args) ? this.args.map((arg) => {
            if (arg.required) {
                if (arg.flag) return arg.type ? `<${arg.flag} ${arg.readableType}>` : `<${arg.flag}>`
                else return `<${arg.readableType}>`;
            } else {
                if (arg.flag) return arg.type ? `[<${arg.flag} ${arg.readableType}>]` : `[<${arg.flag}>]`
                else return `[<${arg.readableType}>]`;
            }
        }) : [];
    }
}

export interface CommandOptions extends AkairoCommandOptions {
    args?: ArgumentOptions[] | ArgumentGenerator;
    restrictTo?: "guild" | "dm" | "all";
    superuserOnly?: boolean;
    hidden?: boolean;
}

export interface ArgumentOptions extends AkairoArgumentOptions {
    readableType?: string;
    required?: boolean;
}

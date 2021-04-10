import { Message } from "discord.js";
import { transpile } from "typescript";
import { inspect } from "util";
import { Command } from "@oreo/lib/util/Command";
import { Stopwatch } from "@oreo/lib/util/Stopwatch";
import { Type } from "@oreo/lib/util/Type";
import { Util, haste } from "@oreo/lib/util/Util";

export default class Eval extends Command {
    codeRegex: RegExp;

    constructor() {
        super("eval", {
            aliases: ["ev"],
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                    required: true,
                    default: null
                },
                {
                    id: "async",
                    type: "string",
                    match: "flag",
                    flag: "--async",
                    required: false,
                    default: null
                },
                {
                    id: "silent",
                    type: "string",
                    match: "flag",
                    flag: "--silent",
                    required: false,
                    default: null
                }
            ]
        });

        this.codeRegex = /^```(?<lang>\w+)?\n(?<code>.+?)(?:\n)?```$/s;
    }

    async exec(
        ctx: Message,
        args: { code: string; async?: boolean; silent?: boolean }
    ) {
        let code: string;

        this.codeRegex.test(args.code)
            ? (args.async &&
                  (code = transpile(
                      `(async () => {\n${
                          this.codeRegex.exec(args.code).groups.code
                      }\n})();`
                  )),
              (code = transpile(this.codeRegex.exec(args.code).groups.code)))
            : (args.async &&
                  (code = transpile(`(async () => {\n${args.code}\n})();`)),
              (code = transpile(args.code)));

        const formatTime = (syncTime: string, asyncTime: string): string => {
            return asyncTime
                ? `⏱ Took ${asyncTime}<${syncTime}>`
                : `⏱ Took ${syncTime}`;
        };

        const stopwatch = new Stopwatch();

        let success: boolean,
            syncTime: string,
            asyncTime: string,
            result: any,
            type: string;
        let thenable = false;

        try {
            result = eval(code);
            syncTime = stopwatch.toString();
            type = new Type(result);
            if (Util.isThenable(result)) {
                thenable = true;
                stopwatch.restart();
                result = await result;
                asyncTime = stopwatch.toString();
            }
            success = true;
        } catch (err) {
            if (!syncTime) syncTime = stopwatch.toString();
            if (!type) type = new Type(err);
            if (thenable && !asyncTime) asyncTime = stopwatch.toString();
            result = err;
            success = false;
        }

        stopwatch.stop();

        if (args.silent) return;

        if (typeof result != "string") result = inspect(result, { depth: 0 });

        if (result.length > 1800)
            return await this.sendEvaled(
                ctx,
                success,
                await haste(result),
                type,
                formatTime(syncTime, asyncTime),
                true
            );
        else
            return await this.sendEvaled(
                ctx,
                success,
                result,
                type,
                formatTime(syncTime, asyncTime),
                false
            );
    }

    async sendEvaled(
        ctx: Message,
        success: boolean,
        output: string,
        type: string,
        time: string,
        oUrl: boolean
    ) {
        return ctx.util.send(
            `**${success ? "Success" : "Error"}:**\n${
                oUrl ? `\n${output}\n` : `\`\`\`js\n${output}\`\`\``
            } \n**Type:** \n\`\`\`yaml\n${type}\n\`\`\` \n${time}`
        );
    }
}

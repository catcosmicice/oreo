import { transpile } from "typescript";
import { inspect } from "util";
import { OreoMessage } from '@oreo/lib/structures/Message';
import { Command } from "@oreo/lib/util/Command";
import { Stopwatch } from "@oreo/lib/util/Stopwatch";
import { Type } from "@oreo/lib/util/Type";
import { Util, haste } from "@oreo/lib/util/Util";

export default class Eval extends Command {
    codeRegex: RegExp;

    constructor() {
        super("eval", {
            aliases: ["ev"],
            ownerOnly: true,
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
        ctx: OreoMessage,
        args: { code: string; async?: boolean; silent?: boolean }
    ) {
        if (!args.code) return ctx.send('EVAL_NO_CODE');

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

        let success: boolean | undefined = undefined,
            syncTime: string | undefined = undefined,
            asyncTime: string | undefined = undefined,
            result: any | undefined = undefined,
            outputUrl: boolean | undefined = undefined,
            type: Type | undefined = undefined,
            thenable = false;

        try {
            
            // ignore this, it's to use while evaluating.
            const msg = ctx, message = ctx;

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
            if (!type!) type = new Type(err);
            if (thenable && !asyncTime) asyncTime = stopwatch.toString();
            result = err;
            success = false;
        }

        stopwatch.stop();

        if (args.silent) return;

        if (typeof result != "string") result = inspect(result, { depth: 0 });

        if (result.length > 1800) {
            result = await haste(result);
            outputUrl = true;
        }

        return ctx.util.send([
            `**${success ? 'Output' : 'Error'}:**`,
            outputUrl ? `\n${result}\n` : `\`\`\`js\n${result}\n\`\`\``,
            `**Type:**`,
            `\`\`\`yaml\n${type}\n\`\`\``
        ].join('\n'))
    }

}

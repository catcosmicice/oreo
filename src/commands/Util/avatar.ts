import { Command } from "@oreo/lib/util/Command";
import { OreoMessage } from "@oreo/lib/structures/Message";
import { Language } from "@oreo/lib/util/language";

export default class Avatar extends Command {
    constructor() {
        super('avatar', {
            aliases: ['av'],
            restrictTo: 'all',
            description: (language: Language) => language.get('DESCRIPTION_AVATAR'),
            args: [
                {
                    id: 'user',
                    type: 'string',
                    default: (ctx: OreoMessage) => ctx.author.id,
                    required: false
                },
                {
                    id: 'server',
                    type: 'string',
                    default: null,
                    required: false
                }
            ]
        })
    }

    async exec(ctx: OreoMessage) {
        return ctx.channel.send(this.getArguments());
    }
}
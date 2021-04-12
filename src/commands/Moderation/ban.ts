import { Command } from "@oreo/lib/util/Command";
import { Language } from "@oreo/lib/util/language";

export default class Ban extends Command {
    constructor() {
        super('ban', {
            description: (language: Language) => language.get('BAN_COMMAND_DESCRIPTION'),
            aliases: ['bean', 'yeet', '410', 'gtfo', 'bonk', 'begone', 'banish']
        })
    }
}

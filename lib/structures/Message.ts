import { Message, Guild, DMChannel, TextChannel, NewsChannel, GuildMember, User, Structures } from 'discord.js';
import { CommandUtil } from 'discord-akairo';
import { Oreo } from '../Oreo';

export class OreoMessage extends Message {
    channel: DMChannel | TextChannel | NewsChannel;
    member: GuildMember;
    util?: CommandUtil;
    author: User;
    guild: Guild;
    client: Oreo;

    constructor(client: Oreo, data: object, channel: DMChannel | TextChannel | NewsChannel) {
        super(client, data, channel)
    }

    get language() {
        return this.client.getLanguage('en-GB');
    }

    send(id: string = "", ...args: any[]) {
        return this.util.send(this.language.get(id, ...args))
    }

}

Structures.extend('Message', () => OreoMessage);
import {
    Message,
    Guild,
    DMChannel,
    TextChannel,
    NewsChannel,
    GuildMember,
    User,
    Structures,
    MessageEmbed
} from "discord.js";
import { CommandUtil } from "discord-akairo";
import { Oreo } from "../Oreo";

export class OreoMessage extends Message {
    channel: DMChannel | TextChannel | NewsChannel;
    member: GuildMember;
    util?: CommandUtil;
    author: User;
    guild: Guild;
    client: Oreo;

    constructor(
        client: Oreo,
        data: object,
        channel: DMChannel | TextChannel | NewsChannel
    ) {
        super(client, data, channel);
    }

    get language() {
        return this.client.getLanguage("en-GB");
    }

    send(id: string = "", ...args: any[]) {
        return this.util.send(this.language.get(id, ...args));
    }

    error(msg: OreoMessage, id: string = "", ...args: any[]) {
        const errorEmbed = new MessageEmbed()
            .setTitle('An error occurred...')
            .setColor('#ff6465')
            .setDescription(`\`\`\`yaml\n${this.language.get(id, ...args)}\n\`\`\``)
            .setFooter(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }));
        return this.util.send(errorEmbed);
    }
}

Structures.extend("Message", () => OreoMessage);

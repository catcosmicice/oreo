import { Command } from "@oreo/lib/util/Command";
import { OreoMessage } from "@oreo/lib/structures/Message";
import { Language } from "@oreo/lib/util/language";
import constants from '@oreo/lib/util/constants';
import { MessageEmbed, User, DiscordAPIError } from "discord.js";

const { colors } = constants;

export default class Avatar extends Command {
    constructor() {
        super("avatar", {
            aliases: ["av"],
            restrictTo: "all",
            description: (language: Language) =>
                language.get("DESCRIPTION_AVATAR"),
            args: [
                {
                    id: 'user',
                    type: 'string',
                    match: 'rest',
                    default: (ctx: OreoMessage) => ctx.author.id,
                    required: false
                },
                {
                    id: 'server',
                    match: 'flag',
                    flag: 'server',
                    default: null,
                    required: false
                }
            ]
        });
    }

    async exec(ctx: OreoMessage, args: { user: string, server: boolean }) {      
        if (args.server) return this.serverAvatar(ctx);
        const id = args.user.replace(/<@!/g, '').replace(/<@/g, '').replace(/>/g, '');
        const user = await this.client.users.fetch(id, false, true)

        if (!args.user || user instanceof DiscordAPIError) return this.userAvatar(ctx, ctx.author);
        return this.userAvatar(ctx, user);
    }

    userAvatar(ctx: OreoMessage, user: User) {
        const avatarEmbed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setImage(user.displayAvatarURL({ size: 2048, dynamic: true }))
            .setDescription([
                [
                    `[PNG](${user.displayAvatarURL({ size: 2048, format: 'png' })})`,
                    `[JPG](${user.displayAvatarURL({ size: 2048, format: 'jpg' })})`,
                    `[WEBP](${user.displayAvatarURL({ size: 2048, format: 'webp' })})`
                ].join(' | '),
                [
                    `[64](${user.displayAvatarURL({ size: 64, dynamic: true })})`,
                    `[256](${user.displayAvatarURL({ size: 256, dynamic: true })})`,
                    `[512](${user.displayAvatarURL({ size: 512, dynamic: true })})`,
                    `[1024](${user.displayAvatarURL({ size: 1024, dynamic: true })})`,
                    `[2048](${user.displayAvatarURL({ size: 2048, dynamic: true })})`
                ].join(' | ')
            ].join('\n'));

        return ctx.util.send(avatarEmbed);
    }

    serverAvatar(ctx: OreoMessage) {
        const avatarEmbed = new MessageEmbed()
            .setColor(colors.default)
            .setAuthor(ctx.guild.name, ctx.guild.iconURL({ dynamic: true }))
            .setImage(ctx.guild.iconURL({ size: 2048, dynamic: true }))
            .setDescription([
                [
                    `[PNG](${ctx.guild.iconURL({ size: 2048, format: 'png' })})`,
                    `[JPG](${ctx.guild.iconURL({ size: 2048, format: 'jpeg' })})`,
                    `[WEBP](${ctx.guild.iconURL({ size: 2048, format: 'webp' })})`
                ].join(' | '),
                [
                    `[64](${ctx.guild.iconURL({ size: 64, dynamic: true })})`,
                    `[256](${ctx.guild.iconURL({ size: 256, dynamic: true })})`,
                    `[512](${ctx.guild.iconURL({ size: 512, dynamic: true })})`,
                    `[1024](${ctx.guild.iconURL({ size: 1024, dynamic: true })})`,
                    `[2048](${ctx.guild.iconURL({ size: 2048, dynamic: true })})`
                ].join(' | ')
            ].join('\n'));

        return ctx.util.send(avatarEmbed);
    }
}

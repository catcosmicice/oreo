import { ClientOptions } from 'discord.js';

export const discord: ClientOptions = {
    disableMentions: 'everyone',
    http: {
        api: 'https://ptb.discord.com/api'
    }
};
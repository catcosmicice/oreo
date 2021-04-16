import { ClientOptions } from "discord.js";

export const discord: ClientOptions = {
    disableMentions: "everyone",
    http: {
        api: process.env.NODE_ENV == 'development' ? "https://ptb.discord.com/api" : "https://discord.com/api"
    }
};

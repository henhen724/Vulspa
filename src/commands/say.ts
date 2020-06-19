import { Message } from "discord.js";
import VulspaClient from "../lib/VulspaClient";

module.exports = {
    name: 'say',
    argmin: 1,
    usage: '!say <text>',
    description: 'The bot says what ever you ask for.',
    execute(msg: Message, args: string[], client: VulspaClient) {
        if (!msg.member!.voice.channel) {
            msg.reply("Sorry, but you don't seem to be in any voice channel.");
            return
        }
        if (!client.openVoiceChannels.has(msg.member!.voice.channel.id)) {
            msg.reply("Sorry, but I'm not in any voice channel that you are.");
            return
        }
        const handler = client.openVoiceChannels.get(msg.member!.voice.channel.id);
        handler!.say(args.join(' '));
    }
}
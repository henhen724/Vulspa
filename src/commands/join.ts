import VoiceChannelHandler from '../lib/VoiceChannelHandler';
import VulspaClient from '../lib/VulspaClient';
import { Message } from 'discord.js';

module.exports = {
    name: 'join',
    description: 'Make the bot join your voice channel for futher assitance.',
    async execute(msg: Message, args: string[], client: VulspaClient) {
        if (msg.member!.voice.channel) {
            const vCHandler = new VoiceChannelHandler(msg.member!.voice.channel);
            await vCHandler.join()
            client.openVoiceChannels.set(msg.member!.voice.channel.id, vCHandler);
        }
        else {
            msg.reply("You're not in a voice channel on this server.  Join one and then I'll join.");
        }
    }
}
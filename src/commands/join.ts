import join from '../lib/voice';

module.exports = {
    name: 'join',
    description: 'Make the bot join your voice channel for futher assitance.',
    execute(msg: any, args: [String]) {
        if (msg.member.voice.channel) {
            join(msg); //imported from voice.js file
        }
        else {
            msg.reply("You're not in a voice channel on this server.  Join one and then I'll join.");
        }
    }
}
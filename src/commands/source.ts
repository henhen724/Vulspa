import { Client, Message } from "discord.js";

module.exports = {
    name: 'source',
    description: 'The bot tells you where to find its source code.',
    execute(msg: Message, args: string[], client: Client) {
        msg.channel.send("You can find all my code at https://github.com/henhen724/Vulspa.");
    }
}
import { Client, Message } from "discord.js";

module.exports = {
    name: 'register',
    description: 'Setups up vulspa account for the discord user.',
    execute(msg: Message, args: string[], client: Client) {
        msg.channel.send("This isn't implemented yet.");
    }
}
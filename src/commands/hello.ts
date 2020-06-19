import { Client, Message } from "discord.js";
import Command from "../types/command";

module.exports = {
    name: 'hello',
    description: 'Say hi to the bot.',
    execute(msg: Message, args: string[], client: Client) {
        msg.channel.send("Welcome guardian.");
    }
}
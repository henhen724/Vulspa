import { Client, Message } from "discord.js";

module.exports = {
    name: 'website',
    description: 'The bot tells you where to find its companion website.',
    execute(msg: Message, args: string[], client: Client) {
        msg.channel.send("My command station can be remote access via https://vulspa-io.heroku.com");
    }
}
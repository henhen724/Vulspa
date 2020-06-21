import { Client, Message } from "discord.js";

module.exports = {
    name: 'register',
    description: 'Setups up vulspa account for the discord user.',
    execute(msg: Message, args: string[], client: Client) {
        msg.author.send("https://vulspa-io.herokuapp.com/accounts/signup")
    }
}
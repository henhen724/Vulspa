export default {
    name: 'hello',
    description: 'Say hi to the bot.',
    execute(msg: any, args: [String]) {
        msg.channel.send("Welcome guardian.");
    }
}
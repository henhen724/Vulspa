const Discord = require("discord.js");
const client = new Discord.Client();
const keys = require("./config/keys.json");

const prefix = "!" //The bot will only see messages that start with this string

client.on("ready", () => console.log("Vulspa online."))

client.on("message", msg => {
    if (msg.content.substring(0, prefix.length) !== prefix)
        return;//Ignore messages without the bot prefix

    var argv = msg.content.substring(prefix.length).split(" ");
    switch (argv[0]) {
        case "hello":
            msg.reply("Welcome guardian.");
            break;
        case "join":
        case "joinfireteam":
        case "joinvoice":
        case "joinvoicechannel":
            console.log(msg);
            break;
        case "code":
        case "source":
        case "sourcecode":
        case "website":
            msg.reply("You can find all my code at https://github.com/henhen724/Vulspa.");
            break;
        default:
            msg.reply("I don't know the command " + argv[0]);
    }
})

client.login(keys.token);
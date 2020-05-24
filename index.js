const Discord = require("discord.js");
const client = new Discord.Client();
const keys = require("./config/keys.json");
process.env.AWS_ACCESS_KEY_ID = keys.aws_access_key_id;
process.env.AWS_SECRET_ACCESS_KEY = keys.aws_secret_access_key; //Setting enviroment varible for AWS access
const AWS = require("aws-sdk");
const join = require("./voice.js");
const prefix = "!" //The bot will only see messages that start with this string

//Checking AWS access credentials are set
AWS.config.getCredentials(function (err) {
    if (err) {
        console.log(err.stack);// credentials are not loaded
        exit(1); //Perposefully crash; the application cannot function without this.
    }
    else {
        // console.log("Access key:", AWS.config.credentials.accessKeyId);
        // console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        console.log("Access key found. Logged into AWS.");
    }
});

//Setting up bot text responses
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
            if (msg.member.voice.channel) {
                join(msg); //imported from voice.js file
            }
            else {
                msg.reply("You're not in a voice channel on this server.  Join one and then I'll join.");
            }
            break;
        case "code":
        case "source":
        case "sourcecode":
        case "website":
            msg.reply("You can find all my code at https://github.com/henhen724/Vulspa.");
            break;
        case "help":
        case "commands":
            msg.reply("Here's a list of all my commands and what they do: https://github.com/henhen724/Vulspa/blob/master/COMMANDS.md");
            break;
        default:
            msg.reply("I don't know the command " + argv[0]);
    }
})

client.login(keys.token);
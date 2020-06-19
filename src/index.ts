if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() //If you're cloning this repo, delete this line.  This just imports an enviroment varibles file which is only on my computer.
}
const keys = require("./config/keys.ts");
process.env.AWS_ACCESS_KEY_ID = keys.aws_access_key_id;
process.env.AWS_SECRET_ACCESS_KEY = keys.aws_secret_access_key; //Setting enviroment varible for AWS access
const AWS = require("aws-sdk");

//Checking AWS access credentials are set
AWS.config.getCredentials(function (err: Error) {
    if (err) {
        console.log(err.stack);// credentials are not loaded
        process.exit(1); //Perposefully crash; the application cannot function without this.
    }
    else {
        // console.log("Access key:", AWS.config.credentials.accessKeyId);
        // console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
        console.log("Access key found. Logged into AWS.");
    }
});

const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter((file: String) => file.endsWith('.ts'));
for (const file in commandFiles) {
    const command = require('./commands/' + commandFiles[file]);
    client.commands.set(command.name, command);
}

client.on("ready", () => console.log("Vulspa online."));

const prefix = "!"//Replace this with a mongo call at some point so servers can set their own prefix
client.on("message", (msg: any) => {
    if (!msg.content.startsWith(`${prefix}`) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(" ");
    const cmdName = args.shift().toLowerCase();
    if (!client.commands.has(cmdName)) return;

    try {
        client.commands.get(cmdName).execute(msg, args)
    } catch (error) {
        console.error(error);
        msg.reply(`Looks like I screwed up. Internal server error for the command: ${msg.content}`);
    }
})

client.login(keys.token); //With command handlers read start connection to discord
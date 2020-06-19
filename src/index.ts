import { Message } from 'discord.js';
import VulspaClient from './lib/VulspaClient';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const fs = require("fs");
const Discord = require("discord.js");
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

// Create a new discord client
const client = new VulspaClient();

// Load all of our command files
const commandFiles = fs.readdirSync('./src/commands').filter((file: String) => file.endsWith('.ts'));
for (const file in commandFiles) {
    const command = require('./commands/' + commandFiles[file]);
    client.commands.set(command.name, command);
}


client.on("ready", () => console.log("Vulspa online."));

// Handle messages according to the command collection.
const prefix = "!"//Replace this with a vulspa api call at some point so servers can set their own prefix
client.on("message", (msg: Message) => {
    if (!msg.content.startsWith(`${prefix}`) || msg.author.bot || !msg.member) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    if (!args.length) return; //If a user sends just !, the next line crashes the program.
    const cmdName = args.shift()!.toLowerCase();

    if (!client.commands.has(cmdName)) return;

    const command = client.commands.get(cmdName);

    // Validate argument number
    if ((command?.argc && args.length !== command.argc) || (command?.argmin && args.length < command.argmin)) {
        var reply = `You didn't give the right number of arguments for ${cmdName}.  It expects `
        reply += command.argc ? `exactly ${command.argc} arguments.` : `expected at least ${command.argmin} arguments.`
        if (command?.usage) {
            reply += `\n\nThe correct way to use ${cmdName} is ${command.usage}.`
        }
        return msg.reply(reply);
    }

    // Try catch to avoid small bug crashing the whole service.
    try {
        client.commands.get(cmdName)!.execute(msg, args, client)
    } catch (error) {
        console.error(error);
        return msg.reply(`Looks like I screwed up. Internal server error for the command: ${msg.content}`);
    }
})

client.login(process.env.DISCORD_TOKEN); //With command handlers ready start connection to discord
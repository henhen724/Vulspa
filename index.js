const Discord = require("discord.js");
const client = new Discord.Client();
const keys = require("./config/keys.json");

client.on("ready", () => console.log("Vulspa online."))
client.login(keys.token);
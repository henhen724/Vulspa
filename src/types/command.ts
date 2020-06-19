import { Client, Message } from "discord.js";

interface Command {
    name: string;
    argc?: number;
    argmin?: number;
    usage?: string;
    description: string;
    execute(msg: Message, args: string[], client: Client): void
}

export default Command
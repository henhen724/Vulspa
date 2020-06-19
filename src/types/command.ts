import { Message } from "discord.js";
import VuslpaClient from "../lib/VulspaClient";

interface Command {
    name: string;
    argc?: number;
    argmin?: number;
    usage?: string;
    description: string;
    execute(msg: Message, args: string[], client: VulspaClient): void
}

export default Command
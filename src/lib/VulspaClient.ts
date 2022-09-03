import { Client, Collection } from "discord.js";
import VoiceChannelHandler from "./VoiceChannelHandler";
import Command from "../types/command";

class VulspaClient extends Client {
    commands: Collection<string, Command>;
    openVoiceChannels: Collection<string, VoiceChannelHandler>;
    constructor() {
        super();
        this.commands = new Collection();
        this.openVoiceChannels = new Collection();
    }
}

export default VulspaClient;
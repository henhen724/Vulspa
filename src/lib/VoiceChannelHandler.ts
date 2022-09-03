import AWS from "aws-sdk";
import { SynthesizeSpeechOutput } from "aws-sdk/clients/polly";
import { Readable, ReadableOptions } from "stream";
import { VoiceChannel, VoiceConnection } from "discord.js";
import VulspaClient from './VulspaClient';


class VoiceChannelHandler {
    //Properties
    vC: VoiceChannel;
    polly: AWS.Polly;
    //outputStream: AudioStream;
    connection: VoiceConnection | null;

    //Set up Polly and audio pipeline
    constructor(_vC: VoiceChannel) {
        this.vC = _vC;
        this.polly = new AWS.Polly({ region: 'us-east-2' });
        //this.outputStream = new AudioStream();
        this.connection = null;
    }

    join = async () => {
        this.connection = await this.vC.join();
    }

    say = async (text: string, voice?: string) => {
        if (!this.connection)
            throw new Error(`Say was called without being connected to a voice channel.`);
        await new Promise((accept, reject) => {
            this.polly.synthesizeSpeech({ Text: text, OutputFormat: "mp3", VoiceId: (voice ? voice! : "Brian") }, (err: NodeJS.ErrnoException | null, data: SynthesizeSpeechOutput) => {
                if (err) {
                    console.log(err.stack);
                    reject(err);
                }
                else if (data.AudioStream instanceof Buffer) {
                    this.connection!.play(Readable.from(data.AudioStream));
                    accept({});
                }
                else {
                    console.log(data.AudioStream);
                    console.log("Error: data.AudioStream has type ", typeof data.AudioStream);
                    reject({ type: "Error", message: "wrong data.AudioStream type." })
                }
            })
        })
    }

    leave = async () => {
        this.vC.leave();
    }
}

export default VoiceChannelHandler;
import uuid from "uuid";
import AWS from "aws-sdk";
import { SynthesizeSpeechOutput } from "aws-sdk/clients/polly";
import fs from "fs";
import { Message, VoiceChannel, VoiceConnection } from "discord.js";

class VoiceChannelHandler {
    //Properties
    vC: VoiceChannel;
    polly: AWS.Polly;
    voiceMP3File: string;
    connection: VoiceConnection | null;

    //Set up Polly and audio pipeline
    constructor(_vC: VoiceChannel) {
        this.vC = _vC;
        this.polly = new AWS.Polly({ region: 'us-east-2' });
        this.voiceMP3File = "voice-" + uuid.v4() + ".mp3";
        fs.writeFile(this.voiceMP3File, "", (err: NodeJS.ErrnoException | null) => {
            if (err) {
                console.error(err);
            }
        })
        this.connection = null;
    }

    //
    textToMp3 = async (text: string) => {
        const req = new Promise((accept, reject) => {
            this.polly.synthesizeSpeech({ Text: text, OutputFormat: "mp3", VoiceId: "Brian" }, (err: NodeJS.ErrnoException | null, data: SynthesizeSpeechOutput) => {
                if (err) {
                    console.log(err.stack);
                    reject(err);
                }
                else if (data.AudioStream instanceof Buffer) {
                    fs.writeFile(this.voiceMP3File, data.AudioStream, { encoding: "binary" }, (err: NodeJS.ErrnoException | null) => {
                        if (err)
                            reject(err)
                        accept({ type: "done", buffer: data.AudioStream })
                    })
                }
                else {
                    console.log("Error: data.AudioStream has type ", typeof data.AudioStream);
                    reject({ type: "Error", message: "wrong data.AudioStream type." })
                }
            })
        })
        const res = await req;
    }
    join = async () => {
        this.connection = await this.vC.join();
    }
    say = async (text: string) => {
        if (!this.connection)
            throw new Error(`Say was called without being connected to a voice channel.`);
        await this.textToMp3(text);
        await new Promise(done => this.connection!.play(this.voiceMP3File).on('finish', done));
    }

    leave = async () => {
        fs.unlink(this.voiceMP3File, (err: NodeJS.ErrnoException | null) => {
            if (err)
                console.log(err.stack);
        })
        this.vC.leave();
    }
}

export default VoiceChannelHandler;
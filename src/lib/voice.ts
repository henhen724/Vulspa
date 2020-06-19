import uuid from "uuid";
import AWS from "aws-sdk";

const Polly = new AWS.Polly({ region: 'us-east-2' });

const textToMp3 = async (voiceMP3File: string, text: string) => {
    const req = new Promise((accept, reject) => {
        Polly.synthesizeSpeech({ Text: text, OutputFormat: "mp3", VoiceId: "Brian" }, (err: Error, data: any) => {
            if (err) {
                console.log(err.stack);
                reject(err);
            }
            else if (data.AudioStream instanceof Buffer) {
                fs.writeFile(voiceMP3File, data.AudioStream, { encoding: "binary" }, (err: Error) => {
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

const say = async (connection: any, voiceMP3File: any, text: string) => {
    await textToMp3(voiceMP3File, text);
    await new Promise(done => connection.play(voiceMP3File).on('finish', done));
}

const listen_user = async (connection: any, user: any) => {
    const audio = connection.reciever.createStream(user, { mode: 'pcm' });
    console.log("You ran an unimplimented function: listen");
    return null;
}

const listen_channel = async (connection: any) => {
    console.log("You ran an unimplimented function: listen");
    return null;
}

const join = async (msg: any): Promise<void> => {
    const connection = await msg.member.voice.channel.join();
    const voiceMP3File = "voice-" + uuid.v4() + ".mp3";
    await say(connection, voiceMP3File, "Welcome, Guardian");
    leave(msg.member.voice.channel, voiceMP3File);
}

const leave = async (voiceChannel: any, voiceMP3File: any) => {
    fs.unlink(voiceMP3File, (err: Error) => {
        if (err)
            console.log(err.stack);
    })
    voiceChannel.leave();
}

export default join;
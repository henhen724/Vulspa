const AWS = require("aws-sdk");
const uuid = require("uuid");
const fs = require("fs");

const Polly = new AWS.Polly({ region: 'us-east-2' });

const textToMp3 = async (voiceMP3File, text) => {
    const req = new Promise((accept, reject) => {
        Polly.synthesizeSpeech({ Text: text, OutputFormat: "mp3", VoiceId: "Brian" }, (err, data) => {
            if (err) {
                console.log(err.stack);
                reject(err);
            }
            else if (data.AudioStream instanceof Buffer) {
                fs.writeFile(voiceMP3File, data.AudioStream, { encoding: "binary" }, err => {
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

const say = async (connection, voiceMP3File, text) => {
    await textToMp3(voiceMP3File, text);
    await new Promise(done => connection.play(voiceMP3File).on('finish', done));
}

const join = async msg => {
    const connection = await msg.member.voice.channel.join();
    const voiceMP3File = "voice-" + uuid.v4() + ".mp3";
    await say(connection, voiceMP3File, "Welcome, Guardian");
    leave(msg.member.voice.channel, voiceMP3File);
}

const leave = async (voiceChannel, voiceMP3File) => {
    fs.unlink(voiceMP3File, err => {
        if (err)
            console.log(err.stack);
    })
    voiceChannel.leave();
}

const createBucket = async () => {
    //When the bot joins a channel, its going to create a bucket to store information about the converation and come AWS lambda functions.
    const bucketName = "Convo-" + uuid.v4();
    const keyName = msg.member.voice.channelID
    const data = await new AWS.S3().putObject({ Bucket: bucketName, Key: keyName, Body: "Test message" });
    console.log("Succesfully uploaded to " + bucketName + "/" + keyName);
}

module.exports = join;
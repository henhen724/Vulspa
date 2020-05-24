

const getTextMp3 = async (text, speechClient) => {
    console.log("ADD POLY")
}

const join = async msg => {
    const connection = await msg.member.voice.channel.join();
    getTextMp3("Hello", speechClient);
}

module.exports = join;
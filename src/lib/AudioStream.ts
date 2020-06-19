import { Readable, ReadableOptions } from "stream";

class AudioStream extends Readable {
    audioBuffer: Buffer;
    endOfStreamIndex: number;// The byte directly after the last assigned byte
    closeStream: Boolean;
    constructor(options?: ReadableOptions) {
        super(options);
        this.audioBuffer = Buffer.alloc(5000); // Starts with a 5Kb buffer
        this.endOfStreamIndex = 0;
        this.closeStream = false;
    }
    append(blob: Buffer) {
        console.log("Adding new mp3 to stream.");
        if (blob.length + this.endOfStreamIndex > this.audioBuffer.length) {
            const nextBufSize = Math.max(2 * this.audioBuffer.length, blob.length + this.endOfStreamIndex);
            if (this.readableHighWaterMark && nextBufSize > this.readableHighWaterMark)
                throw new Error(`Audio stream buffer exceed limit of ${this.readableHighWaterMark} bytes with a size of ${nextBufSize}.`)
            this.audioBuffer = Buffer.alloc(nextBufSize, this.audioBuffer);
        }
        for (let i = 0; i < blob.length; i++) {
            this.audioBuffer[this.endOfStreamIndex + i] = blob[i];
        }
        this.endOfStreamIndex += blob.length;

        if (this.isPaused()) {
            this.resume()
            this.push(this.audioBuffer)
            this.endOfStreamIndex = 0;
        }
    }
    _read(size: number) {
        if (this.closeStream && this.endOfStreamIndex === 0) {
            this.push(null);
        }
        else if (this.endOfStreamIndex === 0) {
            this.pause()
            console.log("pausing stream");
        } else {
            this.endOfStreamIndex = 0;
            this.push(this.audioBuffer)
        }
    }
    _destroy(err: Error | null, cb: (error?: Error | null | undefined) => void) {
        if (err) {
            console.error(err);
            cb(err);
        }
        else {
            console.log("The audio stream was closed.");
            cb();
        }
    }
}

export default AudioStream;
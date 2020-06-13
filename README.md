# Vulspa
![Vuslpa Logo](/images/vulspaicon.png)
_[Destiny](https://www.bungie.net/7/en/Destiny/NewLight) raid/dungeon/time-trial tutorial and helper bot capable of responding to voice commands._
## How to clone this repo and create your own version of the bot
- Install [Git](https://git-scm.com/downloads).
- Install [node](https://nodejs.org/en/download/).
'''sh
git clone remote https://github.com/henhen724/Vulspa.git
'''
- Navigate to the folder where you cloned the repo and
'''sh
npm init
'''
- Goto the index.js file and delete the first three lines, which imports my private enviroment varible in non-production mode.
- Setup AWS and Discord developer accounts and put your credentials in the [/config/keys.js](/config/keys.js) file. (For more on how to do this, see the [config note](/config/CONFIGNOTE.md).)
- You will also need to enable Polly, Lex, and Transcribe from the AWS dashboard
- '''npm start'''
- If you get the messages, "Access key found. Logged into AWS." and "Vulspa online." then your set!  Happy coding.
## Project Goals
- [x] channel listening
- [x] voice channel connect
- [x] add text to speech
- [x] __Basic functionality done.__
- [x] add commands to COMMANDS.md
- [ ] add speech to text with AWS Transcribe
- [ ] create a readible stream from the mp3 output from AWS Polly instead of using temporary mp3 files
- [ ] program an google sheets to desission tree for the zero hour puzzle
- [ ] create zero hour demo
- [ ] integrate AWS Lex
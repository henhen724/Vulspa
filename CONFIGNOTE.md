# Config Note
For security of my personal discord and AWS accounts and the bot itself, I have exclude a .env file which would be in the root folder.  If you are pulling this repo to create your own version of the bot, you need to fill your own .env file with the following properties:
* client_id
* client_secret
    * _You can find both of these inside of the discord developer portal if you click on your app under the general information tab._
* token
    * _You can find this under the bot tab of your app._
* aws_access_key_id
* aws_secret_access_key
    * _Read [this page](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html "AWS Tutorial Page") to see how to find these.  You will need an AWS account and a linked credit card._
/****************************************************************************/
// SlackManager is a library built on top of the express 
/****************************************************************************/

/*
# Header example of the WebHook request by slack

token=rjUF85oyK5sCTTBQgW3zWncg
team_id=T0001
team_domain=example
channel_id=C2147483705
channel_name=test
timestamp=1355517523.000005
user_id=U2147483697
user_name=Steve
text=googlebot: What is the air-speed velocity of an unladen swallow?
trigger_word=googlebot:


curl command:

curl -H "token:rjUF85oyK5sCTTBQgW3zWncg" -H "team_id:T0001" -H "team_domain:example" -H "channel_id:C2147483705" -H "channel_name:c7" -H "timestamp:1355517523.000005" -H "user_id:5465" -H "user_name:Steve" -H "text:googlebot" -H "trigger_word:LOL!"  https://note-manager-ismapro.c9.io/smashing

*/

// Required libraries and files
var path = require('path');
var util = require('util');

var jf = require('jsonfile');

//get the path of the JSON PATH to use as Storage
//var file = path.join('../', 'somefile.json');

var SlackManager = function( ) {
    this.messageStack = [];
};


// Parse the header text and return and object with the parsed data
SlackManager.prototype.parseHeader = function parseHeader(header) {
    
    header = header || {};
    
    var token = header.hasOwnProperty('token') ? header['token'] : '';
    console.log('abismal - ', token, header['token'],typeof header );
    if( !token ) {
        return null;
    }
    
    var team_id = header.hasOwnProperty('team_id') ? header['team_id'] : '';
    var team_domain = header.hasOwnProperty('team_domain') ? header['team_domain'] : '';
    var channel_id = header.hasOwnProperty('channel_id') ? header['channel_id'] : '';
    var channel_name = header.hasOwnProperty('channel_name') ? header['channel_name'] : '';
    var timestamp = header.hasOwnProperty('timestamp') ? header['timestamp'] : '';
    var user_id = header.hasOwnProperty('user_id') ? header['user_id'] : '';
    var user_name = header.hasOwnProperty('user_name') ? header['user_name'] : '';
    var text = header.hasOwnProperty('text') ? header['text'] : '';
    var trigger_word = header.hasOwnProperty('trigger_word') ? header['trigger_word'] : '';
     
    return {
        token:  token,
        team_id: team_id, 
        team_domain: team_domain,
        channel_id: channel_id,
        channel_name: channel_name,
        timestamp: timestamp,
        user_id: user_id,
        user_name: user_name,
        text: text,
        trigger_word: trigger_word
    };
};


// Save the Message in the permanent enabled Storage (DB or LOCAL)
SlackManager.prototype.saveMessage = function savePost( data ) {
    this.messageStack.push( data );
    jf.writeFileSync( 'dbdata.json', this.messageStack );
}


// Load file messages from the file and return as a JSON object
SlackManager.prototype.loadMessages = function loadMessages() {
    var info = jf.readFile('dbdata.json',function(err){
        console.log('Something happen!');
    });
    
    return info;
}


// Set the slack messages
SlackManager.prototype.setInitialMessages = function setInitialMessages() {
    this.messageStack = this.loadMessages();
}


module.exports = new SlackManager();
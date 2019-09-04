var discord = require('discord.js');
var roblox = require('noblox.js');
var client = new discord.Client();
var token = "NjE3OTc5Mjc5NzIzOTg2OTcz.XW9Sgw.OX4ePtbPt1fcSr6e4aMOQ-u_A6Q"
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_040558AF85AC9808FD0A06DE6CFA095C25197761B189995410C2F099E5967C5563736522F92661D21ED24D20C49CB36F1C823B0FC6EA6EF0BD34AA259D31FB8A92574221BF8B3BCB9CA5F28DB5B8437E581616370B5C0875549D12155A592B74E7D16A3B286F1DB6C6E2EAD69266CED433A53BB927F6E24DADE0674984A1949512E628E898D1C634456B21D1BDBEF8DD1B910534FF39C9D306FE572E1735C987C62313E93B58E9CED0F89354E90B3E732AF156F7711603F6BC78B02804D862EE61DCCEA7113CCC39E3E7F911970B82A730E77B165060F436B487EDDEEA9F1A83DC94CE3D964A29D00F9A28BD26193C6E523D24BF15B401C08C17B43E16400C5634F7D2C7DDFBDD2787F232723D438891E894BDC12798CB980B59DA3DEE0EDE304FCD9B219E55759F3AF2987922DB1565C9F71408"
client.login(token)

roblox.cookieLogin(cookie).catch(() => {console.log("Sorry, it failed.");});


client.on("ready", () => {
  client.user.setGame(`Park East`);
  console.log(`Ready to serve on ${client.guilds.size} servers, for ${client.users.size} users.`);
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} joined ${guild}`)
});

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  let user = member.user
  console.log(`${user.tag} left ${guild}`)
});

var prefix = '!';
var groupId = 4538060;
var maximumRank = 15;

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
    
    if(isCommand('Promote', message)){
    	var username = args[1]
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not promotable.`)
					} else {
						message.channel.send(`${id} is rank ${rank} and promotable.`)
						roblox.promote(groupId, id)
						.then(function(roles){
							message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
						}).catch(function(err){
							message.channel.send("Failed to promote.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get him in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
    }



if(isCommand('Shout', message)){    
const msg = message;
    var Moderator = msg.author;
    ShoutMessage = args.join(" ");
    if (ShoutMessage) {
      rbx.shout({group: groupId, message: ShoutMessage}).then(promise => { 
      MessageEmbed(Moderator, 0X42F47A, 'Sucessfully shouted to the Group!\n\nMessage: `' + ShoutMessage + '`');
      })
    } else {
      MessageEmbed(Moderator, 0XFF5151, 'Please provide a shout message.\n\nUsage: `shout <message>`');
    };
  


function MessageEmbed(Mod1, Color, Description) {
    var embed = new Discord.MessageEmbed()
        .setAuthor(Mod1.tag, Mod1.displayAvatarURL())
        .setColor(Color)
        .setDescription(Description);
    msg.channel.send({ embed });

}
function pluck(array){
    return array.map(function(item) { return item['name']; })
}

function hasRole(members, role){
    if(pluck(members.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

function isAdmin(message){
	if(
		hasRole(message.member,"Principal") || 
		hasRole(message.member,"!") || 
		hasRole(message.member,"Assistant Principal")
		){

		return true;
	} else {
		return false;
	}
}
client.on('message', (message) => {

if (isAdmin(message)){
console.log('Is an admin!')
}

});


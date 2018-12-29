const Discord = require('discord.js');
const forEachTimeout = require('foreach-timeout');
const client = new Discord.Client();
const colors = ["00FF00","00FF1A","00FF35","00FF50","00FF6B","00FF86","00FFA1","00FFBB","00FFD6","00FFF1","00F1FF","00D6FF","00BBFF","00A1FF","0086FF","006BFF","0050FF","0035FF","001AFF","0000FF","1A00FF","3500FF","5000FF","6B00FF","8600FF","A100FF","BB00FF","D600FF","F100FF","FF00F1","FF00D6","FF00BB","FF00A1","FF0086","FF006B","FF0050","FF0035","FF001A","FF0000","FF1A00","FF3500","FF5000","FF6B00","FF8600","FFA100","FFBB00","FFD600","FFF100","F1FF00","D6FF00","BBFF00","A1FF00","86FF00","6BFF00","50FF00","35FF00","1AFF00"];
const stop = [];
async function color () {
    forEachTimeout(colors, (color) => {
        client.guilds.forEach((guild) => {
                if (!stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Rainbow');
                if (role && role.editable) 
                    role.setColor(color);
            }  
        })
    }, 7000).then(color);
}
client.on('ready', () => {
    color();
});
client.on('guildCreate', (guild) => {
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('::stop and ::start initializes the bot');
});
client.on('message', (message) => {
    if (message.channel.type !== 'text') return;
    if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR') || message.member.id === message.guild.owner.id) {
        if (message.content === '::stop') {stop.push(message.guild.id); return message.channel.send('Terminated bot services.');}
        if (message.content === '::start') {stop.splice(stop.indexOf(message.guild.id),1); return message.channel.send('Initalized bot services.');}
    }
})
client.login(process.env.TOKEN);

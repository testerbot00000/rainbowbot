const Discord = require('discord.js');
const forEachTimeout = require('foreach-timeout');
const client = new Discord.Client();
const colors = ["F5FEFA","E3FDF0","D0FCE6","BEFBDD","ABFAD3","99F9C9","86F7BF","74F6B6","61F5AC","4FF4A2","3DF298","2AF28E","18F185"];
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
  client.user.setStatus("online")
  client.user.setGame('https://www.patreon.com/LegacyYT');
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

const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const customisation = require('../customisation.json');

exports.run = async (client, message, args) => {

    let tomute = message.mentions.users.first() || message.guild.members.get(args[0]);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("> Nie masz do teg permisji! :facepalm:");
    if(!tomute) return message.reply("> Nie można znaleść takiego użytkownika!");
    if(message.author.id === message.mentions.users.first()) return message.reply("> Nie możesz sam sobie nadać blacklist! :facepalm:");
    let reason = args.slice(2).join(" ");

    if(!reason) {
                res = "Nie ustawiono powodu!";
    } else {
        res = reason
    }
    let muteRole = message.guild.roles.find(role => role.name === "〔😒〕BLACKLIST")
    if (!muteRole) {
        try {
            muteRole = await message.guild.createRole({
                name:"〔😒〕BLACKLIST",
                color: "#000000",
                permissions:[]
            });
    
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muteRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    ADD_REACTIONS: false,
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }
    let mutetime = args[1];
    if(!mutetime) return message.reply("> Musisz napisać czas!");
    
    const embed = new Discord.RichEmbed()
    .setColor(0xF1C40F)
    .setTimestamp()
    .setDescription(`Zostałeś dodany do blacklist! \`${message.guild.name}\``)
    .addField('Dodany:', `${tomute.username}#${tomute.discriminator}`)
    .addField('Dodał:', `${message.author.username}#${message.author.discriminator}`)
    .addField("Powód:", res)
    .addField('Czas trwania blacklist:', ms(ms(mutetime)))
    message.channel.send({embed});
    message.delete();

    message.guild.member(tomute).addRole(muteRole);

    setTimeout(function(){
        message.guild.member(tomute).removeRole(muteRole)
        message.channel.send(`> <@${tomute.id}> zdjęto blackliste!`)
    }, ms(mutetime));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['softmute','tempm'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'tempblacklist',
    description: 'Temporary mute the mentioned user',
    usage: 'tempmute @user (time)'
  };
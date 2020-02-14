const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let user = message.mentions.users.first();

    if(!message.member.hasPermission("BAN_MEMBERS")){
        message.channel.send("Nie masz do tego permisji!");
    }

    else{
        if(!member)
            return message.channel.send("Podaj prawidłowy użytkownik tego serwera");
        if(!member.bannable) 
            return message.channel.send("Nie mogę go zbanować!");

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Nie ustawiono powodu!";

        member.ban(reason)
        let bean = new Discord.RichEmbed()
        .setTitle("Zbanowany!")
        .setColor("0xF1C40F")
        .setDescription(`Zbanowano cię! \`${message.guild.name}\``)
        .addField("Zbanowany:", member, true)
        .addField("Zbanował:", message.author.tag)
        .addField("Powód:", reason);

    message.delete();
    message.channel.send(bean)

    let dmsEmbed = new Discord.RichEmbed()
        .setTitle("Zbanowany!")
        .setColor("0xF1C40F")
        .setDescription(`Zbanowano cię! \`${message.guild.name}\``)
        .addField("Zbanował:", message.author.tag)
        .addField("Powód:", reason);
        message.delete();
        user.send(dmsEmbed);
    }
}

exports.help = {
    name: 'ban'
  };
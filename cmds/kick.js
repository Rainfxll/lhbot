const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    let user = message.mentions.users.first();

    if(!message.member.hasPermission("KICK_MEMBERS")){
        message.channel.send("Nie masz do tego permisji!");
    }
    else{
        
        if(!member)
            return message.channel.send("Podaj prawidłowego użytkownika tego serwera");
        if(!member.kickable) 
            return message.channel.send("Nie mogę wyrzućić tego użytkownika!");

        let reason = args.slice(1).join(' ');
        if(!reason) 
            reason = "No reason provided";
        member.kick(reason)
        let bean = new Discord.RichEmbed()
            .setTitle("Wyrzucono!")
            .setColor("0xF1C40F")
            .setDescription(`Wyrzucono cię z serwera! \`${message.guild.name}\``)
            .addField("Wyrzucony:", member, true)
            .addField("Wyrzucił:", message.author.tag)
            .addField("Powód:", reason);

        message.delete();
        message.channel.send(bean)

        let dmsEmbed = new Discord.RichEmbed()
            .setTitle("Wyrzucono!")
            .setColor("0xF1C40F")
            .setDescription(`Wyrzucono cię z serwera! \`${message.guild.name}\``)
            .addField("Wyrzucił:", message.author.tag)
            .addField("Powód:", reason);
            message.delete();
            user.send(dmsEmbed);

    }
}

exports.help = {
    name: 'kick'
  };
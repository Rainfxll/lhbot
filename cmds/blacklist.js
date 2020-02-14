const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("> Nie możesz użyć tej komendy!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('> Musisz wpisać nazwę aby nadać blacklist');
  if (reason.length < 1) return message.reply('> Musisz wpisać powód...');

  let dmsEmbed = new Discord.RichEmbed()
  .setTitle("Dodano do Blacklist!")
  .setColor("0xF1C40F")
  .setDescription(`Zostałeś dodany do blacklist permamętnie! \`${message.guild.name}\``)
  .addField("Dodał:", message.author.tag)
  .addField("Powód:", reason);

  user.send(dmsEmbed);

  message.delete();
  
  let bean = new Discord.RichEmbed()
  .setTitle("Dodano Blacklist!")
  .setColor("0xF1C40F")
  .setDescription(`Zostałeś dodany do blacklist permamętnie! \`${message.guild.name}\``)
  .addField("Dodany", user, true)
  .addField("Dodał:", message.author.tag)
  .addField("Powód:", reason)
  
  message.channel.send(bean)
  message.member.addRole(role = "673572420904288318").catch(console.error);
}
exports.help = {
  name: 'blacklist'
};

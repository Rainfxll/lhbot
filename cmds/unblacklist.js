const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("> Nie możesz użyć tej komendy!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('> Musisz wpisać nazwę aby zdjąć blacklist');

  let dmsEmbed = new Discord.RichEmbed()
  .setTitle("Zdjęto Blacklist!")
  .setColor("0xF1C40F")
  .setDescription(`Zostałeś zdjęty z blacklist! \`${message.guild.name}\``)
  .addField("Zdją:", message.author.tag)

  user.send(dmsEmbed);

  message.delete();
  
  let bean = new Discord.RichEmbed()
  .setTitle("Zdjęto Blacklist!")
  .setColor("0xF1C40F")
  .setDescription(`Zostałeś zdjęty z blacklist! \`${message.guild.name}\``)
  .addField("Zdjęty", user, true)
  .addField("Zdją:", message.author.tag)

  message.channel.send(bean)
  message.member.removeRole(role = "673572420904288318").catch(console.error);
}
exports.help = {
  name: 'unblacklist'
};

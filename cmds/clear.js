const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.delete()

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie możesz użyć tej komendy!");
  if(!args[0]) return message.channel.send("Proszę wpisać liczbę! Użycie !clear <liczba>`");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**__Usunięto ${args[0]} wiadomości.__**`).then(msg => msg.delete(2000));
});


}

module.exports.help = {
  name: "clear"
}
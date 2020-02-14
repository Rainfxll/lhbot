const botSettings = require("./botsettings.json")
const m3u8stream = require('m3u8stream');
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const bot = new Discord.Client();
const prefix = botSettings.prefix;
const Enmap = require("enmap");
const client = new Discord.Client({disableEveryone: true});
const commando = require(`discord.js-commando`);
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline')
client.commands = new Discord.Collection();


client.on("ready", async () => {
console.log(`Jest gotowy do pracy przy ${bot.guilds.size} serwerach i ${bot.users.size} użytkownikach!`);

client.user.setStatus('Game')
client.user.setActivity("LH-PACK | v2.1 By KukisS", {
    type: "STREAMING",
    url: "https://www.twitch.tv/monstercat"
  });
  
try {
    let link = await client.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
    } catch(e) {
        console.log(e.stack);
        }
});

const cmdsArray = [
    "dmall <message>",
];

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;  

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = client.commands.get(command.slice(prefix.length));
    if(cmd) cmd.run(bot, message, args);
    
});

client.on('message', (message) => {
if(message.content.startsWith('!weryfikacja')) {
message.member.addRole(role = "647911726662287370").catch(console.error);
message.member.addRole(role = "647971547658846239").catch(console.error);
message.delete(500);
}
});

client.on('message', (message) => {
if(message.content.startsWith('!akceptuje')) {
message.member.addRole(role = "647971394432270367").catch(console.error);
message.member.removeRole(role = "647971547658846239").catch(console.error);
message.delete(500);
}
});

bot.on("guildMemberAdd", function(member){
    member.guild.channels.find("name", "〔🔨〕commands")
    let bean = new Discord.RichEmbed()
        .setColor("0xF1C40F")
        .setDescription("Powitajmy użytkownika o nazwie :)"  +  member.user.username )
        message.channel.send(bean)
});

fs.readdir("./cmds", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands found to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
    });
});

client.login(process.env.token);

const Discord = require('discord.js');
const bot_name = 'wichy';
const color = process.env.COLOR || require('../../config.json').color;
const bot_version = '2.2.0';
const github = 'https://github.com/CrazyWichGG/Wichy-2.0';

module.exports = {
    Embed_play: function (status, music_title, music_url, music_length, music_thumbnail, settings) {
        const Embed_play = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(music_title)
            .setURL(music_url)
            .setThumbnail(music_thumbnail)
            .addFields({ name: status, value: `**เวลา**: \`${music_length}\` | ${settings}`, inline: true })
            .setTimestamp()
        return Embed_play;
    },

    Embed_queue: function (status, nowplay, queueMsg, loopStatus) {
        const Embed_queue = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(status)
            .addFields({ name: nowplay, value: queueMsg })
            .setTimestamp()
            .setFooter({ text: `วนซ้ำ: ${loopStatus}`});
        return Embed_queue;
    },

    Embed_remove: function (status, music_title) {
        const Embed_remove = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(status)
            .setDescription(`${music_title}`)
            .setTimestamp()
        return Embed_remove;
    },

    Embed_save: function (music_title, music_url, music_thumbnail, description) {
        const Embed_queue = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(music_title)
            .setURL(music_url)
            .setThumbnail(music_thumbnail)
            .setDescription(description)
            .setTimestamp()
        return Embed_queue;
    },

    Embed_search: function (music_title, description) {
        const Embed_cantFindSong = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(music_title)
            .setDescription(description)
            .setTimestamp()
        return Embed_cantFindSong;
    },

    Embed_help: function (help_title, help_thumbnail, description) {
        const Embed_help = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(help_title)
            .setURL(github)
            .setThumbnail(help_thumbnail)
            .setDescription(description)
            .setTimestamp()
        return Embed_help;
    },

    Embed_status: function (uptime, os, node_v, djs_v, cpu, cpu_usage, ram, ping) {
        const Embed_status = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(`${bot_name} v${bot_version}`)
            .setURL(github)
            .addFields(
                { name: `⚙️ SYSTEM`, value: `OS : **${os}**\nNode.js : **${node_v}**\nDiscord.js : **${djs_v}**\nCPU : **${cpu}**\n━━━━━━━━━━━━━━━━━━━━━━`, inline: false },
                { name: `📊 USAGE`, value: `CPU : **${cpu_usage}**\nMEM : **${ram}**\nUptime : **${uptime}**\nPING : **${ping}ms**\n━━━━━━━━━━━━━━━━━━━━━━`, inline: false }
            )
            .setTimestamp()
        return Embed_status;
    },

    Embed_server: function (serverlist) {
        const Embed_server = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(`เซิฟเวอร์ทั้งหมดที่มี **${bot_name}**`, '')
            .setDescription(serverlist)
        return Embed_server;
    },

    Embed_ping: function (ping) {
        const Embed_ping = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setDescription(`ปิง : **${ping}**ms.`)
        return Embed_ping;
    },

    Embed_lyrics: function (lyrics_title, lyrics_description) {
        const Embed_lyrics = new Discord.EmbedBuilder()
            .setColor(0xFFD900)
            .setTitle(`เนื้อเพลงของ **${lyrics_title}**`)
            .setDescription(lyrics_description)
            .setTimestamp()
        return Embed_lyrics;
    }
}

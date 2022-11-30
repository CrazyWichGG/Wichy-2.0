module.exports = {
    name: 'stop',
    aliases: ['leave'],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing)
            return message.channel.send(`❌ ไม่มีเพลงที่กำลังเล่นในขณะนี้`);

        queue.destroy();

        return message.react('👍');
    },
};
module.exports = {
    name: 'resume',
    aliases: ['re'],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue)
            return message.channel.send(`❌ ไม่มีเพลงที่กำลังเล่นในขณะนี้`);

        const success = queue.setPaused(false);

        return success ? message.react('▶️') : message.channel.send(`❌ มีบางอย่างผิดพลาด`);
    },
};
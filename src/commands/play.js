const { URL } = require('url');


module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'ใส่ชื่อเพลงหรือ URL เพลงที่ต้องการจะเล่น',
    usage: 'play <URL/song name>',
    voiceChannel: true,
    options: [
        {
            name: "search",
            description: "ชื่อเพลงหรือ URL ของเพลงที่ต้องการเล่น",
            type: 3,
            required: true
        }
    ],

    async execute(client, message, args) {

        if (!args[0])
            return message.reply({ content: `❌ พิมพ์ชื่อเพลงที่คุณต้องการหาหรือวาง URL ของเพลงที่ต้องการเปิด`, allowedMentions: { repliedUser: false } });
        
        const userInput = args.join(' ');
        let queryType = '';

        await client.player.extractors.loadDefault();

        if (isValidUrl(userInput)) queryType = client.config.urlQuery;
        else queryType = client.config.textQuery;

        const results = await client.player.search(userInput, {
            requestedBy: message.member,
            searchEngine: queryType
        })
            .catch((error) => {
                console.log(error);
                return message.reply({ content: `❌ เกิดปัญหาบางอย่างขึ้น โปรดลองอีกครั้งภายหลัง`, allowedMentions: { repliedUser: false } });
            });

        if (!results || !results.hasTracks()) {
            return message.reply({ content: `❌ ไม่พบผลลัพธ์`, allowedMentions: { repliedUser: false } });
        }

        /*
        const queue = await client.player.play(message.member.voice.channel.id, results, {
            nodeOptions: {
                metadata: {
                    channel: message.channel,
                    client: message.guild.members.me,
                    requestedBy: message.user
                },
                selfDeaf: true,
                leaveOnEmpty: client.config.autoLeave,
                leaveOnEnd: client.config.autoLeave,
                leaveOnEmptyCooldown: client.config.autoLeaveCooldown,
                leaveOnEndCooldown: client.config.autoLeaveCooldown,
                volume: client.config.defaultVolume,
            }
        }); // The two play methods are the same
        */
        const queue = await client.player.nodes.create(message.guild, {
            metadata: {
                channel: message.channel,
                client: message.guild.members.me,
                requestedBy: message.user
            },
            selfDeaf: true,
            leaveOnEmpty: client.config.autoLeave,
            leaveOnEnd: client.config.autoLeave,
            leaveOnEmptyCooldown: client.config.autoLeaveCooldown,
            leaveOnEndCooldown: client.config.autoLeaveCooldown,
            volume: client.config.defaultVolume,
        });

        try {
            if (!queue.connection)
                await queue.connect(message.member.voice.channel);
        } catch (error) {
            console.log(error);
            if (!queue?.deleted) queue?.delete();
            return message.reply({ content: `❌ ไม่สามารถเข้าร่วมห้องสนทนาได้`, allowedMentions: { repliedUser: false } });
        }

        results.playlist ? queue.addTrack(results.tracks) : queue.addTrack(results.tracks[0]);

        if (!queue.isPlaying()) {
            await queue.node.play().catch((error) => {
                console.log(error);
                //if (!queue?.deleted) queue?.delete();
                return message.reply({ content: `❌ ไม่สามารถเล่นเพลงได้ โปรดลองอีกครั้งภายหลัง`, allowedMentions: { repliedUser: false } });
            });
        }

        return message.react('👍');
    },

    async slashExecute(client, interaction) {

        const userInput =interaction.options.getString("search");
        let queryType = '';

        await client.player.extractors.loadDefault();

        if (isValidUrl(userInput)) queryType = client.config.urlQuery;
        else queryType = client.config.textQuery;

        const results = await client.player.search(userInput, {
            requestedBy: interaction.member,
            searchEngine: queryType
        })
            .catch((error) => {
                console.log(error);
                return interaction.reply({ content: `❌ เกิดปัญหาบางอย่างขึ้น โปรดลองอีกครั้งภายหลัง`, allowedMentions: { repliedUser: false } });
            });

        if (!results || !results.tracks.length)
            return interaction.reply({ content: `❌ ไม่พบผลลัพธ์`, allowedMentions: { repliedUser: false } });


        const queue = await client.player.nodes.create(interaction.guild, {
            metadata: {
                channel: interaction.channel,
                client: interaction.guild.members.me,
                requestedBy: interaction.user
            },
            selfDeaf: true,
            leaveOnEmpty: client.config.autoLeave,
            leaveOnEnd: client.config.autoLeave,
            leaveOnEmptyCooldown: client.config.autoLeaveCooldown,
            leaveOnEndCooldown: client.config.autoLeaveCooldown,
            volume: client.config.defaultVolume,
        });

        try {
            if (!queue.connection)
                await queue.connect(interaction.member.voice.channel);
        } catch (error) {
            console.log(error);
            if (!queue?.deleted) queue?.delete();
            return interaction.reply({ content: `❌ ไม่สามารถเข้าร่วมห้องสนทนาได้`, allowedMentions: { repliedUser: false } });
        }

        results.playlist ? queue.addTrack(results.tracks) : queue.addTrack(results.tracks[0]);

        interaction.reply({ content: `✅ เพิ่มเพลงเข้าคิวแล้ว`, allowedMentions: { repliedUser: false } });

        if (!queue.isPlaying()) {
            await queue.node.play().catch((error) => {
                console.log(error);
                //if (!queue?.deleted) queue?.delete();
                return interaction.followUp({ content: `❌ ไม่สามารถเล่นเพลงได้ โปรดลองอีกครั้งภายหลัง`, allowedMentions: { repliedUser: false } });
            });
        }
    },
};

const isValidUrl = (str) => {
    try {
        new URL(str);
        return true;
    } catch (err) {
        return false;
    }
};
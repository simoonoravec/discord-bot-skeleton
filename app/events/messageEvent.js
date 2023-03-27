const { userMention } = require('discord.js');
const CONFIG = require("../../config");
const helpers = require("../helpers");

module.exports = (client) => {
    client.on('messageCreate', async e => {
        if (e.author.bot) return;
    
        if (e.content.toLowerCase().includes('discord.gg/'||'discordapp.com/invite/')) {
            e.delete();
            helpers.autoDeletingMessage(
                e.channel,
                helpers.simpleEmbedMsg(
                    helpers.embedColor.red,
                    null,
                    `${userMention(e.author.id)}\nSending Discord invite links is not allowed!`
                ),
                10
            );
        }
    });
}

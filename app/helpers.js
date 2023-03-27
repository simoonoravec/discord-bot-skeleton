const { EmbedBuilder } = require('discord.js');

exports.embedColor = {
    blue: 0x0099FF,
    red: 0xff0000
}

exports.errorMsg = { content: 'An internal error has occured while trying to perform this command.\nTry again later.', ephemeral: true };

exports.simpleEmbedMsg = (color, title, msg) => {
    let emb = new EmbedBuilder().setColor(color).setDescription(msg);
    if (title != null) {
        emb.setTitle(title);
        return emb;
    } else {
        return emb;
    }
}

exports.autoDeletingMessage = (channel, msg, timeout) => {
    channel.send({ embeds: [msg] })
        .then(m => {
            setTimeout(() => m.delete(), timeout*1000);
        })
        .catch(console.error);
}

exports.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
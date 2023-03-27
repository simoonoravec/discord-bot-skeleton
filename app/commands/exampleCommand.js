const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const helpers = require("../helpers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('example')
		.setDescription('Just an example command'),
	async execute(client, event) {
        return {embeds: [
            new EmbedBuilder()
            .setColor(helpers.embedColor.blue)
            .setDescription(`This is a response for the example command.`)
        ]};
    },
};

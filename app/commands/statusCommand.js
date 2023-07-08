const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const helpers = require("../helpers");
const { version } = require('../../package.json');
const humanizeDuration = require("humanize-duration");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Shows the bot status information'),
	async execute(client, event) {
        let used_ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);

        let uptime_string = timeHumanizer(process.uptime() * 1000);

        return {embeds: [
            new EmbedBuilder()
            .setColor(helpers.embedColor.blue)
            .setDescription(`Version: **${version}**
            Uptime: **${uptime_string}**
            Memory usage: **${used_ram} MB**

            Author: **@chungusus**`)
        ]};
	},
};

const timeHumanizer = humanizeDuration.humanizer({
    language: "shortEn",
    round: true,
    languages: {
        shortEn: {
        y: () => "y",
        mo: () => "mo",
        w: () => "w",
        d: () => "d",
        h: () => "h",
        m: () => "m",
        s: () => "s",
        ms: () => "ms",
        },
    },
});
      
const schedule = require('node-schedule');
const { ActivityType } = require('discord.js');

module.exports = (client) => {
    schedule.scheduleJob('*/10 * * * *', function(){
        client.user.setPresence({ activities: [{ name: 'you', type: ActivityType.Watching }] });
    });
}
const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  ActivityType,
  userMention,
} = require("discord.js");

const fs = require("fs");

const CONFIG = require("./config");
const helpers = require("./app/helpers");

const rest = new REST({ version: "10" }).setToken(CONFIG.token);
const commands = [];

const client = new Client({
  autoReconnect: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

if (CONFIG.http_api_enabled) require("./app/http_api")(client);

client.commands = new Collection();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activities: [{ name: "you", type: ActivityType.Watching }],
  });

  var load_modules = new Promise((resolve, reject) => {
    fs.readdirSync("./app/events").forEach((f) => {
      require("./app/events/" + f)(client);
      console.log(`Loaded event handler '${f}'`);
    });
    fs.readdirSync("./app/cron").forEach((f) => {
      require("./app/cron/" + f)(client);
      console.log(`Loaded cronjob '${f}'`);
    });
    fs.readdirSync("./app/commands").forEach((f) => {
      let cmd = require("./app/commands/" + f);
      commands.push(cmd.data.toJSON());
      client.commands.set(cmd.data.name, cmd);
      console.log(`Loaded command '${f}'`);
    });
    resolve(true);
  });

  load_modules.then(() => {
    (async () => {
      try {
        await rest.put(Routes.applicationCommands(CONFIG.app_id), {
          body: commands,
        });
        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
    console.log("Everything ready!");
  });
});

client.on("interactionCreate", async (e) => {
  if (!e.isChatInputCommand()) return;

  const command = e.client.commands.get(e.commandName);

  if (!command) return;

  try {
    await e.deferReply();

    const response = await command.execute(client, e);
    await e.editReply(response);
  } catch (error) {
    console.error(error);
    await e.editReply(helpers.errorMsg);
  }
});

client.login(CONFIG.token);
console.log("Connecting...");

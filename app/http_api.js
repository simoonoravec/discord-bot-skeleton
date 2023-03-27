const CONFIG = require("../config");
const express = require('express');
const app = express();
const router = express.Router();

module.exports = (client) => {
    router.use((req, res, next) => {
        if (typeof req.query.api_key != undefined && CONFIG.http_api_keys.includes(req.query.api_key)) {
            return next();
        }
        res.status(401).json({"success":false,"error":"You are not authorized."});
    });
    
    router.get('/discordbot/message/dm', (req, res) => {
        if (!req.query.user_id) 
            return res.status(400).json({"success":false,"error":"user_id is not defined"});

        if (!req.query.message) 
            return res.status(400).json({"success":false,"error":"message is not defined"});

        client.users.fetch(req.query.user_id, false)
        .then((user) => {
            user.send(req.query.message);
            return res.status(200).json({"success":true,"result":"Message sent."});
        })
        .catch((error) => {
            return res.status(400).json({"success":false,"error":`Error sending message: ${error.rawError.message}`});
        })
    });

    router.get('/discordbot/message/channel', (req, res) => {
        if (!req.query.channel_id) 
            return res.status(400).json({"success":false,"error":"channel_id is not defined"});

        if (!req.query.message) 
            return res.status(400).json({"success":false,"error":"message is not defined"});

        client.channels.fetch(req.query.channel_id)
        .then((channel) => {
            channel.send(req.query.message);
            return res.status(200).json({"success":true,"result":"Message sent."});
        })
        .catch((error) => {
            return res.status(400).json({"success":false,"error":`Error sending message: ${error.rawError.message}`});
        })
    });

    router.get('*', (req, res) => {
        res.send({"success":false,"error":"API endpoint not found."});
    });

    app.use('/', router);

    app.listen(CONFIG.http_api_port, () => {
        console.log(`HTTP API listening at port ${CONFIG.http_api_port}`);
    });
}
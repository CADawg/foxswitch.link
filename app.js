const { App } = require("@sifrr/server");
const path = require("path");
let discord = require("./src/discord.js");
let port = 8080;
let state = true;
let lastState = null;
let channelStates = {};
let lastHit = {};

let app = new App();

function canHit(ip) {
    if (lastHit.includes(ip)) {
        if (lastHit[ip] < (Date.now() - 500)) {
            lastHit[ip] = Date.now();
            return true;
        } else {
            return false;
        }
    } else {
        lastHit[ip] = Date.now();
        return true;
    }
}

app.ws("/*", {
    open: (ws) => {
        ws.subscribe("toggle");
        ws.send(state.toString())
    },

    message: (ws, message, isBinary) => {
        if (!canHit(ws.getRemoteAddressAsText())) return false;

        let messageText = Buffer.from(message).toString();
        let boolMessageText = messageText.split("#");

        if (["true","false"].includes(boolMessageText[0])) {
            if (!boolMessageText[1]) {
                state = (messageText === "true");

                ws.publish("toggle", message, isBinary);
            } else {
                if (boolMessageText[1].toLowerCase().match(/[a-z]{1,32}/)) {
                    channelStates[boolMessageText[1].toLowerCase()] = (boolMessageText[1] === "true");
                    ws.publish("channel" + boolMessageText[1].toLowerCase(), message, isBinary);
                }
            }
        } else if (messageText.startsWith("change-channel:")) {
            let channel = messageText.replace("change-channel:", "").toLowerCase();
            if (channel.match(/[a-z]{1,32}/)) {
                ws.unsubscribeAll();
                ws.subscribe("channel" + channel);
                ws.send((channelStates[channel] || true).toString());
            }
        }
    }

}).folder("/", path.join(__dirname, "public")).listen(port, (token) => {
    if (token) {
        console.log('Listening to port ' + port);
    } else {
        console.log('Failed to listen to port ' + port);
    }
}).file("/", path.join(__dirname, "public", "index.html"), {compress: true});

setInterval(async () => {
    if (state !== lastState) {
        await discord.updateName(state ? "foxon" : "foxoff");
    }

    lastState = state;
}, 5000);
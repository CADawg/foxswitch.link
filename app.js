const { App } = require("@sifrr/server");
const path = require("path");
let discord = require("./src/discord.js");
let port = 8080;
let state = true;
let lastState = null;

let app = new App();

app.ws("/*", {
    open: (ws) => {
        ws.subscribe("toggle");
    },

    message: (ws, message, isBinary) => {
        let messageText = Buffer.from(message).toString();
        let boolMessageText = messageText.split("#");

        if (["true","false"].includes(boolMessageText[0])) {
            if (!boolMessageText[1]) {
                state = (messageText === "true");

                ws.publish("toggle", message, isBinary);
            } else {
                ws.publish("channel" + boolMessageText[1], message, isBinary);
            }
        } else if (messageText.startsWith("change-channel:")) {
            ws.unsubscribeAll();
            ws.subscribe("channel" + messageText.replace("change-channel:", ""));
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
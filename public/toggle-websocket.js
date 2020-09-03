let socket = new WebSocket("ws://localhost:8080");
let groupString = "";

socket.onopen = function () {
    document.body.classList.remove("disconnected");

    let params = new URLSearchParams(window.location.search);

    if (params.get("group")) {
        groupString = "#" + params.get("group");
        socket.send("change-channel:" + params.get("group"));
    }
}

socket.onmessage = function (message) {
    let messageIntent = message.data.split("#")[0];

    if (messageIntent === "true" && document.getElementById("checkbox").checked !== true) {
        document.getElementById("checkbox").checked = true;
    } else if (messageIntent === "false" && document.getElementById("checkbox").checked !== false) {
        document.getElementById("checkbox").checked = false;
    }
}

socket.onclose = function () {
    document.body.classList.add("disconnected");
}

window.addEventListener("load", function () {
    document.getElementById("checkbox").addEventListener("change", function () {socket.send(document.getElementById("checkbox").checked.toString() + groupString)});
});
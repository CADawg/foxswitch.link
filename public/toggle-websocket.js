let socket = new WebSocket("wss://foxswitch.link");
let groupString = "";
let countdown = 0;
let countdownInterval = 0;

socket.onopen = function () {
    document.body.classList.remove("pre-connected");

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
    document.getElementById("checkbox").addEventListener("change", function () {
        let checkbox = document.getElementById("checkbox");
        socket.send(checkbox.checked.toString() + groupString);
        let sw = document.getElementById("countdown-text");
        sw.classList.add("show");
        checkbox.disabled = true;
        countdown = 500;
        countdownInterval = setInterval(function () {
            if (countdown > 0) {
                document.getElementById("number-time").innerHTML = (countdown / 1000).toFixed(2);
                countdown -= 10;
            } else {
                checkbox.disabled = false;
                sw.classList.remove("show");
                clearInterval(countdownInterval);
            }
        }, 10);
    });
});
let justPosted = false;
let lastOptions = false;

window.addEventListener("load", function () {
    document.getElementById("checkbox").addEventListener("change", function () {if (document.getElementById("checkbox").checked !== lastOptions) {justPosted = true; axios.post('/', {on: document.getElementById("checkbox").checked})}});
});

axios.options("/").then(function (response) {
    if (justPosted) {
        justPosted = false;
        return;
    }

    let o = (response.data.name || "").includes("on");
    lastOptions = o;
    document.getElementById("checkbox").checked = o;
}).catch(function () {
    console.log("Failed to get current state!");
});

setInterval(async function () {
    axios.options("/").then(function (response) {
        if (justPosted) {
            justPosted = false;
            return;
        }

        let o = (response.data.name || "").includes("on");
        lastOptions = o;
        document.getElementById("checkbox").checked = o;
    }).catch(function () {
        console.log("Failed to get current state!");
    });
}, 2500);
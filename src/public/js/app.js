const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
    console.log(`Backend says: `, msg);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit(
        "enter_room",
        input.value,
        backendDone
    );
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

//WebSocket
// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//     const msg = { type, payload };
//     return JSON.stringify(msg);
// }

// function handleOpen() {
//     console.log("Conneted to Server");
// }

// socket.addEventListener("open", handleOpen);

// // socket.addEventListener("message", (message) => {
// //     const li = document.createElement("li");
// //     li.innerText = message.data;
// //     messageList.append(li);
// // });

// socket.addEventListener("close", () => {
//     console.log("Disconneted from Server");
// });

// function handleSubmit (event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     const li = document.createElement("li");
//     li.innerText = `You: ${input.value}`;
//     messageList.append(li);
//     socket.send(makeMessage("new_message", input.value));
//     input.value = "";
// }

// function handleNickSubmit (event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
// }

// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);

document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendPDFQuery();
    }
});

async function sendPDFQuery() {
    const fileInput = document.getElementById("pdfInput");
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (message === "") return;

    const chat = document.getElementById("chat");

    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerText = message;
    chat.appendChild(userMsg);

    if (fileInput.files.length === 0) {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.innerText = "⚠️ Por favor, cargá un PDF antes de enviar tu consulta.";
        chat.appendChild(botMsg);
        input.value = "";
        chat.scrollTop = chat.scrollHeight;
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("query", message);

    try {
        const response = await fetch("http://localhost:8000/query", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.innerText = data.respuesta;
        chat.appendChild(botMsg);
    } catch (err) {
        const botMsg = document.createElement("div");
        botMsg.className = "chat-message bot";
        botMsg.innerText = "❌ Error al conectar con el backend.";
        chat.appendChild(botMsg);
    }

    input.value = "";
    chat.scrollTop = chat.scrollHeight;
}



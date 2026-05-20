// =========================
// REGISTER
// =========================

async function register() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!username || !password) {

        showToast("Please fill all fields");

        return;
    }

    try {

        const response = await fetch("/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            showToast("Registration Successful ✅");

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        } else {

            showToast(data.message);
        }

    } catch (error) {

        showToast("Server Error");
    }
}

// =========================
// LOGIN
// =========================

async function login() {

    const username =
        document.getElementById("loginUsername").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();

    if (!username || !password) {

        showToast("Please fill all fields");

        return;
    }

    try {

        const response = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("user", username);

            showToast("Login Successful 🚀");

            setTimeout(() => {

                window.location.href = "chatbot.html";

            }, 1000);

        } else {

            showToast("Invalid Credentials");
        }

    } catch (error) {

        showToast("Server Error");
    }
}

// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {

    const input =
        document.getElementById("user-input");

    const chatBox =
        document.getElementById("chat-box");

    const userMessage =
        input.value.trim();

    if (!userMessage) return;

    // USER MESSAGE

    const userDiv =
        document.createElement("div");

    userDiv.className =
        "message user-message";

    userDiv.innerHTML =
        userMessage;

    chatBox.appendChild(userDiv);

    // AUTO SCROLL

    chatBox.scrollTop =
        chatBox.scrollHeight;

    input.value = "";

    // BOT TYPING MESSAGE

    const typingDiv =
        document.createElement("div");

    typingDiv.className =
        "message bot-message";

    typingDiv.innerHTML =
        "Typing...";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop =
        chatBox.scrollHeight;

    try {

        const response =
            await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: userMessage
            })
        });

        const data =
            await response.json();

        typingDiv.innerHTML =
            data.reply;

    } catch (error) {

        typingDiv.innerHTML =
            "AI Server Error";
    }

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

// =========================
// NEW CHAT
// =========================

function newChat() {

    const chatBox =
        document.getElementById("chat-box");

    // ANIMATION EFFECT

    chatBox.style.opacity = "0";

    setTimeout(() => {

        chatBox.innerHTML = `

            <div class="message bot-message">

                Hello 👋 <br><br>

                How can I help you today?

            </div>

        `;

        chatBox.style.opacity = "1";

    }, 200);
}

// =========================
// ENTER KEY SUPPORT
// =========================

document.addEventListener(
    "DOMContentLoaded",
    () => {

    const input =
        document.getElementById("user-input");

    if (input) {

        input.addEventListener(
            "keypress",
            function(event) {

            if (event.key === "Enter") {

                sendMessage();
            }
        });
    }
});

// =========================
// TOAST MESSAGE
// =========================

function showToast(message) {

    const toast =
        document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";

    toast.style.bottom = "20px";

    toast.style.right = "20px";

    toast.style.background =
        "linear-gradient(135deg,#3b82f6,#8b5cf6)";

    toast.style.color =
        "white";

    toast.style.padding =
        "14px 22px";

    toast.style.borderRadius =
        "14px";

    toast.style.fontSize =
        "14px";

    toast.style.fontWeight =
        "500";

    toast.style.zIndex =
        "9999";

    toast.style.boxShadow =
        "0 10px 25px rgba(0,0,0,0.3)";

    toast.style.animation =
        "fadeIn 0.3s ease";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);
}
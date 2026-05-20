const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const USERS_FILE = "users.json";

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]");
}

// REGISTER
app.post("/register", (req, res) => {

    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    const exists = users.find(u => u.username === username);

    if (exists) {
        return res.json({
            success: false,
            message: "User already exists"
        });
    }

    users.push({ username, password });

    fs.writeFileSync(USERS_FILE, JSON.stringify(users));

    res.json({
        success: true
    });
});

// LOGIN
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(USERS_FILE));

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

// CHATBOT
app.post("/chat", async (req, res) => {

    const userMessage = req.body.message;

    try {

        const response = await fetch(
            "http://localhost:11434/api/generate",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "mistral",
                    prompt: userMessage,
                    stream: false
                })
            }
        );

        const data = await response.json();

        res.json({
            reply: data.response
        });

    } catch (error) {

        res.json({
            reply: "AI server error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});